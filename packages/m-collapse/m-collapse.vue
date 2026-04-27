<template>
  <view :class="`m-collapse ${customClass}`" :style="customStyle">
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-collapse',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { ref, watch, provide } from 'vue'
import { collapseProps, type CollapseExpose, type CollapseProvide, COLLAPSE_KEY } from './types'

const props = defineProps(collapseProps)
const emit = defineEmits<{
  (e: 'change', value: { value: string | string[] }): void
  (e: 'update:modelValue', value: string | string[]): void
}>()

// 存储子组件实例
const children = ref<any[]>([])

// 提供给子组件的方法和属性
const provideValue: CollapseProvide = {
  props,
  toggle
}

provide(COLLAPSE_KEY, provideValue)

// 监听 modelValue 变化，验证类型
watch(
  () => props.modelValue,
  (newVal) => {
    const { accordion } = props
    if (accordion && typeof newVal !== 'string') {
      console.error('accordion value must be string')
    } else if (!accordion && !Array.isArray(newVal)) {
      console.error('value must be Array')
    }
  },
  { deep: true }
)

/**
 * 更新绑定值
 * @param activeNames 选中的值
 */
function updateChange(activeNames: string | string[]) {
  emit('update:modelValue', activeNames)
  emit('change', {
    value: activeNames
  })
}

/**
 * 切换选中状态
 * @param name 唯一标识符
 * @param expanded 是否展开
 */
function toggle(name: string, expanded: boolean) {
  const { accordion, modelValue } = props
  if (accordion) {
    updateChange(name === modelValue ? '' : name)
  } else if (expanded) {
    updateChange((modelValue as string[]).concat(name))
  } else {
    updateChange((modelValue as string[]).filter((activeName) => activeName !== name))
  }
}

/**
 * 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换
 * @param options 面板状态
 */
const toggleAll = (options: any = {}) => {
  if (props.accordion) {
    return
  }
  if (typeof options === 'boolean') {
    options = { expanded: options }
  }

  const { expanded, skipDisabled } = options
  const names: string[] = []
  children.value.forEach((item, index) => {
    if (item.disabled && skipDisabled) {
      if (item.getExpanded()) {
        names.push(item.name || index.toString())
      }
    } else if (typeof expanded === 'boolean' ? expanded : !item.getExpanded()) {
      names.push(item.name || index.toString())
    }
  })
  updateChange(names)
}

// 暴露方法
defineExpose<CollapseExpose>({
  toggleAll
})
</script>

<style lang="scss">
@use './index.scss';
</style>