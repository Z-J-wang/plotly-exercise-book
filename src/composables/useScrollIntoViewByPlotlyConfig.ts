import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useScrollIntoViewByPlotlyConfig(interval: number = 1000) {
  const route = useRoute()
  function scrollIntoView() {
    if (id.value) {
      const targetEl = document.querySelector(`.${id.value}`)
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth', // 平滑滚动
          block: 'center' // 对齐到视口顶部
        })
      }
    }
  }

  const id = computed(() => route.query.id)

  watch(
    () => id.value,
    () => {
      scrollIntoView()
    },
    {
      immediate: true
    }
  )

  onMounted(() => {
    /**
     * 延迟执行，等待路由加载完成
     */
    setTimeout(() => {
      scrollIntoView()
    }, interval)
  })

  return { scrollIntoView }
}
