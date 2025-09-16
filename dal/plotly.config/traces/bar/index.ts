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
import { BaseUirevision } from '../../base'
import BarTextAnchor from './bar.text.anchor'

export default class TraceBar extends Attribute {
  constructor(parent: Attribute) {
    const baseInitialConfig: PlotlyConfig = {
      data: [
        {
          x: ['giraffes', 'orangutans', 'monkeys'],
          y: [20, 14, 23],
          text: ['A', 'B', 'C'],
          type: 'bar'
        }
      ],
      layout: { title: { text: 'The example of bar trace' } }
    }

    super('bar', 'Bar', {
      parent,
      description: {
        type: 'string',
        value:
          '<code>bar</code> 轨迹图，用于可用于绘制柱状图。<br />' +
          '更多示例：<a href="https://plotly.com/javascript/bar-charts/" target="_blank">https://plotly.com/javascript/bar-charts/</a>'
      },
      initialConfig: baseInitialConfig
    })

    this.addChild(new TraceType(this, 'bar'))

    this.addChild(
      new TraceName(this, new AttributeController({ type: 'string', default: null, value: 'scatter trace' }))
    )
    this.addChild(new TraceVisible(this))
    new TraceLegendAbout(this)

    this.addChild(new TraceIds(this))

    this.addChild(new TraceOpacity(this))

    this.addChild(new TraceZorder(this))

    new TraceData(this)

    this.addChild(
      new Attribute('base', 'number | number[]', {
        parent: this,
        description: {
          type: 'string',
          value: '设置柱状图基线。如果其值为数字数组，则对每个柱状设置单独设置。'
        },
        controller: new AttributeController({ type: 'number', default: 0 })
      })
    )

    this.addChild(
      new Attribute('width', 'number | number[]', {
        parent: this,
        description: { type: 'string', value: '设置柱状图宽度。如果其值为数字数组，则对每个柱状设置单独设置。' },
        controller: new AttributeController({ type: 'number', default: null, min: 0, step: 0.1 })
      })
    )

    new TraceText(this)

    this.addChild(
      new Attribute(
        'textposition',
        {
          type: 'enum',
          value: ['inside', 'outside', 'auto', 'none']
        },
        {
          parent: this,
          description: { type: 'string', value: '设置文本在柱状图中显示的位置。' },
          controller: new AttributeController({
            type: 'select',
            default: 'auto',
            options: ['inside', 'outside', 'auto', 'none']
          })
        }
      )
    )

    new BarTextAnchor(this)

    this.addChild(new TraceTextAngle(this))

    new TraceHover(this)

    this.addChild(new TraceMeta(this))

    this.addChild(new TraceXaxis(this))

    this.addChild(new TraceYaxis(this))

    this.addChild(new TraceOrientation(this))

    this.addChild(
      new TraceMarker(
        this,
        { type: 'string', value: '柱状图柱子的样式设置。注意，部分属性可能不生效。' },
        {
          data: [
            {
              x: ['giraffes', 'orangutans', 'monkeys'],
              y: [20, 14, 23],
              text: ['A', 'B', 'C'],
              type: 'bar',
              marker: {
                color: [10, 15, 30],
                size: [10, 30, 20]
              }
            }
          ]
        }
      )
    )

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

    this.addChild(
      new Attribute(
        'constraintext',
        { type: 'enum', value: ['both', 'inside', 'outside', 'none'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '将条形图内部或外部的文字大小限制在不超出条形图本身的范围内。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'both',
            options: ['both', 'inside', 'outside', 'none']
          })
        }
      )
    )

    this.addChild(new BaseUirevision(this))
  }
}
