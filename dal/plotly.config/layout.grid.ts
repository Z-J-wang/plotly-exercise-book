import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'

export default class LayoutGrid extends Attribute {
  constructor(parent: Attribute | null) {
    super('grid', 'Grid', {
      parent,
      description: { type: 'string', value: '绘图区域网格布局设置。' }
    })

    this.addChild(
      new Attribute('rows', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '指定网格布局中的行数。如果还同时设置的<a href="layout-grid-subplots"><code>layout.grid.subplots</code></a>' +
            '或者<a href="layout-grid-yaxes"><code>layout.grid.yaxes</code></a>，则去三者中的最大值来充当默认行数。'
        },
        controller: new AttributeController({
          type: 'number',
          default: 1,
          min: 1
        })
      })
    )

    this.addChild(
      new Attribute('columns', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '指定网格布局中的列数。如果还同时设置的<a href="layout-grid-subplots"><code>layout.grid.subplots</code></a>' +
            '或者<a href="layout-grid-xaxes"><code>layout.grid.xaxes</code></a>，则去三者中的最大值来充当默认行数。'
        },
        controller: new AttributeController({
          type: 'number',
          default: 1,
          min: 1
        })
      })
    )

    this.addChild(
      new Attribute('xgap', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '列之间的间距。，以一个单元可用总宽度的分数形式表示。coupled 模式下，默认值为 0.1；independent 模式下，默认值为 0.2。'
        },
        controller: new AttributeController({
          type: 'number',
          default: null,
          min: 0,
          max: 1,
          step: 0.1
        })
      })
    )

    this.addChild(
      new Attribute('ygap', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '行之间的间距。以一个单元可用总高的分数形式表示。coupled 模式下，默认值为 0.1；independent 模式下，默认值为 0.3。'
        },
        controller: new AttributeController({
          type: 'number',
          default: null,
          min: 0,
          max: 1,
          step: 0.1
        })
      })
    )

    this.addChild(
      new Attribute(
        'xside',
        { type: 'enum', value: ['bottom', 'bottom plot', 'top plot', 'top'] },
        {
          parent: this,
          description: { type: 'string', value: 'x 轴的位置' },
          controller: new AttributeController({
            type: 'select',
            default: 'bottom plot'
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'yside',
        { type: 'enum', value: ['left', 'left plot', 'right plot', 'right'] },
        {
          parent: this,
          description: { type: 'string', value: 'y 轴的位置' },
          controller: new AttributeController({
            type: 'select',
            default: 'left plot'
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'roworder',
        { type: 'enum', value: ['top to bottom', 'bottom to top'] },
        {
          parent: this,
          description: {
            type: 'string',
            value: '指定行排序。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'top to bottom',
            options: ['top to bottom', 'bottom to top']
          })
        }
      )
    )

    this.addChild(
      new Attribute('subplots', 'string[]', {
        parent: this,
        description: {
          type: 'string',
          value:
            '<span class="font-bold">未试验出实际效果，需进一步核验！</span>' +
            '用于自由形式网格，其中某些坐标轴可能在子图之间共享，但其他坐标轴则不共享。' +
            '每个条目应为笛卡尔子图标识符，如“xy”或“x3y2”，若要使该单元格为空则使用空字符串。' +
            '您可以在同一列中重复使用 x 轴，在同一行中重复使用 y 轴。' +
            '非笛卡尔子图和支持 `domain` 的迹线可使用 `gridcell` 属性分别置于此网格中。'
        }
      })
    )

    this.addChild(
      new Attribute('xaxes', 'string[]', {
        parent: this,
        description: {
          type: 'string',
          value:
            '与 `yaxes` 一起使用时，适用于 x 轴和 y 轴在列和行之间共用的情况。' +
            '每个条目应为 x 轴的标识符，例如“x”、“x2”等，或者“”以不在此列中添加 x 轴。' +
            '除了空字符串之外的其他条目必须是唯一的。如果存在 `subplots` 则会被忽略。' +
            '如果缺失但存在 `yaxes`，则会生成连续的标识符。'
        }
      })
    )

    this.addChild(
      new Attribute('yaxes', 'string[]', {
        parent: this,
        description: {
          type: 'string',
          value:
            '与 `xaxes` 一起使用时，适用于 x 轴和 y 轴在列和行之间共用的情况。' +
            '每个条目应为 y 轴的标识符，例如“y”、“y2”等，或者“”以不在此行中添加 y 轴。' +
            '除了空字符串之外的其他条目必须是唯一的。如果存在 `subplots` 则会被忽略。' +
            '如果缺失但存在 `xaxes`，则会生成连续的标识符。'
        }
      })
    )

    this.addChild(
      new Attribute(
        'pattern',
        { type: 'enum', value: ['coupled', 'independent'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '如果没有设置<a href="layout-grid-subplots"><code>layout.grid.subplots</code></a>、' +
              '<a href="layout-grid-xaxes"><code>layout.grid.xaxes</code></a>或' +
              '<a href="layout-grid-yaxes"><code>layout.grid.yaxes</code></a>，' +
              '但指定了<a href="layout-grid-rows"><code>layout.grid.rows</code></a>和' +
              '<a href="layout-grid-columns"><code>layout.grid.columns</code></a>。' +
              'Plotly将根据连续的轴编号来生成默认设置，有两种方式：' +
              '<ul>' +
              '<li><code>coupled</code> - 默认值。每列分配一个 x 轴，为每行分配一个 y 轴</li>' +
              '<li><code>independent</code> - 为每个单元格使用一组新的 xy 轴对，' +
              '按照从左到右的顺序逐行分配，行的遍历顺序由<code>layout.grid.roworder</code>参数决定。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'coupled',
            options: ['coupled', 'independent']
          })
        }
      )
    )

    const domain = new Attribute('domain', 'LayoutDomain', {
      parent: this.parent,
      description: {
        type: 'string',
        value: '设置子图的绘图区域在整个绘图区域的哪部分。默认子图的绘图区域占整个绘图区域。'
      }
    })

    domain.addChild(
      new Attribute('x', 'number[]', {
        parent: domain,
        description: {
          type: 'string',
          value:
            'x 轴绘图范围。默认值：<code>[0, 1]</code>例如 <code>[0, 0.5]</code> 表示在 x 轴左边到中线的范围内绘制子图。'
        }
      })
    )

    domain.addChild(
      new Attribute('y', 'number[]', {
        parent: domain,
        description: {
          type: 'string',
          value:
            'y 轴绘图范围。默认值：<code>[0, 1]</code>例如 <code>[0, 0.5]</code> 表示在 y 轴下边到中线的范围内绘制子图。'
        }
      })
    )

    this.addChild(domain)
  }
}
