import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义配置对象的类型
interface Config {
  [key: string]: any
}

export const usePloyConfigStore = defineStore('ployConfig', () => {
  const config = ref<Config>({})

  function updateConfig(id: string, value: any) {
    const props = id.split('-')
    let currentLevel = config.value
    props.forEach((prop, index) => {
      if (index === props.length - 1) {
        // 最后一级属性，直接赋值
        currentLevel[prop] = value
      } else {
        // 非最后一级，确保对象存在
        if (!currentLevel[prop]) {
          currentLevel[prop] = {}
        }
        currentLevel = currentLevel[prop]
      }
    })
  }

  return { config, updateConfig }
})
