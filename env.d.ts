/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}

declare module 'plotly.js-dist-min' {
  import Plotly from 'plotly.js'

  export default Plotly
}

declare type ElementID = string // 元素 ID

declare interface PlotlyConfig {
  data?: Partial<Plotly.Data> | Partial<Plotly.Data>[]
  layout?: Partial<Plotly.Layout>
  config?: Partial<Plotly.Config>
}

declare namespace Attribute {
  import AttributeEntity from 'entities/attribute'

  /**
   * Attribute类型
   * Attribute类型分为string和enum。除了枚举值，其他都是字符串。
   */
  export type Type = { type: 'string' | 'enum'; value: string | any[] }

  export type ControllerType = 'string' | 'number' | 'boolean' | 'array' | 'color' | 'select'
  export interface ControllerOption {
    label: string
    value: any
  }

  export interface InitialController {
    /**
     * 类型
     */
    type: ControllerType

    /**
     * 属性默认值
     */
    default: any

    disabled?: boolean
    /**
     * 属性是否可选
     */
    options?: any[]

    min?: number
    max?: number
    step?: number
  }

  export interface Path {
    name: string
    value: string
  }

  export interface Description {
    type: 'string' | 'Component'
    value: string | Component
  }

  export interface Options {
    parent?: AttributeEntity
    description?: Description
    controller?: Controller
    children?: AttributeEntity[]
    initialConfig?: PlotlyConfig
  }
}
