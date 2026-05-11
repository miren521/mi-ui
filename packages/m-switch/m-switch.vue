<template>
  <view :class="rootClass" :style="rootStyle" @click="switchValue">
    <view class="m-switch__inner" :style="innerStyle">
      <m-icon
        v-if="innerIcon || innerCssIcon"
        custom-class="m-switch__inner-icon"
        :name="innerIcon"
        :class-prefix="classPrefix"
        :css-icon="innerCssIcon"
      ></m-icon>
      <text v-else class="m-switch__inner-text">{{ isActive ? activeText : inactiveText }}</text>
    </view>
    <view class="m-switch__action">
      <m-loading v-if="loading" v-bind="customLoadingProps"></m-loading>
      <m-icon
        v-else-if="actionIcon || actionCssIcon"
        custom-class="m-switch__action-icon"
        :name="actionIcon"
        :class-prefix="classPrefix"
        :css-icon="actionCssIcon"
      ></m-icon>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties, onBeforeMount } from 'vue'
import { callInterceptor } from '../common/interceptor'
import { addUnit, isDef, isUndefined, objToStyle, omitBy } from '../common/util'
import { switchProps } from './types'
import type { LoadingProps } from '../m-loading/types'

const props = defineProps(switchProps)
const emit = defineEmits(['change', 'update:modelValue'])

const isActive = computed(() => {
  return props.modelValue === props.activeValue
})

const rootClass = computed(() => {
  return `m-switch ${props.customClass} ${props.disabled ? 'is-disabled' : ''} ${props.loading ? 'is-loading' : ''} m-switch--${props.shape} is-${
    isActive.value ? 'active' : 'inactive'
  }`
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.size) {
    style['font-size'] = addUnit(props.size)
  }
  return `${objToStyle(style)}${props.customStyle}`
})

const innerStyle = computed(() => {
  const style: CSSProperties = {
    background: isActive.value ? props.activeColor : props.inactiveColor
  }
  return `${objToStyle(style)}`
})

const innerIcon = computed(() => {
  return isActive.value ? props.activeIcon : props.inactiveIcon
})

const innerCssIcon = computed(() => {
  return isActive.value ? props.activeCssIcon : props.inactiveCssIcon
})

const actionIcon = computed(() => {
  return isActive.value ? props.activeActionIcon : props.inactiveActionIcon
})

const actionCssIcon = computed(() => {
  return isActive.value ? props.activeActionCssIcon : props.inactiveActionCssIcon
})

const customLoadingProps = computed<Partial<LoadingProps>>(() => {
  const overrides: Partial<LoadingProps> = isDef(props.loadingProps) ? omitBy(props.loadingProps, isUndefined) : {}
  const type = isDef(overrides.type) ? overrides.type : 'spinner'
  return { ...overrides, type }
})

function switchValue() {
  if (props.disabled || props.loading) return
  const newVal = isActive.value ? props.inactiveValue : props.activeValue
  const doSwitch = () => {
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }

  callInterceptor(props.beforeChange, {
    args: [newVal],
    done: doSwitch
  })
}

onBeforeMount(() => {
  if ([props.activeValue, props.inactiveValue].indexOf(props.modelValue) === -1) {
    emit('update:modelValue', props.inactiveValue)
    emit('change', {
      value: props.inactiveValue
    })
  }
})
</script>

<style lang="scss">
@use './index.scss';
</style>