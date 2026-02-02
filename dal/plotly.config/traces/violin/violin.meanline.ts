import { merge } from 'lodash'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class ViolinMeanLine extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'meanline',
      type: 'ViolinMeanLine',
      options: {
        description: { type: 'string', value: '设置小提琴图均值线样式/' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new ViolinMeanlineVisible({ options: { parent: this } }))
    this.addChild(new ViolinMeanlineWidth({ options: { parent: this } }))
    this.addChild(new ViolinMeanlineColor({ options: { parent: this } }))
  }
}

export class ViolinMeanlineVisible extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'visible',
      type: 'boolean',
      options: {
        description: {
          type: 'string',
          value:
            '确定是否在箱形图中显示对应于样本均值的线条。如果“箱形图可见性”设置为开启状态，则均值线会绘制在内部箱形图内。否则，均值线会从箱形图的一侧延伸至另一侧。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      }
    }
    const mergedInitializer = merge(defaultInitializer, initializer)
    super(mergedInitializer.name, mergedInitializer.type, mergedInitializer.options)
  }
}

export class ViolinMeanlineWidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'width',
      type: 'number',
      options: {
        description: { type: 'string', value: '设置均值线宽度。' },
        controller: new AttributeController({ type: 'number', default: 2, min: 0 })
      }
    }
    const mergedInitializer = merge(defaultInitializer, initializer)
    super(mergedInitializer.name, mergedInitializer.type, mergedInitializer.options)
  }
}

export class ViolinMeanlineColor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'color',
      type: 'Color',
      options: {
        description: { type: 'string', value: '设置均值线颜色。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    const mergedInitializer = merge(defaultInitializer, initializer)
    super(mergedInitializer.name, mergedInitializer.type, mergedInitializer.options)
  }
}
