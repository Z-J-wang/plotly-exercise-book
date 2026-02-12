import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'
import { Font } from '../base.font'

export default class TraceColoBar extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'colorbar',
      type: 'ColorBar',
      options: {
        description: { type: 'string', value: '颜色条样式设置。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new TraceColorbarOrientation({ options: { parent: this } }))
    this.addChild(new TraceColorbarOrientation({ options: { parent: this } }))
    this.addChild(new TraceColorbarThickness({ options: { parent: this } }))
    this.addChild(new TraceColorbarThicknessmode({ options: { parent: this } }))
    this.addChild(new TraceColorbarLen({ options: { parent: this } }))
    this.addChild(new TraceColorbarLenmode({ options: { parent: this } }))
    this.addChild(new TraceColorbarX({ options: { parent: this } }))
    this.addChild(new TraceColorbarXref({ options: { parent: this } }))
    this.addChild(new TraceColorbarXAnchor({ options: { parent: this } }))
    this.addChild(new TraceColorbarXPad({ options: { parent: this } }))
    this.addChild(new TraceColorbarY({ options: { parent: this } }))
    this.addChild(new TraceColorbarYref({ options: { parent: this } }))
    this.addChild(new TraceColorbarYAnchor({ options: { parent: this } }))
    this.addChild(new TraceColorbarYPad({ options: { parent: this } }))
    this.addChild(new TraceColorOutlinecolor({ options: { parent: this } }))
    this.addChild(new TraceColorOutlinewidth({ options: { parent: this } }))
    this.addChild(new TraceColorBordercolor({ options: { parent: this } }))
    this.addChild(new TraceColorBorderwidth({ options: { parent: this } }))
    this.addChild(new TraceColorTickmode({ options: { parent: this } }))
    this.addChild(new TraceColorNticks({ options: { parent: this } }))
    this.addChild(new TraceColorTick0({ options: { parent: this } }))
    this.addChild(new TraceColorDTick({ options: { parent: this } }))
    this.addChild(new TraceColorTickvals({ options: { parent: this } }))
    this.addChild(new TraceColorTickText({ options: { parent: this } }))
    this.addChild(new TraceColorTicks({ options: { parent: this } }))
    this.addChild(new TraceColorTicklabeloverflow({ options: { parent: this } }))
    this.addChild(new TraceColorTicklabelposition({ options: { parent: this } }))
    this.addChild(new TraceColorTicklen({ options: { parent: this } }))
    this.addChild(new TraceColorTickwidth({ options: { parent: this } }))
    this.addChild(new TraceColorTickcolor({ options: { parent: this } }))
    this.addChild(new TraceColorTicklabelstep({ options: { parent: this } }))
    this.addChild(new TraceColorShowticklabels({ options: { parent: this } }))
    this.addChild(new TraceColorLabelalias({ options: { parent: this } }))
    this.addChild(
      new Font({
        name: 'tickfont',
        options: { parent: this, description: { type: 'string', value: '刻度标签的字体。' } }
      })
    )
    this.addChild(new TraceColorTickAngle({ options: { parent: this } }))
    this.addChild(new TraceColorTickFormat({ options: { parent: this } }))
    this.addChild(new TraceColorTickprefix({ options: { parent: this } }))
    this.addChild(new TraceColorShowtickprefix({ options: { parent: this } }))
    this.addChild(new TraceColorTicksuffix({ options: { parent: this } }))
    this.addChild(new TraceColorShowticksuffix({ options: { parent: this } }))
    this.addChild(new TraceColorSeparatethousands({ options: { parent: this } }))
    this.addChild(new TraceColorExponentformat({ options: { parent: this } }))
    this.addChild(new TraceColorShowexponent({ options: { parent: this } }))
    this.addChild(new TraceColorTitle({ options: { parent: this } }))
  }
}

export class TraceColorbarBgcolor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'bgcolor',
      type: 'Color',
      options: {
        description: { type: 'string', value: '颜色条背景色' },
        controller: new AttributeController({ type: 'color', default: '#ffffff' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarOrientation extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'orientation',
      type: { type: 'enum', value: ['h', 'v'] },
      options: {
        description: { type: 'string', value: '颜色条方向。' },
        controller: new AttributeController({ type: 'select', default: 'v', options: ['h', 'v'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarThickness extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'thickness',
      type: 'number',
      options: {
        description: { type: 'string', value: '颜色条的宽度。' },
        controller: new AttributeController({ type: 'number', default: 30, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarThicknessmode extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'thicknessmode',
      type: { type: 'enum', value: ['pixels', 'fraction'] },
      options: {
        description: {
          type: 'string',
          value:
            '颜色条的宽度模式。<code>pixels</code> 使用像素单位；<code>fraction</code> 使用基于绘图区域宽度的比例。'
        },
        controller: new AttributeController({ type: 'select', default: 'pixels', options: ['pixels', 'fraction'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarLen extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'len',
      type: 'number',
      options: {
        description: { type: 'string', value: '颜色条的长度' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarLenmode extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'lenmode',
      type: 'string',
      options: {
        description: {
          type: 'string',
          value:
            '颜色条的长度模式。<code>pixels</code> 使用像素单位；<code>fraction</code> 使用基于绘图区域高度的比例。'
        },
        controller: new AttributeController({ type: 'select', default: 'fraction', options: ['pixels', 'fraction'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarX extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'x',
      type: 'number',
      options: {
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
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarXref extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'xref',
      type: { type: 'enum', value: ['container', 'paper'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置<code>colorbar.x</code>属性的参考系。<code>container</code>：整个图表元素的宽度; <code>paper</code>：绘图区域宽度。'
        },
        controller: new AttributeController({ type: 'select', default: 'paper', options: ['container', 'paper'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarXAnchor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'xanchor',
      type: { type: 'enum', value: ['left', 'center', 'right'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置颜色条在水平方向上相对于<code>colorbar.x</code>属性设置的位置的对齐方式。' +
            '垂直颜色条的默认值为<code>left</code>;水平颜色条的默认值为<code>center</code>。'
        },
        controller: new AttributeController({ type: 'select', default: null, options: ['left', 'center', 'right'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarXPad extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'xpad',
      type: 'number',
      options: {
        description: { type: 'string', value: '颜色条水平方向上的内边距。' },
        controller: new AttributeController({ type: 'number', default: 10, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarY extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'y',
      type: 'number',
      options: {
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
        controller: new AttributeController({ type: 'number', default: null, step: 0.1 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarYref extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'yref',
      type: { type: 'enum', value: ['container', 'paper'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置<code>colorbar.y</code>属性的参考系。<code>container</code>：整个图表元素的宽度; <code>paper</code>：绘图区域宽度。'
        },
        controller: new AttributeController({ type: 'select', default: 'paper', options: ['container', 'paper'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarYAnchor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'yanchor',
      type: { type: 'enum', value: ['top', 'middle', 'bottom'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置颜色条在垂直方向上相对于<code>colorbar.y</code>属性设置的位置的对齐方式。' +
            '垂直颜色条的默认值为<code>middle</code>;水平颜色条的默认值为<code>bottom</code>。'
        },
        controller: new AttributeController({ type: 'select', default: null, options: ['top', 'middle', 'bottom'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorbarYPad extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ypad',
      type: 'number',
      options: {
        description: { type: 'string', value: '颜色条的垂直外边距。' },
        controller: new AttributeController({ type: 'number', default: 10, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorOutlinecolor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'outlinecolor',
      type: 'Color',
      options: {
        description: { type: 'string', value: '颜色条的轮廓颜色。' },
        controller: new AttributeController({ type: 'color', default: '#444' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorOutlinewidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'outlinewidth',
      type: 'number',
      options: {
        description: { type: 'string', value: '颜色条的轮廓宽度。' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorBordercolor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'bordercolor',
      type: 'Color',
      options: {
        description: { type: 'string', value: '颜色条边框颜色' },
        controller: new AttributeController({ type: 'color', default: '#444' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorBorderwidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'borderwidth',
      type: 'number',
      options: {
        description: { type: 'string', value: '颜色条边框宽度' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTickmode extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tickmode',
      type: { type: 'enum', value: ['auto', 'linear', 'array'] },
      options: {
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
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorNticks extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'nticks',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '指定颜色条最大刻度数量。实际的刻度数量将自动选取，但不会超过 <code>nticks</code> 值。' +
            "当值为 <code>0</code>时，表示无限制。只有在 <code>tickmode = 'auto'</code> 时才有效。"
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTick0 extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tick0',
      type: 'number',
      options: {
        description: { type: 'string', value: '设置颜色条刻度的起始值。' },
        controller: new AttributeController({ type: 'number', default: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorDTick extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'dtick',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value: '设置颜色条刻度之间的步长。需与 <code>tick0</code> 配合使用。'
        },
        controller: new AttributeController({ type: 'number', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTickvals extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tickvals',
      type: 'array',
      options: {
        description: { type: 'string', value: '设置颜色条刻度轴上显示的值。需与<code>ticktext</code>一起使用。' },
        controller: new AttributeController({ type: 'string', default: null, disabled: true, value: [1, 10, 15, 20] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTickText extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ticktext',
      type: 'array',
      options: {
        description: { type: 'string', value: '设置颜色条刻度轴上显示的文本。需与<code>tickvals</code>一起使用。' },
        controller: new AttributeController({
          type: 'string',
          default: null,
          disabled: true,
          value: ['A', 'B', 'C', 'D']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTicks extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ticks',
      type: { type: 'enum', value: ['outside', 'inside', ''] },
      options: {
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
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTicklabeloverflow extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ticklabeloverflow',
      type: { type: 'enum', value: ['allow', 'hide past div', 'hide past domain'] },
      options: {
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
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTicklabelposition extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const ticklabelpositionOpts = [
      'outside',
      'inside',
      'outside top',
      'inside top',
      'outside left',
      'inside left',
      'outside right',
      'inside right',
      'outside bottom',
      'inside bottom'
    ]
    const defaultInitializer = {
      name: 'ticklabelposition',
      type: { type: 'enum', value: ticklabelpositionOpts },
      options: {
        description: {
          type: 'string',
          value:
            '设置控制刻度标签的位置。其中左右布局适用于<code>orientation = "h"</code>，上下布局适用于<code>orientation = "v"</code>。'
        },
        controller: new AttributeController({ type: 'select', default: 'outside', options: ticklabelpositionOpts })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTicklen extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tickwidth',
      type: 'number',
      options: {
        description: { type: 'string', value: '刻度的长度。' },
        controller: new AttributeController({ type: 'number', default: 5, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTickwidth extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tickwidth',
      type: 'number',
      options: {
        description: { type: 'string', value: '刻度的宽度。' },
        controller: new AttributeController({ type: 'number', default: 1, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTickcolor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tickcolor',
      type: 'Color',
      options: {
        description: { type: 'string', value: '刻度的颜色。' },
        controller: new AttributeController({ type: 'string', default: '#444' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTicklabelstep extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ticklabelstep',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '设置刻度标签之间的间距与刻度之间的间距之间的比例关系。' +
            '值为 1（默认值）表示每个刻度都有对应的标签；值为 2 表示每隔二个刻度显示一个标签；值 n 表示每 n 个刻度显示一个标签。'
        },
        controller: new AttributeController({ type: 'number', default: 1, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorShowticklabels extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'showticklabels',
      type: 'boolean',
      options: {
        description: { type: 'string', value: '是否显示刻度标签。' },
        controller: new AttributeController({ type: 'boolean', default: true })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorLabelalias extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'labelalias',
      type: 'Object',
      options: {
        description: {
          type: 'string',
          value: '刻度标签的别名。例如，将数字 10 映射为 “Ten”——<code>{ 10: "Ten" }</code> '
        },
        controller: new AttributeController({
          type: 'jsonString',
          default: null,
          disabled: true,
          value: { 10: 'Ten', 12: 'Twelve', 14: 'Fourteen', 16: 'Sixteen' }
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTickAngle extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tickangle',
      type: 'number',
      options: {
        description: { type: 'string', value: '刻度标签的旋转角度。' },
        controller: new AttributeController({ type: 'number', default: 0, min: -360, max: 360, step: 15 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTickFormat extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tickformat',
      type: 'string',
      options: {
        description: {
          type: 'string',
          value:
            '设置刻度标签格式化规则。例如：<code>.2f</code>表示所有的刻度标签的数字保留两位小数。<br />' +
            '说明：' +
            '<ul>' +
            '<li>数字，支持<a href="https://github.com/d3/d3-format/tree/v1.4.5#d3-format" target="_blank">d3-format</a>语法。</li>' +
            '<li>日期，支持<a href="https://github.com/d3/d3-time-format/tree/v2.2.3#locale_format" target="_blank">d3-time-format</a>语法。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'string', default: null, value: '.2f', disabled: true })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTickprefix extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'tickprefix',
      type: 'string',
      options: {
        description: { type: 'string', value: '刻度标签的前缀。' },
        controller: new AttributeController({ type: 'string', default: null, value: '' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorShowtickprefix extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'showtickprefix',
      type: { type: 'enum', value: ['all', 'first', 'last', 'none'] },
      options: {
        description: { type: 'string', value: '刻度标签的前缀显示规则。' },
        controller: new AttributeController({
          type: 'select',
          default: 'all',
          options: ['all', 'first', 'last', 'none']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTicksuffix extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ticksuffix',
      type: 'string',
      options: {
        description: { type: 'string', value: '刻度标签的后缀。' },
        controller: new AttributeController({ type: 'string', default: null, value: '' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorShowticksuffix extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'showticksuffix',
      type: { type: 'enum', value: ['all', 'first', 'last', 'none'] },
      options: {
        description: { type: 'string', value: '刻度标签的后缀显示规则。' },
        controller: new AttributeController({
          type: 'select',
          default: 'all',
          options: ['all', 'first', 'last', 'none']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorSeparatethousands extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'separatethousands',
      type: 'boolean',
      options: {
        description: { type: 'string', value: '是否显示数字千分位分隔符。' },
        controller: new AttributeController({ type: 'boolean', default: false })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorExponentformat extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'exponentformat',
      type: { type: 'enum', value: ['none', 'e', 'E', 'power', 'SI', 'B'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置刻度值的指数形式的显示格式。<br />以<code>1000000000</code>为例： <br />' +
            '<ul>' +
            '<li><code>none</code> - 显示为<code>1,000,000,000</code></li>' +
            '<li><code>e</code> - 显示为<code>1e+9</code></li>' +
            '<li><code>E</code> - 显示为<code>1E+9</code></li>' +
            '<li><code>power</code> - 显示为<code>1x10^9</code></li>' +
            '<li><code>SI</code> - 显示为<code>1G</code></li>' +
            '<li><code>B</code> - 显示为<code>1B</code></li>' +
            '</ul>'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'B',
          options: ['none', 'e', 'E', 'power', 'SI', 'B']
        }),
        initialConfig: {
          data: [
            {
              x: [1, 2, 3, 4],
              y: [1000000000, 2000000000, 3000000000, 4000000000],
              marker: { color: [1000000000, 2000000000, 3000000000, 4000000000] }
            }
          ]
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorShowexponent extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'showexponent',
      type: { type: 'enum', value: ['all', 'first', 'last', 'none'] },
      options: {
        description: { type: 'string', value: '刻度指数规则生效规则' },
        controller: new AttributeController({
          type: 'select',
          default: 'all',
          options: ['all', 'first', 'last', 'none']
        }),
        initialConfig: {
          data: [
            {
              x: [1, 2, 3, 4],
              y: [1000000000, 2000000000, 3000000000, 4000000000],
              marker: { color: [1000000000, 2000000000, 3000000000, 4000000000] }
            }
          ]
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TraceColorTitle extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'title',
      type: 'Title',
      options: {
        description: { type: 'string', value: '设置颜色条标题。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(
      new Attribute({
        name: 'text',
        type: 'string',
        options: {
          parent: this,
          description: { type: 'string', value: '标题文本。' },
          controller: new AttributeController({ type: 'string', default: null })
        }
      })
    )

    this.addChild(
      new Font({ name: 'font', options: { parent: this, description: { type: 'string', value: '标题字体' } } })
    )

    this.addChild(
      new Attribute({
        name: 'side',
        type: { type: 'enum', value: ['top', 'bottom', 'right'] },
        options: {
          parent: this,
          description: { type: 'string', value: '标题的位置。' },
          controller: new AttributeController({ type: 'select', default: null, options: ['top', 'bottom', 'right'] })
        }
      })
    )
  }
}
