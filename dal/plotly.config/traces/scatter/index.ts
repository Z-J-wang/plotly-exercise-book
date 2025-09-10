import Attribute from 'entities/attribute'
import {
  TraceName,
  TraceVisible,
  TraceLegendAbout,
  TraceOpacity,
  TraceIds,
  TraceZorder,
  TraceMeta,
  TraceXaxis,
  TraceYaxis,
  TraceSelectedPoints,
  TraceCliponaxis,
  TraceConnectgaps
} from '../base'
import BaseData from '../base.data'
import AttributeController from 'entities/attribute.controller'
import BaseText from '../base.text'
import BaseHover from '../base.hover'
import BaseStack from '../base.stack'
import BaseMarker from '../base.marker'
import ScatterLine from './scatter.line'
import BaseErrorBar from '../base.error.bar'
import BaseSelected from '../base.selected'
import { BaseFill } from '../base.fill'

export default class TraceScatter extends Attribute {
  constructor(parent: Attribute) {
    const baseInitialConfig: PlotlyConfig = {
      data: [
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          text: ['A', 'B', 'C', 'D'],
          hoverinfo: 'all',
          mode: 'text+lines+markers',
          type: 'scatter',
          name: 'scatter trace',
          textposition: 'top center'
        }
      ],
      layout: { title: { text: 'The example of scatter trace' } }
    }

    super('scatter', 'Scatter', {
      parent,
      description: { type: 'string', value: '<code>scatter</code> 轨迹图，用于可用于绘制散点图或者折线图。' },
      initialConfig: baseInitialConfig
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

    new BaseHover(this)

    this.addChild(new TraceMeta(this))

    this.addChild(new TraceXaxis(this))

    this.addChild(new TraceYaxis(this))

    new BaseStack(this)

    this.addChild(new BaseMarker(this))

    this.addChild(new ScatterLine(this))

    this.addChild(
      new BaseErrorBar('error_x', {
        parent: this,
        description: { type: 'string', value: '设置数据点的在水平方向上的误差条。' }
      })
    )

    this.addChild(
      new BaseErrorBar('error_y', {
        parent: this,
        description: { type: 'string', value: '设置数据点的垂直方向上的误差条。' }
      })
    )

    this.addChild(new TraceSelectedPoints(this))

    this.addChild(
      new BaseSelected('selected', {
        parent: this,
        description: { type: 'string', value: '设置数据点的选择样式。' }
      })
    )

    this.addChild(
      new BaseSelected('unselected', {
        parent: this,
        description: { type: 'string', value: '设置数据点的未选择样式。' }
      })
    )

    this.addChild(new TraceCliponaxis(this))

    this.addChild(new TraceConnectgaps(this))

    new BaseFill(this)
  }
}
