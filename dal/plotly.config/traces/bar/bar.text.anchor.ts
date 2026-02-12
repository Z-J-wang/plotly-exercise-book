import { Font } from 'dal/plotly.config/base.font'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class BarTextAnchor {
  constructor(parent: Attribute) {
    parent.addChild(
      new Attribute(
        'insidetextanchor',
        { type: 'enum', value: ['middle', 'start', 'end'] },
        {
          parent,
          description: {
            type: 'string',
            value: '当<code>textposition</code>设置为<code>inside</code>时，设置条形图内部文字的位置。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'end',
            options: ['middle', 'start', 'end']
          })
        }
      )
    )

    parent.addChild(
      new Font({
        name: 'insidetextfont',
        options: {
          parent,
          description: {
            type: 'string',
            value: '设置条形图内部文字的字体样式。此属性优先级高于<code>bar.textfont</code>属性。'
          }
        }
      })
    )

    parent.addChild(
      new Font({
        name: 'outsidetextfont',
        options: {
          parent,
          description: {
            type: 'string',
            value: '设置条形图外部文字的字体样式。此属性优先级高于<code>bar.textfont</code>属性。'
          }
        }
      })
    )
  }
}
