import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'

const initialConfig: PlotlyConfig = {
  data: [
    {
      x: [1, 2, 3, 4],
      y: [10, 15, null, 17],
      mode: 'lines+markers',
      stackgroup: 'group1',
      type: 'scatter',
      name: 'scatter trace'
    },
    {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines+markers',
      stackgroup: 'group1',
      type: 'scatter',
      name: 'scatter trace'
    }
  ]
}

export default class TraceStack {
  constructor(parent: Attribute) {
    parent.addChild(
      new Attribute('stackgroup', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            '设置堆叠分组。<br />' +
            '将多个散点轨迹（位于同一子图中）设置为相同的堆叠组，以便将其 y 值（如果<code>orientation = "h"</code>则为 x 值）相加。' +
            '如果此项为空或省略，则轨迹将不会被堆叠。默认情况下，堆叠模式为<code>fill</code>，如果<code>orientation</code>为<code>h</code>或<code>v</code>，' +
            '则使用<code>tonexty</code>或<code>tonextx</code>，并将默认<code>mode</code>设置为<code>lines</code>。<br />' +
            '注意：' +
            '<ul>' +
            '<li>堆叠仅适用于数值（线性或对数）轴。</li>' +
            '<li>同一堆叠组中的轨迹仅会填充或被填充到同组中的其他轨迹中。</li>' +
            '<li>存在多个堆叠分组或部分轨迹堆叠而部分未堆叠的情况下，若填充关联的轨迹未连续排列，后续轨迹将在绘制顺序中被下移。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'string', default: null, value: 'group1', disabled: true }),
        initialConfig: initialConfig
      })
    )

    parent.addChild(
      new Attribute(
        'groupnorm',
        { type: 'enum', value: ['', 'fraction', 'percent'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '设置堆叠分组各项占比的计算方式。' +
              '可选值：' +
              '<ul>' +
              "<li><code>''</code> - 默认值。每个条形图在每个位置上的值直接相加堆叠。</li>" +
              '<li><code>fraction</code> - 每个条形图在每个位置上的值会除以该位置上所有条形图值的总和。</li>' +
              '<li><code>percent</code> - 每个条形图在每个位置上的值会除以该位置上所有条形图值的总和，并乘以100。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: "''",
            options: ['', 'fraction', 'percent']
          }),
          initialConfig: initialConfig
        }
      )
    )

    parent.addChild(
      new Attribute(
        'orientation',
        { type: 'enum', value: ['v', 'h'] },
        {
          parent,
          description: {
            type: 'string',
            value: '设置轨迹的显示方向。默认为 <code>v</code>。'
          },
          controller: new AttributeController({ type: 'select', default: 'v', options: ['v', 'h'] }),
          initialConfig: initialConfig
        }
      )
    )

    parent.addChild(
      new Attribute(
        'stackgaps',
        { type: 'enum', value: ['infer zero', 'interpolate'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '设置堆叠组中缺失值如何处理。' +
              '可选值：' +
              '<ul>' +
              '<li><code>infer zero</code> - 默认值。将缺失值填充为零。</li>' +
              '<li><code>interpolate</code> - 将缺失值填充为插值。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'infer zero',
            options: ['infer zero', 'interpolate']
          }),
          initialConfig: initialConfig
        }
      )
    )
  }
}
