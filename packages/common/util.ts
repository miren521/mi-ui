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
 * 暂停函数，用于等待下一帧
 */
export function pause(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}