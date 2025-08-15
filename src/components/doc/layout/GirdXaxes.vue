<script setup lang="ts">
import CodeAndPlot from '@/components/CodeAndPlot.vue'

const plotlyConfig: PlotlyConfig = {
  data: [
    { x: [20, 30, 40], y: [50, 60, 70], type: 'scatter', xaxis: 'x', yaxis: 'y' },
    { x: [30, 45, 60], y: [50, 60, 65], type: 'scatter', xaxis: 'x2', yaxis: 'y' }
  ],
  layout: {
    grid: { pattern: 'independent', xaxes: ['x', 'x2'], yaxes: ['y'] }
  }
}

const code = `{
  data: [
    { x: [20, 30, 40], y: [50, 60, 70], type: 'scatter', xaxis: 'x', yaxis: 'y' },
    { x: [30, 45, 60], y: [50, 60, 65], type: 'scatter', xaxis: 'x2', yaxis: 'y' }
  ],
  layout: {
    grid: { pattern: 'independent', xaxes: ['x', 'x2'], yaxes: ['y'] }
  }
}`
</script>

<template>
  <p><code>xaxes</code>和<code>yaxes</code>属性同样用于声明网格布局。</p>
  <p>
    <code>columns</code>和<code>rows</code>属性声明的网格布局，会自动为每个单元格坐标轴命名。 例如：<code
      >{ rows: 1, columns: 2 }</code
    >声明了一个包含一个行和两个列的2个单元格网格布局。 同时创建了"x1"、"x2"和"y1"、"y2" 4 个坐标轴。
  </p>
  <p>
    而通过<code>xaxis</code>和<code>yaxis</code>属性在声明网格布局的同时也为坐标轴命名，
    其中数组长度用于确定行数和列数；数组元素为坐标轴名称。 例如：<code>{ xaxis: ["x", "x2"], yaxis: ["y"] }</code>
    等价于 <code>{ rows: 1, columns: 2 }</code>
  </p>

  <p class="font-bold">要点：</p>
  <ul>
    <li>数组元素应该是坐标轴的标识符必须唯一。此外也可以是空字符串，表示不在此列/行添加坐标轴。</li>
    <li>如果存在<code>layout.gird.subplots</code>属性，则会被忽略。</li>
    <li>如果 <code>xaxes</code>或者<code>yaxes</code>缺失，则会生成连续的标识符。</li>
    <li>适用于 x 轴和 y 轴在列和行之间共用的情况。</li>
  </ul>
  <CodeAndPlot class="mt-4" :plotly-config="plotlyConfig" :code="code" />
</template>
