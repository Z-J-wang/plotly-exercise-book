<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue'
import { Right } from '@element-plus/icons-vue'

const cdnCode =
  `<head>
  <script src='https://cdn.plot.ly/plotly-3.1.0.min.js' charset='utf-8'><` +
  `/script>
</head>`

const npmCode = `
// ES6 module
import Plotly from 'plotly.js-dist-min'

// CommonJS
const Plotly = require('plotly.js-dist-min')
`

const createDivCode = `
<div id="myDiv" style="width:600px;height:250px;"></div>
`

const renderPlotCode = `
Plotly.newPlot('myDiv', [{ x: [1, 2, 3, 4, 5], y: [1, 2, 4, 8, 16] }]);
`

const plotlyTypeDeclarationCode = `/// <reference types="vite/client" />

// 如果安装的是其他 plotly.js 包，则把 plotly.js-dist 改成所安装的包名
declare module 'plotly.js-dist' {
  // 从 plotly.js 导入类型定义
  import Plotly from 'plotly.js'

  // 将默认导出替换成 plotly.js 导入类型定义 ，使得 plotly.js-dist 可以被 TypeScript 识别
  export default Plotly
}
`
</script>

<template>
  <main>
    <section class="m-full bg-white">
      <div class="max-w-screen-xl w-full mx-auto py-6">
        <h2 class="text-6xl font-bold mt-10 mb-10 text-primary">Plotly Exercise Book</h2>
        <p class="w-2/3 text-xl">
          Plotly Exercise Book（Plotly 练习册）旨在帮助前端开发人员更好的学习和使用 Plotly，系统性描述 plotly.js
          使用方法，对常用的配置项提供了交互式的程序示例，以便直观的感受和了解 plotly.js 的使用方法。
        </p>
        <div class="md:columns-3 sm:columns-1 mt-20 mb-8">
          <el-card shadow="hover" class="rounded-lg" header-class="bg-stone-100" body-class="bg-stone-100">
            <template #header>
              <el-text size="large" class="font-bold">配置项说明</el-text>
            </template>
            <el-text truncate line-clamp="2">每个配置项都提供了与之相对的示例，直观的了解特性。</el-text>
            <div class="flex justify-end mt-8">
              <RouterLink :to="{ name: 'PlotlyConfig' }">
                <el-button type="text">
                  查看文档<el-icon class="ml-1" size="16"><Right /></el-icon>
                </el-button>
              </RouterLink>
            </div>
          </el-card>
          <el-card shadow="hover" header-class="bg-stone-100" body-class="bg-stone-100">
            <template #header>
              <el-text size="large" class="font-bold">Api 说明</el-text>
            </template>
            <el-text truncate line-clamp="2">Plotly.js API 的全面介绍。</el-text>
            <div class="flex justify-end mt-8">
              <RouterLink :to="{ name: 'Api' }">
                <el-button type="text">
                  查看文档<el-icon class="ml-1" size="16"><Right /></el-icon>
                </el-button>
              </RouterLink>
            </div>
          </el-card>
          <el-card shadow="hover" header-class="bg-stone-100" body-class="bg-stone-100">
            <template #header>
              <el-text size="large" class="font-bold">案例</el-text>
            </template>
            <el-text truncate line-clamp="2">Plotly.js 各个图表的使用案例。</el-text>
            <div class="flex justify-end mt-8">
              <el-button class="no-underline" type="text" href="https://plotly.com/javascript/" target="_blank" tag="a">
                查看文档<el-icon class="ml-1" size="16"><Right /></el-icon>
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </section>
    <section class="max-w-screen-xl w-full mx-auto mt-4 px-4 py-8 bg-white">
      <section>
        <h2 class="text-2xl font-bold mb-4">认识 Plotly</h2>
        <p>
          Plotly 是一个开源的、交互式的数据图表库和地图库，支持多种开发语言（包括： Python, R, Julia, Javascript,
          ggplot2, F#, MATLAB®, and Dash）。
        </p>
        <h3 class="text-xl font-bold mt-6 mb-2">Plotly.js</h3>
        <p>
          Plotly.js 是基于 d3.js 和 stack.gl 构建的高级、声明式的图表库。它自带超过 40 种图表类型，包括 3D
          图表、统计图表和 SVG 地图。
        </p>
      </section>
      <el-divider />

      <section>
        <h2 class="text-2xl font-bold mb-4">快速开始</h2>
        <h3 class="text-xl font-bold mt-6 mb-2">第一步：项目中引入 Plotly.js</h3>
        <p>我们可以通过 CDN 和 NPM 两种方式将 Plotly.js 引入到项目中。</p>
        <h4 class="text-lg mt-4">CDN</h4>
        <p>通过 CDN 引入 Plotly.js 最为便捷。只需在 HTML 文件的<code>head</code>标签添加如下代码即可：</p>
        <div class="my-2">
          <CodeEditor :model-value="cdnCode" />
        </div>
        <h4 class="text-lg mt-4">NPM</h4>
        <p>如果您的项目是一个 npm 的工程化项目，推荐通过安装 npm 包的形式引入 Plotly.js。</p>
        <p>运行以下命令安装<code>plotly.js-dist-min</code>包</p>
        <div class="my-2">
          <CodeEditor :model-value="`npm install plotly.js-dist-min`" />
        </div>
        <p>或</p>
        <div class="my-2">
          <CodeEditor :model-value="`yarn add plotly.js-dist-min`" />
        </div>
        <p>接着在`.js`文件中引入</p>
        <div class="my-2">
          <CodeEditor :model-value="npmCode" />
        </div>
        <h3 class="text-xl font-bold mt-6 mb-2">第二步：创建图表</h3>
        <p>在 HTML 文件中创建一个空白的<code>div</code>元素，并设置其 id 属性为<code>myDiv</code>。</p>
        <div class="my-2">
          <CodeEditor :model-value="createDivCode" />
        </div>
        <p>然后，在 JavaScript 文件中，使用<code>Plotly.newPlot</code>方法将图表对象绘制到<code>myDiv</code>元素中。</p>
        <div class="my-2">
          <CodeEditor :model-value="renderPlotCode" />
        </div>
      </section>
      <el-divider />

      <section>
        <h2 class="text-2xl font-bold mb-4">关于 Plotly.js 的按需引入</h2>
        <p>
          通过<code>plotly.js-dist-min</code>包，我们可以绘制 Plotly
          支持的全部图表。然而，在实际的项目中基本上只会运用的少部分的图表。这样就造成了为了实现小部分功能而引入了大量使用不是的代码。为了避免这种情况，我们可以使用按需引入的方式，只引入所需的图表。
        </p>
        <div class="overflow-x-auto rounded-lg shadow mt-4">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  包名
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  包体积
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  压缩后的体积
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  压缩 + gzip的体积
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  图表类型
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="https://www.npmjs.com/package/plotly.js-dist" target="_blank">plotly.js-dist</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">10.6 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">4.5 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">1.4 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">支持全部类型图表</td>
              </tr>
              <tr class="bg-gray-50 hover:bg-gray-100 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="https://www.npmjs.com/package/plotly.js-basic-dist" target="_blank">plotly.js-basic-dist</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">2.6 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">1012.1 KB</td>
                <td class="px-6 py-4 whitespace-nowrap">350.6 kB</td>
                <td class="px-6 py-4 whitespace-nowrap">仅支持柱状图、饼图、折线图和散点图</td>
              </tr>
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="https://www.npmjs.com/package/plotly.js-cartesian-dist" target="_blank"
                    >plotly.js-cartesian-dist</a
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap">3.3 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">1.3 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">448.2 KB</td>
                <td class="px-6 py-4 whitespace-nowrap">支持笛卡尔积相关图表</td>
              </tr>
              <tr class="bg-gray-50 hover:bg-gray-100 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="https://www.npmjs.com/package/plotly.js-geo-dist" target="_blank">plotly.js-geo-dist</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">2.9 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">51.1 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">400.1 KB</td>
                <td class="px-6 py-4 whitespace-nowrap">支持 geo（地理）图表</td>
              </tr>
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="https://www.npmjs.com/package/plotly.js-gl3d-dist" target="_blank">plotly.js-gl3d-dist</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">4.1 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">1.5 MB</td>
                <td class="px-6 py-4 whitespace-nowrap">514.7 KB</td>
                <td class="px-6 py-4 whitespace-nowrap">支持 3D 图表</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          详细说明，请查看：<a
            href="https://github.com/plotly/plotly.js/blob/master/dist/README.md"
            target="_blank"
            rel="noopener noreferrer"
            >https://github.com/plotly/plotly.js/blob/master/dist/README.md</a
          >
        </p>
      </section>
      <el-divider />

      <section>
        <h2 class="text-2xl font-bold mb-4">在 Typescript 中引入 Plotly.js</h2>
        <p>
          <code>plotly.js-dist</code>并未提供 types 类型声明。需要额外安装 Plotly.js
          的类型声明包，然后在<code>plotly.js-dist</code>类型声明中导出 Plotly.js 类型。
        </p>
        <p>第一步：安装类型申明文件</p>
        <div class="my-2">
          <CodeEditor :model-value="`npm install @types/plotly.js`" />
        </div>
        <p>第二步：在<code>env.d.ts</code>文件中声明<code>plotly.js-dist</code></p>
        <div class="my-2">
          <CodeEditor :model-value="plotlyTypeDeclarationCode" />
        </div>
      </section>
    </section>
  </main>
</template>
