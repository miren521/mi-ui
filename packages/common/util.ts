/**
 * 是否为对象
 */
export function isObj(val: any): val is Record<string, any> {
  return val !== null && typeof val === 'object'
}

/**
 * 是否为 Promise
 */
export function isPromise(val: any): val is Promise<any> {
  return val && typeof val.then === 'function'
}

/**
 * 检查值是否不为空
 */
export function isDef<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

/**
 * 将对象转换为 style 字符串
 */
export function objToStyle(styles: Record<string, any> | Record<string, any>[]): string {
  if (Array.isArray(styles)) {
    const result = styles
      .filter(function (item) {
        return item != null && item !== ''
      })
      .map(function (item) {
        return objToStyle(item)
      })
      .join(';')
    return result ? (result.endsWith(';') ? result : result + ';') : ''
  }

  if (typeof styles === 'string') {
    return styles ? (styles.endsWith(';') ? styles : styles + ';') : ''
  }

  if (typeof styles === 'object' && styles !== null) {
    const result = Object.keys(styles)
      .filter(function (key) {
        return styles[key] != null && styles[key] !== ''
      })
      .map(function (key) {
        return [kebabCase(key), styles[key]].join(':')
      })
      .join(';')
    return result ? (result.endsWith(';') ? result : result + ';') : ''
  }
  return ''
}

function kebabCase(word: string): string {
  const newWord: string = word
    .replace(/[A-Z]/g, function (match) {
      return '-' + match
    })
    .toLowerCase()
  return newWord
}

import { AbortablePromise } from './AbortablePromise'

/**
 * 暂停指定时间函数
 * @param ms 延迟时间
 */
export const pause = (ms: number = 1000 / 30) => {
  return new AbortablePromise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(true)
    }, ms)
  })
}