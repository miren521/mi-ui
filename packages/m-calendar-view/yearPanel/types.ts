import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { makeBooleanProp, makeRequiredProp, makeStringProp } from '../../common/props'
import type { CalendarFormatter, CalendarType } from '../types'

export interface YearInfo {
  date: number
  height: number
}

export const yearPanelProps = {
  type: makeRequiredProp(String as PropType<CalendarType>),
  value: makeRequiredProp([Number, Array] as PropType<number | (number | null)[] | null>),
  minDate: makeRequiredProp(Number),
  maxDate: makeRequiredProp(Number),
  formatter: Function as PropType<CalendarFormatter>,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: makeBooleanProp(false),
  showPanelTitle: makeBooleanProp(true),
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  panelHeight: makeRequiredProp(Number),
  switchMode: makeStringProp<'none' | 'month' | 'year-month'>('none')
}

export type YearPanelProps = ExtractPropTypes<typeof yearPanelProps>

export type YearPanelExpose = {
  scrollIntoView: () => void
}

export type YearPanelInstance = ComponentPublicInstance<YearPanelProps, YearPanelExpose>
