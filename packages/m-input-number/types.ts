import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeRequiredProp, makeStringProp, numericProp } from '../common/props'

export type InputNumberBeforeChange = (value: number | string) => boolean | Promise<boolean>

export type InputNumberTheme = 'default' | 'outline' | 'outline-split' | 'primary'

export type OperationType = 'add' | 'sub'

export const inputNumberProps = {
  ...baseProps,
  modelValue: makeRequiredProp(numericProp),
  min: makeNumberProp(1),
  max: makeNumberProp(Number.MAX_SAFE_INTEGER),
  step: makeNumberProp(1),
  stepStrictly: makeBooleanProp(false),
  precision: makeNumericProp(0),
  disabled: makeBooleanProp(false),
  disableInput: makeBooleanProp(false),
  disableMinus: makeBooleanProp(false),
  disablePlus: makeBooleanProp(false),
  withoutInput: makeBooleanProp(false),
  inputWidth: numericProp,
  allowNull: makeBooleanProp(false),
  placeholder: makeStringProp(''),
  adjustPosition: makeBooleanProp(true),
  beforeChange: Function as PropType<InputNumberBeforeChange>,
  longPress: makeBooleanProp(false),
  immediateChange: makeBooleanProp(true),
  updateOnInit: makeBooleanProp(true),
  inputType: makeStringProp<'number' | 'digit'>('digit'),
  theme: makeStringProp<InputNumberTheme>('default'),
  round: Boolean
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>