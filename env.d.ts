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
