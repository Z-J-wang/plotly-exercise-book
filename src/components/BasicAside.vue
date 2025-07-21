<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'

const nav = [
  {
    title: 'Scatter plots',
    icon: IconMenu,
    to: { name: 'ScatterPlotsView' }
  },
  {
    title: 'Bar plots',
    icon: IconMenu,
    to: { name: 'BarPlotsView' }
  },
  {
    title: 'Pie plots',
    icon: IconMenu,
    to: { name: 'PiePlotsView' }
  },
  {
    title: 'Heatmap plots',
    icon: IconMenu,
    to: { name: 'HeatmapPlotsView' }
  }
]
</script>

<template>
  <el-menu router>
    <el-menu-item v-for="({ title, icon, to }, i) in nav" :index="i.toString()" :key="i" :route="to">
      <el-icon>
        <component :is="icon"></component>
      </el-icon>
      <template #title>{{ title }}</template>
    </el-menu-item>
  </el-menu>
</template>
