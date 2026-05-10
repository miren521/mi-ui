import type { ExtractPropTypes } from 'vue'
import type { RadioType, RadioDirection, RadioPlacement } from '../m-radio/types'

export const RADIO_GROUP_KEY = Symbol('m-radio-group')

export const radioGroupProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  type: {
    type: String as () => RadioType,
    default: 'circle'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  checkedColor: {
    type: String,
    default: ''
  },
  uncheckedColor: {
    type: String,
    default: ''
  },
  direction: {
    type: String as () => RadioDirection,
    default: 'vertical'
  },
  placement: {
    type: String as () => RadioPlacement,
    default: 'left'
  },
  allowUncheck: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: String,
    default: ''
  }
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export interface RadioGroupProvide {
  props: RadioGroupProps
  updateValue: (value: string | number | boolean | null) => void
}