<template>
  <view :class="rootClass" :style="rootStyle">
    <slot v-if="!vertical"></slot>
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-divider',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, useSlots, type CSSProperties } from 'vue'
import { dividerProps } from './types'
import { objToStyle } from '../common/util'

const props = defineProps(dividerProps)
const slots = useSlots()

const rootStyle = computed(() => {
  const { color, customStyle } = props
  const style: CSSProperties = {}
  if (color) {
    style.color = color
  }
  return `${objToStyle(style)}${customStyle}`
})

const rootClass = computed(() => {
  const prefixCls = 'm-divider'
  const classes: Record<string, boolean> = {
    [prefixCls]: true,
    ['is-dashed']: props.dashed,
    ['is-hairline']: props.hairline,
    [`${prefixCls}--vertical`]: props.vertical,
    [`${prefixCls}--center`]: !props.vertical && props.contentPosition === 'center' && !!slots.default,
    [`${prefixCls}--left`]: !props.vertical && props.contentPosition === 'left',
    [`${prefixCls}--right`]: !props.vertical && props.contentPosition === 'right',
    [props.customClass]: !!props.customClass
  }
  return classes
})
</script>

<style lang="scss">
@use '../common/styles/mixin/_mixin.scss' as *;
@use '../common/styles/variables.scss' as *;

// 默认文字颜色
$divider-color-default: var(--m-divider-color-default, $text-auxiliary) !default;
// 分割线颜色
$divider-color-line: var(--m-divider-color-line, $border-main) !default;
// 组件水平内边距
$divider-padding: var(--m-divider-padding, $padding-zero $padding-extra-loose) !default;
// 组件垂直外边距
$divider-margin: var(--m-divider-margin, $spacing-extra-loose $spacing-zero) !default;
// 分割线厚度
$divider-line-height: var(--m-divider-line-height, $n-3) !default;
// 内容文字行高
$divider-size-line-height: var(--m-divider-size-line-height, $typography-body-line-height-size-main) !default;
// 纵向分割线高度
$divider-size-vertical-height: var(--m-divider-size-vertical-height, $spacing-extra-loose) !default;
// 纵向分割线宽度
$divider-size-vertical-line-width: var(--m-divider-size-vertical-line-width,  $n-3) !default;
// 左对齐模式左侧线段宽度
$divider-size-content-left-width: var(--m-divider-size-content-left-width, 10%) !default;
// 右对齐模式右侧线段宽度
$divider-size-content-right-width: var(--m-divider-size-content-right-width, 10%) !default;
// 默认文字字号
$divider-font-size-default: var(--m-divider-font-size-default, $typography-body-size-main) !default;
// 默认外边距
$divider-margin-default: var(--m-divider-margin-default, $spacing-extra-loose) !default;
// 纵向模式内容间距
$divider-margin-vertical-content: var(--m-divider-margin-vertical-content, $spacing-tight) !default;
// 内容左侧间距
$divider-margin-content-left: var(--m-divider-margin-content-left, $spacing-loose) !default;
// 内容右侧间距
$divider-margin-content-right: var(--m-divider-margin-content-right, $spacing-loose) !default;
// 默认内边距
$divider-padding-default: var(--m-divider-padding-default, $spacing-zero) !default;

.m-divider {
  position: relative;
  display: flex;
  padding: $divider-padding;
  margin: $divider-margin;
  align-items: center;
  color: $divider-color-default;
  font-size: $divider-font-size-default;

  &::after,
  &::before {
    flex: 1;
    display: block;
    box-sizing: border-box;
    border-style: solid;
    border-color: $divider-color-line;
    border-width: $divider-line-height 0 0;
  }

  &::before {
    content: '';
  }

  &--center,
  &--left,
  &--right {
    &::after {
      content: '';
      margin-left: $divider-margin-content-left;
    }

    &::before {
      margin-right: $divider-margin-content-right;
    }
  }

  &--left {
    &::before {
      max-width: $divider-size-content-left-width;
    }
  }

  &--right {
    &::after {
      max-width: $divider-size-content-right-width;
    }
  }

  &.is-hairline {
    &::before,
    &::after {
      transform: scaleY(0.5);
    }
  }

  &.is-dashed {
    &::before,
    &::after {
      border-style: dashed;
    }
  }

  &--vertical {
    display: inline-block;
    width: $divider-size-vertical-line-width;
    height: $divider-size-vertical-height;
    margin: $spacing-zero $divider-margin-vertical-content;
    padding: $padding-zero;
    vertical-align: middle;

    &::before {
      height: 100%;
      border-width: 0 0 0 $divider-size-vertical-line-width;
    }

    &::after {
      display: none;
    }

    &.is-hairline {
      &::before {
        transform: scaleX(0.5);
      }
    }
  }
}
</style>