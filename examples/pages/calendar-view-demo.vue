<template>
  <view class="m-calendar-view-demo">
    <view class="m-calendar-view-demo__container">
      <!-- 基础日期选择 -->
      <demo-block title="基础日期选择" desc="内嵌式日历，直接在页面中展示，点击卡片展开">
        <view class="demo-calendar-view-row">
          <view v-if="showDate" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="dateValue"
              type="date"
              @change="handleDateChange"
            />
          </view>
          <m-cell title="选择日期" :value="dateValueLabel || '请选择'" clickable @click="toggleShow('date')" />
        </view>
      </demo-block>

      <!-- 日期范围选择 -->
      <demo-block title="日期范围选择" desc="选择一段时间的起止日期">
        <view class="demo-calendar-view-row">
          <view v-if="showRange" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="rangeValue"
              type="daterange"
              @change="handleRangeChange"
            />
          </view>
          <m-cell title="日期范围" :value="rangeValueLabel || '请选择'" clickable @click="toggleShow('range')" />
        </view>
      </demo-block>

      <!-- 多日期选择 -->
      <demo-block title="多日期选择" desc="可同时选择多个日期">
        <view class="demo-calendar-view-row">
          <view v-if="showDates" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="datesValue"
              type="dates"
              @change="handleDatesChange"
            />
          </view>
          <m-cell title="多日期" :value="datesValueLabel || '请选择'" clickable @click="toggleShow('dates')" />
        </view>
      </demo-block>

      <!-- 日期时间选择 -->
      <demo-block title="日期时间选择" desc="选择日期和具体时间">
        <view class="demo-calendar-view-row">
          <view v-if="showDatetime" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="datetimeValue"
              type="datetime"
              @change="handleDatetimeChange"
            />
          </view>
          <m-cell title="日期时间" :value="datetimeValueLabel || '请选择'" clickable @click="toggleShow('datetime')" />
        </view>
      </demo-block>

      <!-- 周选择 -->
      <demo-block title="周选择" desc="以周为单位进行选择">
        <view class="demo-calendar-view-row">
          <view v-if="showWeek" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="weekValue"
              type="week"
              @change="handleWeekChange"
            />
          </view>
          <m-cell title="周选择" :value="weekValueLabel || '请选择'" clickable @click="toggleShow('week')" />
        </view>
      </demo-block>

      <!-- 周范围选择 -->
      <demo-block title="周范围选择" desc="选择连续的几周">
        <view class="demo-calendar-view-row">
          <view v-if="showWeekrange" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="weekrangeValue"
              type="weekrange"
              @change="handleWeekRangeChange"
            />
          </view>
          <m-cell title="周范围" :value="weekrangeValueLabel || '请选择'" clickable @click="toggleShow('weekrange')" />
        </view>
      </demo-block>

      <!-- 月份选择 -->
      <demo-block title="月份选择" desc="仅选择月份">
        <view class="demo-calendar-view-row">
          <view v-if="showMonth" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="monthValue"
              type="month"
              switch-mode="year-month"
              @change="handleMonthChange"
            />
          </view>
          <m-cell title="月份选择" :value="monthValueLabel || '请选择'" clickable @click="toggleShow('month')" />
        </view>
      </demo-block>

      <!-- 月份范围选择 -->
      <demo-block title="月份范围选择" desc="选择连续的几个月">
        <view class="demo-calendar-view-row">
          <view v-if="showMonthrange" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="monthrangeValue"
              type="monthrange"
              switch-mode="year-month"
              @change="handleMonthRangeChange"
            />
          </view>
          <m-cell title="月份范围" :value="monthrangeValueLabel || '请选择'" clickable @click="toggleShow('monthrange')" />
        </view>
      </demo-block>

      <!-- 自定义格式化 -->
      <demo-block title="自定义格式化" desc="自定义日期显示内容">
        <view class="demo-calendar-view-row">
          <view v-if="showCustom" class="demo-calendar-view-card">
            <m-calendar-view
              v-model="customValue"
              type="date"
              :formatter="formatter"
              @change="handleCustomChange"
            />
          </view>
          <m-cell title="自定义格式" :value="customValueLabel || '请选择'" clickable @click="toggleShow('custom')" />
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import mCalendarView from '../../packages/m-calendar-view/m-calendar-view.vue'
import mCell from '../../packages/m-cell/m-cell.vue'
import type { CalendarDayItem } from '../../packages/m-calendar-view/types'

const showDate = ref(false)
const showRange = ref(false)
const showDates = ref(false)
const showDatetime = ref(false)
const showWeek = ref(false)
const showWeekrange = ref(false)
const showMonth = ref(false)
const showMonthrange = ref(false)
const showCustom = ref(false)

function toggleShow(key: string) {
  showDate.value = key === 'date' ? !showDate.value : false
  showRange.value = key === 'range' ? !showRange.value : false
  showDates.value = key === 'dates' ? !showDates.value : false
  showDatetime.value = key === 'datetime' ? !showDatetime.value : false
  showWeek.value = key === 'week' ? !showWeek.value : false
  showWeekrange.value = key === 'weekrange' ? !showWeekrange.value : false
  showMonth.value = key === 'month' ? !showMonth.value : false
  showMonthrange.value = key === 'monthrange' ? !showMonthrange.value : false
  showCustom.value = key === 'custom' ? !showCustom.value : false
}

// 基础日期选择
const dateValue = ref<number | null>(Date.now())
const dateValueLabel = computed(() => {
  if (!dateValue.value) return ''
  return formatDate(dateValue.value)
})

// 日期范围选择
const rangeValue = ref<(number | null)[]>([Date.now(), null])
const rangeValueLabel = computed(() => {
  if (!rangeValue.value || rangeValue.value.length === 0) return ''
  const [start, end] = rangeValue.value
  if (!start) return ''
  if (!end) return formatDate(start)
  return `${formatDate(start)} - ${formatDate(end)}`
})

// 多日期选择
const datesValue = ref<number[]>([])
const datesValueLabel = computed(() => {
  if (!datesValue.value || datesValue.value.length === 0) return ''
  return datesValue.value.map(date => formatDate(date)).join(', ')
})

// 日期时间选择
const datetimeValue = ref<number | null>(Date.now())
const datetimeValueLabel = computed(() => {
  if (!datetimeValue.value) return ''
  const d = new Date(datetimeValue.value)
  const date = formatDate(datetimeValue.value)
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
  return `${date} ${time}`
})

// 周选择
const weekValue = ref<number | null>(Date.now())
const weekValueLabel = computed(() => {
  if (!weekValue.value) return ''
  return `${getWeekNumber(weekValue.value)}`
})

// 周范围选择
const weekrangeValue = ref<(number | null)[]>([Date.now(), null])
const weekrangeValueLabel = computed(() => {
  if (!weekrangeValue.value || weekrangeValue.value.length === 0) return ''
  const [start, end] = weekrangeValue.value
  if (!start) return ''
  if (!end) return `${getWeekNumber(start)}`
  return `${getWeekNumber(start)} - ${getWeekNumber(end)}`
})

// 月份选择
const monthValue = ref<number | null>(Date.now())
const monthValueLabel = computed(() => {
  if (!monthValue.value) return ''
  const d = new Date(monthValue.value)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
})

// 月份范围选择
const monthrangeValue = ref<(number | null)[]>([Date.now(), null])
const monthrangeValueLabel = computed(() => {
  if (!monthrangeValue.value || monthrangeValue.value.length === 0) return ''
  const [start, end] = monthrangeValue.value
  if (!start) return ''
  if (!end) {
    const s = new Date(start)
    return `${s.getFullYear()}年${s.getMonth() + 1}月`
  }
  const s = new Date(start)
  const e = new Date(end)
  return `${s.getFullYear()}年${s.getMonth() + 1}月 - ${e.getFullYear()}年${e.getMonth() + 1}月`
})

// 自定义格式化
const customValue = ref<number | null>(Date.now())
const customValueLabel = computed(() => {
  if (!customValue.value) return ''
  return formatDate(customValue.value)
})

// 自定义格式化函数
const formatter = (day: CalendarDayItem) => {
  if (day.date) {
    const date = new Date(day.date)
    const dayOfMonth = date.getDate()
    if (dayOfMonth === 1) {
      day.topInfo = '月初'
    } else if (dayOfMonth === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) {
      day.topInfo = '月末'
    }
    if (dayOfMonth % 2 === 0) {
      day.bottomInfo = '双日'
    } else {
      day.bottomInfo = '单日'
    }
  }
  return day
}

// 格式化日期
function formatDate(date: number): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 事件处理
function handleDateChange({ value }: any) {
  dateValue.value = value
}

function handleRangeChange({ value }: any) {
  rangeValue.value = value
}

function handleDatesChange({ value }: any) {
  datesValue.value = value
}

function handleDatetimeChange({ value }: any) {
  datetimeValue.value = value
}

function handleWeekChange({ value }: any) {
  weekValue.value = value
}

function handleWeekRangeChange({ value }: any) {
  weekrangeValue.value = value
}

function handleMonthChange({ value }: any) {
  monthValue.value = value
}

function handleMonthRangeChange({ value }: any) {
  monthrangeValue.value = value
}

function handleCustomChange({ value }: any) {
  customValue.value = value
}

// 获取周数
function getWeekNumber(date: number): number {
  const d = new Date(date)
  const week = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week.getTime()) / 86400000 - 3 + ((week.getDay() + 6) % 7)) / 7)
}
</script>

<style lang="scss">
.m-calendar-view-demo {
  padding: 24rpx;

  &__container {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
  }
}

.demo-calendar-view-row {
  margin-top: 16rpx;
}

.demo-calendar-view-card {
  margin-bottom: 16rpx;
  border-radius: 12rpx;
  overflow: hidden;
}
</style>
