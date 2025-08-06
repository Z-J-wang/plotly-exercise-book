import Attribute from 'entities/attribute'
import { Font } from './base'
import AttributeController from 'entities/attribute.controller'
import { BaseConfig } from './base'

export default class Layout extends BaseConfig {
  constructor(parent: Attribute | null) {
    super(parent)
    const title = new Attribute('title', 'LayoutTitle', {
      parent: parent,
      description: { type: 'String', value: '标题' }
    })
    title.addChild(
      new Attribute('text', 'string', {
        parent: title,
        description: { type: 'String', value: '标题内容' },
        controller: new AttributeController({
          type: 'string',
          default: ''
        })
      })
    )
    title.addChild(new Font(title))
    const subTitle = new Attribute('subTitle', 'string', {
      parent: parent,
      description: { type: 'String', value: '副标题' }
    })
    subTitle.addChild(
      new Attribute('text', 'string', {
        parent: subTitle,
        description: { type: 'String', value: '副标题内容' },
        controller: new AttributeController({
          type: 'string',
          default: ''
        })
      })
    )
    subTitle.addChild(new Font(subTitle))
    title.addChild(subTitle)
    this.insertAttribute(title)
  }
}
