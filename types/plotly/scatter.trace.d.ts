import { PlotData } from './base'

export interface ScatterTrace extends PlotData {
  type: 'scatter'
  legend: string // default: 'legend'。layout的legend属性的名称。layout的legend属性用于描述了图例的布局，允许定义多个legend属性，如：'legend’（默认），'legend1’，'legend2’

  /**
   * trace 绘制模式
   * 如果轨迹的数据量小于于20，则默认采用“lines+markers”。其余情况为"lines".
   * @default "lines+markers" | "lines"
   */
  mode: 'lines' | 'markers' | 'text' | 'lines+markers' | 'text+markers' | 'text+lines' | 'text+lines+markers' | 'none'

  /**
   * trace 图层权重
   * @default 0
   */
  zorder: number

  /**
   * x轴的起始位置，需搭配dx属性使用。用于替代x属性。
   * 注意，使用x0和dy替代x属性时，必须使用y属性来声明y轴数据，因为需要通过y属性来确认数据长度。
   * @default 0
   */
  x0: number

  /**
   * x轴的间隔，需搭配x0属性使用。用于替代x属性。
   * 注意，使用x0和dy替代x属性时，必须使用y属性来声明y轴数据，因为需要通过y属性来确认数据长度。
   * @default 1
   */
  dx: number

  /**
   * y轴的间隔，需搭配y0属性使用。用于替代y属性。
   * 注意，使用y0和dx替代y属性时，必须使用x属性来声明x轴数据，因为需要通过x属性来确认数据长度。
   * @default 0
   */
  y0: number

  /**
   * y轴的间隔，需搭配y0属性使用。用于替代y属性。
   * 注意，使用y0和dx替代y属性时，必须使用x属性来声明x轴数据，因为需要通过x属性来确认数据长度。
   * @default 1
   */
  dy: number
}
