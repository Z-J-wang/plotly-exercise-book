import { PlotData } from './base'

export interface ScatterTrace extends PlotData {
  type: 'scatter'
  legend: string // default: 'legend'。layout的legend属性的名称。layout的legend属性用于描述了图例的布局，允许定义多个legend属性，如：'legend’（默认），'legend1’，'legend2’
}
