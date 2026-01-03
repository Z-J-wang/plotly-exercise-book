import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'
import TraceMarkerColoBar from '../trace.colorbar'
import TraceMarkerGradient from '../trace.marker.gradient'
import TraceMarkerLine from '../trace.marker.line'
import TraceColorscale from '../trace.colorscale'

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

export default class BoxMarker extends Attribute {
  constructor(
    parent: Attribute,
    description?: Attribute.Description,
    omitChildren: string[] = [],
    initialConfig?: PlotlyConfig
  ) {
    super('marker', 'Marker', {
      parent,
      description: description || { type: 'string', value: '数据点样式设置。' },
      initialConfig
    })

    !omitChildren.includes('symbol') &&
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

    !omitChildren.includes('size') &&
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

    !omitChildren.includes('color') &&
      this.addChild(
        new Attribute('outliercolor', 'Color | Color[] | number[]', {
          parent: this,
          description: {
            type: 'string',
            value: '设置异常样本数据点的颜色。'
          },
          controller: new AttributeController({ type: 'color', default: null })
        })
      )

    !omitChildren.includes('color') &&
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

    !omitChildren.includes('opacity') &&
      this.addChild(
        new Attribute('opacity', 'number', {
          parent: this,
          description: { type: 'string', value: '数据点透明度。' },
          controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1, step: 0.1 })
        })
      )

    !omitChildren.includes('line') && this.addChild(new BoxMarkerLine(this))
  }
}

export class BoxMarkerLine extends Attribute {
  constructor(
    parent: Attribute,
    description?: Attribute.Description,
    omitChildren: string[] = [],
    initialConfig?: PlotlyConfig
  ) {
    super('line', 'BoxMarkerLine', {
      parent,
      description: description || { type: 'string', value: '设置数据点的边框样式。' },
      initialConfig
    })

    !omitChildren.includes('width') && this.addChild(new BoxMarkerLineWidth(this))
    !omitChildren.includes('color') && this.addChild(new BoxMarkerLineColor(this))
    !omitChildren.includes('outlierwidth') && this.addChild(new BoxMarkerLineOutlierWidth(this))
    !omitChildren.includes('outliercolor') && this.addChild(new BoxMarkerLineOutlierColor(this))
  }
}

export class BoxMarkerLineWidth extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('width', 'number | number[]', {
      parent,
      description: description || { type: 'string', value: '设置数据点的边框宽度。' },
      controller: new AttributeController({ type: 'number', default: null, min: 0 }),
      initialConfig
    })
  }
}

export class BoxMarkerLineColor extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('color', 'Color | Color[] | number[]', {
      parent,
      description: description || { type: 'string', value: '设置数据点的边框颜色。' },
      controller: new AttributeController({ type: 'color', default: null }),
      initialConfig
    })
  }
}

export class BoxMarkerLineOutlierWidth extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('outlierwidth', 'number | number[]', {
      parent,
      description: description || { type: 'string', value: '设置数据点的边框宽度。' },
      controller: new AttributeController({ type: 'number', default: null, min: 0 }),
      initialConfig
    })
  }
}

export class BoxMarkerLineOutlierColor extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('outliercolor', 'Color | Color[] | number[]', {
      parent,
      description: description || { type: 'string', value: '设置数据点的边框颜色。' },
      controller: new AttributeController({ type: 'color', default: null }),
      initialConfig
    })
  }
}
