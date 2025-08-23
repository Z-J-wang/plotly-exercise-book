import Attribute from 'entities/attribute'
import { BaseConfig } from './base'
import ConfigEdits from './configure.edit'
import AttributeController from 'entities/attribute.controller'
import ConfigureModeBar from './configure.mode.bar'

export default class Layout extends BaseConfig {
  constructor(parent: Attribute) {
    super(parent)
    this.insertAttribute(
      new Attribute('staticPlot', 'boolean', {
        parent,
        description: { type: 'string', value: '是否使用静态模式，静态模式下图表无法交互。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.insertAttribute(
      new Attribute('typesetMath', 'boolean', {
        parent,
        description: { type: 'string', value: '是否使用数学公式排版，支持 MathJax (either v2 or v3)' },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    this.insertAttribute(
      new Attribute('plotlyServerURL', 'string', {
        parent,
        description: {
          type: 'string',
          value: '配置 Plotly 服务器URL。官方服务器地址：https://chart-studio.plotly.com'
        },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )

    this.insertAttribute(
      new Attribute('editable', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '是否使用编辑模式。<br />当开启编辑模式后，默认所有的编辑项都可以进行编辑。可通过 <code>config.edits</code> 属性进行细粒度的定义。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.insertAttribute(new ConfigEdits(parent))

    this.insertAttribute(
      new Attribute('editSelection', 'boolean', {
        parent,
        description: { type: 'string', value: '允许移动选区' },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    this.insertAttribute(
      new Attribute('autosizable', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '是否允许图表根据布局参数<a href="/#/docs/config/?id=layout-autosize"><code>layout.autosize = true</code></a>进行绘制的，并据此推断出其容器的大小。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.insertAttribute(
      new Attribute('responsive', 'boolean', {
        parent,
        description: {
          type: 'string',
          value: '是否允许图表根据窗口大小重新绘制。<br />在 v3 版本中，此属性被移出，且永久为 true。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.insertAttribute(
      new Attribute('frameMargins', 'number', {
        parent,
        description: {
          type: 'string',
          value:
            '当 <a href="/#/docs/config/?id=layout-autosize"><code>layout.autosize</code></a> 选项开启时，需将边框间距设置为图表尺寸的某个比例值。' +
            '取值范围 <code>[0, 0.5]</code>。'
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0, max: 0.5, step: 0.01 })
      })
    )

    this.insertAttribute(
      new Attribute('scrollZoom', 'boolean | string', {
        parent,
        description: {
          type: 'string',
          value:
            '允许鼠标滚轮缩放或者双指缩放。<br />' +
            '其中值为 <code>true</code>，<code>false</code> 以及' +
            '<code>cartesian</code> | <code>gl3d</code> | <code>geo</code> | <code>mapbox</code> | <code>map</code>' +
            '5中图表类型组合（如：<code>gl3d+geo+map</code>）'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'gl3d+geo+map',
          options: [true, false, 'cartesian', 'gl3d', 'geo', 'mapbox', 'map', 'gl3d+geo+map']
        })
      })
    )

    this.insertAttribute(
      new Attribute(
        'doubleClick',
        { type: 'enum', value: [false, 'reset', 'autosize', 'reset+autosize'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '设置双击行为。' +
              '<ul>' +
              '<li><code>false</code>: 禁用双击。</li>' +
              '<li><code>reset</code>: 重置图表。</li>' +
              '<li><code>autosize</code>: 调整图表大小。</li>' +
              '<li><code>reset+autosize</code>: 重置图表，然后调整大小。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'reset+autosize',
            options: [false, 'reset', 'autosize', 'reset+autosize']
          })
        }
      )
    )

    this.insertAttribute(
      new Attribute('doubleClickDelay', 'number', {
        parent,
        description: { type: 'string', value: '双击图表的延迟时间（以毫秒为单位）。' },
        controller: new AttributeController({ type: 'number', default: 300, min: 0, step: 100 })
      })
    )

    this.insertAttribute(
      new Attribute('showAxisDragHandles', 'boolean', {
        parent,
        description: {
          type: 'string',
          value: '是否显示笛卡尔坐标轴的平移/缩放拖动控制手柄。开启后，鼠标移到坐标轴上，下按即可拖动轴来更改轴范围。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    this.insertAttribute(
      new Attribute('showAxisRangeEntryBoxes', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '是否显示轴范围输入框。开启后，鼠标移到坐标轴两端，下按即可激活轴范围输入框。<br />' +
            '<span class="font-bold">注意</span>，必须启用 <code>config.showAxisDragHandles</code> 才能使用此功能。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    this.insertAttribute(
      new Attribute('showTips', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '是否在右上角显示提示语。<br /><span class="font-bold">注意</span>，图表下载的提示语无法关闭。<br />' +
            '如何触发提示语显示：在初次缩放图表时，右上角显示提示语。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    this.insertAttribute(
      new Attribute('showLink', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '是否显示图表编辑链接。' +
            '跳转链接需通过<a href="/#/docs/config/?id=config-plotlyServerURL"><code>config.plotlyServerURL</code></a>属性来配置。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    this.insertAttribute(
      new Attribute('linkText', 'string', {
        parent,
        description: { type: 'string', value: '跳转到 Chart Studio Cloud 的链接文本。' },
        controller: new AttributeController({ type: 'string', default: 'Edit chart' })
      })
    )

    this.insertAttribute(
      new Attribute('sendData', 'boolean', {
        parent,
        description: {
          type: 'string',
          value: '如果<code>showLink = true</code>，是否包含链接到Chart Studio云文件的数据？'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    new ConfigureModeBar(this, parent)

    this.insertAttribute(
      new Attribute('plotGlPixelRatio', 'number', {
        parent,
        description: { type: 'string', value: '设置WebGL图像导出时的像素比。' },
        controller: new AttributeController({ type: 'number', default: 2, min: 1, max: 4 })
      })
    )

    this.insertAttribute(
      new Attribute('topojsonURL', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            '设置地图图表的 topojson 文件的读取地址。' +
            '默认情况下，topojson 文件是从 cdn.plot.ly 获取的。' +
            '例如，将此选项设置为：<path-to-plotly.js>/dist/topojson/，就可以使用plotly.js模块附带的topojson文件来渲染地理特征。'
        },
        controller: new AttributeController({ type: 'string', default: 'https://cdn.plot.ly/' })
      })
    )

    this.insertAttribute(
      new Attribute('mapboxAccessToken', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            'Mapbox 访问令牌（用于绘制 Mapbox 路线类型）。' +
            '若使用 Mapbox Atlas 服务器，请将此选项设置为<code>""</code> ，' +
            '这样 plotly.js 就不会尝试向公共 Mapbox 服务器进行身份验证了。'
        }
      })
    )

    this.insertAttribute(
      new Attribute(
        'logging',
        { type: 'enum', value: [0, 1, 2] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '设置日志级别。' +
              '<ul>' +
              '<li><code>0</code> - 关闭日志。</li>' +
              '<li><code>1</code> - 输出警告和错误，但不包括信息性消息。</li>' +
              '<li><code>2</code> - 详细日志。</li>' +
              '</ul>'
          }
        }
      )
    )

    this.insertAttribute(
      new Attribute(
        'notifyOnLogging',
        { type: 'enum', value: [0, 1, 2] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '设置图形日志记录（通知）级别。此属性只能通过<code>Plotly.setPlotConfig</code>来设置。' +
              '<ul>' +
              '<li><code>0</code> - 关闭日志。</li>' +
              '<li><code>1</code> - 输出警告和错误，但不包括信息性消息。</li>' +
              '<li><code>2</code> - 详细日志。</li>' +
              '</ul>'
          }
        }
      )
    )

    this.insertAttribute(
      new Attribute('queueLength', 'number', {
        parent,
        description: { type: 'string', value: '设置undo/redo队列长度。取值范围: <code> >= 0 </code>' }
      })
    )

    this.insertAttribute(
      new Attribute('locale', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            '设置图表语言。默认采用<code>en-US</code>。切换语言环境需先安装对应的语言包。' +
            '详见：<a href="https://plotly.com/javascript/configuration-options/#change-the-default-locale" target="_blank">change-the-default-locale</a>'
        }
      })
    )
  }
}
