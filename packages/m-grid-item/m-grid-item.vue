<template>
  <view :class="rootClass" :style="rootStyle" @click="handleClick">
    <view :class="contentClass" :style="contentStyle" :hover-class="hoverClass">
      <slot>
        <view class="m-grid-item__wrapper" v-if="icon || $slots.icon">
          <m-badge v-bind="customBadgeProps" custom-class="m-grid-item__badge">
            <slot name="icon">
              <m-icon
                :name="icon"
                :size="iconSize"
                :color="iconColor"
                :class-prefix="iconPrefix"
                :custom-class="'m-grid-item__icon ' + customIcon"
              />
            </slot>
          </m-badge>
        </view>
        <slot name="text">
          <view v-if="text" :class="`m-grid-item__text ${ellipsis ? 'is-ellipsis' : ''} ${customText}`">{{ text }}</view>
        </slot>
      </slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import mIcon from '../m-icon/m-icon.vue'
import mBadge from '../m-badge/m-badge.vue'
import { computed, type CSSProperties } from 'vue'
import { useParent } from '../composables/useParent'
import { GRID_KEY } from '../m-grid/types'
import { addUnit, deepAssign, isDef, isUndefined, omitBy } from '../common/util'
import { gridItemProps } from './types'
import type { BadgeProps } from '../m-badge/types'

const props = defineProps(gridItemProps)
const emit = defineEmits(['click'])

const { parent: grid, index } = useParent(GRID_KEY)

const gutter = computed(() => Number(grid?.props.gutter || 0))
const border = computed(() => Boolean(grid?.props.border))
const bgColor = computed(() => grid?.props.bgColor || '')
const column = computed(() => grid?.props.column || 0)
const childCount = computed(() => grid?.children?.length || 0)
const iconSize = computed(() => grid?.props.iconSize)

const borderClass = computed(() => {
  if (!border.value || gutter.value) return ''
  const classes: string[] = []
  const col = column.value
  const idx = index.value
  const total = childCount.value

  if (col) {
    const isRightItem = total - 1 === idx || (idx + 1) % col === 0
    const isFirstLine = idx + 1 <= col
    if (isFirstLine) classes.push('is-first')
    if (isRightItem) classes.push('is-right')
    if (!isFirstLine) classes.push('is-border')
  } else {
    classes.push('is-first')
  }

  if (total - 1 === idx) classes.push('is-last')

  return classes.join(' ')
})

const rootStyle = computed(() => {
  if (!grid) return props.customStyle || ''

  const columnNum = column.value || childCount.value
  const percent = `${100 / columnNum}%`
  const style: CSSProperties = {
    flexBasis: percent,
    width: percent
  }

  if (gutter.value) {
    const gutterValue = addUnit(gutter.value)
    style.paddingRight = gutterValue

    if (index.value >= columnNum) {
      style.marginTop = gutterValue
    }
  }

  if (props.customStyle) {
    return `${objToStyle(style)} ${props.customStyle}`
  }

  return style
})

const contentStyle = computed(() => {
  if (!grid) return ''

  const style: CSSProperties = {}

  if (bgColor.value) {
    style.background = bgColor.value
  }

  return style
})

function objToStyle(obj: CSSProperties): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `${cssKey}: ${value};`
    })
    .join('')
}

const rootClass = computed(() => {
  const classes = ['m-grid-item']
  if (borderClass.value) {
    classes.push(borderClass.value)
  }
  if (props.customClass) {
    classes.push(props.customClass)
  }
  return classes.join(' ')
})

const contentClass = computed(() => {
  const classes = ['m-grid-item__content']
  if (border.value && gutter.value > 0) {
    classes.push('is-around')
  }
  if (grid) {
    const { center, direction, reverse } = grid.props
    if (center) {
      classes.push('is-center')
    }
    if (direction === 'horizontal') {
      classes.push('is-horizontal')
    }
    if (reverse) {
      classes.push('is-reverse')
    }
  }
  return classes.join(' ')
})

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

const hoverClass = computed(() => {
  if (grid?.props.clickable) {
    return grid.props.hoverClass ? grid.props.hoverClass : 'm-grid-item__content--hover'
  }
  return ''
})

function handleClick() {
  if (grid && !grid.props.clickable) return
  const { url, linkType } = props
  emit('click')
  if (url) {
    switch (linkType) {
      case 'navigateTo':
        uni.navigateTo({ url })
        break
      case 'reLaunch':
        uni.reLaunch({ url })
        break
      case 'redirectTo':
        uni.redirectTo({ url })
        break
      case 'switchTab':
        uni.switchTab({ url })
        break
      default:
        console.error(`[mi-ui] warning(m-grid-item): linkType can not be ${linkType}`)
        break
    }
  }
}
</script>

<style lang="scss" src="./index.scss"></style>