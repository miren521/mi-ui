import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type NoticeBarType = 'warning' | 'info' | 'danger' | ''
export type NoticeBarScrollDirection = 'horizontal' | 'vertical'

export const noticeBarProps = {
  ...baseProps,
  text: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  type: makeStringProp<NoticeBarType>('warning'),
  scrollable: makeBooleanProp(true),
  delay: makeNumberProp(1),
  speed: makeNumberProp(50),
  closable: makeBooleanProp(false),
  wrapable: makeBooleanProp(false),
  prefix: String,
  color: String,
  backgroundColor: String,
  direction: makeStringProp<NoticeBarScrollDirection>('horizontal')
}

export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>

export type NoticeBarExpose = {
  reset: () => void
}

export type NoticeBarInstance = ComponentPublicInstance<NoticeBarProps, NoticeBarExpose>