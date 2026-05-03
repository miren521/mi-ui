<template>
  <m-overlay
    :show="state.show"
    :z-index="options.zIndex"
    :lock-scroll="true"
    :custom-class="`m-video-preview ${customClass}`"
    :custom-style="customStyle"
    @click="close"
    @enter="handleEnter"
    @after-leave="handleAfterLeave"
  >
    <view class="m-video-preview__video" @click.stop="">
      <video
        class="m-video-preview__video"
        v-if="state.visible && previewVideo.url"
        :controls="true"
        :poster="previewVideo.poster"
        :title="previewVideo.title"
        play-btn-position="center"
        :enableNative="true"
        :src="previewVideo.url"
        :enable-progress-gesture="false"
      ></video>
    </view>
    <view class="m-video-preview__close" @click.stop="close">
      <m-icon name="close" custom-class="m-video-preview__close-icon" />
    </view>
  </m-overlay>
</template>

<script lang="ts">
export default {
  name: 'm-video-preview',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { reactive, ref, inject, watch, computed } from 'vue'
import MOverlay from '../m-overlay/m-overlay.vue'
import MIcon from '../m-icon/m-icon.vue'
import { videoPreviewProps, type PreviewVideo, type VideoPreviewOptions, type VideoPreviewExpose } from './types'
import { defaultOptions, getVideoPreviewOptionKey } from './index'
import { isDef, isFunction } from '../common/util'

const props = defineProps(videoPreviewProps)

const emit = defineEmits<{
  open: []
  close: []
}>()

const state = reactive({
  show: false,
  visible: false
})

const previewVideo = reactive<PreviewVideo>({ url: '', poster: '', title: '' })

const videoPreviewOptionKey = getVideoPreviewOptionKey(props.selector)
const videoPreviewOption = inject(videoPreviewOptionKey, ref<VideoPreviewOptions>(defaultOptions))

const options = computed(() => ({
  zIndex: isDef(videoPreviewOption.value.zIndex) ? videoPreviewOption.value.zIndex! : props.zIndex,
  onOpen: videoPreviewOption.value.onOpen || props.onOpen || null,
  onClose: videoPreviewOption.value.onClose || props.onClose || null
}))

watch(
  () => videoPreviewOption.value,
  (newVal: VideoPreviewOptions) => {
    reset(newVal)
  },
  { deep: true, immediate: true }
)

watch(
  () => state.show,
  (newVal, oldVal) => {
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

function reset(option: VideoPreviewOptions) {
  state.show = isDef(option.show) ? option.show! : false
  if (state.show) {
    previewVideo.url = option.url
    previewVideo.poster = option.poster
    previewVideo.title = option.title
  }
}

function handleEnter() {
  state.visible = true
}

function handleAfterLeave() {
  state.visible = false
  previewVideo.url = ''
  previewVideo.poster = ''
  previewVideo.title = ''
}

function close() {
  state.show = false
}

function open(video: PreviewVideo) {
  previewVideo.url = video.url
  previewVideo.poster = video.poster
  previewVideo.title = video.title
  state.show = true
}

defineExpose<VideoPreviewExpose>({
  open,
  close
})
</script>

<style lang="scss">
@import './index.scss';
</style>