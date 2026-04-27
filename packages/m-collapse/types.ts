import { type ComponentPublicInstance, type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'

// 定义切换所有面板的选项类型
export type CollapseToggleAllOptions =
  | boolean
  | {
      expanded?: boolean
      skipDisabled?: boolean
    }

// 定义父组件提供给子组件的方法和属性
export type CollapseProvide = {
  props: Partial<CollapseProps>
  toggle: (name: string, expanded: boolean) => void
}

// 定义注入键
export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol('m-collapse')

// 定义组件属性
export const collapseProps = {
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
   * 绑定值，手风琴模式下为 string，普通模式下为 array
   * 类型: string | string[]
   */
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: () => []
  },
  /**
   * 是否开启手风琴模式
   * 类型: boolean
   * 默认值: false
   */
  accordion: {
    type: Boolean,
    default: false
  }
}

// 提取属性类型
export type CollapseProps = ExtractPropTypes<typeof collapseProps>

// 定义组件暴露的方法
export type CollapseExpose = {
  /**
   * 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换
   * @param options 面板状态
   */
  toggleAll: (options?: CollapseToggleAllOptions) => void
}

// 定义组件实例类型
export type CollapseInstance = ComponentPublicInstance<CollapseProps, CollapseExpose>