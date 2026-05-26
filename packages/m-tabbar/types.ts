import { type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'
import type { TabbarItem } from '../m-tabbar-item/types'

type TabbarShape = 'default' | 'round'

export type TabbarProvide = {
  props: {
    modelValue?: number | string
    fixed?: boolean
    safeAreaInsetBottom?: boolean
    bordered?: boolean
    shape?: TabbarShape
    activeColor?: string
    inactiveColor?: string
    placeholder?: boolean
    zIndex?: number
  }
  setChange: (child: TabbarItem) => void
}

export const TABBAR_KEY: InjectionKey<TabbarProvide> = Symbol('m-tabbar')

export const tabbarProps = {
  ...baseProps,
  modelValue: makeNumericProp(0),
  fixed: makeBooleanProp(false),
  bordered: makeBooleanProp(false),
  safeAreaInsetBottom: makeBooleanProp(false),
  shape: makeStringProp<TabbarShape>('default'),
  activeColor: String,
  inactiveColor: String,
  placeholder: makeBooleanProp(false),
  zIndex: makeNumberProp(10),
  beforeChange: Function as PropType<TabbarBeforeChange>
}

export type TabbarBeforeChange = (value: number | string) => boolean | Promise<boolean>

export type TabbarProps = ExtractPropTypes<typeof tabbarProps>
