/**
 * 图表配置 store
 * 用于Plotly图表绘制
 */
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { type Hash, generateHash } from '../utils'
import { cloneDeep } from 'lodash'

// 定义配置对象的类型
interface Config {
  [key: string]: any
}

export const usePloyConfigStore = defineStore('ployConfig', (initialConfig: PlotlyConfig = {}) => {
  const config = ref<Config>(cloneDeep(initialConfig))
  const code = ref(JSON.stringify(config.value, null, 2))
  const configHash = ref<Hash>('')

  function updateConfig(id: string, value: any) {
    let props = id.split('-')
    let currentLevel = config.value
    if (props[0] === 'traces') {
      props = props.slice(2, props.length)
      currentLevel = currentLevel.data[0]
    }

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

    code.value = JSON.stringify(config.value, null, 2)
  }

  function removeConfig(id: string) {
    let props = id.split('-')
    let currentLevel = config.value
    if (props[0] === 'traces') {
      props = props.slice(2, props.length)
      currentLevel = currentLevel.data[0]
    }

    props.forEach((prop, index) => {
      if (index === props.length - 1) {
        // 最后一级属性，直接删除
        delete currentLevel[prop]
      } else {
        // 非最后一级，确保对象存在
        if (!currentLevel[prop]) {
          throw new Error(`属性 ${prop} 不存在。请检查路径是否正确。`)
        }
        currentLevel = currentLevel[prop]
      }
    })

    code.value = JSON.stringify(config.value, null, 2)
  }

  /**
   * 初始化图表配置
   * @param initialConfig
   */
  async function initConfig(initialConfig: PlotlyConfig = {}) {
    const hash = await generateHash(JSON.stringify(initialConfig))
    if (configHash.value !== hash) {
      configHash.value = hash
      config.value = cloneDeep(initialConfig)
      code.value = JSON.stringify(config.value, null, 2)
    }
  }

  onMounted(() => {
    generateHash(JSON.stringify(initialConfig)).then((hash) => {
      configHash.value = hash
    })
  })

  return { config, code, configHash, updateConfig, removeConfig, initConfig }
})
