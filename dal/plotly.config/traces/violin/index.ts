import { merge } from 'lodash'
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
import exampleData from '@/assets/data/violin.json'
import ViolinAlignmentGroup from '@/components/doc/traces/ViolinAlignmentGroup.vue'
import BoxMarker from '../box/marker'
import ViolinLine from './violin.line'
import ViolinBox from './violin.box'
import TraceSelected from '../trace.selected'
import { BoxPointpos, BoxJitter } from '../box/index'
import ViolinMeanLine from './violin.meanline'
import { BoxBoxPoints } from '../box'

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

    super({
      name: 'violin',
      type: 'Violin',
      options: {
        parent,
        description: {
          type: 'markdown',
          value: `
更多示例：<a href="https://plotly.com/javascript/violin/" target="_blank">https://plotly.com/javascript/violin/</a>

官方文档：<a href="https://plotly.com/javascript/reference/violin/" target="_blank">https://plotly.com/javascript/reference/violin/</a>
        `
        },
        initialConfig: baseInitialConfig
      }
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

    this.addChild(new ViolinHoveron({ options: { parent: this } }))
    new TraceHover(this)

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

    this.addChild(new BoxMarker({ options: { parent: this } }))

    this.addChild(new ViolinLine({ options: { parent: this } }))

    this.addChild(new ViolinBox({ options: { parent: this } }))

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

    this.addChild(new ViolinBandwidth({ options: { parent: this } }))
    this.addChild(new ViolinFillcolor({ options: { parent: this } }))

    this.addChild(
      new BoxPointpos({
        options: {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置样本点相对于小提琴的位置。若设置为“0”，则样本点将位于小提琴的中心之上。正值（负值）对应于垂直小提琴的右侧（左侧）位置，以及水平小提琴的上方（下方）。'
          }
        }
      })
    )

    this.addChild(new BoxJitter({ options: { parent: this } }))

    this.addChild(new ViolinMeanLine({ options: { parent: this } }))

    this.addChild(new BoxBoxPoints({ name: 'points', options: { parent: this } }))
    this.addChild(new ViolinScalegroup({ options: { parent: this } }))
    this.addChild(new ViolinScalemode({ options: { parent: this } }))
    this.addChild(new ViolinSpanmode({ options: { parent: this } }))
    this.addChild(new ViolinSpan({ options: { parent: this } }))

    this.addChild(new BaseUirevision(this))
  }
}

export class ViolinBandwidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'bandwidth',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '设置用于计算核密度估计值的带宽值。默认情况下，带宽是根据西尔弗曼的经验法则来确定的。'
        },
        controller: new AttributeController({ type: 'number', default: null, min: 0, step: 0.1 })
      }
    }
    const mergedInitializer = merge(defaultInitializer, initializer)
    super(mergedInitializer)
  }
}

export class ViolinFillcolor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'fillcolor',
      type: 'Color',
      options: {
        description: {
          type: 'string',
          value: '小提琴图填充颜色。'
        },
        controller: new AttributeController({ type: 'color', default: null, value: '#8dd3c7' })
      }
    }
    const mergedInitializer = merge(defaultInitializer, initializer)
    super(mergedInitializer)
  }
}

export class ViolinHoveron extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const opts = ['violins', 'points', 'kde', 'violins+points', 'violins+kde', 'points+kde', 'violins+points+kde']

    const defaultInitializer = {
      name: 'hoveron',
      type: { type: 'enum', value: opts },
      options: {
        description: {
          type: 'string',
          value: '设置鼠标悬浮触发位置。'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'violins+points+kde',
          options: opts
        })
      }
    }
    const mergedInitializer = merge(defaultInitializer, initializer)
    super(mergedInitializer)
  }
}

export class ViolinScalegroup extends Attribute {
  constructor(initialization: Attribute.Initializer) {
    const defaultInitialization = {
      name: 'scalegroup',
      type: 'string',
      options: {
        description: {
          type: 'string',
          value:
            '如果存在多个应根据某些度量标准（请参阅 `scalemode`）调整大小的小提琴图，则在此处提供一个非空的组 ID，以便将同一组中的每个轨迹链接起来。如果小提琴图的 `width` 未定义，则 `scalegroup` 将默认为轨迹的名称。在这种情况下，具有相同名称的小提琴图将被链接在一起。'
        }
      }
    }

    super(merge(defaultInitialization, initialization))
  }
}

export class ViolinScalemode extends Attribute {
  constructor(initialization: Attribute.Initializer) {
    const defaultInitialization = {
      name: 'scalemode',
      type: { type: 'enum', value: ['count', 'width'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置用于确定同一“scalegroup”分组内的每个小提琴宽度的度量标准。“width”表示每把小提琴具有相同的（最大）宽度，“count”表示小提琴的大小根据构成每把小提琴的样本点数量进行缩放。'
        },
        controller: new AttributeController({ type: 'select', default: 'width', options: ['count', 'width'] })
      }
    }

    super(merge(defaultInitialization, initialization))
  }
}

export class ViolinSpanmode extends Attribute {
  constructor(initialization: Attribute.Initializer) {
    const defaultInitialization = {
      name: 'spanmode',
      type: { type: 'enum', value: ['hard', 'soft', 'manual'] },
      options: {
        description: {
          type: 'markdown',
          value: `
设置用于计算密度函数的数据空间中的跨度的方法。
+ \`soft\`表示跨度范围是从样本的最小值减去两个带宽到样本的最大值加上两个带宽。
+ \`hard\`表示跨度范围是从样本的最小值到其最大值。
+ 对于自定义跨度设置，请使用\`manual\`模式并填写\`span\`属性。
          `
        },
        controller: new AttributeController({ type: 'select', default: 'soft', options: ['hard', 'soft', 'manual'] })
      }
    }

    super(merge(defaultInitialization, initialization))
  }
}

export class ViolinSpan extends Attribute {
  constructor(initialization: Attribute.Initializer) {
    const defaultInitialization = {
      name: 'span',
      type: '[]',
      options: {
        description: {
          type: 'string',
          value: '设置用于计算密度函数的数据空间的跨度范围。只有在“spanmode = manual”时才有效。'
        }
      }
    }

    super(merge(defaultInitialization, initialization))
  }
}
