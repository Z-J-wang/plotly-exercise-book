import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

export default class TraceMarkerGradient extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'gradient',
      type: 'BaseMarkerGradient',
      options: {
        description: { type: 'string', value: '设置渐变色。' }
      }
    }

    super(merge(defaultInitializer, initializer))

    this.addChild(new TraceMarkerGradientType({ options: { parent: this } }))
    this.addChild(new TraceMarkerGradientColor({ options: { parent: this } }))
  }
}

export class TraceMarkerGradientType extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'type',
      type: { type: 'enum', value: ['radial', 'horizontal', 'vertical', 'none'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置渐变填充的类型：' +
            '<ul>' +
            '<li><code>radial</code> - 径向渐变，从中心开始。</li>' +
            '<li><code>horizontal</code> - 水平渐变，从左到右。</li>' +
            '<li><code>vertical</code> - 垂直渐变，从上到下。</li>' +
            '<li><code>none</code> - 无渐变。</li>' +
            '</ul>'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'none',
          options: ['radial', 'horizontal', 'vertical', 'none']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceMarkerGradientColor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'color',
      type: 'Color | Color[]',
      options: {
        description: {
          type: 'string',
          value:
            '设置渐变填充的最终颜色。对于径向渐变，为中心颜色；对于水平渐变，为右侧颜色；对于垂直渐变，为底部颜色。需先设置 <code>marker.gradient.type</code> 属性。'
        },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
