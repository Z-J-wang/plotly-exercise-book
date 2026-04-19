import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'
import TraceMarkerColoBar from './trace.colorbar'
import TraceMarkerGradient from './trace.marker.gradient'
import TraceMarkerLine from './trace.marker.line'
import { TraceAutocolorscale, TraceColorscale, TraceReversescale } from './trace.colorscale.about'
import { BaseColor } from '../base'

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
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'marker',
      type: 'Marker',
      options: {
        description: { type: 'string', value: '数据点样式设置。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new TraceMarkerSymbol({ options: { parent: this } }))
    this.addChild(new TraceMarkerAngle({ options: { parent: this } }))
    this.addChild(new TraceMarkerAngleref({ options: { parent: this } }))
    this.addChild(new TraceMarkerSize({ options: { parent: this } }))
    this.addChild(new TraceMarkerSizemin({ options: { parent: this } }))
    this.addChild(new TraceMarkerSizemode({ options: { parent: this } }))
    this.addChild(new TraceMarkerSizeref({ options: { parent: this } }))
    this.addChild(new TraceMarkerColor({ options: { parent: this } }))
    this.addChild(new TraceMarkerCauto({ options: { parent: this } }))
    this.addChild(new TraceMarkerCmin({ options: { parent: this } }))
    this.addChild(new TraceMarkerCmax({ options: { parent: this } }))
    this.addChild(new TraceMarkerCmid({ options: { parent: this } }))
    this.addChild(new TraceMarkerAutocolorscale({ options: { parent: this } }))
    this.addChild(new TraceMarkerColorscale({ options: { parent: this } }))
    this.addChild(new TraceMarkerReversescale({ options: { parent: this } }))
    this.addChild(new TraceMarkerOpacity({ options: { parent: this } }))
    this.addChild(new TraceMarkerMaxdisplayed({ options: { parent: this } }))
    this.addChild(new TraceMarkerColorbar({ options: { parent: this } }))
    this.addChild(new TraceMarkerGradient({ options: { parent: this } }))
    this.addChild(new TraceMarkerLine({ options: { parent: this, initialConfig: initializer.options?.initialConfig } }))
  }
}

export class TraceMarkerSymbol extends Attribute {
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
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerAngle extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'angle',
      type: 'number',
      options: {
        description: { type: 'string', value: '设置数据点的旋转角度。' },
        controller: new AttributeController({ type: 'number', default: 0, min: -360, max: 360 })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerAngleref extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'angleref',
      type: { type: 'enum', value: ['previous', 'up'] },
      options: {
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
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerSize extends Attribute {
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
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerSizemin extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'sizemin',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '数据点最小大小。只有<code>marker.size</code>的值是数组时，此属性才有效。'
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerSizemode extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'sizemode',
      type: 'enum',
      options: {
        description: {
          type: 'string',
          value: '数据点大小模式。'
        },
        controller: new AttributeController({ type: 'select', default: 'diameter', options: ['diameter', 'area'] })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerSizeref extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'sizeref',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '用于设置用于确定数据点渲染大小的比例因子。'
        },
        controller: new AttributeController({ type: 'number', default: 1, min: 0 })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerColor extends BaseColor {
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
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerCauto extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cauto',
      type: 'boolean',
      options: {
        description: {
          type: 'string',
          value:
            '确定数据点颜域是根据<code>marker.color</code>计算得出的，' +
            '还是根据在 <code>marker.cmin</code> 和 <code>marker.cmax</code> 中设定的范围计算得出的。' +
            '只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。' +
            '当用户通过 <code>marker.cmin</code> 和 <code>marker.cmax</code> 进行设置时，默认值为 <code>false</code> 。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerCmin extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cmin',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '数据点颜色最小值。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。需要与 <code>marker.cmax</code> 一起使用。'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerCmax extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cmax',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '数据点颜色最大值。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。需要与 <code>marker.cmin</code> 一起使用。'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerCmid extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cmid',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '数据点颜色中间值。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerAutocolorscale extends TraceAutocolorscale {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        description: {
          type: 'string',
          value:
            '是否采用默认颜色标尺。只有当 <code>marker.color</code> 被设置为数值数组时，此设置才有效。' +
            '值域：' +
            '<ul>' +
            '<li><code>true</code> - 启用默认颜色标尺</li>' +
            '<li><code>false</code> - 使用<code>marker.colorscale</code>定义的颜色标尺</li>' +
            '</ul>'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerColorscale extends TraceColorscale {
  constructor(initializer: Attribute.Initializer) {
    super(initializer)
  }
}

export class TraceMarkerReversescale extends TraceReversescale {
  constructor(initializer: Attribute.Initializer) {
    super(initializer)
  }
}

export class TraceMarkerOpacity extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'opacity',
      type: 'number',
      options: {
        description: { type: 'string', value: '数据点透明度。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0, max: 1, step: 0.1 })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerMaxdisplayed extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'maxdisplayed',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '设置图表中可以显示的最大数据点数。如果设置为 <code>0</code>，则将所有数据点显示为散点图。'
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerColorbar extends TraceMarkerColoBar {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        description: {
          type: 'string',
          value: '颜色条样式设置。因为颜色标尺在颜色条中显示，所以<code>marker.showscale</code>属性会影响颜色条的显示。'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}
