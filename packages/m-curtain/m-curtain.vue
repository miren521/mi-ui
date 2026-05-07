<template>
  <view v-if="isRendered" class="m-curtain-wrapper">
    <!-- 遮罩层 -->
    <view
      v-if="modal"
      :class="['m-curtain__modal', isVisible ? 'm-curtain__modal--visible' : 'm-curtain__modal--hidden']"
      @tap="handleClickModal"
    />

    <!-- 幕帘内容 -->
    <view
      :class="['m-curtain', isVisible ? 'm-curtain--visible' : 'm-curtain--hidden']"
    >
      <view class="m-curtain__content">
        <image
          v-if="src"
          :src="src"
          class="m-curtain__content-img"
          :style="imgStyle"
          mode="widthFix"
          :show-menu-by-longpress="showMenuByLongpress"
          @click="clickImage"
          @error="imgErr"
          @load="imgLoad"
        />
        <slot name="close">
          <view
            :class="['m-curtain__content-close', closePosition]"
            :style="customCloseStyle"
            @click="close"
          >
            <m-icon name="close-circle" size="30" />
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import mIcon from '../m-icon/m-icon.vue'
import { curtainProps } from './types'

const props = defineProps(curtainProps)

const emit = defineEmits([
  'beforeenter',
  'enter',
  'afterenter',
  'beforeleave',
  'leave',
  'afterleave',
  'close',
  'closed',
  'click-modal',
  'load',
  'error',
  'click',
  'update:modelValue'
])

const isVisible = ref(false)
const isRendered = ref(false)
const imgSucc = ref<boolean>(true)
const imgScale = ref<number>(1)

const imgStyle = computed(() => {
  let style: Record<string, string> = {}
  if (props.width) {
    style.width = `${props.width}px`
  }
  return style
})

function handleClickModal() {
  emit('click-modal')
  if (props.closeOnClickModal) {
    close()
  }
}

function beforeenter() {
  emit('beforeenter')
}

function enter() {
  emit('enter')
}

function afterenter() {
  emit('afterenter')
}

function beforeleave() {
  emit('beforeleave')
}

function leave() {
  emit('leave')
}

function afterleave() {
  emit('afterleave')
  emit('closed')
}

function close() {
  emit('update:modelValue', false)
}

function imgLoad(event: any) {
  const { height, width } = event.detail
  if (width && height) {
    imgScale.value = width / height
  }
  imgSucc.value = true
  emit('load')
}

function imgErr() {
  imgSucc.value = false
  emit('error')
}

function clickImage() {
  if (props.to) {
    uni.navigateTo({
      url: props.to
    })
  }
  emit('click')
  if (props.closeOnClick) {
    close()
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      isRendered.value = true
      beforeenter()
      setTimeout(() => {
        isVisible.value = true
        enter()
        setTimeout(() => {
          afterenter()
        }, props.duration || 300)
      }, 20)
    } else {
      beforeleave()
      isVisible.value = false
      leave()
      setTimeout(() => {
        afterleave()
        if (props.hideWhenClose) {
          isRendered.value = false
        }
      }, props.duration || 300)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@use '../common/styles/variables.scss' as *;

$curtain-content-radius: var(--m-curtain-content-radius, var(--m-radius-large, 16px)) !default;
$curtain-content-close-color: var(--m-curtain-content-close-color, var(--m-text-white, #ffffff)) !default;
$curtain-content-close-size: var(--m-curtain-content-close-size, var(--m-font-size-lg, 24px)) !default;
$curtain-content-close-inset: var(--m-curtain-content-close-inset, var(--m-spacing-extra-loose, 16px)) !default;
$curtain-modal-bg: var(--m-curtain-modal-bg, rgba(0, 0, 0, 0.5)) !default;

.m-curtain-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  pointer-events: none;
  isolation: isolate;
}

.m-curtain__modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $curtain-modal-bg;
  transition: opacity 0.3s;
  pointer-events: auto;
}

.m-curtain__modal--hidden {
  opacity: 0;
}

.m-curtain__modal--visible {
  opacity: 1;
}

.m-curtain {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
  transition: all 0.3s;
  border-radius: $curtain-content-radius;
  pointer-events: auto;
  z-index: 2001;
  background: transparent;
}

.m-curtain--visible {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.m-curtain--hidden {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
}

.m-curtain__content {
  position: relative;
  display: inline-block;
  background: transparent;
  border-radius: $curtain-content-radius;
}

.m-curtain__content-img {
  display: block;
  width: 90vw;
  max-width: 600px;
  border-radius: $curtain-content-radius;
}

.m-curtain__content-close {
  position: absolute;
  top: $curtain-content-close-inset;
  right: $curtain-content-close-inset;
  color: $curtain-content-close-color;
  font-size: $curtain-content-close-size;
  -webkit-tap-highlight-color: transparent;
  z-index: 1;

  &.top {
    top: calc(-1 * $curtain-content-close-inset);
    left: 50%;
    right: unset;
    bottom: unset;
    transform: translateY(-100%) translateX(-50%);
  }

  &.top-left {
    top: calc(-1 * $curtain-content-close-inset);
    right: unset;
    left: 0;
    bottom: unset;
    transform: translateY(-100%);
  }

  &.top-right {
    top: calc(-1 * $curtain-content-close-inset);
    right: 0;
    left: unset;
    bottom: unset;
    transform: translateY(-100%);
  }

  &.bottom {
    top: unset;
    right: unset;
    left: 50%;
    bottom: calc(-1 * $curtain-content-close-inset);
    transform: translateY(100%) translateX(-50%);
  }

  &.bottom-left {
    top: unset;
    right: unset;
    left: 0;
    bottom: calc(-1 * $curtain-content-close-inset);
    transform: translateY(100%);
  }

  &.bottom-right {
    top: unset;
    right: 0;
    left: unset;
    bottom: calc(-1 * $curtain-content-close-inset);
    transform: translateY(100%);
  }
}
</style>