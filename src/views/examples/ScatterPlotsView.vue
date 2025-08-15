<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '@/utils/usePlotly'

onMounted(() => {
  const trace1: Plotly.Data = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  }

  const trace2: Plotly.Data = {
    x: [2, 3, 4, 5.5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
  }

  const trace3: Plotly.Data = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    text: 'group1',
    opacity: 0.7,
    type: 'scatter'
  }

  const data = [trace1, trace2, trace3]

  usePlotly(
    'myDiv',
    data,
    false,
    {
      title: { text: 'Scatter Plot', subtitle: { text: 'Subtitle' } },
      legend: { borderwidth: 2, valign: 'bottom', xanchor: 'right', traceorder: 'grouped' },
      xaxis: { title: { text: 'X Axis Title' } },
      grid: { rows: 2, pattern: 'coupled', columns: 2, xside: 'top plot' }
    },
    { displayModeBar: true }
  )
})
</script>

<template>
  <div class="scatter-plots-view">
    <h1>散点图</h1>
    <div id="myDiv"></div>
  </div>
</template>

<style>
@media (width >= 1024px) {
  .about {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
