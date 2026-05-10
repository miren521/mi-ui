<template>
  <view :class="rootClass" :style="customStyle">
    <slot></slot>
    <!-- 折叠头像 -->
    <m-avatar
      v-if="showCollapse"
      :custom-style="collapseStyle"
      _internal
      :text="collapseText"
      :shape="shape"
      :size="size"
      bg-color="#ebedf0"
      color="#969799"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-avatar-group',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, useSlots, type CSSProperties, provide } from 'vue'
import mAvatar from '../m-avatar/m-avatar.vue'
import { avatarGroupProps, AVATAR_GROUP_KEY, type AvatarGroupProvide } from './types'
import { useChildren } from '../composables/useChildren'
import { objToStyle, addUnit, isString } from '../common/util'

const props = defineProps(avatarGroupProps)
const slots = useSlots()

// 提供父组件上下文
provide<AvatarGroupProvide>(AVATAR_GROUP_KEY, { props })

const { children, linkChildren } = useChildren(AVATAR_GROUP_KEY)

linkChildren({ props })


/**
 * 根节点类名
 */
const rootClass = computed(() => {
  return `m-avatar-group m-avatar-group--${props.cascading} ${props.customClass} ${props.vertical ? 'is-vertical' : ''}`
})

const maxCountValue = computed(() => {
  if (!props.maxCount) {
    return 0
  }
  const count = typeof props.maxCount === 'number' ? props.maxCount : parseInt(props.maxCount, 10)
  return isNaN(count) || count <= 0 ? 0 : count
})

/**
 * 是否显示折叠头像
 */
const showCollapse = computed(() => {
  return maxCountValue.value > 0 && children.length > maxCountValue.value
})

/**
 * 剩余未显示的数量
 */
const restCount = computed(() => {
  if (maxCountValue.value <= 0) {
    return 0
  }
  return Math.max(0, children.length - maxCountValue.value)
})

/**
 * 折叠头像文本
 */
const collapseText = computed(() => {
  return props.collapseAvatar || `+${restCount.value}`
})

/**
 * 是否有默认插槽
 */
const hasDefaultSlot = computed(() => !!slots.default)

/**
 * 折叠头像样式
 */
const collapseStyle = computed(() => {
  const style: CSSProperties = {}
  const count = maxCountValue.value > 0 ? maxCountValue.value : children.length
  if (props.cascading === 'right-up') {
    // 右侧在上：折叠头像在最右边，z-index 最大
    style.zIndex = count + 1
  } else if (props.cascading === 'left-up') {
    // 左侧在上：折叠头像在最左边，z-index = 1（最小）
    style.zIndex = 1
  } else {
    style.zIndex = 0
  }
  if (hasDefaultSlot.value) {
    const isBuiltIn = isString(props.size) && ['large', 'medium', 'normal', 'small'].includes(props.size)
    const margin = isBuiltIn ? 'var(--m-avatar-overlap)' : `calc(${addUnit(props.size)} * -0.25)`
    if (props.vertical) {
      style.marginTop = margin
    } else {
      style.marginLeft = margin
    }
  }
  return objToStyle(style)
})
</script>

<style lang="scss">
@use './index.scss';
</style>