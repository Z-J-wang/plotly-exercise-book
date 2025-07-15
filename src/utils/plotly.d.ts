declare namespace PlotlyTypes {
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

  export interface TraceData {
    type: string
    x?: number[]
    y?: number[]
    z?: number[]
    mode?: string
    name?: string
    [prop: string]: string | number | boolean | {} | undefined | Array<any> | Function // 兼容Plotly的复杂配置
  }

  export interface Layout {
    title?: string | {}
    showlegend?: boolean
    legend?: {}
    margin?: {
      autoexpand?: boolean
      b?: number
      l?: number
      r?: number
      t?: number
      pad?: number
    }
    autosize?: boolean
    width?: number
    height?: number
    font?: {}
    uniformtext?: {}
    separators?: string
    paper_bgcolor?: string
    plot_bgcolor?: string
    autotypenumbers?: 'convert types' | 'strict'
    colorscale?: {}
    colorway?: {}
    modebar?: {}
    hovermode?: 'x' | 'y' | 'closest' | false | 'x unified' | 'y unified'
    hoversubplots?: 'single' | 'overlaying' | 'axis'
    clickmode?: 'event' | 'select' | 'event+select' | 'none'
    dragmode?:
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
    selectdirection?: 'h' | 'v' | 'd' | 'any'
    activeselection?: {}
    newselection?: {}

    // 添加索引签名允许任意Plotly布局属性
    [prop: string]: string | number | boolean | {} | undefined | Array<any> | Function // 兼容Plotly的复杂配置
  }

  export interface ModeBarButton {
    name: string // 按钮名称，同时充当ID
    title: string
    icon: Icons // Plotly.Icons
    gravity: string // icon 位置
    click: (gd: Element, ev: any) => void
    attr: string // 按钮关联属性
    val: any // attr属性的初始值
    toggle: boolean // 是否设为toggle按钮
  }

  // 编辑配置
  export interface EditConfig {
    annotationPosition: boolean // 确定注释的主要锚点是否可编辑。主要锚点对应于文本部分（如果没有箭头）或者箭头部分（通过拖动整个内容，但箭头的长度和方向保持不变）。
    annotationTail: boolean // 仅对带有箭头的注释进行编辑，可改变箭头的长度和方向。
    annotationText: boolean // 允许注释文本可编辑。
    axisTitleText: boolean // 允许轴标题可编辑。
    colorbarPosition: boolean // 允许颜色条位置可编辑。
    colorbarTitleText: boolean // 允许颜色条标题可编辑。
    legendPosition: boolean // 允许图例位置可编辑。
    legendText: boolean // 允许图例文本可编辑。
    shapePosition: boolean // 允许形状位置可编辑。
    titleText: boolean // 允许标题文本可编辑。
  }

  export interface Config {
    staticPlot: boolean // 默认值为false。是否使用静态模式，静态模式下图表无法交互
    typesetMath: boolean // 默认值 true。是否使用数学公式排版，支持 MathJax (either v2 or v3)
    plotlyServerURL: string // 默认值''。配置Plotly服务器URL。官方服务器地址：https://chart-studio.plotly.com
    editable: boolean // 默认值为false。 是否使用编辑模式。默认所有的编辑项都可以进行编辑。可通过edits参数进行细粒度的定义。
    edits: EditConfig // 对可编辑的项进行细致的定义
    editSelection: boolean // 默认值 true。允许移动选区
    autosizable: boolean // 默认值为false。是否允许图表根据布局参数“layout.autosize = true”进行绘制的，并据此推断出其容器的大小。
    responsive: boolean // 默认值为false。是否允许图表根据窗口大小重新绘制。在v3版本中，此属性被移出，且永久为true。
    frameMargins: number // 默认为0，取值范围 0-0.5。当“layout.autosize”选项开启时，需将边框间距设置为图表尺寸的某个比例值。
    scrollZoom: boolean | string // 默认值gl3d+geo+map。允许鼠标滚轮缩放或者双指缩放。其中值为 true，false以及 PlotlyGraphType 图表类型组合（如：gl3d+geo+map）
    doubleClick: // 默认值reset+autosize。定义鼠标双击的行为，仅限于笛卡尔积图表。
    | false
      | 'reset' // 重置图表坐标范围至初始值
      | 'autosize' // 重置图表，其值自动计算
      | 'reset+autosize'
    doubleClickDelay: number // 300ms。设置双击之间的间隔时间
    showAxisDragHandles: boolean // 默认值true。值为false时忽略笛卡尔积图表的平移/缩放拖拽手柄
    showAxisRangeEntryBoxes: boolean // 默认值true。值为false时忽略笛卡尔积图表的平移/缩放输入框
    showTips: boolean // 默认值true。值为false时隐藏右上角的提示框
    showLink: boolean // 默认值false。是否显示跳转到 Chart Studio Cloud 的链接。Chart Studio Cloud为云端图表编辑工具。
    linkText: string // 默认值“Edit chart”。 Chart Studio Cloud 的链接的文案。
    sendData: boolean // 默认值true。跳转到 Chart Studio Cloud 时是否携带数据。
    showSources: any // 默认值false。是否显示数据源。
    displayModeBar: 'hover' | true | false // 默认值'hover。是否显示右上角的工具栏。
    showSendToCloud: boolean // 默认值false。是否在modeBar显示发送到 Chart Studio Cloud 的按钮。需搭配plotlyServerURL属性使用。
    showEditInChartStudio: boolean // 默认值false。是否在modeBar显示编辑图表的按钮。需搭配plotlyServerURL属性使用。如果该属性和showSendToCloud属性都为true，则显示编辑图表的按钮。
    modeBarButtonsToRemove: string[] // 默认值[]。需要隐藏modeBar按钮列表。Plotly支持的按钮列表:https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
    modeBarButtonsToAdd: PlotlyModeBarButton[] // 默认值[]。需要添加的modeBar按钮列表。
    toImageButtonOptions: PlotlyModeBarButton // 默认值{}。覆盖toImage按钮的默认配置项。
    displaylogo: boolean // 默认值true。是否显示logo。
    watermark: boolean // 默认值false。是否显示水印。
    plotGlPixelRatio: number // 默认值2。取值范围1-4。设置WebGL图像导出时的像素比。
    setBackground: CSSProperties // 默认值'transparent'。设置图表的背景色。
    topojsonURL: string // 默认值'https://cdn.plot.ly/'。设置topojson文件的URL。
    mapboxAccessToken: null | string // 默认值null。设置Mapbox的访问令牌。
    logging: // 设置日志级别。
    | 0 // 关闭日志。
      | 1 // 输出警告和错误，但不包括信息性消息。
      | 2 // 详细日志

    queueLength: number // 默认值0。取值范围>=0。设置undo/redo队列长度。
    locale: string // 默认值'en-US'。设置语言。
    locales: { dictionary: any; format: any } // 默认值{}。设置本地化。
  }

  export interface Template {
    data: any[]
    layout: PlotlyLayout
  }

  export interface ToImageOptions {
    format?: 'png' | 'jpeg' | 'webp' | 'svg' | 'full-json'
    width?: number
    height?: number
    scale?: number
    filename?: string
    setBackground?: any
    imageDataOnly?: boolean // 仅返回图片数据。即不包含 base64 头
  }

  /**
   * template 校验结果数据类型
   */
  export type ValidateTemplateResult =
    | true
    | { code: 'missing' | 'unused' | 'reused' | 'noLayout' | 'noData'; msg: string }[]

  // Plotly 画面帧 数据类型
  export interface Frame {
    name?: string
    data: TraceData[]
    layout?: PlotlyLayout
    tracesIndices: number[]
    baseframe?: string
  }

  /**
   * 画面帧数据类型
   * 详见：https://github.com/plotly/plotly.js/blob/5e2163b2f3377187152bdfdffe1a9e64998ce5aa/src/plots/animation_attributes.js#L4
   */
  export interface AnimationOpts {
    mode: // 动画播放模式
    | 'immediate' // 打断当前帧，立即播放新帧
      | 'next' // 等待当前帧播放完后，再播放新帧
      | 'afterall' // 等待所有帧播放完毕后，再播放新帧
    direction: 'forward' | 'reverse' // 动画播放方向，向前或向后
    fromcurrent: boolean // 从当前帧开始播放帧，而不是开始播放
    frame: {
      duration: number // 每一帧的持续时间，单位ms
      redraw: boolean // 强制重新绘制整个图表
    }
    transition: {
      duration: number // 过渡的持续时间，单位ms
      easing: 'linear' | 'circle' | 'cubic' | 'elastic' | 'back' | 'bounce' // 动画缓动函数
    }
    ordering: 'layout first' | 'traces first'
  }
}
