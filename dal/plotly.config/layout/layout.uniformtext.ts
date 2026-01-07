import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'

export default class LayoutUniformtext extends Attribute {
  constructor(parent: Attribute | null) {
    const description: Attribute.Description = {
      type: 'string',
      value: '<span class="font-bold">未试验出实际效果，需进一步核验！</span><br/>' + '设置轨迹的文本元素的统一样式。'
    }
    super('uniformtext', 'Uniformtext', { parent, description })
    this.addChild(
      new Attribute('minsize', 'number', {
        parent: this,
        description: { type: 'string', value: '设置同一类型轨迹之间文本的最小尺寸，单位为<code>px</code>。' },
        controller: new AttributeController({ type: 'number', default: 0, min: 0 })
      })
    )

    this.addChild(
      new Attribute(
        'mode',
        { type: 'enum', value: [false, 'hide', 'show'] },
        {
          parent: this,
          description: {
            type: 'string',
            value:
              '设置不同文本元素的字体大小在每种轨迹之间的统一方式。<br />' +
              '可选择说明：' +
              '<ul>' +
              '<li><code>false</code>: 默认值，不进行统一。</li>' +
              '<li><code>hide</code>: 当计算出的文本大小小于' +
              '<code>layout.uniformtext.minsize</code>则隐藏。</li>' +
              '<li><code>show</code>: 当计算出的文本大小小于' +
              '<code>layout.uniformtext.minsize</code>强制显示且不会进一步缩小字体大小。</li>' +
              '</ul>'
          },
          controller: new AttributeController({
            type: 'select',
            default: false,
            options: [false, 'hide', 'show']
          })
        }
      )
    )
  }
}
