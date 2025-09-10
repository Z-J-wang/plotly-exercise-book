<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue'
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
  <div class="whitespace-normal">
    <p>
      <code>ids</code> 属性的主要作用就是为数据 trace 中的每个点提供一个稳定、唯一的标识符。其作用类似 Vue
      的<code>key</code>。
    </p>
    <p class="mt-2">借助 <code>ids</code> 可以做到如下功能：</p>
    <ul>
      <li>
        <span class="font-bold">精准部分更新</span> (<code>restyle</code>, <code>relayout</code>, <code>update</code>)：
        仅修改特定点，提升性能。
      </li>
      <li><span class="font-bold">精确事件处理</span>：识别用户交互的具体目标点。</li>
      <li><span class="font-bold">维护数据点身份</span>：即使数据顺序变化，也能正确追踪和操作特定数据点。</li>
    </ul>
    <p class="mt-2"><code>ids</code>属性有如下要求：</p>
    <ol>
      <li>确保 <code>ids</code> 数组中的值在同一 trace 内的唯一性。</li>
      <li><code>ids</code> 数组的长度必须与其他数据数组（如 <code>x</code>, <code>y</code>）的长度严格一致。</li>
    </ol>

    <p class="mt-2">代码示例</p>
    <CodeEditor :model-value="codeString" />
  </div>
</template>
