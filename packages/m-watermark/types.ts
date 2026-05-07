import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export type WatermarkFontStyle = 'normal' | 'italic' | 'oblique'

export type WatermarkLayout = 'grid' | 'staggered'

export const watermarkProps = {
  ...baseProps,
  content: makeStringProp(''),
  image: makeStringProp(''),
  imageHeight: makeNumberProp(100),
  imageWidth: makeNumberProp(100),
  gutterX: makeNumberProp(0),
  gutterY: makeNumberProp(0),
  width: makeNumberProp(100),
  height: makeNumberProp(100),
  fullScreen: makeBooleanProp(true),
  color: makeStringProp('#C9CBD4'),
  size: makeNumberProp(14),
  fontStyle: makeStringProp<WatermarkFontStyle>('normal'),
  fontWeight: makeNumericProp('normal'),
  fontFamily: makeStringProp('PingFang SC'),
  rotate: makeNumberProp(-25),
  zIndex: makeNumberProp(1100),
  opacity: Number,
  layout: makeStringProp<WatermarkLayout>('grid')
}

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>