<template>
  <view
    :class="['m-cell', isBorder ? 'is-border' : '', size ? 'is-' + size : '', center ? 'is-center' : '', customClass]"
    :style="customStyle" :hover-class="isLink || clickable ? 'is-hover' : 'none'" :hover-stay-time="70"
    @click="onClick">
    <view :class="['m-cell__wrapper', vertical ? 'is-vertical' : '']">
      <view v-if="showLeft" class="m-cell__left"
        :style="titleWidth ? 'min-width:' + titleWidth + ';max-width:' + titleWidth + ';' : ''">
        <text v-if="isRequired && markerSide === 'before'" class="m-cell__required m-cell__required--left">*</text>
        <!--左侧icon部位-->
        <slot name="icon">
          <m-icon v-if="icon" :name="icon" :size="iconSize" :custom-class="`m-cell__icon  ${customIconClass}`"></m-icon>
        </slot>

        <view class="m-cell__title">
          <!--title BEGIN-->
          <slot v-if="useTitleSlot && $slots.title" name="title"></slot>
          <text v-else-if="title" :class="customTitleClass">{{ title }}</text>

          <!--title END-->

          <!--label BEGIN-->
          <slot name="label">
            <view v-if="label" :class="`m-cell__label ${customLabelClass}`">{{ label }}</view>
          </slot>
          <!--label END-->
        </view>
        <text v-if="isRequired && markerSide === 'after'" class="m-cell__required">*</text>
      </view>
      <!--right content BEGIN-->
      <view class="m-cell__right">
        <view class="m-cell__body">
          <!--文案内容-->
          <view
            :class="`m-cell__value ${customValueClass} m-cell__value--${valueAlign} ${ellipsis ? 'm-cell__value--ellipsis' : ''}`">
            <slot>{{ value }}</slot>
          </view>
          <!--箭头-->
          <view class="m-cell__iconBox">
            <m-icon v-if="isLink" size="32rpx" color="#999" custom-class="m-cell__arrow-right"
              :name="`chevron-${arrowDirection || 'right'}`" />
            <slot v-else name="right-icon" />
          </view>
        </view>
        <view v-if="errorMessage" class="m-cell__error-message">{{ errorMessage }}</view>
      </view>
      <!--right content END-->
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-cell',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import mIcon from '../m-icon/m-icon.vue'
import { computed, useSlots } from 'vue'
import { useCell } from '../composables/useCell'
import { useParent } from '../composables/useParent'
import { cellProps } from './types'
import { isDef } from '../common/util'

const props = defineProps(cellProps)
const emit = defineEmits(['click'])

// 获取插槽
const slots = useSlots()

const cell = useCell()

const isBorder = computed(() => {
  return Boolean(isDef(props.border) ? props.border : cell.border.value)
})

// 是否展示必填
const isRequired = computed(() => {
  return props.required || props.rules.some((rule) => rule.required)
})

// 是否展示左侧部分
const showLeft = computed(() => {
  // 插槽优先级高于props
  // 有icon插槽或icon属性
  const hasIcon = slots.icon || props.icon
  // 有title插槽或title属性
  const hasTitle = (slots.title && props.useTitleSlot) || props.title
  // 有label插槽或label属性
  const hasLabel = slots.label || props.label

  return hasIcon || hasTitle || hasLabel
})

/**
 * @description 点击cell的handle
 */
function onClick() {
  const url = props.to

  if (props.clickable || props.isLink) {
    emit('click')
  }
  if (url && props.isLink) {
    if (props.replace) {
      uni.redirectTo({ url })
    } else {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>