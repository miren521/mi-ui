import { computed } from 'vue'
import { formatDate } from '../common/formatDate'
import { isArray } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import type { CalendarDayType, CalendarType } from './types'

const { translate } = useTranslate('calendar-view')

const weeks = computed(() => {
  return [
    translate('weeks.sun'),
    translate('weeks.mon'),
    translate('weeks.tue'),
    translate('weeks.wed'),
    translate('weeks.thu'),
    translate('weeks.fri'),
    translate('weeks.sat')
  ]
})

export function compareDate(date1: number, date2: number | null) {
  const dateValue1 = new Date(date1)
  const dateValue2 = new Date(date2 || '')

  const year1 = dateValue1.getFullYear()
  const year2 = dateValue2.getFullYear()
  const month1 = dateValue1.getMonth()
  const month2 = dateValue2.getMonth()
  const day1 = dateValue1.getDate()
  const day2 = dateValue2.getDate()

  if (year1 === year2) {
    if (month1 === month2) {
      return day1 === day2 ? 0 : day1 > day2 ? 1 : -1
    }
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1
  }

  return year1 > year2 ? 1 : -1
}

export function isRange(type: CalendarType) {
  return type.indexOf('range') > -1
}

export function compareMonth(date1: number, date2: number) {
  const dateValue1 = new Date(date1)
  const dateValue2 = new Date(date2)

  const year1 = dateValue1.getFullYear()
  const year2 = dateValue2.getFullYear()
  const month1 = dateValue1.getMonth()
  const month2 = dateValue2.getMonth()

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1
  }

  return year1 > year2 ? 1 : -1
}

export function compareYear(date1: number, date2: number) {
  const dateValue1 = new Date(date1)
  const dateValue2 = new Date(date2)

  const year1 = dateValue1.getFullYear()
  const year2 = dateValue2.getFullYear()

  return year1 === year2 ? 0 : year1 > year2 ? 1 : -1
}

export function getMonthEndDay(year: number, month: number) {
  return 32 - new Date(year, month - 1, 32).getDate()
}

export function formatMonthTitle(date: number) {
  return formatDate(date, translate('monthTitle'))
}

export function getWeekLabel(index: number) {
  if (index >= 7) {
    index = index % 7
  }
  return weeks.value[index]
}

export function formatYearTitle(date: number) {
  return formatDate(date, translate('yearTitle'))
}

export function getMonths(minDate: number, maxDate: number) {
  const months: number[] = []
  const month = new Date(minDate)
  month.setDate(1)

  while (compareMonth(month.getTime(), maxDate) < 1) {
    months.push(month.getTime())
    month.setMonth(month.getMonth() + 1)
  }

  return months
}

export function getYears(minDate: number, maxDate: number) {
  const years: number[] = []
  const year = new Date(minDate)
  year.setMonth(0)
  year.setDate(1)

  while (compareYear(year.getTime(), maxDate) < 1) {
    years.push(year.getTime())
    year.setFullYear(year.getFullYear() + 1)
  }

  return years
}

export function getWeekRange(date: number, firstDayOfWeek: number) {
  if (firstDayOfWeek >= 7) {
    firstDayOfWeek = firstDayOfWeek % 7
  }

  const dateValue = new Date(date)
  dateValue.setHours(0, 0, 0, 0)
  const year = dateValue.getFullYear()
  const month = dateValue.getMonth()
  const day = dateValue.getDate()
  const week = dateValue.getDay()

  const weekStart = new Date(year, month, day - ((7 + week - firstDayOfWeek) % 7))
  const weekEnd = new Date(year, month, day + 6 - ((7 + week - firstDayOfWeek) % 7))

  return [weekStart.getTime(), weekEnd.getTime()]
}

export function getDayOffset(date1: number, date2: number) {
  return (date1 - date2) / (24 * 60 * 60 * 1000) + 1
}

export function getDayByOffset(date: number, offset: number) {
  const dateValue = new Date(date)
  dateValue.setDate(dateValue.getDate() + offset)
  return dateValue.getTime()
}

export const getPrevDay = (date: number) => getDayByOffset(date, -1)
export const getNextDay = (date: number) => getDayByOffset(date, 1)

export function getMonthOffset(date1: number, date2: number) {
  const dateValue1 = new Date(date1)
  const dateValue2 = new Date(date2)

  const year1 = dateValue1.getFullYear()
  const year2 = dateValue2.getFullYear()
  let month1 = dateValue1.getMonth()
  const month2 = dateValue2.getMonth()

  month1 = (year1 - year2) * 12 + month1

  return month1 - month2 + 1
}

export function getMonthByOffset(date: number, offset: number) {
  const dateValue = new Date(date)
  dateValue.setMonth(dateValue.getMonth() + offset)
  return dateValue.getTime()
}

export function getDefaultTime(defaultTime: string[] | string | null) {
  if (isArray(defaultTime)) {
    const startTime = (defaultTime[0] || '00:00:00').split(':').map((item: string) => {
      return parseInt(item)
    })
    const endTime = (defaultTime[1] || '00:00:00').split(':').map((item) => {
      return parseInt(item)
    })
    return [startTime, endTime]
  } else {
    const time = (defaultTime || '00:00:00').split(':').map((item) => {
      return parseInt(item)
    })
    return [time, time]
  }
}

export function getDateByDefaultTime(date: number, defaultTime: number[]) {
  const dateValue = new Date(date)
  dateValue.setHours(defaultTime[0])
  dateValue.setMinutes(defaultTime[1])
  dateValue.setSeconds(defaultTime[2])
  return dateValue.getTime()
}

export function getWeekNumber(date: number | Date) {
  date = new Date(date)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  const week = new Date(date.getFullYear(), 0, 4)
  return 1 + Math.round(((date.getTime() - week.getTime()) / 86400000 - 3 + ((week.getDay() + 6) % 7)) / 7)
}

export function getItemClass(monthType: CalendarDayType, value: number | null | (number | null)[], type: CalendarType) {
  const classList = ['is-' + monthType]

  if (type.indexOf('range') > -1 && isArray(value)) {
    if (!value || !value[1]) {
      classList.push('is-without-end')
    }
  }

  return classList.join(' ')
}