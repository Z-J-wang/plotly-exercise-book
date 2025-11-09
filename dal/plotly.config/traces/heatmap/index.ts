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

export default class TraceBar extends Attribute {
  constructor(parent: Attribute) {
    const baseInitialConfig: PlotlyConfig = {
      data: [
        {
          z: [
            [1, null, 30, 50, 1],
            [20, 1, 60, 80, 30],
            [30, 60, 1, -10, 20]
          ],
          x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          y: ['Morning', 'Afternoon', 'Evening'],
          type: 'heatmap'
        }
      ],
      layout: { title: { text: '热力图基础示例' } }
    }

    super('heatmap', 'Heatmap', {
      parent,
      description: {
        type: 'string',
        value:
          '描述热力图数值与颜色映射关系的数据在 <code>z</code> 中设定。<code>z</code> 中的数据可以是二维数值数组（规则或不规则），' +
          '也可以是一维数值数组。当 <code>z</code> 为二维数组时，假设 <code>z</code> 有 N 行 M 列。那么，默认情况下，' +
          '生成的热力图在 y 轴方向会有 N 个分区，在 x 轴方向会有 M 个分区。换言之，<code>z</code> 中的第 i 行/第 j 列单元格' +
          '会映射到 y 轴的第 i 个分区（从图表底部开始计数）以及 x 轴的第 j 个分区（从图表左侧开始计数）。' +
          '通过使用 `transpose` 可以反转这种映射方式。此外，可以为 <code>x</code>（<code>y</code>）提供 M 个或 M + 1 个（N 个或 N + 1 个）元素。' +
          '若为 M 个（N 个），则这些坐标对应热力图单元格的中心，且单元格宽度相等；若为 M + 1 个（N + 1 个），' +
          '则这些坐标对应热力图单元格的边缘。当 <code>z</code> 为一维数组时，必须分别在 <code>x</code> 和 <code>y</code> 中提供 x 坐标和 y 坐标，' +
          '以形成数据三元组。<br />' +
          '更多示例：<a href="https://plotly.com/javascript/heatmaps/" target="_blank">https://plotly.com/javascript/heatmaps/</a> <br />' +
          '官方文档：<a href="https://plotly.com/javascript/reference/heatmap/" target="_blank">https://plotly.com/javascript/reference/heatmap/</a>'
      },
      initialConfig: baseInitialConfig
    })

    this.addChild(new TraceType(this, 'heatmap'))

    this.addChild(
      new TraceName(this, new AttributeController({ type: 'string', default: null, value: 'scatter trace' }))
    )
    this.addChild(new TraceVisible(this))
    new TraceLegendAbout(this)

    this.addChild(new TraceIds(this))

    this.addChild(new TraceOpacity(this))

    this.addChild(new TraceZorder(this))

    // 翻译到此处

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
