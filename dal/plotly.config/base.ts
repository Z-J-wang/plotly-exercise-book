import { easing } from '@/utils/global.variable'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { Font } from './base.font'
import { merge } from 'lodash'

/**
 * Plotly 配置基类，该类用于维护配置清单
 */
export class BaseConfig {
  private _parent!: Attribute | null

  public get parent(): Attribute | null {
    return this._parent
  }
  private _attributes: Attribute[] = []

  public get attributes(): Attribute[] {
    return this._attributes
  }

  public insertAttribute(newAttribute: Attribute) {
    this._attributes.push(newAttribute)
  }

  constructor(parent: Attribute) {
    this._parent = parent
  }
}

/**
 * 外边距属性类，可继承扩展
 * 属性：'t' | 'b | 'l' | 'r' | 'pad'
 */
export class Margin extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'margin',
      type: 'Margin',
      options: {
        description: { type: 'string', value: '设置绘图区域外边距，即绘图区域与容器的边界之间的距离。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(
      new Attribute({
        name: 't',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '上外边距' },
          controller: new AttributeController({ type: 'number', default: 100 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'b',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '下外边距' },
          controller: new AttributeController({ type: 'number', default: 80 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'l',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '左外边距' },
          controller: new AttributeController({ type: 'number', default: 80 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'r',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '右外边距' },
          controller: new AttributeController({ type: 'number', default: 80 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'pad',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '内边距' },
          controller: new AttributeController({ type: 'number', default: 0 })
        }
      })
    )
  }
}

/**
 * 线条属性类，可继承扩展。子属性：'color' | 'width' | 'dash'
 */
export class Line extends Attribute {
  constructor(name: string, type: string, options: Attribute.Options) {
    super(name, type, options)

    this.addChild(
      new Attribute('color', 'Color', {
        parent: this,
        description: { type: 'string', value: '线条颜色' },
        controller: new AttributeController({ type: 'color', default: null })
      })
    )

    this.addChild(
      new Attribute('width', 'number', {
        parent: this,
        description: { type: 'string', value: '线条宽度。单位为<code>px</code>。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 1 })
      })
    )

    this.addChild(
      new Attribute(
        'dash',
        { type: 'enum', value: ['solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot'] },
        {
          parent: this,
          description: { type: 'string', value: '线条样式' },
          controller: new AttributeController({
            type: 'select',
            default: 'dot',
            options: ['solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot']
          })
        }
      )
    )
  }
}

/**
 * 标题属性类，可继承扩展
 * 子属性：'bgcolor' | 'bordercolor' | 'font'
 */
export class Label extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    super(initializer)
    this.addChild(
      new Attribute('bgcolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '标签背景颜色' },
        controller: new AttributeController({ type: 'color', default: null })
      })
    )

    this.addChild(
      new Attribute('bordercolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '标签边框颜色' },
        controller: new AttributeController({ type: 'color', default: null })
      })
    )
    this.addChild(
      new Font({ name: 'font', options: { parent: this, description: { type: 'string', value: '字体设置' } } })
    )
  }
}

/**
 * 过渡效果属性类
 * 子属性: 'duration' | 'easing' | 'ordering'
 */
export class Transition extends Attribute {
  constructor(name: string, type: string, options: Attribute.Options) {
    super(name, type, options)

    this.addChild(
      new Attribute('duration', 'number', {
        parent: this,
        description: { type: 'string', value: '过渡持续时间。单位为毫秒。' },
        controller: new AttributeController({ type: 'number', default: 500, min: 0 })
      })
    )

    this.addChild(
      new Attribute(
        'easing',
        { type: 'enum', value: easing },
        {
          parent: this,
          description: { type: 'string', value: '过渡的缓动函数。' },
          controller: new AttributeController({
            type: 'select',
            default: 'cubic-in-out',
            options: easing
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'ordering',
        { type: 'enum', value: ['layout first', 'traces first'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '在进行会使轨迹和布局都发生变化的更新操作时，指定过渡的顺序优先顺序。<br />' +
              '<ul>' +
              '<li><code>layout first</code> - 先更新布局，再更新轨迹。</li>' +
              '<li><code>traces first</code> - 先更新轨迹，再更新布局。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'layout first'
          })
        }
      )
    )
  }
}

/**
 * 内边距
 */
export class Pad extends Attribute {
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

export class BaseUirevision extends Attribute {
  constructor(parent: Attribute) {
    super('uirevision', 'string | number', {
      parent,
      description: {
        type: 'string',
        value:
          '控制UI状态变化的持久性。' +
          '具体说明，详见：<a href="/#/docs/config/?id=layout-uirevision"><code>layout.uirevision</code></a>。'
      }
    })
  }
}
