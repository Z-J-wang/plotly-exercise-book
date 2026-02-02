import { merge } from 'lodash'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class ViolinLine extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'line',
      type: 'ViolinLine',
      options: { description: { type: 'string', value: '设置边框样式。' } }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new ViolinLineWidth({ options: { parent: this } }))
    this.addChild(new ViolinLineColor({ options: { parent: this } }))
  }
}

export class ViolinLineWidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'width',
      type: 'number',
      options: {
        description: { type: 'string', value: '设置边框宽度。/' },
        controller: new AttributeController({ type: 'number', default: 2, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ViolinLineColor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'color',
      type: 'Color',
      options: {
        description: { type: 'string', value: '设置小提琴图的边框颜色。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
