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
      new Attribute('xref', "'container' | 'paper'", {
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
      })
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
      new Attribute('xanchor', "'auto' | 'left' | 'center' | 'right'", {
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
      })
    )

    this.addChild(
      new Attribute('yref', "'container' | 'paper'", {
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
      })
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
      new Attribute('yanchor', "'auto' | 'top' | 'middle' | 'bottom'", {
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
      })
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
