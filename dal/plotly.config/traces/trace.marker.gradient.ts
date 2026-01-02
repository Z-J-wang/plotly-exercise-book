import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class TraceMarkerGradient extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description) {
    super('gradient', 'BaseMarkerGradient', {
      parent,
      description: description || { type: 'string', value: '设置渐变色。' }
    })

    this.addChild(
      new Attribute(
        'type',
        { type: 'enum', value: ['radial', 'horizontal', 'vertical', 'none'] },
        {
          parent: this,
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
      )
    )

    this.addChild(
      new Attribute('color', 'Color | Color[]', {
        parent: this,
        description: {
          type: 'string',
          value:
            '设置渐变填充的最终颜色。对于径向渐变，为中心颜色；对于水平渐变，为右侧颜色；对于垂直渐变，为底部颜色。需先设置 <code>marker.gradient.type</code> 属性。'
        },
        controller: new AttributeController({ type: 'color', default: null })
      })
    )
  }
}
