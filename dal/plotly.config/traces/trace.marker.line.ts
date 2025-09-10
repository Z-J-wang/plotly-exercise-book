import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { merge } from 'lodash'

export default class TraceMarkerLine extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('line', 'BaseMarkerLine', {
      parent,
      description: description || { type: 'string', value: '设置数据点的边框样式。' },
      initialConfig: merge({ data: [{ marker: { size: 20 } }] }, initialConfig)
    })

    const initialConfigOfMarkerColor = merge(
      {
        data: [{ marker: { size: 20, line: { width: 5, color: [10, 12, 14, 16] } } }]
      },
      initialConfig
    )

    this.addChild(
      new Attribute('width', 'number | number[]', {
        parent: this,
        description: { type: 'string', value: '设置数据点的边框宽度。' },
        controller: new AttributeController({ type: 'number', default: null, min: 0 })
      })
    )

    this.addChild(
      new Attribute('cauto', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value:
            '确定数据点边框颜域是根据<code>marker.line.color</code>计算得出的，' +
            '还是根据在 <code>marker.line.cmin</code> 和 <code>marker.line.cmax</code> 中设定的范围计算得出的。' +
            '只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。' +
            '当用户通过 <code>marker.line.cmin</code> 和 <code>marker.line.cmax</code> 进行设置时，默认值为 <code>false</code> 。'
        },
        controller: new AttributeController({ type: 'boolean', default: null }),
        initialConfig: merge(
          {
            data: [{ marker: { line: { cmin: 15, cmax: 20 } } }]
          },
          initialConfigOfMarkerColor
        )
      })
    )

    this.addChild(
      new Attribute('cmin', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '数据点边框颜色最小值。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。需要与 <code>marker.line.cmax</code> 一起使用。'
        }
      })
    )

    this.addChild(
      new Attribute('cmax', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '数据点边框颜色最大值。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。需要与 <code>marker.line.cmin</code> 一起使用。'
        }
      })
    )

    this.addChild(
      new Attribute('cmid', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '数据点边框颜色中间值。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。'
        }
      })
    )

    this.addChild(
      new Attribute('autocolorscale', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value:
            '是否采用默认颜色标尺。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。' +
            '值域：' +
            '<ul>' +
            '<li><code>true</code> - 启用默认颜色标尺</li>' +
            '<li><code>false</code> - 使用<code>marker.line.colorscale</code>定义的颜色标尺</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'boolean', default: true }),
        initialConfig: merge({ data: [{ marker: { line: { colorscale: 'Hot' } } }] }, initialConfigOfMarkerColor)
      })
    )

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

    this.addChild(
      new Attribute('colorscale', 'string | string[] | Array<[number, string]>', {
        parent: this,
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
        controller: new AttributeController({
          type: 'select',
          default: null,
          options: colorscaleName
        }),
        initialConfig: initialConfigOfMarkerColor
      })
    )

    this.addChild(
      new Attribute('reversescale', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value: '颜色标尺反转。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。'
        },
        controller: new AttributeController({ type: 'boolean', default: false }),
        initialConfig: initialConfigOfMarkerColor
      })
    )

    this.addChild(
      new Attribute('coloraxis', 'string', {
        parent: this,
        description: {
          type: 'string',
          value:
            '指定要使用的颜色轴配置。关于颜色轴的配置，详见 <a href="#layout.coloraxis"><code>layout.coloraxis</code></a>。'
        }
      })
    )
  }
}
