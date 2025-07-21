<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '../utils/usePlotly'
import { vi } from 'element-plus/es/locales.mjs'

onMounted(() => {
  var trace1: PlotlyTypes.ScatterTrace = {
    x: 0,
    dx: 1,
    y: [10, 15, 13, 17],
    offsetgroup: '2',
    text: ['As可接受的的接口', 'B', 'C', 'D'],
    textangle: 45,
    insidetextanchor: 'middle',
    textposition: 'outside',
    // insidetextfont: {
    //   family: 'Arial',
    //   size: 12,
    //   color: 'red'
    // },
    type: 'bar',
    marker: {
      color: 'red'
    }
  }

  var trace2: PlotlyTypes.ScatterTrace = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    offsetgroup: '2',
    mode: 'lines',
    x2: [9, 8, 6, 2],
    groupnorm: 'fraction',
    type: 'bar',
    zorder: 2
  }

  var trace3: PlotlyTypes.ScatterTrace = {
    x: [1, 2, 3, 4, 5],
    y: [12, 9, 15, null, 12],
    mode: 'lines+markers+text',
    offsetgroup: '3',
    type: 'bar',
    groupnorm: 'fraction'
  }

  var data = [trace1, trace2, trace3]

  usePlotly('myDiv', data, false)
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
