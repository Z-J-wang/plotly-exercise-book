import Plotly from 'plotly.js-dist-min'
import { ref } from 'vue'

export interface TraceData {
  type: string
  x?: number[]
  y?: number[]
  z?: number[]
  mode?: string
  name?: string
  [prop: string]: string | number | boolean | {} | undefined | Array<any> | Function // 兼容Plotly的复杂配置
}

export interface PlotlyLayout {
  title?: string | {}
  showlegend?: boolean
  legend?: {}
  margin?: {
    autoexpand?: boolean
    b?: number
    l?: number
    r?: number
    t?: number
    pad?: number
  }
  autosize?: boolean
  width?: number
  height?: number
  font?: {}
  uniformtext?: {}
  separators?: string
  paper_bgcolor?: string
  plot_bgcolor?: string
  autotypenumbers?: 'convert types' | 'strict'
  colorscale?: {}
  colorway?: {}
  modebar?: {}
  hovermode?: 'x' | 'y' | 'closest' | false | 'x unified' | 'y unified'
  hoversubplots?: 'single' | 'overlaying' | 'axis'
  clickmode?: 'event' | 'select' | 'event+select' | 'none'
  dragmode?:
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
  selectdirection?: 'h' | 'v' | 'd' | 'any'
  activeselection?: {}
  newselection?: {}

  // 添加索引签名允许任意Plotly布局属性
  [prop: string]: string | number | boolean | {} | undefined | Array<any> | Function // 兼容Plotly的复杂配置
}

export interface PlotlyTemplate {
  data: any[]
  layout: PlotlyLayout
}
export type ElementID = string // 元素 ID

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
export interface PlotlyFrame {
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

/**
 * 使用 plotly.js 绘制图表
 * @param {string id or DOM element} gd 图表容器元素或者其ID
 * @param {array of objects} data trace 数组，一个 trace 对象描述一个数据系列
 * @param {boolean} useReact 使用 react 方法渲染图表，react 方法不会销毁图表容器
 * @param {object} layout 描述图表的布局
 * @param {object} config 描述图表的配置
 * 详见：https://plotly.com/javascript/plotlyjs-function-reference/#plotlynewplot
 */
export function usePlotly(
  gd: Element | ElementID,
  data: TraceData[],
  useReact: boolean = false,
  layout?: PlotlyLayout,
  config?: any
) {
  let plotly: Promise<Element> | null = null
  const plotlyTemplate = ref<PlotlyTemplate | null>(null)
  let _plotElement: Element | null = null
  if (useReact) {
    plotly = Plotly.react(gd, data, layout, config) as Promise<Element>
  } else {
    plotly = Plotly.newPlot(gd, data, layout, config) as Promise<Element>
  }

  plotly.then((element: Element) => _updateTemplate(element))

  function _updateTemplate(plotElement: Element) {
    _plotElement = plotElement
    plotlyTemplate.value = Plotly.makeTemplate(plotElement) as PlotlyTemplate
  }

  return {
    plotly,
    plotlyTemplate,

    /**
     * 使用 react 方法绘制图表
     * @param {array of objects} data trace 数组，一个 trace 对象描述一个数据系列
     * @param {object} layout 描述图表的布局
     * @param {object} config 描述图表的配置
     * 详见：https://plotly.com/javascript/plotlyjs-function-reference/#plotlyreact
     */
    react: function (data: TraceData[], layout?: PlotlyLayout, config?: any): Promise<Element> {
      return Plotly.react(gd, data, layout, config).then((element: Element) => _updateTemplate(element))
    },

    /**
     * 重新绘制指定的trace
     * @param tracesData trace 描述信息，注意不能传递x,y,z轴数据
     * @param traceIndices 指定要重新绘制的trace的索引，索引起始值为0
     */
    restyle: function (
      traceData: Partial<Omit<TraceData, 'x' | 'y' | 'z'>>,
      traceIndices?: number | number[]
    ): Promise<Element> {
      return Plotly.restyle(gd, traceData, traceIndices).then((element: Element) => _updateTemplate(element))
    },

    /**
     * 根据新的layout，重新绘制当前图表
     * @param layout 描述图表的布局
     */
    relayout: function (layout: Partial<PlotlyLayout>): Promise<Element> {
      return Plotly.relayout(gd, layout).then((element: Element) => _updateTemplate(element))
    },

    /**
     * restyle 和 relayout 的结合体
     * @param traceData trace 描述信息，注意不能传递x,y,z轴数据
     * @param layout 描述图表的布局
     * @param traceIndices 指定要重新绘制的trace的索引，索引起始值为0
     */
    update: function (
      traceData: Partial<Omit<TraceData, 'x' | 'y' | 'z'>>,
      layout: Partial<PlotlyLayout>,
      traceIndices?: number | number[]
    ): Promise<Element> {
      return Plotly.update(gd, traceData, layout, traceIndices).then((element: Element) => _updateTemplate(element))
    },

    /**
     * 校验 template 是否适用于当前图表
     * @param template
     * @returns 校验结果
     */
    validateTemplate: function (template: Partial<PlotlyTemplate>): ValidateTemplateResult {
      const result = Plotly.validateTemplate(_plotElement, template)
      return result === undefined ? true : result
    },

    /**
     * 添加新的 trace 数据
     * @param traces
     * @param newIndices 可选，指定新 trace 插入的位置
     */
    addTraces: function (traces: TraceData | TraceData[], newIndices?: number | number[]): Promise<Element> {
      return Plotly.addTraces(_plotElement, traces, newIndices).then((element: Element) => _updateTemplate(element))
    },

    /**
     * 删除指定 trace 数据
     * @param traceIndices 要删除的 trace index，支持正反序。如 0 | -1 | [-2,-1]
     */
    deleteTraces: function (traceIndices: number | number[]): Promise<Element> {
      return Plotly.deleteTraces(_plotElement, traceIndices).then((element: Element) => _updateTemplate(element))
    },

    /**
     * 更新指定 trace 数据
     *
     * 详见：https://plotly.com/javascript/plotlyjs-function-reference/#plotlymovetraces
     *
     * @param currentTraceIndices 要移动的 trace index。支持正反序。如 0 | -1 | [-2,-1]
     * @param newTraceIndices 移动后的 trace index。省略则默认指向队列末尾。支持正反序。如 0 | -1 | [-2,-1]
     *
     *  Example calls:
     *
     *      // move trace i to location x
     *
     *      moveTraces(gd, i, x)
     *
     *      // move trace i to end of array
     *
     *      moveTraces(gd, i)
     *
     *      // move traces i, j, k to end of array (i != j != k)
     *
     *      moveTraces(gd, [i, j, k])
     *
     *      // move traces [i, j, k] to [x, y, z] (i != j != k) (x != y != z)
     *
     *      moveTraces(gd, [i, j, k], [x, y, z])
     *
     *      // reorder all traces (assume there are 5--a, b, c, d, e)
     *
     *      moveTraces(gd, [b, d, e, a, c])  // same as 'move to end'
     */
    moveTraces: function (
      currentTraceIndices: number | number[],
      newTraceIndices?: number | number[]
    ): Promise<Element> {
      return Plotly.moveTraces(_plotElement, currentTraceIndices, newTraceIndices).then((element: Element) =>
        _updateTemplate(element)
      )
    },

    /**
     * 对 trace 属性进行后置扩展
     *
     * 注意，只能对数组属性进行扩展，即与trace数据相关的数据，例：x, y, z等。
     *
     * 用法示例：对 trace1和trace2进行扩展,同时添加3个数据点
     * extendTraces({x: [[1,2,3],[4,5,6]], y: [[1,2,3],[4,5,6]]}, [0,1])
     *
     * @param data 要扩展的属性数据。
     * @param indices 要扩展的 trace 索引
     * @param maxLength trace 数据的最大长度，如果 trace 数据的长度超过 maxLength，则进行截断
     * @returns
     */
    extendTraces: function (
      data: { [prop: string]: any[] },
      indices: number | number[],
      maxLength?: number
    ): Promise<Element> {
      return Plotly.extendTraces(_plotElement, data, indices, maxLength).then((element: Element) =>
        _updateTemplate(element)
      )
    },

    /**
     * 对 trace 属性进行前置扩展
     *
     * 注意，只能对数组属性进行扩展，即与trace数据相关的数据，例：x, y, z等。
     *
     * 用法示例：对 trace1和trace2进行扩展,同时添加3个数据点
     * extendTraces({x: [[1,2,3],[4,5,6]], y: [[1,2,3],[4,5,6]]}, [0,1])
     *
     * @param data 要扩展的属性数据。
     * @param indices 要扩展的 trace 索引
     * @param maxLength trace 数据的最大长度，如果 trace 数据的长度超过 maxLength，则进行截断
     * @returns
     */
    prependTraces: function (
      data: { [prop: string]: any[] },
      indices: number | number[],
      maxLength?: number
    ): Promise<Element> {
      return Plotly.prependTraces(_plotElement, data, indices, maxLength).then((element: Element) =>
        _updateTemplate(element)
      )
    },

    /**
     * 添加帧
     * @param frameList 帧列表
     * @param frameIndices 帧索引。未提供时则新增帧。如果提供则替换帧。
     */
    addFrames(frameList: PlotlyFrame[], frameIndices?: number[]) {
      return Plotly.addFrames(_plotElement, frameList, frameIndices)
    },

    /**
     *
     * @param frameOrGroupNameOrFrameList
     * @param animationOpts
     * @returns
     */
    animate(
      frameOrGroupNameOrFrameList: string | string[] | PlotlyFrame | PlotlyFrame[],
      animationOpts?: AnimationOpts
    ) {
      return Plotly.animate(_plotElement, frameOrGroupNameOrFrameList, animationOpts)
    },

    /**
     * 清空当前图表容器内容
     * @returns
     */
    purge: function (): Promise<Element> {
      return Plotly.purge(_plotElement).then((element: Element) => _updateTemplate(element))
    },

    /**
     * 将当前图表转为 Base64 图片
     * @param opts 图片配置信息
     * @returns 图片 Base64 字符串
     */
    toImage: function (opts: Omit<ToImageOptions, 'filename'>): Promise<Base64URLString> {
      return Plotly.toImage(_plotElement, opts)
    },

    /**
     *
     * @param opts 图片配置信息
     * @returns 图片名
     */
    downloadImage(opts: Omit<ToImageOptions, 'imageDataOnly'>): Promise<string> {
      return Plotly.downloadImage(_plotElement, opts)
    }
  }
}
