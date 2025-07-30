import LayoutAttributes from 'dal/layout.attributes'
import Attribute from 'entities/attribute'

const layout = new Attribute(null, 'layout', 'Layout', { type: 'String', value: '布局属性' })
const layoutAttributes = new LayoutAttributes(layout).attributes
layout.children = layoutAttributes

export default [layout]
