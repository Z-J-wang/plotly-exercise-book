<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePlotly } from '../utils/usePlotly'

onMounted(() => {
  var trace1: PlotlyTypes.ScatterTrace = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  }

  var trace2: PlotlyTypes.ScatterTrace = {
    x: [2, 3, 4, 5.5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
  }

  var trace3: PlotlyTypes.ScatterTrace = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    text: 'group1',
    mode: 'lines+markers+text',
    opacity: 0.7,
    type: 'scatter'
  }

  var data = [trace1, trace2]

  const { plotlyTemplate } = usePlotly(
    'myDiv',
    data,
    false,
    {
      title: {
        text: 'Scatter Plot',
        subtitle: {
          text: 'Subtitle'
        }
      },
      legend: {
        borderwidth: 2,
        valign: 'bottom',
        xanchor: 'right',
        traceorder: 'grouped'
      },
      xaxis: {
        title: {
          text: 'X Axis Title'
        }
      },
      grid: {
        rows: 2,
        pattern: 'coupled',
        columns: 2,
        xside: 'top plot'
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
