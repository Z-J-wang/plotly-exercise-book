import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'

export class Font extends Attribute {
  constructor(parent: Attribute | null, description?: Attribute.Description) {
    if (!description) description = { type: 'String', value: '字体设置' }
    super('font', 'Font', { parent, description })
    super.addChild(
      new Attribute('color', 'Color', {
        parent: this,
        description: { type: 'String', value: '字体颜色' },
        controller: new AttributeController({
          type: 'color',
          default: 'white'
        })
      })
    )
    super.addChild(
      new Attribute('family', 'string', {
        parent: this,
        description: { type: 'String', value: '字体' },
        controller: new AttributeController({
          type: 'string',
          default: 'Arial, sans-serif'
        })
      })
    )
    super.addChild(
      new Attribute('lineposition', 'Lineposition', {
        parent: this,
        description: { type: 'String', value: '修饰线的位置' },
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
    super.addChild(
      new Attribute('shadow', 'string', {
        parent: this,
        description: { type: 'String', value: '字体阴影' },
        controller: new AttributeController({
          type: 'string',
          default: 'none'
        })
      })
    )
    super.addChild(
      new Attribute('size', 'number', {
        parent: this,
        description: { type: 'String', value: '字体大小' },
        controller: new AttributeController({
          type: 'number',
          default: 13,
          min: 8,
          step: 2
        })
      })
    )
    super.addChild(
      new Attribute('weight', 'number', {
        parent: this,
        description: { type: 'String', value: '字重' },
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
    super.addChild(
      new Attribute('style', '"normal" | "italic"', {
        parent: this,
        description: { type: 'String', value: '字体样式' },
        controller: new AttributeController({
          type: 'select',
          default: 'normal',
          options: ['normal', 'italic']
        })
      })
    )
    super.addChild(
      new Attribute(
        'variant',
        '"normal" | "small-caps" | "all-small-caps" | "all-petite-caps" | "petite-caps" | "unicase"',
        {
          parent: this,
          description: { type: 'String', value: '字体变形' },
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
