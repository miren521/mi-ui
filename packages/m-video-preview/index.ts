import { inject, provide, ref } from 'vue'
import type { VideoPreview, VideoPreviewOptions, PreviewVideo } from './types'
import { deepMerge } from '../common/util'

const videoPreviewDefaultOptionKey = '__VIDEO_PREVIEW_OPTION__'

export const defaultOptions: VideoPreviewOptions = {
  url: '',
  poster: '',
  title: '',
  show: false,
  zIndex: 1000
}

const None = Symbol('None')

export function useVideoPreview(selector: string = ''): VideoPreview {
  const videoPreviewOptionKey = getVideoPreviewOptionKey(selector)
  const videoPreviewOption = inject(videoPreviewOptionKey, ref<VideoPreviewOptions | typeof None>(None))

  if (videoPreviewOption.value === None) {
    videoPreviewOption.value = defaultOptions
    provide(videoPreviewOptionKey, videoPreviewOption)
  }

  const open = (options: VideoPreviewOptions | PreviewVideo) => {
    const mergedOptions = deepMerge(defaultOptions, options) as VideoPreviewOptions
    videoPreviewOption.value = deepMerge(mergedOptions, { show: true }) as VideoPreviewOptions
  }

  const close = () => {
    videoPreviewOption.value = { show: false } as VideoPreviewOptions
  }

  return {
    previewVideo: open,
    closeVideoPreview: close
  }
}

export const getVideoPreviewOptionKey = (selector: string) => {
  return selector ? `${videoPreviewDefaultOptionKey}${selector}` : videoPreviewDefaultOptionKey
}