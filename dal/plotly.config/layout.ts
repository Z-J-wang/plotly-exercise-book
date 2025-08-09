import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { BaseConfig } from './base'
import LayoutTitle from './layout.title'
import LayoutLegend from './layout.legend'

export default class Layout extends BaseConfig {
  constructor(parent: Attribute | null) {
    super(parent)
    this.insertAttribute(new LayoutTitle(parent))
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
    this.insertAttribute(new LayoutLegend(parent))
  }
}
