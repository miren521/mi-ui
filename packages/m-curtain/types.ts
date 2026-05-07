import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type ClosePosition = 'inset' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export const curtainProps = {
  ...baseProps,
  value: makeBooleanProp(false),
  modelValue: makeBooleanProp(false),
  closePosition: makeStringProp<ClosePosition>('inset'),
  src: String,
  to: String,
  width: Number,
  closeOnClickModal: makeBooleanProp(false),
  hideWhenClose: makeBooleanProp(true),
  zIndex: makeNumberProp(10),
  customCloseClass: makeStringProp(''),
  customCloseStyle: makeStringProp(''),
  rootPortal: makeBooleanProp(false),
  showMenuByLongpress: makeBooleanProp(false),
  closeOnClick: makeBooleanProp(true),
  duration: makeNumberProp(300),
  modal: makeBooleanProp(true)
}

export type CurtainProps = ExtractPropTypes<typeof curtainProps>