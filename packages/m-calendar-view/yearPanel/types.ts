import type { PropType } from 'vue'
import { makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'
import type { CalendarType } from '../types'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()).getTime()
const defaultMaxDate = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate()).getTime()

export const yearPanelProps = {
  type: makeStringProp<CalendarType>('date'),
  value: {
    type: [Number, Array, null] as PropType<number | (number | null)[] | null>,
    default: null
  },
  minDate: makeNumberProp(defaultMinDate),
  maxDate: makeNumberProp(defaultMaxDate),
  panelHeight: makeNumberProp(378),
  switchMode: makeBooleanProp(false)
}