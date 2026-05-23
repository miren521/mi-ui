import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { CalendarFormatter, CalendarTimeFilter, CalendarType } from '../m-calendar-view/types'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).getTime()
const defaultMaxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate(), 23, 59, 59).getTime()

export const calendarProps = {
  ...baseProps,
  modelValue: makeRequiredProp([Number, Array, null] as PropType<number | number[] | null>),
  type: makeStringProp<CalendarType>('date'),
  minDate: makeNumberProp(defaultMinDate),
  maxDate: makeNumberProp(defaultMaxDate),
  firstDayOfWeek: makeNumberProp(0),
  formatter: Function as PropType<CalendarFormatter>,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: makeBooleanProp(false),
  defaultTime: {
    type: [String, Array] as PropType<string | string[]>
  },
  timeFilter: Function as PropType<CalendarTimeFilter>,
  hideSecond: makeBooleanProp(false),
  title: String,
  closeOnClickModal: makeBooleanProp(true),
  zIndex: makeNumberProp(15),
  showConfirm: makeBooleanProp(true),
  confirmText: String,
  innerDisplayFormat: Function as PropType<CalendarInnerDisplayFormat>,
  ellipsis: makeBooleanProp(false),
  showTypeSwitch: makeBooleanProp(false),
  shortcuts: makeArrayProp<Record<string, any>>(),
  onShortcutsClick: Function as PropType<CalendarOnShortcutsClick>,
  safeAreaInsetBottom: makeBooleanProp(true),
  beforeConfirm: Function as PropType<CalendarBeforeConfirm>,
  customViewClass: makeStringProp(''),
  immediateChange: makeBooleanProp(false),
  rootPortal: makeBooleanProp(false),
  visible: makeBooleanProp(false),
  panelHeight: makeNumberProp(316),
  showPanelTitle: makeBooleanProp(true),
  switchMode: makeStringProp<'none' | 'month' | 'year-month'>('none'),
  duration: makeNumberProp(200)
}

export type CalendarInnerDisplayFormat = (value: number, rangeType: 'start' | 'end', type: CalendarType) => string

export type CalendarBeforeConfirm = (value: number | number[] | null) => boolean | Promise<boolean>

export type CalendarOnShortcutsClickOption = {
  item: Record<string, any>
  index: number
}

export type CalendarOnShortcutsClick = (option: CalendarOnShortcutsClickOption) => number | number[]

export type CalendarExpose = {
  close: () => void
  open: () => void
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>

export type CalendarInstance = ComponentPublicInstance<CalendarProps, CalendarExpose>