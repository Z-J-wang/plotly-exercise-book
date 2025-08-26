import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { defineAsyncComponent } from 'vue'

export default class BaseData {
  constructor(parent: Attribute) {
    parent.addChild(new Attribute('x', 'number[]', { parent, description: { type: 'string', value: 'X轴数据。' } }))

    parent.addChild(
      new Attribute('x0', 'number', {
        parent,
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/traces/BaseX0.vue'))
        }
      })
    )

    parent.addChild(
      new Attribute('dx', 'number', {
        parent,
        description: { type: 'string', value: 'X轴数据间隔。' },
        controller: new AttributeController({ default: 1 })
      })
    )

    parent.addChild(new Attribute('y', 'number[]', { parent, description: { type: 'string', value: 'Y轴数据。' } }))

    parent.addChild(
      new Attribute('y0', 'number', { parent, description: { type: 'string', value: 'Y轴数据起始位置。' } })
    )

    parent.addChild(
      new Attribute('dy', 'number', {
        parent,
        description: { type: 'string', value: 'Y轴数据间隔。' },
        controller: new AttributeController({ default: 1 })
      })
    )
  }
}
