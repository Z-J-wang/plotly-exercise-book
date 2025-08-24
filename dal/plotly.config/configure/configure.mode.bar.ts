import { modeBarDefaultButtons } from '@/utils'
import type { BaseConfig } from '../base'
import Attribute from 'entities/attribute'
import AttributeController from 'entities/attribute.controller'
import ConfigureImageOptions from './configure.Image.options'

export default class ConfigureModeBar {
  constructor(config: BaseConfig, parent: Attribute) {
    config.insertAttribute(
      new Attribute(
        'displayModeBar',
        { type: 'enum', value: ['true', 'false', 'hover'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '如何显示右上角模式（工具）栏。工具栏可通过<a href="/#/docs/config/?id=layout-modebar"><code>layout.modebar</code></a>属性配置。'
          },
          controller: new AttributeController({ type: 'select', default: 'hover', options: [true, false, 'hover'] })
        }
      )
    )

    config.insertAttribute(
      new Attribute('showSendToCloud', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '是否在右上角模式（工具）栏中显示【Edit in Chart Studio】按钮，将图表发送到 Plotly 服务器。' +
            '服务器地址需要通过<a href="/#/docs/config/?id=layout-sendtocloud"><code>layout.sendtocloud</code></a>属性配置。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    config.insertAttribute(
      new Attribute('showEditInChartStudio', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '与<code>showSendToCloud</code>属性相同，但使用铅笔图标而不是软盘图标。' +
            '<span class="font-bold">注意</span>，如果<code>showSendToCloud</code>和<code>showEditInChartStudio</code>' +
            '都启用，则<code>showSendToCloud</code>会被忽略。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )

    config.insertAttribute(
      new Attribute('modeBarButtonsToAdd', 'string | string[]', {
        parent,
        description: {
          type: 'string',
          value:
            '基于默认的模式（工具）栏，添加预设按钮。<br />' +
            '请注意，这些按钮只有在它们与图表中使用的所有轨迹类型兼容时才会显示。' +
            '该属性与<a href="/#/docs/config/?id=layout-modebar-add"><code>layout.modebar.add</code></a>属性类似，' +
            '但会被<code>layout.modebar.add</code>覆盖。'
        },
        controller: new AttributeController({
          type: 'select',
          default: [],
          multiple: true,
          options: modeBarDefaultButtons
        })
      })
    )

    config.insertAttribute(
      new Attribute('modeBarButtonsToRemove', 'string | string[]', {
        parent,
        description: {
          type: 'string',
          value:
            '基于默认的模式（工具）栏，删除预设按钮。<br />' +
            '请注意，这些按钮只有在它们与图表中使用的所有轨迹类型兼容时才会显示。' +
            '该属性与<a href="/#/docs/config/?id=layout-modebar-remove"><code>layout.modebar.remove</code></a>类似，' +
            '但会被<code>layout.modebar.remove</code>覆盖。'
        },
        controller: new AttributeController({
          type: 'select',
          default: [],
          multiple: true,
          options: modeBarDefaultButtons
        })
      })
    )

    config.insertAttribute(new ConfigureImageOptions(parent))

    config.insertAttribute(
      new Attribute('displaylogo', 'boolean', {
        parent,
        description: {
          type: 'string',
          value: '是否在右上角模式（工具）栏中显示 Plotly Logo。'
        },
        controller: new AttributeController({ type: 'boolean', default: true })
      })
    )

    config.insertAttribute(
      new Attribute('watermark', 'boolean', {
        parent,
        description: {
          type: 'string',
          value: '是否在图表中显示水印？开启后，在图表右上角会显示 Plotly Logo。不受<code>displaying</code>影响。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )
  }
}
