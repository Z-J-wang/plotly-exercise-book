import Attribute from 'entity/attribute'
import { Line } from '../../base'
import AttributeController from 'entity/attribute.controller'

export default class ScatterLine extends Line {
  constructor(parent: Attribute) {
    super('line', 'ScatterLine', {
      parent,
      description: { type: 'string', value: '设置折线样式。' }
    })

    this.addChild(
      new Attribute('smoothing', 'number', {
        parent,
        description: {
          type: 'string',
          value: '折线平滑度。只有在将<code>shape</code>设置为<code>spline</code>时才有效。'
        },
        controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1.3, step: 0.1 })
      })
    )

    this.addChild(
      new Attribute('simplify', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '通过移除近乎共线的点来简化线条。在转换线条时，可能需要禁用此功能，以便生成的 SVG 路径上的点数不受影响。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )
  }
}
