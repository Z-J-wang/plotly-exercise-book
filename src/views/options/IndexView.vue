<script setup lang="ts">
import { useOptionsStore } from '@/stores/options'
import AttributeDisplay from './AttributeDisplay.vue'

const optionsStore = useOptionsStore()
const options = optionsStore.options

const defaultProps = {
  children: 'children',
  label: 'name',
  class: () => 'tree-node'
}
</script>

<template>
  <div class="options-view m-4 p-4 bg-white">
    <el-tree :data="options" node-key="id" default-expand-all :props="defaultProps">
      <template #default="{ node, data }">
        <AttributeDisplay :data="data" :node="node" />
      </template>
    </el-tree>
  </div>
</template>

<style lang="less">
.options-view {
  .tree-node {
    .el-tree-node__content {
      align-items: flex-start;
      height: auto;

      &:hover {
        background-color: unset;
      }
    }
  }
}
</style>
