import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { BaseColor } from '../base'

export default class TraceSelected extends Attribute {
  constructor(name: string, options?: Attribute.Options) {
    super(name, 'Selected', options)

    const marker = new Attribute('marker', 'object', {
      parent: this,
      description: { type: 'string', value: '数据点样式。' }
    })

    marker.addChild(
      new Attribute('size', 'number', {
        parent: marker,
        description: { type: 'string', value: '数据点大小。' },
        controller: new AttributeController({ type: 'number', default: 6, min: 0 })
      })
    )

    marker.addChild(
      new BaseColor({
        options: {
          parent: marker,
          description: { type: 'string', value: '数据点颜色。' },
          controller: new AttributeController({ type: 'color', default: null })
        }
      })
    )

    marker.addChild(
      new Attribute('opacity', 'number', {
        parent: marker,
        description: { type: 'string', value: '数据点透明度。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1, step: 0.1 })
      })
    )

    this.addChild(marker)

    const textfont = new Attribute('textfont', 'TextFont', {
      parent: this,
      description: { type: 'string', value: '文本字体。' }
    })

    textfont.addChild(
      new BaseColor({
        options: {
          parent: textfont,
          description: { type: 'string', value: '数据点颜色。' },
          controller: new AttributeController({ type: 'color', default: null })
        }
      })
    )

    this.addChild(textfont)
  }
}
