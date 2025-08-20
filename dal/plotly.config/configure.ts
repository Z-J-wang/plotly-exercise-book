import Attribute from 'entities/attribute'
import { BaseConfig } from './base'
import ConfigEdits from './configure.edit'
import AttributeController from 'entities/attribute.controller'

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
  }
}
