import Attribute from 'entity/attribute'
import { merge } from 'lodash'

export default class LayoutColorAxis extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'coloraxis',
      type: 'LayoutColorAxis',
      options: {
        description: { type: 'string', value: '自定义颜色轴坐标轴。' }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
