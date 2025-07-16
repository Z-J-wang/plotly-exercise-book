<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '../utils/usePlotly'

onMounted(() => {
  var trace1: PlotlyTypes.ScatterTrace = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter',
    legendrank: 1200,
    legendgroup: 'group1',
    legendgrouptitle: {
      text: 'group12122222222',
      font: {
        color: 'blue',
        style: 'italic',
        variant: 'all-petite-caps'
      }
    }
  }

  var trace2: PlotlyTypes.ScatterTrace = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    legendgroup: 'group1',
    mode: 'lines',
    type: 'scatter'
  }

  var trace3: PlotlyTypes.ScatterTrace = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    opacity: 0.7,
    type: 'scatter'
  }

  var data = [trace1, trace2, trace3]

  usePlotly(
    'myDiv',
    data,
    false,
    {
      title: {
        text: 'Scatter Plot'
      }
    },
    {
      displayModeBar: true
    }
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
