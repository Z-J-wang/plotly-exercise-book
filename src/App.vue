<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const year = ref(new Date().getFullYear())

watch(
  () => route.query.id,
  () => {
    scrollIntoView()
  }
)

const showFooter = computed(() => {
  const blackList = ['/docs']
  return !route.matched.some((item) => blackList.includes(item.path))
})

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
        block: 'center' // 对齐到视口顶部
      })
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    scrollIntoView()
  }, 2000)
})
</script>

<template>
  <el-container class="basic-layout">
    <el-header class="bg-white border-0 shadow flex justify-between items-center z-50">
      <RouterLink :to="{ name: 'Home' }" class="font-bold text-2xl no-underline text-primary"
        >Plotly Exercise Book</RouterLink
      >
      <div class="flex items-center gap-2">
        <el-menu mode="horizontal" :ellipsis="false" router>
          <el-menu-item index="/">
            <router-link class="no-underline" :to="{ name: 'Home' }">首页</router-link>
          </el-menu-item>
          <el-menu-item index="/docs/config">
            <router-link class="no-underline" :to="{ name: 'PlotlyConfig' }">配置项</router-link>
          </el-menu-item>
          <el-menu-item index="/docs/api">
            <router-link class="no-underline" :to="{ name: 'Api' }">API</router-link>
          </el-menu-item>
          <el-menu-item index="/example">
            <a href="https://plotly.com/javascript/" target="_blank" rel="noopener noreferrer">案例</a>
          </el-menu-item>
        </el-menu>
        <el-divider direction="vertical" />
        <a
          class="flex"
          href="https://github.com/Z-J-wang/plotly-exercise-book"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            height="24"
            aria-hidden="true"
            viewBox="0 0 24 24"
            version="1.1"
            width="32"
            data-view-component="true"
            class="octicon octicon-mark-github v-align-middle"
          >
            <path
              d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"
            ></path>
          </svg>
        </a>
        <el-divider direction="vertical" />
        <a href="https://github.com/Z-J-wang/plotly-exercise-book/stargazers" target="_blank" rel="noopener noreferrer">
          <img
            class="block"
            src="https://img.shields.io/github/stars/Z-J-wang/plotly-exercise-book.svg?style=social"
            alt="GitHub stars"
            height="24"
          />
        </a>
      </div>
    </el-header>
    <RouterView />
    <el-footer v-if="showFooter" class="bg-white text-center mt-4 h-full" height="auto">
      <div class="py-4">
        <p>
          Released under the
          <a
            class="text-primary"
            href="https://github.com/vuejs/vitepress/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            >MIT License</a
          >.
        </p>
        <p>
          Copyright © {{ year }}-present
          <a class="text-primary" href="https://github.com/Z-J-wang" target="_blank" rel="noopener noreferrer">Jay</a>
        </p>
      </div>
    </el-footer>
  </el-container>
</template>

<style lang="less" scoped>
.basic-layout {
  min-height: 100vh;

  .el-header {
    position: sticky;
    top: 0;

    .el-divider.el-divider--vertical {
      border-left-width: 1px;
      height: 26px;
    }
  }

  .el-menu--horizontal {
    background-color: transparent;
  }

  .el-menu--horizontal,
  .el-menu--horizontal > .el-menu-item {
    border-bottom: 0 !important;
  }

  .el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
  }
}
</style>
