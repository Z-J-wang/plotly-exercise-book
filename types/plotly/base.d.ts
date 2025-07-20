import {
  Color,
  ColorBar,
  ColorScale,
  Dash,
  DataTitle,
  Datum,
  Delta,
  Gauge,
  HoverLabel,
  MarkerSymbol,
  Pattern,
  Font as BaseFont,
  PlotMarker,
  PlotNumber,
  PlotType,
  ScatterLine,
  ScatterMarkerLine,
  TypedArray
} from 'plotly.js'
import { BoxPlotMarker } from 'plotly.js/lib/box'

// Plotly 支持的图表类型
export type PlotlyGraphType =
  | 'cartesian' // 笛卡尔图表
  | 'gl3d' // 3D 图表
  | 'geo' // 地图
  | 'mapbox'
  | 'map'

export type Icons =
  | 'undo'
  | 'home'
  | 'camera-retro'
  | 'zoombox'
  | 'pan'
  | 'zoom_plus'
  | 'zoom_minus'
  | 'autoscale'
  | 'tooltip_basic'
  | 'tooltip_compare'
  | 'plotlylogo'
  | 'z-axis'
  | '3d_rotate'
  | 'camera'
  | 'movie'
  | 'question'
  | 'disk'
  | 'drawopenpath'
  | 'drawclosedpath'
  | 'lasso'
  | 'selectbox'
  | 'drawline'
  | 'drawrect'
  | 'drawcircle'
  | 'eraseshape'
  | 'spikeline'
  | 'pencil'
  | 'newplotlylogo'

export interface Font extends BaseFont {
  /**
   * 修饰线的位置
   * @default 'none'
   */
  lineposition:
    | 'none'
    | 'under'
    | 'over'
    | 'through'
    | 'under+over'
    | 'under+through'
    | 'over+through'
    | 'over+through+under'

  /**
   * 单词样式。分斜体和正常两种。
   * @default 'normal'
   */
  style: 'italic' | 'normal'

  /**
   * 字体大小写。分正常、大写、大写、小写四种。
   * @default 'normal'
   */
  textcase: 'normal' | 'word caps' | 'upper' | 'lower'

  /**
   * 字体变体。
   *
   * 值域说明：
   *    'normal': 关闭一切特殊字符变体的使用。
   *    'small-caps': 允许小型大写字母的使用（OpenType 特性：smcp）。小型大写字母指使用大写形式，但尺寸与对应小写字母相同的字母。
   *    'all-small-caps': 将大小写字母全部转化为小型大写字母。
   *    'all-petite-caps': 将大小写字母全部转化为小型大写字母。
   *    'petite-caps': 允许特小型大写字母的使用。
   *    'unicase': 允许将大写字母转化为小型大写字母与普通小写字母的混用。
   *
   * @default 'normal'
   */
  variant: 'normal' | 'normal' | 'small-caps' | 'all-small-caps' | 'all-petite-caps' | 'petite-caps' | 'unicase'
}

/**
 * 误差信息配置项
 */
export interface ErrorOptions {
  visible: boolean

  /**
   * 误差条左右对称
   */
  symmetric: boolean
  color: Color

  /**
   * 误差条的厚度
   * @default 2
   */
  thickness: number

  /**
   * 误差条两端横杠宽度
   * @default 1
   */
  width: number
}

export type ErrorBar = Partial<ErrorOptions> &
  (
    | {
        /**
         * 明确用于生成误差条的规则：
         * 1. 若选择“constant”选项，误差条的长度将维持恒定不变。请在“value”字段中设置该常量数值。
         * 2. 若选择“percent”选项，误差条的长度与基础数据呈百分比对应关系。需在“value”字段中设定此百分比数值。
         * 3. 若选择“data”选项，误差条的长度依据所设置的“array”数据来确定。
         */
        type: 'constant' | 'percent'
        value: number
        /**
         * 为每个误差条的left/bottom（水平/垂直方向上）设置长度。数值相对于 value 数据。
         * value 数据只是定义了误差条的right/top（水平/垂直方向上）的长度。由于
         * 默认采用开启左右对称模式（即，symmetric=true）,系统自动根据 value 补充了arrayminus（即自动填充了left/bottom 的数据）。
         *
         * @default undefined
         */
        valueminus?: number | undefined
      }
    | {
        type: 'data'
        array: Datum[]
        /**
         * 为每个误差条的left/bottom（水平/垂直方向上）设置长度。数值相对于 array 数据。
         * 实际上，array 数据只是定义了误差条的right/top（水平/垂直方向上）的长度。由于
         * 默认采用开启左右对称模式（即，symmetric=true）,系统自动根据array补充了arrayminus（即自动填充了left/bottom 的数据）。
         *
         * @default undefined
         */
        arrayminus?: Datum[] | undefined
      }
  )

export interface PlotData {
  type: PlotType
  /**
   * x轴数据
   */
  x: Datum[] | Datum[][] | TypedArray
  y: Datum[] | Datum[][] | TypedArray
  z: Datum[] | Datum[][] | Datum[][][] | TypedArray
  i: TypedArray
  j: TypedArray
  k: TypedArray
  xy: Float32Array

  /**
   * x轴误差条设置
   */
  error_x: ErrorBar

  /**
   * y轴误差条设置
   */
  error_y: ErrorBar

  /**
   * 指定x轴要采用哪种layout.yaxis配置。值为‘x’时，指向layout.yaxis。值为'x2'时，指向layout.yaxis2，以此类推
   * @default 'x'
   */
  xaxis: string

  /**
   * x轴与layout.xaxis的映射关系。值为‘x’时，指向layout.xaxis。值为'x2'时，指向layout.xaxis2，以此类推
   * @default 'x'
   */
  yaxis: string

  /**
   * 指定y轴要采用哪种layout.xaxis配置。值为‘x’时，指向layout.xaxis。值为'x2'时，指向layout.xaxis2，以此类推
   * @default 'x'
   */
  text: string | string[]
  lat: Datum[]
  lon: Datum[]

  /**
   * 折线的样式设置
   */
  line: Partial<ScatterLine>
  'line.color': Color
  'line.width': number

  /**
   * 折线样式。可将折现设置为实线、虚线等等。
   * @default 'solid'
   */
  'line.dash': Dash

  /**
   * 折线形状。例如：锐角线，抛物线等等
   * @default 'linear'
   */
  'line.shape': 'linear' | 'spline' | 'hv' | 'vh' | 'hvh' | 'vhv'
  'line.smoothing': number
  'line.simplify': boolean

  /**
   * 数据点样式
   */
  marker: Partial<PlotMarker> | Partial<BoxPlotMarker>

  /**
   * 数据点类型，分为空心圆、实心圆、三角形等等。
   * 详见： https://plotly.com/javascript/reference/scatter/#scatter-marker-symbol
   * @default 'circle'
   */
  'marker.symbol': MarkerSymbol | MarkerSymbol[]

  /**
   * 数据点颜色
   * 既可以具体某个颜色，也可以是候为数组，数组长度必须等于数据长度。
   */
  'marker.color': Color

  /**
   * 数据点色阶，只有 marker.color的值为数字数组时，marker.colorscale才有效。
   */
  'marker.colorscale': ColorScale | ColorScale[]

  /**
   * 数据点透明度
   * 既可以是具体某个透明度，也可以是候为数组，数组长度必须等于数据长度。
   */
  'marker.opacity': number | number[]

  /**
   * 数据点大小
   * 既可以是具体某个大小，也可以是候为数组，数组长度必须等于数据长度。
   * @default 6
   */
  'marker.size': number | number[] | number[][]

  /**
   * 数据点最大显示数量。0表示无限制。
   * @default 0
   */
  'marker.maxdisplayed': number

  /**
   * 用于确定标记点渲染大小的缩放因子。
   * 只有在将 `marker.size` 设置为数值数组时才有效。
   * 与 `sizemin` 和 `sizemode` 一起使用。
   */
  'marker.sizeref': number

  /**
   * 数据点最大尺寸
   * 只有在将 `marker.size` 设置为数值数组时才有效。
   * TODO 无效
   */
  'marker.sizemax': number

  /**
   * 数据点最小尺寸
   * 只有在将 `marker.size` 设置为数值数组时才有效。
   * @default 0
   */
  'marker.sizemin': number

  /**
   * 设置将 `size` 中的数据转换为像素的规则。
   * 只有将 `marker.size` 设置为数值数组时才有效。
   * 可选择：
   *  'diameter' - 以直径计算大小。
   *  'area' - 以面积计算大小。
   * @default 'diameter'
   */
  'marker.sizemode': 'diameter' | 'area'

  /**
   * 是否显示数据点颜色条
   * 只有marker.color为数值数组时，marker.showscale才有效。
   */
  'marker.showscale': boolean

  /**
   * 数据点边框样式
   */
  'marker.line': Partial<ScatterMarkerLine>

  /**
   * 数据点边框颜色
   */
  'marker.line.color': Color

  /**
   * 数据点边框色阶。
   * 只有marker.line.color为数值数组时，marker.line.colorscale才有效。
   */
  'marker.line.colorscale': ColorScale | ColorScale[]

  /**
   * 数据点颜色条
   */
  'marker.colorbar': {}

  'marker.pad.t': number
  'marker.pad.b': number
  'marker.pad.l': number
  'marker.pad.r': number

  /**
   * trace 绘制模式
   */
  mode:
    | 'lines'
    | 'markers'
    | 'text'
    | 'lines+markers'
    | 'text+markers'
    | 'text+lines'
    | 'text+lines+markers'
    | 'none'
    | 'gauge'
    | 'number'
    | 'delta'
    | 'number+delta'
    | 'gauge+number'
    | 'gauge+number+delta'
    | 'gauge+delta'
  histfunc: 'count' | 'sum' | 'avg' | 'min' | 'max'
  histnorm: '' | 'percent' | 'probability' | 'density' | 'probability density'

  /**
   * 鼠标悬浮触发位置
   * 值域：
   *  + 'points'：鼠标悬浮到点上时，显示数据点信息
   *  + 'fills'：鼠标悬浮到填充区域上时，显示区域信息
   * @default 'points+fills'
   */
  hoveron: 'points' | 'fills'

  /**
   * 设置hover弹窗显示的信息。
   * @default 'all'
   */
  hoverinfo:
    | 'all'
    | 'name'
    | 'none'
    | 'skip'
    | 'text'
    | 'x'
    | 'x+text'
    | 'x+name'
    | 'x+y'
    | 'x+y+text'
    | 'x+y+name'
    | 'x+y+z'
    | 'x+y+z+text'
    | 'x+y+z+name'
    | 'y'
    | 'y+name'
    | 'y+x'
    | 'y+text'
    | 'y+x+text'
    | 'y+x+name'
    | 'y+z'
    | 'y+z+text'
    | 'y+z+name'
    | 'y+x+z'
    | 'y+x+z+text'
    | 'y+x+z+name'
    | 'z'
    | 'z+x'
    | 'z+x+text'
    | 'z+x+name'
    | 'z+y+x'
    | 'z+y+x+text'
    | 'z+y+x+name'
    | 'z+x+y'
    | 'z+x+y+text'
    | 'z+x+y+name'

  /***
   * hover 弹窗label样式设置
   */
  hoverlabel: Partial<HoverLabel>

  /**
   * hover显示模板
   * 需通过`%{variable}`接收变量，如："y: %{y}"。此属性会覆盖hoverinfo属性。
   * @default ''
   */
  hovertemplate: string | string[]

  /**
   * hover显示文本
   * @default ''
   */
  hovertext: string | string[]
  hoverongaps: boolean

  /**
   * x轴数据格式化模板
   * @default ''
   */
  xhoverformat: string

  /**
   * y轴数据格式化模板
   * @default ''
   */
  yhoverformat: string

  /**
   * z轴数据格式化模板
   * @default ''
   */
  zhoverformat: string

  /**
   * 文本模板
   * 需通过`%{variable}`接收变量，如："y: %{y}"
   * @default ''
   */
  texttemplate: string | string[]

  /**
   * 设置text信息的构成
   * @default 'label+text'
   */
  textinfo:
    | 'label'
    | 'label+text'
    | 'label+value'
    | 'label+percent'
    | 'label+text+value'
    | 'label+text+percent'
    | 'label+value+percent'
    | 'text'
    | 'text+value'
    | 'text+percent'
    | 'text+value+percent'
    | 'value'
    | 'value+percent'
    | 'percent'
    | 'none'

  /**
   * 显示文本的位置
   * @default 'middle center'
   */
  textposition:
    | 'top left'
    | 'top center'
    | 'top right'
    | 'middle left'
    | 'middle center'
    | 'middle right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'
    | 'inside'
    | 'outside'
    | 'auto'
    | 'none'

  /**
   * text 属性文本样式
   */
  textfont: Partial<Font>
  textangle: 'auto' | number
  insidetextanchor: 'end' | 'middle' | 'start'
  constraintext: 'inside' | 'outside' | 'both' | 'none'

  /**
   * 设置用于填充的区域颜色。
   * 默认情况下为“none”。如果此轨迹是堆叠的，'orientation = v'则默认值为 tonexty;
   *    'orientation = h'则默认值为 tonextx。
   * 不同填充模式的具体行为
   * + “tozerox”和“tozeroy”模式：“tozerox”模式下，填充将进行至 x = 0 的位置；“tozeroy”模式下，填充将进行至 y = 0 的位置。
   * + “tonextx”和“tonexty”模式：这两种模式下，填充区域位于本轨迹的端点与前一轨迹的端点之间，通过直线连接这些端点来生成堆叠区域图。若此前不存在轨迹，“tonextx”和“tonexty”的行为与“tozerox”和“tozeroy”相同，即分别填充至 x = 0 和 y = 0 的位置。
   * + “toself”模式：此模式会将轨迹的端点（若轨迹存在间隔，则为轨迹的每个段）连接形成一个封闭图形。需注意，“toself”模式不适用于一个轨迹未完全包围另一个轨迹的情况。
   * + “tonext”模式：当两个轨迹中一个完全包围另一个（如连续的等高线情况）时，“tonext”模式会在这两个轨迹之间填充空间，其行为与“toself”类似。若此前没有轨迹，“tonext”的行为与“tozerox”和“tozeroy”相同，即分别填充至 x = 0 和 y = 0 的位置。
   *
   * stackgroup”相关规则
   * + 处于“stackgroup”中的轨迹，其填充操作仅针对同一组中的其他轨迹，即只会填充到同一组中的其他轨迹，或被同一组中的其他轨迹填充。
   * + 在存在多个“stackgroup”，或部分轨迹堆叠而部分未堆叠的复杂情况下，如果填充关联的轨迹尚未连续，那么在绘制顺序中，较晚出现的轨迹将向下移动，以确保填充效果的合理性与准确性。
   */
  fill: 'none' | 'tozeroy' | 'tozerox' | 'tonexty' | 'tonextx' | 'toself' | 'tonext'

  /**
   * 设置填充颜色。
   * 默认情况下，会使用线条颜色、标记颜色或标记线条颜色的半透明变体（视可用性而定）。
   * 如果指定了“fillgradient”，则“fillcolor”将被忽略，但会用于设置鼠标悬停标签的背景颜色（如果有）。
   */
  fillcolor: string

  /**
   * 设置填充区域的图案以及样式
   */
  fillpattern: Partial<Pattern>

  /**
   * 显示图例
   * @default true
   */
  showlegend: boolean

  /**
   * 图例组别名称。用于图例分组。
   * 同一个组别的图例会集合到一起。切换图例项时，同一图例组的轨迹和形状部分同时隐藏/显示。
   * @default ''
   */
  legendgroup: string

  /**
   * 图例组的标题。
   * 注意，分组最后一个trace的 legendgrouptitle 属性会覆盖前面的trace的 legendgrouptitle 属性。
   * @default {}
   */
  legendgrouptitle: {
    text: string // default: ''。标题文案
    font?: Partial<Font>
  }

  /**
   * 图例的级别（权重），默认1000，数字越小越靠前。
   * 注意，排序仅限于同一legend下。
   * @default 1000
   */
  legendrank: number
  parents: string[]

  /**
   * trace名称，name 会作为图例名且在鼠标hover显示。
   * @default ''
   */
  name: string

  /**
   * 堆叠组名称
   * 将多个散点轨迹（位于同一子图中）设置为相同的堆叠组，以便将其y值（若`orientation`为“h”则为x值）相加。
   * 若此项为空或省略，则该轨迹将不会被堆叠。默认情况下，堆叠会启用`fill`，若`orientation`为“h”（“v”），
   * 则使用“tonexty”（“tonextx”），并将默认`mode`设置为“lines”，无论点数多少。堆叠仅适用于数值（线性或对数）轴。
   * 同一`stackgroup`中的轨迹仅会填充或被填充到同组中的其他轨迹。在存在多个`stackgroup`或部分轨迹堆叠而部分未堆叠的情况下，
   * 若填充关联的轨迹未连续排列，后续轨迹将在绘制顺序中被下移。
   * @default ''
   */
  stackgroup: string

  /**
   * 堆叠模式。需配合stackgroup属性。
   * 当值为'fraction'|'percent'时，堆叠模式为会改为计算当前方向上每个stack的占比。
   * 'fraction'小数值表示占比。'percent'百分比值表示占比。
   *
   * @default ''
   */
  groupnorm: '' | 'fraction' | 'percent'

  /**
   * 只有在使用“stackgroup”时才适用，并且只会使用“stackgroup”中找到的第一个“stackgaps”。
   * 堆叠模式下，如何处理本组中其他图例项有数据而本项没有的数据位置。
   * 使用“infer zero”时，在这些位置插入一个零值。
   * 使用“interpolate”时，我们在现有值之间进行线性插值，并在现有值之外进行恒定值的外推。
   * @default 'infer zero'
   */
  stackgaps: 'infer zero' | 'interpolate'

  /**
   * 是否连接缺失数据点。
   * 即，如果x或者y轴数据有缺失值，则将缺失值设置前后数值的平均值。
   * @default false
   */
  connectgaps: boolean

  /**
   * 是否显示当前 trace。
   * 当值为 legendonly 时不渲染 trace但是在图例中显示
   * @default true
   */
  visible: boolean | 'legendonly'
  delta: Partial<Delta>
  gauge: Partial<Gauge>
  number: Partial<PlotNumber>

  /**
   * 堆叠图的朝向，需搭配 stackgroup 属性使用。
   * @default 'v'
   */
  orientation: 'v' | 'h'
  width: number | number[]
  boxmean: boolean | 'sd'
  boxpoints: 'all' | 'outliers' | 'suspectedoutliers' | false
  jitter: number
  pointpos: number

  /**
   * 设置透明度，包含trace和图例透明度。
   * @default 1
   */
  opacity: number
  showscale: boolean
  colorscale: ColorScale
  zsmooth: 'fast' | 'best' | false
  zmin: number
  zmax: number
  ygap: number
  xgap: number
  transpose: boolean
  autobinx: boolean
  xbins: {
    start: number | string
    end: number | string
    size: number | string
  }
  value: number
  values: Datum[]
  labels: Datum[]
  direction: 'clockwise' | 'counterclockwise'
  hole: number
  rotation: number
  theta: Datum[]
  r: Datum[]

  /**
   * 自定义数据项
   */
  customdata: Datum[] | Datum[][]

  /**
   * 选中的数据项
   * 建议使用数据点下标
   * @default []
   */
  selectedpoints: Datum[]
  domain: Partial<{
    row: number
    column: number
    x: number[]
    y: number[]
  }>
  title: Partial<DataTitle>
  branchvalues: 'total' | 'remainder'

  /**
   * 数据项的标识符
   */
  ids: string[]
  level: string

  /**
   * 确定标记和文本节点是否围绕子图坐标轴进行裁剪。
   * @default true
   */
  cliponaxis: boolean
  automargin: boolean
  locationmode: 'ISO-3' | 'USA-states' | 'country names' | 'geojson-id'
  locations: Datum[]
  reversescale: boolean
  colorbar: Partial<ColorBar>
  offset: number | number[]
  contours: Partial<{
    coloring: 'fill' | 'heatmap' | 'lines' | 'none'
    end: number
    labelfont: Partial<Font>
    labelformat: string
    operation: '=' | '<' | '>=' | '>' | '<=' | '[]' | '()' | '[)' | '(]' | '][' | ')(' | '](' | ')['
    showlabels: boolean
    showlines: boolean
    size: number
    start: number
    type: 'levels' | 'constraint'
    value: number | [lowerBound: number, upperBound: number]
  }>
  autocontour: boolean
  ncontours: number
  maxdepth: number
  uirevision: string | number
  uid: string
}
