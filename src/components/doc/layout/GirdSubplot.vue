<script setup lang="ts">
import CodeAndPlot from '@/components/CodeAndPlot.vue'

const plotlyConfig: PlotlyConfig = {
  data: [
    { x: [1, 2, 3], y: [2, 3, 4], type: 'scatter' },
    { x: [20, 30, 40], y: [5, 5, 5], xaxis: 'x2', yaxis: 'y', type: 'scatter' },
    { x: [2, 3, 4], y: [600, 700, 800], xaxis: 'x', yaxis: 'y3', type: 'scatter' },
    {
      x: [4000, 5000, 6000],
      y: [7000, 8000, 9000],
      xaxis: 'x4',
      yaxis: 'y4',
      type: 'scatter'
    }
  ],
  layout: {
    grid: {
      subplots: [
        ['xy', 'x2y'],
        ['xy3', 'x4y4']
      ]
    }
  }
}

const code = `{
data: [
    { x: [1, 2, 3], y: [2, 3, 4], type: 'scatter' },
    { x: [20, 30, 40], y: [5, 5, 5], xaxis: 'x2', yaxis: 'y', type: 'scatter' },
    { x: [2, 3, 4], y: [600, 700, 800], xaxis: 'x', yaxis: 'y3', type: 'scatter' },
    {
      x: [4000, 5000, 6000],
      y: [7000, 8000, 9000],
      xaxis: 'x4',
      yaxis: 'y4',
      type: 'scatter'
    }
  ],
  layout: {
    grid: {
      subplots: [
        ['xy', 'x2y'],
        ['xy3', 'x4y4']
      ]
    }
  }
}`
</script>

<template>
  <p><code>subplots</code>属性用于更加自由的网格布局。</p>
  <p>
    <code>xaxes</code
    >和<code>yaxes</code>属性声明的布局存在一个问题——在坐标轴在行和列中必须共用（即，没方法给每个单元格设置独立的坐标轴）。
  </p>
  <p>
    而<code>subplots</code>就可以实现这个效果。例如<code>{ subplots: [['xy', 'x2y2'], ['x3y3', 'x4y4']] }</code
    >配置，将绘图区域划分为 2x2 的单元格并为每个单元格指定坐标轴。
  </p>
  <p class="font-bold">要点：</p>
  <ul>
    <li>数据结构为二维坐标轴名称数组。一个子数组对应网格中的一行。</li>
    <li>坐标轴的标识符必须唯一。此外也可以是空字符串，表示不在此单元格添加坐标轴。</li>
  </ul>
  <CodeAndPlot class="mt-4" :plotly-config="plotlyConfig" :code="code" />
</template>
