import LayoutAttributes from 'dal/layout.attributes'
import Attribute from 'entities/attribute'

const layoutAttributes = new LayoutAttributes(null).attributes

export default [new Attribute('layout', 'object', '布局属性', {}, null, layoutAttributes)]
