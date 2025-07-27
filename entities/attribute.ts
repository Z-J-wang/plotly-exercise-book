export default class Attribute {
  private _parent: Attribute | null

  get parent(): Attribute | null {
    return this._parent
  }
  private _name: string
  public get name(): string {
    return this._name
  }

  private _type: string
  public get type(): string {
    return this._type
  }
  private _description: string
  public get description(): string {
    return this._description
  }

  private _defaultValue: string
  public get defaultValue(): string {
    return this._defaultValue
  }

  private _children: Attribute[]
  public get children(): Attribute[] {
    return this._children
  }

  public get path(): string {
    if (this._parent) {
      return this._parent.path + '.' + this._name
    } else {
      return this._name
    }
  }

  get label(): string {
    return this._name
  }

  constructor(
    name: string,
    type: string,
    description: string,
    defaultValue: any,
    parent: Attribute | null,
    children: Attribute[] = []
  ) {
    this._name = name
    this._type = type
    this._description = description
    this._defaultValue = defaultValue
    this._children = children
    this._parent = parent
  }
}
