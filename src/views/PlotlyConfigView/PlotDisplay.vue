<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import CodeEditor from '@/components/CodeEditor.vue'
import { Monitor, CloseBold } from '@element-plus/icons-vue'
import { usePlotly } from '@/utils/usePlotly'
import { useStorage } from '@vueuse/core'
import { usePloyConfigStore } from '@/stores/ploy.config'
import { storeToRefs } from 'pinia'
import { Position } from '@/utils'

const openDisplay = useStorage('plotly-open-display', true)
const ployConfigStore = usePloyConfigStore()
const { config: plotlyConfig, code } = storeToRefs(ployConfigStore)
const position = useStorage<Position>('plotly-position', Position.Auto) // 显示位置

/**
 * 暴露给父组件的属性
 */
defineExpose({
  openDisplay,
  position
})

defineProps({
  direction: {
    type: String,
    default: 'vertical',
    validator: (value: string) => {
      return ['horizontal', 'vertical'].includes(value)
    }
  }
})

watch(
  [() => plotlyConfig.value, openDisplay],
  () => {
    // renderPlot()
  },
  { deep: true }
)

function renderPlot() {
  if (!openDisplay.value) return
  nextTick(() => {
    const { data = {}, layout, config } = JSON.parse(JSON.stringify(plotlyConfig.value))

    const traces = Array.isArray(data) ? data : [data]
    usePlotly('PlotContainer', traces, false, layout, config)
  })
}

// onMounted(() => {
//   renderPlot()
// })
</script>

<template>
  <div class="fixed top-1/2 -right-3" v-if="!openDisplay" @click="openDisplay = true">
    <el-button round plain type="primary" class="pr-2 shadow-md">
      <el-icon><Monitor /></el-icon><span class="mx-2">预览</span>
    </el-button>
  </div>
  <Transition name="slide-fade">
    <div v-if="openDisplay" class="plot-display flex p-2 h-full flex-col shadow-xl outline outline-gray-100">
      <div class="flex-initial flex justify-between items-center pt-2 px-4 pb-4">
        <h3 class="font-bold">配置项预览效果</h3>
        <div>
          <el-button-group class="mr-4">
            <el-tooltip content="自动布局" effect="light">
              <el-button type="primary" :plain="position !== Position.Auto" @click="position = Position.Auto"
                ><span class="text-xs">A</span></el-button
              >
            </el-tooltip>
            <el-tooltip content="右侧布局" effect="light">
              <el-button type="primary" :plain="position !== Position.Right" @click="position = Position.Right"
                ><span class="text-xs">R</span></el-button
              >
            </el-tooltip>
            <el-tooltip content="底部布局" effect="light">
              <el-button type="primary" :plain="position !== Position.Bottom" @click="position = Position.Bottom"
                ><span class="text-xs">B</span></el-button
              >
            </el-tooltip>
          </el-button-group>
          <el-button circle @click="openDisplay = false">
            <el-icon size="20"><CloseBold /></el-icon>
          </el-button>
        </div>
      </div>
      <div class="flex-grow min-h-0 min-w-0" :class="direction === 'horizontal' ? '' : 'columns-2'">
        <div id="PlotContainer" class="plot-container h-1/2 w-full"></div>
        <CodeEditor
          class="w-full"
          :customStyle="{ height: direction === 'horizontal' ? '50%' : '100%' }"
          v-model="code"
          disabled
        />
      </div>
    </div>
  </Transition>
</template>
