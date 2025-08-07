<script setup lang="ts">
import { createUrlHash } from '@/utils'
import AttributeControl from '@/components/AttributeControl.vue'
import { ref, watch } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { usePloyConfigStore } from '@/stores/ploy.config'

const props = defineProps({
  data: { type: Object, required: true },
  node: { type: Object, required: true }
})
const ployConfigStore = usePloyConfigStore()
const { updateConfig } = ployConfigStore

const trying = ref(false)
const attribute = ref<any>(props.data.controller?.value)

watch(attribute, (value) => {
  updateConfig(props.data.id, value)
})

function openEdit() {
  trying.value = !trying.value
  if (trying.value) {
    const { id, controller } = props.data
    const { value } = controller
    updateConfig(id, value)
  }
}
</script>

<template>
  <div class="attribute-display w-full">
    <div class="flex">
      <div class="flex-auto">
        <div class="flex justify-between w-full">
          <h4 :class="data.id">
            <el-breadcrumb separator=".">
              <el-breadcrumb-item v-for="{ name, value } in data.path" :key="value">
                <a class="cursor-pointer" :href="createUrlHash(value)">{{ name }}</a>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </h4>
        </div>
        <div class="mt-2">
          <span>数据类型：</span> <el-tag type="primary" size="small">{{ data.type }}</el-tag>
        </div>
        <div class="mt-2" v-if="data.controller?.default">
          <span>默认值：</span> <el-tag type="primary" size="small">{{ data.controller?.default }}</el-tag>
        </div>
        <div class="mt-2">
          <span class="whitespace-normal" v-if="data.description.type === 'string'" v-html="data.description.value" />
          <component v-else-if="data.description.type === 'Component'" :is="data.description.value" />
        </div>
      </div>
      <div class="flex-initial text-right" v-if="data.controller">
        <el-button :type="trying ? 'primary' : ''" :icon="Edit" circle @click="openEdit" />
        <AttributeControl
          v-if="trying"
          class="mt-2"
          v-model="attribute"
          :type="data.controller.type"
          :options="data.controller.options"
          :max="data.controller.max"
          :min="data.controller.min"
          :step="data.controller.step"
        />
      </div>
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
      font-size: 16px;
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
