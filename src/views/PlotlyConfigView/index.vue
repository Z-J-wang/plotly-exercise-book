<script setup lang="ts">
import { useAttributeStore } from '@/stores/attribute'
import AttributeDisplay from './AttributeDisplay.vue'
import PlotlyDisplay from './PlotDisplay.vue'
import { computed, onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import TheAside from './TheAside.vue'
import { Position } from '@/utils'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'PlotlyConfigView' })

const route = useRoute()
const router = useRouter()

const { width } = useWindowSize()
const attributeStore = useAttributeStore()
const { branch, tree } = storeToRefs(attributeStore)
const plotlyDisplay = ref<InstanceType<typeof PlotlyDisplay> | null>(null)

const openDisplay = computed(() => {
  if (plotlyDisplay.value) {
    return plotlyDisplay.value.openDisplay
  } else {
    return false
  }
})

const direction = computed(() => {
  // 朝向：horizontal （水平） / vertical （垂直）
  let position = Position.Auto
  if (plotlyDisplay.value) {
    position = plotlyDisplay.value.position
  }

  if (position === Position.Bottom) {
    return 'vertical'
  } else if (position === Position.Right) {
    return 'horizontal'
  } else {
    return width.value > 1400 ? 'horizontal' : 'vertical'
  }
})

const rightSideClass = computed(() => {
  return direction.value === 'horizontal'
    ? `h-screen sticky top-0${openDisplay.value ? ' w-v-40' : ''}`
    : 'sticky bottom-0 left-0 w-full h-full'
})

const defaultProps = {
  children: 'children',
  label: 'name',
  class: () => 'tree-node'
}

onMounted(() => {
  const treeRoots = tree.value.map((item) => item.id) // 提取全部根节点id
  let id = ((route.query.id as string) || '').split('-')[0]

  // 如果query.id不存在或者不在treeRoots中，则跳转到treeRoots[0]
  if (!id || !treeRoots.includes(id)) {
    router.push({ query: { id: treeRoots[0] } })
  }
})
</script>

<template>
  <el-container>
    <el-aside width="250px" class="shadow-lg z-10 bg-white">
      <el-scrollbar height="calc(100vh - 60px)">
        <TheAside />
      </el-scrollbar>
    </el-aside>
    <el-main class="bg-gray-50 !p-0">
      <el-scrollbar height="calc(100vh - 60px)">
        <div
          class="options-view flex"
          :class="{ 'flex-col': direction === 'vertical' }"
          :style="{ minHeight: 'calc(100vh - 60px)' }"
        >
          <div class="flex-auto p-4 bg-white min-w-0">
            <!-- <el-tree
              :data="branch"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              :props="defaultProps"
            >
              <template #default="{ node, data }">
                <AttributeDisplay class="cursor-default" :data="data" :node="node" />
              </template>
            </el-tree> -->
          </div>
          <div
            class="flex-shrink-0 bg-white"
            :class="rightSideClass"
            :style="{ height: direction === 'horizontal' ? 'calc(100vh - 60px)' : '40vh' }"
          >
            <!-- <PlotlyDisplay ref="plotlyDisplay" :direction="direction" /> -->
          </div>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style lang="less">
.options-view {
  .tree-node {
    .el-tree-node__content {
      align-items: flex-start;
      height: auto;

      &:hover {
        background-color: unset;
      }
    }
  }
}
</style>
