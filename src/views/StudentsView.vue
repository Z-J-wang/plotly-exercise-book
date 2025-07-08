<script setup lang="ts">
import { getAll } from 'bll/student.bll'
import { ref, onMounted } from 'vue'

let tableData = ref()

onMounted(async () => {
  tableData.value = await getAll()
})
</script>

<template>
  <main>
    <table
      class="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm"
    >
      <thead class="bg-slate-50 dark:bg-slate-700">
        <tr>
          <th
            class="w-1/5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left"
          >
            Id
          </th>
          <th
            class="w-1/5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left"
          >
            姓名
          </th>
          <th
            class="w-1/5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left"
          >
            年龄
          </th>
          <th
            class="w-1/5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left"
          >
            性别
          </th>
          <th
            class="w-1/5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left"
          >
            班级
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id">
          <td class="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
            {{ item.sid }}
          </td>
          <td class="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
            {{ item.fullName }}
          </td>
          <td class="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
            {{ item.age }}
          </td>
          <td class="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
            {{ item.gender }}
          </td>
          <td class="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
            {{ item.cName }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
