<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  options: {
    type: Object
  },
  type: {
    type: String as PropType<Attribute.Type>,
    required: true
  }
})
const modelValue = defineModel<any>()
</script>

<template>
  <div class="attribute-control text-right" style="width: 200px">
    <el-input v-if="type === 'string'" v-model="modelValue" placeholder="请输入内容" />
    <el-switch
      v-else-if="type === 'boolean'"
      v-model="modelValue"
      size="small"
      active-text="Open"
      inactive-text="Close"
    />
    <el-color-picker v-else-if="type === 'color'" v-model="modelValue" />
  </div>
</template>
