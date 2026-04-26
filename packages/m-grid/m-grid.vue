<template>
  <view :class="rootClass" :style="rootStyle">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import { useChildren } from '../composables/useChildren'
import { GRID_KEY, gridProps } from './types'
import { addUnit, isDef } from '../common/util'

const props = defineProps(gridProps)

const { linkChildren } = useChildren(GRID_KEY)
linkChildren({ props })

const rootClass = computed(() => {
  return `m-grid ${props.customClass}`
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.gutter)) {
    style.paddingLeft = addUnit(props.gutter)
  }
  return style
})
</script>

<style lang="scss" src="./index.scss"></style>