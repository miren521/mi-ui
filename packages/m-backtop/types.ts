import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export type BacktopShape = 'circle' | 'square'
export type BacktopEffect = 'border' | 'no-border' | 'floating'

export const backtopProps = {
  ...baseProps,
  /**
   * 页面滚动距离
   * 类型: number
   */
  scrollTop: makeRequiredProp(Number),
  /**
   * 按钮文本
   */
  text: String,
  /**
   * 滚动距离超过该值时显示回到顶部按钮，单位 px
   * 默认值: 300
   */
  top: makeNumberProp(300),
  /**
   * 返回顶部的滚动时长，单位 ms
   * 默认值: 100
   */
  duration: makeNumberProp(100),
  /**
   * 层级
   * 默认值: 10
   */
  zIndex: makeNumberProp(10),
  /**
   * 自定义图标样式
   * 默认值: ''
   */
  iconStyle: makeStringProp(''),
  /**
   * 图标和文字颜色
   * 默认值: '#666666'
   */
  color: makeStringProp('#666666'),
  /**
   * 按钮形状
   * 类型: BacktopShape
   * 可选值: 'circle' | 'square'
   * 默认值: 'circle'
   */
  shape: makeStringProp<BacktopShape>('circle'),
  /**
   * 距离屏幕底部的距离，单位 px
   * 默认值: 100
   */
  bottom: makeNumberProp(100),
  /**
   * 距离屏幕右侧的距离，单位 px
   * 默认值: 20
   */
  right: makeNumberProp(20),
  /**
   * 外观效果
   * 类型: BacktopEffect
   * 可选值: 'border' | 'no-border' | 'floating'
   * 默认值: 'floating'
   */
  effect: makeStringProp<BacktopEffect>('floating')
}

export type BacktopProps = ExtractPropTypes<typeof backtopProps>