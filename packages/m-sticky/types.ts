import { baseProps, makeNumberProp } from '../common/props'

export const stickyProps = {
  ...baseProps,
  zIndex: makeNumberProp(1),
  offsetTop: makeNumberProp(0)
}
