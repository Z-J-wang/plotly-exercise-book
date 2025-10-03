import Attribute from 'entities/attribute'
import {
  TraceName,
  TraceVisible,
  TraceLegendAbout,
  TraceOpacity,
  TraceIds,
  TraceMeta,
  TraceType,
  TraceCustomdata,
  TraceAutoMargin
} from '../trace.base'
import AttributeController from 'entities/attribute.controller'
import TraceText from '../trace.text'
import TraceMarker from '../trace.marker'
import PieHover from './pie.hover'
import PieMarker from './pie.marker'
import PieDomain from './pie.domain'
import { BaseUirevision, Font } from '../../base'

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
      layout: { title: { text: '饼图示例' } }
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

    this.addChild(new TraceMeta(this))

    this.addChild(new TraceCustomdata(this))

    this.addChild(new PieDomain(this))

    this.addChild(new TraceAutoMargin(this))

    this.addChild(
      new Attribute(
        'direction',
        { type: 'enum', value: ['clockwise', 'counterclockwise'] },
        {
          parent: this,
          description: { type: 'string', value: '设置饼图的方向。' },
          controller: new AttributeController({
            type: 'select',
            default: 'clockwise',
            options: ['clockwise', 'counterclockwise']
          })
        }
      )
    )

    this.addChild(
      new Attribute('hole', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '设置饼图的内环半径大小。'
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0, max: 1, step: 0.1 })
      })
    )

    this.addChild(
      new Font('insidetextfont', 'Font', {
        parent: this,
        description: {
          type: 'string',
          value: '设置扇形内部文字的字体样式。此属性优先级高于<code>bar.textfont</code>属性。'
        }
      })
    )

    this.addChild(
      new Attribute(
        'insidetextorientation',
        { type: 'enum', value: ['horizontal', 'radial', 'tangential', 'auto'] },
        {
          parent: this,
          description: { type: 'string', value: '设置扇形内部文字的显示方向。' },
          controller: new AttributeController({
            type: 'select',
            default: 'auto',
            options: ['horizontal', 'radial', 'tangential', 'auto']
          })
        }
      )
    )

    this.addChild(
      new Font('outsidetextfont', 'Font', {
        parent: this,
        description: {
          type: 'string',
          value: '设置扇形外部文字的字体样式。此属性优先级高于<code>bar.textfont</code>属性。'
        }
      })
    )

    this.addChild(
      new Attribute('rotation', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '默认情况下，第一个扇形在12点钟方向开始绘制。通过此属性可以将扇形旋转。'
        },
        controller: new AttributeController({ type: 'number', default: 0 })
      })
    )

    this.addChild(
      new Attribute('scalegroup', 'string', {
        parent: this,
        description: {
          type: 'string',
          value:
            '如果你想根据饼图的数据总和大小来调整饼图的大小，请将各个饼图的<code>scalegroup</code>属性设置为相同的值。'
        },
        controller: new AttributeController({ type: 'select', default: '', options: ['', 'one'] }),
        initialConfig: {
          data: [
            {
              values: [10, 20, 30],
              text: ['Residential', 'Non-Residential', 'Utility'],
              scalegroup: '',
              type: 'pie',
              domain: { column: 0 }
            },
            {
              values: [200, 100, 300],
              text: ['Residential', 'Non-Residential', 'Utility'],
              scalegroup: 'one',
              type: 'pie',
              domain: { column: 1 }
            }
          ],
          layout: {
            title: { text: '请尝试更改第一个饼图的scalegroup属性观察变化效果。' },
            grid: { rows: 1, columns: 2 }
          }
        }
      })
    )

    this.addChild(
      new Attribute('sort', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value: '设置扇形是否根据数据大小进行排序。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    this.addChild(new BaseUirevision(this))
  }
}
