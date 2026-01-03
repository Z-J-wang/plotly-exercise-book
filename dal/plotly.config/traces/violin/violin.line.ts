import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class ViolinLine extends Attribute {
  constructor(
    parent: Attribute,
    description?: Attribute.Description,
    omitChildren: string[] = [],
    initialConfig?: PlotlyConfig
  ) {
    super('line', 'ViolinLine', {
      parent,
      description: description || { type: 'string', value: '设置边框样式。' },
      initialConfig
    })

    !omitChildren.includes('width') && this.addChild(new ViolinLineWidth(this))
    !omitChildren.includes('color') && this.addChild(new ViolinLineColor(this))
  }
}

export class ViolinLineWidth extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('width', 'number', {
      parent,
      description: description || { type: 'string', value: '设置边框宽度。' },
      controller: new AttributeController({ type: 'number', default: 2, min: 0 }),
      initialConfig
    })
  }
}

export class ViolinLineColor extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('color', 'Color | Color[] | number[]', {
      parent,
      description: description || { type: 'string', value: '设置小提琴图的边框颜色。' },
      controller: new AttributeController({ type: 'color', default: null }),
      initialConfig
    })
  }
}
