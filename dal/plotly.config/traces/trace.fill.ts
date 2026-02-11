/**
 * 轨迹填充相关属性
 * @class
 */
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import TracePattern from './trace.pattern'
import { merge } from 'lodash'

export class TraceFillAssemble {
  constructor(parent: Attribute) {
    parent.addChild(new TraceFill({ options: { parent } }))
    parent.addChild(new TraceFillColor({ options: { parent } }))
    parent.addChild(
      new TracePattern('fillpattern', {
        parent,
        description: {
          type: 'string',
          value: '设置轨迹填充区域的图案。默认无填充图案（即色块填充）。需搭配<code>fill</code>属性使用。'
        }
      })
    )
  }
}

export class TraceFill extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'fill',
      type: { type: 'enum', value: ['none', 'tozeroy', 'tozerox', 'tonexty', 'tonextx', 'toself', 'tonext'] },
      options: {
        description: {
          type: 'string',
          value:
            '设置轨迹填充模式。<br />' +
            '默认情况下为<code>none</code>。如果此轨迹是堆叠的，' +
            '<code>orientation = v</code>则默认值为 <code>tonexty</code>; <code>orientation = h</code>则默认值为 <code>tonextx</code>;<br />' +
            '不同填充模式的具体行为：' +
            '<ul>' +
            '<li><code>tozerox</code>和<code>tozeroy</code>模式：<code>tozerox</code>模式下，填充将进行至 <code>x = 0</code> 的位置；<code>tozeroy</code>模式下，填充将进行至 <code>y = 0</code> 的位置。</li>' +
            '<li><code>tonextx</code>和<code>tonexty</code>模式：这两种模式下，填充区域位于本轨迹的端点与前一轨迹的端点之间，通过直线连接这些端点来生成堆叠区域图。若此前不存在轨迹，<code>tonextx</code>和<code>tonexty</code>的行为与<code>tozerox</code>和<code>tozeroy</code>相同，即分别填充至<code>x = 0</code>和<code>y = 0</code>的位置。</li>' +
            '<li><code>toself</code>模式：此模式会将轨迹的端点（若轨迹存在间隔，则为轨迹的每个段）连接形成一个封闭图形。需注意，<code>toself</code>模式不适用于一个轨迹未完全包围另一个轨迹的情况。</li>' +
            '<li><code>tonext</code>模式：当两个轨迹中一个完全包围另一个（如连续的等高线情况）时，<code>tonext</code>模式会在这两个轨迹之间填充空间，其行为与<code>toself</code>类似。若此前没有轨迹，<code>tonext</code>的行为与<code>tozerox</code>和<code>tozeroy</code>相同，即分别填充至<code>x = 0</code>和<code>y = 0</code>的位置。</li>' +
            '</ul>' +
            '关于堆叠轨迹：<br />' +
            '<ul>' +
            '<li>处于堆叠中的轨迹，其填充操作仅针对同一组中的其他轨迹，即只会填充到同一组中的其他轨迹，或被同一组中的其他轨迹填充。</li>' +
            '<li>存在多个堆叠组或部分轨迹堆叠而部分未堆叠的复杂情况下，如果填充关联的轨迹尚未连续，那么在绘制顺序中，较晚出现的轨迹将向下移动，以确保填充效果的合理性与准确性。</li>' +
            '</ul>'
        },
        controller: new AttributeController({
          type: 'select',
          default: 'none',
          options: ['none', 'tozeroy', 'tozerox', 'tonexty', 'tonextx', 'toself', 'tonext']
        })
      }
    }

    super(merge(defaultInitializer, initializer))
  }
}

export class TraceFillColor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'fillcolor',
      type: 'Color',
      options: {
        description: { type: 'string', value: '设置轨迹填充颜色。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
