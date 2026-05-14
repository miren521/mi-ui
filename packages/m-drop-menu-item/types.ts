import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumericProp, makeStringProp, numericProp } from '../common/props'

export type DropMenuItemBeforeToggleOption = {
  status: boolean
}

export type DropMenuItemBeforeToggle = (option: DropMenuItemBeforeToggleOption) => boolean | Promise<boolean>

export const dorpMenuItemProps = {
  ...baseProps,
  modelValue: [String, Number],
  options: makeArrayProp<Record<string, any>>(),
  disabled: makeBooleanProp(false),
  iconName: makeStringProp('check'),
  title: String,
  icon: makeStringProp('caret-down'),
  iconSize: numericProp,
  beforeToggle: Function as PropType<DropMenuItemBeforeToggle>,
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  tipKey: makeStringProp('tip'),
  customPopupClass: makeStringProp(''),
  customPopupStyle: makeStringProp(''),
  popupHeight: makeStringProp(''),
  rootPortal: makeBooleanProp(false)
}

export type DropMenuItemProps = ExtractPropTypes<typeof dorpMenuItemProps>

export type DropMenuItemExpose = {
  getShowPop: () => boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export type DropMenuItemInstance = ComponentPublicInstance<DropMenuItemProps, DropMenuItemExpose>
