<template>
  <m-overlay v-if="cover" :z-index="zIndex" :lock-scroll="cover" :show="show" custom-style="background-color: transparent;pointer-events: auto;"></m-overlay>
  <m-transition name="fade" :show="show" :custom-style="transitionStyle" @after-enter="handleAfterEnter" @after-leave="handleAfterLeave">
    <view :class="rootClass">
      <m-loading
        v-if="iconName === 'loading'"
        :type="loadingType"
        :color="loadingColor"
        :size="loadingSize"
        :custom-class="`m-toast__icon ${direction === 'vertical' ? 'is-vertical' : ''}`"
      />

      <m-icon
        v-else-if="iconName === 'success' || iconName === 'warning' || iconName === 'info' || iconName === 'error'"
        :custom-class="`m-toast__icon ${direction === 'vertical' ? 'is-vertical' : ''}`"
        :size="iconSize"
        :class-prefix="classPrefix"
        :name="toastIcon[iconName]"
      ></m-icon>
      <m-icon
        v-else-if="iconClass || cssIcon"
        :custom-class="`m-toast__icon ${direction === 'vertical' ? 'is-vertical' : ''}`"
        :size="iconSize"
        :class-prefix="classPrefix"
        :name="iconClass"
        :css-icon="cssIcon"
      ></m-icon>
      <view v-if="msg" :class="`m-toast__msg ${direction === 'vertical' ? 'is-vertical' : ''}`">{{ msg }}</view>
    </view>
  </m-transition>
</template>

<script lang="ts">
export default {
  name: 'm-toast',
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
import MIcon from '../m-icon/m-icon.vue'
import MLoading from '../m-loading/m-loading.vue'
import MOverlay from '../m-overlay/m-overlay.vue'
import MTransition from '../m-transition/m-transition.vue'

import { computed, inject, ref, watch, type CSSProperties } from 'vue'
import { defaultOptions, getToastOptionKey, toastIcon } from './index'
import { toastProps, type ToastDirection, type ToastLoadingType, type ToastOptions, type ToastProps } from './types'
import { addUnit, isDef, isFunction, objToStyle } from '../common/util'

const props = defineProps(toastProps)
const iconName = ref<string>('')
const msg = ref<string>('')
const position = ref<string>('middle')
const show = ref<boolean>(false)
const zIndex = ref<number>(100)
const loadingType = ref<ToastLoadingType>('circular')
const loadingColor = ref<string>('#fff')
const iconSize = ref<string>()
const loadingSize = ref<string>()
const cover = ref<boolean>(false)
const classPrefix = ref<string>('m-icon')
const iconClass = ref<string>('')
const cssIcon = ref<boolean | string>(false)
const direction = ref<ToastDirection>('horizontal')

let opened: (() => void) | null = null
let closed: (() => void) | null = null

const toastOptionKey = getToastOptionKey(props.selector)
const toastOption = inject(toastOptionKey, ref<ToastOptions>(defaultOptions))

watch(
  () => toastOption.value,
  (newVal: ToastOptions) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

const transitionStyle = computed(() => {
  const style: CSSProperties = {
    'z-index': zIndex.value,
    position: 'fixed',
    top: '50%',
    left: 0,
    width: '100%',
    'text-align': 'center',
    'pointer-events': 'none'
  }
  return objToStyle(style)
})

const rootClass = computed(() => {
  return `m-toast ${props.customClass} m-toast--${position.value} ${
    (iconName.value !== 'loading' || msg.value) && (iconName.value || iconClass.value || cssIcon.value) ? 'm-toast--with-icon' : ''
  } ${iconName.value === 'loading' && !msg.value ? 'm-toast--loading' : ''} ${direction.value === 'vertical' ? 'is-vertical' : ''}`
})

function handleAfterEnter() {
  if (isFunction(opened)) {
    opened()
  }
}

function handleAfterLeave() {
  if (isFunction(closed)) {
    closed()
  }
}

function reset(option: ToastOptions) {
  show.value = isDef(option.show) ? option.show : false

  if (show.value) {
    mergeOptionsWithProps(option, props)
  }
}

function mergeOptionsWithProps(option: ToastOptions, props: ToastProps) {
  iconName.value = isDef(option.iconName!) ? option.iconName! : props.iconName
  iconClass.value = isDef(option.iconClass!) ? option.iconClass! : props.iconClass
  cssIcon.value = isDef(option.cssIcon!) ? option.cssIcon! : props.cssIcon
  msg.value = isDef(option.msg!) ? option.msg! : props.msg
  position.value = isDef(option.position!) ? option.position! : props.position
  zIndex.value = isDef(option.zIndex!) ? option.zIndex! : props.zIndex
  loadingType.value = isDef(option.loadingType!) ? option.loadingType! : props.loadingType
  loadingColor.value = isDef(option.loadingColor!) ? option.loadingColor! : props.loadingColor
  iconSize.value = isDef(option.iconSize) ? addUnit(option.iconSize) : isDef(props.iconSize) ? addUnit(props.iconSize) : undefined
  loadingSize.value = isDef(option.loadingSize) ? addUnit(option.loadingSize) : isDef(props.loadingSize) ? addUnit(props.loadingSize) : undefined
  cover.value = isDef(option.cover!) ? option.cover! : props.cover
  classPrefix.value = isDef(option.classPrefix) ? option.classPrefix : props.classPrefix
  direction.value = isDef(option.direction) ? option.direction : props.direction
  closed = isFunction(option.closed) ? option.closed : isFunction(props.closed) ? props.closed : null
  opened = isFunction(option.opened) ? option.opened : isFunction(props.opened) ? props.opened : null
}
</script>

<style lang="scss">
@import './index.scss';
</style>