import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

// 定义展开前的回调函数类型
export type CollapseItemBeforeExpand = (name: string) => boolean | Promise<boolean>

// 定义组件属性
export const collapseItemProps = {
  /**
   * 自定义样式类名
   * 类型: string
   */
  customClass: {
    type: String,
    default: ''
  },
  /**
   * 自定义样式
   * 类型: string
   */
  customStyle: {
    type: String,
    default: ''
  },
  /**
   * 自定义折叠栏内容容器样式类名
   * 类型: string
   */
  customBodyClass: {
    type: String,
    default: ''
  },
  /**
   * 自定义折叠栏内容容器样式
   * 类型: string
   */
  customBodyStyle: {
    type: String,
    default: ''
  },
  /**
   * 标题，可通过 slot 传递自定义内容
   * 类型: string
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * 是否禁用
   * 类型: boolean
   * 默认值: false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 唯一标识符
   * 类型: string
   * 必填
   */
  name: {
    type: String,
    required: true
  },
  /**
   * 展开前的回调函数，返回 false 可以阻止展开，支持返回 Promise
   * 类型: function
   */
  beforeExpand: Function as PropType<CollapseItemBeforeExpand>,
  /**
   * 是否显示边框
   * 类型: boolean
   * 默认值: true
   */
  border: {
    type: Boolean,
    default: true
  }
}

// 提取属性类型
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

// 定义组件暴露的方法
export type CollapseItemExpose = {
  /**
   * 获取展开状态
   * @returns boolean
   */
  getExpanded: () => boolean
  /**
   * 更新展开状态
   */
  updateExpand: () => Promise<void>
}

// 定义组件实例类型
export type CollapseItemInstance = ComponentPublicInstance<CollapseItemProps, CollapseItemExpose>