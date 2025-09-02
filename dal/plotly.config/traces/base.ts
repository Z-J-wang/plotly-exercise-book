import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { Font } from '../base'
import { defineAsyncComponent } from 'vue'

export class TraceName extends Attribute {
  constructor(parent: Attribute, controller?: AttributeController) {
    super('name', 'string', {
      parent,
      description: {
        type: 'string',
        value: '设置轨迹名称。轨迹名称将作为图例名称显示，并且在鼠标悬停在轨迹上时显示。'
      },
      controller: controller || new AttributeController({ type: 'string', default: null })
    })
  }
}

export class TraceVisible extends Attribute {
  constructor(parent: Attribute) {
    super(
      'visible',
      { type: 'enum', value: ['true', 'false', 'legendonly'] },
      {
        parent,
        description: { type: 'string', value: '设置轨迹是否可见。其中<code>legendonly</code>表示仅显示图例。' },
        controller: new AttributeController({
          type: 'select',
          default: 'true',
          options: ['true', 'false', 'legendonly']
        })
      }
    )
  }
}

/**
 * 轨迹图例相关属性
 */
export class TraceLegendAbout {
  constructor(parent: Attribute) {
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
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    parent.addChild(
      new Attribute('legendrank', 'number', {
        parent,
        description: { type: 'string', value: '图例的级别（权重），默认 <code>1000</code>，数字越小越靠前。' },
        controller: new AttributeController({ type: 'number', default: 1000 })
      })
    )

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

    parent.addChild(legendgrouptitle)

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
  constructor(parent: Attribute) {
    super('opacity', 'number', {
      parent,
      description: { type: 'string', value: '设置轨迹的不透明度。' },
      controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1, step: 0.1 })
    })
  }
}

export class TraceIds extends Attribute {
  constructor(parent: Attribute) {
    super('ids', 'string', {
      parent,
      description: {
        type: 'Component',
        value: defineAsyncComponent(() => import('@/components/doc/traces/BaseIds.vue'))
      }
    })
  }
}

export class TraceZorder extends Attribute {
  constructor(parent: Attribute) {
    super('zorder', 'number', {
      parent,
      description: {
        type: 'string',
        value: '设置轨迹在图层中的权重。权重高得会覆盖在权重低得轨迹上。如果权重一致，则按照添加的顺序进行覆盖。'
      }
    })
  }
}

export class TraceMeta extends Attribute {
  constructor(parent: Attribute) {
    super('meta', 'string | number | string[] | number[]', {
      parent,
      description: {
        type: 'string',
        value:
          '设置轨迹的元数据。元数据用于存储轨迹或者数据点的额外信息。元信息可用于各自文本属性中。' +
          '如：<code>texttemplate</code>、<code>hovertemplate</code>等等。<br />' +
          '使用方法如下：<code>%{meta[i]}</code>'
      }
    })
  }
}

export class TraceCustomdata extends Attribute {
  constructor(parent: Attribute) {
    super('customdata', 'string | number | string[] | number[]', {
      parent,
      description: {
        type: 'string',
        value: '为每个数据点附加额外的数据。这些数据不会用于绘制轨迹，但可以在悬停、点击以及选择事件中使用这些数据。'
      }
    })
  }
}

export class TraceXaxis extends Attribute {
  constructor(parent: Attribute) {
    super('xaxis', 'string', {
      parent,
      description: {
        type: 'string',
        value:
          '设置轨迹 X 轴的轴配置。轴配置在 <code>layout</code> 中定义。默认<code>x</code>。' +
          '<code>x</code> 对应 <code>layout.xaxis</code>；<code>x2</code> 对应 <code>layout.xaxis2</code> ，以此类推。'
      }
    })
  }
}

export class TraceYaxis extends Attribute {
  constructor(parent: Attribute) {
    super('yaxis', 'string', {
      parent,
      description: {
        type: 'string',
        value:
          '设置轨迹 Y 轴的轴配置。轴配置在 <code>layout</code> 中定义。默认<code>y</code>。' +
          '<code>y</code> 对应 <code>layout.yaxis</code>；<code>y2</code> 对应 <code>layout.yaxis2</code> ，以此类推。'
      }
    })
  }
}
