import LayoutAttributes from 'dal/plotly.config/layout'
import Attribute from 'entities/attribute'

const layout = new Attribute('layout', 'Layout', {
  description: {
    type: 'String',
    value: '布局属性'
  },
  initialConfig: {
    layout: {
      title: {
        text: '标题',
        subtitle: {
          text: '子标题'
        }
      }
    }
  }
})
const layoutAttributes = new LayoutAttributes(layout).attributes
layout.children = layoutAttributes

const config = new Attribute('config', 'Config', {
  description: { type: 'String', value: '配置属性' },
  initialConfig: {
    config: {
      displayModeBar: true
    }
  }
})

export default [layout, config]
