import { camelCase, getPropByPath, isDef, isFunction } from '../common/util'

const defaultMessages: Record<string, Record<string, string | string[] | ((...args: unknown[]) => string)>> = {
  steps: {
    finished: '已完成',
    failed: '失败',
    process: '进行中',
    wait: '待处理'
  },
  loadmore: {
    finished: '没有更多了',
    error: '加载失败',
    loading: '加载中...',
    retry: '点击重试'
  },
  search: {
    search: '搜索',
    cancel: '取消'
  },
  cascader: {
    title: '请选择',
    select: '请选择',
    confirm: '确定'
  },
  tabs: {
    all: '全部'
  },
  calendar: {
    title: '选择日期',
    confirm: '确定',
    cancel: '取消',
    day: '日',
    week: '周',
    month: '月',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
    weekFormat: '%s年第%s周',
    monthFormat: 'YYYY年MM月',
    startTime: '开始时间',
    endTime: '结束时间',
    startWeek: '开始周',
    endWeek: '结束周',
    startMonth: '开始月',
    endMonth: '结束月'
  },
  calendarView: {
    year: '年',
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    month: (index: number) => {
      const months = '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_')
      return months[index - 1] || ''
    },
    weeks: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六'
    },
    monthTitle: 'YYYY年MM月',
    yearTitle: 'YYYY年',
    startTime: '开始时间',
    endTime: '结束时间',
    rangePrompt: '选择天数不能超过%s天',
    hours: '时',
    minutes: '分',
    seconds: '秒',
    hour: '时',
    minute: '分',
    second: '秒'
  }
}

export const useTranslate = (name?: string) => {
  const prefix = name ? camelCase(name) + '.' : ''
  const translate = (key: string, ...args: unknown[]) => {
    const currentMessages = defaultMessages
    const message = getPropByPath(currentMessages, prefix + key)
    if (isFunction(message)) {
      return message(...args)
    }
    if (isDef(message)) {
      if (typeof message === 'string' && args.length > 0) {
        return message.replace(/%s/g, () => String(args.shift()))
      }
      return message
    }
    return `${prefix}${key}`
  }
  return { translate }
}