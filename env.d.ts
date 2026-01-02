/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}

declare module 'plotly.js-cartesian-dist-min' {
  import Plotly from 'plotly.js'

  export default Plotly
}

declare type ElementID = string // 元素 ID
declare type Base64URLString = string

interface Layout extends Omit<Plotly.Layout, 'grid'> {
  grid: Partial<{
    rows: number
    roworder: 'top to bottom' | 'bottom to top'
    columns: number
    subplots: string[] | string[][]
    xaxes: string[]
    yaxes: string[]
    pattern: 'independent' | 'coupled'
    xgap: number
    ygap: number
    domain: Partial<{
      x: number[]
      y: number[]
    }>
    xside: 'bottom' | 'bottom plot' | 'top plot' | 'top'
    yside: 'left' | 'left plot' | 'right plot' | 'right'
  }>
}

declare interface PlotlyConfig {
  data?: Partial<Plotly.Data> | Partial<Plotly.Data>[]
  layout?: Partial<Layout>
  config?: Partial<Plotly.Config>
}

declare namespace Attribute {
  import AttributeEntity from 'entity/attribute'

  /**
   * Attribute类型
   * Attribute类型分为string和enum。除了枚举值，其他都是字符串。
   */
  export type Type = { type: 'string' | 'enum'; value: string | any[] }

  export type ControllerType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'color'
    | 'colorlist'
    | 'select'
    | 'slider'
    | 'jsonString'
  export interface ControllerOption {
    label: string
    value: any
  }

  export interface InitialController {
    /**
     * 属性默认值
     * 当默认值不固定时，需将默认值设置为null
     */
    default: any

    /**
     * 类型
     */
    type?: ControllerType

    /**
     * 属性值。该值缺失时将采用默认值。
     */
    value?: any

    disabled?: boolean
    /**
     * 属性是否可选
     */
    options?: any[]
    multiple?: boolean
    min?: number
    max?: number
    step?: number
  }

  export interface Path {
    name: string
    value: string
  }

  /**
   * 属性描述
   */
  export interface Description {
    type:
      | 'string' // 字符串类型支持 string 和 array 两种数据类型
      | 'Component'
      | 'markdown'

    // 当 type = 'string'是，字符串中的的“”表示行内代码块，\n 表示换行
    value: string | array | Component
  }

  export interface Options {
    parent?: AttributeEntity
    description?: Description
    controller?: Controller
    children?: AttributeEntity[]
    initialConfig?: PlotlyConfig
  }
}
