import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { TraceAutocolorscale, TraceColorscale, TraceReversescale } from './trace.colorscale.about'
import { merge } from 'lodash'
import { BaseWidth } from '../base'

export default class TraceMarkerLine extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'line',
      type: 'BaseMarkerLine',
      options: {
        description: { type: 'string', value: '设置数据点的边框样式。' },
        initialConfig: { data: [{ marker: { size: 20 } }] }
      }
    }
    super(merge({}, defaultInitializer, initializer))

    const initialConfigOfMarkerColor = merge(
      {
        data: [{ marker: { size: 20, line: { width: 5, color: [10, 12, 14, 16] } } }]
      },
      this.initialConfig
    )

    this.addChild(
      new BaseWidth({
        options: {
          parent: this,
          description: { type: 'string', value: '设置数据点的边框宽度。' },
          controller: new AttributeController({ type: 'number', default: null, min: 0 })
        }
      })
    )

    this.addChild(
      new TraceMarkerLineCauto({
        options: {
          parent: this,
          initialConfig: merge(
            {
              data: [{ marker: { line: { cmin: 15, cmax: 20 } } }]
            },
            initialConfigOfMarkerColor
          )
        }
      })
    )

    this.addChild(new TraceMarkerLineCmin({ options: { parent: this } }))
    this.addChild(new TraceMarkerLineCmax({ options: { parent: this } }))
    this.addChild(new TraceMarkerLineCmid({ options: { parent: this } }))

    this.addChild(
      new TraceMarkerLineAutocolorscale({
        options: {
          parent: this,
          initialConfig: merge({ data: [{ marker: { line: { colorscale: 'Hot' } } }] }, initialConfigOfMarkerColor)
        }
      })
    )

    this.addChild(
      new TraceMarkerLineColorcale({
        options: { parent: this, initialConfig: initialConfigOfMarkerColor }
      })
    )
    this.addChild(
      new TraceMarkerLineReversescale({
        options: { parent: this, initialConfig: initialConfigOfMarkerColor }
      })
    )

    this.addChild(new TraceMarkerLineColoraxis({ options: { parent: this } }))
  }
}

export class TraceMarkerLineCauto extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cauto',
      type: 'boolean',
      options: {
        description: {
          type: 'string',
          value:
            '确定数据点边框颜域是根据<code>marker.line.color</code>计算得出的，' +
            '还是根据在 <code>marker.line.cmin</code> 和 <code>marker.line.cmax</code> 中设定的范围计算得出的。' +
            '只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。' +
            '当用户通过 <code>marker.line.cmin</code> 和 <code>marker.line.cmax</code> 进行设置时，默认值为 <code>false</code> 。'
        },
        controller: new AttributeController({ type: 'boolean', default: null })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerLineCmin extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cmin',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '数据点边框颜色最小值。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。需要与 <code>marker.line.cmax</code> 一起使用。'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerLineCmax extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cmax',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '数据点边框颜色最大值。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。需要与 <code>marker.line.cmin</code> 一起使用。'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerLineCmid extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'cmid',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '数据点边框颜色中间值。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerLineAutocolorscale extends TraceAutocolorscale {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        description: {
          type: 'string',
          value:
            '是否采用默认颜色标尺。只有当 <code>marker.line.color</code> 被设置为数值数组时，此设置才有效。' +
            '值域：' +
            '<ul>' +
            '<li><code>true</code> - 启用默认颜色标尺</li>' +
            '<li><code>false</code> - 使用<code>marker.line.colorscale</code>定义的颜色标尺</li>' +
            '</ul>'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceMarkerLineColorcale extends TraceColorscale {
  constructor(initializer: Attribute.Initializer) {
    super(initializer)
  }
}

export class TraceMarkerLineReversescale extends TraceReversescale {
  constructor(initializer: Attribute.Initializer) {
    super(initializer)
  }
}

export class TraceMarkerLineColoraxis extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'coloraxis',
      type: 'string',
      options: {
        description: {
          type: 'string',
          value:
            '指定要使用的颜色轴配置。关于颜色轴的配置，详见 <a href="#layout.coloraxis"><code>layout.coloraxis</code></a>。'
        }
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}
