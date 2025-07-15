declare namespace PlotlyTypes {
  // 全局导出config.d.ts中的所有类型
  export { Config, EditConfig, ModeBarButton } from './config'

  export interface TraceData {
    type: string
    x?: number[]
    y?: number[]
    z?: number[]
    mode?: string
    name?: string
    [prop: string]: string | number | boolean | {} | undefined | Array<any> | Function // 兼容Plotly的复杂配置
  }

  export interface Layout {
    title: string | {}
    showlegend: boolean
    legend: {}
    margin: Partial<{
      autoexpand: boolean
      b: number
      l: number
      r: number
      t: number
      pad: number
    }>
    autosize: boolean
    width: number
    height: number
    font: {}
    uniformtext: {}
    separators: string
    paper_bgcolor: string
    plot_bgcolor: string
    autotypenumbers: 'convert types' | 'strict'
    colorscale: {}
    colorway: {}
    modebar: {}
    hovermode: 'x' | 'y' | 'closest' | false | 'x unified' | 'y unified'
    hoversubplots: 'single' | 'overlaying' | 'axis'
    clickmode: 'event' | 'select' | 'event+select' | 'none'
    dragmode:
      | 'zoom'
      | 'pan'
      | 'select'
      | 'lasso'
      | 'drawclosedpath'
      | 'drawopenpath'
      | 'drawline'
      | 'drawrect'
      | 'drawcircle'
      | 'orbit'
      | 'turntable'
      | false
    selectdirection: 'h' | 'v' | 'd' | 'any'
    activeselection: {}
    newselection: {}

    // 添加索引签名允许任意Plotly布局属性
    [prop: string]: string | number | boolean | {} | undefined | Array<any> | Function // 兼容Plotly的复杂配置
  }

  export interface Template {
    data: any[]
    layout: PlotlyLayout
  }

  export interface ToImageOptions {
    format?: 'png' | 'jpeg' | 'webp' | 'svg' | 'full-json'
    width?: number
    height?: number
    scale?: number
    filename?: string
    setBackground?: any
    imageDataOnly?: boolean // 仅返回图片数据。即不包含 base64 头
  }

  /**
   * template 校验结果数据类型
   */
  export type ValidateTemplateResult =
    | true
    | { code: 'missing' | 'unused' | 'reused' | 'noLayout' | 'noData'; msg: string }[]

  // Plotly 画面帧 数据类型
  export interface Frame {
    name?: string
    data: TraceData[]
    layout?: PlotlyLayout
    tracesIndices: number[]
    baseframe?: string
  }

  /**
   * 画面帧数据类型
   * 详见：https://github.com/plotly/plotly.js/blob/5e2163b2f3377187152bdfdffe1a9e64998ce5aa/src/plots/animation_attributes.js#L4
   */
  export interface AnimationOpts {
    mode: // 动画播放模式
    | 'immediate' // 打断当前帧，立即播放新帧
      | 'next' // 等待当前帧播放完后，再播放新帧
      | 'afterall' // 等待所有帧播放完毕后，再播放新帧
    direction: 'forward' | 'reverse' // 动画播放方向，向前或向后
    fromcurrent: boolean // 从当前帧开始播放帧，而不是开始播放
    frame: {
      duration: number // 每一帧的持续时间，单位ms
      redraw: boolean // 强制重新绘制整个图表
    }
    transition: {
      duration: number // 过渡的持续时间，单位ms
      easing: 'linear' | 'circle' | 'cubic' | 'elastic' | 'back' | 'bounce' // 动画缓动函数
    }
    ordering: 'layout first' | 'traces first'
  }
}
