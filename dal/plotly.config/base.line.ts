import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'
import { BaseColor, BaseWidth } from './base'

/**
 * 线条属性类，可继承扩展。子属性：'color' | 'width' | 'dash'
 */
export class BaseLine extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'line',
      type: 'Line',
      options: {
        description: { type: 'string', value: '设置线条样式。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(
      new BaseColor({
        options: { parent: this, description: { type: 'string', value: '线条颜色' } }
      })
    )

    this.addChild(
      new BaseWidth({
        options: {
          parent: this,
          description: { type: 'string', value: '线条宽度。单位为<code>px</code>。' }
        }
      })
    )

    this.addChild(
      new BaseLineDash({
        options: { parent: this }
      })
    )
  }
}

export class BaseLineDash extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'dash',
      type: { type: 'enum', value: ['solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot'] },
      options: {
        description: { type: 'string', value: '线条样式' },
        controller: new AttributeController({
          type: 'select',
          default: 'dot',
          options: ['solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
