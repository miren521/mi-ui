import { camelCase, getPropByPath, isDef, isFunction } from '../common/util'

const defaultMessages: Record<string, Record<string, string>> = {
  steps: {
    finished: '已完成',
    failed: '失败',
    process: '进行中',
    wait: '待处理'
  }
}

export const useTranslate = (name?: string) => {
  const prefix = name ? camelCase(name) + '.' : ''
  const translate = (key: string, ...args: unknown[]) => {
    const currentMessages = defaultMessages
    const message = getPropByPath(currentMessages, prefix + key)
    return isFunction(message) ? message(...args) : isDef(message) ? message : `${prefix}${key}`
  }
  return { translate }
}