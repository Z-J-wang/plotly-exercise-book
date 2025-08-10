import LayoutAttributes from 'dal/plotly.config/layout'
import Attribute from 'entities/attribute'

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
      { x: [2, 3, 4, 5.5], y: [16.5, 5.5, 11.5, 9.5], mode: 'lines', type: 'scatter', name: 'line trace' },
      {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        text: ['text A', 'text B', 'text C', 'text D'],
        mode: 'text+lines+markers',
        type: 'scatter'
      }
    ]
  }
})
const layoutAttributes = new LayoutAttributes(layout).attributes
layout.children = layoutAttributes

const config = new Attribute('config', 'Config', {
  description: { type: 'string', value: '配置属性' },
  initialConfig: {
    config: {
      displayModeBar: true
    }
  }
})

export default [layout, config]
