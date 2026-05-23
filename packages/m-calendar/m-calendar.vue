<template>
  <view class="m-calendar">
    <m-action-sheet
      v-model:visible="visible"
      :actions="[]"
      :cancel-text="cancelText"
      :confirm-text="confirmText"
      :title="title"
      :close-on-click-overlay="closeOnClickOverlay"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :round="round"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
      <template #content>
        <slot name="header">
          <view class="m-calendar__header" v-if="showHeader">
            <view class="m-calendar__header-item" :class="{ 'is-active': currentView === 'date' }" @click="switchView('date')">
              {{ translate('date') }}
            </view>
            <view class="m-calendar__header-item" :class="{ 'is-active': currentView === 'year' }" @click="switchView('year')">
              {{ translate('year') }}
            </view>
          </view>
        </slot>

        <m-calendar-view
          :type="type"
          :model-value="innerValue"
          :min-date="minDate"
          :max-date="maxDate"
          :first-day-of-week="firstDayOfWeek"
          :formatter="formatter"
          :max-range="maxRange"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :show-panel-title="showPanelTitle"
          :show-header="false"
          :panel-height="panelHeight"
          :item-height="itemHeight"
          :visible-item-count="visibleItemCount"
          :time-filter="timeFilter"
          :time-formatter="timeFormatter"
          :hide-second="hideSecond"
          :immediate-change="immediateChange"
          :switch-mode="switchMode"
          :show-year-view="currentView === 'year'"
          @change="handleChange"
          @pickstart="handlePickStart"
          @pickend="handlePickEnd"
        />

        <slot name="footer" />
      </template>
    </m-action-sheet>

    <view v-if="!inline" class="m-calendar__trigger" @click="visible = true">
      <slot>
        <view class="m-calendar__trigger-content">
          <text v-if="!displayText">{{ placeholder }}</text>
          <text v-else>{{ displayText }}</text>
          <m-icon name="calendar" class="m-calendar__trigger-icon" />
        </view>
      </slot>
    </view>

    <view v-else>
      <view class="m-calendar__inline" :style="inlineStyle">
        <slot name="header">
          <view class="m-calendar__header" v-if="showHeader">
            <view class="m-calendar__header-item" :class="{ 'is-active': currentView === 'date' }" @click="switchView('date')">
              {{ translate('date') }}
            </view>
            <view class="m-calendar__header-item" :class="{ 'is-active': currentView === 'year' }" @click="switchView('year')">
              {{ translate('year') }}
            </view>
          </view>
        </slot>

        <m-calendar-view
          :type="type"
          :model-value="innerValue"
          :min-date="minDate"
          :max-date="maxDate"
          :first-day-of-week="firstDayOfWeek"
          :formatter="formatter"
          :max-range="maxRange"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :show-panel-title="showPanelTitle"
          :show-header="false"
          :panel-height="panelHeight"
          :item-height="itemHeight"
          :visible-item-count="visibleItemCount"
          :time-filter="timeFilter"
          :time-formatter="timeFormatter"
          :hide-second="hideSecond"
          :immediate-change="immediateChange"
          :switch-mode="switchMode"
          :show-year-view="currentView === 'year'"
          @change="handleChange"
          @pickstart="handlePickStart"
          @pickend="handlePickEnd"
        />

        <slot name="footer" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-calendar',
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
import mIcon from '../m-icon/m-icon.vue'
import mActionSheet from '../m-action-sheet/m-action-sheet.vue'
import mCalendarView from '../m-calendar-view/m-calendar-view.vue'
import { ref, computed, watch, type CSSProperties } from 'vue'
import { isArray, isNumber, objToStyle } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { calendarProps } from './types'
import type { CalendarType } from '../m-calendar-view/types'

const props = defineProps(calendarProps)
const emit = defineEmits(['change', 'update:modelValue', 'confirm', 'cancel', 'pickstart', 'pickend', 'open', 'close'])

const { translate } = useTranslate('calendar')

function formatDateValue(
  value: number | (number | null)[],
  type: CalendarType,
  format?: string,
  hideSecond?: boolean,
  translate?: (key: string, value?: any) => string
): string {
  if (isArray(value)) {
    const [startDate, endDate] = value
    if (startDate && endDate) {
      const startText = getFullDate(startDate, type, format, hideSecond)
      const endText = getFullDate(endDate, type, format, hideSecond)
      return `${startText} - ${endText}`
    }
    return ''
  } else if (isNumber(value)) {
    return getFullDate(value, type, format, hideSecond)
  }
  return ''
}

function getFullDate(date: number, type: CalendarType, format?: string, hideSecond?: boolean): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  const second = String(d.getSeconds()).padStart(2, '0')

  const isDatetimeType = type === 'datetime' || type === 'datetimerange'

  if (format) {
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second)
  }

  if (isDatetimeType) {
    return hideSecond ? `${year}-${month}-${day} ${hour}:${minute}` : `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  return `${year}-${month}-${day}`
}

const visible = ref(false)
const innerValue = ref<number | (number | null)[] | null>(null)
const currentView = ref<'date' | 'year'>('date')

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val
  },
  {
    deep: true,
    immediate: true
  }
)

const displayText = computed(() => {
  if (!innerValue.value) {
    return ''
  }
  return formatDateValue(innerValue.value, props.type, props.format, props.hideSecond, translate)
})

const inlineStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return objToStyle(style)
})

function switchView(view: 'date' | 'year') {
  if (!props.showYearView && view === 'year') return
  currentView.value = view
}

function handleChange(value: number | (number | null)[]) {
  innerValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

function handleConfirm() {
  emit('confirm', innerValue.value)
  if (!props.inline) {
    visible.value = false
    emit('close')
  }
}

function handleCancel() {
  emit('cancel')
  if (!props.inline) {
    visible.value = false
    emit('close')
  }
}

function handlePickStart() {
  emit('pickstart')
}

function handlePickEnd() {
  emit('pickend')
}

watch(visible, (val) => {
  if (val) {
    emit('open')
  }
})
</script>

<style lang="scss">
@use './index.scss';
</style>