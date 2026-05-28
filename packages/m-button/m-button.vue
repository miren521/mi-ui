<template>
  <button
    :class="[
      'm-button',
      `m-button--${type}`,
      `m-button--${size}`,
      { 'm-button--plain': plain },
      { 'm-button--round': round },
      { 'm-button--block': block },
      { 'm-button--disabled': disabled },
      { 'm-button--loading': loading },
      { 'm-button--icon': isIcon },
      props.customClass
    ]"
    :style="props.customStyle"
    :disabled="disabled"
    @click="handleClick"
  >
    <view class="m-button__content">
      <view v-if="loading" class="m-button__loading">
        <m-icon name="sync" :size="loadingSize" />
      </view>
      <m-icon v-else-if="icon || cssIcon" custom-class="m-button__icon" :name="icon" :size="displayIconSize" :class-prefix="classPrefix" :css-icon="cssIcon"></m-icon>
      <view class="m-button__text" v-if="$slots.default || text">
        <slot>{{ text }}</slot>
      </view>
    </view>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import mIcon from '../m-icon/m-icon.vue'

interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'large' | 'medium' | 'small'
  plain?: boolean
  round?: boolean
  block?: boolean
  disabled?: boolean
  loading?: boolean
  loadingColor?: string
  customClass?: string
  customStyle?: string | object
  icon?: string
  iconSize?: string | number
  classPrefix?: string
  cssIcon?: string | boolean
  text?: string
}

const slots = useSlots()

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  plain: false,
  round: false,
  block: false,
  disabled: false,
  loading: false,
  loadingColor: '',
  customClass: '',
  customStyle: () => ({}),
  icon: '',
  iconSize: '',
  classPrefix: 'm-icon',
  cssIcon: '',
  text: ''
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const loadingSize = computed(() => {
  switch (props.size) {
    case 'large':
      return '19px'
    case 'small':
      return '14px'
    default:
      return '16px'
  }
})

const displayIconSize = computed(() => {
  if (props.iconSize) {
    return props.iconSize
  }
  switch (props.size) {
    case 'large':
      return '22px'
    case 'small':
      return '16px'
    default:
      return '20px'
  }
})

const isIcon = computed(() => {
  return !slots.default && !props.text && !!(props.icon || props.cssIcon)
})

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
