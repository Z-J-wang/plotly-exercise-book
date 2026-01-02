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
  TraceConnectgaps,
  TraceType
} from '../trace.base'
import HeatmapData from './heatmap.data'
import AttributeController from 'entity/attribute.controller'
import TraceText from '../trace.text'
import TraceHover from '../trace.hover'
import { BaseUirevision } from '../../base'
import Colorbar from '../trace.colorbar'
import TraceColorscale from '../trace.colorscale'

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

    super('violin', 'Violin', {
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
          '更多示例：<a href="https://plotly.com/javascript/violin/" target="_blank">https://plotly.com/javascript/violin/</a> <br />' +
          '官方文档：<a href="https://plotly.com/javascript/reference/violin/" target="_blank">https://plotly.com/javascript/reference/violin/</a>'
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

    new HeatmapData(this)

    this.addChild(
      new Attribute('text', '[]', {
        parent: this,
        description: { type: 'string', value: '设置以每个z值关联的文本。' }
      })
    )

    new TraceText(this, ['text', 'textfont'])

    new TraceHover(this, ['zhoverformat'])

    this.addChild(new TraceMeta(this))

    this.addChild(new TraceXaxis(this))

    this.addChild(new TraceYaxis(this))

    this.addChild(
      new Attribute('coloraxis', 'string', {
        parent: this,
        description: {
          type: 'string',
          value:
            '指定要使用的颜色轴配置。关于颜色轴的配置，详见 <a href="#layout.coloraxis"><code>layout.coloraxis</code></a>。'
        },
        controller: new AttributeController({ default: 'x' })
      })
    )

    this.addChild(new Colorbar(this))

    new TraceColorscale(this)

    this.addChild(
      new Attribute('zauto', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value:
            '确定颜色域的计算是基于输入数据（此处为“z”）进行的，还是基于在“zmin”和“zmax”中设定的范围进行的。' +
            '当用户设置了“zmin”和“zmax”时，默认值为“false”。'
        },
        controller: new AttributeController({ type: 'boolean', default: null })
      })
    )

    this.addChild(
      new Attribute('zmin', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '设置颜色域的最小值。'
        },
        controller: new AttributeController({ type: 'number', default: null })
      })
    )

    this.addChild(
      new Attribute('zmax', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '设置颜色域的上限值。该值应与“z”中的单位相同，若设置此值，则“zmin”也必须进行设置。'
        },
        controller: new AttributeController({ type: 'number', default: null })
      })
    )

    this.addChild(
      new Attribute('zmid', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '通过将 “zmin” 和/或 “zmax” 进行缩放，使颜色域的中点与该点保持等距。该值应与 "z" 中的单位相同。当 “zauto” 为 “false” 时，此操作将不起作用。'
        },
        controller: new AttributeController({ type: 'number', default: null })
      })
    )

    this.addChild(
      new Attribute(
        'zsmooth',
        { type: 'enum', value: ['fast', 'best', false] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '设置颜色域的平滑度。'
          },
          controller: new AttributeController({
            type: 'select',
            default: false,
            options: ['fast', 'best', false]
          })
        }
      )
    )

    this.addChild(new TraceConnectgaps(this))

    this.addChild(new BaseUirevision(this))
  }
}
