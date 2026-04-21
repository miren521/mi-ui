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