import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { merge } from 'lodash'
import TraceMarkerColoBar from './trace.marker.colorbar'
import TraceMarkerGradient from './trace.marker.gradient'
import TraceMarkerLine from './trace.marker.line'

const markerSymbol = [
  'circle',
  'circle-open',
  'circle-dot',
  'circle-open-dot',
  'square',
  'square-open',
  'square-dot',
  'square-open-dot',
  'diamond',
  'diamond-open',
  'diamond-dot',
  'diamond-open-dot',
  'cross',
  'cross-open',
  'cross-dot',
  'cross-open-dot',
  'x',
  'x-open',
  'x-dot',
  'x-open-dot',
  'triangle-up',
  'triangle-up-open',
  'triangle-up-dot',
  'triangle-up-open-dot',
  'triangle-down',
  'triangle-down-open',
  'triangle-down-dot',
  'triangle-down-open-dot',
  'triangle-left',
  'triangle-left-open',
  'triangle-left-dot',
  'triangle-left-open-dot',
  'triangle-right',
  'triangle-right-open',
  'triangle-right-dot',
  'triangle-right-open-dot',
  'triangle-ne',
  'triangle-ne-open',
  'triangle-ne-dot',
  'triangle-ne-open-dot',
  'triangle-se',
  'triangle-se-open',
  'triangle-se-dot',
  'triangle-se-open-dot',
  'triangle-sw',
  'triangle-sw-open',
  'triangle-sw-dot',
  'triangle-sw-open-dot',
  'triangle-nw',
  'triangle-nw-open',
  'triangle-nw-dot',
  'triangle-nw-open-dot',
  'pentagon',
  'pentagon-open',
  'pentagon-dot',
  'pentagon-open-dot',
  'hexagon',
  'hexagon-open',
  'hexagon-dot',
  'hexagon-open-dot',
  'hexagon2',
  'hexagon2-open',
  'hexagon2-dot',
  'hexagon2-open-dot',
  'octagon',
  'octagon-open',
  'octagon-dot',
  'octagon-open-dot',
  'star',
  'star-open',
  'star-dot',
  'star-open-dot',
  'hexagram',
  'hexagram-open',
  'hexagram-dot',
  'hexagram-open-dot',
  'star-triangle-up',
  'star-triangle-up-open',
  'star-triangle-up-dot',
  'star-triangle-up-open-dot',
  'star-triangle-down',
  'star-triangle-down-open',
  'star-triangle-down-dot',
  'star-triangle-down-open-dot',
  'star-square',
  'star-square-open',
  'star-square-dot',
  'star-square-open-dot',
  'star-diamond',
  'star-diamond-open',
  'star-diamond-dot',
  'star-diamond-open-dot',
  'diamond-tall',
  'diamond-tall-open',
  'diamond-tall-dot',
  'diamond-tall-open-dot',
  'diamond-wide',
  'diamond-wide-open',
  'diamond-wide-dot',
  'diamond-wide-open-dot',
  'hourglass',
  'hourglass-open',
  'bowtie',
  'bowtie-open',
  'circle-cross',
  'circle-cross-open',
  'circle-x',
  'circle-x-open',
  'square-cross',
  'square-cross-open',
  'square-x',
  'square-x-open',
  'diamond-cross',
  'diamond-cross-open',
  'diamond-x',
  'diamond-x-open',
  'cross-thin',
  'cross-thin-open',
  'x-thin',
  'x-thin-open',
  'asterisk',
  'asterisk-open',
  'hash',
  'hash-open',
  'hash-dot',
  'hash-open-dot',
  'y-up',
  'y-up-open',
  'y-down',
  'y-down-open',
  'y-left',
  'y-left-open',
  'y-right',
  'y-right-open',
  'line-ew',
  'line-ew-open',
  'line-ns',
  'line-ns-open',
  'line-ne',
  'line-ne-open',
  'line-nw',
  'line-nw-open',
  'arrow-up',
  'arrow-up-open',
  'arrow-down',
  'arrow-down-open',
  'arrow-left',
  'arrow-left-open',
  'arrow-right',
  'arrow-right-open',
  'arrow-bar-up',
  'arrow-bar-up-open',
  'arrow-bar-down',
  'arrow-bar-down-open',
  'arrow-bar-left',
  'arrow-bar-left-open',
  'arrow-bar-right',
  'arrow-bar-right-open',
  'arrow',
  'arrow-open',
  'arrow-wide',
  'arrow-wide-open'
]

export default class TraceMarker extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('marker', 'Marker', {
      parent,
      description: description || { type: 'string', value: '数据点样式设置。' },
      initialConfig
    })

    this.addChild(
      new Attribute(
        'symbol',
        { type: 'enum', value: markerSymbol },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '数据点形状。详见：<a href="https://plotly.com/javascript/reference/scatter/#scatter-marker-symbol" target="_blank">scatter-marker-symbol</a>'
          },
          controller: new AttributeController({ type: 'select', default: 'circle', options: markerSymbol })
        }
      )
    )

    this.addChild(
      new Attribute('angle', 'number', {
        parent: this,
        description: { type: 'string', value: '设置数据点的旋转角度。' },
        controller: new AttributeController({ type: 'number', default: 0, min: -360, max: 360 })
      })
    )

    this.addChild(
      new Attribute(
        'angleref',
        { type: 'enum', value: ['previous', 'up'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置数据点旋转角度的参考系。值域：' +
              '<ul>' +
              '<li><code>up</code> - 默认值。相对于正上方旋转。</li>' +
              '<li><code>previous</code> - 相对于上一点朝向旋转。</li>' +
              '</ul>'
          },
          controller: new AttributeController({ type: 'select', default: 'up', options: ['previous', 'up'] })
        }
      )
    )

    this.addChild(
      new Attribute('size', 'number | number[]', {
        parent: this,
        description: {
          type: 'string',
          value: '数据点大小。可以是数组，数组长度为数据点数量，用于指定每个数据点的大小。'
        },
        controller: new AttributeController({ type: 'number', default: 6, min: 0 })
      })
    )

    this.addChild(
      new Attribute('sizemin', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '数据点最小大小。只有<code>marker.size</code>的值是数组时，此属性才有效。'
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 }),
        initialConfig: initialConfig
      })
    )

    this.addChild(
      new Attribute('sizemode', 'enum', {
        parent: this,
        description: {
          type: 'string',
          value: '数据点大小模式。'
        },
        controller: new AttributeController({ type: 'select', default: 'diameter', options: ['diameter', 'area'] }),
        initialConfig: initialConfig
      })
    )

    this.addChild(
      new Attribute('sizeref', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '用于设置用于确定数据点渲染大小的比例因子。'
        },
        controller: new AttributeController({ type: 'number', default: 1, min: 0 }),
        initialConfig: initialConfig
      })
    )

    this.addChild(
      new Attribute('color', 'Color | Color[] | number[]', {
        parent: this,
        description: {
          type: 'string',
          value: '数据点颜色。可以是数组，数组长度为数据点数量，用于指定每个数据点的颜色。'
        },
        controller: new AttributeController({ type: 'color', default: null })
      })
    )

    this.addChild(
      new Attribute('cauto', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value:
            '确定数据点颜域是根据<code>marker.color</code>计算得出的，' +
            '还是根据在 <code>marker.cmin</code> 和 <code>marker.cmax</code> 中设定的范围计算得出的。' +
            '只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。' +
            '当用户通过 <code>marker.cmin</code> 和 <code>marker.cmax</code> 进行设置时，默认值为 <code>false</code> 。'
        },
        controller: new AttributeController({ type: 'boolean', default: true }),
        initialConfig: merge({ data: [{ marker: { cmin: 15, cmax: 20 } }] }, initialConfig)
      })
    )

    this.addChild(
      new Attribute('cmin', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '数据点颜色最小值。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。需要与 <code>marker.cmax</code> 一起使用。'
        }
      })
    )

    this.addChild(
      new Attribute('cmax', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '数据点颜色最大值。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。需要与 <code>marker.cmin</code> 一起使用。'
        }
      })
    )

    this.addChild(
      new Attribute('cmid', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '数据点颜色中间值。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。'
        }
      })
    )

    this.addChild(
      new Attribute('autocolorscale', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value:
            '是否采用默认颜色标尺。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。' +
            '值域：' +
            '<ul>' +
            '<li><code>true</code> - 启用默认颜色标尺</li>' +
            '<li><code>false</code> - 使用<code>marker.colorscale</code>定义的颜色标尺</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'boolean', default: true }),
        initialConfig: merge({ data: [{ marker: { colorscale: 'Hot' } }] }, initialConfig)
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
        initialConfig: initialConfig
      })
    )

    this.addChild(
      new Attribute('reversescale', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value: '颜色标尺反转。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。'
        },
        controller: new AttributeController({ type: 'boolean', default: false }),
        initialConfig: initialConfig
      })
    )

    this.addChild(
      new Attribute('showscale', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value:
            '是否显示颜色标尺。默认不显示，因为颜色卡尺需要在颜色条中显示，所以如果设置了<code>marker.colorbar</code>属性，则颜色标尺将自动显示。'
        },
        controller: new AttributeController({ type: 'boolean', default: false }),
        initialConfig: initialConfig
      })
    )

    this.addChild(
      new Attribute('opacity', 'number', {
        parent: this,
        description: { type: 'string', value: '数据点透明度。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1, step: 0.1 })
      })
    )

    this.addChild(
      new Attribute('maxdisplayed', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '设置图表中可以显示的最大数据点数。' + '如果设置为 <code>0</code>，则将所有数据点显示为散点图。'
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      })
    )

    this.addChild(new TraceMarkerColoBar(this, undefined, initialConfig))

    this.addChild(new TraceMarkerGradient(this))

    this.addChild(new TraceMarkerLine(this, undefined, initialConfig))
  }
}
