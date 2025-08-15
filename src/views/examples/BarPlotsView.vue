<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '@/utils/usePlotly'

onMounted(() => {
  var trace1: PlotlyTypes.ScatterTrace = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'bar'
  }

  var trace2: PlotlyTypes.ScatterTrace = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    type: 'bar'
  }

  var trace3: PlotlyTypes.ScatterTrace = {
    x: [1, 2, 3, 4, 5],
    y: [12, 9, 15, -3, 12],
    mode: 'lines+markers+text',
    type: 'bar'
  }

  var data = [trace1, trace2, trace3]

  const { react } = usePlotly('myDiv', data, false, {
    title: {
      text: 'Bar Plots'
    },
    datarevision: 0,
    uirevision: 'fixed_key'
  })
  setTimeout(() => {
    react(data, {
      title: {
        text: 'new Plots'
      },
      datarevision: 0,
      uirevision: 'fixed_key'
    })
  }, 10000)
  console.log(1)
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
