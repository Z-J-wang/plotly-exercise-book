import Attribute from 'entity/attribute'

export default class LayoutAxis extends Attribute {
  constructor(name: string, parent: Attribute, description?: Attribute.Description) {
    super(name, 'LayoutAxis', {
      parent,
      description: description || { type: 'string', value: '自定义坐标轴。' }
    })
  }
}
