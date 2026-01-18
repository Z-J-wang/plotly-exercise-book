import AttributeController from './attribute.controller'

export default class Attribute {
  private _parent!: Attribute // 当前属性的父属性
  get parent(): Attribute {
    return this._parent
  }

  /**
   * 属性名称
   */
  private _name: string
  public get name(): string {
    return this._name
  }

  /**
   * 属性类型
   */
  private _type: Attribute.Type
  public get type(): Attribute.Type {
    return this._type
  }

  /**
   * 描述属性用途，支持字符串、HTML以及vue组件
   */
  private _description: Attribute.Description = { type: 'string', value: '' }
  public get description(): Attribute.Description {
    return this._description
  }

  /**
   * 子属性
   */
  private _children: Attribute[] = []
  public get children(): Attribute[] {
    return this._children
  }
  public set children(value: Attribute[]) {
    this._children = value
  }

  private _controller!: AttributeController
  public get controller(): AttributeController {
    return this._controller
  }

  private _initialConfig!: PlotlyConfig
  public get initialConfig(): PlotlyConfig {
    return this._initialConfig
  }

  /**
   * 属性ID
   */
  public get id(): string {
    if (this._parent) {
      return this._parent.id + '-' + this._name
    } else {
      return this._name
    }
  }

  /**
   * 属性路径
   */
  public get path(): Attribute.Path[] {
    const path: Attribute.Path = {
      name: this._name,
      value: this.id
    }
    if (this._parent) {
      return [...this._parent.path, path]
    } else {
      return [path]
    }
  }

  // TODO 构造函数改造中，临时兼容两种传参。改造目标：参数改为Attribute.Initializer类型的形参
  /**
   * 构造函数
   * @param name
   * @param type
   * @param options 属性选项
   */
  constructor(name: string | Attribute.Initializer, type?: string | Attribute.Type, options?: Attribute.Options) {
    let attrName: string, attrType: string | Attribute.Type, attrOptions: Attribute.Options | undefined
    if (typeof name !== 'string') {
      if (!name.name || !name.type) {
        throw new Error('属性名称和类型不能为空')
      }
      attrName = name.name
      attrType = name.type
      if (name.options) attrOptions = name.options
    } else {
      attrName = name
      attrType = type as string | Attribute.Type
      if (options) attrOptions = options
    }
    this._name = attrName

    if (typeof attrType === 'string') {
      this._type = { type: 'string', value: attrType }
    } else {
      this._type = attrType
    }

    if (attrOptions) {
      const { description, controller, children, initialConfig, parent } = attrOptions
      if (parent !== undefined) this._parent = parent
      if (description !== undefined) this._description = description
      if (controller !== undefined) this._controller = controller
      if (children?.length) this._children = children || []
      if (initialConfig !== undefined) this._initialConfig = initialConfig // 图表初始化配置，仅在根节点设置
    }
  }

  /**
   * 添加子属性
   * @param child 添加的子属性
   */
  public addChild(child: Attribute) {
    this._children.push(child)
  }

  public removeChild(childName: string) {
    const index = this._children.findIndex((child) => child.name === childName)
    if (index > -1) this._children.splice(index, 1)
  }

  // 挑选子属性
  public pickChildren(childNames: string[]) {
    const needDelete = this._children.filter((child) => !childNames.includes(child.name))
    needDelete.forEach((child) => this.removeChild(child.name))
  }

  // 忽略子属性
  public OmitChildren(childNames: string[]) {
    const needDelete = this._children.filter((child) => childNames.includes(child.name))
    needDelete.forEach((child) => this.removeChild(child.name))
  }
}
