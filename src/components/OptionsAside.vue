<script lang="ts" setup>
import options from 'bll/options'
import Attribute from 'entities/attribute'

const handleNodeClick = (data: Attribute) => {
  const { origin, pathname } = location
  location.href = origin + pathname + '#' + data.path
}

const defaultProps = {
  children: 'children',
  label: 'name'
}
</script>

<template>
  <el-tree
    style="max-width: 600px"
    :data="options"
    node-key="path"
    default-expand-all
    highlight-current
    :props="defaultProps"
    @node-click="handleNodeClick"
  />
</template>
