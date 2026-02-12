import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { BaseConfig, Transition } from '../base'
import LayoutTitle from './layout.title'
import LayoutLegend from './layout.legend'
import { Margin } from '../base'
import LayoutUniformtext from './layout.uniformtext'
import LayoutModeBar from './layout.mode.bar'
import LayoutInteraction from './layout.interaction'
import BaseHoverLabel from '../base.hover.label'
import { defineAsyncComponent } from 'vue'
import LayoutGrid from './layout.grid'
import { calendar } from '@/utils'
import LayoutBar from './layout.bar'
import LayoutAxis from './layout.axis'
import LayoutColorAxis from './layout.coloraxis'
import { Font } from '../base.font'

export default class Layout extends BaseConfig {
  constructor(parent: Attribute) {
    super(parent)
    this.insertAttribute(new LayoutTitle(parent))
    this.insertAttribute(
      new Attribute('showlegend', 'boolean', {
        parent: parent,
        description: {
          type: 'string',
          value:
            '是否显示图例。<br />' +
            '默认情况下，满足以下任意条件则会显示图例：<br />' +
            '1. 默认情况下，两个或多个图表。<br />' +
            '2. 渲染一个饼状图。<br />' +
            '3. 明确通过<code>showlegend:true</code>声明。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
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
            '（除非<a href="/#/docs/config/?id=layout-autosize"><code>layout.autosize=false</code></a>）。'
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
            '（除非<a href="/#/docs/config/?id=layout-autosize"><code>layout.autosize=false</code></a>）。'
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
            '<a href="/#/docs/config/?id=layout-width"><code>layout.width</code></a>和<a href="/#/docs/config/?id=layout-height"><code>layout.height</code></a>' +
            '进行自动调整以适应容器。<br />' +
            '注意，无论开或关闭，在初始化时都会对未进行声明的宽高进行自动调整。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    this.insertAttribute(
      new Font({
        name: 'font',
        options: {
          parent,
          description: {
            type: 'string',
            value: '全局字体样式。其他<code>Font</code>属性将继承此处的值并覆盖。'
          }
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
    this.insertAttribute(new BaseHoverLabel({ options: { parent } }))
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

    this.insertAttribute(
      new Attribute('template', 'Template', {
        parent,
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/layout/Template.vue'))
        }
      })
    )

    this.insertAttribute(new LayoutGrid(parent))

    this.insertAttribute(
      new Attribute(
        'calendar',
        { type: 'enum', value: calendar },
        {
          parent,
          description: { type: 'string', value: '设置默认日历系统。将影响日期的显示。' },
          controller: new AttributeController({
            type: 'select',
            default: 'gregorian',
            options: calendar
          })
        }
      )
    )

    this.insertAttribute(
      new Attribute('hidesources', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '是否在图表的右下角放置一个引用数据来源的文本链接。<br />' +
            '此设置仅对通过 Chart Studio Cloud（网址为 https://chart-studio.plotly.com 或本地部署）生成的图表有效。'
        },
        controller: new AttributeController({
          type: 'boolean',
          default: false
        })
      })
    )

    new LayoutBar(this, parent)

    this.insertAttribute(
      new Attribute('hiddenlabels', 'string[]', {
        parent,
        description: {
          type: 'string',
          value:
            '通过指定标签名称数组，隐藏饼图中对应的扇形区域以及标签。<br />' +
            '<span>注意：</span>仅适用于饼图和面积漏斗图。'
        },
        controller: new AttributeController({
          type: 'string',
          default: "['香蕉', '葡萄']",
          disabled: true
        }),
        initialConfig: {
          data: [
            { type: 'pie', values: [30, 25, 20, 15, 10], labels: ['苹果', '香蕉', '橙子', '葡萄', '芒果'], hole: 0.4 }
          ],
          layout: {
            title: { text: '水果销量占比（默认隐藏香蕉、葡萄）' },
            hiddenlabels: ['香蕉', '葡萄']
          }
        }
      })
    )

    this.insertAttribute(
      new Attribute(
        'boxmode',
        { type: 'enum', value: ['group', 'overlay'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '用于控制分组箱线图（Grouped Box Plots） 或分组小提琴图（Grouped Violin Plots） 中不同类别（或分组）的显示方式。<br />' +
              '可选项：' +
              '<ul>' +
              '<li><code>group</code> - 默认值。同一位置的不同分组并排显示。</li>' +
              '<li><code>overlay</code> - 同一位置的不同分组重叠显示，通过半透明效果区分。。</li>' +
              '</ul>'
          }
        }
      )
    )

    this.insertAttribute(
      new LayoutAxis('xaxis', parent, {
        type: 'string',
        value:
          '对默认 X 轴进行自定义。<br />如需自定义多个 X 轴，请使用 <code>layout.xaxis2</code>、<code>layout.xaxis3</code> 等属性来定义。'
      })
    )

    this.insertAttribute(
      new LayoutAxis('yaxis', parent, {
        type: 'string',
        value:
          '对默认 Y 轴进行自定义。<br />如需自定义多个 Y 轴，请使用 <code>layout.yaxis2</code>、<code>layout.yaxis3</code> 等属性来定义。'
      })
    )
    this.insertAttribute(
      new LayoutColorAxis('coloraxis', parent, {
        type: 'string',
        value:
          '对默认颜色轴进行自定义。<br />如需自定义多个颜色轴，请使用 <code>layout.coloraxis2</code>、<code>layout.coloraxis3</code> 等属性来定义。'
      })
    )
  }
}
