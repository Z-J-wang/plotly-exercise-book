import { defineStore } from 'pinia'
import plotlyConfigData from 'bll/plotly.config'
import Attribute from 'entity/attribute'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePloyConfigStore } from './ploy.config'

// 显式定义 store 返回类型
interface AttributeStore {
  tree: Ref<Attribute[]>
  branch: Ref<Attribute[]>
  resetPlotlyConfig: (path: Attribute.Path[]) => Promise<void>
}

export const useAttributeStore = defineStore('attribute', (): AttributeStore => {
  const tree = ref<Attribute[]>(plotlyConfigData) as Ref<Attribute[]>
  const branch = ref<Attribute[]>() as Ref<Attribute[]>
  const currentRootID = ref('')
  const route = useRoute()
  const ployConfigStore = usePloyConfigStore()
  const { initConfig } = ployConfigStore

  watch(
    () => route.query,
    (query) => {
      const id = query?.id || ''
      if (!id || typeof id !== 'string') return

      const ids = id.split('-')
      let branchData!: Attribute
      let rootID = ''

      /**
       * 为了优化性能，将 traces 节点和 traces 子节点做分离。避免 branchData过长。
       */
      if (id === 'traces') {
        // 单独提取 traces 节点
        rootID = 'traces'
        if (currentRootID.value && currentRootID.value === rootID) return

        currentRootID.value = rootID
        const tracesData = tree.value.find((item: Attribute) => item.id === rootID) as Attribute
        const { type, name, description, parent, controller, initialConfig } = tracesData
        branchData = new Attribute(name, type, { description, controller, parent, initialConfig })
      } else if (ids[0] === 'traces') {
        rootID = `${ids[0]}-${ids[1]}`
        if (currentRootID.value && currentRootID.value === rootID) return

        const traces = tree.value.find((item: Attribute) => item.id === 'traces')
        if (traces) {
          // 提取 traces 节点下的子节点
          branchData = traces.children.find((item: Attribute) => item.id === rootID) as Attribute
        }
      } else {
        rootID = ids[0]
        if (currentRootID.value && currentRootID.value === rootID) return
        currentRootID.value = rootID
        branchData = tree.value.find((item: Attribute) => item.id === rootID) || tree.value[0]
      }

      branchData.initialConfig && initConfig(branchData.initialConfig)
      branch.value = [branchData]
    },
    { immediate: true }
  )

  /**
   * 根据路径重置图表配置
   * @param path
   * @param value
   */
  function resetPlotlyConfig(path: Attribute.Path[]) {
    return new Promise<void>((resolve) => {
      let currentLevel = { children: tree.value } as Attribute // 构造一个虚拟根节点
      const len = path.length
      let newPlotlyConfig!: PlotlyConfig

      for (let i = 0; i < len; i++) {
        const name = path[i].name

        // 根据路径自上而下找到对应层级的节点
        const target = currentLevel.children.find((item) => item.name === name)
        if (!target) throw new Error(`属性 ${name} 不存在。请检查路径是否正确。`)
        currentLevel = target

        // 记录路径中节点的initialConfig，子节点的initialConfig会覆盖父节点的initialConfig
        if (target.initialConfig) newPlotlyConfig = target.initialConfig
      }

      // 初始化图表
      initConfig(newPlotlyConfig)

      setTimeout(() => resolve(), 300) // 延迟300ms，等待图表初始化完成
    })
  }

  return { tree, branch, resetPlotlyConfig }
})
