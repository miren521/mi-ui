import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../common/props'

export type TextType = 'default' | 'primary' | 'success' | 'warning' | 'error'

export const textProps = {
  ...baseProps,

  type: makeStringProp<TextType>('default'),

  text: makeNumericProp(''),

  size: makeStringProp(''),

  mode: makeStringProp('text'),

  decoration: makeStringProp('none'),

  call: makeBooleanProp(false),

  bold: makeBooleanProp(false),

  format: makeBooleanProp(false),

  color: makeStringProp(''),

  prefix: String,

  suffix: String,

  lines: Number,

  lineHeight: makeStringProp(''),

  customStyle: makeStringProp(''),

  customClass: makeStringProp('')
}

export type TextProps = ExtractPropTypes<typeof textProps>