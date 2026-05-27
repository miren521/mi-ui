import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp } from '../common/props'

export const paginationProps = {
  ...baseProps,
  modelValue: makeRequiredProp(Number),
  totalPage: makeNumberProp(1),
  showIcon: makeBooleanProp(false),
  showMessage: makeBooleanProp(false),
  total: makeNumberProp(0),
  pageSize: makeNumberProp(10),
  prevText: String,
  nextText: String,
  hideIfOnePage: makeBooleanProp(false),
  plain: makeBooleanProp(false)
}
