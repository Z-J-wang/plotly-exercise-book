<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import CodeEditor from '@/components/CodeEditor.vue'
import { Monitor, CloseBold } from '@element-plus/icons-vue'
import { usePlotly } from '@/utils/usePlotly'
import { useStorage } from '@vueuse/core'
import { usePloyConfigStore } from '@/stores/ploy.config'
import { storeToRefs } from 'pinia'

const openDisplay = useStorage('plotly-open-display', true)
const ployConfigStore = usePloyConfigStore()
const { config: plotlyConfig, code } = storeToRefs(ployConfigStore)

/**
 * 暴露给父组件的属性
 */
defineExpose({
  openDisplay
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
    renderPlot()
  },
  { deep: true }
)

function renderPlot() {
  if (!openDisplay.value) return
  nextTick(() => {
    const { data = {}, layout, config } = JSON.parse(JSON.stringify(plotlyConfig.value))
    console.log(data, layout, config)

    usePlotly('PlotContainer', [data], false, layout, config)
  })
}

onMounted(() => {
  renderPlot()
})
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
          <el-button circle @click="openDisplay = false">
            <el-icon size="20"><CloseBold /></el-icon>
          </el-button>
        </div>
      </div>
      <div class="flex-grow" :class="direction === 'horizontal' ? '' : 'columns-2'">
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
