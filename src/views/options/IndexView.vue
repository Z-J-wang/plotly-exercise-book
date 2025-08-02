<script setup lang="ts">
import { useOptionsStore } from '@/stores/options'
import AttributeDisplay from './AttributeDisplay.vue'
import PlotlyDisplay from '@/components/plot.display/index.vue'
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { PlotlyConfig } from '@/components/plot.display/index.vue'

const { width } = useWindowSize()
const optionsStore = useOptionsStore()
const options = optionsStore.options
const plotlyConfig = ref<PlotlyConfig>({
  data: [
    {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      title: {
        font: {
          size: 50
        }
      },
      type: 'scatter'
    },
    {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    }
  ],
  layout: {
    title: {
      text: 'Heatmap Plot'
    }
  }
})

const direction = computed(() => {
  // 朝向：horizontal （水平） / vertical （垂直）
  return width.value > 1400 ? 'horizontal' : 'vertical'
})

const rightSideClass = computed(() => {
  return direction.value === 'horizontal' ? 'h-screen sticky top-0 w-2/5' : 'sticky bottom-0 left-0 w-full h-full'
})

const defaultProps = {
  children: 'children',
  label: 'name',
  class: () => 'tree-node'
}
</script>

<template>
  <div class="options-view flex" :class="{ 'flex-col': direction === 'vertical' }">
    <div class="flex-grow p-4 bg-white">
      <el-tree :data="options" node-key="id" default-expand-all :props="defaultProps">
        <template #default="{ node, data }">
          <AttributeDisplay :data="data" :node="node" />
        </template>
      </el-tree>
    </div>
    <div
      class="flex-initial bg-white"
      :class="rightSideClass"
      :style="{ height: direction === 'horizontal' ? 'calc(100vh - 50px)' : '40vh' }"
    >
      <PlotlyDisplay v-model="plotlyConfig" :direction="direction" />
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
