import Attribute from 'entity/attribute'
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
  TraceHoveron,
  TraceType
} from '../trace.base'
import TraceData from '../trace.data'
import AttributeController from 'entity/attribute.controller'
import TraceText from '../trace.text'
import TraceHover from '../trace.hover'
import TraceStack from '../trace.stack'
import TraceMarker from '../trace.marker'
import ScatterLine from './scatter.line'
import TraceErrorBar from '../trace.error.bar'
import TraceSelected from '../trace.selected'
import { TraceFillAssemble } from '../trace.fill'
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
      description: {
        type: 'string',
        value:
          '<code>scatter</code> 轨迹图，用于可用于绘制散点图或者折线图。<br />' +
          '更多示例：<a href="https://plotly.com/javascript/line-and-scatter/" target="_blank">https://plotly.com/javascript/line-and-scatter/</a>'
      },
      initialConfig: baseInitialConfig
    })

    this.addChild(new TraceType({ options: { parent: this } }, 'scatter'))

    this.addChild(
      new TraceName({
        options: {
          parent: this,
          controller: new AttributeController({ type: 'string', default: null, value: 'scatter trace' })
        }
      })
    )
    this.addChild(new TraceVisible(this))
    new TraceLegendAbout(this)

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

    const textpositionOptions = [
      'top left',
      'top center',
      'top right',
      'middle left',
      'middle center',
      'middle right',
      'bottom left',
      'bottom center',
      'bottom right',
      'inside',
      'outside',
      'auto',
      'none'
    ]

    this.addChild(
      new Attribute(
        'textposition',
        {
          type: 'enum',
          value: textpositionOptions
        },
        {
          parent: this,
          description: { type: 'string', value: '文本模式下，设置文本相对于数据点的位置。' },
          controller: new AttributeController({
            type: 'select',
            default: 'middle center',
            options: textpositionOptions
          })
        }
      )
    )

    new TraceHover(this)

    this.addChild(new TraceMeta(this))

    this.addChild(new TraceXaxis(this))

    this.addChild(new TraceYaxis(this))

    new TraceStack(this, {
      data: [
        {
          x: [1, 2, 3, 4],
          y: [10, 15, null, 17],
          mode: 'lines+markers',
          stackgroup: 'group1',
          type: 'scatter',
          name: 'scatter trace'
        },
        {
          x: [2, 3, 4, 5],
          y: [16, 5, 11, 9],
          mode: 'lines+markers',
          stackgroup: 'group1',
          type: 'scatter',
          name: 'scatter trace'
        }
      ]
    })

    this.addChild(
      new TraceMarker(this, undefined, {
        data: [
          {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            mode: 'markers',
            type: 'scatter',
            marker: {
              color: [10, 15, 13, 17],
              size: [10, 30, 20, 40]
            }
          }
        ]
      })
    )

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

    this.addChild(new TraceHoveron(this))

    this.addChild(new BaseUirevision(this))
  }
}
