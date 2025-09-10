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
  TraceConnectgaps,
  TraceHoveron
} from '../trace.base'
import TraceData from '../trace.data'
import AttributeController from 'entities/attribute.controller'
import TraceText from '../trace.text'
import TraceHover from '../trace.hover'
import TraceStack from '../trace.stack'
import TraceMarker from '../trace.marker'
import ScatterLine from './scatter.line'
import TraceErrorBar from '../trace.error.bar'
import TraceSelected from '../trace.selected'
import { TraceFillAssemble } from '../trace.fill'
import BaseHoverLabel from '../../base.hover.label'
import { BaseUirevision } from '../../base'

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

    new TraceData(this)

    new TraceText(this)

    new TraceHover(this)

    this.addChild(new TraceMeta(this))

    this.addChild(new TraceXaxis(this))

    this.addChild(new TraceYaxis(this))

    new TraceStack(this)

    this.addChild(new TraceMarker(this))

    this.addChild(new ScatterLine(this))

    this.addChild(
      new TraceErrorBar('error_x', {
        parent: this,
        description: { type: 'string', value: '设置数据点的在水平方向上的误差条。' }
      })
    )

    this.addChild(
      new TraceErrorBar('error_y', {
        parent: this,
        description: { type: 'string', value: '设置数据点的垂直方向上的误差条。' }
      })
    )

    this.addChild(new TraceSelectedPoints(this))

    this.addChild(
      new TraceSelected('selected', {
        parent: this,
        description: { type: 'string', value: '设置数据点的选择样式。' }
      })
    )

    this.addChild(
      new TraceSelected('unselected', {
        parent: this,
        description: { type: 'string', value: '设置数据点的未选择样式。' }
      })
    )

    this.addChild(new TraceCliponaxis(this))

    this.addChild(new TraceConnectgaps(this))

    new TraceFillAssemble(this)

    this.addChild(
      new BaseHoverLabel('hoverlabel', {
        parent: this,
        description: { type: 'string', value: '设置鼠标悬停时的标签样式。' }
      })
    )

    this.addChild(new TraceHoveron(this))

    this.addChild(new BaseUirevision(this))
  }
}
