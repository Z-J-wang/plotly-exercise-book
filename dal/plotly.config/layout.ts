import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { BaseConfig, Transition } from './base'
import LayoutTitle from './layout.title'
import LayoutLegend from './layout.legend'
import { Margin, Font } from './base'
import LayoutUniformtext from './layout.uniformtext'
import LayoutModeBar from './layout.mode.bar'
import LayoutInteraction from './layout.interaction'
import LayoutHoverLabel from './layout.hover.label'
import DataRevisionComp from '@/components/doc/layout/DataRevision.vue'
import { defineAsyncComponent } from 'vue'

export default class Layout extends BaseConfig {
  constructor(parent: Attribute) {
    super(parent)
    this.insertAttribute(new LayoutTitle(parent))
    this.insertAttribute(
      new Attribute('showlegend', 'boolean', {
        parent: parent,
        description: {
          type: 'string',
          value: [
            '是否显示图例。<br />',
            '默认情况下，满足以下任意条件则会显示图例：<br />',
            '1. 默认情况下，两个或多个图表。<br />',
            '2. 渲染一个饼状图。<br />',
            '3. 明确通过<code>showlegend:true</code>声明。<br />'
          ]
        },
        controller: new AttributeController({
          type: 'boolean',
          default: true
        })
      })
    )
    this.insertAttribute(new LayoutLegend(parent))

    const margin = new Margin('margin', 'Margin', {
      parent: parent,
      description: {
        type: 'string',
        value: '设置绘图区域外边距，即绘图区域与容器的边界之间的距离。'
      }
    })

    margin.addChild(
      new Attribute('autoexpand', 'boolean', {
        parent: margin,
        description: {
          type: 'string',
          value:
            '自动扩展外边距。默认开启。<br />' +
            '开启后，外边距会根据图表内容自动调整影响因素包括：' +
            '图例、颜色条、更新菜单、滑块、坐标范围选择器和范围滑块。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )
    this.insertAttribute(margin)

    this.insertAttribute(
      new Attribute('width', 'number', {
        parent: parent,
        description: {
          type: 'string',
          value:
            '图表宽度，单位为<code>px</code>，其值需大于<code>10</code>。<br />' +
            '未设置时，默认为<code>700</code>，但是会根据容器宽度进行自适应' +
            '（除非<a href="#layout-autosize"><code>layout.autosize=false</code></a>）。'
        },
        controller: new AttributeController({ type: 'number', default: 700, min: 10 })
      })
    )
    this.insertAttribute(
      new Attribute('height', 'number', {
        parent: parent,
        description: {
          type: 'string',
          value:
            '图表高度，单位为<code>px</code>，其值需大于<code>10</code>。<br />' +
            '未设置时，默认为<code>450</code>，但是会根据容器宽高度度进行自适应' +
            '（除非<a href="#layout-autosize"><code>layout.autosize=false</code></a>）。'
        },
        controller: new AttributeController({ type: 'number', default: 450, min: 10 })
      })
    )

    this.insertAttribute(
      new Attribute('autosize', 'boolean', {
        parent: parent,
        description: {
          type: 'string',
          value:
            '开启后，图表会对未进行显性声明的' +
            '<a href="#layout-width"><code>layout.width</code></a>和<a href="#layout-height"><code>layout.height</code></a>' +
            '进行自动调整以适应容器。<br />' +
            '注意，无论开或关闭，在初始化时都会对未进行声明的宽高进行自动调整。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    this.insertAttribute(
      new Font('font', 'Font', {
        parent,
        description: {
          type: 'string',
          value: '全局字体样式。其他<code>Font</code>属性将继承此处的值并覆盖。'
        }
      })
    )

    this.insertAttribute(new LayoutUniformtext(parent))

    this.insertAttribute(
      new Attribute('separators', 'string', {
        parent,
        description: {
          type: 'string',
          value:
            '设置小数分隔符和千位分隔符。<br />' +
            '其值由两个字符组成。第一个字符用于充当小数分隔符；第二个字符用于充当千分位分隔符。<br />' +
            '不同语言区域默认分割符不同。在英语汉语区域中，默认设置为<code>.,</code>。'
        },
        controller: new AttributeController({ type: 'string', default: '.,' })
      })
    )

    this.insertAttribute(
      new Attribute('paper_bgcolor', 'Color', {
        parent,
        description: { type: 'string', value: '容器背景色' },
        controller: new AttributeController({ type: 'color', default: 'white' })
      })
    )

    this.insertAttribute(
      new Attribute('plot_bgcolor', 'Color', {
        parent,
        description: { type: 'string', value: '绘图区域背景色' },
        controller: new AttributeController({ type: 'color', default: 'white' })
      })
    )

    this.insertAttribute(
      new Attribute('colorway', 'ColorList', {
        parent,
        description: {
          type: 'string',
          value:
            '设置默认的轨迹颜色方案。系统会自动根据该属性的值来选取轨迹的颜色。<br />' +
            "默认值为：<code>['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']</code>。"
        }
        // controller: new AttributeController({ type: 'colorlist', default: null })
      })
    )

    this.insertAttribute(new LayoutModeBar(parent))

    new LayoutInteraction(this, parent)
    this.insertAttribute(new LayoutHoverLabel(parent))
    this.insertAttribute(
      new Transition('transition', 'Transition', {
        parent,
        description: { type: 'string', value: '设置在<code>Plotly.react</code>更新过程中的过渡效果。' }
      })
    )

    this.insertAttribute(
      new Attribute('datarevision', 'number|string', {
        parent,
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/layout/DataRevision.vue'))
        }
      })
    )

    this.insertAttribute(
      new Attribute('uirevision', 'number|string', {
        parent,
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/layout/UiRevision.vue'))
        }
      })
    )

    this.insertAttribute(
      new Attribute('editrevision', 'number | string', {
        parent,
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/layout/EditRevision.vue'))
        }
      })
    )

    this.insertAttribute(
      new Attribute('selectionrevision', 'number | string', {
        parent,
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/layout/SelectionRevision.vue'))
        }
      })
    )
  }
}
