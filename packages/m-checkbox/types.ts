import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type CheckboxType = 'circle' | 'square' | 'button' | 'dot'
export type CheckboxPlacement = 'left' | 'right'
export type CheckboxDirection = 'horizontal' | 'vertical'

export const checkboxProps = {
  ...baseProps,
  modelValue: {
    type: [String, Number, Boolean],
    default: false
  },
  name: {
    type: [String, Number, Boolean],
    default: ''
  },
  type: {
    type: String as PropType<CheckboxType>,
    default: 'square'
  },
  checkedColor: String,
  uncheckedColor: String,
  disabled: {
    type: [Boolean, null] as PropType<boolean | null>,
    default: null
  },
  indeterminate: makeBooleanProp(false),
  readonly: {
    type: [Boolean, null] as PropType<boolean | null>,
    default: null
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false
  },
  size: String,
  maxWidth: String,
  placement: String as PropType<CheckboxPlacement>,
  direction: String as PropType<CheckboxDirection>,
  customLabelClass: String
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export type CheckboxExpose = {
  toggle: () => void
}

export type CheckboxInstance = ComponentPublicInstance<CheckboxProps, CheckboxExpose>