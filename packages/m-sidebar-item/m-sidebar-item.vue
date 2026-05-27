<template>
  <view
    @click="handleClick"
    :class="`m-sidebar-item ${active ? 'm-sidebar-item--active' : ''} ${prefix ? 'm-sidebar-item--prefix' : ''}  ${
      suffix ? 'm-sidebar-item--suffix' : ''
    } ${disabled ? 'm-sidebar-item--disabled' : ''} ${customClass}`"
    :style="customStyle"
  >
    <slot name="icon"></slot>
    <template v-if="!$slots.icon && icon">
      <m-icon custom-class="m-sidebar-item__icon" :name="icon"></m-icon>
    </template>
    <m-badge v-bind="customBadgeProps" custom-class="m-sidebar-item__badge">
      {{ label }}
    </m-badge>
  </view>
</template>

<script setup lang="ts">
import mIcon from '../m-icon/m-icon.vue'
import mBadge from '../m-badge/m-badge.vue'
import { computed } from 'vue'
import { useParent } from '../composables/useParent'
import { SIDEBAR_KEY } from '../m-sidebar/types'
import { sidebarItemProps } from './types'
import type { BadgeProps } from '../m-badge/types'
import { deepAssign, isDef, isUndefined, omitBy } from '../common/util'

const props = defineProps(sidebarItemProps)

const { parent: sidebar } = useParent(SIDEBAR_KEY)

const customBadgeProps = computed(() => {
  const badgeProps: Partial<BadgeProps> = deepAssign(
    isDef(props.badgeProps) ? omitBy(props.badgeProps, isUndefined) : {},
    omitBy(
      {
        max: props.max,
        isDot: props.isDot,
        value: props.badge
      },
      isUndefined
    )
  )
  if (!isDef(badgeProps.max)) {
    badgeProps.max = 99
  }
  return badgeProps
})

const active = computed(() => {
  let active: boolean = false
  if (sidebar.value && sidebar.value.props.modelValue === props.value) {
    active = true
  }
  return active
})

const prefix = computed(() => {
  let prefix: boolean = false
  if (sidebar.value) {
    let activeIndex: number = sidebar.value.children.findIndex((c: any) => {
      return c.value === sidebar.value!.props.modelValue
    })

    let currentIndex: number = sidebar.value.children.findIndex((c: any) => {
      return c.value === props.value
    })

    if (currentIndex === activeIndex - 1) {
      prefix = true
    }
  }
  return prefix
})

const suffix = computed(() => {
  let suffix: boolean = false
  if (sidebar.value) {
    let activeIndex: number = sidebar.value.children.findIndex((c: any) => {
      return c.value === sidebar.value!.props.modelValue
    })

    let currentIndex: number = sidebar.value.children.findIndex((c: any) => {
      return c.value === props.value
    })

    if (currentIndex === activeIndex + 1) {
      suffix = true
    }
  }
  return suffix
})

function handleClick() {
  if (props.disabled) {
    return
  }
  sidebar.value && sidebar.value.setChange(props.value, props.label)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
