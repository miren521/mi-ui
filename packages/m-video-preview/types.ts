import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp, makeNumberProp } from '../common/props'

export const videoPreviewProps = {
  ...baseProps,
  selector: makeStringProp(''),
  zIndex: makeNumberProp(1000),
  onOpen: Function as PropType<() => void>,
  onClose: Function as PropType<() => void>
}

export type PreviewVideo = {
  url: string
  poster?: string
  title?: string
}

export type VideoPreviewProps = ExtractPropTypes<typeof videoPreviewProps>

export interface VideoPreviewOptions extends PreviewVideo {
  show?: boolean
  zIndex?: number
  onOpen?: () => void
  onClose?: () => void
}

export type VideoPreview = {
  previewVideo: (options: VideoPreviewOptions | PreviewVideo) => void
  closeVideoPreview: () => void
}

export type VideoPreviewExpose = {
  open: (video: PreviewVideo) => void
  close: () => void
}

export type VideoPreviewInstance = ComponentPublicInstance<VideoPreviewExpose, VideoPreviewProps>