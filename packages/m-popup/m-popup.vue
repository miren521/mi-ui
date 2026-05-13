<template>
  <view class="m-popup-wrapper">
    <!-- 遮罩层 -->
    <view
      v-if="modal && isRendered"
      :class="['m-popup__modal', isVisible ? 'm-popup__modal--visible' : 'm-popup__modal--hidden']"
      :style="modalStyleStr"
      @tap="handleClickModal"
      catchtouchmove="noop"
    />
    
    <!-- 弹窗内容 -->
    <view
      v-if="isRendered"
      :class="['m-popup', `m-popup--${position}`, isVisible ? 'm-popup--visible' : 'm-popup--hidden']"
      :style="popupStyleStr"
      @tap.stop
    >
      <view v-if="closable" class="m-popup__close" @tap="onClose">
        <m-icon name="plus" :size="20" />
      </view>
      <view v-if="$slots.header" class="m-popup__header">
        <slot name="header" />
      </view>
      <view class="m-popup__content">
        <slot />
      </view>
      <view v-if="$slots.footer" class="m-popup__footer">
        <slot name="footer" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MIcon from '../m-icon/m-icon.vue'

interface PopupProps {
  modelValue?: boolean
  position?: 'center' | 'top' | 'right' | 'bottom' | 'left'
  closable?: boolean
  closeOnClickModal?: boolean
  duration?: number
  zIndex?: number
  customStyle?: string | object
  modal?: boolean
  modalStyle?: string | object
  hideWhenClose?: boolean
  lazyRender?: boolean
  safeAreaInsetBottom?: boolean
  transition?: string
  lockScroll?: boolean
}

const props = withDefaults(defineProps<PopupProps>(), {
  modelValue: false,
  position: 'center',
  closable: false,
  closeOnClickModal: true,
  duration: 300,
  zIndex: 2000,
  modal: true,
  hideWhenClose: true,
  lazyRender: true,
  safeAreaInsetBottom: false,
  lockScroll: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'opened'): void
  (e: 'closed'): void
  (e: 'click-modal'): void
}>()

const isVisible = ref(false)
const isRendered = ref(false)

function noop() {}

function handleTouchMove(e: TouchEvent) {
  if (props.lockScroll) {
    e.stopPropagation?.()
  }
}

const popupStyleStr = computed(() => {
  let styleStr = `z-index: ${props.zIndex + 1};`
  styleStr += `transition-duration: ${props.duration}ms;`
  
  if (props.safeAreaInsetBottom) {
    styleStr += `padding-bottom: env(safe-area-inset-bottom);`
  }
  
  if (typeof props.customStyle === 'string') {
    styleStr += props.customStyle
  } else if (props.customStyle) {
    Object.entries(props.customStyle).forEach(([key, value]) => {
      styleStr += `${key}: ${value};`
    })
  }
  
  return styleStr
})

const modalStyleStr = computed(() => {
  let styleStr = `z-index: ${props.zIndex}; transition-duration: ${props.duration}ms;`
  
  if (typeof props.modalStyle === 'string') {
    styleStr += props.modalStyle
  } else if (props.modalStyle) {
    Object.entries(props.modalStyle).forEach(([key, value]) => {
      styleStr += `${key}: ${value};`
    })
  }
  
  return styleStr
})

function handleClickModal() {
  emit('click-modal')
  if (props.closeOnClickModal) {
    onClose()
  }
}

function onClose() {
  emit('close')
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      // 显示弹窗
      isRendered.value = true
      // 延迟一帧设置可见，确保 DOM 已渲染
      setTimeout(() => {
        isVisible.value = true
        emit('open')
        // 动画结束后触发 opened 事件
        setTimeout(() => {
          emit('opened')
        }, props.duration)
      }, 20)
    } else {
      // 隐藏弹窗
      isVisible.value = false
      emit('close')
      // 动画结束后真正移除 DOM
      setTimeout(() => {
        if (!props.modelValue) {
          isRendered.value = false
          emit('closed')
        }
      }, props.duration)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>