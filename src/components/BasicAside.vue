<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import OptionsAside from './OptionsAside.vue'
import { useRouter, useRoute } from 'vue-router'
import type { TabPaneName } from 'element-plus'

let activeTab = ref('/docs/options')

const router = useRouter()
const route = useRoute()

const nav = [
  { title: 'Scatter plots', icon: IconMenu, to: { name: 'ScatterPlotsView' } },
  { title: 'Bar plots', icon: IconMenu, to: { name: 'BarPlotsView' } },
  { title: 'Pie plots', icon: IconMenu, to: { name: 'PiePlotsView' } },
  { title: 'Contour plots', icon: IconMenu, to: { name: 'ContourPlotsView' } },
  { title: 'Table plots', icon: IconMenu, to: { name: 'TablePlotsView' } }
]

watch(
  () => route.path,
  (path) => {
    activeTab.value = path
  },
  {
    immediate: true
  }
)

function changeHandler(item: TabPaneName) {
  router.push({
    path: item as string
  })
}
</script>

<template>
  <div class="p-2">
    <el-tabs v-model="activeTab" stretch @tab-change="changeHandler">
      <el-tab-pane label="配置" name="/docs/config">
        <OptionsAside />
      </el-tab-pane>
      <el-tab-pane label="Api" name="/docs/api">Api</el-tab-pane>
      <el-tab-pane label="案例" name="Example">
        <el-menu router>
          <el-menu-item
            class="pl-0 ml-0"
            v-for="({ title, icon, to }, i) in nav"
            :index="i.toString()"
            :key="i"
            :route="to"
          >
            <el-icon>
              <component :is="icon"></component>
            </el-icon>
            <template #title>{{ title }}</template>
          </el-menu-item>
        </el-menu>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
