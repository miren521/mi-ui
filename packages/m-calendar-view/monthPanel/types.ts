import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'
import type { CalendarFormatter, CalendarTimeFilter, CalendarTimeFormatter, CalendarType } from '../types'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).getTime()
const defaultMaxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate(), 23, 59, 59).getTime()

export interface MonthInfo {
  date: number
  height: number
}

export const monthPanelProps = {
  type: makeStringProp<CalendarType>('date'),
  value: {
    type: [Number, Array, null] as PropType<number | (number | null)[] | null>,
    default: null
  },
  minDate: makeNumberProp(defaultMinDate),
  maxDate: makeNumberProp(defaultMaxDate),
  firstDayOfWeek: makeNumberProp(0),
  formatter: Function as PropType<CalendarFormatter>,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: makeBooleanProp(false),
  showPanelTitle: makeBooleanProp(false),
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  panelHeight: makeNumberProp(378),
  itemHeight: makeNumberProp(44),
  visibleItemCount: makeNumberProp(6),
  timeFilter: Function as PropType<CalendarTimeFilter>,
  timeFormatter: Function as PropType<CalendarTimeFormatter>,
  hideSecond: makeBooleanProp(false),
  immediateChange: makeBooleanProp(false),
  switchMode: makeStringProp<'none' | 'month' | 'year-month'>('none')
}

export type MonthPanelProps = ExtractPropTypes<typeof monthPanelProps>

export type MonthPanelTimeType = 'start' | 'end' | ''

export type MonthPanelExpose = {
  scrollIntoView: () => void
}

export type MonthPanelInstance = ComponentPublicInstance<MonthPanelProps, MonthPanelExpose>