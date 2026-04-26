import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../common/props'

export type CardType = 'rectangle'

export const cardProps = {
  ...baseProps,
  /**
   * 卡片标题
   * 类型: string
   * 默认值: -
   */
  title: String,
  /**
   * 卡片描述
   * 类型: string
   * 默认值: -
   */
  desc: String,
  /**
   * 卡片头部右侧内容
   * 类型: string
   * 默认值: -
   */
  extra: String,
  /**
   * 卡片类型
   * 类型: string
   * 可选值: 'rectangle'
   * 默认值: -
   */
  type: String as PropType<CardType>,
  /**
   * 标题自定义样式
   * 类型: string
   * 默认值: ''
   */
  customTitleClass: makeStringProp(''),
  /**
   * 内容自定义样式
   * 类型: string
   * 默认值: ''
   */
  customContentClass: makeStringProp(''),
  /**
   * 底部自定义样式
   * 类型: string
   * 默认值: ''
   */
  customFooterClass: makeStringProp(''),
  /**
   * 卡片背景颜色
   * 类型: string
   * 默认值: '#fff'
   */
  bgColor: makeStringProp('#fff')
}

export const cardEmits = {
  /**
   * 点击卡片头部右侧内容时触发
   * 类型: function
   */
  'click:extra': () => true
}

export type CardProps = ExtractPropTypes<typeof cardProps>