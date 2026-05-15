import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning'
export type NotifyPosition = 'top' | 'bottom'
export type NotifyVariant = 'filled' | 'floating'

export type NotifyProps = Omit<Partial<ExtractPropTypes<typeof notifyProps>>, 'selector'> & {
  onClick?: (event: MouseEvent) => void
  onClosed?: () => void
  onOpened?: () => void
}

export type NotifyThemeVars = {
  notifyPadding?: string
  notifyFontSize?: string
  notifyTextColor?: string
  notifyLineHeight?: number | string
  notifyDangerBackground?: string
  notifyPrimaryBackground?: string
  notifySuccessBackground?: string
  notifyWarningBackground?: string
}

export const notifyProps = {
  ...baseProps,
  type: makeStringProp<NotifyType>('danger'),
  color: makeStringProp(''),
  zIndex: makeNumberProp(99),
  visible: makeBooleanProp(false),
  message: makeNumericProp(''),
  selector: makeStringProp(''),
  duration: makeNumberProp(3000),
  position: makeStringProp<NotifyPosition>('top'),
  safeHeight: Number,
  background: makeStringProp(''),
  rootPortal: makeBooleanProp(false),
  closable: makeBooleanProp(false),
  variant: makeStringProp<NotifyVariant>('filled')
}