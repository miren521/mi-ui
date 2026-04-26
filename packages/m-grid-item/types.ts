import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp, numericProp, makeBooleanProp } from '../common/props'
import type { BadgeProps } from '../m-badge/types'

export type LinkType = 'navigateTo' | 'switchTab' | 'reLaunch' | 'redirectTo'

export const gridItemProps = {
  ...baseProps,
  customText: makeStringProp(''),
  customIcon: makeStringProp(''),
  text: String,
  url: String,
  linkType: makeStringProp<LinkType>('navigateTo'),
  icon: String,
  iconColor: String,
  iconPrefix: String,
  value: numericProp,
  isDot: Boolean,
  max: Number,
  badgeProps: Object as PropType<Partial<BadgeProps>>,
  ellipsis: makeBooleanProp(false)
}

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>