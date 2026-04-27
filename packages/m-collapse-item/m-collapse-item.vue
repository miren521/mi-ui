<template>
  <view :class="`m-collapse-item ${disabled ? 'is-disabled' : ''} ${border ? 'is-border' : ''} ${customClass}`" :style="customStyle">
    <view
      :class="`m-collapse-item__header ${expanded ? 'is-expanded' : ''} ${$slots.title ? 'is-custom' : ''}`"
      @click="handleClick"
    >
      <slot name="title" :expanded="expanded" :disabled="disabled" :loading="loading">
        <text class="m-collapse-item__title">{{ title }}</text>
        <view :class="`m-collapse-item__arrow ${expanded ? 'is-retract' : ''}`">
          <m-icon v-if="!loading" name="chevron-down" size="22" color="#4e5369" />
          <m-icon v-else name="refresh1" size="22" color="#4e5369" class="m-icon-loading" />
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
import MIcon from '../m-icon/m-icon.vue'

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
const loading = ref<boolean>(false)

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
    updateExpand(false) // 状态变化时不触发展开前回调
  }
)

// 组件挂载后初始化
onMounted(() => {
  updateExpand(false) // 初始化时不触发展开前回调
})

/**
 * 更新展开状态
 * @param useBeforeExpand 是否使用展开前钩子
 */
async function updateExpand(useBeforeExpand: boolean = false) {
  if (useBeforeExpand) {
    await handleBeforeExpand()
  }
  initRect()
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
    if (props.disabled || loading.value) return
    try {
      await updateExpand(true) // 点击时触发展开前回调
      const { name } = props
      collapse?.toggle(name, !isSelected.value)
    } catch (error) {
      // 回调被拒绝时，不执行展开操作
      loading.value = false
    }
  }

/**
   * 展开前钩子
   */
  function handleBeforeExpand() {
    return new Promise<void>((resolve, reject) => {
      const { name } = props
      const nextexpanded = !expanded.value
      if (nextexpanded && props.beforeExpand) {
        const result = props.beforeExpand(name)
        if (typeof result === 'boolean') {
          result ? resolve() : reject()
        } else if (result instanceof Promise) {
          loading.value = true
          result.then((res) => {
            loading.value = false
            res ? resolve() : reject()
          }).catch(() => {
            loading.value = false
            reject()
          })
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