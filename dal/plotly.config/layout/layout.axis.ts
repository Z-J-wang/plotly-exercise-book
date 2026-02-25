import Attribute from 'entity/attribute'
import { merge } from 'lodash'

export default class LayoutAxis extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      type: 'LayoutAxis',
      options: {
        description: { type: 'string', value: '自定义坐标轴。' }
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
