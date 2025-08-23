import LayoutAttributes from 'dal/plotly.config/layout'
import Attribute from 'entities/attribute'
import ConfigureAttribute from 'dal/plotly.config/configure'

const layout = new Attribute('layout', 'Layout', {
  description: {
    type: 'string',
    value: '图表布局相关设置。例如：标题、内外边距等等。'
  },
  initialConfig: {
    layout: {
      title: { text: 'Layout Title', subtitle: { text: 'subtitle' } }
    },
    data: [
      { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'markers', type: 'scatter', name: 'scatter trace' },
      {
        x: [2, 3, 4, 5.5],
        y: [16.5, 5.5, 11.5, 9.5],
        mode: 'lines',
        type: 'scatter',
        name: 'line trace',
        legendgroup: 'group one'
      },
      {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        text: ['text A', 'text B', 'text C', 'text D'],
        mode: 'text+lines+markers',
        type: 'scatter',
        legendgroup: 'group one',
        legendgrouptitle: {
          text: 'Group One'
        }
      }
    ]
  }
})
layout.children = new LayoutAttributes(layout).attributes

const config = new Attribute('config', 'Config', {
  description: {
    type: 'string',
    value:
      '<code>config</code>用于设置诸如模式栏按钮以及图表中的交互性等属性。' +
      '更多使用示例，可跳转查看：<a href="https://plotly.com/javascript/configuration-options/" target="_blank">Configuration Options in JavaScript</a>'
  },
  initialConfig: {
    config: { displayModeBar: 'hover' },
    data: [{ x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'lines+markers', type: 'scatter', name: 'scatter trace' }],
    layout: { title: { text: 'Config Title' }, showlegend: true }
  }
})
config.children = new ConfigureAttribute(config).attributes

export default [layout, config]
