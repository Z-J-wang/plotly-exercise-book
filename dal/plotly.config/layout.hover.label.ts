import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { Label } from './base'

export default class LayoutHoverLabel extends Label {
  constructor(parent: Attribute) {
    super('hoverlabel', 'LayoutHoverLabel', {
      parent,
      description: { type: 'string', value: '设置鼠标悬停时的标签样式。' }
    })

    this.addChild(
      new Attribute(
        'align',
        { type: 'enum', value: ['left', 'right', 'auto'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置标签的文本对齐方式。<br />' +
              '可选项说明：' +
              '<ul>' +
              '<li><code>auto</code>: 默认值。标签的文本自动对齐。</li>' +
              '<li><code>left</code>: 标签的文本将左对齐。</li>' +
              '<li><code>right</code>: 标签的文本将右对齐。</li>' +
              '</ul>'
          }
        }
      )
    )

    this.addChild(
      new Attribute('namelength', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '标签的文本长度。' +
            '设置所有图表的悬停标签中轨迹名称的默认长度（以字符数表示）。' +
            '-1 表示显示完整名称，而 0 到 3 则显示前 0 到 3 个字符，' +
            '整数大于 3 时，如果名称长度小于该值，则显示完整名称，' +
            '但如果名称更长，则会截断为“名称长度 - 3”个字符，并添加省略号。'
        },
        controller: new AttributeController({
          type: 'number',
          default: 15,
          min: -1
        })
      })
    )
  }
}
