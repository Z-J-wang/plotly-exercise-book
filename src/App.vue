<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import BasicAside from './components/BasicAside.vue'

const activeIndex = ref('/')

onMounted(() => {
  activeIndex.value = window.location.pathname
})
</script>

<template>
  <el-container class="basic-layout">
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/">
          <RouterLink :to="{ name: 'Home' }" class="font-bold text-xl no-underline">Plotly.js 习题册</RouterLink>
        </el-menu-item>
        <el-menu-item index="1">案例</el-menu-item>
        <el-sub-menu index="/docs">
          <template #title>文档</template>
          <el-menu-item index="/docs/options">配置</el-menu-item>
          <el-menu-item index="/docs/api">Api</el-menu-item>
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
