import { inject, provide, ref } from 'vue'
import type { Toast, ToastOptions } from './types'
import { deepMerge } from '../common/util'

const toastDefaultOptionKey = '__TOAST_OPTION__'

export const defaultOptions: ToastOptions = {
  duration: 2000,
  show: false
}

const None = Symbol('None')

const toastTimerMap = new Map<string, ReturnType<typeof setTimeout>>()

export function useToast(selector: string = ''): Toast {
  const toastOptionKey = getToastOptionKey(selector)
  const toastOption = inject(toastOptionKey, ref<ToastOptions | typeof None>(None))
  if (toastOption.value === None) {
    toastOption.value = defaultOptions
    provide(toastOptionKey, toastOption)
  }

  const createMethod = (toastOptions: ToastOptions) => {
    return (options: ToastOptions | string) => {
      return show(deepMerge(toastOptions, typeof options === 'string' ? { msg: options } : options) as ToastOptions)
    }
  }

  const show = (option: ToastOptions | string) => {
    const options = deepMerge(defaultOptions, typeof option === 'string' ? { msg: option } : option) as ToastOptions
    toastOption.value = deepMerge(options, {
      show: true
    }) as ToastOptions
    const prevTimer = toastTimerMap.get(toastOptionKey)
    if (prevTimer) {
      clearTimeout(prevTimer)
      toastTimerMap.delete(toastOptionKey)
    }
    if (options.duration && options.duration > 0) {
      const nextTimer = setTimeout(() => {
        toastTimerMap.delete(toastOptionKey)
        close()
      }, options.duration)
      toastTimerMap.set(toastOptionKey, nextTimer)
    }
  }

  const loading = createMethod({
    iconName: 'loading',
    duration: 0,
    cover: true
  })
  const success = createMethod({
    iconName: 'success',
    duration: 1500
  })
  const error = createMethod({ iconName: 'error' })
  const warning = createMethod({ iconName: 'warning' })
  const info = createMethod({ iconName: 'info' })

  const close = () => {
    const timer = toastTimerMap.get(toastOptionKey)
    if (timer) {
      clearTimeout(timer)
      toastTimerMap.delete(toastOptionKey)
    }
    toastOption.value = { show: false }
  }
  return {
    show,
    loading,
    success,
    error,
    warning,
    info,
    close
  }
}

export const getToastOptionKey = (selector: string) => {
  return selector ? `${toastDefaultOptionKey}${selector}` : toastDefaultOptionKey
}

export const toastIcon = {
  success: 'check-circle',
  warning: 'exclamation-circle',
  info: 'info-circle',
  error: 'close-circle'
}