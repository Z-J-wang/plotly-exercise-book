<script lang="ts" setup>
import CodeEditor from '@/components/CodeEditor.vue'

const code = `const traceData = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  type: 'bar'
}

let layout = {
  title: {
    text: 'old title'
  },
  datarevision: 0
}

Plotly.react('MyDiv', [traceData], layout)

// 2秒后更新标题
setTimeout(() => {
  // 仅更新标题，不改变datarevision。Plotly 忽略数据对比，提升渲染性能
  layout.title.text = 'new title'
  Plotly.react('MyDiv', [traceData], layout)
}, 2000)
`
</script>

<template>
  <div class="whitespace-normal">
    <code>layout.datarevision</code
    >属性是一个用于优化动态图表更新性能的重要属性，尤其在处理频繁变化的数据时。它的核心作用是告知 Plotly
    的绘图引擎数据是否发生了实质性变化，从而决定是否需要执行完整的数据比较和重绘流程。

    <h4 class="mt-4 font-bold">当图表数据更新时，Plotly 默认会对比新旧数据差异以确定如何更新图表：</h4>
    <ol>
      <li>如果<code>datarevision</code>未提供，则进行全量数据更新。</li>
      <li>如果提供<code>datarevision</code>，则进行进一步处理：</li>
      <ol>
        <li>
          如果<code>datarevision</code>的值未改变，Plotly 会跳过数据差异对比，直接复用当前渲染结果，大幅提升更新效率。
        </li>
        <li>如果<code>datarevision</code>的值改变，Plotly 会执行完整的数据差异检测，仅更新变化的部分。</li>
      </ol>
    </ol>

    <p class="mt-4 mb-2 font-bold">代码示例：</p>
    <CodeEditor v-model="code" disabled />
  </div>
</template>
