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
  data?: Partial<Plotly.Data>
  layout?: Partial<Plotly.Layout>
  config?: Partial<Plotly.Config>
}

declare namespace Attribute {
  export type Type = 'string' | 'number' | 'boolean' | 'array' | 'color' | 'select'

  export interface Controller {
    /**
     * 类型
     */
    type: Type
    /**
     * 属性默认值
     */
    default: any

    value: any

    /**
     * 属性是否可选
     */
    options?: string[]

    min?: number
    max?: number
    step?: number
  }

  export interface Path {
    name: string
    value: string
  }

  export interface Description {
    type: 'String' | 'Component'
    value: string | Component
  }
}
