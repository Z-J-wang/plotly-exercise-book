<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'

const nav = [
  {
    title: 'Scatter plots',
    icon: IconMenu,
    to: { name: 'ScatterPlots' }
  }
]
</script>

<template>
  <el-menu>
    <el-menu-item v-for="({ title, icon, to }, i) in nav" :index="i.toString()" :key="i" :route="to">
      <el-icon>
        <component :is="icon"></component>
      </el-icon>
      <template #title>{{ title }}</template>
    </el-menu-item>
  </el-menu>
</template>
