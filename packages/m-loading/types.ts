import type { ExtractPropTypes } from 'vue'
import { baseProps, makeStringProp, numericProp } from '../common/props'

export type LoadingType = 'circular' | 'spinner' | 'dots' | 'wave' | 'pulse' | 'sync'

export type LoadingDirection = 'horizontal' | 'vertical'

export const loadingProps = {
  ...baseProps,
  customSpinnerClass: makeStringProp(''),
  type: makeStringProp<LoadingType>('circular'),
  color: String,
  size: numericProp,
  direction: makeStringProp<LoadingDirection>('vertical'),
  text: String,
  inheritColor: Boolean
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>