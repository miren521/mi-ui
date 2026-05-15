import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

/**
 * 进度条端点的形状
 * 可选值: 'butt' | 'round'
 */
export type StrokeLinecapType = 'butt' | 'round'

export const circleProps = {
  ...baseProps,
  /**
   * 当前进度
   * 类型: number
   * 默认值: 0
   */
  modelValue: makeNumberProp(0),
  /**
   * 圆环直径，默认单位为 px
   * 类型: number
   * 默认值: 120
   */
  size: makeNumberProp(120),
  /**
   * 进度条颜色，传入对象格式可以定义渐变色
   * 类型: string | Record<string, string>
   * 默认值: '#1C64FD'
   */
  color: {
    type: [String, Object] as PropType<string | Record<string, string>>,
    default: '#1C64FD'
  },
  /**
   * 轨道颜色
   * 类型: string
   * 默认值: '#F2F3F5'
   */
  layerColor: makeStringProp('#F2F3F5'),
  /**
   * 填充颜色
   * 类型: string
   */
  fill: String,
  /**
   * 动画速度（单位为 rate/s）
   * 类型: number
   * 默认值: 50
   */
  speed: makeNumberProp(50),
  /**
   * 文字
   * 类型: string
   */
  text: String,
  /**
   * 进度条宽度 单位px
   * 类型: number
   * 默认值: 18
   */
  strokeWidth: makeNumberProp(18),
  /**
   * 进度条端点的形状
   * 可选值: 'butt' | 'round' | 'square'
   * 默认值: 'round'
   */
  strokeLinecap: makeStringProp<StrokeLinecapType>('round'),
  /**
   * 是否顺时针增加
   * 类型: boolean
   * 默认值: true
   */
  clockwise: makeBooleanProp(true)
}

export type CircleProps = ExtractPropTypes<typeof circleProps>