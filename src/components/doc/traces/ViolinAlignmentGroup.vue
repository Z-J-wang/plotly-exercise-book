<script setup lang="ts">
import { useMarkdownIt } from '@/composables/useMarkdownIt'
import CodeAndPlot from '@/components/CodeAndPlot.vue'
import exampleData from '@/assets/data/violin.json'

const md = `
\`alignmentgroup\` 属性是用于**小提琴图（violin plot）**的核心布局控制属性，其主要作用是**确保同一组别（group）内的多个小提琴图共享相同的水平位置空间并严格对齐**，从而实现不同类别或条件下分布数据的准确、美观对比。

具体作用如下：

1.  **位置对齐（Position Alignment）**：
    *   当多个小提琴图需要按类别分组展示时（例如，不同年份下不同城市的收入分布），\`alignmentgroup\` 会强制将**具有相同 \`alignmentgroup\` 值**的小提琴图分配到**相同的水平位置点**上。
    *   例如，所有代表“2023年”的小提琴图（无论属于哪个城市）都会被放置在同一个水平位置点上（比如 x=0），所有“2024年”的放在另一个位置点上（比如 x=1），依此类推。

2.  **防止位置重叠（Preventing Overlap by Position）**：
    *   默认情况下，如果没有指定 \`alignmentgroup\`，Plotly 会尝试将不同组的小提琴图并排显示在 *相邻但不同* 的水平位置上。这可能导致当组内成员（trace）很多时，图变得很宽，或者组内成员位置分散。
    *   \`alignmentgroup\` 通过强制同一组内的小提琴图**占据相同的水平位置**，避免了这种分散布局，使图更紧凑。组内的小提琴图默认会**重叠**在一起显示在该位置点上。

3.  **配合 \`offsetgroup\` 精确控制重叠位置（Controlling Overlap with \`offsetgroup\`）**：
    *   虽然 \`alignmentgroup\` 解决了不同组之间的对齐问题，但它会导致同一组内的小提琴图重叠在一起（默认行为）。要解决组内重叠并实现组内成员并排显示，需要结合使用 \`offsetgroup\` 属性。
    *   \`offsetgroup\` 指定了组内成员在共享的水平位置点上如何进行**水平偏移**。具有相同 \`offsetgroup\` 值的小提琴图会获得相同的偏移量。
    *   **关键组合**：
        *   指定相同的 \`alignmentgroup\`：让多个 trace 属于**同一组**（共享水平位置）。
        *   指定不同的 \`offsetgroup\`：让属于同一组（共享位置）的多个 trace 在该位置上**水平偏移开（并排显示）**。

**总结与示例场景**

*   **问题**：你想在一个图中展示不同年份（组）下，不同城市（组内成员）的收入分布（小提琴图）。你希望年份（组）之间明确分开，同一年的不同城市（组内成员）并排显示。
*   **解决方案**：
    *   为所有代表 *同一个年份* 的小提琴图 trace 设置相同的 \`alignmentgroup\`（例如 \`alignmentgroup: '2023'\` 或 \`alignmentgroup: 'year1'\`）。
    *   为所有代表 *同一个城市* 的小提琴图 trace 设置相同的 \`offsetgroup\`（例如 \`offsetgroup: 'New York'\` 或 \`offsetgroup: 'cityA'\`）。
    *   结果：
        *   所有 \`alignmentgroup: '2023'\` 的 trace（不同城市）会集中在同一个水平位置点（比如 x=0）。
        *   所有 \`alignmentgroup: '2024'\` 的 trace 会集中在另一个水平位置点（比如 x=1）。
        *   在 \`x=0\` 的位置点上，具有不同 \`offsetgroup\` 的 trace（\`offsetgroup: 'New York'\`, \`offsetgroup: 'London'\` 等）会根据它们的 \`offsetgroup\` 在该点附近水平偏移开，实现并排显示。同理适用于 \`x=1\`。

**属性效果对比表**

| **场景**                           | **未使用 \`alignmentgroup\`**                 | **使用 \`alignmentgroup\`**                     | **使用 \`alignmentgroup\` + \`offsetgroup\`**         |
| :--------------------------------- | :------------------------------------------ | :-------------------------------------------- | :----------------------------------------------- |
| **组间位置**                       | 不同组自动分散在不同水平位置                | **同一组内所有成员严格共享相同水平位置**      | 同一组内所有成员严格共享相同水平位置             |
| **组内位置**                       | 组内成员自动并排显示                        | **组内成员默认重叠在组位置上**                | **组内成员按 \`offsetgroup\` 在组位置上水平偏移** |
| **主要用途**                       | 单变量分组展示（仅一个维度）                | **强制多组数据在指定位置对齐**                | **精准控制多维度（组+组内成员）的位置布局**     |
| **典型问题**                       | 组间位置可能不便于比较                      | 组内成员重叠难以分辨                          | 清晰展示组间对比和组内成员对比                  |

**简单来说**：\`alignmentgroup\` 是控制 **“哪些小提琴图应该被画在同一个水平位置点上”** 的属性，是构建分组小提琴图布局的基础。要精细控制组内成员的排列（并排还是重叠），必须结合 \`offsetgroup\` 属性使用。

`

const plotlyConfig = {
  data: [
    {
      type: 'violin',
      x: exampleData.map((item) => item.day),
      y: exampleData.map((item) => item.total_bill),
      alignmentgroup: 'Yes',
      name: 'Yes',
      side: 'negative',
      box: {
        visible: true
      },
      line: {
        color: 'blue',
        width: 2
      },
      meanline: {
        visible: true
      }
    },
    {
      type: 'violin',
      x: exampleData.map((item) => item.day),
      y: exampleData.map((item) => item.total_bill),
      alignmentgroup: 'No',
      name: 'No',
      side: 'positive',
      box: {
        visible: true
      },
      line: {
        color: 'green',
        width: 2
      },
      meanline: {
        visible: true
      }
    }
  ],
  layout: {
    grid: { pattern: 'independent', xaxes: ['x', 'x2'], yaxes: ['y'] }
  }
}

const codeString = `const trace = {
  x: [1, 2, 3, 4],
  y: [10, 11, 12, 13],
  ids: ["pointA", "pointB", "pointC", "pointD"], // 唯一ID
  mode: 'markers',
  type: 'scatter'
};

Plotly.newPlot('chart', [trace]);

// 更新数据（交换pointB和pointC的位置并产生平滑动画，而非删除重建。）
Plotly.react('chart', [{
  x: [1, 3, 2, 4], // 原始顺序: [1,2,3,4]
  y: [10, 12, 11, 13],
  ids: ["pointA", "pointC", "pointB", "pointD"] // ID顺序与数据点同步
}]);`
</script>

<template>
  <div class="min-w-0">
    <span class="markdown-body" v-html="useMarkdownIt(md).htmlString" />

    <p class="mt-4 font-bold">如下折线图代码示例（其他图表同理）：</p>
  </div>
  <CodeAndPlot class="mt-4" :plotly-config="plotlyConfig" :code="codeString" />
</template>
