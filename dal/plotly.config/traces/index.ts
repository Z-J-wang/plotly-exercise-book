import Attribute from 'entities/attribute'
import { BaseConfig } from '../base'
import TraceScatter from './scatter/index'

export default class Layout extends BaseConfig {
  constructor(parent: Attribute) {
    super(parent)
    this.insertAttribute(new TraceScatter(parent))
  }
}
