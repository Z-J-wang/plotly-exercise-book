import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'
import { easing } from '@/utils/global.variable'

/**
 * 过渡效果属性类
 * 子属性: 'duration' | 'easing' | 'ordering'
 */
export class BaseTransition extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'transition',
      type: 'Transition',
      options: {
        description: { type: 'string', value: '设置在<code>Plotly.react</code>更新过程中的过渡效果。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new BaseTransitionDuration({ options: { parent: this } }))
    this.addChild(new BaseTransitionEasing({ options: { parent: this } }))
    this.addChild(new BaseTransitionOrdering({ options: { parent: this } }))
  }
}

export class BaseTransitionDuration extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'duration',
      type: 'number',
      options: {
        description: { type: 'string', value: '过渡动画持续时间（毫秒）' },
        controller: new AttributeController({ type: 'number', default: 500, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BaseTransitionEasing extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'easing',
      type: { type: 'enum', value: easing },
      options: {
        description: { type: 'string', value: '过渡的缓动函数。' },
        controller: new AttributeController({ type: 'select', default: 'cubic-in-out', options: easing })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BaseTransitionOrdering extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ordering',
      type: { type: 'enum', value: ['layout first', 'traces first'] },
      options: {
        description: {
          type: 'string',
          value:
            '在进行会使轨迹和布局都发生变化的更新操作时，指定过渡的顺序优先顺序。<br />' +
            '<ul>' +
            '<li><code>layout first</code> - 先更新布局，再更新轨迹。</li>' +
            '<li><code>traces first</code> - 先更新轨迹，再更新布局。</li>' +
            '</ul>'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'layout first',
          options: ['layout first', 'traces first']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
