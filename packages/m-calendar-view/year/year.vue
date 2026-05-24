<template>
  <view class="m-year">
    <view class="m-year__title" v-if="showTitle">{{ yearTitle(date) }}</view>
    <view class="m-year__months">
      <view
        v-for="(item, index) in months"
        :key="index"
        :class="`m-year__month ${item.disabled ? 'is-disabled' : ''} ${item.isLastRow ? 'is-last-row' : ''} ${
          item.type ? monthTypeClass(item.type) : ''
        } ${item.customClass || ''}`"
        @click="handleDateClick(index)"
      >
        <view class="m-year__month-container">
          <view class="m-year__month-top">{{ item.topInfo }}</view>
          <view class="m-year__month-text">{{ getMonthLabel(item.date) }}</view>
          <view class="m-year__month-bottom">{{ item.bottomInfo }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-year',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { deepClone, isArray, isFunction } from '../../common/util'
import { compareMonth, formatYearTitle, getDateByDefaultTime, getItemClass, getMonthByOffset, getMonthOffset } from '../utils'
import { useTranslate } from '../../composables/useTranslate'
import { yearProps } from './types'
import type { CalendarDayItem, CalendarDayType } from '../types'

const props = defineProps(yearProps)
const emit = defineEmits(['change'])

const { translate } = useTranslate('calendar-view')

const months = ref<CalendarDayItem[]>([])

const monthTypeClass = computed(() => {
  return (monthType: CalendarDayType) => {
    return getItemClass(monthType, props.value, props.type)
  }
})

const yearTitle = computed(() => {
  return (date: number) => {
    return formatYearTitle(date)
  }
})

watch(
  [() => props.type, () => props.date, () => props.value, () => props.minDate, () => props.maxDate, () => props.formatter],
  () => {
    setMonths()
  },
  {
    deep: true,
    immediate: true
  }
)

function getMonthLabel(date: number) {
  const month = new Date(date).getMonth() + 1
  return `${month}月`
}

function setMonths() {
  const monthList: CalendarDayItem[] = []
  const date = new Date(props.date)
  const year = date.getFullYear()
  const value = props.value

  if (props.type.indexOf('range') > -1 && value && !isArray(value)) {
    console.error('[m-calendar-view] value should be array when type is range')
    return
  }

  for (let month = 0; month < 12; month++) {
    const date = new Date(year, month, 1).getTime()
    let type: CalendarDayType = getMonthType(date)
    const monthObj = getFormatterDate(date, month, type)
    monthList.push(monthObj)
  }

  months.value = deepClone(monthList)
}

function getMonthType(date: number) {
  if (props.type === 'monthrange' && isArray(props.value)) {
    const [startDate, endDate] = props.value || []

    if (startDate && compareMonth(date, startDate) === 0) {
      if (endDate && compareMonth(startDate, endDate) === 0) {
        return 'same'
      }
      return 'start'
    } else if (endDate && compareMonth(date, endDate) === 0) {
      return 'end'
    } else if (startDate && endDate && compareMonth(date, startDate) === 1 && compareMonth(date, endDate) === -1) {
      return 'middle'
    } else {
      return ''
    }
  } else {
    if (props.value && compareMonth(date, props.value as number) === 0) {
      return 'selected'
    } else {
      return ''
    }
  }
}

function getFormatterDate(date: number, month: number, type?: CalendarDayType) {
  let monthObj: CalendarDayItem = {
    date: date,
    text: month + 1,
    topInfo: '',
    bottomInfo: '',
    type,
    disabled: compareMonth(date, props.minDate) === -1 || compareMonth(date, props.maxDate) === 1,
    isLastRow: month >= 8
  }

  if (props.formatter) {
    if (isFunction(props.formatter)) {
      monthObj = props.formatter(monthObj)
    } else {
      console.error('[m-calendar-view] the formatter prop should be a function')
    }
  }

  return monthObj
}

function handleDateClick(index: number) {
  const date = months.value[index]

  if (date.disabled) return

  switch (props.type) {
    case 'month':
      handleMonthChange(date)
      break
    case 'monthrange':
      handleMonthRangeChange(date)
      break
    default:
      handleMonthChange(date)
  }
}

function getDate(date: number) {
  return props.defaultTime && props.defaultTime.length > 0 ? getDateByDefaultTime(date, props.defaultTime[0]) : date
}

function handleMonthChange(date: CalendarDayItem) {
  if (date.type !== 'selected') {
    emit('change', {
      value: getDate(date.date)
    })
  }
}

function handleMonthRangeChange(date: CalendarDayItem) {
  let value: (number | null)[] = []
  const [startDate, endDate] = isArray(props.value) ? props.value || [] : []
  const compare = compareMonth(date.date, startDate!)

  if (!props.allowSameDay && !endDate && compare === 0) return

  if (startDate && !endDate && compare > -1) {
    if (props.maxRange && getMonthOffset(date.date, startDate) > props.maxRange) {
      const maxEndDate = getMonthByOffset(startDate, props.maxRange - 1)
      value = [startDate, getDate(maxEndDate)]
    } else {
      value = [startDate, getDate(date.date)]
    }
  } else {
    value = [getDate(date.date), null]
  }
  emit('change', {
    value
  })
}
</script>

<style lang="scss">
@use './index.scss';
</style>
