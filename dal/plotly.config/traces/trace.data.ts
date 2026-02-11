import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { defineAsyncComponent } from 'vue'
import { merge } from 'lodash'

export default class TraceData {
  constructor(parent: Attribute) {
    parent.addChild(new TraceDataX({ options: { parent } }))
    parent.addChild(new TraceDataX0({ options: { parent } }))
    parent.addChild(new TraceDataDx({ options: { parent } }))
    parent.addChild(new TraceDataY({ options: { parent } }))
    parent.addChild(new TraceDataY0({ options: { parent } }))
    parent.addChild(new TraceDataDy({ options: { parent } }))
  }
}

export class TraceDataX extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'x',
      type: 'number[]',
      options: {
        description: { type: 'string', value: 'X轴数据。' }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceDataX0 extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'x0',
      type: 'number',
      options: {
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/traces/BaseX0.vue'))
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceDataDx extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'dx',
      type: 'number',
      options: {
        description: { type: 'string', value: 'X轴数据间隔。' },
        controller: new AttributeController({ default: 1 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceDataY extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'y',
      type: 'number[]',
      options: { description: { type: 'string', value: 'Y轴数据。' } }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceDataY0 extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'y0',
      type: 'number',
      options: { description: { type: 'string', value: 'Y轴数据起始位置。' } }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceDataDy extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'dy',
      type: 'number',
      options: {
        description: { type: 'string', value: 'Y轴数据间隔。' },
        controller: new AttributeController({ default: 1 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
