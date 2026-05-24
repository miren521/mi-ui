<template>
  <view class="m-calendar-demo">
    <view class="m-calendar-demo__container">
      <!-- 基础日期选择 -->
      <demo-block title="基础日期选择" desc="最基本的日期选择功能，点击确认后返回选中日期">
        <view class="demo-calendar-row">
          <m-cell
            title="选择日期"
            :value="dateValueLabel || '请选择'"
            clickable
            @click="openDateCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="dateValue"
            type="date"
            title="选择日期"
            ref="dateCalendarRef"
            @confirm="handleDateConfirm"
          />
        </view>
      </demo-block>

      <!-- 日期范围选择 -->
      <demo-block title="日期范围选择" desc="选择一段时间的起止日期">
        <view class="demo-calendar-row">
          <m-cell
            title="日期范围"
            :value="rangeValueLabel || '请选择'"
            clickable
            @click="openRangeCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="rangeValue"
            type="daterange"
            title="选择日期范围"
            ref="rangeCalendarRef"
            @confirm="handleRangeConfirm"
          />
        </view>
      </demo-block>

      <!-- 多日期选择 -->
      <demo-block title="多日期选择" desc="可同时选择多个日期">
        <view class="demo-calendar-row">
          <m-cell
            title="多日期"
            :value="datesValueLabel || '请选择'"
            clickable
            @click="openDatesCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="datesValue"
            type="dates"
            title="多日期选择"
            ref="datesCalendarRef"
            @confirm="handleDatesConfirm"
          />
        </view>
      </demo-block>

      <!-- 日期时间选择 -->
      <demo-block title="日期时间选择" desc="选择日期和具体时间">
        <view class="demo-calendar-row">
          <m-cell
            title="日期时间"
            :value="datetimeValueLabel || '请选择'"
            clickable
            @click="openDatetimeCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="datetimeValue"
            type="datetime"
            title="选择日期时间"
            ref="datetimeCalendarRef"
            @confirm="handleDatetimeConfirm"
          />
        </view>
      </demo-block>

      <!-- 日期时间范围选择 -->
      <demo-block title="日期时间范围" desc="选择一段时间的起止日期和时间">
        <view class="demo-calendar-row">
          <m-cell
            title="日期时间范围"
            :value="datetimerangeValueLabel || '请选择'"
            clickable
            @click="openDatetimeRangeCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="datetimerangeValue"
            type="datetimerange"
            title="选择日期时间范围"
            ref="datetimerangeCalendarRef"
            @confirm="handleDatetimeRangeConfirm"
          />
        </view>
      </demo-block>

      <!-- 周选择 -->
      <demo-block title="周选择" desc="以周为单位进行选择">
        <view class="demo-calendar-row">
          <m-cell
            title="周选择"
            :value="weekValueLabel || '请选择'"
            clickable
            @click="openWeekCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="weekValue"
            type="week"
            title="选择周"
            ref="weekCalendarRef"
            @confirm="handleWeekConfirm"
          />
        </view>
      </demo-block>

      <!-- 周范围选择 -->
      <demo-block title="周范围选择" desc="选择一段时间的起止周">
        <view class="demo-calendar-row">
          <m-cell
            title="周范围"
            :value="weekrangeValueLabel || '请选择'"
            clickable
            @click="openWeekRangeCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="weekrangeValue"
            type="weekrange"
            title="选择周范围"
            ref="weekrangeCalendarRef"
            @confirm="handleWeekRangeConfirm"
          />
        </view>
      </demo-block>

      <!-- 月份选择 -->
      <demo-block title="月份选择" desc="仅选择月份">
        <view class="demo-calendar-row">
          <m-cell
            title="月份选择"
            :value="monthValueLabel || '请选择'"
            clickable
            @click="openMonthCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="monthValue"
            type="month"
            title="选择月份"
            ref="monthCalendarRef"
            @confirm="handleMonthConfirm"
          />
        </view>
      </demo-block>

      <!-- 月份范围选择 -->
      <demo-block title="月份范围选择" desc="选择一段时间的起止月份">
        <view class="demo-calendar-row">
          <m-cell
            title="月份范围"
            :value="monthrangeValueLabel || '请选择'"
            clickable
            @click="openMonthRangeCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="monthrangeValue"
            type="monthrange"
            title="选择月份范围"
            ref="monthrangeCalendarRef"
            @confirm="handleMonthRangeConfirm"
          />
        </view>
      </demo-block>

      <!-- 自定义日期范围 -->
      <demo-block title="自定义日期范围" desc="通过 minDate 和 maxDate 设置可选日期范围">
        <view class="demo-calendar-row">
          <m-cell
            title="自定义范围"
            :value="customRangeValueLabel || '请选择'"
            clickable
            @click="openCustomRangeCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="customRangeValue"
            type="date"
            title="自定义范围"
            :min-date="minDate"
            :max-date="maxDate"
            ref="customRangeCalendarRef"
            @confirm="handleCustomRangeConfirm"
          />
        </view>
      </demo-block>

      <!-- 范围最大跨度 -->
      <demo-block title="范围最大跨度" desc="通过 maxRange 设置日期范围最大跨度，超出提示">
        <view class="demo-calendar-row">
          <m-cell
            title="最大跨度7天"
            :value="maxRangeValueLabel || '请选择'"
            clickable
            @click="openMaxRangeCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="maxRangeValue"
            type="daterange"
            title="选择日期范围"
            :max-range="7"
            range-prompt="最多选择7天"
            ref="maxRangeCalendarRef"
            @confirm="handleMaxRangeConfirm"
          />
        </view>
      </demo-block>

      <!-- 允许选择同一天 -->
      <demo-block title="允许选择同一天" desc="设置 allowSameDay 允许范围选择时首尾为同一天">
        <view class="demo-calendar-row">
          <m-cell
            title="允许同一天"
            :value="sameDayValueLabel || '请选择'"
            clickable
            @click="openSameDayCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="sameDayValue"
            type="daterange"
            title="选择日期范围"
            allow-same-day
            ref="sameDayCalendarRef"
            @confirm="handleSameDayConfirm"
          />
        </view>
      </demo-block>

      <!-- 自定义格式化 -->
      <demo-block title="自定义格式化" desc="通过 formatter 函数自定义日期显示">
        <view class="demo-calendar-row">
          <m-cell
            title="格式化日期"
            :value="formatterValueLabel || '请选择'"
            clickable
            @click="openFormatterCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="formatterValue"
            type="date"
            title="自定义格式化"
            :formatter="customFormatter"
            ref="formatterCalendarRef"
            @confirm="handleFormatterConfirm"
          />
        </view>
      </demo-block>

      <!-- 自定义按钮文本 -->
      <demo-block title="自定义按钮文本" desc="通过 confirm-text 自定义按钮文本">
        <view class="demo-calendar-row">
          <m-cell
            title="自定义按钮"
            :value="customTextValueLabel || '请选择'"
            clickable
            @click="openCustomTextCalendar"
          >
            <template #right-icon>
              <m-icon name="right" />
            </template>
          </m-cell>
          <m-calendar
            v-model="customTextValue"
            type="date"
            title="自定义按钮"
            confirm-text="好的"
            ref="customTextCalendarRef"
            @confirm="handleCustomTextConfirm"
          />
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CalendarDayItem } from '../../packages/m-calendar-view/types'

const now = new Date()
const today = now.getTime()
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).getTime()
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).getTime()
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).getTime()

const dateValue = ref<number | null>(today)
const rangeValue = ref<(number | null)[]>([yesterday, tomorrow])
const datesValue = ref<number[]>([today, tomorrow, nextWeek])
const datetimeValue = ref<number | null>(null)
const datetimerangeValue = ref<(number | null)[]>([])
const weekValue = ref<number | null>(null)
const weekrangeValue = ref<(number | null)[]>([])
const monthValue = ref<number | null>(today)
const monthrangeValue = ref<(number | null)[]>([])
const customRangeValue = ref<number | null>(null)
const maxRangeValue = ref<(number | null)[]>([])
const sameDayValue = ref<(number | null)[]>([])
const formatterValue = ref<number | null>(null)
const customTextValue = ref<number | null>(null)

const dateCalendarRef = ref<any>(null)
const rangeCalendarRef = ref<any>(null)
const datesCalendarRef = ref<any>(null)
const datetimeCalendarRef = ref<any>(null)
const datetimerangeCalendarRef = ref<any>(null)
const weekCalendarRef = ref<any>(null)
const weekrangeCalendarRef = ref<any>(null)
const monthCalendarRef = ref<any>(null)
const monthrangeCalendarRef = ref<any>(null)
const customRangeCalendarRef = ref<any>(null)
const maxRangeCalendarRef = ref<any>(null)
const sameDayCalendarRef = ref<any>(null)
const formatterCalendarRef = ref<any>(null)
const customTextCalendarRef = ref<any>(null)

const minDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime()
const maxDate = new Date(now.getFullYear(), now.getMonth() + 2, 0).getTime()

const dateValueLabel = computed(() => {
  if (!dateValue.value) return ''
  return formatDate(dateValue.value)
})

const rangeValueLabel = computed(() => {
  if (!rangeValue.value || rangeValue.value.length === 0) return ''
  const [start, end] = rangeValue.value
  if (!start || !end) return ''
  return `${formatDate(start)} - ${formatDate(end)}`
})

const datesValueLabel = computed(() => {
  if (!datesValue.value || datesValue.value.length === 0) return ''
  return datesValue.value.map(d => formatDate(d)).join(', ')
})

const datetimeValueLabel = computed(() => {
  if (!datetimeValue.value) return ''
  return formatDatetime(datetimeValue.value)
})

const datetimerangeValueLabel = computed(() => {
  if (!datetimerangeValue.value || datetimerangeValue.value.length === 0) return ''
  const [start, end] = datetimerangeValue.value
  if (!start || !end) return ''
  return `${formatDatetime(start)} - ${formatDatetime(end)}`
})

const weekValueLabel = computed(() => {
  if (!weekValue.value) return ''
  return formatDate(weekValue.value)
})

const weekrangeValueLabel = computed(() => {
  if (!weekrangeValue.value || weekrangeValue.value.length === 0) return ''
  const [start, end] = weekrangeValue.value
  if (!start || !end) return ''
  return `${formatDate(start)} - ${formatDate(end)}`
})

const monthValueLabel = computed(() => {
  if (!monthValue.value) return ''
  const date = new Date(monthValue.value)
  return `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, '0')}月`
})

const monthrangeValueLabel = computed(() => {
  if (!monthrangeValue.value || monthrangeValue.value.length === 0) return ''
  const [start, end] = monthrangeValue.value
  if (!start || !end) return ''
  const startDate = new Date(start)
  const endDate = new Date(end)
  return `${startDate.getFullYear()}年${String(startDate.getMonth() + 1).padStart(2, '0')}月 - ${endDate.getFullYear()}年${String(endDate.getMonth() + 1).padStart(2, '0')}月`
})

const customRangeValueLabel = computed(() => {
  if (!customRangeValue.value) return ''
  return formatDate(customRangeValue.value)
})

const maxRangeValueLabel = computed(() => {
  if (!maxRangeValue.value || maxRangeValue.value.length === 0) return ''
  const [start, end] = maxRangeValue.value
  if (!start || !end) return ''
  return `${formatDate(start)} - ${formatDate(end)}`
})

const sameDayValueLabel = computed(() => {
  if (!sameDayValue.value || sameDayValue.value.length === 0) return ''
  const [start, end] = sameDayValue.value
  if (!start) return ''
  return end ? `${formatDate(start)} - ${formatDate(end)}` : formatDate(start)
})

const formatterValueLabel = computed(() => {
  if (!formatterValue.value) return ''
  return formatDate(formatterValue.value)
})

const customTextValueLabel = computed(() => {
  if (!customTextValue.value) return ''
  return formatDate(customTextValue.value)
})

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDatetime(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

function customFormatter(day: CalendarDayItem): CalendarDayItem {
  const date = new Date(day.date)
  const dayOfWeek = date.getDay()
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    day.bottomInfo = '周末'
    day.customClass = 'is-weekend'
  }
  const today = new Date()
  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    day.topInfo = '今天'
  }
  return day
}

function openDateCalendar() {
  dateCalendarRef.value?.open()
}

function openRangeCalendar() {
  rangeCalendarRef.value?.open()
}

function openDatesCalendar() {
  datesCalendarRef.value?.open()
}

function openDatetimeCalendar() {
  datetimeCalendarRef.value?.open()
}

function openDatetimeRangeCalendar() {
  datetimerangeCalendarRef.value?.open()
}

function openWeekCalendar() {
  weekCalendarRef.value?.open()
}

function openWeekRangeCalendar() {
  weekrangeCalendarRef.value?.open()
}

function openMonthCalendar() {
  monthCalendarRef.value?.open()
}

function openMonthRangeCalendar() {
  monthrangeCalendarRef.value?.open()
}

function openCustomRangeCalendar() {
  customRangeCalendarRef.value?.open()
}

function openMaxRangeCalendar() {
  maxRangeCalendarRef.value?.open()
}

function openSameDayCalendar() {
  sameDayCalendarRef.value?.open()
}

function openFormatterCalendar() {
  formatterCalendarRef.value?.open()
}

function openCustomTextCalendar() {
  customTextCalendarRef.value?.open()
}

function handleDateConfirm({ value }: any) {
  uni.showToast({ title: `选中: ${formatDate(value)}`, icon: 'none' })
}

function handleRangeConfirm({ value }: any) {
  const [start, end] = value
  uni.showToast({ title: `${formatDate(start)} - ${formatDate(end)}`, icon: 'none' })
}

function handleDatesConfirm({ value }: any) {
  const labels = value.map((d: number) => formatDate(d)).join(', ')
  uni.showToast({ title: `选中: ${labels}`, icon: 'none' })
}

function handleDatetimeConfirm({ value }: any) {
  uni.showToast({ title: `选中: ${formatDatetime(value)}`, icon: 'none' })
}

function handleDatetimeRangeConfirm({ value }: any) {
  const [start, end] = value
  uni.showToast({ title: `${formatDatetime(start)} - ${formatDatetime(end)}`, icon: 'none' })
}

function handleWeekConfirm({ value }: any) {
  uni.showToast({ title: `选中: ${formatDate(value)}`, icon: 'none' })
}

function handleWeekRangeConfirm({ value }: any) {
  const [start, end] = value
  uni.showToast({ title: `${formatDate(start)} - ${formatDate(end)}`, icon: 'none' })
}

function handleMonthConfirm({ value }: any) {
  const date = new Date(value)
  uni.showToast({ title: `选中: ${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, '0')}月`, icon: 'none' })
}

function handleMonthRangeConfirm({ value }: any) {
  const [start, end] = value
  const startDate = new Date(start)
  const endDate = new Date(end)
  uni.showToast({ title: `${startDate.getFullYear()}年${String(startDate.getMonth() + 1).padStart(2, '0')}月 - ${endDate.getFullYear()}年${String(endDate.getMonth() + 1).padStart(2, '0')}月`, icon: 'none' })
}

function handleCustomRangeConfirm({ value }: any) {
  uni.showToast({ title: `选中: ${formatDate(value)}`, icon: 'none' })
}

function handleMaxRangeConfirm({ value }: any) {
  const [start, end] = value
  uni.showToast({ title: `${formatDate(start)} - ${formatDate(end)}`, icon: 'none' })
}

function handleSameDayConfirm({ value }: any) {
  const [start, end] = value
  uni.showToast({ title: `${formatDate(start)} - ${formatDate(end || start)}`, icon: 'none' })
}

function handleFormatterConfirm({ value }: any) {
  uni.showToast({ title: `选中: ${formatDate(value)}`, icon: 'none' })
}

function handleCustomTextConfirm({ value }: any) {
  uni.showToast({ title: `选中: ${formatDate(value)}`, icon: 'none' })
}
</script>

<style lang="scss" scoped>
.m-calendar-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx 0;

  &__container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 20rpx;
  }
}

.demo-calendar-row {
  background: #ffffff;
  border-radius: 8rpx;
  padding: 0;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 24rpx;
  }

  :deep(.m-cell) {
    margin-bottom: 0;

    .m-cell__left {
      flex: 0 0 30%;
      max-width: 55%;
    }

    .m-cell__right {
      flex: 1;
    }

    .m-cell__value {
      text-align: right;
      white-space: normal;
      word-break: break-all;
    }
  }
}
</style>
