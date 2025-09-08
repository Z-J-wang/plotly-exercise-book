import Attribute from 'entities/attribute'

export default class LayoutColorAxis extends Attribute {
  constructor(name: string, parent: Attribute, description?: Attribute.Description) {
    super(name, 'LayoutColorAxis', {
      parent,
      description: description || { type: 'string', value: '自定义颜色轴坐标轴。' }
    })
  }
}
