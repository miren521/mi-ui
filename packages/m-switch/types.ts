import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../common/props'
import type { LoadingProps } from '../m-loading/types'

export type SwitchShape = 'round' | 'square'

export type SwitchBeforeChange = (value: number | string | boolean) => boolean | Promise<boolean>

export const switchProps = {
  ...baseProps,
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  disabled: makeBooleanProp(false),
  inactiveActionIcon: String,
  activeActionIcon: String,
  activeIcon: String,
  inactiveIcon: String,
  classPrefix: makeStringProp('m-icon'),
  inactiveActionCssIcon: {
    type: [Boolean, String],
    default: false
  },
  activeActionCssIcon: {
    type: [Boolean, String],
    default: false
  },
  activeCssIcon: {
    type: [Boolean, String],
    default: false
  },
  inactiveCssIcon: {
    type: [Boolean, String],
    default: false
  },
  activeText: makeStringProp(''),
  inactiveText: makeStringProp(''),
  activeValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: true
  },
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  activeColor: String,
  inactiveColor: String,
  size: numericProp,
  shape: makeStringProp<SwitchShape>('round'),
  loading: makeBooleanProp(false),
  loadingProps: Object as PropType<Partial<LoadingProps>>,
  beforeChange: Function as PropType<SwitchBeforeChange>
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>