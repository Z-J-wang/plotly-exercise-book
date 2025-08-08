import Attribute from 'entities/attribute'
import { Font } from './base'
import AttributeController from 'entities/attribute.controller'
import { BaseConfig } from './base'

class Tittle extends Attribute {
  constructor(parent: Attribute | null, description?: Attribute.Description) {
    if (!description) description = { type: 'string', value: '字体设置' }
    super('title', 'LayoutTitle', { parent, description })

    this.addChild(
      new Attribute('text', 'string', {
        parent: this,
        description: { type: 'string', value: '标题内容' },
        controller: new AttributeController({
          type: 'string',
          default: ''
        })
      })
    )
    this.addChild(new Font(this))
    this.addChild(new SubTittle(this))

    this.addChild(
      new Attribute('automargin', 'boolean', {
        parent: this.parent,
        description: {
          type: 'string',
          value: [
            "自动调整标题的外边距。如果 <code>yref='paper'</code>，则边距会相应扩大，以确保标题不会与容器的边缘重叠。",
            "如果 <code>yref='container'</code>，则边距将确保标题不会与绘图区域、刻度标签和坐标轴标题重叠。"
          ].join('')
        },
        controller: new AttributeController({
          type: 'boolean',
          default: false
        })
      })
    )

    this.addChild(
      new Attribute(
        'xref',
        { type: 'enum', value: ['container', 'paper'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '设置标题容器的宽度由什么决定。container：整个图表元素的宽度; paper：绘图区域宽度。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'container',
            options: ['container', 'paper']
          })
        }
      )
    )

    this.addChild(
      new Attribute('x', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: [
            `设置标题的在x轴方向上的相对于容器的位置。值域为：0 - 1 的小数。0 表示最左边，1 表示最右边。`,
            '<br />',
            '注意，容器的大小取决于xref的值。'
          ].join('')
        },
        controller: new AttributeController({
          type: 'number',
          default: 0.5,
          min: 0,
          max: 1,
          step: 0.1
        })
      })
    )

    this.addChild(
      new Attribute(
        'xanchor',
        { type: 'enum', value: ['auto', 'left', 'center', 'right'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '设置标题在水平方向上相对于<code>layout.title.x</code>属性设置的位置的对齐方式。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'auto',
            options: ['auto', 'left', 'center', 'right']
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'yref',
        { type: 'enum', value: ['container', 'paper'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '设置标题容器的高度由什么决定。container：整个图表元素的高度; paper：绘图区域高度。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'container',
            options: ['container', 'paper']
          })
        }
      )
    )

    this.addChild(
      new Attribute('y', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: [
            `设置标题的在y轴方向上的相对于容器的位置。值域为：0 - 1 的小数。0 表示顶部，1 表示底部。`,
            '<br />',
            '注意，容器的大小取决于yref的值。'
          ]
        },
        controller: new AttributeController({
          type: 'number',
          default: 0.5,
          min: 0,
          max: 1,
          step: 0.1
        })
      })
    )

    this.addChild(
      new Attribute(
        'yanchor',
        { type: 'enum', value: ['auto', 'top', 'middle', 'bottom'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '设置标题在垂直方向上相对于<code>layout.title.y</code>属性设置的位置的对齐方式。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'auto',
            options: ['auto', 'top', 'middle', 'bottom']
          })
        }
      )
    )
    this.addChild(
      new Pad(this, {
        type: 'string',
        value: [
          '设置标题的内边距。每个内边距值仅在相应的 <code>xanchor/yanchor</code> 值进行了相应设置时才会生效。',
          '例如，要使左内边距生效，<code>xanchor</code>必须设置为 <code>left</code>。',
          '若 <code>xanchor/yanchor</code> 是自动确定的，同样适用此规则。',
          '若相应的锚点值为 <code>middle/center</code>，则内边距设置将无效。'
        ].join('')
      })
    )
  }
}

class SubTittle extends Attribute {
  constructor(parent: Attribute | null, description: Attribute.Description = { type: 'string', value: '副标题' }) {
    super('subtitle', 'SubTitle', { parent, description })

    this.addChild(
      new Attribute('text', 'string', {
        parent: this,
        description: { type: 'string', value: '副标题内容' },
        controller: new AttributeController({
          type: 'string',
          default: ''
        })
      })
    )
    this.addChild(new Font(this))
  }
}

class Pad extends Attribute {
  constructor(parent: Attribute, description: Attribute.Description = { type: 'string', value: '标题的内边距' }) {
    super('pad', 'Padding', { parent, description })

    this.addChild(
      new Attribute('b', 'number', {
        parent: this,
        description: { type: 'string', value: '底部边距，单位为<code>px</code>' },
        controller: new AttributeController({
          type: 'number',
          default: 0
        })
      })
    )
    this.addChild(
      new Attribute('l', 'number', {
        parent: this,
        description: { type: 'string', value: '左边边距，单位为<code>px</code>' },
        controller: new AttributeController({
          type: 'number',
          default: 0
        })
      })
    )
    this.addChild(
      new Attribute('r', 'number', {
        parent: this,
        description: { type: 'string', value: '右边边距，单位为<code>px</code>' },
        controller: new AttributeController({
          type: 'number',
          default: 0
        })
      })
    )
    this.addChild(
      new Attribute('t', 'number', {
        parent: this,
        description: { type: 'string', value: '顶部边距，单位为<code>px</code>' },
        controller: new AttributeController({
          type: 'number',
          default: 0
        })
      })
    )
  }
}

class Legend extends Attribute {
  constructor(
    parent: Attribute | null,
    description: Attribute.Description = { type: 'string', value: '图例样式定义。' }
  ) {
    super('legend', 'Legend', { parent, description })

    this.addChild(
      new Attribute('bgcolor', 'Color', {
        parent: this,
        description: {
          type: 'string',
          value: '图例背景颜色。默认值等同于<a href="#layout-paper_bgcolor"><code>layout.paper_bgcolor</code></a>的值。'
        },
        controller: new AttributeController({
          type: 'color',
          default: 'white'
        })
      })
    )

    this.addChild(
      new Attribute('bordercolor', 'Color', {
        parent: this,
        description: {
          type: 'string',
          value: '图例边框颜色。'
        },
        controller: new AttributeController({
          type: 'color',
          default: '#444'
        })
      })
    )

    this.addChild(
      new Attribute('borderwidth', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '图例边框宽度。'
        },
        controller: new AttributeController({
          type: 'number',
          default: 0,
          min: 0,
          step: 1
        })
      })
    )

    this.addChild(
      new Attribute(
        'entrywidthmode',
        { type: 'enum', value: ['fraction', 'pixels'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '<span class="font-bold">未试验出实际效果，需进一步核验！</span><br/>' + '图例项宽度的模式。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'pixels',
            options: ['fraction', 'pixels']
          })
        }
      )
    )

    this.addChild(
      new Attribute('entrywidth', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '<span class="font-bold">未试验出实际效果，需进一步核验！</span><br/>' +
            '设置图例的宽度（以像素或分数表示）。当<code>entrywidthmode</code>设置为<code>pixels</code>时，' +
            '使用 0 可根据文本宽度来确定条目的大小。'
        },
        controller: new AttributeController({
          type: 'number',
          default: 0,
          min: 0,
          step: 1
        })
      })
    )

    this.addChild(new Font(this, { type: 'string', value: '设置图例字体样式。' }))

    this.addChild(
      new Attribute(
        'groupclick',
        { type: 'enum', value: ['toggleitem', 'togglegroup'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例分组点击单击形式设置' +
              '<ul>' +
              '<li><code>toggleitem</code> - 显示/隐藏点击的 item。</li>' +
              '<li><code>togglegroup</code> - 显示/隐藏点击的 group。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'togglegroup',
            options: ['toggleitem', 'togglegroup']
          })
        }
      )
    )

    this.addChild(new Font(this, { type: 'string', value: '图例组标题字体样式设置。' }, 'grouptitlefont'))

    this.addChild(
      new Attribute('indentation', 'number', {
        parent: this,
        description: { type: 'string', value: '图例组标题缩进量，单位为像素。其值需大于等于<code>-15</code>。' },
        controller: new AttributeController({ type: 'number', default: 0, min: -15, step: 1 })
      })
    )

    this.addChild(
      new Attribute(
        'itemclick',
        { type: 'enum', value: ['toggle', 'toggleothers', false] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例组点击事件。<br />' +
              '<ul>' +
              '<li><code>toggle</code> - 默认值。点击图例组时，图例组内所有图例项都会被切换。</li>' +
              '<li><code>toggleothers</code> - 点击图例组时，除了当前图例组，其他图例组都会被切换。</li>' +
              '<li><code>false</code> - 禁用点击</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'toggle',
            options: ['toggle', 'toggleothers', false]
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'itemdoubleclick',
        { type: 'enum', value: ['toggle', 'toggleothers', false] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例组双击击事件。<br />' +
              '<ul>' +
              '<li><code>toggle</code> - 默认值。双击图例组时，图例组内所有图例项都会被切换。</li>' +
              '<li><code>toggleothers</code> - 双击图例组时，除了当前图例组，其他图例组都会被切换。</li>' +
              '<li><code>false</code> - 禁用双击</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'toggleothers',
            options: ['toggle', 'toggleothers', false]
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'itemsizing',
        { type: 'enum', value: ['trace', 'constant'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例项大小设置: <br />' +
              '<ul>' +
              '<li><code>trace</code> - 图例项大小会根据图例项的符号的宽度或高度而变化。</li>' +
              '<li><code>constant</code> - 图例项大小不会根据图例项的符号的宽度或高度而变化。</li>' +
              '</ul>'
          },
          controller: new AttributeController({ type: 'select', default: 'trace', options: ['trace', 'constant'] })
        }
      )
    )

    this.addChild(
      new Attribute('itemwidth', 'number', {
        parent: this,
        description: { type: 'string', value: '图例项宽度，单位<code>px</code>。其值<code>>=30</code>' },
        controller: new AttributeController({ type: 'number', default: 30, min: 30, step: 1 })
      })
    )

    this.addChild(
      new Attribute(
        'orientation',
        { type: 'enum', value: ['v', 'h'] },
        {
          parent: this,
          description: { type: 'string', value: '图例项排布方向。分为垂直<code>v</code>和水平<code>h</code>两种。' },
          controller: new AttributeController({ type: 'select', default: 'v', options: ['v', 'h'] })
        }
      )
    )

    this.addChild(new LegendTitle(this))
  }
}

class LegendTitle extends Attribute {
  constructor(parent: Attribute | null) {
    super('title', 'LegendTitle', {
      parent,
      description: { type: 'string', value: '设置图例模块的总标题。' }
    })
    this.addChild(
      new Attribute('text', 'string', {
        parent: this,
        description: { type: 'string', value: '图例模块标题文本' },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )
    this.addChild(
      new Attribute(
        'side',
        { type: 'enum', value: ['top', 'left', 'top left', 'top center', 'top right'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '确定图例标题相对于图例项的位置。当<code>orientation="h"</code>（水平方向）时，默认位置为<code>top</code>；' +
              '当<code>orientation="v"</code>（垂直方向）时，默认位置为<code>left</code>。' +
              '<code>top left</code>选项可用于扩展，<code>top center</code>和<code>top right</code>选项用于在水平对齐的图例区域中同时进行 x 轴和 y 轴方向的定位。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'top | left',
            options: ['top', 'left', 'top left', 'top center', 'top right']
          })
        }
      )
    )
    this.addChild(new Font(this, { type: 'string', value: '设置图例模块标题字体样式。' }))
  }
}

export default class Layout extends BaseConfig {
  constructor(parent: Attribute | null) {
    super(parent)
    this.insertAttribute(new Tittle(parent))
    this.insertAttribute(
      new Attribute('showlegend', 'boolean', {
        parent: parent,
        description: {
          type: 'string',
          value: [
            '是否显示图例。<br />',
            '默认情况下，满足以下任意条件则会显示图例：<br />',
            '1. 默认情况下，两个或多个图表。<br />',
            '2. 渲染一个饼状图。<br />',
            '3. 明确通过<code>showlegend:true</code>声明。<br />'
          ]
        },
        controller: new AttributeController({
          type: 'boolean',
          default: true
        })
      })
    )
    this.insertAttribute(new Legend(parent))
  }
}
