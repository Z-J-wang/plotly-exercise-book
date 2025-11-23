<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { VueLenis } from 'lenis/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const lenisRef = ref()

watchEffect((onInvalidate) => {
  if (!lenisRef.value?.lenis) return

  // 页面滚动时触发 ScrollTrigger 的更新
  lenisRef.value.lenis.on('scroll', ScrollTrigger.update)

  function update(time: number) {
    // 将Lenis requestAnimationFrame （raf）方法添加到GSAP的计时器中
    lenisRef.value.lenis.raf(time * 1000)
  }
  gsap.ticker.add(update) // 将update方法添加到GSAP的计时器中

  // 在GSAP中禁用滞后平滑,以防止滚动动画中的任何延迟
  gsap.ticker.lagSmoothing(0)

  // 从watchEffect的前一次执行中清除GSAP的报价器，或者当该效果停止时
  onInvalidate(() => {
    gsap.ticker.remove(update)
  })

  onUnmounted(() => {
    gsap.ticker.remove(update)
    lenisRef.value.lenis.destroy()
  })
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger) // 注册ScrollTrigger插件
  setTimeout(() => {
    // 为页面中的所有元素增加淡入动画效果
    const sections = gsap.utils.toArray('section') as HTMLElement[]
    sections.forEach((section, i) => {
      gsap.set(section, { opacity: 0, y: 50 })

      // 创建滚动触发器，详见：https://www.wuzao.com/gsap/docs/v3/Plugins/ScrollTrigger/index.html#config-object
      ScrollTrigger.create({
        trigger: section,
        start: 'top 100%',
        animation: gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.2, // 序列延迟
          ease: 'back.out(1.2)'
        })
      })
    })
  }, 500)
})
</script>

<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: false }" />
</template>
