<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import CodeEditor from '../CodeEditor.vue'
import { Monitor, CloseBold } from '@element-plus/icons-vue'
import { usePlotly } from '@/utils/usePlotly'
import { useStorage } from '@vueuse/core'

const openDisplay = useStorage('plotly-open-display', true)

/**
 * 暴露给父组件的属性
 */
defineExpose({
  openDisplay
})

defineOptions({
  name: 'PlotDisplay'
})

const plotlyConfig = defineModel<PlotlyConfig>({
  default: () => {
    return {
      data: []
    }
  }
})

export interface PlotlyConfig {
  data: Partial<Plotly.Data>[]
  layout?: Partial<Plotly.Layout>
  config?: Partial<Plotly.Config>
}

defineProps({
  direction: {
    type: String,
    default: 'vertical',
    validator: (value: string) => {
      return ['horizontal', 'vertical'].includes(value)
    }
  }
})

watch([() => plotlyConfig, openDisplay], ([plotlyConfig, openDisplay]) => {
  console.log(openDisplay)

  if (!openDisplay) return
  nextTick(() => {
    const { data, layout, config } = plotlyConfig.value
    usePlotly('PlotContainer', data, false, layout, config)
  })
})

onMounted(() => {
  nextTick(() => {
    const { data, layout, config } = plotlyConfig.value
    usePlotly('PlotContainer', data, false, layout, config)
  })
})

const code = ref('')
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
        />
      </div>
    </div>
  </Transition>
</template>
