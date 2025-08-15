import { Color, PlotMarker } from 'plotly.js'
import { Font, PlotData } from './base'
export interface BarTrace extends Omit<PlotData, 'mode'> {
  type: 'scattergl' // webGL绘制的散点图
  legend: string // default: 'legend'。layout的legend属性的名称。layout的legend属性用于描述了图例的布局，允许定义多个legend属性，如：'legend’（默认），'legend1’，'legend2’

  /**
   * trace 图层权重
   * @default 0
   */
  zorder: number

  /**
   * 描述数据点的额外信息。可用于texttemplate、hovertemplate等属性。
   * @default ''
   */
  meta: string | number | string[]

  /**
   * 选中数据项的样式
   */
  selected: { marker: Pick<PlotMarker, 'color' | 'size' | 'opacity'>; textfont: { color: Color } }

  /**
   * 未选中数据项的样式
   */
  unselected: { marker: Pick<PlotMarker, 'color' | 'size' | 'opacity'>; textfont: { color: Color } }

  /**
   * 绘制的基线
   * 默认情况下，绘制的基线是0刻度线。借助base属性，可以改变绘制的基线。
   * 可以理解为主轴的偏移量。(主轴可通过orientation属性来设置)
   *
   * 例如，将base设置为-1，则绘制的基线为-1刻度线。
   * @default 0
   */
  base: number

  /**
   * 设置交叉轴的偏移量。（交叉轴指垂直于主轴的轴线）
   * 注意区分base属性。base属性设置的是主轴的偏移量，而offset属性设置交叉轴的偏移量。
   */
  offset: number | number[]

  /**
   * 将与同一位置轴或匹配轴相关联的多个轨迹划归至同一个对齐组。
   * 此设置对于柱形图位置范围的计算方式具有决定性作用，即决定
   * 柱形图是依据相关数据来计算其位置范围，还是独立进行位置范围的计算。
   */
  alignmentgroup: string

  /**
   * 将与同一位置轴或匹配轴相关的多个轨迹设置为相同的偏移组，这样同一位置坐标下的柱形图将能够排列整齐。
   * 设置此属性将使柱状堆叠，即堆叠柱状图。
   * 如果只对一个轨迹设置此属性，则其余轨迹将被设置为相同的偏移组。
   */
  offsetgroup: string

  /**
   * 设置文案的位置
   * 值域：
   * + inside: 文案在柱形图内部
   * + outside: 文案在柱形图外部，紧挨着条形的末端（如果需要，会进行缩放）。
   *      如果此条形上还叠加了其他条形，那么文本就会被推到内部。
   * + auto: 尝试将文案置于条形内部，但如果条形过小且没有其他条形叠加在此条形上，文本就会被移到外部。
   * + none: 不显示文案
   * @default 'auto'
   */
  textposition: 'inside' | 'outside' | 'auto' | 'none'

  /**
   * 设置text文案的旋转角度
   * @default 'auto'
   */
  textangle: number | 'auto'

  /**
   * 将条形图内部或外部的文字大小限制在不超出条形图本身的范围内。
   * @default 'both'
   */
  constraintext: 'inside' | 'outside' | 'both' | 'none'

  /**
   * 当textposition = 'inside'时，设置text文案在柱状图中的位置
   * @default 'end'
   */
  insidetextanchor: 'end' | 'middle' | 'start'

  /**
   * 设置柱状图内部文字的字体样式。其优先级高于textfont
   * @default 'auto'
   */
  insidetextfont: Partial<Font>

  /**
   * 设置柱状图外部文字的字体样式。其优先级高于textfont
   * @default 'auto'
   */
  outsidetextfont: Partial<Font>
}
