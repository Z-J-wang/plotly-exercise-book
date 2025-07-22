<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '../utils/usePlotly'

onMounted(() => {
  var data = [
    {
      z: [
        [10, 10.625, 12.5, 15.625, 20],
        [5.625, 6.25, 8.125, 11.25, 15.625],
        [2.5, 3.125, 5, 8.125, 12.5],
        [0.625, 1.25, 3.125, 6.25, 10.625],
        [0, 0.625, 2.5, 5.625, 21]
      ],
      x: [-9, -6, -5, -3, -1],
      y: [0, 1, 4, 5, 7],
      type: 'contour',
      ncontours: 10
    }
  ]

  var layout = {
    title: {
      text: 'Setting the X and Y Coordinates in a Contour Plot'
    }
  }

  usePlotly('myDiv', data, false, layout)
})
</script>

<template>
  <div class="scatter-plots-view">
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
