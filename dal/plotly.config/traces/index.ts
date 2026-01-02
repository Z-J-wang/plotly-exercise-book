import Attribute from 'entity/attribute'
import { BaseConfig } from '../base'
import TraceScatter from './scatter/index'
import TraceBar from './bar/index'
import TracePie from './pie'
import TraceHeatmap from './heatmap'
import TraceViolin from './violin'

export default class Traces extends BaseConfig {
  constructor(parent: Attribute) {
    super(parent)
    this.insertAttribute(new TraceScatter(parent))
    this.insertAttribute(new TraceBar(parent))
    this.insertAttribute(new TracePie(parent))
    this.insertAttribute(new TraceHeatmap(parent))
    this.insertAttribute(new TraceViolin(parent))
  }
}
