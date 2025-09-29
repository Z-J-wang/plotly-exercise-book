import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import BaseHoverLabel from 'dal/plotly.config/base.hover.label'

export default class PieHover {
  constructor(parent: Attribute) {
    parent.addChild(
      new Attribute('hovertext', 'string | string[]', {
        parent,
        description: {
          type: 'string',
          value:
            '指定轨迹数据点的悬浮文本。其值，可以是字符串或者字符串数组。' +
            '如果是字符串，则表示所有数据点都使用相同的文本；' +
            '如果是字符串数组，则为每个数据点单独定义的文本。<br />' +
            '未定义<code>hovertext</code>时，<code>text</code>属性声明的数据点文本充当数据点的悬浮文本。'
        }
      })
    )

    const hoverinfoOptions = [
      'all',
      'none',
      'skip',
      'label',
      'text',
      'value',
      'percent',
      'name',
      'label+text',
      'label+value',
      'label+percent',
      'label+name',
      'label+text+value',
      'label+text+percent',
      'label+text+name',
      'text+value',
      'text+percent',
      'text+name',
      'value+percent',
      'value+name',
      'percent+name'
    ]

    parent.addChild(
      new Attribute(
        'hoverinfo',
        {
          type: 'enum',
          value: hoverinfoOptions
        },
        {
          parent,
          description: {
            type: 'string',
            value: '设置鼠标悬浮时，悬浮弹窗需要显示的信息。<br />'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'all',
            options: hoverinfoOptions
          })
        }
      )
    )

    parent.addChild(
      new Attribute('hovertemplate', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            'hover 文本渲染模板模板.' +
            '说明：' +
            '<ul>' +
            '<li>支持HTML标签</li>' +
            '<li>通过<code>%{variable}</code>接收变量。</li>' +
            '<li>仅支持数据点相关的数据变量，如：<code>x</code>、<code>y</code>、<code>text</code>等等。</li>' +
            '<li>数字，支持<a href="https://github.com/d3/d3-format/tree/v1.4.5#d3-format" target="_blank">d3-format</a>语法。</li>' +
            '<li>日期，支持<a href="https://github.com/d3/d3-time-format/tree/v2.2.3#locale_format" target="_blank">d3-time-format</a>语法。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'string', default: null })
      })
    )

    parent.addChild(
      new BaseHoverLabel('hoverlabel', {
        parent,
        description: { type: 'string', value: '设置鼠标悬停时的标签样式。' }
      })
    )
  }
}
