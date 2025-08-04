<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  options: { type: [], default: () => [] },
  type: { type: String as PropType<Attribute.Type>, required: true },
  min: { type: Number, default: Number.MIN_SAFE_INTEGER },
  max: { type: Number, default: Number.MAX_SAFE_INTEGER },
  step: { type: Number, default: 1 }
})
const modelValue = defineModel<any>()
</script>

<template>
  <div class="attribute-control text-right" style="width: 200px">
    <el-input v-if="type === 'string'" v-model.lazy.trim="modelValue" placeholder="请输入内容" />
    <el-input-number v-else-if="type === 'number'" v-model.lazy.trim="modelValue" :min="min" :max="max" :step="step" />
    <el-switch
      v-else-if="type === 'boolean'"
      v-model.lazy="modelValue"
      size="small"
      active-text="Open"
      inactive-text="Close"
    />
    <el-color-picker v-else-if="type === 'color'" v-model.lazy="modelValue" />
    <el-select v-else-if="type === 'select'" v-model.lazy="modelValue" placeholder="Select">
      <el-option v-for="item in options" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
</template>
