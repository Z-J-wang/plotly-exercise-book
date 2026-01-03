import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import TraceColorscale from './trace.colorscale'
import { merge } from 'lodash'

export default class TraceMarkerLine extends Attribute {
  constructor(
    parent: Attribute,
    description?: Attribute.Description,
    omitChildren: string[] = [],
    initialConfig?: PlotlyConfig
  ) {
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

    !omitChildren.includes('width') &&
      this.addChild(
        new Attribute('width', 'number | number[]', {
          parent: this,
          description: { type: 'string', value: '设置数据点的边框宽度。' },
          controller: new AttributeController({ type: 'number', default: null, min: 0 })
        })
      )

    !omitChildren.includes('cauto') &&
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

    !omitChildren.includes('cmin') &&
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

    !omitChildren.includes('cmax') &&
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

    !omitChildren.includes('cmid') &&
      this.addChild(
        new Attribute('cmid', 'number', {
          parent: this,
          description: {
            type: 'string',
            value: '数据点边框颜色中间值。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。'
          }
        })
      )

    !omitChildren.includes('autocolorscale') &&
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

    new TraceColorscale(this, [...omitChildren, 'autocolorscale', 'showscale'], initialConfigOfMarkerColor)

    !omitChildren.includes('coloraxis') &&
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
