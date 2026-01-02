import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class PieDomain extends Attribute {
  constructor(parent: Attribute) {
    super('domain', 'PieDomain', {
      parent,
      description: {
        type: 'string',
        value:
          '设置当前饼图在网格布局中的位置。关于网格布局可见：' +
          '<a href="/#/docs/config/?id=layout-grid">Plotly 网格布局</a>'
      },
      initialConfig: {
        layout: {
          title: { text: 'Try to change the position of the first pie chart' },
          grid: { rows: 2, columns: 2 }
        },
        data: [
          {
            values: [38, 27, 18, 10, 7],
            labels: ['Starry Night', 'Sunflowers', 'Irises', 'The Night Cafe', 'The Scream'],
            type: 'pie',
            name: 'Starry Night',
            domain: {
              row: 0,
              column: 0
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
          },
          {
            values: [28, 26, 21, 15, 10],
            labels: ['Starry Night', 'Sunflowers', 'Irises', 'The Night Cafe', 'The Scream'],
            type: 'pie',
            name: 'Sunflowers',
            domain: { row: 1, column: 0 },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
          },
          {
            values: [38, 19, 16, 14, 13],
            labels: ['Starry Night', 'Sunflowers', 'Irises', 'The Night Cafe', 'The Scream'],
            type: 'pie',
            name: 'Irises',
            domain: { row: 0, column: 1 },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
          },
          {
            values: [31, 24, 19, 18, 8],
            labels: ['Starry Night', 'Sunflowers', 'Irises', 'The Night Cafe', 'The Scream'],
            type: 'pie',
            name: 'The Night Cafe',
            domain: { row: 1, column: 1 },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
          }
        ]
      }
    })

    this.addChild(
      new Attribute('column', 'number', {
        parent: this,
        description: { type: 'string', value: '网格布局的列索引。' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      })
    )

    this.addChild(
      new Attribute('row', 'number', {
        parent: this,
        description: { type: 'string', value: '网格布局的行索引。' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      })
    )

    this.addChild(
      new Attribute('x', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '当前饼图的 x 轴绘图范围。默认值：<code>[0, 1]</code>例如 <code>[0, 0.5]</code> 表示在 x 轴左边到中线的范围内绘制子图。'
        },
        controller: new AttributeController({ type: 'slider', default: [0, 1], min: 0, max: 1, step: 0.1 })
      })
    )
    this.addChild(
      new Attribute('y', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '当前饼图的 y 轴绘图范围。默认值：<code>[0, 1]</code>例如 <code>[0, 0.5]</code> 表示在 y 轴下边到中线的范围内绘制子图。'
        },
        controller: new AttributeController({ type: 'slider', default: [0, 1], min: 0, max: 1, step: 0.1 })
      })
    )
  }
}
