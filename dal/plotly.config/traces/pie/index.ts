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
  TraceOrientation,
  TraceTextAngle,
  TraceType
} from '../trace.base'
import TraceData from '../trace.data'
import AttributeController from 'entities/attribute.controller'
import TraceText from '../trace.text'
import TraceHover from '../trace.hover'
import TraceMarker from '../trace.marker'
import TraceErrorBar from '../trace.error.bar'
import TraceSelected from '../trace.selected'
import PieHover from './pie.hover'
import PieMarker from './pie.marker'
import { BaseUirevision } from '../../base'

export default class TracePie extends Attribute {
  constructor(parent: Attribute) {
    const baseInitialConfig: PlotlyConfig = {
      data: [
        {
          values: [19, 26, 55],
          labels: ['Residential', 'Non-Residential', 'Utility'],
          text: ['Residential', 'Non-Residential', 'Utility'],
          type: 'pie'
        }
      ],
      layout: { title: { text: 'The example of pie trace' } }
    }

    super('pie', 'Pie', {
      parent,
      description: {
        type: 'string',
        value:
          '<code>pie</code> 轨迹图，用于绘制饼图。<br />' +
          '更多示例：<a href="https://plotly.com/javascript/piepie-charts/" target="_blank">https://plotly.com/javascript/piepie-charts/</a>'
      },
      initialConfig: baseInitialConfig
    })

    this.addChild(new TraceType(this, 'pie'))

    this.addChild(
      new TraceName(this, new AttributeController({ type: 'string', default: null, value: 'scatter trace' }))
    )
    this.addChild(new TraceVisible(this))
    new TraceLegendAbout(this)

    this.addChild(new TraceIds(this))

    this.addChild(new TraceOpacity(this))

    this.addChild(
      new Attribute('values', 'Array', {
        parent: this,
        description: { type: 'string', value: '设置饼图的数据值。' }
      })
    )

    this.addChild(
      new Attribute('labels', 'Array', {
        parent: this,
        description: {
          type: 'string',
          value: '设置饼图的标签。如果存在重复的标签，则它们将自动合并。如果标签不存在对应的值，则统计标签出现的次数。'
        }
      })
    )

    this.addChild(
      new Attribute('label0', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '设置饼图的标签起始值。与<code>dlabel</code>一起使用。用于替代<code>labels</code>。'
        },
        controller: new AttributeController({ default: 0 })
      })
    )

    this.addChild(
      new Attribute('dlabel', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '设置饼图的标签跨度。与<code>label0</code>一起使用。用于替代<code>labels</code>。'
        },
        controller: new AttributeController({ default: 1 })
      })
    )

    this.addChild(
      new Attribute('pull', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '设置从中心向外拉伸扇形区域时较大半径的比例。这可以是一个常量，用于将所有扇形均匀地相互拉开；也可以是一个数组，用于突出显示一个或多个扇形。'
        },
        controller: new AttributeController({ type: 'number', default: 0, step: 0.1, min: 0, max: 1 })
      })
    )

    new TraceText(this)

    this.addChild(
      new Attribute(
        'textposition',
        { type: 'enum', value: ['inside', 'outside', 'auto', 'none'] },
        {
          parent: this,
          description: { type: 'string', value: '设置文本的显示位置。' },
          controller: new AttributeController({
            type: 'select',
            default: 'auto',
            options: ['inside', 'outside', 'auto', 'none']
          })
        }
      )
    )

    const textinfoOptions = [
      'none',
      'label',
      'text',
      'label+text',
      'value',
      'percent',
      'label+percent',
      'label+value',
      'label+value+percent'
    ]

    this.addChild(
      new Attribute(
        'textinfo',
        { type: 'enum', value: textinfoOptions },
        {
          parent: this,
          description: { type: 'string', value: '设置文本显示信息。' },
          controller: new AttributeController({ type: 'select', default: null, options: textinfoOptions })
        }
      )
    )

    new PieHover(this)

    new TraceMarker(this)

    this.addChild(new PieMarker(this))

    this.addChild(new BaseUirevision(this))
  }
}
