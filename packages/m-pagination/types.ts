import { type PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp } from '../common/props'
import { type ButtonVariant } from '../m-button/types'

export const paginationProps = {
  ...baseProps,
  modelValue: makeRequiredProp(Number),
  totalPage: makeNumberProp(1),
  showIcon: makeBooleanProp(false),
  buttonVariant: {
    type: String as PropType<ButtonVariant>,
    default: 'text'
  },
  showMessage: makeBooleanProp(false),
  total: makeNumberProp(0),
  pageSize: makeNumberProp(10),
  prevText: String,
  nextText: String,
  hideIfOnePage: makeBooleanProp(false)
}
