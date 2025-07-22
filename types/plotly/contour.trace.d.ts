import { Color, Datum } from 'plotly.js'
import { Font, PlotData } from './base'

/**
 * 绘制 Contour 图（等高线图）
 */
export interface ContourTrace extends Omit<PlotData, 'mode' | 'text'> {
  type: 'contour'

  /**
   * 设置x轴。
   * 注意，这里的值仅仅时用来描述坐标轴。
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
   * 描述等高值的数值矩阵，数据结构是二维的值数组。
   * 数组长度对应y轴，子元素数组长度对应x轴。
   * 允许子数组值空缺或者为空。
   */
  z: Datum[][]

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
   * 确定轮廓级别属性是否由算法选定。若为“真”，则可在 `ncontours` 中设置轮廓级别的数量；若为“假”，则在 `contours` 中设置轮廓级别属性。
   */
  autocontour: boolean

  /**
   * 等高线样式设置
   */
  contours: Partial<{
    /**
     * 确定显示等高线值的着色方法。
     * 值域：
     * + fill：在每个等高线级别之间进行均匀着色；
     * + heatmap：在每个等高线级别之间应用热力图渐变着色；
     * + lines：在等高线上进行着色；
     * + none：不对该轨迹进行着色。
     * @default 'fill'
     */
    coloring: 'fill' | 'heatmap' | 'lines' | 'none'

    labelfont: Partial<Font>
    labelformat: string

    /**
     * 是否显示等高线标题
     * @default false
     */
    showlabels: boolean

    /**
     * 是否显示等高线
     * @default true
     */
    showlines: boolean

    /**
     * 设置每个等高线间的宽度
     */

    size: number
    /**
     * 等高线渲染类型
     * 值域：
     * + levels：数据将以包含多个层级的等高线图形式呈现。
     * + constraint：数据将以约束条件的形式呈现，无效区域将按照“operation”和“value”参数的指定进行阴影标注（着色）。
     *
     * @default 'levels'
     */
    type: 'levels' | 'constraint'

    /**
     * 当 contours.type 为 levels 时有效，表示等高线起始值。小于起始值的等高线不会渲染。
     */
    start: number

    /**
     * 当 contours.type 为 levels 时有效，表示等高线结束值。大于结束值的等高线不会渲染。
     */
    end: number

    /**
     * 当 contours.type 为 constraint 时有效，表示约束规则。
     * 值域说明：
     * + =：渲染等于 value 的等高线。
     * + <：渲染小于 value 的等高线。
     * + <=：渲染小于等于 value 的等高线。
     * + >：渲染大于 value 的等高线。
     * + >=：渲染大于等于 value 的等高线。
     * + '[]' | '()' | '[)' | '(]' : 渲染 value 区间内的等高线。
     * + '][' | ')(' | '](' | ')['： 渲染 value 区间外的等高线。
     * 说明：'[' | ']'表示闭区间，'(' | ')'表示开区间。开闭区间对渲染结果没有影响。
     */
    operation: '=' | '<' | '>=' | '>' | '<=' | '[]' | '()' | '[)' | '(]' | '][' | ')(' | '](' | ')['

    /**
     * 当 contours.type 为 constraint 时有效，设置约束边界的值。
     */
    value: number | [lowerBound: number, upperBound: number]
  }>

  /**
   *  当 contours.type 为 constraint 时有效，用于设置阴影的颜色。
   */
  fillcolor: Color

  /**
   * 设置等高线最大数量，用于计算等高线间得区间。
   * 计算方法：取z轴数据中的最大值-最小值的差值，将其除以ncontours求得各个等高线区间的跨度。
   * @default 15
   */
  ncontours: number

  /**
   * z轴数据，横纵坐标对调。
   * @default false
   */
  transpose: boolean
}
