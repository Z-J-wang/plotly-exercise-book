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
import ViolinData from './violin.data'
import AttributeController from 'entity/attribute.controller'
import TraceText from '../trace.text'
import TraceHover from '../trace.hover'
import { BaseUirevision } from '../../base'
import Colorbar from '../trace.colorbar'
import TraceColorscale from '../trace.colorscale'
import exampleData from '@/assets/data/violin.json'

export default class TraceBar extends Attribute {
  constructor(parent: Attribute) {
    const baseInitialConfig: PlotlyConfig = {
      data: [
        {
          type: 'violin',
          points: false,
          box: { visible: true },
          boxpoints: false,
          line: { color: 'black' },
          fillcolor: '#8dd3c7',
          opacity: 0.6,
          meanline: { visible: true },
          x0: 'Total Bill',
          y: exampleData.map((item) => item.total_bill)
        }
      ],
      layout: {
        title: { text: '小提琴图示例' },
        yaxis: { zeroline: true }
      }
    }

    super('violin', 'Violin', {
      parent,
      description: {
        type: 'markdown',
        value: `
更多示例：<a href="https://plotly.com/javascript/violin/" target="_blank">https://plotly.com/javascript/violin/</a>

官方文档：<a href="https://plotly.com/javascript/reference/violin/" target="_blank">https://plotly.com/javascript/reference/violin/</a>
        `
      },
      initialConfig: baseInitialConfig
    })

    this.addChild(new TraceType(this, 'heatmap'))

    this.addChild(
      new TraceName(this, new AttributeController({ type: 'string', default: null, value: 'violin trace' }))
    )
    this.addChild(new TraceVisible(this))
    new TraceLegendAbout(this, ['legendwidth'])

    this.addChild(new TraceIds(this))

    this.addChild(new TraceOpacity(this))

    this.addChild(new TraceZorder(this))

    new ViolinData(this)

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
