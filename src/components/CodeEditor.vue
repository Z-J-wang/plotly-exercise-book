<template>
  <codemirror
    :value="modelValue"
    placeholder="Code goes here..."
    :style="customStyle"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    v-bind="$attrs"
    @ready="handleReady"
    @change="(value) => $emit('update:modelValue', value)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import type { EditorState } from '@codemirror/state'
import type { EditorView } from 'codemirror'

defineProps({
  modelValue: {
    type: String,
    default: 'console.log("Hello, world!")'
  },
  customStyle: {
    type: Object,
    default: () => ({ height: '400px' })
  }
})

defineEmits(['update:modelValue'])

const extensions = [javascript(), oneDark]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload: { view: EditorView; state: EditorState; container: HTMLDivElement }) => {
  log('ready', payload)
  view.value = payload.view
}

const log = (eventName: string, payload: any) => {}
</script>
