import type { BaseConfig } from '../base'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { BaseColor } from '../base'
import { BaseLine } from '../base.line'
import { merge } from 'lodash'

class ActiveSelection extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'activeselection',
      type: 'LayoutActiveSelection',
      options: {
        description: { type: 'string', value: '设置选择模式下，选择框的样式。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(
      new BaseColor({
        name: 'fillcolor',
        options: {
          parent: this,
          description: { type: 'string', value: '选择框的填充颜色' },
          controller: new AttributeController({ type: 'color', default: '#ffffff' })
        }
      })
    )

    this.addChild(
      new Attribute({
        name: 'opacity',
        type: 'number',
        options: {
          parent: this,
          description: { type: 'string', value: '选择框的透明度' },
          controller: new AttributeController({
            type: 'number',
            default: 0.5,
            min: 0,
            max: 1,
            step: 0.1
          })
        }
      })
    )
  }
}

class NewSelection extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'newselection',
      type: 'LayoutNewSelection',
      options: {
        description: { type: 'string', value: '设置选择模式下拖拽时的选择框样式。' }
      }
    }
    super(merge(defaultInitializer, initializer))

    this.addChild(new BaseLine({ options: { parent: this } }))

    this.addChild(
      new Attribute({
        name: 'mode',
        type: { type: 'enum', value: ['immediate', 'gradual'] },
        options: {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置选择模式下如何创建新的选区。<br />' +
              '可选值：' +
              '<ul>' +
              '<li><code>immediate</code>：默认值，首次点击鼠标后会创建一个新的选区。</li>' +
              '<li><code>gradual</code>：松开鼠标左键后，延迟一段时间再创建新的选区。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'immediate',
            options: ['immediate', 'gradual']
          })
        }
      })
    )
  }
}

export default class LayoutInteraction {
  constructor(config: BaseConfig, parent: Attribute) {
    config.insertAttribute(
      new Attribute({
        name: 'hovermode',
        type: { type: 'enum', value: ['x', 'y', 'closest', false, 'x unified', 'y unified'] },
        options: {
          parent,
          description: {
            type: 'string',
            value:
              '设置鼠标悬停时的显示模式。<br />' +
              '可选项说明：' +
              '<ul>' +
              '<li><code>closest</code>: 默认值。鼠标悬停时，在最接近的点出显示弹窗。</li>' +
              '<li><code>x</code>: 鼠标悬停时，当前 x 轴值域内的所有点处都显示弹窗。</li>' +
              '<li><code>y</code>: 鼠标悬停时，当前 y 轴值域内的所有点处都显示弹窗。</li>' +
              '<li><code>x unified</code>: 鼠标悬停时，将所有 x 轴值域内的点的信息集合到一个弹窗中显示。</li>' +
              '<li><code>y unified</code>: 鼠标悬停时，将所有 y 轴值域内的点信息集合到一个弹窗中显示。</li>' +
              '<li><code>false</code>: 关闭鼠标悬停。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'closest',
            options: ['closest', 'x', 'y', 'x unified', 'y unified', false]
          })
        }
      })
    )

    config.insertAttribute(
      new Attribute({
        name: 'clickmode',
        type: { type: 'enum', value: ['event', 'select', 'event+select', 'none'] },
        options: {
          parent,
          description: {
            type: 'string',
            value:
              '设置鼠标单击交互模式。<br />' +
              '可选项说明：' +
              '<ul>' +
              '<li><code>event</code>: 默认值。鼠标点击时，触发<code>plotly_click</code>事件。' +
              '此外，在 lasso（套索）模式和 select（选择）模式下，进行拖动时会触发<code>plotly_selected</code>事件，但不附带事件数据</li>' +
              '<li><code>select</code>: 鼠标点击数据点时将会选中该数据点。此模式还支持持久选择（即在点击时按住 Shift 键可添加/减去现有选择）。</li>' +
              '<li><code>event+select</code>: 同时启用<code>event</code>模式和<code>select</code>模式</li>' +
              '<li><code>none</code>: 关闭鼠标点击交互功能。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'event',
            options: ['event', 'select', 'event+select', 'none']
          })
        }
      })
    )

    const dragmodeOptions = [
      'zoom',
      'pan',
      'select',
      'lasso',
      'drawclosedpath',
      'drawopenpath',
      'drawline',
      'drawrect',
      'drawcircle',
      'orbit',
      'turntable',
      false
    ]

    config.insertAttribute(
      new Attribute({
        name: 'dragmode',
        type: { type: 'enum', value: dragmodeOptions },
        options: {
          parent,
          description: {
            type: 'string',
            value:
              '设置鼠标拖拽交互模式。<code>select</code>和<code>lasso</code>仅适用于带有标记或文本的散点图。' +
              '<code>orbit</code>和<code>turntable</code>仅适用于三维场景。'
          },
          controller: new AttributeController({ type: 'select', default: 'zoom', options: dragmodeOptions })
        }
      })
    )

    config.insertAttribute(
      new Attribute({
        name: 'selectdirection',
        type: { type: 'enum', value: ['any', 'h', 'v', 'd'] },
        options: {
          parent,
          description: {
            type: 'string',
            value:
              '设置选择模式方向。<br />' +
              '可选项说明：' +
              '<ul>' +
              '<li><code>any</code>: 默认值。选择任何方向。</li>' +
              '<li><code>h</code>: 只选择水平方向。</li>' +
              '<li><code>v</code>: 只选择垂直方向。</li>' +
              '<li><code>d</code>: 只选择对角线方向。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'any',
            options: ['any', 'h', 'v', 'd']
          })
        }
      })
    )

    config.insertAttribute(new ActiveSelection({ options: { parent } }))
    config.insertAttribute(new NewSelection({ options: { parent } }))
    config.insertAttribute(
      new Attribute({
        name: 'hoverdistance',
        type: 'number',
        options: {
          parent,
          description: {
            type: 'string',
            value:
              '设置数据点 hover 的触发范围。数值越大，鼠标就可以在距离数据点越远的区域内触发 hover 事件。单位为<code>px</code>。'
          },
          controller: new AttributeController({ type: 'number', default: 20, min: -1 })
        }
      })
    )
  }
}
