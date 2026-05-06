import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { DirectionType, IndicatorPositionType } from '../m-swiper/types'

export type SwiperIndicatorType = 'dots' | 'dots-bar' | 'fraction'

export const swiperNavProps = {
  ...baseProps,
  current: makeNumberProp(0),
  direction: makeStringProp<DirectionType>('horizontal'),
  minShowNum: makeNumberProp(2),
  indicatorPosition: makeStringProp<IndicatorPositionType>('bottom'),
  showControls: makeBooleanProp(false),
  total: makeNumberProp(0),
  type: makeStringProp<SwiperIndicatorType>('dots')
}

export type SwiperNavProps = ExtractPropTypes<typeof swiperNavProps>