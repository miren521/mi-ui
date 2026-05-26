<template>
  <view :style="{ height: addUnit(height) }">
    <view :class="`m-navbar ${customClass} ${fixed ? 'is-fixed' : ''} ${bordered ? 'is-border' : ''}`" :style="rootStyle">
      <view class="m-navbar__content">
        <view class="m-navbar__capsule" v-if="$slots.capsule">
          <slot name="capsule" />
        </view>

        <view :class="`m-navbar__left ${leftDisabled ? 'is-disabled' : ''}`" @click="handleClickLeft" v-else-if="!$slots.left">
          <m-icon v-if="leftArrow" name="left" custom-class="m-navbar__arrow" />
          <view v-if="leftText" class="m-navbar__text">{{ leftText }}</view>
        </view>

        <view v-else :class="`m-navbar__left ${leftDisabled ? 'is-disabled' : ''}`" @click="handleClickLeft">
          <slot name="left" />
        </view>

        <view class="m-navbar__title">
          <slot name="title" />
          <block v-if="!$slots.title && title">{{ title }}</block>
        </view>
        <view :class="`m-navbar__right ${rightDisabled ? 'is-disabled' : ''}`" @click="handleClickRight" v-if="$slots.right || rightText">
          <slot name="right" />

          <view v-if="!$slots.right && rightText" class="m-navbar__text" hover-class="m-navbar__text--hover" :hover-stay-time="70">
            {{ rightText }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-navbar',
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
import mIcon from '../m-icon/m-icon.vue'
import { type CSSProperties, computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { getRect, addUnit, isDef, objToStyle } from '../common/util'
import { navbarProps } from './types'
import { useDeviceInfo } from '../composables/useDeviceInfo'

const props = defineProps(navbarProps)
const emit = defineEmits(['click-left', 'click-right'])

const height = ref<number | ''>('')

const { statusBarHeight, navBarHeight } = useDeviceInfo()

watch(
  [() => props.fixed, () => props.placeholder],
  () => {
    setPlaceholderHeight()
  },
  { deep: true, immediate: false }
)

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.fixed && isDef(props.zIndex)) {
    style['z-index'] = props.zIndex
  }
  if (props.safeAreaInsetTop) {
    style['padding-top'] = addUnit(statusBarHeight.value || 0)
  }
  if (navBarHeight.value) {
    style['height'] = addUnit(navBarHeight.value)
    style['line-height'] = addUnit(navBarHeight.value)
  }
  return `${objToStyle(style)}${props.customStyle}`
})

onMounted(() => {
  if (props.fixed && props.placeholder) {
    nextTick(() => {
      setPlaceholderHeight()
    })
  }
})

function handleClickLeft() {
  if (!props.leftDisabled) {
    emit('click-left')
  }
}

function handleClickRight() {
  if (!props.rightDisabled) {
    emit('click-right')
  }
}

const { proxy } = getCurrentInstance() as any

function setPlaceholderHeight() {
  if (!props.fixed || !props.placeholder) {
    return
  }

  getRect('.m-navbar', false, proxy).then((res) => {
    height.value = res.height as number
  })
}
</script>

<style lang="scss">
@use './index.scss';
</style>