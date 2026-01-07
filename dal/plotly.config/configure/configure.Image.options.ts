import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class ConfigureImageOptions extends Attribute {
  constructor(parent: Attribute) {
    super('toImageButtonOptions', 'ConfigureImageOptions', {
      parent,
      description: { type: 'string', value: '自定义模式（工具）栏的图表导出图像选项。' }
    })

    this.addChild(
      new Attribute(
        'format',
        { type: 'enum', value: ['png', 'svg', 'jpeg', 'webp'] },
        {
          parent: this,
          description: { type: 'string', value: '设置导出图片的格式。' },
          controller: new AttributeController({
            type: 'select',
            default: 'png',
            options: ['png', 'svg', 'jpeg', 'webp']
          })
        }
      )
    )

    this.addChild(
      new Attribute('filename', 'string', {
        parent: this,
        description: { type: 'string', value: '导出图片的文件名。' },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )

    this.addChild(
      new Attribute('scale', 'number', {
        parent: this,
        description: { type: 'string', value: '缩放比例' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0, step: 0.1 })
      })
    )

    this.addChild(
      new Attribute('width', 'number', {
        parent: this,
        description: { type: 'string', value: '图片宽度。默认宽度为，图片渲染宽度。' },
        controller: new AttributeController({ type: 'number', default: null })
      })
    )

    this.addChild(
      new Attribute('height', 'number', {
        parent: this,
        description: { type: 'string', value: '图片高度。默认高度为，图片渲染高度。' },
        controller: new AttributeController({ type: 'number', default: null })
      })
    )
  }
}
