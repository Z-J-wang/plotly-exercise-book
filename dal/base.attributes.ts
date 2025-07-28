import Attribute from 'entities/attribute'

export class Font extends Attribute {
  constructor(parent: Attribute | null, description?: string) {
    if (!description) description = '字体设置'
    super(parent, 'font', 'Font', description)
    super.addChild(
      new Attribute(this, 'color', 'Color', '字体颜色', {
        type: 'string',
        default: 'white'
      })
    )
    super.addChild(
      new Attribute(this, 'family', 'string', '字体', {
        type: 'select',
        default: 'Arial, sans-serif'
      })
    )
    super.addChild(
      new Attribute(this, 'lineposition', 'Lineposition', '修饰线的位置', {
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
    )
    super.addChild(
      new Attribute(this, 'shadow', 'string', '字体阴影', {
        type: 'string',
        default: 'none'
      })
    )
    super.addChild(
      new Attribute(this, 'size', 'number', '字体大小', {
        type: 'number',
        default: 13
      })
    )
    super.addChild(
      new Attribute(this, 'weight', 'number', '字重', {
        type: 'number',
        default: 400
      })
    )
    super.addChild(
      new Attribute(this, 'style', '"normal" | "italic"', '字体样式', {
        type: 'select',
        default: 'normal',
        options: ['normal', 'italic']
      })
    )
    super.addChild(
      new Attribute(
        this,
        'variant',
        '"normal" | "small-caps" | "all-small-caps" | "all-petite-caps" | "petite-caps" | "unicase"',
        '字体变形',
        {
          type: 'select',
          default: 'normal',
          options: ['normal', 'small-caps', 'all-small-caps', 'all-petite-caps', 'petite-caps', 'unicase']
        }
      )
    )
  }
}
