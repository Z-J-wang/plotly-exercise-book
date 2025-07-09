<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import BasicAside from './components/BasicAside.vue'

const activeIndex = ref('1')
</script>

<template>
  <el-container class="basic-layout">
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
        <el-menu-item index="0">
          <RouterLink :to="{ name: 'HomeView' }" class="font-bold text-xl">Plotly.js 习题册</RouterLink>
        </el-menu-item>
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="250px" class="border-r-2">
        <el-scrollbar height="calc(100vh - 60px)">
          <BasicAside />
        </el-scrollbar>
      </el-aside>
      <el-main class="bg-gray-50">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.basic-layout {
  .el-header {
    padding-right: 0;
    padding-left: 0;
  }

  .el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
  }
}
</style>
