import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp, numericProp } from '../common/props'
import type { ImageMode } from '../m-img/types'

export type DirectionType = 'horizontal' | 'vertical'

export type EasingType = 'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'

export type IndicatorPositionType = 'left' | 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right' | 'right'

export type AdjustHeightType = 'first' | 'current' | 'highest' | 'none'

export type SwiperItemType = 'image' | 'video'

export interface SwiperItem {
  [key: string]: any
  value?: string
  poster?: string
  type?: SwiperItemType
}

export interface SwiperNavProps {
  current?: number
  total?: number
  direction?: DirectionType
  indicatorPosition?: IndicatorPositionType
  type?: 'dots' | 'dots-bar' | 'fraction'
  minShowNum?: number
  showControls?: boolean
}

export const swiperProps = {
  ...baseProps,
  autoplay: makeBooleanProp(true),
  current: makeNumberProp(0),
  direction: makeStringProp<DirectionType>('horizontal'),
  displayMultipleItems: makeNumberProp(1),
  duration: makeNumberProp(300),
  easingFunction: makeStringProp<EasingType>('default'),
  height: makeNumericProp('192'),
  interval: makeNumberProp(5000),
  list: {
    type: Array as PropType<SwiperItem[] | string[]>,
    default: () => []
  },
  loop: makeBooleanProp(true),
  videoLoop: makeBooleanProp(true),
  muted: makeBooleanProp(true),
  nextMargin: makeNumericProp('0'),
  indicatorPosition: makeStringProp<IndicatorPositionType>('bottom'),
  previousMargin: makeNumericProp('0'),
  radius: numericProp,
  snapToEdge: makeBooleanProp(false),
  indicator: {
    type: [Boolean, Object] as PropType<boolean | Partial<SwiperNavProps>>,
    default: true
  },
  imageMode: makeStringProp<ImageMode>('aspectFill'),
  showMenuByLongpress: makeBooleanProp(false),
  valueKey: makeStringProp('value'),
  textKey: makeStringProp('text'),
  autoplayVideo: makeBooleanProp(true),
  stopPreviousVideo: makeBooleanProp(true),
  stopAutoplayWhenVideoPlay: makeBooleanProp(false),
  adjustHeight: makeStringProp<AdjustHeightType>('highest'),
  adjustVerticalHeight: makeBooleanProp(false),
  customIndicatorClass: makeStringProp(''),
  customImageClass: makeStringProp(''),
  customPrevImageClass: makeStringProp(''),
  customNextImageClass: makeStringProp(''),
  customItemClass: makeStringProp(''),
  customPrevClass: makeStringProp(''),
  customNextClass: makeStringProp(''),
  customTextClass: makeStringProp(''),
  customTextStyle: makeStringProp('')
}

export type SwiperProps = ExtractPropTypes<typeof swiperProps>