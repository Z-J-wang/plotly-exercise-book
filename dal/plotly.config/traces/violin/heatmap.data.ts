import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class HeatmapData {
  constructor(parent: Attribute) {
    parent.addChild(
      new Attribute('x', '[]', {
        parent,
        description: {
          type: 'string',
          value: '设置 x 轴。\n' + '注意，这里的值仅仅时用来描述坐标轴。z为一维数组时，x必须提供。'
        }
      })
    )

    parent.addChild(
      new Attribute('x0', 'number', {
        parent,
        description: {
          type: 'string',
          value: '替代“x”。构建 x 坐标的线性空间。与“dx”一起使用时，其中“x0”为起始坐标，“dx”为步长。'
        },
        controller: new AttributeController({ default: 0, type: 'number' })
      })
    )
    parent.addChild(
      new Attribute('dx', 'number', {
        parent,
        description: {
          type: 'string',
          value: '替代“x”。构建 x 坐标的线性空间。与“x0”一起使用时，其中“x0”为起始坐标，“dx”为步长。'
        },
        controller: new AttributeController({ default: 1, type: 'number' })
      })
    )

    parent.addChild(
      new Attribute(
        'xtype',
        { type: 'enum', value: ['array', 'scaled'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '如果选择“array”模式，热图的 x 坐标由“x”给出（当提供“x”时，这是默认行为）。' +
              '如果选择“scaled”模式，热图的 x 坐标则由“x0”和“dx”给出（当未提供“x”时，这是默认行为）。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'array',
            options: ['array', 'scaled']
          })
        }
      )
    )

    parent.addChild(
      new Attribute('xgap', 'number', {
        parent,
        description: { type: 'string', value: '设置水平间距' },
        controller: new AttributeController({ default: 0, type: 'number' })
      })
    )

    parent.addChild(
      new Attribute('y', 'number[]', {
        parent,
        description: {
          type: 'string',
          value: '设置 y 轴。\n' + '注意，这里的值仅仅时用来描述坐标轴。z为一维数组时，y必须提供。'
        }
      })
    )

    parent.addChild(
      new Attribute('y0', 'number', {
        parent,
        description: {
          type: 'string',
          value: '替代“y”。构建 y 坐标的线性空间。与“dy”一起使用时，其中“y0”为起始坐标，“dy”为步长。'
        }
      })
    )

    parent.addChild(
      new Attribute('dy', 'number', {
        parent,
        description: { type: 'string', value: 'Y轴数据间隔。' },
        controller: new AttributeController({ default: 1 })
      })
    )

    parent.addChild(
      new Attribute(
        'ytype',
        { type: 'enum', value: ['array', 'scaled'] },
        {
          parent,
          description: {
            type: 'string',
            value:
              '如果选择“array”模式，热图的 y 坐标由“y”给出（当提供“y”时，这是默认行为）。' +
              '如果选择“scaled”模式，热图的 y 坐标则由“y0”和“dy”给出（当未提供“y”时，这是默认行为）。'
          }
        }
      )
    )

    parent.addChild(
      new Attribute('ygap', 'number', {
        parent,
        description: { type: 'string', value: '设置垂直间距' },
        controller: new AttributeController({ default: 0, type: 'number' })
      })
    )

    parent.addChild(
      new Attribute('z', 'number[][] | number[]', {
        parent,
        description: {
          type: 'string',
          value: [
            '描述热图值与颜色映射关系数据的数组。数值越大，颜色越深。\n',
            '在“z”中存储的数据既可以是二维的值数组（可能是不规则的，也可能是规则的），也可以是单维的值数组。\n',
            '如果“z”是一个二维数组，假设它有 N 行和 M 列。那么，默认情况下，生成的热图将在 y 轴上有 N 个分区，在 x 轴上有 M 个分区。',
            '换句话说，数组“z”中的第 i 行/第 j 列单元格将映射到 y 轴的第 i 个分区（从图的底部开始）和 x 轴的第 j 个分区（从图的左侧开始）。',
            '这种行为可以通过使用“transpose”来反转。\n',
            '此外，“x”（“y”）可以提供 M 或 M+1（N 或 N+1）个元素。',
            '如果 M（N），那么坐标对应于热图单元格中心，且单元格具有相等的宽度。',
            '如果 M+1（N+1），那么坐标对应于热图单元格的边缘。\n',
            '如果“z”是 一个一维数组，那么在“x”和“y”中必须分别提供 M 或 M+1（N 或 N+1）个元素，以形成数据三元组。'
          ]
        }
      })
    )

    parent.addChild(
      new Attribute('transpose', 'boolean', {
        parent,
        description: {
          type: 'string',
          value:
            '反转热力图矩阵的映射关系。默认情况下，热力图矩阵的行索引对应于 y 轴，列索引对应于 x 轴。' +
            '如果 “transpose” 为 “true”，则行索引对应于 x 轴，列索引对应于 y 轴。\n' +
            '注意，反转后如果数据长度大于给定的坐标轴长度，超出的部分不会显示。'
        },
        controller: new AttributeController({ type: 'boolean', default: false })
      })
    )
  }
}
