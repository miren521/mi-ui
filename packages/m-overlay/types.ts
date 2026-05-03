import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export const overlayProps = {
  ...baseProps,
  show: makeBooleanProp(false),
  zIndex: makeNumberProp(1000),
  duration: makeNumberProp(300),
  lockScroll: makeBooleanProp(true),
  customClass: makeStringProp(''),
  customStyle: makeStringProp(''),
  disableTouchMove: makeBooleanProp(true)
}