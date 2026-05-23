<template>
  <view class="m-calendar-view">
    <view class="m-calendar-view__header" v-if="showHeader">
      <view class="m-calendar-view__header-item" :class="{ 'is-active': currentView === 'date' }" @click="switchView('date')">
        {{ translate('date') }}
      </view>
      <view class="m-calendar-view__header-item" :class="{ 'is-active': currentView === 'year' }" @click="switchView('year')">
        {{ translate('year') }}
      </view>
    </view>

    <month-panel
      v-show="currentView === 'date'"
      :type="type"
      :value="value"
      :min-date="minDate"
      :max-date="maxDate"
      :first-day-of-week="firstDayOfWeek"
      :formatter="formatter"
      :max-range="maxRange"
      :range-prompt="rangePrompt"
      :allow-same-day="allowSameDay"
      :default-time="defaultTime"
      :show-panel-title="showPanelTitle"
      :panel-height="panelHeight"
      :item-height="itemHeight"
      :visible-item-count="visibleItemCount"
      :time-filter="timeFilter"
      :time-formatter="timeFormatter"
      :hide-second="hideSecond"
      :immediate-change="immediateChange"
      :switch-mode="switchMode"
      @change="handleChange"
      @pickstart="handlePickStart"
      @pickend="handlePickEnd"
    />

    <year-panel
      v-show="currentView === 'year'"
      :type="type"
      :value="value"
      :min-date="minDate"
      :max-date="maxDate"
      :panel-height="panelHeight"
      :switch-mode="!!showYearView"
      @change="handleYearChange"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-calendar-view',
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
import { ref, watch } from 'vue'
import { useTranslate } from '../composables/useTranslate'
import { calendarViewProps } from './types'
import MonthPanel from './monthPanel/month-panel.vue'
import YearPanel from './yearPanel/year-panel.vue'

const props = defineProps(calendarViewProps)
const emit = defineEmits(['change', 'update:modelValue', 'pickstart', 'pickend'])

const { translate } = useTranslate('calendar-view')

const currentView = ref<'date' | 'year'>('date')

watch(
  () => props.showYearView,
  (val) => {
    if (val) {
      currentView.value = 'year'
    }
  },
  {
    immediate: true
  }
)

function switchView(view: 'date' | 'year') {
  if (!props.showYearView && view === 'year') return
  currentView.value = view
}

function handleChange({ value }: { value: number | (number | null)[] }) {
  emit('update:modelValue', value)
  emit('change', value)
}

function handleYearChange({ value }: { value: number }) {
  currentView.value = 'date'
}

function handlePickStart() {
  emit('pickstart')
}

function handlePickEnd() {
  emit('pickend')
}
</script>

<style lang="scss">
@use './index.scss';
</style>