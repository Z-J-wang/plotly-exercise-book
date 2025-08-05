import Attribute from 'entities/attribute'
import { Font } from './base.attributes'

export default class LayoutAttributes {
  private _attributes: Attribute[]

  public get attributes(): Attribute[] {
    return this._attributes
  }

  constructor(parent: Attribute | null) {
    const title = new Attribute(parent, 'title', 'LayoutTitle', { type: 'String', value: '标题' })
    title.addChild(
      new Attribute(
        title,
        'text',
        'string',
        { type: 'String', value: '标题内容' },
        {
          type: 'string',
          value: '',
          default: ''
        }
      )
    )
    title.addChild(new Font(title))
    const subTitle = new Attribute(parent, 'subTitle', 'string', { type: 'String', value: '副标题' })
    subTitle.addChild(
      new Attribute(
        subTitle,
        'text',
        'string',
        { type: 'String', value: '副标题内容' },
        {
          type: 'string',
          value: '',
          default: ''
        }
      )
    )
    subTitle.addChild(new Font(subTitle))
    title.addChild(subTitle)
    this._attributes = [title]
  }
}
