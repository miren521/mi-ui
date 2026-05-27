import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp } from '../common/props'
import type { BadgeProps } from '../m-badge/types'

export const sidebarItemProps = {
  ...baseProps,
  label: makeRequiredProp(String),
  value: makeRequiredProp([Number, String]),
  badge: [String, Number] as PropType<string | number>,
  badgeProps: Object as PropType<Partial<BadgeProps>>,
  icon: String,
  isDot: {
    type: Boolean,
    default: undefined
  },
  max: Number,
  disabled: makeBooleanProp(false)
}

export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>
