import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, numericProp } from '../common/props'
import type { BadgeProps } from '../m-badge/types'

export interface TabbarItem {
  name: string | number
}

export const tabbarItemProps = {
  ...baseProps,
  title: String,
  name: numericProp,
  icon: String,
  value: [Number, String] as PropType<number | string>,
  isDot: Boolean,
  max: Number,
  badgeProps: Object as PropType<BadgeProps>,
  activeIcon: Boolean
}

export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
