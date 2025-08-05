import LayoutAttributes from 'dal/layout.attributes'
import Attribute from 'entities/attribute'

const layout = new Attribute(null, 'layout', 'Layout', { type: 'String', value: '布局属性' }, null, [], {
  layout: {
    title: {
      text: '标题',
      subtitle: {
        text: '子标题'
      }
    }
  }
})
const layoutAttributes = new LayoutAttributes(layout).attributes
layout.children = layoutAttributes

const config = new Attribute(null, 'config', 'Config', { type: 'String', value: '配置属性' }, null, [], {
  config: {
    displayModeBar: true
  }
})

export default [layout, config]
