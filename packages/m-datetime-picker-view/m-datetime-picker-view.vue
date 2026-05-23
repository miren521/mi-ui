<template>
  <m-picker-view
    ref="datePickerview"
    :custom-class="customClass"
    :custom-style="customStyle"
    :immediate-change="immediateChange"
    v-model="pickerValue"
    :columns="columns"
    :item-height="itemHeight"
    :visible-item-count="visibleItemCount"
    @change="onChange"
    @pickstart="onPickStart"
    @pickend="onPickEnd"
  ></m-picker-view>
</template>
<script lang="ts">
export default {
  name: 'm-datetime-picker-view',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import MPickerView from '../m-picker-view/m-picker-view.vue'
import { getCurrentInstance, onBeforeMount, ref, watch, computed } from 'vue'
import { isDef, padZero, range, isArray, isString } from '../common/util'
import { datetimePickerViewProps, type DatetimePickerViewColumnType, type DatetimePickerViewExpose } from './types'
import type { PickerViewInstance } from '../m-picker-view/types'
import { getPickerValue } from './util'
import { type Numeric } from '../common/props'

const isValidDate = (date: string | number | Date) => isDef(date) && !Number.isNaN(date)

const times = (n: number, iteratee: (index: number) => number) => {
  let index: number = -1
  const length = n < 0 ? 0 : n
  const result: number[] = Array(length)
  while (++index < n) {
    result[index] = iteratee(index)
  }
  return result
}

const getMonthEndDay = (year: number, month: number) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

const props = defineProps(datetimePickerViewProps)
const emit = defineEmits(['change', 'pickstart', 'pickend', 'update:modelValue'])

const datePickerview = ref<PickerViewInstance>()
const innerValue = ref<null | string | number>(null)
const pickerValue = ref<Array<Numeric>>([])
const created = ref<boolean>(false)

const { proxy } = getCurrentInstance() as any

const columns = computed(() => {
  const { formatter, columnFormatter } = props
  const originColumns = getOriginColumns().map((column) => {
    return column.values.map((value) => {
      return {
        label: formatter ? formatter(column.type, padZero(value)) : padZero(value),
        value
      }
    })
  })
  if (columnFormatter) {
    return columnFormatter(originColumns)
  }
  return originColumns
})

watch(
  () => props.modelValue,
  (val) => {
    const value = correctValue(val)
    if (value === innerValue.value) return
    updateColumnValue(value)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.type,
  (target) => {
    const type = ['date', 'year-month', 'time', 'datetime', 'year']
    if (type.indexOf(target) === -1) {
      console.error(`type must be one of ${type}`)
    }
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  created.value = true
  const innerValue = correctValue(props.modelValue)
  updateColumnValue(innerValue)
})

function onChange({ selectedValues }: { selectedValues: Array<string | number> }) {
  pickerValue.value = selectedValues
  const result = updateInnerValue(selectedValues)
  updateColumnValue(result)
}

function getOriginColumns() {
  const { filter } = props
  return getRanges().map(({ type, range }) => {
    let values = times(range[1] - range[0] + 1, (index: number) => {
      return range[0] + index
    })

    if (filter) {
      values = filter({ type, values })
    }
    return {
      type,
      values
    }
  })
}

function getRanges(): Array<{ type: DatetimePickerViewColumnType; range: number[] }> {
  if (props.type === 'time') {
    const result: Array<{ type: DatetimePickerViewColumnType; range: number[] }> = [
      {
        type: 'hour',
        range: [props.minHour, props.maxHour]
      },
      {
        type: 'minute',
        range: [props.minMinute, props.maxMinute]
      }
    ]
    if (props.useSecond) {
      result.push({
        type: 'second',
        range: [props.minSecond, props.maxSecond]
      })
    }
    return result
  }

  const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxSecond } = getBoundary('max', innerValue.value as number)
  const { minYear, minDate, minMonth, minHour, minMinute, minSecond } = getBoundary('min', innerValue.value as number)

  const result: Array<{ type: DatetimePickerViewColumnType; range: number[] }> = [
    {
      type: 'year',
      range: [minYear, maxYear]
    },
    {
      type: 'month',
      range: [minMonth, maxMonth]
    },
    {
      type: 'date',
      range: [minDate, maxDate]
    },
    {
      type: 'hour',
      range: [minHour, maxHour]
    },
    {
      type: 'minute',
      range: [minMinute, maxMinute]
    }
  ]

  if (props.type === 'datetime' && props.useSecond) {
    result.push({
      type: 'second',
      range: [minSecond, maxSecond]
    })
  }

  if (props.type === 'date') result.splice(3, 2)
  if (props.type === 'year-month') result.splice(2, 3)
  if (props.type === 'year') result.splice(1, 4)
  return result
}

function correctValue(value: string | number | Date): string | number {
  const isDateType = props.type !== 'time'
  if (isDateType && !isValidDate(value)) {
    value = props.minDate
  } else if (!isDateType && !value) {
    value = props.useSecond ? `${padZero(props.minHour)}:00:00` : `${padZero(props.minHour)}:00`
  }

  if (!isDateType) {
    let [hour, minute, second = '00'] = (isString(value) ? value : value.toString()).split(':')
    hour = padZero(range(Number(hour), props.minHour, props.maxHour))
    minute = padZero(range(Number(minute), props.minMinute, props.maxMinute))
    if (props.useSecond) {
      second = padZero(range(Number(second), props.minSecond, props.maxSecond))
      return `${hour}:${minute}:${second}`
    }
    return `${hour}:${minute}`
  }

  value = Math.min(Math.max(Number(value), props.minDate), props.maxDate)

  return value
}

function getBoundary(type: 'min' | 'max', innerValue: number) {
  const value = new Date(innerValue)
  const boundary = new Date(props[`${type}Date`])
  const year = boundary.getFullYear()
  let month: number = 1
  let date: number = 1
  let hour: number = 0
  let minute: number = 0
  let second: number = 0

  if (type === 'max') {
    month = 12
    date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
    hour = 23
    minute = 59
    second = 59
  }

  if (value.getFullYear() === year) {
    month = boundary.getMonth() + 1
    if (value.getMonth() + 1 === month) {
      date = boundary.getDate()
      if (value.getDate() === date) {
        hour = boundary.getHours()
        if (value.getHours() === hour) {
          minute = boundary.getMinutes()
          if (value.getMinutes() === minute) {
            second = boundary.getSeconds()
          }
        }
      }
    }
  }
  return {
    [`${type}Year`]: year,
    [`${type}Month`]: month,
    [`${type}Date`]: date,
    [`${type}Hour`]: hour,
    [`${type}Minute`]: minute,
    [`${type}Second`]: second
  }
}

function updateColumnValue(value: string | number) {
  const values = getPickerValue(value, props.type, props.useSecond)
  if (props.modelValue !== value) {
    emit('update:modelValue', value)
    emit('change', {
      value,
      columns: getOriginColumns()
    })
  }
  innerValue.value = value
  pickerValue.value = values
}

function updateInnerValue(indexes: Array<string | number>) {
  const { type, useSecond } = props
  let innerValue: string | number = ''
  const values = indexes

  if (type === 'time') {
    if (useSecond) {
      innerValue = `${padZero(values[0])}:${padZero(values[1])}:${padZero(values[2])}`
    } else {
      innerValue = `${padZero(values[0])}:${padZero(values[1])}`
    }
    return innerValue
  }

  const year = values[0] && parseInt(String(values[0]))

  const month = type === 'year' ? 1 : values[1] && parseInt(String(values[1]))

  const maxDate = getMonthEndDay(Number(year), Number(month))

  let date: string | number = 1
  if (type !== 'year-month' && type !== 'year') {
    date = (Number(values[2]) && parseInt(String(values[2]))) > maxDate ? maxDate : values[2] && parseInt(String(values[2]))
  }

  let hour = 0
  let minute = 0
  let second = 0

  if (type === 'datetime') {
    hour = Number(values[3]) && parseInt(String(values[3]))
    minute = Number(values[4]) && parseInt(String(values[4]))
    if (useSecond) {
      second = Number(values[5]) && parseInt(String(values[5]))
    }
  }
  const value = new Date(Number(year), Number(month) - 1, Number(date), hour, minute, second).getTime()

  innerValue = correctValue(value)
  return innerValue
}

function onPickStart() {
  emit('pickstart')
}

function onPickEnd() {
  emit('pickend')
}

function getSelectedOptions() {
  const pickerVal = datePickerview.value?.getSelectedOptions()
  if (pickerVal == null) return undefined
  if (isArray(pickerVal)) return pickerVal
  return [pickerVal]
}

defineExpose<DatetimePickerViewExpose>({
  getSelectedOptions,
  correctValue,
  getOriginColumns
})
</script>