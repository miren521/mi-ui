import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { DateTimeType, DatetimePickerViewFilter, DatetimePickerViewFormatter } from '../m-datetime-picker-view/types'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear() - 10, 0, 1).getTime()
const defaultMaxDate = new Date(now.getFullYear() + 10, 11, 31, 23, 59, 59).getTime()

export const datetimePickerProps = {
  ...baseProps,
  itemHeight: makeNumberProp(44),
  visibleItemCount: makeNumberProp(6),
  title: String,
  cancelButtonText: String,
  confirmButtonText: String,
  closeOnClickModal: makeBooleanProp(true),
  safeAreaInsetBottom: makeBooleanProp(true),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  modelValue: makeRequiredProp([String, Number, Array] as PropType<string | number | Array<string | number>>),
  type: makeStringProp<DateTimeType>('datetime'),
  minDate: makeNumberProp(defaultMinDate),
  maxDate: makeNumberProp(defaultMaxDate),
  minHour: makeNumberProp(0),
  maxHour: makeNumberProp(23),
  minMinute: makeNumberProp(0),
  maxMinute: makeNumberProp(59),
  useSecond: makeBooleanProp(false),
  minSecond: makeNumberProp(0),
  maxSecond: makeNumberProp(59),
  filter: Function as PropType<DatetimePickerViewFilter>,
  formatter: Function as PropType<DatetimePickerViewFormatter>,
  beforeConfirm: Function as PropType<DatetimePickerBeforeConfirm>,
  displayFormatTabLabel: Function as PropType<DatetimePickerDisplayFormatTabLabel>,
  zIndex: makeNumberProp(15),
  customViewClass: makeStringProp(''),
  immediateChange: makeBooleanProp(false),
  rootPortal: makeBooleanProp(false),
  visible: makeBooleanProp(false)
}

export type DatetimePickerBeforeConfirm = (value: number | string | (number | string)[]) => boolean | Promise<boolean>

export type DatetimePickerDisplayFormatTabLabel = (items: Record<string, any>[]) => string

export type DatetimePickerExpose = {
  open: () => void
  close: () => void
}

export type DatetimePickerProps = ExtractPropTypes<typeof datetimePickerProps>

export type DatetimePickerInstance = ComponentPublicInstance<DatetimePickerProps, DatetimePickerExpose>