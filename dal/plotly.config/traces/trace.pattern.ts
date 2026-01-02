import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class TracePattern extends Attribute {
  constructor(name: string, options?: Attribute.Options) {
    super(name, 'Pattern', options)

    this.addChild(
      new Attribute(
        'shape',
        { type: 'enum', value: ['', '/', '\\', 'x', '-', ',', '+', '.'] },
        {
          parent: this,
          description: { type: 'string', value: '设置数据点的填充图案。' },
          controller: new AttributeController({
            type: 'select',
            default: '',
            options: ['', '/', '\\', 'x', '-', ',', '+', '.']
          })
        }
      )
    )

    this.addChild(
      new Attribute(
        'fillmode',
        { type: 'enum', value: ['overlay', 'replace'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '确定<code>marker.color</code>颜色作为“bgcolor”（背景颜色）的默认值，还是作为“fgcolor”（前景颜色）的默认值。' +
              '如果设置了<code>fillcolor</code>，则颜色值取自<code>fillcolor</code>。'
          },
          controller: new AttributeController({
            type: 'select',
            default: 'replace',
            options: ['overlay', 'replace']
          })
        }
      )
    )

    this.addChild(
      new Attribute('fgcolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '设置填充图案的前景色。' },
        controller: new AttributeController({ type: 'color', default: null })
      })
    )

    this.addChild(
      new Attribute('bgcolor', 'Color', {
        parent: this,
        description: { type: 'string', value: '设置填充图案背景色。' },
        controller: new AttributeController({ type: 'color', default: null })
      })
    )

    this.addChild(
      new Attribute('fgopacity', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '设置填充图案前景色透明度。当<code>fillmode = "overlay"</code>，默认值为<code>0.5</code>；否则为<code>1</code>。'
        },
        controller: new AttributeController({ type: 'number', default: null, min: 0, max: 1, step: 0.1 })
      })
    )

    this.addChild(
      new Attribute('size', 'number', {
        parent: this,
        description: { type: 'string', value: '填充图案大小。' },
        controller: new AttributeController({ type: 'number', default: 8, min: 0 })
      })
    )

    this.addChild(
      new Attribute('solidity', 'number', {
        parent: this,
        description: {
          type: 'string',
          value:
            '设置图案填充的坚固度。坚固度表示由图案填充的区域所占的面积比例。<br />坚固度为 <code>0</code> 时，仅显示背景颜色而无图案；坚固度为 <code>1</code> 时，仅显示前景颜色而无图案。'
        },
        controller: new AttributeController({ type: 'number', default: 0.3, min: 0, max: 1, step: 0.1 })
      })
    )
  }
}
