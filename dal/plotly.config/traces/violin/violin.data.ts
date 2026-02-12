import { merge } from 'lodash'
import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import exampleData from '@/assets/data/violin.json'
import { BaseWidth } from 'dal/plotly.config/base'

export default class HeatmapData {
  constructor(parent: Attribute) {
    parent.addChild(new ViolinX({ options: { parent } }))
    parent.addChild(new ViolinX0({ options: { parent } }))
    parent.addChild(new ViolinY({ options: { parent } }))
    parent.addChild(new ViolinY0({ options: { parent } }))
    parent.addChild(new ViolinWidth({ options: { parent } }))
  }
}

export class ViolinX extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'x',
      type: '[]',
      options: {
        parent,
        description: {
          type: 'markdown',
          value: `
设置 x 轴的数据。其值可以数字数组或者字符串。当值为数字数组，而y轴是字符串数组时，小提琴图水平放置。反之，则小提琴图垂直放置。

> 点右侧按钮查看示例。
            `
        },
        controller: new AttributeController({
          type: 'jsonString',
          default: null,
          value: exampleData.map((item) => item.total_bill),
          disabled: true
        }),
        initialConfig: {
          data: [
            {
              type: 'violin',
              box: { visible: true },
              boxpoints: false,
              line: { color: 'black' },
              fillcolor: '#8dd3c7',
              opacity: 0.6,
              meanline: { visible: true },
              y0: 'Total Bill',
              x: exampleData.map((item) => item.total_bill)
            }
          ],
          layout: {
            title: { text: '小提琴图水平放置' },
            yaxis: { zeroline: true }
          }
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ViolinX0 extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'x0',
      type: 'number | string',
      options: {
        parent,
        description: {
          type: 'string',
          value:
            '设置单框轨迹的 x 坐标，或者使用 q1/中位数/q3 的值来设置多框轨迹的起始坐标。注意，当属性“X”存在时，该属性无效。'
        },
        controller: new AttributeController({ default: null, type: 'string', value: 'Total Bill' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ViolinY extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'y',
      type: '[]',
      options: {
        parent,
        description: {
          type: 'markdown',
          value: `
设置 y 轴的数据。其值可以数字数组或者字符串。当值为数字数组，而 x 轴是字符串数组时，小提琴图垂直放置。反之，则小提琴图水平放置。

> 点右侧按钮查看示例。
            `
        },
        controller: new AttributeController({
          type: 'jsonString',
          default: null,
          value: exampleData.map((item) => item.total_bill),
          disabled: true
        }),
        initialConfig: {
          data: [
            {
              type: 'violin',
              box: { visible: true },
              boxpoints: false,
              line: { color: 'black' },
              fillcolor: '#8dd3c7',
              opacity: 0.6,
              meanline: { visible: true },
              x0: 'Total Bill',
              y: exampleData.map((item) => item.total_bill)
            }
          ],
          layout: {
            title: { text: '小提琴图垂直放置' },
            yaxis: { zeroline: true }
          }
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ViolinY0 extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'y0',
      type: 'number',
      options: {
        parent,
        description: {
          type: 'string',
          value:
            '设置单框轨迹的 y 坐标，或者使用 q1/中位数/q3 的值来设置多框轨迹的起始坐标。注意，当属性“y”存在时，该属性无效。'
        },
        controller: new AttributeController({ default: null, type: 'string', value: 'Total Bill' })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class ViolinWidth extends BaseWidth {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      options: {
        parent,
        description: { type: 'string', value: '设置小提琴的宽度。当设置为默认值时，将自动选择宽度。' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0, max: 10, step: 0.1 }),
        initialConfig: {
          data: [
            {
              type: 'violin',
              box: { visible: true },
              boxpoints: false,
              line: { color: 'black' },
              fillcolor: '#8dd3c7',
              opacity: 0.6,
              meanline: { visible: true },
              x: exampleData.map((item) => item.day),
              y: exampleData.map((item) => item.total_bill)
            }
          ],
          layout: {
            title: { text: '自定义小提琴图的宽度' },
            yaxis: { zeroline: true }
          }
        }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
