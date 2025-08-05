<script setup lang="ts">
import { useAttributeStore } from '@/stores/attribute'
import AttributeDisplay from './AttributeDisplay.vue'
import PlotlyDisplay from './PlotDisplay.vue'
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { usePloyConfigStore } from '@/stores/ploy.config'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'PlotlyConfigView'
})

const { width } = useWindowSize()
const attributeStore = useAttributeStore()
const ployConfigStore = usePloyConfigStore()
const plotlyConfig = ployConfigStore.config as PlotlyConfig

const { updateAttribute } = attributeStore
const { branch } = storeToRefs(attributeStore)

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
  return width.value > 1400 ? 'horizontal' : 'vertical'
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

function updateConfig(id: string, value: any) {
  console.log(id, value)
}
</script>

<template>
  <div class="options-view flex" :class="{ 'flex-col': direction === 'vertical' }">
    <div class="flex-grow p-4 bg-white">
      <el-tree :data="branch" node-key="id" default-expand-all :expand-on-click-node="false" :props="defaultProps">
        <template #default="{ node, data }">
          <AttributeDisplay
            class="cursor-default"
            :data="data"
            :node="node"
            @update="updateAttribute"
            @update-config="updateConfig"
          />
        </template>
      </el-tree>
    </div>
    <div
      class="flex-initial bg-white"
      :class="rightSideClass"
      :style="{ height: direction === 'horizontal' ? 'calc(100vh - 50px)' : '40vh' }"
    >
      <PlotlyDisplay ref="plotlyDisplay" v-model="plotlyConfig" :direction="direction" />
    </div>
  </div>
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
