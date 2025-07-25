import {
  Image,
  Annotations,
  Axis,
  AxisType,
  Calendar,
  Color,
  DataTitle,
  Datum,
  Font,
  HoverLabel,
  LayoutAxis,
  Mapbox,
  Padding,
  PolarLayout,
  Scene,
  Shape,
  Slider,
  Template,
  Transition,
  UpdateMenu,
  Label,
  ModeBarDefaultButtons
} from 'plotly.js'

import { Margin } from './base'

export interface Legend extends Label {
  /**
   * legend 模块的边框宽度
   * @default 0
   */
  borderwidth: number

  /**
   * lengend 组别的点击行为
   * toggleitem：显示/隐藏点击的 item
   * togglegroup：显示/隐藏点击的 整个group
   * @default 'togglegroup'
   */
  groupclick: 'toggleitem' | 'togglegroup'

  /**
   * legend 组别的标题样式设置
   */
  grouptitlefont: Partial<Font>

  /**
   * item单击行为设置
   * toggle：显示/隐藏点击的 item
   * toggleothers：显示/隐藏点击的 item之外的 item
   * false：禁止点击
   */
  itemclick: 'toggle' | 'toggleothers' | false

  /**
   * item双击行为设置
   * toggle：显示/隐藏点击的 item
   * toggleothers：显示/隐藏点击的 item之外的 item
   * false：禁止点击
   */
  itemdoubleclick: 'toggle' | 'toggleothers' | false

  /**
   * 确定图例项的符号是与对应的trace属性成比例变化，还是保持 constant 状态，不受图表中符号大小的影响。
   * @default 'trace'
   */
  itemsizing: 'trace' | 'constant'

  /**
   * 图例项的宽度，单位为像素。
   * 值域：>= 30
   * @default 30
   */
  itemwidth: number

  /**
   * 设置图例的朝向
   */
  orientation: 'v' | 'h'

  /**
   * 添加图例的标题
   */
  title: Partial<LegendTitle>

  /**
   * 图例组的间隔
   * @default 10
   */
  tracegroupgap: number

  /**
   * 图例项的顺序规则。
   * 值域：
   * normal: 按照添加顺序显示
   * reversed: 按照添加顺序逆序显示
   * grouped: 按照添加顺序显示，但同一组内的项会按照添加顺序显示
   * grouped+reversed: 按照添加顺序逆序显示，但同一组内的项会按照添加顺序显示
   *
   * 如果不存在分组，则默认采用 normal。如果存在分组，则默认采用 grouped。
   */
  traceorder: 'grouped' | 'normal' | 'reversed' | 'reversed+grouped'

  /**
   * 控制与图例相关的显示状态变化的持久性，包括图例项和饼图标签的可见性。默认值为“layout.uirevision”。
   */
  uirevision: number | string
  uid: string

  /**
   * 设置符号相对于其关联文本的垂直对齐方式。
   */
  valign: 'top' | 'middle' | 'bottom'

  /**
   * 设置图例的在x轴方向上的相对于容器的位置。
   * 当“xref”为“paper”时，垂直图例的默认值为“1.02”，水平图例的默认值为“0”。
   * 当“xref”为“container”时，垂直图例的默认值为“1”，水平图例的默认值为“0”。
   * 如果“xref”为“container”，则该值必须在“0”到“1”之间；如果“xref”为“paper”，则该值必须在“-2”到“3”之间。
   *
   * 注意，容器的大小取决于xref的值。
   */
  x: number

  /**
   * 设置图例在x位置的对其方式
   * @default 'left'
   */
  xanchor: 'auto' | 'left' | 'center' | 'right'

  /**
   * 设置图例容器的宽度由什么决定。
   * container：整个图表元素的宽度
   * paper：绘图区域宽度
   */
  xref: 'container' | 'paper'
  y: number
  yanchor: 'auto' | 'top' | 'middle' | 'bottom'
  yref: 'container' | 'paper'
}

export interface LegendTitle {
  font: Partial<Font>

  /**
   * 图例标题位置
   */
  side: 'top' | 'left' | 'top left' | 'top center' | 'top right'
  text: string
}

export interface ModeBar {
  /**
   * 激活或者hover状态下按钮颜色
   */
  activecolor: Color

  /**
   * 添加预设按钮
   * @default ''
   */
  add: ModeBarDefaultButtons | ModeBarDefaultButtons[]
  bgcolor: Color

  /**
   * 默认状态下的颜色
   */
  color: Color

  /**
   * 排列方式
   */
  orientation: 'v' | 'h'

  /**
   * 移除预设按钮
   * @default ''
   */
  remove: ModeBarDefaultButtons | ModeBarDefaultButtons[]
  uirevision: number | string
  uid: string
}
// Layout
export interface Layout {
  /**
   * 设置 trace 的颜色值域
   * @default ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
   */
  colorway: string[]

  /**
   * 图表标题
   */
  title: Partial<{
    /**
     * 自动调整标题的外边距
     * 如果 `yref='paper'`，则边距会相应扩大，以确保标题不会与容器的边缘重叠。
     * 如果 `yref='container'`，则边距将确保标题不会与绘图区域、刻度标签和坐标轴标题重叠。
     * @default false
     */
    automargin: boolean
    text: string
    font: Partial<Font>

    /**
     * 设置标题容器的宽度由什么决定。
     * container：整个图表元素的宽度
     * paper：绘图区域宽度
     */
    xref: 'container' | 'paper'

    /**
     * 设置标题容器的高度由什么决定。
     * container：整个图表元素的高度
     * paper：绘图区域高度
     */
    yref: 'container' | 'paper'

    /**
     * 设置标题的在x轴方向上的相对于容器的位置。
     * 0 表示最左边，1 表示最右边。
     *
     * 注意，容器的大小取决于xref的值。
     *
     * @default 0.5 水平居中
     */
    x: number

    /**
     * 设置标题的在y轴方向上的相对于容器的位置。
     * 0 表示顶部，1 表示底部。
     *
     * 注意，容器的大小取决于yref的值。
     *
     * @default 0.5 水平居中
     */
    y: number

    /**
     * 设置标题在x位置的对其方式
     * @default 'auto'
     */
    xanchor: 'auto' | 'left' | 'center' | 'right'

    /**
     * 设置标题在y位置的对其方式
     * @default 'auto'
     */
    yanchor: 'auto' | 'top' | 'middle' | 'bottom'

    /**
     * 设置内边距
     */
    pad: Partial<Padding>

    /**
     * 设置副标题
     */
    subtitle: Partial<{
      text: string
      font: Partial<Font>
    }>
  }>

  /**
   *
   */
  autosize: boolean

  /**
   * 是否显示图例
   */
  showlegend: boolean

  /**
   * 设置整个图表的背景色
   */
  paper_bgcolor: Color

  /**
   * 绘图区域背景色
   * @default 'white'
   */
  plot_bgcolor: Color

  /**
   * 设置小数分隔符和千位分隔符。
   * 例如，“.”会在小数前放置一个“.”，并在千位之间设置一个空格。
   * 在英语区域设置中，默认设置为“.,”，但其他区域设置可能会更改此默认值。
   */
  separators: string
  hidesources: boolean
  xaxis: Partial<LayoutAxis>
  xaxis2: Partial<LayoutAxis>
  xaxis3: Partial<LayoutAxis>
  xaxis4: Partial<LayoutAxis>
  xaxis5: Partial<LayoutAxis>
  xaxis6: Partial<LayoutAxis>
  xaxis7: Partial<LayoutAxis>
  xaxis8: Partial<LayoutAxis>
  xaxis9: Partial<LayoutAxis>
  yaxis: Partial<LayoutAxis>
  yaxis2: Partial<LayoutAxis>
  yaxis3: Partial<LayoutAxis>
  yaxis4: Partial<LayoutAxis>
  yaxis5: Partial<LayoutAxis>
  yaxis6: Partial<LayoutAxis>
  yaxis7: Partial<LayoutAxis>
  yaxis8: Partial<LayoutAxis>
  yaxis9: Partial<LayoutAxis>
  margin: Partial<
    | Margin
    | {
        /**
         * 是否自动扩展。
         * 默认情况下，Legends, colorbars, updatemenus, sliders, axis rangeselector 和 rangeslider均可调整边距大小。
         */
        autoexpand: boolean
      }
  >

  /**
   * 设置绘图区域高度

   */
  height: number

  /**
   * 设置绘图区域宽度
   */
  width: number

  /**
   * 鼠标悬浮模式
   * 值域：
   *  - closest: 鼠标悬浮时，在最接近的点出显示弹窗
   *  - x: 鼠标悬浮时，当前 x 轴值域内的所有点处都显示弹窗
   *  - y: 鼠标悬浮时，当前 y 轴值域内的所有点处都显示弹窗
   *  - x unified: 鼠标悬浮时，将所有 x 轴值域内的点的信息集合到一个弹窗中显示
   *  - y unified: 鼠标悬浮时，将所有 y 轴值域内的点信息集合到一个弹窗中显示
   *  - false: 关闭鼠标悬浮功能
   */
  hovermode: 'closest' | 'x' | 'y' | 'x unified' | 'y unified' | false

  /**
   * 设置数据点hover的触发范围。数值越大，鼠标就可以在距离数据点越远的区域内触发hover事件。
   * @default 20
   */
  hoverdistance: number

  /**
   * hover 文案样式
   */
  hoverlabel: Partial<HoverLabel>
  calendar: Calendar

  // these are just the most common nested property updates that you might
  // want to pass to Plotly.relayout - *any* dotted property path through the
  // normal nested structure is valid here, and enumerating them all including
  // all possible [n] array indices would be infeasible (if it weren't for the
  // array indices, the pure a.b.c bit might be doable with conditional types)
  'xaxis.range': [Datum, Datum]
  'xaxis.range[0]': Datum
  'xaxis.range[1]': Datum
  'yaxis.range': [Datum, Datum]
  'yaxis.range[0]': Datum
  'yaxis.range[1]': Datum
  'yaxis.type': AxisType
  'xaxis.type': AxisType
  'xaxis.autorange': boolean
  'yaxis.autorange': boolean
  'xaxis.title': Partial<DataTitle>
  'yaxis.title': Partial<DataTitle>
  ternary: {} // TODO
  geo: {} // TODO
  mapbox: Partial<Mapbox>
  subplot: string
  radialaxis: Partial<Axis>
  angularaxis: {} // TODO

  /**
   * 拖拽模式
   */
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
  orientation: number
  annotations: Array<Partial<Annotations>>
  shapes: Array<Partial<Shape>>
  images: Array<Partial<Image>>
  updatemenus: Array<Partial<UpdateMenu>>
  sliders: Array<Partial<Slider>>

  /**
   * 图例模块设置
   */
  legend: Partial<Legend>

  /**
   * 设置全局字体样式
   */
  font: Partial<Font>
  scene: Partial<Scene>
  scene2: Partial<Scene>
  scene3: Partial<Scene>
  scene4: Partial<Scene>
  scene5: Partial<Scene>
  scene6: Partial<Scene>
  scene7: Partial<Scene>
  scene8: Partial<Scene>
  scene9: Partial<Scene>
  barmode: 'stack' | 'group' | 'overlay' | 'relative'
  barnorm: '' | 'fraction' | 'percent'
  bargap: number
  bargroupgap: number
  boxmode: 'group' | 'overlay'

  /**
   * 拖拽模式设置select情况下，设置拖拽方向
   */
  selectdirection: 'h' | 'v' | 'd' | 'any'

  /**
   * 设置选择框的样式
   */
  activeselection: {
    fillcolor: Color
    opacity: number
  }

  /**
   * 设置拖拽中的选择框的样式
   */
  newselection: {
    line: {
      color: Color
      dash: 'solid' | 'dot' | 'dash' | 'longdash' | 'dashdot' | 'longdashdot'
      width: number
    }

    /**
     * 描述了如何创建新的选区。
     * 如果选择“immediate”，则在首次点击鼠标后会创建一个新的选区。
     * 如果选择“gradual”，则在首次点击鼠标后不会创建新的选区。通过对初始选区进行添加和减去操作，此选项允许定义选区的额外轮廓。
     */
    mode: 'immediate' | 'gradual'
  }
  hiddenlabels: string[]
  grid: Partial<{
    rows: number
    roworder: 'top to bottom' | 'bottom to top'
    columns: number
    subplots: string[]
    xaxes: string[]
    yaxes: string[]
    pattern: 'independent' | 'coupled'
    xgap: number
    ygap: number
    domain: Partial<{
      x: number[]
      y: number[]
    }>
    xside: 'bottom' | 'bottom plot' | 'top plot' | 'top'
    yside: 'left' | 'left plot' | 'right plot' | 'right'
  }>
  polar: Partial<PolarLayout>
  polar2: Partial<PolarLayout>
  polar3: Partial<PolarLayout>
  polar4: Partial<PolarLayout>
  polar5: Partial<PolarLayout>
  polar6: Partial<PolarLayout>
  polar7: Partial<PolarLayout>
  polar8: Partial<PolarLayout>
  polar9: Partial<PolarLayout>

  /**
   * 设置通过Plotly.react更新图表时的过渡效果
   */
  transition: Transition

  /**
   * 指定要使用的模板。
   * 模板通过Plotly.makeTemplate方法创建。
   */
  template: Template

  /**
   * 鼠标点击模式
   * @default 'event'
   */
  clickmode: 'event' | 'select' | 'event+select' | 'none'

  /**
   * 用于在 `Plotly.react` 调用后，使绘图的用户交互状态得以保留，即便这些调用未考虑这些交互。
   * 若省略 `uirevision`，或者虽已指定但与上一次 `Plotly.react` 调用时的值不同，则将使用全新的图形。
   * 若 `uirevision` 为真值且未发生变化，那么任何受用户交互影响且在新图形中未被赋予不同值的属性，都将保留交互后的值。
   * `layout.uirevision` 属性可作为各个子容器中 `uirevision` 属性的默认值。如需更精细的控制，可直接设置这些子属性。
   * 例如，若您的应用分别控制 x 轴和 y 轴的数据，您可以将 `xaxis.uirevision` 设置为 “time”，将 `yaxis.uirevision` 设置为 “cost”。
   * 这样，若仅更改了 y 轴数据，您可以将 `yaxis.uirevision` 更新为 “quantity”，此时 y 轴范围将重置，但 x 轴范围将保留用户手动缩放的状态。
   */
  uirevision: number | string
  uid: string

  /**
   * 若提供了更改后的值，该值会告知 `Plotly.react` 一个或多个数据数组已发生更改。
   * 通过这种方式，您可以直接对数组进行就地修改，而非为进行增量更改而创建全新的副本。
   * 若未提供更改后的值，`Plotly.react` 会假定数据数组被视为不可变对象，
   * 因此，任何与前一个版本标识不同的数据数组都包含新数据。
   */
  datarevision: number | string

  /**
   * 控制用户在所有轨迹中选定的点处所做的更改的持久性。
   */
  editrevision: number | string

  /**
   * 控制用户在所有轨迹中选定的点处所做的更改的持久性。
   */
  selectionrevision: number | string
  modebar: Partial<ModeBar>
}
