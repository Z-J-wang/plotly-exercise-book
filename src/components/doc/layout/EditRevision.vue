<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlotly } from '@/composables/usePlotly'
import CodeEditor from '@/components/CodeEditor.vue'

const code = `let editrevision: number = 0
const xData = [1, 2, 3, 4]
const yData = [10, 15, 13, 17

Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { editrevision: editrevision })

// 第一次重绘，editrevision保持不变，用户选中的编辑内容不会被重置
setTimeout(() => {
  Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { editrevision: editrevision })
}, 2000)

// 第二次数据更新，editrevision变化，用户选中的编辑内容被重置
setTimeout(() => {
  Plotly.react('MyDiv', [{ x: xData, y: yData, type: 'bar' }], { editrevision: ++editrevision })
}, 4000)`

let reactFn!: Function
let editrevision = 0
const traceData: Plotly.Data = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  type: 'bar'
}

function initPlot() {
  const { react } = usePlotly(
    'EditRevisionPlotly',
    [traceData],
    false,
    { editrevision: ++editrevision },
    { editable: true }
  )
  reactFn = react
}

function updatePlot(state: boolean = true) {
  if (state) {
    ++editrevision
  }

  reactFn([traceData], { editrevision: editrevision }, { editable: true })
}

onMounted(() => {
  initPlot()
})
</script>

<template>
  <div>
    <div class="whitespace-normal">
      <p class="font-bold"><code>layout.editrevision</code>属性用于实现编辑结果的持久性。</p>
      <p>
        当 Plotly需要通过
        <code>Plotly.react</code>
        方法来重新渲染图表时，如果设置了
        <code>layout.editrevision</code> 属性且更新前后该值一致，则用户在图表上的编辑内容不会被重置。
      </p>
      <p><span>注意：</span>轨迹名称和坐标轴名称不会被保留。</p>
      <div class="example">
        <p class="mt-4 font-bold">示例:</p>
        <div class="toolbar mt-2">
          <p class="mb-2">请进行诸如缩放，拖拽，选择等操作，然后点击按钮更新图表：</p>
          <el-button type="primary" @click="updatePlot(false)">不改变 editrevision 属性值的更新</el-button>
          <el-button @click="updatePlot(true)">改变 editrevision 属性值的更新</el-button>
        </div>
        <div id="EditRevisionPlotly"></div>
        <p class="mt-4 mb-2 font-bold">代码示例：</p>
        <CodeEditor :model-value="code" disabled />
      </div>
    </div>
  </div>
</template>
