<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue'

defineOptions({
  name: 'TheTemplate'
})

const code = `// Template 数据类型
interface Template {
    data?: { [type in PlotType]?: Array<Partial<PlotData>> } | undefined;
    layout?: Partial<Layout> | undefined;
}
`
</script>

<template>
  <p>设置图表的模板。模板属性将覆盖默认属性。</p>
  <p>可通过<code>Plotly.makeTemplate</code>方法基于现有图表快速创建模板。</p>
  <CodeEditor :model-value="code" disabled />
</template>
