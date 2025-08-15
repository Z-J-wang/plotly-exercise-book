<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '@/utils/usePlotly'

onMounted(() => {
  var data = [
    {
      z: [
        [1, 20, 30, 50],
        [20, 1, 60, 80],
        [30, 60, 1, 90]
      ],
      text: [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3']
      ],
      type: 'heatmap'
    }
  ]

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
