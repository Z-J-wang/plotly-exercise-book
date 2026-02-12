import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'
import { BaseColor, BaseWidth } from '../base'

export default class ErrorBar extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'error_bar',
      type: 'ErrorBar',
      options: {
        description: { type: 'string', value: '设置数据点误差条。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new ErrorBarType({ options: { parent: this } }))
    this.addChild(new ErrorBarValue({ options: { parent: this } }))
    this.addChild(new ErrorBarValueminus({ options: { parent: this } }))
    this.addChild(new ErrorBarArray({ options: { parent: this } }))
    this.addChild(new ErrorBarArrayminus({ options: { parent: this } }))
    this.addChild(new ErrorOptionVisible({ options: { parent: this } }))
    this.addChild(new ErrorOptionSymmetric({ options: { parent: this } }))
    this.addChild(new ErrorOptionColor({ options: { parent: this } }))
    this.addChild(new ErrorOptionThickness({ options: { parent: this } }))
    this.addChild(new ErrorOptionWidth({ options: { parent: this } }))
  }
}

export class ErrorBarType extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'type',
      type: { type: 'enum', value: ['constant', 'percent', 'data'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置误差条类型。' +
            '<ul>' +
            '<li><code>constant</code> - 误差条的长度将维持恒定不变，需在<code>value</code>属性中设置该常量数值。</li>' +
            '<li><code>percent</code> - 误差条的长度与基础数据呈百分比对应关系，需在<code>value</code>属性中设定此百分比数值。</li>' +
            '<li><code>data</code> - 为每个数据点单独设置误差条的长度，需在<code>array</code>中设置。</li>' +
            '</ul>'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'percent',
          options: ['constant', 'percent', 'data']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorBarValue extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'value',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '当<code>type="constant"|"percent"</code>时的右边（上边）误差值（误差条的长度）。'
        },
        controller: new AttributeController({ type: 'number', default: 10, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorBarValueminus extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'valueminus',
      type: 'number | undefined',
      options: {
        description: {
          type: 'string',
          value:
            '当<code>type="constant"|"percent"</code>时的误差值左边（下边）误差值（误差条的长度）。' +
            '默认情况下，其值等于<code>value</code>。' +
            '如果显性开启左右对称模式（即 <code>symmetric = true</code>），该属性将失效。'
        },
        controller: new AttributeController({ type: 'number', default: 10, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorBarArray extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'array',
      type: 'number[]',
      options: {
        description: {
          type: 'string',
          value:
            '当<code>type="data"</code>时右边（上边）误差值（误差条的长度）。其值为数字数组，用于为每个数据点设置误差值。'
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorBarArrayminus extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'arrayminus',
      type: 'number[]',
      options: {
        description: {
          type: 'string',
          value:
            '当<code>type="data"</code>时左边（下边）误差值（误差条的长度）。其值为数字数组，用于为每个数据点设置误差值。' +
            '默认情况下，其值等于<code>array</code>。' +
            '如果显性开启左右对称模式（即 <code>symmetric = true</code>），该属性将失效。'
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorOptionVisible extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'visible',
      type: 'boolean',
      options: {
        description: { type: 'string', value: '是否显示误差条。' },
        controller: new AttributeController({ type: 'boolean', default: true })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorOptionSymmetric extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'symmetric',
      type: 'boolean',
      options: {
        description: { type: 'string', value: '是否对称误差条。' },
        controller: new AttributeController({ type: 'boolean', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorOptionColor extends BaseColor {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        description: { type: 'string', value: '误差条颜色。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorOptionThickness extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'thickness',
      type: 'number',
      options: {
        description: { type: 'string', value: '误差条的厚度。' },
        controller: new AttributeController({ type: 'number', default: 2, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ErrorOptionWidth extends BaseWidth {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        description: { type: 'string', value: '误差条两端横杠宽度。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
