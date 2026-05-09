import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'
import type { InputClearTrigger, InputMode } from '../m-input/types'

export type ConfirmType = 'send' | 'search' | 'next' | 'go' | 'done'

export type AutoSize = boolean | { minRows?: number; maxRows?: number }

export const textareaProps = {
  ...baseProps,
  customTextareaContainerClass: makeStringProp(''),
  customTextareaClass: makeStringProp(''),
  modelValue: makeNumericProp(''),
  placeholder: String,
  placeholderStyle: String,
  placeholderClass: makeStringProp(''),
  disabled: makeBooleanProp(false),
  maxlength: makeNumberProp(-1),
  autoFocus: makeBooleanProp(false),
  focus: makeBooleanProp(false),
  autoHeight: makeBooleanProp(false),
  autoSize: [Boolean, Object] as import('vue').PropType<AutoSize>,
  rows: makeNumberProp(5),
  fixed: makeBooleanProp(false),
  cursorSpacing: makeNumberProp(0),
  cursor: makeNumberProp(-1),
  confirmType: String as import('vue').PropType<ConfirmType>,
  confirmHold: makeBooleanProp(false),
  showConfirmBar: makeBooleanProp(true),
  selectionStart: makeNumberProp(-1),
  selectionEnd: makeNumberProp(-1),
  adjustPosition: makeBooleanProp(true),
  disableDefaultPadding: makeBooleanProp(false),
  holdKeyboard: makeBooleanProp(false),
  showPassword: makeBooleanProp(false),
  clearable: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  prefixIcon: String,
  showWordLimit: makeBooleanProp(false),
  error: makeBooleanProp(false),
  clearTrigger: makeStringProp<InputClearTrigger>('always'),
  focusWhenClear: makeBooleanProp(true),
  ignoreCompositionEvent: makeBooleanProp(true),
  inputmode: makeStringProp<InputMode>('text'),
  enableNative: makeBooleanProp(true),
  compact: makeBooleanProp(void 0),
  border: makeBooleanProp(false)
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>