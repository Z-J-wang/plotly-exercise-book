<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { ref } from 'vue'
import OptionsAside from './OptionsAside.vue'

let activeTab = ref('options')

const nav = [
  { title: 'Scatter plots', icon: IconMenu, to: { name: 'ScatterPlotsView' } },
  { title: 'Bar plots', icon: IconMenu, to: { name: 'BarPlotsView' } },
  { title: 'Pie plots', icon: IconMenu, to: { name: 'PiePlotsView' } },
  { title: 'Contour plots', icon: IconMenu, to: { name: 'ContourPlotsView' } },
  { title: 'Table plots', icon: IconMenu, to: { name: 'TablePlotsView' } }
]
</script>

<template>
  <div class="p-2">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="配置" name="options">
        <OptionsAside />
      </el-tab-pane>
      <el-tab-pane label="Api" name="api">Api</el-tab-pane>
      <el-tab-pane label="案例" name="edxample">
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
