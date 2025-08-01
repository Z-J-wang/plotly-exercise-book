<script setup lang="ts">
import { ref } from 'vue'
import CodeEditor from '../CodeEditor.vue'
import { Monitor, CloseBold } from '@element-plus/icons-vue'

const openDisplay = ref(false)

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
  <div class="fixed top-1/2 -right-3" v-if="!openDisplay" @click="openDisplay = true">
    <el-button round plain type="primary" class="pr-2 shadow-md">
      <el-icon><Monitor /></el-icon><span class="mx-2">预览</span>
    </el-button>
  </div>
  <div
    class="plot-display flex p-2 rounded h-full flex-col transition-all"
    :class="{
      'shadow-xl translate-x-full ': direction === 'horizontal',
      'shadow-2xl translate-y-full': direction === 'vertical',
      'translate-x-0 translate-y-0': openDisplay
    }"
  >
    <div class="flex-initial flex justify-between items-center">
      <h3>配置项预览效果</h3>
      <div>
        <el-button circle @click="openDisplay = false">
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
