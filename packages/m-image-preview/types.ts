import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type ImagePreviewCloseIconPosition = 'top-left' | 'top-right'

export type ImagePreviewOptions = {
  images?: string[]
  startPosition?: number
  showIndex?: boolean
  loop?: boolean
  closeable?: boolean
  closeIcon?: string
  closeIconPosition?: ImagePreviewCloseIconPosition
  closeOnClick?: boolean
  showMenuByLongpress?: boolean
  show?: boolean
  zIndex?: number
  onOpen?: () => void
  onClose?: () => void
  onChange?: (index: number) => void
  onLongPress?: (image: string) => void
}

export interface ImagePreview {
  previewImage: (options: ImagePreviewOptions | string[]) => void
  closeImagePreview: () => void
}

export const imagePreviewProps = {
  ...baseProps,
  selector: makeStringProp(''),
  show: makeBooleanProp(false),
  images: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  startPosition: makeNumberProp(0),
  showIndex: makeBooleanProp(true),
  loop: makeBooleanProp(true),
  closeable: makeBooleanProp(true),
  closeIcon: makeStringProp('close'),
  closeIconPosition: makeStringProp<ImagePreviewCloseIconPosition>('top-right'),
  closeOnClick: makeBooleanProp(true),
  showMenuByLongpress: makeBooleanProp(true),
  onOpen: Function as PropType<() => void>,
  onClose: Function as PropType<() => void>,
  onChange: Function as PropType<(index: number) => void>,
  onLongPress: Function as PropType<(image: string) => void>,
  zIndex: makeNumberProp(1000)
}

export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>

export type ImagePreviewExpose = {
  open: (options?: ImagePreviewOptions | string[]) => void
  close: () => void
  setActive: (index: number) => void
}

export type ImagePreviewInstance = ComponentPublicInstance<ImagePreviewExpose, ImagePreviewProps>