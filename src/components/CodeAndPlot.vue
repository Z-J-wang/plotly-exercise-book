<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CodeEditor from '@/components/CodeEditor.vue'
import { usePlotly } from '@/composables/usePlotly'

const props = defineProps(['plotlyConfig', 'code'])

const activeName = ref('plot')
const Plot = ref()

const codeString = computed(() => props.code || JSON.stringify(props.plotlyConfig, null, 2))

onMounted(() => {
  const { data = {}, layout, config } = props.plotlyConfig
  const traces = Array.isArray(data) ? data : [data]
  usePlotly(Plot.value, traces, true, layout, config)
})
</script>

<template>
  <div class="p-2">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="预览" name="plot">
        <div ref="Plot"></div>
      </el-tab-pane>
      <el-tab-pane label="Plotly 配置" name="code">
        <CodeEditor :model-value="codeString" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
