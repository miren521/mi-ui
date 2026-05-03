import { inject, provide, ref } from 'vue'
import type { ImagePreview, ImagePreviewOptions } from './types'
import { deepMerge, isArray, isString } from '../common/util'

const imagePreviewDefaultOptionKey = '__IMAGE_PREVIEW_OPTION__'

export const defaultOptions: ImagePreviewOptions = {
  images: [],
  startPosition: 0,
  showIndex: true,
  loop: true,
  closeable: true,
  closeIcon: 'close',
  closeIconPosition: 'top-right',
  closeOnClick: true,
  showMenuByLongpress: true,
  show: false,
  zIndex: 1000
}

const None = Symbol('None')

export function useImagePreview(selector: string = ''): ImagePreview {
  const imagePreviewOptionKey = getImagePreviewOptionKey(selector)
  const imagePreviewOption = inject(imagePreviewOptionKey, ref<ImagePreviewOptions | typeof None>(None))

  if (imagePreviewOption.value === None) {
    imagePreviewOption.value = defaultOptions
    provide(imagePreviewOptionKey, imagePreviewOption)
  }

  const open = (options: ImagePreviewOptions | string[]) => {
    let mergedOptions: ImagePreviewOptions

    if (isArray(options)) {
      mergedOptions = deepMerge(defaultOptions, { images: options }) as ImagePreviewOptions
    } else {
      mergedOptions = deepMerge(defaultOptions, options) as ImagePreviewOptions
    }

    imagePreviewOption.value = deepMerge(mergedOptions, { show: true }) as ImagePreviewOptions
  }

  const close = () => {
    imagePreviewOption.value = { show: false }
  }

  return {
    previewImage: open,
    closeImagePreview: close
  }
}

export const getImagePreviewOptionKey = (selector: string) => {
  return selector ? `${imagePreviewDefaultOptionKey}${selector}` : imagePreviewDefaultOptionKey
}

export function getImageUrl(image: string | any) {
  return isString(image) ? image : image.url
}