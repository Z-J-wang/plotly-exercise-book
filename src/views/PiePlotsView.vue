<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '../utils/usePlotly'

onMounted(() => {
  var data = [
    {
      type: 'pie',
      values: [2, 4, 4, 1],
      labels: ['Wages', 'Operating expenses', 'Cost of sales', 'Insurance'],
      textinfo: 'label+percent',
      sort: true
    }
  ]

  var layout = {
    margin: { t: 0, b: 0, l: 0, r: 0 }
  }

  usePlotly('myDiv', data, false, layout)
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
