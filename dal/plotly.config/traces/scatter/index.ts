import Attribute from 'entities/attribute'
import { TraceName, TraceVisible, TraceLegendAbout } from '../base'

export default class TraceScatter extends Attribute {
  constructor(parent: Attribute) {
    super('scatter', 'Scatter', {
      parent,
      description: {
        type: 'string',
        value: 'Scatter Trace'
      },
      initialConfig: {
        config: { displayModeBar: 'hover' },
        data: [{ x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'lines+markers', type: 'scatter', name: 'scatter trace' }],
        layout: { title: { text: 'Config Title' }, showlegend: true }
      }
    })

    this.addChild(new TraceName(this))
    this.addChild(new TraceVisible(this))
    new TraceLegendAbout(this)
  }
}
