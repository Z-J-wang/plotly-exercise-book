declare namespace PlotlyTypes {
  // 全局导出config.d.ts中的所有类型
  export { Config, EditConfig, ModeBarButton } from './config'
  export { ScatterTrace } from './ScatterTrace'

  export type TraceData = Plotly.Data | ScatterTrace

  export type Layout =
    | Plotly.Layout
    | {
        // 添加索引签名允许任意Plotly布局属性
        [K in `legend_${string}`]: Partial<Plotly.Legend> // 兼容Plotly的复杂配置
      }

  export interface Template {
    data?: { [type in PlotType]?: Array<Partial<Plotly.PlotData>> } | undefined
    layout?: Partial<Plotly.Layout> | undefined
  }

  export interface ToImageOptions {
    format: 'jpeg' | 'png' | 'webp' | 'svg'
    width: number
    height: number
    scale: number
    filename: string
  }

  /**
   * template 校验结果数据类型
   */
  export type ValidateTemplateResult = true | Plotly.ValidateTemplateResult[]

  // Plotly 画面帧 数据类型
  export interface Frame {
    name?: string
    data: TraceData[]
    layout?: Layout
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
