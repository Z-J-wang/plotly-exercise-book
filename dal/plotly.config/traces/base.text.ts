import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { Font } from '../base'

export default class BaseText {
  constructor(parent: Attribute) {
    parent.addChild(
      new Attribute('text', 'string | string[]', {
        parent,
        description: {
          type: 'string',
          value:
            '指定轨迹数据点的文本。其值，可以是字符串或者字符串数组。' +
            '如果是字符串，则表示所有数据点都使用相同的文本；' +
            '如果是字符串数组，则为每个数据点单独定义的文本。<br />' +
            '默认情况下，鼠标悬停在数据点上时，会显示该数据点的文本。' +
            '如果<code>mode</code>属性中包含<code>text</code>，数据点文本会显示在数据点处。'
        }
      })
    )

    const textpositionOptions = [
      'top left',
      'top center',
      'top right',
      'middle left',
      'middle center',
      'middle right',
      'bottom left',
      'bottom center',
      'bottom right',
      'inside',
      'outside',
      'auto',
      'none'
    ]

    parent.addChild(
      new Attribute(
        'textposition',
        {
          type: 'enum',
          value: textpositionOptions
        },
        {
          parent,
          description: { type: 'string', value: '文本模式下，设置文本相对于数据点的位置。' },
          controller: new AttributeController({
            type: 'select',
            default: 'middle center',
            options: textpositionOptions
          })
        }
      )
    )

    parent.addChild(
      new Attribute('texttemplate', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            '文本渲染模板模板.' +
            '说明：' +
            '<ul>' +
            '<li>支持HTML标签</li>' +
            '<li>通过<code>%{variable}</code>接收变量。</li>' +
            '<li>仅支持数据点相关的数据变量，如：<code>x</code>、<code>y</code>、<code>text</code>等等。</li>' +
            '<li>数字，支持<a href="https://github.com/d3/d3-format/tree/v1.4.5#d3-format" target="_blank">d3-format</a>语法。</li>' +
            '<li>日期，支持<a href="https://github.com/d3/d3-time-format/tree/v2.2.3#locale_format" target="_blank">d3-time-format</a>语法。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )

    parent.addChild(
      new Font('textfont', 'Font', {
        parent: parent,
        description: { type: 'string', value: '设置<code>text</code>属性的字体。' }
      })
    )
  }
}
