import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import ViolinLine from './violin.line'

export default class ViolinBox extends Attribute {
  constructor(
    parent: Attribute,
    description?: Attribute.Description,
    omitChildren: string[] = [],
    initialConfig?: PlotlyConfig
  ) {
    super('box', 'ViolinBox', {
      parent,
      description: description || { type: 'string', value: '设置小提琴图内部箱型的样式。' },
      initialConfig
    })

    !omitChildren.includes('width') && this.addChild(new ViolinBoxWidth(this))
    !omitChildren.includes('visible') && this.addChild(new ViolinBoxVisible(this))
    !omitChildren.includes('fillcolor') && this.addChild(new ViolinBoxFillcolor(this))
    !omitChildren.includes('line') && this.addChild(new ViolinLine(this))
  }
}

export class ViolinBoxWidth extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('width', 'number', {
      parent,
      description: description || {
        type: 'string',
        value: '设置内箱形图的宽度相对于卷轴图宽度的比例。例如，设为 1 时，内箱形图的宽度与卷轴图的宽度相同。'
      },
      controller: new AttributeController({ type: 'number', default: 0.25, min: 0, step: 0.1 }),
      initialConfig
    })
  }
}

export class ViolinBoxVisible extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('visible', 'Boolean', {
      parent,
      description: description || { type: 'string', value: '是否显示内箱形图。' },
      controller: new AttributeController({ type: 'boolean', default: true }),
      initialConfig
    })
  }
}

export class ViolinBoxFillcolor extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('fillcolor', 'Color | Color[] | number[]', {
      parent,
      description: description || { type: 'string', value: '设置内箱形图的填充颜色。' },
      controller: new AttributeController({ type: 'color', default: null }),
      initialConfig
    })
  }
}
