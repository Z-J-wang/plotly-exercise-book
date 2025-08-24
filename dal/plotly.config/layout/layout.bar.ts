import type { BaseConfig } from './base'
import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'

export default class LayoutBar {
  constructor(config: BaseConfig, parent: Attribute) {
    config.insertAttribute(
      new Attribute('bargap', 'number', {
        parent,
        description: { type: 'string', value: '设置柱状图之间的间距。取值范围：<code>[0, 1]</code>。' }
      })
    )

    config.insertAttribute(
      new Attribute('bargroupgap', 'number', {
        parent,
        description: { type: 'string', value: '设置柱状图组之间的间距。取值范围：<code>[0, 1]</code>。' }
      })
    )

    config.insertAttribute(
      new Attribute(
        'barmode',
        { type: 'enum', value: ['stack', 'group', 'overlay', 'relative'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '设置处于相同位置坐标的柱状图柱形在图表上的显示方式。<br />' +
              '<ul>' +
              '<li><code>group</code>: 默认值，各条形图将围绕共享位置居中并彼此相邻绘制。</li>' +
              '<li><code>stack</code>: 各条形图将相互堆叠。</li>' +
              '<li><code>relative</code>: 各条形图同样相互堆叠，负值位于坐标轴下方，正值位于坐标轴上方。</li>' +
              '<li><code>overlay</code>: 各条形图将相互重叠绘制，此时可能需要降低“不透明度”才能查看多个条形图。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'group',
            options: ['stack', 'group', 'overlay', 'relative']
          }),
          initialConfig: {
            data: [
              { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'bar' },
              { x: [2, 3, 4, 5], y: [16, 5, 11, 9], type: 'bar' },
              { x: [1, 2, 3, 4, 5], y: [12, 9, 15, -3, 12], type: 'bar' }
            ]
          }
        }
      )
    )

    config.insertAttribute(
      new Attribute(
        'barnorm',
        { type: 'enum', value: ['', 'fraction', 'percent'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '用于标准化堆叠或分组柱状图的高度，使其以相对比例（百分比或分数） 的形式显示，而不是绝对数值。这在比较不同组别中各个组成部分的占比时非常有用，尤其当各组的总量差异很大时。<br />' +
              '可选项说明：<br />' +
              '<ul>' +
              '<li><code>percent</code> - 将每个柱子的高度转换为该组总和的百分比。直观展示各组内部分布的百分比构成。' +
              '例如：若一组数据值为<code>[20, 30]</code>，则柱子高度显示为 <code>[40%, 60%]</code>（因为总和为 50）。' +
              '</li>' +
              '<li><code>fraction</code> - 将每个柱子高度转换为该组总和的分数。适用需要精确分数而非百分比的场景' +
              '例如：若一组数据值为<code>[20, 30]</code>，则柱子高度显示为 <code>[0.4, 0.6]</code>。' +
              '</li>' +
              '<li><code>""</code> - 默认值。不进行标准化，显示原始数值。。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: '',
            options: ['', 'fraction', 'percent']
          }),
          initialConfig: {
            data: [
              { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'bar' },
              { x: [2, 3, 4, 5], y: [16, 5, 11, 9], type: 'bar' },
              { x: [1, 2, 3, 4, 5], y: [12, 9, 15, -3, 12], type: 'bar' }
            ]
          }
        }
      )
    )
  }
}
