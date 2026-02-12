import Attribute from 'entity/attribute'
import AttributeController from 'entity/attribute.controller'
import { merge } from 'lodash'

export default class TracePattern extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = { name: 'fillpattern', type: 'Pattern' }
    super(merge(defaultInitializer, initializer))

    this.addChild(new TracePatternShape({ options: { parent: this } }))
    this.addChild(new TracePatternFillmode({ options: { parent: this } }))
    this.addChild(new TracePatternFgcolor({ options: { parent: this } }))
    this.addChild(new TracePatternBgcolor({ options: { parent: this } }))
    this.addChild(new TracePatternFgopacity({ options: { parent: this } }))
    this.addChild(new TracePatternSize({ options: { parent: this } }))
    this.addChild(new TracePatternSolidity({ options: { parent: this } }))
  }
}

export class TracePatternShape extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'shape',
      type: { type: 'enum', value: ['', '/', '\\', 'x', '-', ',', '+', '.'] },
      options: {
        description: { type: 'string', value: '设置数据点的填充图案。' },
        controller: new AttributeController({
          type: 'select',
          default: '',
          options: ['', '/', '\\', 'x', '-', ',', '+', '.']
        })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TracePatternFillmode extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'fillmode',
      type: { type: 'enum', value: ['overlay', 'replace'] },
      options: {
        description: {
          type: 'string',
          value:
            '确定<code>marker.color</code>颜色作为“bgcolor”（背景颜色）的默认值，还是作为“fgcolor”（前景颜色）的默认值。' +
            '如果设置了<code>fillcolor</code>，则颜色值取自<code>fillcolor</code>。'
        },
        controller: new AttributeController({ type: 'select', default: 'replace', options: ['overlay', 'replace'] })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TracePatternFgcolor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'fgcolor',
      type: 'Color',
      options: {
        description: { type: 'string', value: '设置填充图案的前景色。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TracePatternBgcolor extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'bgcolor',
      type: 'Color',
      options: {
        description: { type: 'string', value: '设置填充图案背景色。' },
        controller: new AttributeController({ type: 'color', default: null })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TracePatternFgopacity extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'fgopacity',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '设置填充图案前景色透明度。当<code>fillmode = "overlay"</code>，默认值为<code>0.5</code>；否则为<code>1</code>。'
        },
        controller: new AttributeController({ type: 'number', default: null, min: 0, max: 1, step: 0.1 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TracePatternSize extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'size',
      type: 'number',
      options: {
        description: { type: 'string', value: '填充图案大小。' },
        controller: new AttributeController({ type: 'number', default: 8, min: 0 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}

export class TracePatternSolidity extends Attribute {
  constructor(initializer: Attribute.Initializer) {
    const defaultInitializer = {
      name: 'solidity',
      type: 'number',
      options: {
        description: {
          type: 'string',
          value:
            '设置图案填充的坚固度。坚固度表示由图案填充的区域所占的面积比例。<br />坚固度为 <code>0</code> 时，仅显示背景颜色而无图案；坚固度为 <code>1</code> 时，仅显示前景颜色而无图案。'
        },
        controller: new AttributeController({ type: 'number', default: 0.3, min: 0, max: 1, step: 0.1 })
      }
    }
    super(merge(defaultInitializer, initializer))
  }
}
