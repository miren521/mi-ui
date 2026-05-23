<template>
  <view :class="`m-datetime-picker ${customClass}`" :style="customStyle">
    <m-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :z-index="zIndex"
      @close="onCancel"
      custom-class="m-datetime-picker__popup"
      content-style="padding: 0"
    >
      <view class="m-datetime-picker__wraper">
        <view class="m-datetime-picker__title" @touchmove="noop">
          <view class="m-datetime-picker__action" @click="onCancel">
            {{ cancelButtonText || '取消' }}
          </view>
          <view v-if="title" class="m-datetime-picker__title-text">{{ title }}</view>
          <view class="m-datetime-picker__action" @click="onConfirm">
            {{ confirmButtonText || '确定' }}
          </view>
        </view>
        <view v-if="region" class="m-datetime-picker__range">
          <view :class="`m-datetime-picker__range-item ${showStart ? 'is-active' : ''}`" @click="onTabChange('start')">
            {{ showTabLabel[0] || '开始' }}
          </view>
          <view class="m-datetime-picker__range-separator"></view>
          <view :class="`m-datetime-picker__range-item ${!showStart ? 'is-active' : ''}`" @click="onTabChange('end')">
            {{ showTabLabel[1] || '结束' }}
          </view>
        </view>
        <view :class="showStart ? 'm-datetime-picker__show' : 'm-datetime-picker__hidden'">
          <m-datetime-picker-view
            :custom-class="customViewClass"
            :type="type"
            v-model="innerValue"
            :item-height="itemHeight"
            :visible-item-count="visibleItemCount"
            :value-key="valueKey"
            :label-key="labelKey"
            :formatter="formatter"
            :filter="filter"
            :column-formatter="isArray(modelValue) ? startColumnFormatter : undefined"
            :max-hour="maxHour"
            :min-hour="minHour"
            :max-date="maxDate"
            :min-date="minDate"
            :max-minute="maxMinute"
            :min-minute="minMinute"
            :use-second="useSecond"
            :min-second="minSecond"
            :max-second="maxSecond"
            :immediate-change="immediateChange"
            @change="onChangeStart"
            @pickstart="onPickStart"
            @pickend="onPickEnd"
          />
        </view>
        <view :class="showStart ? 'm-datetime-picker__hidden' : 'm-datetime-picker__show'">
          <m-datetime-picker-view
            :custom-class="customViewClass"
            :type="type"
            v-model="endInnerValue"
            :item-height="itemHeight"
            :visible-item-count="visibleItemCount"
            :value-key="valueKey"
            :label-key="labelKey"
            :formatter="formatter"
            :filter="filter"
            :column-formatter="isArray(modelValue) ? endColumnFormatter : undefined"
            :max-hour="maxHour"
            :min-hour="minHour"
            :max-date="maxDate"
            :min-date="minDate"
            :max-minute="maxMinute"
            :min-minute="minMinute"
            :use-second="useSecond"
            :min-second="minSecond"
            :max-second="maxSecond"
            :immediate-change="immediateChange"
            @change="onChangeEnd"
            @pickstart="onPickStart"
            @pickend="onPickEnd"
          />
        </view>
      </view>
    </m-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-datetime-picker',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import MPopup from '../m-popup/m-popup.vue'
import MDatetimePickerView from '../m-datetime-picker-view/m-datetime-picker-view.vue'
import { getCurrentInstance, nextTick, onMounted, ref, watch, computed } from 'vue'
import { deepClone, isArray, isDef, isEqual, padZero } from '../common/util'
import { callInterceptor } from '../common/interceptor'
import { type DatetimePickerViewColumnType, type DatetimePickerViewOption, type DatetimePickerViewColumn } from '../m-datetime-picker-view/types'
import { datetimePickerProps, type DatetimePickerExpose } from './types'
import { formatDate } from '../common/formatDate'
import { getPickerValue } from '../m-datetime-picker-view/util'

const props = defineProps(datetimePickerProps)
const emit = defineEmits(['change', 'open', 'toggle', 'cancel', 'confirm', 'update:modelValue', 'update:visible'])

const popupShow = ref<boolean>(false)
const showStart = ref<boolean>(true)
const region = ref<boolean>(false)
const innerValue = ref<string | number>('')
const endInnerValue = ref<string | number>('')

const showTabLabel = computed(() => {
  if (region.value) {
    const items = (innerValue.value && getPickerSelectedItems('before')) || []
    const endItems = (endInnerValue.value && getPickerSelectedItems('after')) || []
    return [defaultDisplayFormat(items as Record<string, any>[], true), defaultDisplayFormat(endItems as Record<string, any>[], true)]
  }
  return []
})

const isPicking = ref<boolean>(false)
const hasConfirmed = ref<boolean>(false)

const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (isEqual(val, oldVal)) return
    resetInnerValue()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      showPopup()
    } else {
      popupShow.value = false
    }
  }
)

watch(popupShow, (val) => {
  emit('update:visible', val)
})

function resetInnerValue() {
  const { modelValue } = props
  if (isArray(modelValue)) {
    region.value = true
    innerValue.value = deepClone(getDefaultInnerValue(true))
    endInnerValue.value = deepClone(getDefaultInnerValue(true, true))
  } else {
    innerValue.value = deepClone(getDefaultInnerValue())
  }
}

function isOutOfBoundary(
  isStart: boolean,
  columnType: DatetimePickerViewColumnType,
  value: number,
  currentArray: number[],
  boundary: number[]
): boolean {
  const { type, useSecond } = props

  const typeColumns: Record<string, DatetimePickerViewColumnType[]> = {
    datetime: useSecond ? ['year', 'month', 'date', 'hour', 'minute', 'second'] : ['year', 'month', 'date', 'hour', 'minute'],
    'year-month': ['year', 'month'],
    year: ['year'],
    date: ['year', 'month', 'date'],
    time: useSecond ? ['hour', 'minute', 'second'] : ['hour', 'minute']
  }

  const columns = typeColumns[type]
  const columnIndex = columns.indexOf(columnType)

  if (columnIndex === -1) return false

  const isPreColumnsBoundary = columns.slice(0, columnIndex).every((col, index) => {
    return currentArray[index] === boundary[index]
  })

  if (isPreColumnsBoundary) {
    const boundaryValue = boundary[columnIndex]
    return isStart ? value > boundaryValue : value < boundaryValue
  }

  return false
}

function startColumnFormatter(columns: DatetimePickerViewOption[][]) {
  return customColumnFormatter(columns, 'start')
}

function endColumnFormatter(columns: DatetimePickerViewOption[][]) {
  return customColumnFormatter(columns, 'end')
}

const customColumnFormatter = (columns: DatetimePickerViewOption[][], pickerType: 'start' | 'end') => {
  const { type } = props
  const startSymbol = pickerType === 'start'

  const start = innerValue.value
  const end = endInnerValue.value

  const currentValue = startSymbol ? getPickerValue(start, type, props.useSecond) : getPickerValue(end, type, props.useSecond)
  const boundary = startSymbol ? getPickerValue(end, type, props.useSecond) : getPickerValue(start, type, props.useSecond)

  const typeColumns: Record<string, DatetimePickerViewColumnType[]> = {
    datetime: props.useSecond ? ['year', 'month', 'date', 'hour', 'minute', 'second'] : ['year', 'month', 'date', 'hour', 'minute'],
    'year-month': ['year', 'month'],
    year: ['year'],
    date: ['year', 'month', 'date'],
    time: props.useSecond ? ['hour', 'minute', 'second'] : ['hour', 'minute']
  }
  const currentColumnTypes = typeColumns[type]

  return columns.map((column, index) => {
    const columnType = currentColumnTypes[index]
    return column.map((option) => {
      const disabled = isOutOfBoundary(startSymbol, columnType, option.value, currentValue, boundary)
      return {
        ...option,
        disabled
      }
    })
  })
}

onMounted(() => {
  if (props.visible) {
    showPopup()
  }
})

function getPickerSelectedItems(picker: 'before' | 'after') {
  let value = picker === 'before' ? innerValue.value : endInnerValue.value
  let selected: number[] = []
  if (value) {
    selected = getPickerValue(value, props.type, props.useSecond)
  }

  const typeColumns: Record<string, DatetimePickerViewColumnType[]> = {
    datetime: props.useSecond ? ['year', 'month', 'date', 'hour', 'minute', 'second'] : ['year', 'month', 'date', 'hour', 'minute'],
    'year-month': ['year', 'month'],
    year: ['year'],
    date: ['year', 'month', 'date'],
    time: props.useSecond ? ['hour', 'minute', 'second'] : ['hour', 'minute']
  }
  const currentColumnTypes = typeColumns[props.type]

  let selects = selected.map((value, index) => {
    const type = currentColumnTypes[index]
    return {
      [props.labelKey]: props.formatter ? props.formatter(type, padZero(value)) : padZero(value),
      [props.valueKey]: value
    }
  })
  return selects
}

function noop() {}

function getDefaultInnerValue(isRegion?: boolean, isEnd?: boolean): string | number {
  const { modelValue: value, maxDate, minDate, type } = props
  if (isRegion) {
    const index = isEnd ? 1 : 0
    const targetValue = isArray(value) ? (value[index] as string) : ''
    const maxValue = type === 'time' ? formatDate(maxDate, 'HH:mm') : maxDate
    const minValue = type === 'time' ? formatDate(minDate, 'HH:mm') : minDate
    return targetValue || (isEnd ? maxValue : minValue)
  } else {
    return isDef(value) ? (value as string) : ''
  }
}

function open() {
  showPopup()
}

function close() {
  onCancel()
}

function showPopup() {
  if (popupShow.value) return
  emit('open')
  resetInnerValue()
  popupShow.value = true
  showStart.value = true
}

function onTabChange(tab: 'start' | 'end') {
  const isStart = tab === 'start'
  if (showStart.value === isStart) return
  showStart.value = isStart
  emit('toggle', showStart.value ? innerValue.value : endInnerValue.value)
}

function onChangeStart({ value, columns }: { value: number | string; columns: DatetimePickerViewColumn[] }) {
  if (region.value) {
    const currentArray = getPickerValue(value, props.type, props.useSecond)
    const boundaryArray = getPickerValue(endInnerValue.value, props.type, props.useSecond)

    const needsAdjust = columns.some((column, index) => {
      return isOutOfBoundary(true, column.type, currentArray[index], currentArray, boundaryArray)
    })

    innerValue.value = deepClone(needsAdjust ? endInnerValue.value : value)

    nextTick(() => {
      emit('change', {
        value: [innerValue.value, endInnerValue.value]
      })
    })
  } else {
    innerValue.value = deepClone(value)
    emit('change', {
      value: innerValue.value
    })
  }
}

function onChangeEnd({ value, columns }: { value: number | string; columns: DatetimePickerViewColumn[] }) {
  const currentArray = getPickerValue(value, props.type, props.useSecond)
  const boundaryArray = getPickerValue(innerValue.value, props.type, props.useSecond)

  const needsAdjust = columns.some((column, index) => {
    return isOutOfBoundary(false, column.type, currentArray[index], currentArray, boundaryArray)
  })

  endInnerValue.value = deepClone(needsAdjust ? innerValue.value : value)

  nextTick(() => {
    emit('change', {
      value: [innerValue.value, endInnerValue.value]
    })
  })
}

function onCancel() {
  popupShow.value = false
  emit('cancel')
}

function onConfirm() {
  if (isPicking.value) {
    hasConfirmed.value = true
    return
  }

  const { beforeConfirm } = props
  callInterceptor(beforeConfirm, {
    args: [region.value ? [innerValue.value, endInnerValue.value] : innerValue.value],
    done: () => {
      handleConfirm()
    }
  })
}

function onPickStart() {
  isPicking.value = true
}

function onPickEnd() {
  isPicking.value = false

  setTimeout(() => {
    if (hasConfirmed.value) {
      hasConfirmed.value = false
      onConfirm()
    }
  }, 50)
}

function handleConfirm() {
  const value = region.value ? [innerValue.value, endInnerValue.value] : innerValue.value
  popupShow.value = false
  emit('update:modelValue', value)
  emit('confirm', {
    value
  })
}

function defaultDisplayFormat(items: Record<string, any>[], tabLabel: boolean = false) {
  if (items.length === 0) return ''

  if (tabLabel && props.displayFormatTabLabel) {
    return props.displayFormatTabLabel(items)
  }

  switch (props.type) {
    case 'year':
      return items[0].label
    case 'date':
      return `${items[0].label}-${items[1].label}-${items[2].label}`
    case 'year-month':
      return `${items[0].label}-${items[1].label}`
    case 'time':
      return props.useSecond ? `${items[0].label}:${items[1].label}:${items[2].label}` : `${items[0].label}:${items[1].label}`
    case 'datetime':
      return props.useSecond
        ? `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}:${items[5].label}`
        : `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`
  }
}

defineExpose<DatetimePickerExpose>({
  open,
  close
})
</script>

<style lang="scss">
@import './index.scss';
</style>