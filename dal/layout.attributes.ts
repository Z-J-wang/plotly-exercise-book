import Attribute from 'entities/attribute'
import { Font } from './base.attributes'
import AttributeController from 'entities/attribute.controller'

export default class LayoutAttributes {
  private _attributes: Attribute[]

  public get attributes(): Attribute[] {
    return this._attributes
  }

  constructor(parent: Attribute | null) {
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
    this._attributes = [title]
  }
}
