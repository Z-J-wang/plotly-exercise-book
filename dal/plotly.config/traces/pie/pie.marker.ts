import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class PieMarker extends Attribute {
  constructor(parent: Attribute) {
    super('marker', 'Marker', {
      parent,
      description: { type: 'string', value: '数据点样式设置。' }
    })

    this.addChild(
      new Attribute('colors', 'Color[]', {
        parent: this,
        description: { type: 'string', value: '设置每个扇区的颜色。' }
      })
    )

    const line = new Attribute('line', 'Line', {
      parent: this,
      description: { type: 'string', value: '设置扇形边界线样式。' }
    })

    line.addChild(
      new Attribute('color', 'Color', {
        parent: line,
        description: { type: 'string', value: '设置边界线颜色。' },
        controller: new AttributeController({ type: 'color', default: '#444' })
      })
    )
    line.addChild(
      new Attribute('width', 'number', {
        parent: line,
        description: { type: 'string', value: '设置边界线宽度。' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      })
    )
    this.addChild(line)
  }
}
