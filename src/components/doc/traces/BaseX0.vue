<script setup lang="ts">
import CodeAndPlot from '@/components/CodeAndPlot.vue'

const plotlyConfig: PlotlyConfig = {
  // x0 属性在 @types/Plotly.js 中未定义，实际上是存在。故忽略ts校验
  // @ts-ignore
  data: [{ x0: 20, dx: 10, y: [50, 60, 70], type: 'scatter' }],
  layout: {
    title: { text: 'The example of x0' }
  }
}
</script>

<template>
  <div class="whitespace-normal">
    <p>声明 X 轴数据起点。搭配 <code>dx</code>属性可声明 x 轴数据步进生成规则。</p>
    <p>其中<code>x0</code>指定数据生成的起点，<code>dx</code>指定每个数据点的跨度，生成的数量由 Y 轴数据长度决定。</p>

    <p class="font-bold">注意：</p>
    <ul>
      <li>
        在使用<code>x0</code>和<code>dx</code>进行 X 轴数据生成时，必须显性声明<code>y</code>属性。因为需要通过 Y
        轴数据来确定生成数据的数量。反之亦然。
      </li>
      <li>不要与<code>x</code>属性同时使用，否则无法生效。</li>
    </ul>

    <CodeAndPlot :plotly-config="plotlyConfig" />
  </div>
</template>
