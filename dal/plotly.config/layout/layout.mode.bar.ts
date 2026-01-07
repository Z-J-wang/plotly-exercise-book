import { modeBarDefaultButtons } from '@/utils'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class LayoutModeBar extends Attribute {
  constructor(parent: Attribute) {
    super('modebar', 'Modebar', { parent, description: { type: 'string', value: '右上角模式（工具）栏设置' } })
    this.addChild(
      new Attribute('activecolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '激活按钮颜色' },
        controller: new AttributeController({
          type: 'color',
          default: null
        })
      })
    )

    this.addChild(
      new Attribute('add', 'string | string[]', {
        parent: this,
        description: {
          type: 'string',
          value:
            '基于默认的模式（工具）栏，添加预设按钮。<br />' +
            '请注意，这些按钮只有在它们与图表中使用的所有轨迹类型兼容时才会显示。' +
            '该属性与<a href="/#/docs/config/?id=config-modeBarButtonsToAdd"><code>config.modeBarButtonsToAdd</code></a>选项类似。'
        },
        controller: new AttributeController({
          type: 'select',
          default: '',
          multiple: true,
          options: modeBarDefaultButtons
        })
      })
    )

    this.addChild(
      new Attribute('bgcolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '模式栏背景颜色' },
        controller: new AttributeController({
          type: 'color',
          default: null
        })
      })
    )

    this.addChild(
      new Attribute('color', 'Color', {
        parent: this,
        description: { type: 'string', value: '模式栏按钮默认状态下的颜色' },
        controller: new AttributeController({
          type: 'color',
          default: null
        })
      })
    )

    this.addChild(
      new Attribute('orientation', 'string', {
        parent: this,
        description: { type: 'string', value: '模式栏排列方式。' },
        controller: new AttributeController({
          type: 'select',
          default: 'h',
          options: ['v', 'h']
        })
      })
    )

    this.addChild(
      new Attribute('remove', 'string | string[]', {
        parent: this,
        description: {
          type: 'string',
          value:
            '基于默认的模式（工具）栏，删除预设按钮。<br />' +
            '请注意，这些按钮只有在它们与图表中使用的所有轨迹类型兼容时才会显示。' +
            '该属性与<a href="/#/docs/config/?id=config-modeBarButtonsToRemove"><code>config.modeBarButtonsToRemove</code></a>类似。'
        },
        controller: new AttributeController({
          type: 'select',
          default: [],
          multiple: true,
          options: modeBarDefaultButtons
        })
      })
    )

    this.addChild(
      new Attribute('uirevision', 'number | string', {
        parent: this,
        description: {
          type: 'string',
          value:
            '控制与模式栏相关的用户驱动更改的持久性，包括“悬停模式”、' +
            '“拖动模式”和“显示尖峰”在根级别以及子图内部的设置。默认值等于' +
            '<a href="/#/docs/config/?id=layout-uirevision"><code>layout.uirevision</code></a>属性值。'
        }
      })
    )
  }
}
