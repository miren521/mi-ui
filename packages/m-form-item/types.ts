import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../common/props'
import type { FormValidateEvent, FormValidateTrigger } from '../m-form/types'

export type FormItemValidateProvide = {
  prop?: string
  shouldTrigger: (event: FormValidateEvent) => boolean
  validateByTrigger: (event: FormValidateEvent) => Promise<void>
}

export const FORM_ITEM_VALIDATE_KEY: InjectionKey<FormItemValidateProvide> = Symbol('m-form-item-validate')

export const formItemProps = {
  ...baseProps,
  prop: String,
  title: String,
  value: numericProp,
  placeholder: String,
  prefixIcon: String,
  iconSize: numericProp,
  iconPrefix: String,
  label: String,
  clickable: makeBooleanProp(false),
  isLink: makeBooleanProp(false),
  size: String as PropType<string>,
  border: makeBooleanProp(void 0),
  titleWidth: numericProp,
  center: makeBooleanProp(void 0),
  required: makeBooleanProp(void 0),
  validateTrigger: [String, Array] as PropType<FormValidateTrigger | FormValidateTrigger[]>,
  layout: String as PropType<'horizontal' | 'vertical'>,
  valueAlign: String as PropType<'left' | 'right' | 'center'>,
  ellipsis: makeBooleanProp(void 0),
  asteriskPosition: String as PropType<'start' | 'end'>,
  hideAsterisk: makeBooleanProp(void 0),
  customPrefixClass: makeStringProp(''),
  customLabelClass: makeStringProp(''),
  customValueClass: makeStringProp(''),
  customTitleClass: makeStringProp(''),
  titleAlign: String as PropType<'top' | 'center' | 'bottom'>,
  titlePadding: String
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>