import { BaseColor } from 'dal/plotly.config/base'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

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
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'marker',
      type: 'Marker',
      options: { description: { type: 'string', value: '数据点样式设置。' } }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new BoxMarkerSymbol({ options: { parent: this } }))
    this.addChild(new BoxMarkerSize({ options: { parent: this } }))
    this.addChild(new BoxMarkerOutliercolor({ options: { parent: this } }))
    this.addChild(new BoxMarkerColor({ options: { parent: this } }))
    this.addChild(new BoxMarkerOpacity({ options: { parent: this } }))
    this.addChild(new BoxMarkerLine({ options: { parent: this } }))
  }
}

export class BoxMarkerSymbol extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'symbol',
      type: { type: 'enum', value: markerSymbol },
      options: {
        description: {
          type: 'string',
          value:
            '数据点形状。详见：<a href="https://plotly.com/javascript/reference/scatter/#scatter-marker-symbol" target="_blank">scatter-marker-symbol</a>'
        },
        controller: new AttributeController({ type: 'select', default: 'circle', options: markerSymbol })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BoxMarkerSize extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'size',
      type: 'number | number[]',
      options: {
        description: {
          type: 'string',
          value: '数据点大小。可以是数组，数组长度为数据点数量，用于指定每个数据点的大小。'
        },
        controller: new AttributeController({ type: 'number', default: 6, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BoxMarkerOutliercolor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'outliercolor',
      type: 'Color | Color[] | number[]',
      options: {
        description: { type: 'string', value: '设置异常样本数据点的颜色。' }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BoxMarkerColor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      type: 'Color | Color[] | number[]',
      options: {
        description: {
          type: 'string',
          value: '数据点颜色。可以是数组，数组长度为数据点数量，用于指定每个数据点的颜色。'
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BoxMarkerOpacity extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'opacity',
      type: 'number',
      options: {
        description: { type: 'string', value: '数据点透明度。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1, step: 0.1 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BoxMarkerLine extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'line',
      type: 'BoxMarkerLine',
      options: {
        parent,
        description: { type: 'string', value: '设置数据点的边框样式。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new BoxMarkerLineWidth({ options: { parent: this } }))
    this.addChild(new BoxMarkerLineColor({ options: { parent: this } }))
    this.addChild(new BoxMarkerLineOutlierWidth({ options: { parent: this } }))
    this.addChild(new BoxMarkerLineOutlierColor({ options: { parent: this } }))
  }
}

export class BoxMarkerLineWidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'width',
      type: 'number | number[]',
      options: {
        description: { type: 'string', value: '设置数据点的边框宽度。' },
        controller: new AttributeController({ type: 'number', default: null, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BoxMarkerLineColor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: { description: { type: 'string', value: '设置数据点的边框颜色。' } }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BoxMarkerLineOutlierWidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'outlierwidth',
      type: 'number | number[]',
      options: {
        description: { type: 'string', value: '设置数据点的边框宽度。' },
        controller: new AttributeController({ type: 'number', default: null, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BoxMarkerLineOutlierColor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'outliercolor',
      options: { description: { type: 'string', value: '设置数据点的边框颜色。' } }
    }
    super(merge(defaultInitializer, initializer))
  }
}
