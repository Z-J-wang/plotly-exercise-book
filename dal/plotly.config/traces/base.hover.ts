import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'

export default class BaseHover {
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
      'name',
      'none',
      'skip',
      'text',
      'x',
      'x+text',
      'x+name',
      'x+y',
      'x+y+text',
      'x+y+name',
      'x+y+z',
      'x+y+z+text',
      'x+y+z+name',
      'y',
      'y+name',
      'y+x',
      'y+text',
      'y+x+text',
      'y+x+name',
      'y+z',
      'y+z+text',
      'y+z+name',
      'y+x+z',
      'y+x+z+text',
      'y+x+z+name',
      'z',
      'z+x',
      'z+x+text',
      'z+x+name',
      'z+y+x',
      'z+y+x+text',
      'z+y+x+name',
      'z+x+y',
      'z+x+y+text',
      'z+x+y+name'
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
            value:
              '设置鼠标悬浮时，悬浮弹窗需要显示的信息。<br />' +
              '可选择:' +
              '<ul>' +
              '<li><code>x</code> - x 轴数据</li>' +
              '<li><code>y</code> - y 轴数据</li>' +
              '<li><code>z</code> - z 轴数据</li>' +
              '<li><code>text</code> - 悬浮文本</li>' +
              '<li><code>name</code> - 图表名称</li>' +
              '<li><code>all</code> - 显示全部信息</li>' +
              '<li><code>none</code> - 不显示任何信息，但点击悬浮事件仍会触发</li>' +
              '<li><code>skip</code> - 不显示任何信息，点击悬浮事件不会触发</li>' +
              '</ul>'
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
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )

    parent.addChild(
      new Attribute('xhoverformat', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            '设置 x 轴数据格式化模板。例如：<code>.2f</code>保留两位小数。<br />' +
            '说明：' +
            '<ul>' +
            '<li>数字，支持<a href="https://github.com/d3/d3-format/tree/v1.4.5#d3-format" target="_blank">d3-format</a>语法。</li>' +
            '<li>日期，支持<a href="https://github.com/d3/d3-time-format/tree/v2.2.3#locale_format" target="_blank">d3-time-format</a>语法。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )

    parent.addChild(
      new Attribute('yhoverformat', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            '设置 y 轴数据格式化模板。例如：<code>.2f</code>保留两位小数。<br />' +
            '说明：' +
            '<ul>' +
            '<li>数字，支持<a href="https://github.com/d3/d3-format/tree/v1.4.5#d3-format" target="_blank">d3-format</a>语法。</li>' +
            '<li>日期，支持<a href="https://github.com/d3/d3-time-format/tree/v2.2.3#locale_format" target="_blank">d3-time-format</a>语法。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )
  }
}
