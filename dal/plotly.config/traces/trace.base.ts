import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { Font } from '../base'
import { defineAsyncComponent } from 'vue'
import { merge } from 'lodash'

export class TraceType extends Attribute {
  constructor(initializer: Attribute.Initializer, value: string = '') {
    const defaultInitializer = {
      name: 'type',
      type: 'string',
      options: {
        description: { type: 'string', value: '设置轨迹类型。其值必须为<code>' + value + '</code>。' },
        controller: new AttributeController({ type: 'string', default: value, disabled: true })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceName extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'name',
      type: 'string',
      options: {
        description: {
          type: 'string',
          value: '设置轨迹名称。轨迹名称将作为图例名称显示，并且在鼠标悬停在轨迹上时显示。'
        },
        controller: new AttributeController({ type: 'string', default: null })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceVisible extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'visible',
      type: { type: 'enum', value: [true, false, 'legendonly'] },
      options: {
        description: { type: 'string', value: '设置轨迹是否可见。其中<code>legendonly</code>表示仅显示图例。' },
        controller: new AttributeController({
          type: 'select',
          default: 'true',
          options: [true, false, 'legendonly']
        })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

/**
 * 轨迹图例相关属性
 */
export class TraceLegendAbout {
  constructor(parent: Attribute, omitChildren: string[] = []) {
    !omitChildren.includes('showlegend') &&
      parent.addChild(
        new Attribute('showlegend', 'boolean', {
          parent,
          description: {
            type: 'string',
            value:
              '是否显示轨迹图例。<br />' +
              '默认情况下，满足以下任意条件则会显示图例：<br />' +
              '1. 默认情况下，两个或多个图表。<br />' +
              '2. 渲染一个饼状图。<br />' +
              '3. 明确通过<code>showlegend:true</code>声明。'
          },
          controller: new AttributeController({ type: 'boolean', default: null })
        })
      )

    !omitChildren.includes('legendrank') &&
      parent.addChild(
        new Attribute('legendrank', 'number', {
          parent,
          description: { type: 'string', value: '图例的级别（权重），默认 <code>1000</code>，数字越小越靠前。' },
          controller: new AttributeController({ type: 'number', default: 1000 })
        })
      )

    !omitChildren.includes('legendgroup') &&
      parent.addChild(
        new Attribute('legendgroup', 'string', {
          parent,
          description: {
            type: 'string',
            value:
              '设置图例组名称。<br /> ' +
              '用于图例分组。同一个组别的图例会集合到一起。切换图例项时，同一图例组的轨迹和形状部分同时隐藏/显示。' +
              '默认值为 <code>""</code>，表示默认组别。即默认情况下，所有轨迹都显示在同一个组别中。'
          },
          controller: new AttributeController({ type: 'string', default: '' })
        })
      )

    const legendgrouptitle = new Attribute('legendgrouptitle', 'LayoutLegendGroupTitle', {
      parent,
      description: { type: 'string', value: '图例组标题' }
    })

    legendgrouptitle.addChild(
      new Font('font', 'Font', {
        parent: legendgrouptitle,
        description: { type: 'string', value: '图例组的标题字体设置' }
      })
    )

    legendgrouptitle.addChild(
      new Attribute('text', 'string', {
        parent: legendgrouptitle,
        description: { type: 'string', value: '图例组的标题文案' },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )

    !omitChildren.includes('legendgrouptitle') && parent.addChild(legendgrouptitle)

    !omitChildren.includes('legendwidth') &&
      parent.addChild(
        new Attribute('legendwidth', 'number', {
          parent,
          description: { type: 'string', value: '图例的宽度。' },
          controller: new AttributeController({ type: 'number', default: null, min: 0 })
        })
      )
  }
}

export class TraceOpacity extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'opacity',
      type: 'number',
      options: {
        description: { type: 'string', value: '设置轨迹的不透明度。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1, step: 0.1 })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceIds extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ids',
      type: 'string',
      options: {
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/traces/BaseIds.vue'))
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceZorder extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'zorder',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '设置轨迹在图层中的权重。权重高得会覆盖在权重低得轨迹上。如果权重一致，则按照添加的顺序进行覆盖。'
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceMeta extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'meta',
      type: 'string | number | string[] | number[]',
      options: {
        description: {
          type: 'string',
          value:
            '设置轨迹的元数据。元数据用于存储轨迹或者数据点的额外信息。元信息可用于各自文本属性中。' +
            '如：<code>texttemplate</code>、<code>hovertemplate</code>等等。<br />' +
            '使用方法如下：<code>%{meta[i]}</code>'
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceCustomdata extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'customdata',
      type: 'string | number | string[] | number[]',
      options: {
        description: {
          type: 'string',
          value: '为每个数据点附加额外的数据。这些数据不会用于绘制轨迹，但可以在悬停、点击以及选择事件中使用这些数据。'
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceXaxis extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'xaxis',
      type: 'string',
      options: {
        description: {
          type: 'string',
          value:
            '设置轨迹 X 轴的轴配置。轴配置在 <code>layout</code> 中定义。默认<code>x</code>。' +
            '<code>x</code> 对应 <code>layout.xaxis</code>；<code>x2</code> 对应 <code>layout.xaxis2</code> ，以此类推。'
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceYaxis extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'yaxis',
      type: 'string',
      options: {
        description: {
          type: 'string',
          value:
            '设置轨迹 Y 轴的轴配置。轴配置在 <code>layout</code> 中定义。默认<code>y</code>。' +
            '<code>y</code> 对应 <code>layout.yaxis</code>；<code>y2</code> 对应 <code>layout.yaxis2</code> ，以此类推。'
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceSelectedPoints extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'selectedpoints',
      type: 'Array',
      options: {
        description: { type: 'string', value: '设置选中的数据点。建议使用数据点下标。仅对支持选择功能的轨迹有效。' }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceCliponaxis extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cliponaxis',
      type: 'boolean',
      options: {
        description: {
          type: 'string',
          value:
            '设置轨迹元素是否在坐标轴上进行裁剪。' +
            '如果设置为 <code>true</code>，则轨迹元素将只显示在坐标轴的绘图区域。' +
            '如果设置为 <code>false</code>，则轨迹元素将显示在坐标轴的绘图区域之外。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceConnectgaps extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'connectgaps',
      type: 'boolean',
      options: {
        description: {
          type: 'string',
          value:
            '设置轨迹是否连接缺失数据点。' +
            '如果设置为 <code>true</code>，则缺失数据点将用线段连接。即，如果x或者y轴数据有缺失值，则将缺失值设置前后数值的平均值。' +
            '如果设置为 <code>false</code>，则缺失数据点将不连接。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceHoveron extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'hoveron',
      type: { type: 'enum', value: ['points', 'fills', 'points+fills'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置鼠标悬浮触发位置。' +
            '如果设置为 <code>points</code>，则鼠标悬浮到点上时，显示数据点信息。' +
            '如果设置为 <code>fills</code>，则鼠标悬浮到填充区域上时，显示区域信息。'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'points+fills',
          options: ['points', 'fills', 'points+fills']
        })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceOrientation extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'orientation',
      type: { type: 'enum', value: ['v', 'h'] },
      options: {
        description: {
          type: 'string',
          value: '设置轨迹的显示方向。默认为 <code>v</code>。'
        },
        controller: new AttributeController({ type: 'select', default: 'v', options: ['v', 'h'] })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceTextAngle extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'textangle',
      type: "number | 'auto'",
      options: {
        description: {
          type: 'string',
          value: '设置文本的角度。' + '如果设置为 <code>auto</code>，则文本将自动旋转以适应文本内容。'
        },
        controller: new AttributeController({ type: 'number', default: 'auto', value: 0, step: 5 })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceAutoMargin extends Attribute {
  constructor(parent: Attribute) {
    super('automargin', 'boolean', {
      parent,
      description: {
        type: 'string',
        value:
          '设置自动调整外边距。' +
          '如果设置为 <code>true</code>，则外边距将自动调整以适应文本内容。' +
          '如果设置为 <code>false</code>，则外边距将保持不变。'
      }
    })
  }
}
