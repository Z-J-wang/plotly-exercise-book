import Attribute from 'entities/attribute'

export default class LayoutAttributes {
  private _attributes: Attribute[]

  public get attributes(): Attribute[] {
    return this._attributes
  }

  constructor(parent: Attribute | null) {
    this._attributes = [new Attribute('title', 'string', '标题', '', parent)]
  }
}
