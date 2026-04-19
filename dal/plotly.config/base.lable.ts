import Attribute from 'entity/attribute'
import { BaseFont } from './base.font'
import { BaseColor } from './base'

/**
 * 标题属性类，可继承扩展
 * 子属性：'bgcolor' | 'bordercolor' | 'font'
 */
export class BaseLabel extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    super(initializer)
    this.addChild(
      new BaseColor({
        name: 'bgcolor',
        options: { parent: this, description: { type: 'string', value: '标签背景颜色' } }
      })
    )

    this.addChild(
      new BaseColor({
        name: 'bordercolor',
        options: { parent: this, description: { type: 'string', value: '标签边框颜色' } }
      })
    )
    this.addChild(
      new BaseFont({ name: 'font', options: { parent: this, description: { type: 'string', value: '字体设置' } } })
    )
  }
}
