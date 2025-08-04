import Attribute from 'entities/attribute'

export class Font extends Attribute {
  constructor(parent: Attribute | null, description?: Attribute.Description) {
    if (!description) description = { type: 'String', value: '字体设置' }
    super(parent, 'font', 'Font', description)
    super.addChild(
      new Attribute(
        this,
        'color',
        'Color',
        { type: 'String', value: '字体颜色' },
        {
          type: 'color',
          value: 'white',
          default: 'white'
        }
      )
    )
    super.addChild(
      new Attribute(
        this,
        'family',
        'string',
        { type: 'String', value: '字体' },
        {
          type: 'string',
          value: 'Arial, sans-serif',
          default: 'Arial, sans-serif'
        }
      )
    )
    super.addChild(
      new Attribute(
        this,
        'lineposition',
        'Lineposition',
        { type: 'String', value: '修饰线的位置' },
        {
          type: 'select',
          value: 'none',
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
        }
      )
    )
    super.addChild(
      new Attribute(
        this,
        'shadow',
        'string',
        { type: 'String', value: '字体阴影' },
        {
          type: 'string',
          value: 'none',
          default: 'none'
        }
      )
    )
    super.addChild(
      new Attribute(
        this,
        'size',
        'number',
        { type: 'String', value: '字体大小' },
        {
          type: 'number',
          value: 13,
          default: 13,
          min: 8,
          step: 2
        }
      )
    )
    super.addChild(
      new Attribute(
        this,
        'weight',
        'number',
        { type: 'String', value: '字重' },
        {
          type: 'select',
          value: 'normal',
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
        }
      )
    )
    super.addChild(
      new Attribute(
        this,
        'style',
        '"normal" | "italic"',
        { type: 'String', value: '字体样式' },
        {
          type: 'select',
          value: 'normal',
          default: 'normal',
          options: ['normal', 'italic']
        }
      )
    )
    super.addChild(
      new Attribute(
        this,
        'variant',
        '"normal" | "small-caps" | "all-small-caps" | "all-petite-caps" | "petite-caps" | "unicase"',
        { type: 'String', value: '字体变形' },
        {
          type: 'select',
          value: 'normal',
          default: 'normal',
          options: ['normal', 'small-caps', 'all-small-caps', 'all-petite-caps', 'petite-caps', 'unicase']
        }
      )
    )
  }
}
