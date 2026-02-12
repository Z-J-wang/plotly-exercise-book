import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { BaseColor } from './base'
import { merge } from 'lodash'

/**
 * 字体属性类，可继承扩展
 * 子属性：'color' | 'family' | 'size' | 'weight' | 'style' | 'variant' | 'lineposition' | 'shadow' | 'textcase'
 */
export class BaseFont extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      type: 'Font',
      options: {
        description: { type: 'string', value: '字体设置.' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new FontColor({ options: { parent: this } }))
    this.addChild(new FontFamily({ options: { parent: this } }))
    this.addChild(new FontLineposition({ options: { parent: this } }))
    this.addChild(new FontShadow({ options: { parent: this } }))
    this.addChild(new FontSize({ options: { parent: this } }))
    this.addChild(new FontWeight({ options: { parent: this } }))
    this.addChild(new FontStyle({ options: { parent: this } }))
    this.addChild(new FontTextcase({ options: { parent: this } }))
    this.addChild(new FontVariant({ options: { parent: this } }))
  }
}

export class FontColor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: { description: { type: 'string', value: '字体颜色' } }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class FontFamily extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'family',
      type: 'string',
      options: {
        description: { type: 'string', value: '字体' },
        controller: new AttributeController({ type: 'string', default: 'Arial, sans-serif' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class FontLineposition extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const linePositionOptions = [
      'under',
      'over',
      'through',
      'under+over',
      'under+through',
      'over+through',
      'under+over+through',
      'none'
    ]

    const defaultInitializer = {
      name: 'lineposition',
      type: { type: 'enum', value: linePositionOptions },
      options: {
        description: { type: 'string', value: '修饰线的位置' },
        controller: new AttributeController({
          type: 'select',
          default: 'none',
          options: linePositionOptions
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class FontShadow extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'shadow',
      type: 'string',
      options: {
        description: { type: 'string', value: '字体阴影' },
        controller: new AttributeController({ type: 'string', default: 'none' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class FontSize extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'size',
      type: 'number',
      options: {
        description: { type: 'string', value: '字体大小' },
        controller: new AttributeController({ type: 'number', default: 13, min: 8, step: 2 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class FontWeight extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const weightOptions = [
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'normal',
      'bold',
      'bolder',
      'lighter'
    ]
    const defaultInitializer = {
      name: 'weight',
      type: { type: 'enum', value: weightOptions },
      options: {
        description: { type: 'string', value: '字重' },
        controller: new AttributeController({ type: 'select', default: 'normal', options: weightOptions })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class FontStyle extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'style',
      type: { type: 'enum', value: ['normal', 'italic'] },
      options: {
        description: { type: 'string', value: '字体样式' },
        controller: new AttributeController({ type: 'select', default: 'normal', options: ['normal', 'italic'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class FontTextcase extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'textcase',
      type: { type: 'enum', value: ['normal', 'word caps', 'upper', 'lower'] },
      options: {
        description: {
          type: 'string',
          value:
            '文本大小写设置: <br />' +
            '<ul>' +
            '<li><code>normal</code> - 默认值。</li>' +
            '<li><code>word caps</code> - 每个单词首字母大写。</li>' +
            '<li><code>upper</code> - 全大写。</li>' +
            '<li><code>lower</code> - 全小写。</li>' +
            '</ul>'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'normal',
          options: ['normal', 'word caps', 'upper', 'lower']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class FontVariant extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const variantOptions = ['normal', 'small-caps', 'all-small-caps', 'all-petite-caps', 'petite-caps', 'unicase']
    const defaultInitializer = {
      name: 'variant',
      type: { type: 'enum', value: variantOptions },
      options: {
        description: { type: 'string', value: '字体变形' },
        controller: new AttributeController({ type: 'select', default: 'normal', options: variantOptions })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
