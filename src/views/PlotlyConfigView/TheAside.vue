<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useAttributeStore } from '@/stores/attribute'
import Attribute from 'entity/attribute'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const optionsStore = useAttributeStore()
const { tree: treeData } = storeToRefs(optionsStore)

const route = useRoute()
const router = useRouter()
const currentNodeKey = ref('')

watch(
  () => route.query.id,
  (value) => {
    if (value && typeof value === 'string') {
      const id = value.replace('#', '')
      currentNodeKey.value = id
      convertToExpendedKeysByID(id)
    }
  },
  { immediate: true }
)

function convertToExpendedKeysByID(id: string) {
  if (!id) return
  const ids = id.split('-')
  const len = ids.length
  const expandedKeys = []
  for (let i = 0; i < len; i++) {
    const idArr = []
    if (i === 0) {
      idArr.push(ids[i])
    } else {
      for (let j = 0; j <= i; j++) {
        idArr.push(ids[j])
      }
    }
    expandedKeys.push(idArr.join('-'))
  }

  return expandedKeys
}

function handleNodeClick(data: Attribute) {
  router.push({ query: { id: data.id } })
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
    :default-expanded-keys="[currentNodeKey]"
    node-key="id"
    accordion
    highlight-current
    :current-node-key="currentNodeKey"
    :expand-on-click-node="false"
    :props="defaultProps"
    @node-click="handleNodeClick"
  />
</template>
