import { Color, Datum } from 'plotly.js'
import { Font, PlotData } from './base'

export interface BaseRow {
  align: 'left' | 'center' | 'right'

  /**
   * 单元格填充颜色
   * @default 'white'
   */
  fill: {
    color: Color | Color[]
  }

  font: Font

  /**
   * 格式化字符串。采用d3-format格式化语法。
   * 详见：https://d3.nodejs.cn/d3-format
   *
   */
  format: string[]

  /**
   * 单元格高度。单位px.
   * @default 20
   */
  height: number

  /**
   * 单元格分割线样式
   */
  line: {
    color: Color
    width: number
  }

  /**
   * 单元格前缀
   */
  prefix: string | string[]

  /**
   * 单元格后缀
   */
  suffix: string | string[]

  /**
   * 单元格值。要求是一个二维数组。
   * 数组中的每一行对应表格的一列。即values[m][n]中的m表示第m列，n表示第n行。
   */
  values: Datum[]
}

/**
 * 绘制表格视图
 */
export interface TableTrace
  extends Pick<
    PlotData,
    | 'name'
    | 'visible'
    | 'legend'
    | 'legendrank'
    | 'legendgrouptitle'
    | 'ids'
    | 'meta'
    | 'customdata'
    | 'domain'
    | 'hoverlabel'
  > {
  type: 'table'

  /**
   * 指定列的顺序。
   */
  columnorder: number[]

  /**
   * 列的宽度。
   * 接收的值是相对于默认宽度的比例值。如：0.1表示默认宽度的十分之一；2表示默认宽度的2倍。
   */
  columnwidth: number[]
  cells: BaseRow

  header: BaseRow
}
