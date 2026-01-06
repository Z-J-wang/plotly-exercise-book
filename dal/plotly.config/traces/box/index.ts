import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

export class BoxPointpos extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'pointpos',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '设置样本点相对于箱型的位置。若设置为“0”，则样本点将位于小提琴的中心之上。正值（负值）对应于垂直小提琴的右侧（左侧）位置，以及水平小提琴的上方（下方）。'
        },
        controller: new AttributeController({ type: 'number', default: 0, min: -2, max: 2, step: 0.1 })
      }
    }
    const mergedInitializer = merge(defaultInitializer, initializer)
    super(mergedInitializer.name, mergedInitializer.type, mergedInitializer.options)
  }
}

export class BoxJitter extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'jitter',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '设置绘制的样本点的抖动量。如果设置为“0”，则样本点将沿着分布轴对齐。如果设置为“1”，则样本点将以与小提琴图宽度相同的宽度进行随机抖动绘制。'
        },
        controller: new AttributeController({ type: 'number', default: 0, min: 0, max: 1, step: 0.1 })
      }
    }
    const mergedInitializer = merge(defaultInitializer, initializer)
    super(mergedInitializer.name, mergedInitializer.type, mergedInitializer.options)
  }
}
