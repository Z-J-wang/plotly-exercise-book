<script setup lang="ts">
import Attribute from 'entities/attribute'
import { createUrlHash } from '@/utils'

defineProps({
  data: { type: Attribute, required: true },
  node: { type: Object, required: true }
})
</script>

<template>
  <div class="attribute-display">
    <h5>
      <el-breadcrumb separator=".">
        <el-breadcrumb-item v-for="{ label, value } in data.path" :key="value">
          <a class="cursor-pointer" :href="createUrlHash(value)">{{ label }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </h5>
    <div>{{ data.description }}</div>
  </div>
</template>

<style lang="less" scoped>
.attribute-display {
  height: auto;

  .el-breadcrumb {
    .el-breadcrumb__item a {
      font-size: 16px;
      font-weight: lighter;
      color: var(--el-color-primary-light-3);
    }

    .el-breadcrumb__item a:hover {
      text-decoration: underline;
    }

    .el-breadcrumb__item:last-child a {
      font-size: 18px;
      font-weight: bold;
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }
}
</style>
