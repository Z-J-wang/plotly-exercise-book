import Attribute from 'entities/attribute'
import { Font } from '../base'
import AttributeController from 'entities/attribute.controller'

class LegendTitle extends Attribute {
  constructor(parent: Attribute | null) {
    super('title', 'LegendTitle', {
      parent,
      description: { type: 'string', value: '设置图例模块的总标题。' }
    })
    this.addChild(
      new Attribute('text', 'string', {
        parent: this,
        description: { type: 'string', value: '图例模块标题文本' },
        controller: new AttributeController({ type: 'string', default: '' })
      })
    )
    this.addChild(
      new Attribute(
        'side',
        { type: 'enum', value: ['top', 'left', 'top left', 'top center', 'top right'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '确定图例标题相对于图例项的位置。当<code>orientation="h"</code>（水平方向）时，默认位置为<code>top</code>；' +
              '当<code>orientation="v"</code>（垂直方向）时，默认位置为<code>left</code>。' +
              '<code>top left</code>选项可用于扩展，<code>top center</code>和<code>top right</code>选项用于在水平对齐的图例区域中同时进行 x 轴和 y 轴方向的定位。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'top',
            options: ['top', 'left', 'top left', 'top center', 'top right']
          })
        }
      )
    )
    this.addChild(
      new Font('font', 'Font', { parent: this, description: { type: 'string', value: '设置图例模块标题字体样式。' } })
    )
  }
}

export default class Legend extends Attribute {
  constructor(parent: Attribute, description: Attribute.Description = { type: 'string', value: '图例样式定义。' }) {
    super('legend', 'Legend', { parent, description })

    this.addChild(
      new Attribute('bgcolor', 'Color', {
        parent: this,
        description: {
          type: 'string',
          value:
            '图例背景颜色。默认值等同于<a href="/#/docs/config/?id=layout-paper_bgcolor"><code>layout.paper_bgcolor</code></a>的值。'
        },
        controller: new AttributeController({
          type: 'color',
          default: 'white'
        })
      })
    )

    this.addChild(
      new Attribute('bordercolor', 'Color', {
        parent: this,
        description: {
          type: 'string',
          value: '图例边框颜色。'
        },
        controller: new AttributeController({
          type: 'color',
          default: '#444'
        })
      })
    )

    this.addChild(
      new Attribute('borderwidth', 'number', {
        parent: this,
        description: {
          type: 'string',
          value: '图例边框宽度。'
        },
        controller: new AttributeController({
          type: 'number',
          default: 0,
          min: 0,
          step: 1
        })
      })
    )

    this.addChild(
      new Attribute(
        'entrywidthmode',
        { type: 'enum', value: ['fraction', 'pixels'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '<span class="font-bold">未试验出实际效果，需进一步核验！</span><br/>' + '图例项宽度的模式。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'pixels',
            options: ['fraction', 'pixels']
          })
        }
      )
    )

    this.addChild(
      new Attribute('entrywidth', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '<span class="font-bold">未试验出实际效果，需进一步核验！</span><br/>' +
            '设置图例的宽度（以像素或分数表示）。当<code>entrywidthmode</code>设置为<code>pixels</code>时，' +
            '使用 0 可根据文本宽度来确定条目的大小。'
        },
        controller: new AttributeController({
          type: 'number',
          default: 0,
          min: 0,
          step: 1
        })
      })
    )

    this.addChild(
      new Font('font', 'Font', { parent: this, description: { type: 'string', value: '设置图例字体样式。' } })
    )

    this.addChild(
      new Attribute(
        'groupclick',
        { type: 'enum', value: ['toggleitem', 'togglegroup'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例分组点击单击形式设置' +
              '<ul>' +
              '<li><code>toggleitem</code> - 显示/隐藏点击的 item。</li>' +
              '<li><code>togglegroup</code> - 显示/隐藏点击的 group。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'togglegroup',
            options: ['toggleitem', 'togglegroup']
          })
        }
      )
    )

    this.addChild(
      new Font('grouptitlefont', 'Font', {
        parent: this,
        description: { type: 'string', value: '图例组标题字体样式设置。' }
      })
    )

    this.addChild(
      new Attribute('indentation', 'number', {
        parent: this,
        description: { type: 'string', value: '图例组标题缩进量，单位为像素。其值需大于等于<code>-15</code>。' },
        controller: new AttributeController({ type: 'number', default: 0, min: -15, step: 1 })
      })
    )

    this.addChild(
      new Attribute(
        'itemclick',
        { type: 'enum', value: ['toggle', 'toggleothers', false] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例组点击事件。<br />' +
              '<ul>' +
              '<li><code>toggle</code> - 默认值。点击图例组时，图例组内所有图例项都会被切换。</li>' +
              '<li><code>toggleothers</code> - 点击图例组时，除了当前图例组，其他图例组都会被切换。</li>' +
              '<li><code>false</code> - 禁用点击</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'toggle',
            options: ['toggle', 'toggleothers', false]
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'itemdoubleclick',
        { type: 'enum', value: ['toggle', 'toggleothers', false] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例组双击击事件。<br />' +
              '<ul>' +
              '<li><code>toggle</code> - 默认值。双击图例组时，图例组内所有图例项都会被切换。</li>' +
              '<li><code>toggleothers</code> - 双击图例组时，除了当前图例组，其他图例组都会被切换。</li>' +
              '<li><code>false</code> - 禁用双击</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'toggleothers',
            options: ['toggle', 'toggleothers', false]
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'itemsizing',
        { type: 'enum', value: ['trace', 'constant'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例项大小设置: <br />' +
              '<ul>' +
              '<li><code>trace</code> - 图例项大小会根据图例项的符号的宽度或高度而变化。</li>' +
              '<li><code>constant</code> - 图例项大小不会根据图例项的符号的宽度或高度而变化。</li>' +
              '</ul>'
          },
          controller: new AttributeController({ type: 'select', default: 'trace', options: ['trace', 'constant'] })
        }
      )
    )

    this.addChild(
      new Attribute('itemwidth', 'number', {
        parent: this,
        description: { type: 'string', value: '图例项宽度，单位<code>px</code>。其值<code>>=30</code>' },
        controller: new AttributeController({ type: 'number', default: 30, min: 30, step: 1 })
      })
    )

    this.addChild(
      new Attribute(
        'orientation',
        { type: 'enum', value: ['v', 'h'] },
        {
          parent: this,
          description: { type: 'string', value: '图例项排布方向。分为垂直<code>v</code>和水平<code>h</code>两种。' },
          controller: new AttributeController({ type: 'select', default: 'v', options: ['v', 'h'] })
        }
      )
    )

    this.addChild(new LegendTitle(this))

    this.addChild(
      new Attribute('tracegroupgap', 'number', {
        parent: this,
        description: { type: 'string', value: '图例组之间的间隔' },
        controller: new AttributeController({ type: 'number', default: 10, min: 0, step: 1 })
      })
    )

    this.addChild(
      new Attribute(
        'traceorder',
        { type: 'enum', value: ['grouped', 'normal', 'reversed', 'reversed+grouped'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '图例项的顺序规则。如果不存在分组，则默认采用<code>normal</code>。如果存在分组，则默认采用<code>grouped</code>。' +
              '可选值：' +
              '<ul>' +
              '<li><code>normal</code> - 按照添加顺序正序显示</li>' +
              '<li><code>reversed</code> - 按照添加顺序逆序显示</li>' +
              '<li><code>grouped</code> - 组别按照添加顺序正序显示，同一组中的项同样按照添加顺序正序显示</li>' +
              '<li><code>reversed+grouped</code> - 组别按照添加顺序逆序显示，同一组中的项同样按照添加顺序逆序显示</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: null,
            options: ['normal', 'grouped', 'reversed', 'reversed+grouped']
          })
        }
      )
    )

    this.addChild(
      new Attribute('uirevision', 'string', {
        parent: this,
        description: {
          type: 'string',
          value:
            '控制与图例相关的显示状态变化的持久性，包括图例项和饼图标签的可见性。' +
            '默认值等同于<code>layout.uirevision</code>属性的值。'
        }
      })
    )

    this.addChild(
      new Attribute(
        'valign',
        { type: 'enum', value: ['top', 'middle', 'bottom'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置图例项的符号相对于其关联文本的垂直对齐方式。<br />' +
              '可选值：' +
              '<ul>' +
              '<li><code>top</code> - 顶部对齐。</li>' +
              '<li><code>middle</code> - 中间对齐。</li>' +
              '<li><code>bottom</code> - 底部对齐。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'middle',
            options: ['top', 'middle', 'bottom']
          })
        }
      )
    )

    this.addChild(
      new Attribute('visible', 'boolean', {
        parent: this,
        description: { type: 'string', value: '是否显示图例模块' },
        controller: new AttributeController({
          type: 'boolean',
          default: true
        })
      })
    )

    this.addChild(
      new Attribute('x', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '设置图例模块在参考系的水平方向上的位置。参考系由<a href="/#/docs/config/?id=layout-legend-xref"><code>layout.legend.xref</code></a>的值决定。具体如下：<br />' +
            '<ul>' +
            "<li><code>layout.legend.xref = 'paper'</code>时，" +
            '值域为<code>[-2, 3]</code>。' +
            "垂直图例（<a href='#layout-legend-orientation'><code>layout.legend.orientation='v'</code></a>）的默认值为<code>1.02</code>；" +
            "水平图例（<a href='#layout-legend-orientation'><code>layout.legend.orientation='h'</code></a>）的默认值为<code>0</code>。</li>" +
            "<li><code>layout.legend.xref = 'container'</code>时，" +
            '值域为<code>[0, 1]</code>。' +
            '垂直图例的默认值为<code>1</code>；' +
            '水平图例的默认值为<code>0</code>。</li>' +
            '</ul>'
        },
        controller: new AttributeController({
          type: 'number',
          default: null,
          step: 0.1
        })
      })
    )

    this.addChild(
      new Attribute(
        'xref',
        { type: 'enum', value: ['container', 'paper'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置<code>layout.legend.x</code>属性的参考系。<code>container</code>：整个图表元素的宽度; <code>paper</code>：绘图区域宽度。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'paper',
            options: ['container', 'paper']
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'xanchor',
        { type: 'enum', value: ['auto', 'left', 'center', 'right'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '设置图例模块在水平方向上相对于<code>layout.legend.x</code>属性设置的位置的对齐方式。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'left',
            options: ['auto', 'left', 'center', 'right']
          })
        }
      )
    )

    this.addChild(
      new Attribute('y', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '设置图例模块在参考系的垂直方向上的位置。参考系由<a href="/#/docs/config/?id=layout-legend-yref"><code>layout.legend.yref</code></a>的值决定。具体如下：<br />' +
            '<ul>' +
            "<li><code>layout.legend.yref = 'paper'</code>时，" +
            '值域为<code>[-2, 3]</code>。' +
            "垂直图例（<a href='#layout-legend-orientation'><code>layout.legend.orientation='v'</code></a>）的默认值为<code>1</code>；" +
            "水平图例（<a href='#layout-legend-orientation'><code>layout.legend.orientation='h'</code></a>），" +
            '在没有范围滑块的图表中默认值为<code>-0.1</code>，有在范围滑块的图表中默认值为<code>1.1</code></li>' +
            "<li><code>layout.legend.yref = 'container'</code>时，" +
            '值域为<code>[0, 1]</code>。' +
            '垂直图例的默认值为<code>0</code>；' +
            '水平图例的默认值为<code>0</code>。</li>' +
            '</ul>'
        },
        controller: new AttributeController({
          type: 'number',
          default: null,
          step: 0.1
        })
      })
    )

    this.addChild(
      new Attribute(
        'yref',
        { type: 'enum', value: ['container', 'paper'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置<code>layout.legend.y</code>属性的参考系。<code>container</code>：整个图表元素的宽度; <code>paper</code>：绘图区域宽度。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'paper',
            options: ['container', 'paper']
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'yanchor',
        { type: 'enum', value: ['auto', 'top', 'middle', 'bottom'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '设置图例模块在垂直方向上相对于<code>layout.legend.y</code>属性设置的位置的对齐方式。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'auto',
            options: ['auto', 'top', 'middle', 'bottom']
          })
        }
      )
    )
  }
}
