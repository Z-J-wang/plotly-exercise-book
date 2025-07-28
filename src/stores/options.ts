import { defineStore } from 'pinia'
import optionsData from 'bll/options'
import Attribute from 'entities/attribute'

export const useOptionsStore = defineStore('options', () => {
  const options: Attribute[] = optionsData

  return { options }
})
