import { type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import { baseProps, makeNumericProp } from '../common/props'

export type SidebarProvide = {
  props: Partial<SidebarProps>
  setChange: (value: number | string, label: string) => void
}

export const SIDEBAR_KEY: InjectionKey<SidebarProvide> = Symbol('m-sidebar')

export type SidebarBeforeChange = (value: number | string) => boolean | Promise<boolean>

export const sidebarProps = {
  ...baseProps,
  modelValue: makeNumericProp(0),
  beforeChange: Function as PropType<SidebarBeforeChange>
}

export type SidebarProps = ExtractPropTypes<typeof sidebarProps>
