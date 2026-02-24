import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

export default class ConfigEdits extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'edits',
      type: 'ConfigEdits',
      options: { description: { type: 'string', value: '对可编辑的项进行细致的定义。' } }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(
      new Attribute({
        name: 'annotationPosition',
        type: 'boolean',
        options: {
          parent: this,
          description: {
            type: 'string',
            value:
              '确定注释的主要锚点是否可编辑。主要锚点对应于文本部分（如果没有箭头）或者箭头部分（通过拖动整个内容，但箭头的长度和方向保持不变）。'
          },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'annotationTail',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '仅对带有箭头的注释进行编辑，可改变箭头的长度和方向。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'annotationText',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '允许注释文本可编辑。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'axisTitleText',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '允许轴标题可编辑。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'colorbarPosition',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '允许颜色条位置可编辑。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'colorbarTitleText',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '允许颜色条标题可编辑。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'legendPosition',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '允许图例位置可编辑。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'legendText',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '允许图例文本可编辑。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'shapePosition',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '允许形状位置可编辑。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'titleText',
        type: 'boolean',
        options: {
          parent: this,
          description: { type: 'string', value: '允许标题文本可编辑。' },
          controller: new AttributeController({ type: 'boolean', default: false })
        }
      })
    )
  }
}
