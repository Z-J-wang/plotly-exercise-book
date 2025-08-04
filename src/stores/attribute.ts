import { defineStore } from 'pinia'
import optionsData from 'bll/options'
import Attribute from 'entities/attribute'
import { ref } from 'vue'

export const useAttributeStore = defineStore('attribute', () => {
  const attribute = ref<Attribute[]>(optionsData)

  /**
   * 根据路径更新指定属性
   * @param path
   * @param value
   */
  function updateAttribute(path: Attribute.Path[], value: any) {
    let currentLevel = { children: attribute.value } as Attribute // 构造一个虚拟根节点
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

  return { attribute, updateAttribute }
})
