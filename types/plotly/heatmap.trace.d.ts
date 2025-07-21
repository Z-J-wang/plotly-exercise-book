import { Color, DataTitle, Datum, PlotMarker } from 'plotly.js'
import { Font, PlotData } from './base'

export interface HeatmapTrace extends Omit<PlotData, 'mode' | 'text'> {
  type: 'heatmap' // webGL绘制的散点图

  /**
   * 设置x轴。
   * 注意，这里的值仅仅时用来描述坐标轴。z为一维数组时，x必须提供。
   */
  x: Datum[]

  /**
   * 替代“x”。构建 x 坐标的线性空间。与“dx”一起使用时，其中“x0”为起始坐标，“dx”为步长。
   * @default 0
   */
  x0: Datum

  /**
   * x轴的步长。
   * @default 1
   */
  dx: number

  /**
   * 如果选择“array”模式，热图的 x 坐标由“x”给出（当提供“x”时，这是默认行为）。
   * 如果选择“scaled”模式，热图的 x 坐标则由“x0”和“dx”给出（当未提供“x”时，这是默认行为）。
   */
  xtype: 'array' | 'scaled'

  /**
   * 设置水平间距
   * @default 0
   */
  xgap: number

  /**
   * 设置y轴。
   * 注意，这里的值仅仅时用来描述坐标轴。z为一维数组时，y必须提供。
   */
  y: Datum[]

  /**
   * 替代“y”。构建 y 坐标的线性空间。与“dy”一起使用时，其中“y0”为起始坐标，“dy”为步长。
   * @default 0
   */
  y0: Datum

  /**
   * y轴步长
   * @default 1
   */
  dy: Datum

  /**
   * 如果选择“array”模式，热图的 y 坐标由“y”给出（当提供“y”时，这是默认行为）。
   * 如果选择“scaled”模式，热图的 y 坐标则由“y0”和“dy”给出（当未提供“y”时，这是默认行为）。
   */
  ytype: 'array' | 'scaled'

  /**
   * 设置水平间距
   * @default 0
   */
  ygap: number

  /**
   * 描述热图值与颜色映射关系的数据。数值越大，颜色越深。
   * 在“z”中存储的数据既可以是二维的值数组（可能是不规则的，也可能是规则的），也可以是单维的值数组。
   * 如果“z”是一个二维数组，假设它有 N 行和 M 列。那么，默认情况下，生成的热图将在 y 轴上有 N 个分
   * 区，在 x 轴上有 M 个分区。换句话说，数组“z”中的第 i 行/第 j 列单元格将映射到 y 轴的第 i 个分
   * 区（从图的底部开始）和 x 轴的第 j 个分区（从图的左侧开始）。这种行为可以通过使用“transpose”来
   * 反转。此外，“x”（“y”）可以提供 M 或 M+1（N 或 N+1）个元素。如果 M（N），那么坐标对应于热图单
   * 元格的中心，且单元格具有相等的宽度。如果 M+1（N+1），那么坐标对应于热图单元格的边缘。如果“z”是
   * 一个一维数组，那么在“x”和“y”中必须分别提供 M 或 M+1（N 或 N+1）个元素，以形成数据三元组。
   */
  z: Datum[] | Datum[][]

  /**
   * 设置以每个z值关联的文本。
   */
  text: Datum[] | Datum[][]

  /**
   * 指定coloraxis要采用哪种layout.coloraxis配置。值为‘coloraxis’时，指向layout.coloraxis。值为'coloraxis2'时，指向layout.coloraxis2，以此类推
   * @default 'x'
   */
  coloraxis: string

  /**
   * 需明确颜色渐变图所采用的调色板情况，即判断其使用的是默认调色板（对应“autocolorscale：true”），还是由“colorscale”参数所确定的调色板。
   * 若“colorscale”参数未被指定，或者“autocolorscale”取值为“true”，那么需依据“color”数组中数字的正负情况来选择默认调色板。
   * 具体而言，当“color”数组中的数字全部为正数、全部为负数或正负混合时，分别按照相应规则选择默认调色板 。
   */
  autocolorscale: boolean

  /**
   * 确定颜色域的计算是基于输入数据（此处为“z”）进行的，还是基于在“zmin”和“zmax”中设定的范围进行的。
   * 当用户设置了“zmin”和“zmax”时，默认值为“false”。
   * @default true
   */
  zauto: boolean

  /**
   * 通过将 `zmin` 和/或 `zmax` 进行缩放，使颜色域的中点与该点保持等距。
   * 该值应与 `z` 中的单位相同。当 `zauto` 为 `false` 时，此操作将不起作用。
   */
  zmid: number

  /**
   * z轴数据，横纵坐标对调。
   * @default false
   */
  transpose: boolean
}
