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
  x: Datum[] | Datum[][] | TypedArray
  y: Datum[] | Datum[][] | TypedArray
  z: Datum[] | Datum[][] | Datum[][][] | TypedArray
  i: TypedArray
  j: TypedArray
  k: TypedArray
  xy: Float32Array
  error_x: ErrorBar
  error_y: ErrorBar
  xaxis: string
  yaxis: string
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
  marker: Partial<PlotMarker> | Partial<BoxPlotMarker>
  'marker.symbol': MarkerSymbol | MarkerSymbol[]
  'marker.color': Color
  'marker.colorscale': ColorScale | ColorScale[]
  'marker.opacity': number | number[]
  'marker.size': number | number[] | number[][]
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
  hovertemplate: string | string[]
  hovertext: string | string[]
  hoverongaps: boolean
  xhoverformat: string
  yhoverformat: string
  zhoverformat: string
  texttemplate: string | string[]
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
   * @requires
   */
  name: string
  stackgroup: string
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
  orientation: 'v' | 'h'
  width: number | number[]
  boxmean: boolean | 'sd'
  boxpoints: 'all' | 'outliers' | 'suspectedoutliers' | false
  jitter: number
  pointpos: number
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
