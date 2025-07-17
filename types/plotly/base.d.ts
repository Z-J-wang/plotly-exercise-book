import {
  Color,
  ColorBar,
  ColorScale,
  Dash,
  DataTitle,
  Datum,
  Delta,
  ErrorBar,
  Font,
  Gauge,
  HoverLabel,
  MarkerSymbol,
  Pattern,
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
  error_x: ErrorBar
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
  line: Partial<ScatterLine>
  'line.color': Color
  'line.width': number
  'line.dash': Dash
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
  'marker.colorscale': ColorScale | ColorScale[]

  /**
   * 数据点透明度
   * 既可以是具体某个透明度，也可以是候为数组，数组长度必须等于数据长度。
   */
  'marker.opacity': number | number[]

  /**
   * 数据点大小
   * 既可以是具体某个大小，也可以是候为数组，数组长度必须等于数据长度。
   */
  'marker.size': number | number[] | number[][]

  /**
   * 数据点最大显示数量。0表示无限制。
   * @default 0
   */
  'marker.maxdisplayed': number
  'marker.sizeref': number
  'marker.sizemax': number
  'marker.sizemin': number
  'marker.sizemode': 'diameter' | 'area'
  'marker.showscale': boolean
  'marker.line': Partial<ScatterMarkerLine>
  'marker.line.color': Color
  'marker.line.colorscale': ColorScale | ColorScale[]
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
  textfont: Partial<Font>
  textangle: 'auto' | number
  insidetextanchor: 'end' | 'middle' | 'start'
  constraintext: 'inside' | 'outside' | 'both' | 'none'
  fill: 'none' | 'tozeroy' | 'tozerox' | 'tonexty' | 'tonextx' | 'toself' | 'tonext'
  fillcolor: string
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
    font?: Partial<
      Font & {
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
    >
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
  stackgaps: 'infer zero' | 'interpolate'
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
