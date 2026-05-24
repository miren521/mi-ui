<template>
  <view class="m-month-panel">
    <view class="m-month-panel__controls" v-if="switchMode !== 'none'">
      <view class="m-month-panel__control">
        <m-icon
          v-if="switchMode === 'year-month'"
          name="double-left"
          :custom-class="`m-month-panel__control-icon ${isPrevYearDisabled ? 'is-disabled' : ''}`"
          @click="!isPrevYearDisabled && changeYear(-1)"
        />
        <m-icon
          name="left"
          :custom-class="`m-month-panel__control-icon ${isPrevMonthDisabled ? 'is-disabled' : ''}`"
          @click="!isPrevMonthDisabled && changeMonth(-1)"
        />
      </view>
      <text class="m-month-panel__controls-title">{{ controlsTitle }}</text>
      <view class="m-month-panel__control">
        <m-icon
          name="right"
          :custom-class="`m-month-panel__control-icon ${isNextMonthDisabled ? 'is-disabled' : ''}`"
          @click="!isNextMonthDisabled && changeMonth(1)"
        />
        <m-icon
          v-if="switchMode === 'year-month'"
          name="double-right"
          :custom-class="`m-month-panel__control-icon ${isNextYearDisabled ? 'is-disabled' : ''}`"
          @click="!isNextYearDisabled && changeYear(1)"
        />
      </view>
    </view>

    <view class="m-month-panel__weeks">
      <view v-for="item in 7" :key="item" class="m-month-panel__week">{{ weekLabel(item + firstDayOfWeek) }}</view>
    </view>

    <view v-if="showPanelTitle && switchMode === 'none'" class="m-month-panel__title">
      {{ title }}
    </view>

    <scroll-view
      :class="`m-month-panel__container ${!!timeType ? 'm-month-panel__container--time' : ''}`"
      :style="containerStyle"
      :scroll-y="true"
      :scroll-top="scrollTop"
      @scroll="switchMode === 'none' ? monthScroll($event) : undefined"
    >
      <view v-for="(item, index) in displayMonths" :key="index" :id="`month${index}`">
        <month
          :type="type"
          :date="item.date"
          :value="value"
          :min-date="minDate"
          :max-date="maxDate"
          :first-day-of-week="firstDayOfWeek"
          :formatter="formatter"
          :max-range="maxRange"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :showTitle="switchMode === 'none' && index !== 0"
          @change="handleDateChange"
        />
      </view>
    </scroll-view>

    <view v-if="timeType" class="m-month-panel__time">
      <view v-if="type === 'datetimerange'" class="m-month-panel__time-label">
        <view class="m-month-panel__time-text">{{ timeType === 'start' ? translate('startTime') : translate('endTime') }}</view>
      </view>
      <view class="m-month-panel__time-picker">
        <m-datetime-picker-view
          v-model="timeValue"
          type="time"
          :item-height="itemHeight"
          :visible-item-count="visibleItemCount"
          :immediate-change="immediateChange"
          :filter="timeFilter"
          :formatter="internalTimeFormatter"
          :use-second="!hideSecond"
          @change="handleTimeChange"
          @pickstart="handlePickStart"
          @pickend="handlePickEnd"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-month-panel',
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
import mIcon from '../../m-icon/m-icon.vue'
import mDatetimePickerView from '../../m-datetime-picker-view/m-datetime-picker-view.vue'
import { computed, ref, watch, onMounted, type CSSProperties } from 'vue'
import { debounce, isArray, isEqual, isNumber, pause, padZero, addUnit, objToStyle } from '../../common/util'
import { compareMonth, formatMonthTitle, getMonthEndDay, getMonths, getWeekLabel } from '../utils'
import Month from '../month/month.vue'
import { monthPanelProps, type MonthInfo, type MonthPanelTimeType, type MonthPanelExpose } from './types'
import { useTranslate } from '../../composables/useTranslate'
import { type CalendarTimeFormatter } from '../types'

const props = defineProps(monthPanelProps)
const emit = defineEmits(['change', 'pickstart', 'pickend'])

const { translate } = useTranslate('calendar-view')

const scrollTop = ref<number>(0)
const scrollIndex = ref<number>(0)
const timeValue = ref<string>('')
const currentDisplayMonth = ref<{ year: number; month: number }>({
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})
const timeType = ref<MonthPanelTimeType>('')
const innerValue = ref<string | number | (number | null)[]>('')

const handleChange = debounce((value) => {
  emit('change', {
    value
  })
}, 50)

const currentMonthDate = computed(() => {
  return new Date(currentDisplayMonth.value.year, currentDisplayMonth.value.month, 1).getTime()
})

const controlsTitle = computed(() => {
  return formatMonthTitle(currentMonthDate.value)
})

const title = computed(() => {
  return formatMonthTitle(months.value[scrollIndex.value].date)
})

function getMonthStart(year: number, month: number): number {
  return new Date(year, month, 1).getTime()
}

const isPrevMonthDisabled = computed(() => {
  const { year, month } = currentDisplayMonth.value
  const prevMonthStart = getMonthStart(year, month - 1)
  const minMonthStart = getMonthStart(new Date(props.minDate).getFullYear(), new Date(props.minDate).getMonth())
  return prevMonthStart < minMonthStart
})

const isNextMonthDisabled = computed(() => {
  const { year, month } = currentDisplayMonth.value
  const nextMonthStart = getMonthStart(year, month + 1)
  const maxMonthStart = getMonthStart(new Date(props.maxDate).getFullYear(), new Date(props.maxDate).getMonth())
  return nextMonthStart > maxMonthStart
})

const isPrevYearDisabled = computed(() => {
  const { year, month } = currentDisplayMonth.value
  const prevYear = year - 1
  const minYear = new Date(props.minDate).getFullYear()
  const minMonth = new Date(props.minDate).getMonth()

  if (prevYear < minYear) {
    return true
  }

  if (prevYear === minYear && month < minMonth) {
    return true
  }

  return false
})

const isNextYearDisabled = computed(() => {
  const { year, month } = currentDisplayMonth.value
  const nextYear = year + 1
  const maxYear = new Date(props.maxDate).getFullYear()
  const maxMonth = new Date(props.maxDate).getMonth()

  if (nextYear > maxYear) {
    return true
  }

  if (nextYear === maxYear && month > maxMonth) {
    return true
  }

  return false
})

function changeMonth(delta: number) {
  const { year, month } = currentDisplayMonth.value
  const newDate = new Date(year, month + delta, 1)
  currentDisplayMonth.value = {
    year: newDate.getFullYear(),
    month: newDate.getMonth()
  }
}

function changeYear(delta: number) {
  const { year, month } = currentDisplayMonth.value
  const newDate = new Date(year + delta, month, 1)
  currentDisplayMonth.value = {
    year: newDate.getFullYear(),
    month: newDate.getMonth()
  }
}

const weekLabel = computed(() => {
  return (index: number) => {
    return getWeekLabel(index - 1)
  }
})

const containerStyle = computed(() => {
  const style: CSSProperties = {
    height: timeType.value ? addUnit(props.panelHeight - 120) : addUnit(props.panelHeight)
  }
  return objToStyle(style)
})

const months = computed<MonthInfo[]>(() => {
  return getMonths(props.minDate, props.maxDate).map((month, index) => {
    const offset = (7 + new Date(month).getDay() - props.firstDayOfWeek) % 7
    const totalDay = getMonthEndDay(new Date(month).getFullYear(), new Date(month).getMonth() + 1)
    const rows = Math.ceil((offset + totalDay) / 7)
    return {
      height: rows * 60 + (rows - 1) * 4 + (index === 0 ? 0 : 40),
      date: month
    }
  })
})

const displayMonths = computed<MonthInfo[]>(() => {
  if (props.switchMode === 'none') {
    return months.value
  }
  const offset = (7 + new Date(currentMonthDate.value).getDay() - props.firstDayOfWeek) % 7
  const totalDay = getMonthEndDay(currentDisplayMonth.value.year, currentDisplayMonth.value.month + 1)
  const rows = Math.ceil((offset + totalDay) / 7)
  return [
    {
      height: rows * 60 + (rows - 1) * 4,
      date: currentMonthDate.value
    }
  ]
})

watch(
  () => props.type,
  (val) => {
    if (val === 'datetime') {
      setTime(props.value || Date.now(), 'start')
    } else if (val === 'datetimerange') {
      if (isArray(props.value) && props.value && props.value.length > 0 && props.value[0]) {
        setTime(props.value, 'start')
      } else {
        setTime([Date.now(), null], 'start')
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.value,
  (val) => {
    if (isEqual(val, innerValue.value)) return

    if ((props.type === 'datetime' && val) || (props.type === 'datetimerange' && val && isArray(val) && val.length > 0 && val[0])) {
      setTime(val, 'start')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  if (props.switchMode !== 'none') {
    initCurrentDisplayMonth()
  }
  scrollIntoView()
})

function initCurrentDisplayMonth() {
  let activeDate: number | null = null

  if (isArray(props.value)) {
    const sortedValue = [...props.value].sort((a, b) => (a || 0) - (b || 0))
    activeDate = sortedValue[0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  if (activeDate < props.minDate) {
    activeDate = props.minDate
  } else if (activeDate > props.maxDate) {
    activeDate = props.maxDate
  }

  const date = new Date(activeDate)
  currentDisplayMonth.value = {
    year: date.getFullYear(),
    month: date.getMonth()
  }
}

async function scrollIntoView() {
  await pause()
  let activeDate: number | null = 0
  if (isArray(props.value)) {
    const sortedValue = [...props.value].sort((a, b) => (a || 0) - (b || 0))
    activeDate = sortedValue[0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  let top: number = 0
  let activeMonthIndex = -1
  for (let index = 0; index < months.value.length; index++) {
    if (compareMonth(months.value[index].date, activeDate) === 0) {
      activeMonthIndex = index
      const date = new Date(activeDate)
      const day = date.getDate()
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      const offset = (7 + firstDay.getDay() - props.firstDayOfWeek) % 7
      const row = Math.floor((offset + day - 1) / 7)
      top += row * 60 + row * 4
      break
    }
    top += months.value[index] ? Number(months.value[index].height) : 0
  }
  scrollTop.value = 0
  if (top > 0) {
    await pause()
    scrollTop.value = top + (activeMonthIndex > 0 ? 40 : 0)
  }
}

const internalTimeFormatter: CalendarTimeFormatter = (type, value) => {
  if (props.timeFormatter) {
    return props.timeFormatter(type, value)
  }
  const unit = type === 'hour' ? '时' : type === 'minute' ? '分' : type === 'second' ? '秒' : ''
  return `${value}${unit}`
}

function getTimeValue(date: number | (number | null)[], type: MonthPanelTimeType) {
  let dateValue: Date = new Date()
  if (props.type === 'datetime') {
    dateValue = new Date(date as number)
  } else if (isArray(date)) {
    if (type === 'start') {
      dateValue = new Date(date[0] || '')
    } else {
      dateValue = new Date(date[1] || '')
    }
  }

  const hour = padZero(dateValue.getHours())
  const minute = padZero(dateValue.getMinutes())
  const second = padZero(dateValue.getSeconds())
  return props.hideSecond ? `${hour}:${minute}` : `${hour}:${minute}:${second}`
}

function setTime(value: number | (number | null)[], type?: MonthPanelTimeType) {
  if (isArray(value) && value[0] && value[1] && type === 'start' && timeType.value === 'start') {
    type = 'end'
  }
  timeType.value = type || ''
  timeValue.value = getTimeValue(value, type || '')
}

function handleDateChange({ value, type }: { value: number | (number | null)[]; type?: MonthPanelTimeType }) {
  if (!isEqual(value, props.value)) {
    innerValue.value = value
    handleChange(value)
  }
  if (props.type.indexOf('time') > -1) {
    setTime(value, type)
  }
}

function handleTimeChange({ value }: { value: string }) {
  if (!props.value) {
    return
  }
  const [hour, minute, second] = value.split(':').map(Number)

  if (props.type === 'datetime' && isNumber(props.value)) {
    const date = new Date(props.value)
    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(props.hideSecond ? 0 : second || 0)
    const dateTime = date.getTime()
    handleChange(dateTime)
  } else if (isArray(props.value) && props.type === 'datetimerange') {
    const [start, end] = props.value!
    const dataValue = timeType.value === 'start' ? start : end
    const date = new Date(dataValue || '')
    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(props.hideSecond ? 0 : second || 0)
    const dateTime = date.getTime()

    if (dateTime === dataValue) return

    const finalValue = [start, end]
    if (timeType.value === 'start') {
      finalValue[0] = dateTime
    } else {
      finalValue[1] = dateTime
    }
    innerValue.value = finalValue
    handleChange(finalValue)
  }
}

function handlePickStart() {
  emit('pickstart')
}

function handlePickEnd() {
  emit('pickend')
}

const monthScroll = (event: { detail: { scrollTop: number } }) => {
  if (months.value.length <= 1) {
    return
  }
  const scrollTop = Math.max(0, event.detail.scrollTop)
  doSetSubtitle(scrollTop)
}

function doSetSubtitle(scrollTop: number) {
  let height: number = 0
  for (let index = 0; index < months.value.length; index++) {
    height = height + months.value[index].height
    if (scrollTop < height) {
      scrollIndex.value = index
      return
    }
  }
}

defineExpose<MonthPanelExpose>({
  scrollIntoView
})
</script>

<style lang="scss">
@use './index.scss';
</style>