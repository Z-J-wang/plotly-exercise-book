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
  TraceType,
  TraceCustomdata,
  TraceOrientation,
  TraceSelectedPoints
} from '../trace.base'
import ViolinData from './violin.data'
import AttributeController from 'entity/attribute.controller'
import TraceText from '../trace.text'
import TraceHover from '../trace.hover'
import { BaseUirevision } from '../../base'
import Colorbar from '../trace.colorbar'
import TraceColorscale from '../trace.colorscale'
import exampleData from '@/assets/data/violin.json'
import ViolinAlignmentGroup from '@/components/doc/traces/ViolinAlignmentGroup.vue'
import BoxMarker from '../box/marker'
import ViolinLine from './violin.line'
import ViolinBox from './violin.box'
import TraceSelected from '../trace.selected'

export default class TraceBar extends Attribute {
  constructor(parent: Attribute) {
    const baseInitialConfig: PlotlyConfig = {
      data: [
        {
          type: 'violin',
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
      new Attribute('text', 'string | string[]', {
        parent: this,
        description: {
          type: 'markdown',
          value:
            '设置与每个样本值相关联的文本元素。若为单个字符串，则该字符串将显示在所有数据点上。若为字符串数组，则数组中的元素将按顺序映射到该轨迹的 (x, y) 坐标上。若要显示这些文本，轨迹的 `hoverinfo` 必须包含 `text` 标志。'
        },
        controller: new AttributeController({ type: 'string', default: null })
      })
    )

    new TraceText(this, ['text', 'textfont', 'hoverongaps', 'texttemplate'])

    this.addChild(new TraceMeta(this))

    this.addChild(new TraceCustomdata(this))

    this.addChild(new TraceXaxis(this))

    this.addChild(new TraceYaxis(this))

    this.addChild(new TraceOrientation(this))

    this.addChild(
      new Attribute('alignmentgroup', 'string', {
        parent: this,
        description: {
          type: 'Component',
          value: ViolinAlignmentGroup
        }
      })
    )

    this.addChild(
      new Attribute('offsetgroup', 'string', {
        parent: this,
        description: {
          type: 'markdown',
          value:
            '将与同一位置轴或匹配轴相关的多个轨迹设置为同一个偏移组，这样同一位置坐标下的柱形图将能够排列整齐。详见：`alignmentgroup`'
        }
      })
    )

    this.addChild(new BoxMarker(this))

    this.addChild(new ViolinLine(this))

    this.addChild(new ViolinBox(this))

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

    this.addChild(new TraceConnectgaps(this))

    this.addChild(new BaseUirevision(this))
  }
}
