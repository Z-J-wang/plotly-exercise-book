<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '../utils/usePlotly'

onMounted(() => {
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  }

  var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
  }

  var trace3 = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    opacity: 0.7,
    type: 'scatter'
  }

  var data = [trace1, trace2, trace3]

  usePlotly('myDiv', data, true, {
    title: {
      text: 'Scatter Plot'
    }
  })
})
</script>

<template>
  <div class="scatter-plots-view">
    <h1>散点图</h1>
    <div id="myDiv" style="width: 400px; height: 400px"></div>
    <div id="myDiv2" style="width: 400px; height: 400px"></div>
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
