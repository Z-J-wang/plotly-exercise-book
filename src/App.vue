<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const activeIndex = ref('/')
const route = useRoute()

watch(
  () => route.query.id,
  () => {
    scrollIntoView()
  }
)

function scrollIntoView() {
  /**
   * 延迟执行，等待路由加载完成
   */
  const id = route.query.id
  if (id) {
    const targetEl = document.querySelector(`.${id}`)
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: 'smooth', // 平滑滚动
        block: 'start' // 对齐到视口顶部
      })
    }
  }
}

onMounted(() => {
  activeIndex.value = window.location.pathname
  setTimeout(() => {
    scrollIntoView()
  }, 2000)
})
</script>

<template>
  <el-container class="basic-layout">
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/">
          <RouterLink :to="{ name: 'Home' }" class="font-bold text-xl no-underline">Plotly Exercise Book</RouterLink>
        </el-menu-item>
        <el-menu-item index="1">案例</el-menu-item>
        <el-menu-item index="/docs/config">
          <router-link :to="{ name: 'PlotlyConfig' }">配置项</router-link>
        </el-menu-item>
        <el-menu-item index="/docs/api">
          <router-link :to="{ name: 'Api' }">API</router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <RouterView />
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
