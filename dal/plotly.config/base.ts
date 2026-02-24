import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

/**
 * Plotly 配置基类，该类用于维护配置清单
 */
export class BaseConfig {
  private _parent!: Attribute | null

  public get parent(): Attribute | null {
    return this._parent
  }
  private _attributes: Attribute[] = []

  public get attributes(): Attribute[] {
    return this._attributes
  }

  public insertAttribute(newAttribute: Attribute) {
    this._attributes.push(newAttribute)
  }

  constructor(parent: Attribute) {
    this._parent = parent
  }
}

export class BaseColor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'color',
      type: 'Color',
      options: {
        description: { type: 'string', value: '颜色设置。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class BaseWidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'width',
      type: 'number',
      options: {
        description: { type: 'string', value: '宽度。单位为<code>px</code>。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 1 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

/**
 * 外边距属性类，可继承扩展
 * 属性：'t' | 'b | 'l' | 'r' | 'pad'
 */
export class Margin extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'margin',
      type: 'Margin',
      options: {
        description: { type: 'string', value: '设置绘图区域外边距，即绘图区域与容器的边界之间的距离。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(
      new Attribute({
        name: 't',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '上外边距' },
          controller: new AttributeController({ type: 'number', default: 100 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'b',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '下外边距' },
          controller: new AttributeController({ type: 'number', default: 80 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'l',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '左外边距' },
          controller: new AttributeController({ type: 'number', default: 80 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'r',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '右外边距' },
          controller: new AttributeController({ type: 'number', default: 80 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'pad',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '内边距' },
          controller: new AttributeController({ type: 'number', default: 0 })
        }
      })
    )
  }
}

/**
 * 内边距
 */
export class Pad extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'pad',
      type: 'Padding',
      options: {
        description: { type: 'string', value: '设置标题内边距。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(
      new Attribute({
        name: 'b',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '底部边距，单位为<code>px</code>' },
          controller: new AttributeController({ type: 'number', default: 0 })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'l',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '左边边距，单位为<code>px</code>' },
          controller: new AttributeController({
            type: 'number',
            default: 0
          })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'r',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '右边边距，单位为<code>px</code>' },
          controller: new AttributeController({
            type: 'number',
            default: 0
          })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 't',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '顶部边距，单位为<code>px</code>' },
          controller: new AttributeController({
            type: 'number',
            default: 0
          })
        }
      })
    )
  }
}

export class BaseUirevision extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'uirevision',
      type: 'string | number',
      options: {
        description: {
          type: 'string',
          value:
            '控制UI状态变化的持久性。' +
            '具体说明，详见：<a href="/#/docs/config/?id=layout-uirevision"><code>layout.uirevision</code></a>。'
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
