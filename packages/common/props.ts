/**
 * 基础 Props
 */
export const baseProps = {
  /**
   * 自定义类名
   */
  customClass: {
    type: String,
    default: ''
  },
  /**
   * 自定义样式
   */
  customStyle: {
    type: String,
    default: ''
  }
}

/**
 * 生成布尔类型的 Props
 */
export function makeBooleanProp(defaultValue = false) {
  return {
    type: Boolean,
    default: defaultValue
  }
}

/**
 * 生成字符串类型的 Props
 */
export function makeStringProp(defaultValue = '') {
  return {
    type: String,
    default: defaultValue
  }
}