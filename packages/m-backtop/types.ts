import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumberProp, makeStringProp } from '../common/props'

export type BacktopShape = 'circle' | 'square'
export type BacktopEffect = 'border' | 'no-border' | 'floating'

export const backtopProps = {
  ...baseProps,
  scrollTop: {
    type: Number,
    default: undefined
  },
  text: String,
  top: makeNumberProp(300),
  duration: makeNumberProp(100),
  zIndex: makeNumberProp(10),
  iconStyle: makeStringProp(''),
  shape: makeStringProp<BacktopShape>('circle'),
  bottom: makeNumberProp(100),
  right: makeNumberProp(20),
  effect: makeStringProp<BacktopEffect>('floating')
}

export type BacktopProps = ExtractPropTypes<typeof backtopProps>