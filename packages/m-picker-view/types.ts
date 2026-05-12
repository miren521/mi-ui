import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp, type Numeric } from '../common/props'

export type PickerOption = {
  value?: Numeric
  label?: Numeric
  disabled?: boolean
  children?: PickerOption[]
  [key: string]: any
}

export type ColumnItem = PickerOption

export const pickerViewProps = {
  ...baseProps,
  itemHeight: makeNumberProp(44),
  visibleItemCount: makeNumberProp(6),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  immediateChange: makeBooleanProp(false),
  cascade: makeBooleanProp(false),
  childrenKey: makeStringProp('children'),
  modelValue: makeArrayProp<Numeric>(),
  columns: makeArrayProp<PickerOption | Array<PickerOption>>()
}

export type PickerViewExpose = {
  getSelectedOptions: () => PickerOption[]
  getSelectedValues: () => Numeric[]
  getColumnsData: () => PickerOption[][]
  getColumnData: (columnIndex: number) => PickerOption[]
  getColumnIndex: (columnIndex: number) => number
  getSelectedLabels: () => string[]
  getSelectedIndex: () => number[]
  resetColumns: (columns: Array<string | number | PickerOption | Array<string | number | PickerOption>>) => void
}

export type PickerViewProps = ExtractPropTypes<typeof pickerViewProps>

export type PickerViewInstance = ComponentPublicInstance<PickerViewProps, PickerViewExpose>
