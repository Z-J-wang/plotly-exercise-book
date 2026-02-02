import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { Font } from '../base'
import { merge } from 'lodash'

/**
 * 轨迹图例相关属性
 */
export default class TraceLegendAbout {
  constructor(parent: Attribute, omitChildren: string[] = []) {
    !omitChildren.includes('showlegend') && parent.addChild(new TraceShowlegend({ options: { parent } }))
    !omitChildren.includes('legendrank') && parent.addChild(new TraceLegendrank({ options: { parent } }))
    !omitChildren.includes('legendgroup') && parent.addChild(new TraceLegendgroup({ options: { parent } }))
    !omitChildren.includes('legendgrouptitle') && parent.addChild(new TraceLegendgrouptitle({ options: { parent } }))
    !omitChildren.includes('legendwidth') && parent.addChild(new TraceLegendwidth({ options: { parent } }))
  }
}

export class TraceShowlegend extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'showlegend',
      type: 'boolean',
      options: {
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
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceLegendrank extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'legendrank',
      type: 'number',
      options: {
        description: { type: 'string', value: '图例的级别（权重），默认 <code>1000</code>，数字越小越靠前。' },
        controller: new AttributeController({ type: 'number', default: 1000 })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceLegendgroup extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'legendgroup',
      type: 'string',
      options: {
        description: {
          type: 'string',
          value:
            '设置图例组名称。<br /> ' +
            '用于图例分组。同一个组别的图例会集合到一起。切换图例项时，同一图例组的轨迹和形状部分同时隐藏/显示。' +
            '默认值为 <code>""</code>，表示默认组别。即默认情况下，所有轨迹都显示在同一个组别中。'
        },
        controller: new AttributeController({ type: 'string', default: '' })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceLegendgrouptitle extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'legendgrouptitle',
      type: 'LayoutLegendGroupTitle',
      options: {
        description: { type: 'string', value: '图例组标题' }
      }
    }

    super(merge(defaultInitializer, initializer))

    this.addChild(
      new Font('font', 'Font', {
        parent: this,
        description: { type: 'string', value: '图例组的标题字体设置' }
      })
    )

    this.addChild(
      new Attribute('text', 'string', {
        parent: this,
        description: { type: 'string', value: '图例组的标题文案' },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )
  }
}

export class TraceLegendwidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'legendwidth',
      type: 'number',
      options: {
        description: { type: 'string', value: '图例的宽度。' },
        controller: new AttributeController({ type: 'number', default: null, min: 0 })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}
