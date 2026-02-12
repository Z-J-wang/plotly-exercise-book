import { BaseLine } from 'dal/plotly.config/base.line'
import Attribute from 'entity/attribute'

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

    const line = new BaseLine({
      options: {
        parent: this,
        description: { type: 'string', value: '设置扇形边界线样式。' }
      }
    })

    line.OmitChildren(['dash'])
    this.addChild(line)
  }
}
