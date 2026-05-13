import { baseProps, makeStringProp, makeBooleanProp, makeNumberProp } from '../common/props'
import type { ButtonProps } from '../m-button/types'
import { type IconProps } from '../m-icon/types'
import { type InputProps } from '../m-input/types'
import { type TextareaProps } from '../m-textarea/types'
import type { PropType } from 'vue'

export type DialogType = 'alert' | 'confirm' | 'prompt'
export type DialogTheme = 'button' | 'text'
export type DialogActionLayout = 'horizontal' | 'vertical'
export type DialogSelector = string | { selector: string; rootPortal?: boolean }

export type DialogBuiltinIconType = 'success' | 'info' | 'warning' | 'danger'

export const DIALOG_BUILTIN_ICON_MAP: Record<DialogBuiltinIconType, string> = {
  success: 'check-circle-fill',
  info: 'info-circle-fill',
  warning: 'exclamation-circle-fill',
  danger: 'close-circle-fill'
}

export interface DialogButtonOpenTypeEvents {
  onGetuserinfo?: (detail: any) => void
  onContact?: (detail: any) => void
  onGetphonenumber?: (detail: any) => void
  onGetrealtimephonenumber?: (detail: any) => void
  onError?: (detail: any) => void
  onLaunchapp?: (detail: any) => void
  onOpensetting?: (detail: any) => void
  onChooseavatar?: (detail: any) => void
  onAgreeprivacyauthorization?: (detail: any) => void
}

export const OPEN_TYPE_EVENT_KEYS: (keyof DialogButtonOpenTypeEvents)[] = [
  'onGetuserinfo',
  'onContact',
  'onGetphonenumber',
  'onGetrealtimephonenumber',
  'onError',
  'onLaunchapp',
  'onOpensetting',
  'onChooseavatar',
  'onAgreeprivacyauthorization'
]

export type DialogAction = Partial<ButtonProps> &
  DialogButtonOpenTypeEvents & {
    text?: string
    click?: () => void | Promise<void>
  }

export type DialogBoxButtonOption =
  | string
  | (Partial<ButtonProps> &
      DialogButtonOpenTypeEvents & {
        text?: string
      })
  | null

export type DialogInputType = string | 'textarea'

export type DialogOptions = {
  show?: boolean
  title?: string
  msg?: string
  type?: DialogType
  theme?: DialogTheme
  zIndex?: number
  lazyRender?: boolean
  headerImage?: string
  icon?: string
  iconColor?: string
  iconProps?: Partial<IconProps>
  inputValue?: string | number
  inputProps?: Partial<InputProps>
  textareaProps?: Partial<TextareaProps>
  inputPattern?: RegExp
  inputValidate?: (inputValue: string | number) => boolean | string
  inputError?: string
  showErr?: boolean
  actionLayout?: DialogActionLayout
  showCancelButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonProps?: DialogBoxButtonOption
  cancelButtonProps?: DialogBoxButtonOption
  actions?: DialogAction[]
  closeOnClickModal?: boolean
  showClose?: boolean
  beforeConfirm?: DialogBeforeConfirm
}

export type DialogBeforeConfirm = (value: string | number) => boolean | Promise<boolean>

export type DialogOptionsWithCallBack = DialogOptions & {
  show?: boolean
  success?: (res: DialogResult) => void
  fail?: (res: DialogResult) => void
}

export type ActionType = 'confirm' | 'cancel' | 'modal' | 'close'

export type InputValidate = (inputValue: string | number) => boolean

export interface DialogResult {
  action: ActionType
  value?: string | number
}

export interface Dialog {
  show(options: DialogOptions | string): Promise<DialogResult>
  alert(options: DialogOptions | string): Promise<DialogResult>
  confirm(options: DialogOptions | string): Promise<DialogResult>
  prompt(options: DialogOptions | string): Promise<DialogResult>
  close(): void
}

export const dialogProps = {
  ...baseProps,
  selector: makeStringProp(''),
  rootPortal: makeBooleanProp(false),
  title: makeStringProp(''),
  msg: makeStringProp(''),
  type: makeStringProp<DialogType>('alert'),
  theme: makeStringProp<DialogTheme>('button'),
  zIndex: makeNumberProp(99),
  lazyRender: makeBooleanProp(true),
  headerImage: String,
  icon: String,
  iconColor: String,
  iconProps: Object,
  inputProps: Object as PropType<Partial<InputProps>>,
  textareaProps: Object as PropType<Partial<TextareaProps>>,
  inputPattern: RegExp,
  inputValidate: Function as PropType<DialogOptions['inputValidate']>,
  inputError: String,
  showErr: {
    type: Boolean
  },
  actionLayout: makeStringProp<DialogActionLayout>('horizontal'),
  confirmButtonProps: {
    type: [String, Object, null] as PropType<DialogBoxButtonOption>
  },
  cancelButtonProps: {
    type: [String, Object, null] as PropType<DialogBoxButtonOption>
  },
  showCancelButton: {
    type: Boolean
  },
  confirmButtonText: String,
  cancelButtonText: String,
  actions: Array as PropType<DialogAction[]>,
  closeOnClickModal: makeBooleanProp(false),
  showClose: Boolean,
  beforeConfirm: Function as PropType<DialogOptions['beforeConfirm']>
}