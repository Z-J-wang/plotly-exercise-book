import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'
import { Font } from '../base.font'

export default class TraceTextAbout {
  constructor(parent: Attribute, omitChildren: string[] = []) {
    !omitChildren.includes('text') && parent.addChild(new TraceText({ options: { parent } }))
    !omitChildren.includes('texttemplate') && parent.addChild(new TraceTexttemplate({ options: { parent } }))

    !omitChildren.includes('textfont') &&
      parent.addChild(
        new Font({
          name: 'textfont',
          options: {
            parent: parent,
            description: { type: 'string', value: '设置<code>text</code>属性的字体。' }
          }
        })
      )
  }
}

export class TraceText extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'text',
      type: 'string | string[]',
      options: {
        description: {
          type: 'string',
          value:
            '指定轨迹数据点的文本。其值，可以是字符串或者字符串数组。' +
            '如果是字符串，则表示所有数据点都使用相同的文本；' +
            '如果是字符串数组，则为每个数据点单独定义的文本。<br />' +
            '默认情况下，鼠标悬停在数据点上时，会显示该数据点的文本。'
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceTexttemplate extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'texttemplate',
      type: 'string',
      options: {
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
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
