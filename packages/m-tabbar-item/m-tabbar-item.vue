<template>
  <view :class="`m-tabbar-item ${customClass} ${activeIcon ? 'm-tabbar-item--active-icon' : ''}`" :style="customStyle" @click="handleClick">
    <slot>
      <m-badge v-bind="customBadgeProps">
        <view :class="`m-tabbar-item__body ${activeIcon ? 'm-tabbar-item__body--active-icon' : ''}`">
          <slot name="icon" :active="active"></slot>
          <template v-if="!$slots.icon && icon">
            <m-icon
              :name="icon"
              :custom-style="activeIcon ? activeIconStyle : textStyle"
              :custom-class="`m-tabbar-item__body-icon ${active ? 'is-active' : 'is-inactive'} ${activeIcon ? 'm-tabbar-item__body-icon--active-icon' : ''}`"
            ></m-icon>
          </template>
          <text v-if="title" :style="textStyle" :class="`m-tabbar-item__body-title ${active ? 'is-active' : 'is-inactive'}`">
            {{ title }}
          </text>
        </view>
      </m-badge>
    </slot>
  </view>
</template>

<script lang="ts" setup>
import mBadge from '../m-badge/m-badge.vue'
import mIcon from '../m-icon/m-icon.vue'
import { type CSSProperties, computed } from 'vue'
import { deepAssign, isDef, isUndefined, objToStyle, omitBy } from '../common/util'
import { useParent } from '../composables/useParent'
import { TABBAR_KEY } from '../m-tabbar/types'
import { tabbarItemProps } from './types'
import type { BadgeProps } from '../m-badge/types'

const props = defineProps(tabbarItemProps)

const { parent: tabbar, index } = useParent(TABBAR_KEY)

const customBadgeProps = computed(() => {
  const badgeProps: Partial<BadgeProps> = deepAssign(
    isDef(props.badgeProps) ? omitBy(props.badgeProps, isUndefined) : {},
    omitBy(
      {
        max: props.max,
        isDot: props.isDot,
        value: props.value
      },
      isUndefined
    )
  )
  if (!isDef(badgeProps.max)) {
    badgeProps.max = 99
  }
  return badgeProps
})

const textStyle = computed(() => {
  const style: CSSProperties = {}
  if (tabbar.value) {
    if (active.value && tabbar.value.props.activeColor) {
      style['color'] = tabbar.value.props.activeColor
    }
    if (!active.value && tabbar.value.props.inactiveColor) {
      style['color'] = tabbar.value.props.inactiveColor
    }
  }

  return `${objToStyle(style)}`
})

const activeIconStyle = computed(() => {
  const style: CSSProperties = {
    color: '#ffffff'
  }
  return `${objToStyle(style)}`
})

const active = computed(() => {
  const name = isDef(props.name) ? props.name : index.value
  if (tabbar.value) {
    if (tabbar.value.props.modelValue === name) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
})

function handleClick() {
  const name: string | number = isDef(props.name) ? props.name : index.value
  tabbar.value && tabbar.value.setChange({ name })
}
</script>

<style lang="scss">
@use './index.scss';
</style>
