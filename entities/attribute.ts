import type { Component } from 'vue'

export default class Attribute {
  private _parent: Attribute | null // 当前属性的父属性
  get parent(): Attribute | null {
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
  private _type: string
  public get type(): string {
    return this._type
  }

  /**
   * 描述属性用途，支持字符串、HTML、markdown以及vue组件
   */
  private _description: Attribute.Description
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

  private _controller: Attribute.Controller | null
  public get controller(): Attribute.Controller | null {
    return this._controller
  }

  /**
   * 属性ID
   */
  public get id(): string {
    if (this._parent) {
      return this._parent.id + '.' + this._name
    } else {
      return this._name
    }
  }

  /**
   * 属性路径
   */
  public get path(): Attribute.Path[] {
    const path: Attribute.Path = {
      label: this._name,
      value: this.id
    }
    if (this._parent) {
      return [...this._parent.path, path]
    } else {
      return [path]
    }
  }

  constructor(
    parent: Attribute | null,
    name: string,
    type: string,
    description: Attribute.Description,
    controller: Attribute.Controller | null = null,
    children: Attribute[] = []
  ) {
    this._name = name
    this._type = type
    this._description = description
    this._parent = parent
    this._controller = controller
    if (children?.length) this._children = children
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
}
