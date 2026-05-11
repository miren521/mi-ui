import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export type InputClearTrigger = 'focus' | 'always'

export type InputType = 'text' | 'number' | 'digit' | 'idcard' | 'safe-password' | 'nickname' | 'tel'

export type InputConfirmType = 'send' | 'search' | 'next' | 'go' | 'done'

export type InputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'

export const inputProps = {
  ...baseProps,
  customInputClass: makeStringProp(''),
  placeholder: String,
  placeholderStyle: String,
  placeholderClass: makeStringProp(''),
  cursorSpacing: makeNumberProp(0),
  cursor: makeNumberProp(-1),
  selectionStart: makeNumberProp(-1),
  selectionEnd: makeNumberProp(-1),
  adjustPosition: makeBooleanProp(true),
  holdKeyboard: makeBooleanProp(false),
  confirmType: makeStringProp<InputConfirmType>('done'),
  confirmHold: makeBooleanProp(false),
  focus: makeBooleanProp(false),
  type: makeStringProp<InputType>('text'),
  maxlength: {
    type: Number,
    default: -1
  },
  disabled: makeBooleanProp(false),
  alwaysEmbed: makeBooleanProp(false),
  alignRight: makeBooleanProp(false),
  modelValue: makeNumericProp(''),
  showPassword: makeBooleanProp(false),
  clearable: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  prefixIcon: String,
  suffixIcon: String,
  showWordLimit: makeBooleanProp(false),
  error: makeBooleanProp(false),
  clearTrigger: makeStringProp<InputClearTrigger>('always'),
  focusWhenClear: makeBooleanProp(true),
  ignoreCompositionEvent: makeBooleanProp(true),
  inputmode: makeStringProp<InputMode>('text'),
  enableNative: makeBooleanProp(true),
  compact: makeBooleanProp(true),
  border: makeBooleanProp(false),
  background: makeBooleanProp(false)
}

export type InputProps = ExtractPropTypes<typeof inputProps>