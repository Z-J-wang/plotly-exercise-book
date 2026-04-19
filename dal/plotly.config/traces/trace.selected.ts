import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { BaseColor } from '../base'
import { merge } from 'lodash'

export default class TraceSelected extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = { type: 'Selected' }
    super(merge({}, defaultInitializer, initializer))

    this.addChild(new TraceSelectedMarker({ options: { parent: this } }))
    this.addChild(new TraceSelectedTextfont({ options: { parent: this } }))
  }
}

export class TraceSelectedMarker extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'marker',
      type: 'object',
      options: {
        description: { type: 'string', value: '数据点样式。' }
      }
    }
    super(merge({}, defaultInitializer, initializer))

    this.addChild(new TraceSelectedMarkerSize({ options: { parent: this } }))
    this.addChild(new TraceSelectedMarkerColor({ options: { parent: this } }))
    this.addChild(new TraceSelectedMarkerOpacity({ options: { parent: this } }))
  }
}

export class TraceSelectedMarkerSize extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'size',
      type: 'number',
      options: {
        description: { type: 'string', value: '数据点大小。' },
        controller: new AttributeController({ type: 'number', default: 6, min: 0 })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceSelectedMarkerColor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        description: { type: 'string', value: '数据点颜色。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}

export class TraceSelectedMarkerOpacity extends Attribute {
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

export class TraceSelectedTextfont extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'textfont',
      type: 'TextFont',
      options: {
        description: { type: 'string', value: '文本字体。' }
      }
    }
    super(merge({}, defaultInitializer, initializer))

    this.addChild(new TraceSelectedTextfontColor({ options: { parent: this } }))
  }
}

export class TraceSelectedTextfontColor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        description: { type: 'string', value: '数据点颜色。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge({}, defaultInitializer, initializer))
  }
}
