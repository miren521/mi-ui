import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../../wot-ui/common/props'

export type CountToType = 'default' | 'primary' | 'success' | 'warning' | 'error'

export const countToProps = {
  ...baseProps,
  color: makeStringProp(''),
  type: makeStringProp<CountToType>('default'),
  startVal: makeNumberProp(0),
  endVal: makeNumberProp(2024),
  duration: makeNumberProp(3000),
  autoStart: makeBooleanProp(true),
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value: number) {
      return value >= 0
    }
  },
  decimal: makeStringProp('.'),
  separator: makeStringProp(','),
  prefix: makeStringProp(''),
  suffix: makeStringProp(''),
  useEasing: makeBooleanProp(true)
}

export type CountToProps = ExtractPropTypes<typeof countToProps>

export type CountToExpose = {
  start: () => void
  pause: () => void
  reset: () => void
}

export type CountToInstance = ComponentPublicInstance<CountToProps, CountToExpose>