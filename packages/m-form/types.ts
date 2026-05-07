import { type ComponentPublicInstance, type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp, numericProp } from '../common/props'

export type FormSchemaIssue = {
  path: Array<string | number>
  message: string
}

export type FormSchema = {
  validate: (model: Record<string, any>) => FormSchemaIssue[] | Promise<FormSchemaIssue[]>
  isRequired?: (path: string) => boolean | undefined
}

export const FORM_VALIDATE_EVENTS = ['change', 'blur', 'submit'] as const

export type FormValidateEvent = (typeof FORM_VALIDATE_EVENTS)[number]

export type FormValidateTrigger = FormValidateEvent

export type ErrorMessage = {
  prop: string
  message: string
}

export const formProps = {
  ...baseProps,
  model: makeRequiredProp(Object as PropType<Record<string, any>>),
  schema: Object as PropType<FormSchema>,
  validateTrigger: {
    type: [String, Array] as PropType<FormValidateTrigger | FormValidateTrigger[]>,
    default: 'submit'
  },
  resetOnChange: makeBooleanProp(true),
  errorType: {
    type: String as PropType<'toast' | 'message' | 'none'>,
    default: 'message'
  },
  border: makeBooleanProp(false),
  center: makeBooleanProp(false),
  size: String as PropType<string>,
  titleWidth: numericProp,
  layout: String as PropType<'horizontal' | 'vertical'>,
  valueAlign: String as PropType<'left' | 'right' | 'center'>,
  asteriskPosition: String as PropType<'start' | 'end'>,
  hideAsterisk: makeBooleanProp(false),
  ellipsis: makeBooleanProp(false)
}

export type FormProps = ExtractPropTypes<typeof formProps>

export type FormExpose = {
  validate: (prop?: string | Array<string>) => Promise<{
    valid: boolean
    errors: ErrorMessage[]
  }>
  reset: () => void
}

export type FormProvide = {
  props: Partial<FormProps>
  errorMessages?: Record<string, string>
  validate?: (prop?: string | string[]) => Promise<{ valid: boolean; errors: ErrorMessage[] }>
}

export const FORM_KEY: InjectionKey<FormProvide> = Symbol('m-form')

export type FormInstance = ComponentPublicInstance<FormProps, FormExpose>