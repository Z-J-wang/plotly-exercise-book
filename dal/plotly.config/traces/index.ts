import Attribute from 'entities/attribute'
import { BaseConfig } from '../base'
import TraceScatter from './scatter/index'
import TraceBar from './bar/index'

export default class Traces extends BaseConfig {
  constructor(parent: Attribute) {
    super(parent)
    this.insertAttribute(new TraceScatter(parent))
    this.insertAttribute(new TraceBar(parent))
  }
}
