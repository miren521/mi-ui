<template>
  <m-overlay
    :show="state.show"
    :z-index="options.zIndex"
    :lock-scroll="true"
    :custom-class="`m-image-preview ${customClass}`"
    :custom-style="customStyle"
    @enter="handleEnter"
    @after-leave="handleAfterLeave"
  >
    <slot name="close" :close="close">
      <view
        v-if="options.closeable"
        :class="`m-image-preview__close m-image-preview__close--${options.closeIconPosition}`"
        @click.stop="close"
      >
        <m-icon custom-class="m-image-preview__close-icon" :name="options.closeIcon" />
      </view>
    </slot>

    <swiper
      v-if="state.visible"
      class="m-image-preview__swiper"
      :current="state.currentIndex"
      :autoplay="false"
      :circular="options.loop"
      :duration="300"
      @change="handleSwiperChange"
      @click="handleImageClick"
    >
      <swiper-item v-for="(image, index) in state.images" :key="index">
        <view class="m-image-preview__swiper-item">
          <image
            :src="image"
            class="m-image-preview__image"
            mode="aspectFit"
            :show-menu-by-longpress="options.showMenuByLongpress"
          />
        </view>
      </swiper-item>
    </swiper>

    <slot name="indicator" :total="state.images.length" :current="state.currentIndex">
      <view v-if="options.showIndex && state.images.length > 1" class="m-image-preview__index">
        {{ state.currentIndex + 1 }} / {{ state.images.length }}
      </view>
    </slot>

    <slot :current="state.currentIndex" :total="state.images.length" :images="state.images" :close="close"></slot>
  </m-overlay>
</template>

<script lang="ts">
export default {
  name: 'm-image-preview',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, inject, reactive, ref, watch } from 'vue'
import MOverlay from '../m-overlay/m-overlay.vue'
import MIcon from '../m-icon/m-icon.vue'
import { imagePreviewProps, type ImagePreviewExpose, type ImagePreviewOptions } from './types'
import { defaultOptions, getImagePreviewOptionKey } from './index'
import { isDef, isFunction } from '../common/util'

const props = defineProps(imagePreviewProps)

const emit = defineEmits<{
  'update:show': [value: boolean]
  open: []
  close: []
  click: [{ index: number }]
  change: [{ index: number }]
  'long-press': [{ image: string }]
}>()

const state = reactive({
  show: false,
  visible: false,
  currentIndex: 0,
  images: [] as string[]
})

const imagePreviewOptionKey = getImagePreviewOptionKey(props.selector)
const imagePreviewOption = inject(imagePreviewOptionKey, ref<ImagePreviewOptions>(defaultOptions))

const options = computed(() => ({
  showIndex: isDef(imagePreviewOption.value.showIndex) ? imagePreviewOption.value.showIndex : props.showIndex,
  loop: isDef(imagePreviewOption.value.loop) ? imagePreviewOption.value.loop : props.loop,
  closeable: isDef(imagePreviewOption.value.closeable) ? imagePreviewOption.value.closeable : props.closeable,
  closeIcon: isDef(imagePreviewOption.value.closeIcon) ? imagePreviewOption.value.closeIcon : props.closeIcon,
  closeIconPosition: isDef(imagePreviewOption.value.closeIconPosition) ? imagePreviewOption.value.closeIconPosition : props.closeIconPosition,
  closeOnClick: isDef(imagePreviewOption.value.closeOnClick) ? imagePreviewOption.value.closeOnClick : props.closeOnClick,
  showMenuByLongpress: isDef(imagePreviewOption.value.showMenuByLongpress) ? imagePreviewOption.value.showMenuByLongpress : props.showMenuByLongpress,
  zIndex: isDef(imagePreviewOption.value.zIndex) ? imagePreviewOption.value.zIndex! : props.zIndex,
  onOpen: imagePreviewOption.value.onOpen || props.onOpen || null,
  onClose: imagePreviewOption.value.onClose || props.onClose || null,
  onChange: imagePreviewOption.value.onChange || props.onChange || null,
  onLongPress: imagePreviewOption.value.onLongPress || props.onLongPress || null
}))

watch(
  () => imagePreviewOption.value,
  (newVal: ImagePreviewOptions) => {
    reset(newVal)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      state.images = props.images
      state.currentIndex = props.startPosition
      state.show = true
    } else {
      state.show = false
    }
  },
  { immediate: true }
)

watch(
  () => state.show,
  (newVal, oldVal) => {
    emit('update:show', newVal)
    if (newVal && !oldVal) {
      emit('open')
      if (isFunction(options.value.onOpen)) {
        options.value.onOpen()
      }
    } else if (!newVal && oldVal) {
      emit('close')
      if (isFunction(options.value.onClose)) {
        options.value.onClose()
      }
    }
  }
)

function reset(option: ImagePreviewOptions) {
  state.show = isDef(option.show) ? option.show! : false

  if (state.show) {
    state.images = isDef(option.images) ? option.images! : props.images || []
    state.currentIndex = isDef(option.startPosition) ? option.startPosition! : props.startPosition
  }
}

function handleEnter() {
  state.visible = true
}

function handleAfterLeave() {
  state.visible = false
  state.images = []
  state.currentIndex = 0
}

function open(opts?: ImagePreviewOptions | string[]) {
  if (opts) {
    if (Array.isArray(opts)) {
      state.images = opts
    } else {
      state.images = isDef(opts.images) ? opts.images! : props.images || []
      state.currentIndex = isDef(opts.startPosition) ? opts.startPosition! : props.startPosition
    }
  }
  state.show = true
}

function close() {
  state.show = false
}

function setActive(index: number) {
  if (index >= 0 && index < state.images.length) {
    state.currentIndex = index
  }
}

function handleSwiperChange(e: { detail: { current: number } }) {
  const { current } = e.detail
  state.currentIndex = current
  emit('change', { index: current })
  if (isFunction(options.value.onChange)) {
    options.value.onChange(current)
  }
}

function handleImageClick() {
  emit('click', { index: state.currentIndex })
  if (options.value.closeOnClick) {
    close()
  }
}

function handleLongPress(image: string) {
  emit('long-press', { image })
  if (isFunction(options.value.onLongPress)) {
    options.value.onLongPress(image)
  }
}

defineExpose<ImagePreviewExpose>({
  open,
  close,
  setActive
})
</script>

<style lang="scss">
@import './index.scss';
</style>