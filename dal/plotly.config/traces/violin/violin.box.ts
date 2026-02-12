import { merge } from 'lodash'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import ViolinLine from './violin.line'
import { BaseColor } from 'dal/plotly.config/base'

export default class ViolinBox extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'box',
      type: 'ViolinBox',
      options: { description: { type: 'string', value: '设置小提琴图内部箱型的样式。' } }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new ViolinBoxWidth({ options: { parent: this } }))
    this.addChild(new ViolinBoxVisible({ options: { parent: this } }))
    this.addChild(new ViolinBoxFillcolor({ options: { parent: this } }))
    this.addChild(new ViolinLine({ options: { parent: this } }))
  }
}

export class ViolinBoxWidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'width',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '设置内箱形图的宽度相对于卷轴图宽度的比例。例如，设为 1 时，内箱形图的宽度与卷轴图的宽度相同。'
        },
        controller: new AttributeController({ type: 'number', default: 0.25, min: 0, step: 0.1 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ViolinBoxVisible extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'visible',
      type: 'Boolean',
      options: {
        description: { type: 'string', value: '是否显示内箱形图。' },
        controller: new AttributeController({ type: 'boolean', default: true })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ViolinBoxFillcolor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'fillcolor',
      options: { description: { type: 'string', value: '设置内箱形图的填充颜色。' } }
    }
    super(merge(defaultInitializer, initializer))
  }
}
