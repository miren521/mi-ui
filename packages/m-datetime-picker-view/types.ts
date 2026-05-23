import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp, type Numeric } from '../common/props'

export type DateTimeType = 'date' | 'year-month' | 'time' | 'datetime' | 'year'

export const datetimePickerViewProps = {
  ...baseProps,
  modelValue: makeRequiredProp([String, Number]),
  itemHeight: makeNumberProp(44),
  visibleItemCount: makeNumberProp(6),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  type: makeStringProp<DateTimeType>('datetime'),
  filter: Function as PropType<DatetimePickerViewFilter>,
  formatter: Function as PropType<DatetimePickerViewFormatter>,
  columnFormatter: Function as PropType<DatetimePickerViewColumnFormatter>,
  minDate: makeNumberProp(new Date(new Date().getFullYear() - 10, 0, 1).getTime()),
  maxDate: makeNumberProp(new Date(new Date().getFullYear() + 10, 11, 31).getTime()),
  minHour: makeNumberProp(0),
  maxHour: makeNumberProp(23),
  minMinute: makeNumberProp(0),
  maxMinute: makeNumberProp(59),
  useSecond: makeBooleanProp(false),
  minSecond: makeNumberProp(0),
  maxSecond: makeNumberProp(59),
  immediateChange: makeBooleanProp(false),
  boundaryMinDate: Number,
  boundaryMaxDate: Number
}

export type DatetimePickerViewColumnType = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second'

export type DatetimePickerViewOption = {
  value: number
  label: string
  disabled?: boolean
}

export type DatetimePickerViewColumn = {
  type: DatetimePickerViewColumnType
  values: number[]
}

export type DatetimePickerViewFilter = (options: DatetimePickerViewColumn) => number[]

export type DatetimePickerViewFormatter = (type: DatetimePickerViewColumnType, value: Numeric) => string

export type DatetimePickerViewColumnFormatter = (columns: DatetimePickerViewOption[][]) => DatetimePickerViewOption[][]

export type DatetimePickerViewProps = ExtractPropTypes<typeof datetimePickerViewProps>

export type DatetimePickerViewExpose = {
  getSelectedOptions: () => Record<string, any> | Record<string, any>[] | undefined
  correctValue: (value: string | number) => string | number
  getOriginColumns: () => DatetimePickerViewColumn[]
}

export type DatetimePickerViewInstance = ComponentPublicInstance<DatetimePickerViewProps, DatetimePickerViewExpose>