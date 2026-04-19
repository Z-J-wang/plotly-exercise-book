import { BaseLine } from 'dal/plotly.config/base.line'
import Attribute from 'entity/attribute'
import { merge } from 'lodash'

export default class PieMarker extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'marker',
      type: 'Marker',
      options: {
        description: { type: 'string', value: '数据点样式设置。' }
      }
    }
    super(merge({}, defaultInitializer, initializer))

    this.addChild(new PieMarkerColors({ options: { parent: this } }))
    this.addChild(new PieMarkerLine({ options: { parent: this } }))
  }
}

export class PieMarkerColors extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'colors',
      type: 'Color[]',
      options: {
        description: { type: 'string', value: '设置每个扇区的颜色。' }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class PieMarkerLine extends BaseLine {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        description: { type: 'string', value: '设置扇形边界线样式。' }
      }
    }
    super(merge({}, defaultInitializer, initializer))
    this.OmitChildren(['dash'])
  }
}
