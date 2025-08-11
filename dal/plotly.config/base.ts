import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'

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
 * 字体属性类，可继承扩展
 * 子属性：'color' | 'family' | 'size' | 'weight' | 'style' | 'variant' | 'lineposition' | 'shadow' | 'textcase'
 */
export class Font extends Attribute {
  constructor(name: string, type: string, options: Attribute.Options) {
    super(name, type, options)
    this.addChild(
      new Attribute('color', 'Color', {
        parent: this,
        description: { type: 'string', value: '字体颜色' },
        controller: new AttributeController({
          type: 'color',
          default: 'white'
        })
      })
    )
    this.addChild(
      new Attribute('family', 'string', {
        parent: this,
        description: { type: 'string', value: '字体' },
        controller: new AttributeController({
          type: 'string',
          default: 'Arial, sans-serif'
        })
      })
    )
    this.addChild(
      new Attribute('lineposition', 'Lineposition', {
        parent: this,
        description: { type: 'string', value: '修饰线的位置' },
        controller: new AttributeController({
          type: 'select',
          default: 'none',
          options: [
            'under',
            'over',
            'through',
            'under+over',
            'under+through',
            'over+through',
            'under+over+through',
            'none'
          ]
        })
      })
    )
    this.addChild(
      new Attribute('shadow', 'string', {
        parent: this,
        description: { type: 'string', value: '字体阴影' },
        controller: new AttributeController({
          type: 'string',
          default: 'none'
        })
      })
    )
    this.addChild(
      new Attribute('size', 'number', {
        parent: this,
        description: { type: 'string', value: '字体大小' },
        controller: new AttributeController({
          type: 'number',
          default: 13,
          min: 8,
          step: 2
        })
      })
    )
    this.addChild(
      new Attribute('weight', 'number', {
        parent: this,
        description: { type: 'string', value: '字重' },
        controller: new AttributeController({
          type: 'select',
          default: 'normal',
          options: [
            '100',
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'normal',
            'bold',
            'bolder',
            'lighter'
          ]
        })
      })
    )
    this.addChild(
      new Attribute(
        'style',
        { type: 'enum', value: ['normal', 'italic'] },
        {
          parent: this,
          description: { type: 'string', value: '字体样式' },
          controller: new AttributeController({
            type: 'select',
            default: 'normal',
            options: ['normal', 'italic']
          })
        }
      )
    )
    this.addChild(
      new Attribute(
        'textcase',
        { type: 'enum', value: ['normal', 'word caps', 'upper', 'lower'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '文本大小写设置: <br />' +
              '<ul>' +
              '<li><code>normal</code> - 默认值。</li>' +
              '<li><code>word caps</code> - 每个单词首字母大写。</li>' +
              '<li><code>upper</code> - 全大写。</li>' +
              '<li><code>lower</code> - 全小写。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'normal',
            options: ['normal', 'word caps', 'upper', 'lower']
          })
        }
      )
    )
    this.addChild(
      new Attribute(
        'variant',
        {
          type: 'enum',
          value: ['normal', 'small-caps', 'all-small-caps', 'all-petite-caps', 'petite-caps', 'unicase']
        },
        {
          parent: this,
          description: { type: 'string', value: '字体变形' },
          controller: new AttributeController({
            type: 'select',
            default: 'normal',
            options: ['normal', 'small-caps', 'all-small-caps', 'all-petite-caps', 'petite-caps', 'unicase']
          })
        }
      )
    )
  }
}

/**
 * 外边距属性类，可继承扩展
 * 属性：'t' | 'b | 'l' | 'r' | 'pad'
 */
export class Margin extends Attribute {
  constructor(name: string, type: string, options: Attribute.Options) {
    super(name, type, options)

    this.addChild(
      new Attribute('t', 'number', {
        parent: this,
        description: { type: 'string', value: '上外边距' },
        controller: new AttributeController({ type: 'number', default: 100 })
      })
    )

    this.addChild(
      new Attribute('b', 'number', {
        parent: this,
        description: { type: 'string', value: '下外边距' },
        controller: new AttributeController({ type: 'number', default: 80 })
      })
    )

    this.addChild(
      new Attribute('l', 'number', {
        parent: this,
        description: { type: 'string', value: '左外边距' },
        controller: new AttributeController({ type: 'number', default: 80 })
      })
    )

    this.addChild(
      new Attribute('r', 'number', {
        parent: this,
        description: { type: 'string', value: '右外边距' },
        controller: new AttributeController({ type: 'number', default: 80 })
      })
    )

    this.addChild(
      new Attribute('pad', 'number', {
        parent: this,
        description: { type: 'string', value: '内边距' },
        controller: new AttributeController({ type: 'number', default: 0 })
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
  constructor(name: string, type: string, options: Attribute.Options) {
    super(name, type, options)

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
    this.addChild(new Font('font', 'Font', { parent: this, description: { type: 'string', value: '字体设置' } }))
  }
}
