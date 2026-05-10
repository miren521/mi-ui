import type { ExtractPropTypes } from 'vue'

export const RADIO_GROUP_KEY = Symbol('m-radio-group')

export type RadioType = 'circle' | 'square' | 'dot' | 'button'

export type RadioDirection = 'vertical' | 'horizontal'

export type RadioPlacement = 'left' | 'right'

export const radioProps = {
  value: {
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
  customClass: {
    type: String,
    default: ''
  },
  customLabelClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: String,
    default: ''
  }
}

export type RadioProps = ExtractPropTypes<typeof radioProps>