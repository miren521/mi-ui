import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp, type Numeric } from '../common/props'
import type { PickerOption, PickerViewInstance } from '../m-picker-view/types'

export const pickerProps = {
  ...baseProps,
  customViewClass: makeStringProp(''),
  title: String,
  cancelButtonText: String,
  confirmButtonText: String,
  beforeConfirm: Function as PropType<PickerBeforeConfirm>,
  closeOnClickModal: makeBooleanProp(true),
  safeAreaInsetBottom: makeBooleanProp(true),
  itemHeight: makeNumberProp(44),
  visibleItemCount: makeNumberProp(6),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  cascade: makeBooleanProp(false),
  childrenKey: makeStringProp('children'),
  modelValue: makeArrayProp<Numeric>(),
  columns: makeArrayProp<PickerOption | Array<PickerOption>>(),
  zIndex: makeNumberProp(15),
  immediateChange: makeBooleanProp(false),
  rootPortal: makeBooleanProp(false),
  visible: makeBooleanProp(false)
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>

export type PickerDisplayFormat = (item: PickerOption | PickerOption[], vl: { valueKey: string; labelKey: string }) => string

export type PickerBeforeConfirm = (value: Numeric[]) => boolean | Promise<boolean>

export type PickerExpose = {
  open: () => void
  close: () => void
}

export type PickerInstance = ComponentPublicInstance<PickerExpose, PickerProps>
