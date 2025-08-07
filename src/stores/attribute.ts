import { defineStore } from 'pinia'
import plotlyConfigData from 'bll/plotly.config'
import Attribute from 'entities/attribute'
import { ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePloyConfigStore } from './ploy.config'

// 显式定义 store 返回类型
interface AttributeStore {
  tree: Ref<Attribute[]>
  branch: Ref<Attribute[]>
  updateAttribute: (path: Attribute.Path[], value: any) => void
}

export const useAttributeStore = defineStore('attribute', (): AttributeStore => {
  const tree = ref<Attribute[]>(plotlyConfigData) as Ref<Attribute[]>
  const branch = ref<Attribute[]>() as Ref<Attribute[]>
  const currentRootID = ref('')
  const route = useRoute()
  const ployConfigStore = usePloyConfigStore()
  const { initConfig } = ployConfigStore
  watch(
    () => route.hash,
    (value) => {
      const rootID = value.split('-')[0].replace('#', '')
      if (currentRootID.value && currentRootID.value === rootID) return
      currentRootID.value = rootID
      const temp = tree.value.find((item: Attribute) => item.id === rootID) || tree.value[0]
      temp.initialConfig && initConfig(temp.initialConfig)
      branch.value = [temp]
    },
    { immediate: true }
  )

  /**
   * 根据路径更新指定属性
   * @param path
   * @param value
   */
  function updateAttribute(path: Attribute.Path[], value: any) {
    let currentLevel = { children: tree.value } as Attribute // 构造一个虚拟根节点
    const len = path.length

    for (let i = 0; i < len; i++) {
      const name = path[i].name

      // 根据路径自上而下找到对应层级的节点
      const target = currentLevel.children.find((item) => item.name === name)
      if (!target) throw new Error(`属性 ${name} 不存在。请检查路径是否正确。`)
      currentLevel = target

      // 如果是最后一层，则更新属性值
      if (i === len - 1) {
        if (currentLevel.controller) {
          currentLevel.controller.value = value
        } else {
          throw new Error(`属性 ${name} 的控制器不存在。`)
        }
      }
    }
  }

  return { tree, branch, updateAttribute }
})
