import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'

class ErrorOptions {
  constructor(parent: Attribute) {
    parent.addChild(
      new Attribute('visible', 'boolean', {
        parent,
        description: { type: 'string', value: '是否显示误差条。' },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    parent.addChild(
      new Attribute('symmetric', 'boolean', {
        parent,
        description: { type: 'string', value: '是否对称误差条。' },
        controller: new AttributeController({ type: 'boolean', default: null })
      })
    )

    parent.addChild(
      new Attribute('color', 'Color', {
        parent,
        description: { type: 'string', value: '误差条颜色。' },
        controller: new AttributeController({ type: 'color', default: null })
      })
    )

    parent.addChild(
      new Attribute('thickness', 'number', {
        parent,
        description: { type: 'string', value: '误差条的厚度。' },
        controller: new AttributeController({ type: 'number', default: 2, min: 0 })
      })
    )

    parent.addChild(
      new Attribute('width', 'number', {
        parent,
        description: { type: 'string', value: '误差条两端横杠宽度。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0 })
      })
    )
  }
}

export default class ErrorBar extends Attribute {
  constructor(name: string, options?: Attribute.Options) {
    super(name, 'ErrorBar', options)

    this.addChild(
      new Attribute(
        'type',
        { type: 'enum', value: ['constant', 'percent', 'data'] },
        {
          parent: this,
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
      )
    )

    this.addChild(
      new Attribute('value', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '当<code>type="constant"|"percent"</code>时的右边（上边）误差值（误差条的长度）。'
        },
        controller: new AttributeController({ type: 'number', default: 10, min: 0 })
      })
    )
    this.addChild(
      new Attribute('valueminus', 'number | undefined', {
        parent: this,
        description: {
          type: 'string',
          value:
            '当<code>type="constant"|"percent"</code>时的误差值左边（下边）误差值（误差条的长度）。' +
            '默认情况下，其值等于<code>value</code>。' +
            '如果显性开启左右对称模式（即 <code>symmetric = true</code>），该属性将失效。'
        },
        controller: new AttributeController({ type: 'number', default: 10, min: 0 })
      })
    )

    this.addChild(
      new Attribute('array', 'number[]', {
        parent: this,
        description: {
          type: 'string',
          value:
            '当<code>type="data"</code>时右边（上边）误差值（误差条的长度）。其值为数字数组，用于为每个数据点设置误差值。'
        },
        controller: { default: 'undefined' }
      })
    )

    this.addChild(
      new Attribute('arrayminus', 'number[]', {
        parent: this,
        description: {
          type: 'string',
          value:
            '当<code>type="data"</code>时左边（下边）误差值（误差条的长度）。其值为数字数组，用于为每个数据点设置误差值。' +
            '默认情况下，其值等于<code>array</code>。' +
            '如果显性开启左右对称模式（即 <code>symmetric = true</code>），该属性将失效。'
        },
        controller: { default: 'undefined' }
      })
    )

    new ErrorOptions(this)
  }
}
