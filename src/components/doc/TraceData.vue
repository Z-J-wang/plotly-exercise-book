<script setup lang="ts">
const traceTypes = [
  { name: 'scatter', description: '散点折线图', to: { name: 'PlotlyConfig', query: { id: 'trace-scatter' } } },
  { name: 'bar', description: '柱状图', to: { name: 'PlotlyConfig', query: { id: 'trace-bar' } } },
  { name: 'pie', description: '饼图', to: { name: 'PlotlyConfig', query: { id: 'trace-pie' } } }
]
</script>

<template>
  <div class="trace-data whitespace-normal">
    <p>
      <code>trace</code>，翻译为轨迹，是 Plotly
      的图表的绘图数据对象。一张图表可由一个或者多个轨迹组成，具体取决于轨迹的类型。例如折线图就可以由多个轨迹构成，一个轨迹对应一条线。
    </p>
    <p>Plotly 支持如下轨迹（图表）：</p>
    <ul>
      <li v-for="{ name, description, to } in traceTypes" :key="name">
        <RouterLink :to="to"
          ><code>{{ name }}</code> - {{ description }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
