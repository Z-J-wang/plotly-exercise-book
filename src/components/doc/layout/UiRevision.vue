<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlotly } from '@/composables/usePlotly'
import CodeEditor from '@/components/CodeEditor.vue'

const LABEL = {
  old: 'old Plots',
  new: 'new Plots'
}

const code = `let uirevision: number = 0
const xData = [1, 2, 3, 4]
const yData = [10, 15, 13, 17

Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { uirevision: uirevision })

// 第一次重绘，uirevision保持不变，用户选中的交互结果不会被重置
setTimeout(() => {
  Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { uirevision: uirevision })
}, 2000)

// 第二次数据更新，uirevision变化，用户选中的交互结果被重置
setTimeout(() => {
  Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { uirevision: ++uirevision })
}, 4000)`

let reactFn!: Function
let uirevision = 0
const flag = ref(false)
const traceData: Plotly.Data = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  type: 'bar'
}

function initPlot() {
  const { react } = usePlotly('UiRevisionPlotly', [traceData], false, {
    title: { text: LABEL.old },
    uirevision: ++uirevision
  })
  reactFn = react
}

function updatePlot(state: boolean = true) {
  if (state) ++uirevision
  flag.value = true

  reactFn([traceData], {
    title: { text: LABEL.new },
    uirevision: uirevision
  })
}

function reset() {
  flag.value = false
  initPlot()
}

onMounted(() => {
  initPlot()
})
</script>

<template>
  <div>
    <div class="whitespace-normal">
      <p class="font-bold"><code>layout.uirevision</code>属性用于实现用户UI交互的持久性。</p>
      <p>
        当 Plotly 需要通过 <code>Plotly.react</code> 方法来重新渲染图表时，如果设置了
        <code>layout.uirevision</code> 属性且更新前后该值一致，则用户在图表上的 UI 交互不会被重置。
      </p>
      <p>UI 交互包括：缩放，选择，拖拽等等。</p>
      <div class="example">
        <p class="mt-4 font-bold">示例:</p>
        <div class="toolbar mt-2">
          <p class="mb-2">请进行诸如缩放，拖拽，选择等操作，然后点击按钮更新图表：</p>
          <el-button type="primary" :disabled="flag" @click="updatePlot(false)"
            >不改变 uirevision 属性值的更新</el-button
          >
          <el-button :disabled="flag" @click="updatePlot(true)">改变 uirevision 属性值的更新</el-button>
          <el-button type="info" @click="reset()">重置</el-button>
        </div>
        <div id="UiRevisionPlotly"></div>
        <p class="mt-4 mb-2 font-bold">代码示例：</p>
        <CodeEditor :model-value="code" disabled />
      </div>
    </div>
  </div>
</template>
