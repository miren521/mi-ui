import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type Action = {
  name: string
  description?: string
  color?: string
  disabled?: boolean
  loading?: boolean
  [key: string]: any
}

export type Panel = {
  icon: string
  title: string
}

export type PanelRow = Panel[]

export type Panels = Array<Panel | PanelRow>

export const actionSheetProps = {
  ...baseProps,
  customTitleClass: makeStringProp(''),
  modelValue: makeBooleanProp(false),
  actions: makeArrayProp<Action>(),
  panels: makeArrayProp<Panel | Panel[]>(),
  title: String,
  cancelText: String,
  closeOnClickAction: makeBooleanProp(true),
  closeOnClickModal: makeBooleanProp(true),
  duration: makeNumberProp(200),
  zIndex: makeNumberProp(10),
  lazyRender: makeBooleanProp(true),
  safeAreaInsetBottom: makeBooleanProp(true),
  rootPortal: makeBooleanProp(false)
}

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
