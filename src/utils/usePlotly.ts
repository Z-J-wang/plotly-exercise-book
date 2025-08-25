import type { Config, Data, Layout } from 'plotly.js'
import Plotly from 'plotly.js-cartesian-dist'
import { ref } from 'vue'
import type { Ref } from 'vue'

export interface UsePlotly {
  plotly: Promise<Plotly.PlotlyHTMLElement>
  plotlyTemplate: Ref<Plotly.Template | null>

  /**
   * 使用 react 方法绘制图表
   * @param {array of objects} data trace 数组，一个 trace 对象描述一个数据系列
   * @param {object} layout 描述图表的布局
   * @param {object} config 描述图表的配置
   * 详见：https://plotly.com/javascript/plotlyjs-function-reference/#plotlyreact
   */
  react: (data: Plotly.Data[], layout?: Partial<Layout>, config?: Partial<Config>) => Promise<Plotly.PlotlyHTMLElement>

  /**
   * 重新绘制指定的trace
   * @param tracesData trace 描述信息，注意不能传递x,y,z轴数据
   * @param traceIndices 指定要重新绘制的trace的索引，索引起始值为0
   */
  restyle: (traceData: Data, traceIndices?: number | number[]) => Promise<Plotly.PlotlyHTMLElement>

  /**
   * 根据新的layout，重新绘制当前图表
   * @param layout 描述图表的布局
   */
  relayout: (layout: Partial<Partial<Layout>>) => Promise<Plotly.PlotlyHTMLElement>

  /**
   * restyle 和 relayout 的结合体
   * @param traceData trace 描述信息，注意不能传递x,y,z轴数据
   * @param layout 描述图表的布局
   * @param traceIndices 指定要重新绘制的trace的索引，索引起始值为0
   */
  update: (
    traceData: Partial<Data>,
    layout: Partial<Partial<Layout>>,
    traceIndices?: number | number[]
  ) => Promise<Plotly.PlotlyHTMLElement>

  /**
   * 校验 template 是否适用于当前图表
   * @param template
   * @returns 校验结果
   */
  validateTemplate: (template: Plotly.Template) => Plotly.ValidateTemplateResult[]

  /**
   * 添加新的 trace 数据
   * @param traces
   * @param newIndices 可选，指定新 trace 插入的位置
   */
  addTraces: (traces: Plotly.Data | Plotly.Data[], newIndices?: number | number[]) => Promise<Plotly.PlotlyHTMLElement>

  /**
   * 删除指定 trace 数据
   * @param traceIndices 要删除的 trace index，支持正反序。如 0 | -1 | [-2,-1]
   */
  deleteTraces: (traceIndices: number | number[]) => Promise<Plotly.PlotlyHTMLElement>

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
  moveTraces: (
    currentTraceIndices: number | number[],
    newTraceIndices?: number | number[]
  ) => Promise<Plotly.PlotlyHTMLElement>

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
  extendTraces: (
    update: Plotly.Data | Plotly.Data[],
    indices: number | number[],
    maxLength?: number
  ) => Promise<Plotly.PlotlyHTMLElement>

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
  prependTraces: (update: Plotly.Data | Plotly.Data[], indices: number | number[]) => Promise<Plotly.PlotlyHTMLElement>

  /**
   * 添加帧
   * @param frameList 帧列表
   */
  addFrames: (frameList: Plotly.Frame[]) => Promise<Plotly.PlotlyHTMLElement>

  /**
   * 切换帧
   * @param frameOrGroupNameOrFrameList
   * @param animationOpts
   * @returns
   */
  animate: (
    frameOrGroupNameOrFrameList: string | string[] | Partial<Plotly.Frame> | Partial<Plotly.Frame>[],
    animationOpts?: Partial<Plotly.AnimationOpts>
  ) => Promise<void>

  /**
   * 清空当前图表容器内容
   * @returns
   */
  purge: () => void

  /**
   * 将当前图表转为 Base64 图片
   * @param opts 图片配置信息
   * @returns 图片 Base64 字符串
   */
  toImage: (opts: Plotly.ToImgopts) => Promise<Base64URLString>

  /**
   * 下载图片
   * @param opts 图片配置信息
   * @returns 图片名
   */
  downloadImage: (opts: Plotly.DownloadImgopts) => Promise<string>
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
  gd: Plotly.Root,
  data: Partial<Data>[],
  useReact: boolean = false,
  layout?: Partial<Layout>,
  config?: Partial<Config>
): UsePlotly {
  let plotly: Promise<Plotly.PlotlyHTMLElement>
  const plotlyTemplate = ref<Plotly.Template | null>(null)
  let _plotElement: Plotly.Root
  if (useReact) {
    plotly = Plotly.react(gd, data, layout, config)
  } else {
    plotly = Plotly.newPlot(gd, data, layout, config)
  }

  plotly.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))

  function _updateTemplate(plotElement: Plotly.PlotlyHTMLElement) {
    _plotElement = plotElement
    plotlyTemplate.value = Plotly.makeTemplate(plotElement)
  }

  return {
    plotly,
    plotlyTemplate,
    react(data, layout, config) {
      const promise = Plotly.react(gd, data, layout, config)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    restyle(traceData, traceIndices) {
      const promise = Plotly.restyle(gd, traceData, traceIndices)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    relayout(layout) {
      const promise = Plotly.relayout(gd, layout)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    update(traceData, layout, traceIndices) {
      const promise = Plotly.update(gd, traceData, layout, traceIndices)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    validateTemplate(template) {
      return Plotly.validateTemplate(_plotElement, template)
    },
    addTraces(traces, newIndices) {
      const promise = Plotly.addTraces(_plotElement, traces, newIndices)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    deleteTraces(traceIndices) {
      const promise = Plotly.deleteTraces(_plotElement, traceIndices)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    moveTraces(currentTraceIndices, newTraceIndices) {
      const promise = Plotly.moveTraces(_plotElement, currentTraceIndices, newTraceIndices)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    extendTraces(update, indices, maxLength) {
      const promise = Plotly.extendTraces(_plotElement, update, indices, maxLength)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    prependTraces(update, indices) {
      const promise = Plotly.prependTraces(_plotElement, update, indices)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    addFrames(frameList) {
      const promise = Plotly.addFrames(_plotElement, frameList)
      promise.then((element: Plotly.PlotlyHTMLElement) => _updateTemplate(element))
      return promise
    },
    animate(frameOrGroupNameOrFrameList, animationOpts) {
      return Plotly.animate(_plotElement, frameOrGroupNameOrFrameList, animationOpts)
    },
    purge() {
      Plotly.purge(_plotElement)
    },
    toImage(opts) {
      return Plotly.toImage(_plotElement, opts)
    },
    downloadImage(opts) {
      return Plotly.downloadImage(_plotElement, opts)
    }
  }
}
