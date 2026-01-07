import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class ConfigEdits extends Attribute {
  constructor(parent: Attribute) {
    const description: Attribute.Description = { type: 'string', value: '对可编辑的项进行细致的定义。' }
    super('edits', 'ConfigEdits', { parent, description })
    this.addChild(
      new Attribute('annotationPosition', 'boolean', {
        parent: this,
        description: {
          type: 'string',
          value:
            '确定注释的主要锚点是否可编辑。主要锚点对应于文本部分（如果没有箭头）或者箭头部分（通过拖动整个内容，但箭头的长度和方向保持不变）。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('annotationTail', 'boolean', {
        parent: this,
        description: { type: 'string', value: '仅对带有箭头的注释进行编辑，可改变箭头的长度和方向。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('annotationText', 'boolean', {
        parent: this,
        description: { type: 'string', value: '允许注释文本可编辑。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('axisTitleText', 'boolean', {
        parent: this,
        description: { type: 'string', value: '允许轴标题可编辑。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('colorbarPosition', 'boolean', {
        parent: this,
        description: { type: 'string', value: '允许颜色条位置可编辑。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('colorbarTitleText', 'boolean', {
        parent: this,
        description: { type: 'string', value: '允许颜色条标题可编辑。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('legendPosition', 'boolean', {
        parent: this,
        description: { type: 'string', value: '允许图例位置可编辑。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('legendText', 'boolean', {
        parent: this,
        description: { type: 'string', value: '允许图例文本可编辑。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('shapePosition', 'boolean', {
        parent: this,
        description: { type: 'string', value: '允许形状位置可编辑。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.addChild(
      new Attribute('titleText', 'boolean', {
        parent: this,
        description: { type: 'string', value: '允许标题文本可编辑。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )
  }
}
