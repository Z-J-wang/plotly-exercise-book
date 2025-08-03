import { defineStore } from 'pinia'
import optionsData from 'bll/options'
import Attribute from 'entities/attribute'

export const useAttributeStore = defineStore('attribute', () => {
  const attribute: Attribute[] = optionsData

  /**
   * 根据路径更新指定属性
   * @param path
   * @param value
   */
  function updateAttribute(path: string, value: any) {}

  return { attribute, updateAttribute }
})
