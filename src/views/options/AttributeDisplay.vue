<script setup lang="ts">
import Attribute from 'entities/attribute'
import { createUrlHash } from '@/utils'

defineProps({
  data: { type: Attribute, required: true },
  node: { type: Object, required: true }
})
</script>

<template>
  <div class="attribute-display w-full">
    <h4>
      <el-breadcrumb separator=".">
        <el-breadcrumb-item v-for="{ label, value } in data.path" :key="value">
          <a class="cursor-pointer" :href="createUrlHash(value)">{{ label }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </h4>
    <div class="mt-2">
      <span>数据类型：</span> <el-tag type="primary" size="small">{{ data.type }}</el-tag>
    </div>
    <div class="mt-2" v-if="data.controller?.default">
      <span>默认值：</span> <el-tag type="primary" size="small">{{ data.controller?.default }}</el-tag>
    </div>
    <div class="mt-2">
      <span v-if="data.description.type === 'String'" v-html="data.description.value" />
      <component v-else-if="data.description.type === 'Component'" :is="data.description.value" />
    </div>
    <ElDivider class="my-2" />
  </div>
</template>

<style lang="less" scoped>
.attribute-display {
  height: auto;

  .el-breadcrumb {
    span {
      margin: 0;
    }

    .el-breadcrumb__item a {
      font-size: 18px;
      font-weight: lighter;
      color: var(--el-color-primary-light-3);
    }

    .el-breadcrumb__item a:hover {
      text-decoration: underline;
    }

    .el-breadcrumb__item:last-child a {
      font-size: 20px;
      font-weight: bold;
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }
}
</style>
