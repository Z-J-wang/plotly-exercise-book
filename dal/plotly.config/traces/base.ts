import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'

export class TraceName extends Attribute {
  constructor(parent: Attribute) {
    super('name', 'string', {
      parent,
      description: {
        type: 'string',
        value: '设置轨迹名称。轨迹名称将作为图例名称显示，并且在鼠标悬停在轨迹上时显示。'
      },
      controller: new AttributeController({ type: 'string', default: null })
    })
  }
}

export class TraceVisible extends Attribute {
  constructor(parent: Attribute) {
    super(
      'visible',
      { type: 'enum', value: ['true', 'false', 'legendonly'] },
      {
        parent,
        description: { type: 'string', value: '设置轨迹是否可见。其中<code>legendonly</code>表示仅显示图例。' },
        controller: new AttributeController({
          type: 'select',
          default: 'true',
          options: ['true', 'false', 'legendonly']
        })
      }
    )
  }
}

/**
 * 轨迹图例相关属性
 */
export class TraceLegendAbout {
  constructor(parent: Attribute) {
    parent.addChild(
      new Attribute('showlegend', 'boolean', {
        parent,
        description: { type: 'string', value: '是否显示轨迹图例。' },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    parent.addChild(
      new Attribute('legendrank', 'number', {
        parent,
        description: { type: 'string', value: '图例的级别（权重），默认 <code>1000</code>，数字越小越靠前。' },
        controller: new AttributeController({ type: 'number', default: 1000 })
      })
    )
  }
}
