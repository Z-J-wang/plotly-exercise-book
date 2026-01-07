import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

export class BoxBoxPoints extends Attribute {
  constructor(initialization: Attribute.Initialization) {
    const defaultInitialization = {
      name: 'boxpoints',
      type: { type: 'enum', value: ['outliers', 'suspectedoutliers', 'all', false] },
      options: {
        description: {
          type: 'markdown',
          value: `
设置数据点的显示方式：
- **outliers**：只显示异常样本数据点。
- **suspectedoutliers**：只显示疑似异常样本数据点。
- **all**：显示所有数据点。
- **false**：不显示数据点。

当设置了 \`marker.outliercolor\` 或 \`marker.line.outliercolor\` 时，默认值为\`suspectedoutliers\`，否则默认值为\`outliers\`。
          `
        },

        controller: new AttributeController({
          type: 'select',
          default: null,
          options: ['outliers', 'suspectedoutliers', 'all', false]
        })
      }
    }

    const mergedInitialization = merge(defaultInitialization, initialization)
    super(mergedInitialization.name, mergedInitialization.type, mergedInitialization.options)
  }
}
