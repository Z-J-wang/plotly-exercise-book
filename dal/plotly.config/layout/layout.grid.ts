import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { defineAsyncComponent } from 'vue'
import { merge } from 'lodash'

export default class LayoutGrid extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'grid',
      type: 'Grid',
      options: {
        description: {
          type: 'string',
          value:
            '绘图区域网格布局设置。当需要绘制多个子图时，可通过网格布局来指定子图如何排版。<br />' +
            '需要注意的是，<code>layout.grid</code> 仅仅用于网格布局的声明。控制子图的绘制的位置需要通过子图的' +
            '<a href="/#/docs/config/?id=pie-domain"><code>trace.domain</code></a>属性或者<a href="/#/docs/config/?id=scatter-xaxis"><code>trace.xaxis</code></a>与' +
            '<a href="/#/docs/config/?id=scatter-yaxis"><code>trace.yaxis</code></a>属性来声明。<br />' +
            '更多网格布局示例：<a href="https://plotly.com/javascript/subplots/#subplots-with-shared-axes" target="_blank" rel="nofollow" >Plotly JS 网格布局文档</a>'
        },
        initialConfig: {
          layout: { grid: { rows: 2, columns: 2, pattern: 'independent' } },
          data: [
            { x: [1, 2, 3], y: [2, 3, 4], type: 'scatter' },
            { x: [20, 30, 40], y: [5, 5, 5], xaxis: 'x2', yaxis: 'y2', type: 'scatter' },
            { x: [2, 3, 4], y: [600, 700, 800], xaxis: 'x3', yaxis: 'y3', type: 'scatter' },
            {
              x: [4000, 5000, 6000],
              y: [7000, 8000, 9000],
              xaxis: 'x4',
              yaxis: 'y4',
              type: 'scatter'
            }
          ]
        }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new GridRows({ options: { parent: this } }))
    this.addChild(new GridColumns({ options: { parent: this } }))
    this.addChild(new GridXgap({ options: { parent: this } }))
    this.addChild(new GridYgap({ options: { parent: this } }))
    this.addChild(new GridXside({ options: { parent: this } }))
    this.addChild(new GridYside({ options: { parent: this } }))
    this.addChild(new GridRoworder({ options: { parent: this } }))
    this.addChild(new GridPattern({ options: { parent: this } }))
    this.addChild(new GridXaxes({ options: { parent: this } }))
    this.addChild(new GridYaxes({ options: { parent: this } }))
    this.addChild(new GridSubplots({ options: { parent: this } }))
    this.addChild(new GridDomain({ options: { parent: this } }))
  }
}

export class GridRows extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'rows',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '指定网格布局中的行数。如果还同时设置的<a href="/#/docs/config/?id=layout-grid-subplots"><code>layout.grid.subplots</code></a>' +
            '或者<a href="/#/docs/config/?id=layout-grid-yaxes"><code>layout.grid.yaxes</code></a>，则去三者中的最大值来充当默认行数。'
        },
        controller: new AttributeController({ type: 'number', default: 1, min: 1, value: 2 })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridColumns extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'columns',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '指定网格布局中的列数。如果还同时设置的<a href="/#/docs/config/?id=layout-grid-subplots"><code>layout.grid.subplots</code></a>' +
            '或者<a href="/#/docs/config/?id=layout-grid-xaxes"><code>layout.grid.xaxes</code></a>，则去三者中的最大值来充当默认行数。'
        },
        controller: new AttributeController({ type: 'number', default: 1, min: 1, value: 2 })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridXgap extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'xgap',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '列之间的间距。，以一个单元可用总宽度的分数形式表示。coupled 模式下，默认值为 0.1；independent 模式下，默认值为 0.2。'
        },
        controller: { type: 'number', default: null, min: 0, max: 1, step: 0.1 }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridYgap extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'ygap',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '行之间的间距。以一个单元可用总高的分数形式表示。coupled 模式下，默认值为 0.1；independent 模式下，默认值为 0.3。'
        },
        controller: { type: 'number', default: null, min: 0, max: 1, step: 0.1 }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridXside extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'xside',
      type: { type: 'enum', value: ['bottom', 'bottom plot', 'top plot', 'top'] },
      options: {
        description: { type: 'string', value: 'x 轴的位置' },
        controller: new AttributeController({
          type: 'select',
          default: 'bottom plot',
          options: ['bottom', 'bottom plot', 'top plot', 'top']
        })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridYside extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'yside',
      type: { type: 'enum', value: ['left', 'left plot', 'right plot', 'right'] },
      options: {
        description: { type: 'string', value: 'y 轴的位置' },
        controller: new AttributeController({
          type: 'select',
          default: 'left plot',
          options: ['left', 'left plot', 'right plot', 'right']
        })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridRoworder extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'roworder',
      type: { type: 'enum', value: ['top to bottom', 'bottom to top'] },
      options: {
        description: { type: 'string', value: '指定行排序。' },
        controller: new AttributeController({
          type: 'select',
          default: 'top to bottom',
          options: ['top to bottom', 'bottom to top']
        })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridPattern extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'pattern',
      type: { type: 'enum', value: ['coupled', 'independent'] },
      options: {
        description: {
          type: 'string',
          value:
            '如果没有设置<a href="/#/docs/config/?id=layout-grid-subplots"><code>layout.grid.subplots</code></a>、' +
            '<a href="/#/docs/config/?id=layout-grid-xaxes"><code>layout.grid.xaxes</code></a>或' +
            '<a href="/#/docs/config/?id=layout-grid-yaxes"><code>layout.grid.yaxes</code></a>，' +
            '但指定了<a href="/#/docs/config/?id=layout-grid-rows"><code>layout.grid.rows</code></a>和' +
            '<a href="/#/docs/config/?id=layout-grid-columns"><code>layout.grid.columns</code></a>。' +
            'Plotly将根据连续的轴编号来生成默认设置，有两种方式：' +
            '<ul>' +
            '<li><code>coupled</code> - 默认值。每列分配一个 x 轴，为每行分配一个 y 轴</li>' +
            '<li><code>independent</code> - 为每个单元格使用一组新的 xy 轴对，' +
            '按照从左到右的顺序逐行分配，行的遍历顺序由<code>layout.grid.roworder</code>参数决定。</li>' +
            '</ul>'
        },
        controller: new AttributeController({ type: 'select', default: 'coupled', options: ['independent', 'coupled'] })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridXaxes extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'xaxes',
      type: 'string[]',
      options: {
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/layout/GirdXaxes.vue'))
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridYaxes extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'yaxes',
      type: 'string[]',
      options: {
        description: {
          type: 'string',
          value: '具体说明详见：<a href="/#/docs/config/?id=layout-grid-xaxes"><code>layout.grid.xaxes</code></a>。'
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridSubplots extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'subplots',
      type: 'string[][]',
      options: {
        description: {
          type: 'Component',
          value: defineAsyncComponent(() => import('@/components/doc/layout/GirdSubplot.vue'))
        }
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridDomain extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'domain',
      type: 'LayoutDomain',
      options: {
        description: {
          type: 'string',
          value: '设置子图的绘图区域在整个绘图区域的哪部分。默认子图的绘图区域占整个绘图区域。'
        }
      }
    }

    super(merge(defaultInitializer, initializer))

    this.addChild(new GridDomainX({ options: { parent: this } }))
    this.addChild(new GridDomainY({ options: { parent: this } }))
  }
}

export class GridDomainX extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'x',
      type: 'number[]',
      options: {
        description: {
          type: 'string',
          value:
            'x 轴绘图范围。默认值：<code>[0, 1]</code>例如 <code>[0, 0.5]</code> 表示在 x 轴左边到中线的范围内绘制子图。'
        },
        controller: new AttributeController({
          type: 'slider',
          default: [0, 1],
          min: 0,
          max: 1,
          step: 0.1
        })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class GridDomainY extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'y',
      type: 'number[]',
      options: {
        description: {
          type: 'string',
          value:
            'y 轴绘图范围。默认值：<code>[0, 1]</code>例如 <code>[0, 0.5]</code> 表示在 y 轴下边到中线的范围内绘制子图。'
        },
        controller: new AttributeController({ type: 'slider', default: [0, 1], min: 0, max: 1, step: 0.1 })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}
