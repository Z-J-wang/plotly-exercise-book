<script setup lang="ts">
import { ref } from 'vue'
import CodeEditor from '../CodeEditor.vue'
import { CloseBold } from '@element-plus/icons-vue'

defineOptions({
  name: 'PlotDisplay'
})

defineProps({
  direction: {
    type: String,
    default: 'vertical',
    validator: (value: string) => {
      return ['horizontal', 'vertical'].includes(value)
    }
  }
})

const code = ref('')
</script>

<template>
  <div
    class="plot-display flex p-2 rounded h-full flex-col"
    :class="direction === 'horizontal' ? 'shadow-xl' : 'shadow-2xl'"
  >
    <div class="flex-initial flex justify-between items-center">
      <h3>配置项预览效果</h3>
      <div>
        <el-button circle>
          <el-icon size="20"><CloseBold /></el-icon>
        </el-button>
      </div>
    </div>
    <div class="flex-grow" :class="direction === 'horizontal' ? '' : 'columns-2'">
      <div ref="PlotContainer" class="plot-container h-1/2 w-full"></div>
      <CodeEditor
        class="w-full"
        :customStyle="{ height: direction === 'horizontal' ? '50%' : '100%' }"
        v-model="code"
      />
    </div>
  </div>
</template>
