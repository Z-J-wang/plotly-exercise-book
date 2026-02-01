import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

export default class TraceColorscaleAbout {
  constructor(parent: Attribute, initialConfig?: PlotlyConfig) {
    parent.addChild(new TraceAutocolorscale({ options: { parent, initialConfig } }))
    parent.addChild(new TraceColorscale({ options: { parent, initialConfig } }))
    parent.addChild(new TraceReversescale({ options: { parent, initialConfig } }))
    parent.addChild(new TraceShowscale({ options: { parent, initialConfig } }))
  }
}

export class TraceAutocolorscale extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'autocolorscale',
      type: 'Boolean',
      options: {
        description: {
          type: 'string',
          value:
            '是否采用默认颜色标尺。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。' +
            '值域：' +
            '<ul>' +
            '<li><code>true</code> - 启用默认颜色标尺</li>' +
            '<li><code>false</code> - 使用<code>colorscale</code>定义的颜色标尺</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorscale extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const colorscaleName = [
      'Blackbody',
      'Bluered',
      'Blues',
      'Cividis',
      'Earth',
      'Electric',
      'Greens',
      'Greys',
      'Hot',
      'Jet',
      'Picnic',
      'Portland',
      'Rainbow',
      'RdBu',
      'Reds',
      'Viridis',
      'YlGnBu',
      'YlOrRd'
    ]
    const defaultInitializer = {
      name: 'colorscale',
      type: 'string | string[] | Array<[number, string]>',
      options: {
        description: {
          type: 'string',
          value:
            '设置颜色标尺。值域说明：' +
            '<ul>' +
            "<li>可以是一个包含数组的数组，其中每个数组将一个标准化值映射到一个 rgb、rgba、十六进制、hsl、hsv 或命名颜色字符串。至少需要为最低值（0）和最高值（1）提供一个映射。例如，<code>[[0, 'rgb(0，0，255)']， [1， 'rgb(255，0，0)']]</code>。</li>" +
            '<li>也可以是以下列表中颜色颜色标尺的名称字符串：' +
            colorscaleName.map((item) => `<code>${item}</code>`).join('、') +
            '。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'select', default: null, options: colorscaleName })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceReversescale extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'reversescale',
      type: 'Boolean',
      options: {
        description: {
          type: 'string',
          value: '颜色标尺反转。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceShowscale extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'showscale',
      type: 'Boolean',
      options: {
        description: {
          type: 'string',
          value:
            '是否显示颜色标尺。默认不显示，因为颜色卡尺需要在颜色条中显示，所以如果设置了<code>marker.colorbar</code>属性，则颜色标尺将自动显示。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
