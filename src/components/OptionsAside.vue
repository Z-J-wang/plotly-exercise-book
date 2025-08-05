<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useAttributeStore } from '../stores/attribute'
import Attribute from 'entities/attribute'
import { ref, watch } from 'vue'
import { updateHash } from '@/utils'
import { storeToRefs } from 'pinia'

const optionsStore = useAttributeStore()
const { tree: treeData } = storeToRefs(optionsStore)

const route = useRoute()
const currentNodeKey = ref('')

watch(
  () => route.hash,
  (value) => {
    currentNodeKey.value = value.replace('#', '')
  }
)

const handleNodeClick = (data: Attribute) => {
  updateHash(data.id)
}

const defaultProps = {
  children: 'children',
  label: 'name'
}
</script>

<template>
  <el-tree
    style="max-width: 600px"
    :data="treeData"
    node-key="id"
    default-expand-all
    highlight-current
    :current-node-key="currentNodeKey"
    :props="defaultProps"
    @node-click="handleNodeClick"
  />
</template>
