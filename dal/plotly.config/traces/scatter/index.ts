import Attribute from 'entities/attribute'
import { TraceName, TraceVisible, TraceLegendAbout, TraceOpacity, TraceIds, TraceZorder } from '../base'
import BaseData from '../base.data'
import AttributeController from 'entities/attribute.controller'
import BaseText from '../base.text'

export default class TraceScatter extends Attribute {
  constructor(parent: Attribute) {
    super('scatter', 'Scatter', {
      parent,
      description: { type: 'string', value: '<code>scatter</code> 轨迹图，用于可用于绘制散点图或者折线图。' },
      initialConfig: {
        data: [
          {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            text: ['A', 'B', 'C', 'D'],
            hoverinfo: 'all',
            mode: 'text+lines+markers',
            type: 'scatter',
            name: 'scatter trace',
            textposition: 'bottom center'
          }
        ],
        layout: { title: { text: 'The example of scatter trace' } }
      }
    })

    this.addChild(
      new TraceName(this, new AttributeController({ type: 'string', default: null, value: 'scatter trace' }))
    )
    this.addChild(new TraceVisible(this))
    new TraceLegendAbout(this)
    this.addChild(new TraceOpacity(this))

    this.addChild(
      new Attribute(
        'mode',
        {
          type: 'enum',
          value: [
            'lines',
            'markers',
            'text',
            'lines+markers',
            'text+markers',
            'text+lines',
            'text+lines+markers',
            'none'
          ]
        },
        {
          parent: this,
          description: { type: 'string', value: '设置轨迹模式。' },
          controller: new AttributeController({
            type: 'select',
            default: null,
            value: 'lines+markers',
            options: [
              'lines',
              'markers',
              'text',
              'lines+markers',
              'text+markers',
              'text+lines',
              'text+lines+markers',
              'none'
            ]
          })
        }
      )
    )

    this.addChild(new TraceIds(this))

    this.addChild(new TraceOpacity(this))

    this.addChild(new TraceZorder(this))

    new BaseData(this)

    new BaseText(this)
  }
}
