<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '@/composables/usePlotly'

onMounted(() => {
  const trace1: Plotly.Data = { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'bar' }
  const trace2: Plotly.Data = { x: [2, 3, 4, 5], y: [16, 5, 11, 9], type: 'bar' }
  const trace3: Plotly.Data = { x: [1, 2, 3, 4, 5], y: [12, 9, 15, -3, 12], mode: 'text+lines+markers', type: 'bar' }

  const { react } = usePlotly('myDiv', [trace1, trace2, trace3], false, {
    title: {
      text: 'Bar Plots'
    },
    datarevision: 0,
    uirevision: 'fixed_key'
  })
  setTimeout(() => {
    react([trace1, trace2, trace3], {
      title: {
        text: 'new Plots'
      },
      datarevision: 0,
      uirevision: 'fixed_key'
    })
  }, 10000)
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
