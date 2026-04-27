<template>
  <view :class="`m-collapse-item ${disabled ? 'is-disabled' : ''} ${border ? 'is-border' : ''} ${customClass}`" :style="customStyle">
    <view
      :class="`m-collapse-item__header ${expanded ? 'is-expanded' : ''} ${$slots.title ? 'is-custom' : ''}`"
      @click="handleClick"
    >
      <slot name="title" :expanded="expanded" :disabled="disabled">
        <text class="m-collapse-item__title">{{ title }}</text>
        <view :class="`m-collapse-item__arrow ${expanded ? 'is-retract' : ''}`">
          <uni-icons type="bottom" size="24"></uni-icons>
        </view>
      </slot>
    </view>
    <view class="m-collapse-item__wrapper" :style="contentStyle" @transitionend="handleTransitionEnd">
      <view class="m-collapse-item__body" :class="customBodyClass" :style="customBodyStyle" :id="collapseId">
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-collapse-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, ref, watch, onMounted, inject, getCurrentInstance } from 'vue'
import { collapseItemProps, type CollapseItemExpose } from './types'
import { COLLAPSE_KEY, type CollapseProvide } from '../m-collapse/types'

// 生成唯一ID
const collapseId = ref<string>(`collapseId_${Date.now()}_${Math.floor(Math.random() * 1000)}`)

// 接收属性
const props = defineProps(collapseItemProps)

// 注入父组件提供的方法和属性
const collapse = inject<CollapseProvide | undefined>(COLLAPSE_KEY)

// 响应式数据
const height = ref<string | number>('')
const inited = ref<boolean>(false)
const expanded = ref<boolean>(false)

// 计算是否选中
const isSelected = computed(() => {
  const modelValue = collapse?.props.modelValue || []
  const { name } = props
  return typeof modelValue === 'string' ? modelValue === name : (modelValue as string[]).includes(name)
})

// 计算内容样式（用于动画）
const contentStyle = computed(() => {
  const style: any = {}
  if (inited.value) {
    style.transition = 'height 0.3s ease-in-out'
  }
  if (!expanded.value) {
    style.height = '0px'
  } else if (height.value) {
    style.height = typeof height.value === 'number' ? `${height.value}px` : height.value
  }
  return style
})

// 监听选中状态变化
watch(
  () => isSelected.value,
  (newVal) => {
    updateExpand(newVal)
  }
)

// 组件挂载后初始化
onMounted(() => {
  updateExpand(isSelected.value)
})

/**
 * 更新展开状态
 * @param useBeforeExpand 是否使用展开前钩子
 */
async function updateExpand(useBeforeExpand: boolean = true) {
  try {
    if (useBeforeExpand) {
      await handleBeforeExpand()
    }
    initRect()
  } catch (error) {
    // 忽略错误
  }
}

/**
 * 初始化内容高度
 */
function initRect() {
  const query = uni.createSelectorQuery().in(getCurrentInstance()?.proxy as any)
  query.select(`#${collapseId.value}`).boundingClientRect()
  query.exec((res) => {
    if (res && res[0]) {
      const { height: rectHeight } = res[0]
      height.value = rectHeight
      // 下一帧更新展开状态
      setTimeout(() => {
        expanded.value = isSelected.value
        if (!inited.value) {
          inited.value = true
        }
      }, 0)
    }
  })
}

/**
 * 动画结束回调
 */
function handleTransitionEnd() {
  if (expanded.value) {
    height.value = ''
  }
}

/**
 * 点击事件处理
 */
async function handleClick() {
  if (props.disabled) return
  try {
    await updateExpand()
    const { name } = props
    collapse?.toggle(name, !expanded.value)
  } catch (error) {
    // 忽略错误
  }
}

/**
 * 展开前钩子
 */
function handleBeforeExpand() {
  return new Promise<void>((resolve, reject) => {
    const { name } = props
    const nextexpanded = !expanded.value
    if (nextexpanded && props.beforeExpend) {
      const result = props.beforeExpend(name)
      if (typeof result === 'boolean') {
        result ? resolve() : reject()
      } else if (result instanceof Promise) {
        result.then(() => resolve()).catch(() => reject())
      } else {
        resolve()
      }
    } else {
      resolve()
    }
  })
}

/**
 * 获取展开状态
 */
function getExpanded() {
  return expanded.value
}

// 暴露方法
defineExpose<CollapseItemExpose>({ getExpanded, updateExpand })
</script>

<style lang="scss">
@use './index.scss';
</style>