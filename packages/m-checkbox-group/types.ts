import type { ComponentPublicInstance, ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { CheckboxDirection, CheckboxPlacement, CheckboxType } from '../m-checkbox/types'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type CheckboxGroupToggleAllOptions =
  | boolean
  | {
      checked?: boolean
      skipDisabled?: boolean
    }

export type RequiredModelValue = {
  modelValue: Array<string | number | boolean>
}

export type CheckboxGroupProvide = {
  props: Partial<Omit<CheckboxGroupProps, 'modelValue'>> & RequiredModelValue
  changeSelectState: (value: string | number | boolean) => void
}

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupProvide> = Symbol('m-checkbox-group')

export const checkboxGroupProps = {
  ...baseProps,
  modelValue: {
    type: Array as PropType<Array<string | number | boolean>>,
    default: () => []
  },
  type: makeStringProp<CheckboxType>('square'),
  checkedColor: String,
  uncheckedColor: String,
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  min: makeNumberProp(0),
  max: makeNumberProp(0),
  size: String,
  placement: makeStringProp<CheckboxPlacement>('left'),
  direction: makeStringProp<CheckboxDirection>('vertical')
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export type CheckboxGroupExpose = {
  toggleAll: (options?: CheckboxGroupToggleAllOptions) => void
}

export type CheckboxGroupInstance = ComponentPublicInstance<CheckboxGroupProps, CheckboxGroupExpose>