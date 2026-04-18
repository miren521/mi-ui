<template>
  <view class="m-popup-wrapper">
    <Transition
      name="m-popup-modal"
      appear
      @enter="onModalEnter"
      @leave="onModalLeave"
    >
      <view
        v-if="modal && isVisible"
        class="m-popup__modal"
        :style="modalStyleStr"
        @tap="handleClickModal"
      />
    </Transition>
    
    <Transition
      :name="transitionName"
      appear
      @enter="onPopupEnter"
      @leave="onPopupLeave"
    >
      <view
        v-if="isVisible"
        :class="popupClasses"
        :style="popupStyleStr"
        @tap.stop
      >
        <view v-if="closable" class="m-popup__close" @tap="onClose">
          <m-icon name="add" :size="20" />
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
    </Transition>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MIcon from '../../icon/src/index.vue'

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
  coverNavbar?: boolean
  topOffset?: string | number
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
  lockScroll: true,
  coverNavbar: true,
  topOffset: 0
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

const transitionName = computed(() => {
  if (props.transition) {
    return props.transition
  }
  const positionMap: Record<string, string> = {
    center: 'm-zoom-fade',
    left: 'm-slide-left',
    right: 'm-slide-right',
    bottom: 'm-slide-up',
    top: 'm-slide-down'
  }
  return positionMap[props.position] || 'm-zoom-fade'
})

const popupClasses = computed(() => {
  return ['m-popup', `m-popup--${props.position}`]
})

const popupStyleStr = computed(() => {
  let styleStr = `z-index: ${props.zIndex + 1};`
  styleStr += `transition-duration: ${props.duration}ms;`
  
  if (!props.coverNavbar) {
    const topOffsetValue = typeof props.topOffset === 'number' ? `${props.topOffset}rpx` : props.topOffset
    if (props.position === 'top') {
      styleStr += `top: ${topOffsetValue};`
    } else {
      // 其他位置的弹窗，在计算位置时需要考虑 topOffset
      // 这里保持默认行为，由样式文件处理
    }
  }
  
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
  
  if (!props.coverNavbar) {
    const topOffsetValue = typeof props.topOffset === 'number' ? `${props.topOffset}rpx` : props.topOffset
    styleStr += `top: ${topOffsetValue};`
    styleStr += `height: calc(100% - ${topOffsetValue});`
  }
  
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

function onPopupEnter() {
  emit('open')
}

function onPopupLeave() {
  emit('close')
}

function onModalEnter() {
  // 模态框进入动画开始
}

function onModalLeave() {
  // 模态框离开动画开始
}

function openPopup() {
  isVisible.value = true
}

function closePopup() {
  isVisible.value = false
  
  // 动画结束后触发 closed 事件
  setTimeout(() => {
    emit('closed')
  }, props.duration)
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      openPopup()
      // 动画结束后触发 opened 事件
      setTimeout(() => {
        emit('opened')
      }, props.duration)
    } else {
      closePopup()
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import '../style/index.scss';
</style>