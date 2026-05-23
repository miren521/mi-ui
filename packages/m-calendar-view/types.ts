import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).getTime()
const defaultMaxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate(), 23, 59, 59).getTime()

export type CalendarType = 'date' | 'dates' | 'datetime' | 'week' | 'month' | 'daterange' | 'datetimerange' | 'weekrange' | 'monthrange'

export const calendarViewProps = {
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
  showPanelTitle: makeBooleanProp(true),
  defaultTime: {
    type: [String, Array] as PropType<string | string[]>,
    default: '00:00:00'
  },
  panelHeight: makeNumberProp(316),
  timeFilter: Function as PropType<CalendarTimeFilter>,
  timeItemHeight: makeNumberProp(44),
  timeVisibleItemCount: makeNumberProp(3),
  hideSecond: makeBooleanProp(false),
  immediateChange: makeBooleanProp(false),
  switchMode: makeStringProp<'none' | 'month' | 'year-month'>('none'),
  showHeader: makeBooleanProp(true),
  showYearView: makeBooleanProp(false),
  itemHeight: makeNumberProp(64),
  visibleItemCount: makeNumberProp(6),
  timeFormatter: Function as PropType<CalendarTimeFormatter>
}

export type CalendarViewProps = ExtractPropTypes<typeof calendarViewProps>

export type CalendarDayType = '' | 'start' | 'middle' | 'end' | 'selected' | 'same' | 'current' | 'multiple-middle' | 'multiple-selected'

export type CalendarDayItem = {
  date: number
  text?: number | string
  topInfo?: string
  bottomInfo?: string
  type?: CalendarDayType
  disabled?: boolean
  isLastRow?: boolean
  customClass?: string
}

export type CalendarFormatter = (day: CalendarDayItem) => CalendarDayItem

export type CalendarTimeFilter = (type: string, options: { label: string; value: number }[]) => { label: string; value: number }[]

export type CalendarTimeFormatter = (type: string, value: string) => string

export type CalendarItem = {
  label: string
  value: number
  disabled: boolean
}

export type CalendarViewExpose = {
  scrollIntoView: () => void
}

export type CalendarViewInstance = ComponentPublicInstance<CalendarViewProps, CalendarViewExpose>