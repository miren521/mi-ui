import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export type BacktopShape = 'circle' | 'square'

export const backtopProps = {
  ...baseProps,
  scrollTop: makeRequiredProp(Number),
  text: String,
  top: makeNumberProp(300),
  duration: makeNumberProp(100),
  zIndex: makeNumberProp(10),
  iconStyle: makeStringProp(''),
  shape: makeStringProp<BacktopShape>('circle'),
  bottom: makeNumberProp(100),
  right: makeNumberProp(20)
}

export type BacktopProps = ExtractPropTypes<typeof backtopProps>
