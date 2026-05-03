import type { PropType, ExtractPropTypes } from 'vue'
import { makeArrayProp, makeBooleanProp, makeStringProp } from '../common/props'

export type SkeletonTheme = 'text' | 'avatar' | 'paragraph' | 'image'

export type SkeletonAnimation = 'gradient' | 'flashed'

export type SkeletonRowColObj = {
  type?: 'rect' | 'circle' | 'text'
  size?: string | number
  width?: string | number
  height?: string | number
  margin?: string | number
  background?: string
  marginLeft?: string | number
  marginRight?: string | number
  borderRadius?: string | number
  backgroundColor?: string
  [key: string]: any
}

export type SkeletonRowCol = number | SkeletonRowColObj | Array<SkeletonRowColObj>

export const skeletonProps = {
  theme: makeStringProp<SkeletonTheme>('text'),
  rowCol: makeArrayProp<SkeletonRowCol>(),
  loading: makeBooleanProp(true),
  animation: {
    type: String as PropType<SkeletonAnimation>,
    default: ''
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

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>