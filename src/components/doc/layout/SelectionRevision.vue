<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlotly } from '@/utils/usePlotly'
import CodeEditor from '@/components/CodeEditor.vue'

const code = `let selectionrevision: number = 0
const xData = [1, 2, 3, 4]
const yData = [10, 15, 13, 17

Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { selectionrevision: selectionrevision })

// 第一次数据更新，selectionrevision保持不变，用户选中的数据不会被重置
setTimeout(() => {
  xData.push(Math.random() * 10)
  yData.push(Math.random() * 10)
  Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { selectionrevision: selectionrevision })
}, 2000)

// 第二次数据更新，selectionrevision变化，用户选中的数据被重置
setTimeout(() => {
  xData.push(Math.random() * 10)
  yData.push(Math.random() * 10)
  Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { selectionrevision: ++selectionrevision })
}, 4000)`

let reactFn!: Function
let selectionrevision: number = 0
const xData = [1, 2, 3, 4]
const yData = [10, 15, 13, 17]
function initPlot() {
  const { react } = usePlotly('SelectionRevisionPlotly', [{ x: xData, y: yData, type: 'bar' }], false, {
    clickmode: 'select',
    selectionrevision: ++selectionrevision
  })
  reactFn = react
}

function updatePlot(state: boolean = true) {
  if (state) {
    ++selectionrevision
  }

  xData.push(Math.random() * 10)
  yData.push(Math.random() * 10)

  reactFn([{ x: xData, y: yData, type: 'bar' }], {
    clickmode: 'select',
    selectionrevision: selectionrevision,
    datarevision: Date.now()
  })
}

onMounted(() => initPlot())
</script>

<template>
  <div>
    <div class="whitespace-normal">
      <p class="font-bold"><code>layout.selectionrevision</code>属性用于实现选中数据点状态的持久性。</p>
      <p>
        当通过<code>Plotly.react</code>方法来重新渲染图表时，如果轨迹数据有变更，则用户在图表上的数据点选择状态会重置。
      </p>
      <p>
        若想要保持用户在图表上的数据点选择状态，可通过<code>layout.selectionrevision</code>属性来实现。当更新前后的
        <code>layout.selectionrevision</code>属性值一致时，则图表会保持用户在图表上的数据点选择状态。
      </p>
      <div class="example">
        <p class="mt-4 font-bold">示例:</p>
        <div class="toolbar mt-2">
          <el-button type="primary" @click="updatePlot(false)"
            >新增一个数据点，但不改变 selectionrevision 属性值</el-button
          >
          <el-button @click="updatePlot(true)">新增一个数据点，改变 selectionrevision 属性值</el-button>
        </div>
        <div id="SelectionRevisionPlotly"></div>
        <p class="mt-4 mb-2 font-bold">代码示例：</p>
        <CodeEditor :model-value="code" disabled />
      </div>
    </div>
  </div>
</template>
