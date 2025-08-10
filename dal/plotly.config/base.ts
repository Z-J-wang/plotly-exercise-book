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

  constructor(parent: Attribute | null) {
    this._parent = parent
  }
}

export class Font extends Attribute {
  constructor(parent: Attribute | null, description?: Attribute.Description, name: string = 'font') {
    if (!description) description = { type: 'string', value: '字体设置' }

    super(name, 'Font', { parent, description })
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

export class Margin extends Attribute {
  constructor(parent: Attribute | null, description?: Attribute.Description, name: string = 'margin') {
    if (!description) description = { type: 'string', value: '设置外边距' }

    super(name, 'Margin', { parent, description })

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
