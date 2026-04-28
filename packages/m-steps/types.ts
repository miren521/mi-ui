import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeNumberProp, makeStringProp, makeBooleanProp } from '../common/props'

export type StepStatus = 'wait' | 'process' | 'finished' | 'error'

export const stepsProps = {
  ...baseProps,
  active: makeNumberProp(0),
  vertical: makeBooleanProp(false),
  dot: makeBooleanProp(false),
  space: makeStringProp(''),
  alignCenter: makeBooleanProp(false)
}

export const stepProps = {
  ...baseProps,
  title: makeStringProp(''),
  description: makeStringProp(''),
  icon: makeStringProp(''),
  status: String as unknown as StepStatus
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export type StepsProvide = {
  props: Partial<StepsProps>
}

export const STEPS_KEY: InjectionKey<StepsProvide & {
  link: (child: any) => void
  unlink: (child: any) => void
  children: any[]
  internalChildren: any[]
}> = Symbol('m-steps')
