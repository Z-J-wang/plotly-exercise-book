import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import { merge } from 'lodash'

export default class BaseMarkerColoBar extends Attribute {
  constructor(parent: Attribute, description?: Attribute.Description, initialConfig?: PlotlyConfig) {
    super('colorbar', 'ColorBar', {
      parent,
      description: description || {
        type: 'string',
        value: '颜色条样式设置。因为颜色标尺在颜色条中显示，所以<code>marker.showscale</code>属性会影响颜色条的显示。'
      },
      initialConfig
    })

    this.addChild(
      new Attribute('bgcolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '颜色条背景色' },
        controller: new AttributeController({ type: 'color', default: '#ffffff' })
      })
    )

    this.addChild(
      new Attribute(
        'orientation',
        { type: 'enum', value: ['h', 'v'] },
        {
          parent: this,
          description: { type: 'string', value: '颜色条方向。' },
          controller: new AttributeController({ type: 'select', default: 'v', options: ['h', 'v'] })
        }
      )
    )

    this.addChild(
      new Attribute('thickness', 'number', {
        parent: this,
        description: { type: 'string', value: '颜色条的宽度。' },
        controller: new AttributeController({ type: 'number', default: 30, min: 0 })
      })
    )

    this.addChild(
      new Attribute(
        'thicknessmode',
        { type: 'enum', value: ['pixels', 'fraction'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '颜色条的宽度模式。<code>pixels</code> 使用像素单位；<code>fraction</code> 使用基于绘图区域宽度的比例。'
          },
          controller: new AttributeController({ type: 'select', default: 'pixels', options: ['pixels', 'fraction'] })
        }
      )
    )

    this.addChild(
      new Attribute('len', 'number', {
        parent: this,
        description: { type: 'string', value: '颜色条的长度' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0 })
      })
    )

    this.addChild(
      new Attribute('lenmode', 'string', {
        parent: this,
        description: {
          type: 'string',
          value:
            '颜色条的长度模式。<code>pixels</code> 使用像素单位；<code>fraction</code> 使用基于绘图区域高度的比例。'
        },
        controller: new AttributeController({ type: 'select', default: 'fraction', options: ['pixels', 'fraction'] })
      })
    )

    this.addChild(
      new Attribute('x', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '设置颜色条在参考系的水平方向上的位置。参考系由<code>colorbar.xref</code>的值决定。具体如下：<br />' +
            '<ul>' +
            "<li><code>colorbar.xref = 'paper'</code>时，" +
            '值域为<code>[-2, 3]</code>。' +
            "垂直颜色条（<code>colorbar.orientation='v'</code>）的默认值为<code>1.02</code>；" +
            "水平颜色条（<code>colorbar.orientation='h'</code>）的默认值为<code>0.5</code>。</li>" +
            "<li><code>colorbar.xref = 'container'</code>时，" +
            '值域为<code>[0, 1]</code>。' +
            '垂直颜色条的默认值为<code>1</code>；' +
            '水平颜色条的默认值为<code>0.5</code>。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'number', default: null, step: 0.1 })
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
              '设置<code>colorbar.x</code>属性的参考系。<code>container</code>：整个图表元素的宽度; <code>paper</code>：绘图区域宽度。'
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
        { type: 'enum', value: ['left', 'center', 'right'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置颜色条在水平方向上相对于<code>colorbar.x</code>属性设置的位置的对齐方式。' +
              '垂直颜色条的默认值为<code>left</code>;水平颜色条的默认值为<code>center</code>。'
          },
          controller: new AttributeController({
            type: 'select',
            default: null,
            options: ['left', 'center', 'right']
          })
        }
      )
    )

    this.addChild(
      new Attribute('xpad', 'number', {
        parent: this,
        description: { type: 'string', value: '颜色条水平方向上的内边距。' },
        controller: new AttributeController({ type: 'number', default: 10, min: 0 })
      })
    )

    this.addChild(
      new Attribute('y', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '设置颜色条在参考系的垂直方向上的位置。参考系由<a href="/#/docs/config/?id=layout-legend-yref"><code>layout.legend.yref</code></a>的值决定。具体如下：<br />' +
            '<ul>' +
            "<li><code>colorbar.xref = 'paper'</code>时，" +
            '值域为<code>[-2, 3]</code>。' +
            "垂直颜色条（<code>colorbar.orientation='v'</code>）的默认值为<code>0.5</code>；" +
            "水平颜色条（<code>colorbar.orientation='h'</code>）的默认值为<code>1.02</code>。</li>" +
            "<li><code>colorbar.xref = 'container'</code>时，" +
            '值域为<code>[0, 1]</code>。' +
            '垂直颜色条的默认值为<code>0.5</code>；' +
            '水平颜色条的默认值为<code>1</code>。</li>' +
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
              '设置<code>colorbar.y</code>属性的参考系。<code>container</code>：整个图表元素的宽度; <code>paper</code>：绘图区域宽度。'
          },
          controller: new AttributeController({ type: 'select', default: 'paper', options: ['container', 'paper'] })
        }
      )
    )

    this.addChild(
      new Attribute(
        'yanchor',
        { type: 'enum', value: ['top', 'middle', 'bottom'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置颜色条在垂直方向上相对于<code>colorbar.y</code>属性设置的位置的对齐方式。' +
              '垂直颜色条的默认值为<code>middle</code>;水平颜色条的默认值为<code>bottom</code>。'
          },
          controller: new AttributeController({
            type: 'select',
            default: null,
            options: ['top', 'middle', 'bottom']
          })
        }
      )
    )

    this.addChild(
      new Attribute('ypad', 'number', {
        parent: this,
        description: { type: 'string', value: '颜色条的垂直外边距。' },
        controller: new AttributeController({ type: 'number', default: 10 })
      })
    )

    this.addChild(
      new Attribute('outlinecolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '颜色条的轮廓颜色。' },
        controller: new AttributeController({ type: 'color', default: '#444' })
      })
    )

    this.addChild(
      new Attribute('outlinewidth', 'number', {
        parent: this,
        description: { type: 'string', value: '颜色条的轮廓宽度。' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      })
    )

    this.addChild(
      new Attribute('bordercolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '颜色条边框颜色' },
        controller: new AttributeController({ type: 'color', default: '#444' })
      })
    )

    this.addChild(
      new Attribute('borderwidth', 'number', {
        parent: this,
        description: { type: 'string', value: '颜色条边框宽度' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      })
    )

    this.addChild(
      new Attribute(
        'tickmode',
        { type: 'enum', value: ['auto', 'linear', 'array'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '刻度模式。值域：' +
              '<ul>' +
              '<li><code>auto</code> - 刻度由 <code>nticks</code> 属性来确定。</li>' +
              '<li><code>linear</code> - 刻度由起始位置 <code>tick0</code> 和刻度步长 <code>dtick</code> ' +
              '决定（如果设置了 <code>tick0</code> 和 <code>dtick</code>，则默认值为<code>linear</code>）。</li>' +
              '<li><code>array</code> - 刻度由使用 <code>tickvals</code> 属性来指定。' +
              '（如果设置了 <code>tickvals</code>，则“数组”为默认值）</li>' +
              '</ul>'
          },
          controller: new AttributeController({ type: 'select', default: null, options: ['auto', 'linear', 'array'] })
        }
      )
    )

    this.addChild(
      new Attribute('nticks', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '指定颜色条最大刻度数量。实际的刻度数量将自动选取，但不会超过 <code>nticks</code> 值。' +
            "当值为 <code>0</code>时，表示无限制。只有在 <code>tickmode = 'auto'</code> 时才有效。"
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      })
    )

    this.addChild(
      new Attribute('tick0', 'number', {
        parent: this,
        description: { type: 'string', value: '设置颜色条刻度的起始值。' },
        controller: new AttributeController({ type: 'number', default: 0 })
      })
    )

    this.addChild(
      new Attribute('dtick', 'number | string', {
        parent: this,
        description: {
          type: 'string',
          value: '设置颜色条刻度之间的步长。需与 <code>tick0</code> 配合使用。'
        },
        controller: new AttributeController({ type: 'number', default: null })
      })
    )

    this.addChild(
      new Attribute('tickvals', 'array', {
        parent: this,
        description: { type: 'string', value: '设置颜色条刻度轴上显示的值。需与<code>ticktext</code>一起使用。' },
        controller: new AttributeController({ type: 'string', default: null, disabled: true, value: [1, 10, 15, 20] })
      })
    )

    this.addChild(
      new Attribute('ticktext', 'array', {
        parent: this,
        description: { type: 'string', value: '设置颜色条刻度轴上显示的文本。需与<code>tickvals</code>一起使用。' },
        controller: new AttributeController({
          type: 'string',
          default: null,
          disabled: true,
          value: ['A', 'B', 'C', 'D']
        })
      })
    )

    this.addChild(
      new Attribute(
        'ticks',
        { type: 'enum', value: ['outside', 'inside', ''] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '是否绘制刻度。值域：' +
              '<ul>' +
              "<li><code>''</code> - 默认值。不绘制。</li>" +
              '<li><code>inside</code> - 在颜色条内部绘制。</li>' +
              '<li><code>outside</code> - 在颜色条外部绘制。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: "''",
            value: '',
            options: ['outside', 'inside', '']
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'ticklabeloverflow',
        { type: 'enum', value: ['allow', 'hide past div', 'hide past domain'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '控制刻度标签溢出时怎么显示。值域：' +
              '<ul>' +
              '<li><code>allow</code> - 强制显示。</li>' +
              '<li><code>hide past div</code> - 隐藏超出图表区域的标签。（非内部刻度标签，默认值为此）</li>' +
              '<li><code>hide past domain</code> - 隐藏超出坐标轴范围的标签。（内部刻度标签，默认值为此）</li>' +
              '</ul>'
          }
        }
      )
    )
  }
}
