import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../common/props'
import type { LoadingType } from '../m-loading/types'

export type ToastIconType = 'success' | 'error' | 'warning' | 'loading' | 'info'

export type ToastPositionType = 'top' | 'middle-top' | 'middle' | 'bottom'

export type ToastDirection = 'vertical' | 'horizontal'

export type ToastLoadingType = LoadingType

export type ToastOptions = {
  msg?: string
  duration?: number
  direction?: ToastDirection
  iconName?: ToastIconType
  iconSize?: number
  loadingType?: ToastLoadingType
  loadingColor?: string
  loadingSize?: number
  iconColor?: string
  position?: ToastPositionType
  show?: boolean
  zIndex?: number
  cover?: boolean
  iconClass?: string
  classPrefix?: string
  cssIcon?: boolean | string
  opened?: () => void
  closed?: () => void
}

export interface Toast {
  show(toastOptions: ToastOptions | string): void
  success(toastOptions: ToastOptions | string): void
  error(toastOptions: ToastOptions | string): void
  info(toastOptions: ToastOptions | string): void
  warning(toastOptions: ToastOptions | string): void
  loading(toastOptions: ToastOptions | string): void
  close(): void
}

export const toastProps = {
  ...baseProps,
  selector: makeStringProp(''),
  msg: {
    type: String,
    default: ''
  },
  direction: makeStringProp<ToastDirection>('horizontal'),
  iconName: {
    type: String as PropType<ToastIconType>,
    default: ''
  },
  iconSize: Number,
  loadingType: makeStringProp<ToastLoadingType>('circular'),
  loadingColor: {
    type: String,
    default: '#ffffff'
  },
  loadingSize: Number,
  iconColor: String,
  position: makeStringProp<ToastPositionType>('middle'),
  zIndex: {
    type: Number,
    default: 100
  },
  cover: {
    type: Boolean,
    default: false
  },
  iconClass: {
    type: String,
    default: ''
  },
  classPrefix: makeStringProp('m-icon'),
  cssIcon: {
    type: [Boolean, String],
    default: false
  },
  opened: Function as PropType<() => void>,
  closed: Function as PropType<() => void>
}

export type ToastProps = ExtractPropTypes<typeof toastProps>