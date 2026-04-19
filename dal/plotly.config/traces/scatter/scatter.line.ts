import { BaseLine } from 'dal/plotly.config/base.line'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

export default class ScatterLine extends BaseLine {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'line',
      type: 'ScatterLine',
      options: {
        description: { type: 'string', value: '设置折线样式。' }
      }
    }
    super(merge({}, defaultInitializer, initializer))

    this.addChild(new ScatterLineSmoothing({ options: { parent: this } }))
    this.addChild(new ScatterLineSimplify({ options: { parent: this } }))
  }
}

export class ScatterLineSmoothing extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'smoothing',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '折线平滑度。只有在将<code>shape</code>设置为<code>spline</code>时才有效。'
        },
        controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1.3, step: 0.1 })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class ScatterLineSimplify extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'simplify',
      type: 'boolean',
      options: {
        description: {
          type: 'string',
          value:
            '通过移除近乎共线的点来简化线条。在转换线条时，可能需要禁用此功能，以便生成的 SVG 路径上的点数不受影响。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}
