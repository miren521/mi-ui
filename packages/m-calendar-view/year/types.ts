import type { PropType } from 'vue'
import { makeBooleanProp, makeRequiredProp } from '../../common/props'
import type { CalendarType } from '../types'

export const yearProps = {
  type: makeRequiredProp(String as PropType<CalendarType>),
  date: makeRequiredProp(Number),
  value: makeRequiredProp([Number, Array, null] as PropType<number | (number | null)[] | null>),
  minDate: makeRequiredProp(Number),
  maxDate: makeRequiredProp(Number),
  showTitle: makeBooleanProp(true)
}