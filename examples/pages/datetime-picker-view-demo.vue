<template>
  <view class="m-datetime-picker-view-demo">
    <view class="m-datetime-picker-view-demo__container">
      <!-- 日期选择 -->
      <demo-block title="日期选择" desc="选择年月日">
        <view class="demo-datetime-picker-view-row">
          <view class="demo-datetime-picker-view-card">
            <m-datetime-picker-view
              v-model="dateValue"
              type="date"
              @change="handleDateChange"
            />
          </view>
          <view class="demo-datetime-picker-view-result">
            当前选择：{{ dateValueLabel }}
          </view>
        </view>
      </demo-block>

      <!-- 日期时间选择 -->
      <demo-block title="日期时间选择" desc="选择年月日时分秒">
        <view class="demo-datetime-picker-view-row">
          <view class="demo-datetime-picker-view-card">
            <m-datetime-picker-view
              v-model="datetimeValue"
              type="datetime"
              @change="handleDatetimeChange"
            />
          </view>
          <view class="demo-datetime-picker-view-result">
            当前选择：{{ datetimeValueLabel }}
          </view>
        </view>
      </demo-block>

      <!-- 时间选择 -->
      <demo-block title="时间选择" desc="选择时分秒">
        <view class="demo-datetime-picker-view-row">
          <view class="demo-datetime-picker-view-card">
            <m-datetime-picker-view
              v-model="timeValue"
              type="time"
              @change="handleTimeChange"
            />
          </view>
          <view class="demo-datetime-picker-view-result">
            当前选择：{{ timeValueLabel }}
          </view>
        </view>
      </demo-block>

      <!-- 年份选择 -->
      <demo-block title="年份选择" desc="仅选择年份">
        <view class="demo-datetime-picker-view-row">
          <view class="demo-datetime-picker-view-card">
            <m-datetime-picker-view
              v-model="yearValue"
              type="year"
              :min-date="yearMinDate"
              :max-date="yearMaxDate"
              @change="handleYearChange"
            />
          </view>
          <view class="demo-datetime-picker-view-result">
            当前选择：{{ yearValueLabel }}
          </view>
        </view>
      </demo-block>

      <!-- 年月选择 -->
      <demo-block title="年月选择" desc="选择年份和月份">
        <view class="demo-datetime-picker-view-row">
          <view class="demo-datetime-picker-view-card">
            <m-datetime-picker-view
              v-model="monthValue"
              type="year-month"
              @change="handleMonthChange"
            />
          </view>
          <view class="demo-datetime-picker-view-result">
            当前选择：{{ monthValueLabel }}
          </view>
        </view>
      </demo-block>

      <!-- 隐藏秒选择 -->
      <demo-block title="隐藏秒选择" desc="只显示时和分">
        <view class="demo-datetime-picker-view-row">
          <view class="demo-datetime-picker-view-card">
            <m-datetime-picker-view
              v-model="timeNoSecondValue"
              type="time"
              :use-second="false"
              @change="handleTimeNoSecondChange"
            />
          </view>
          <view class="demo-datetime-picker-view-result">
            当前选择：{{ timeNoSecondValueLabel }}
          </view>
        </view>
      </demo-block>

      <!-- 自定义格式化 -->
      <demo-block title="自定义格式化" desc="自定义显示格式">
        <view class="demo-datetime-picker-view-row">
          <view class="demo-datetime-picker-view-card">
            <m-datetime-picker-view
              v-model="customValue"
              type="time"
              :formatter="customFormatter"
              @change="handleCustomChange"
            />
          </view>
          <view class="demo-datetime-picker-view-result">
            当前选择：{{ customValueLabel }}
          </view>
        </view>
      </demo-block>

      <!-- 自定义高度 -->
      <demo-block title="自定义高度" desc="自定义选择器高度和可见项数">
        <view class="demo-datetime-picker-view-row">
          <view class="demo-datetime-picker-view-card">
            <m-datetime-picker-view
              v-model="heightValue"
              type="date"
              :item-height="50"
              :visible-item-count="5"
              @change="handleHeightChange"
            />
          </view>
          <view class="demo-datetime-picker-view-result">
            当前选择：{{ heightValueLabel }}
          </view>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import mDatetimePickerView from '../../packages/m-datetime-picker-view/m-datetime-picker-view.vue'

// 日期选择
const dateValue = ref<number | null>(Date.now())
const dateValueLabel = computed(() => {
  if (!dateValue.value) return ''
  const d = new Date(dateValue.value)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
})

// 日期时间选择
const datetimeValue = ref<number | null>(Date.now())
const datetimeValueLabel = computed(() => {
  if (!datetimeValue.value) return ''
  const d = new Date(datetimeValue.value)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
})

// 时间选择
const timeValue = ref<string>('12:30:45')
const timeValueLabel = computed(() => timeValue.value)

// 年份选择
const yearValue = ref<number | null>(Date.now())
const yearMinDate = new Date(new Date().getFullYear() - 10, 0, 1).getTime()
const yearMaxDate = new Date(new Date().getFullYear() + 10, 0, 1).getTime()
const yearValueLabel = computed(() => {
  if (!yearValue.value) return ''
  return `${new Date(yearValue.value).getFullYear()}年`
})

// 月份选择
const monthValue = ref<number | null>(Date.now())
const monthValueLabel = computed(() => {
  if (!monthValue.value) return ''
  const d = new Date(monthValue.value)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
})

// 隐藏秒选择
const timeNoSecondValue = ref<string>('14:20')
const timeNoSecondValueLabel = computed(() => timeNoSecondValue.value)

// 自定义格式化
const customValue = ref<string>('10:15:30')
const customValueLabel = computed(() => customValue.value)
const customFormatter = (type: string, value: string) => {
  const unit = type === 'hour' ? '时' : type === 'minute' ? '分' : type === 'second' ? '秒' : ''
  return `${value}${unit}`
}

// 自定义高度
const heightValue = ref<number | null>(Date.now())
const heightValueLabel = computed(() => {
  if (!heightValue.value) return ''
  const d = new Date(heightValue.value)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
})

// 事件处理
function handleDateChange({ value }: any) {
  dateValue.value = value
}

function handleDatetimeChange({ value }: any) {
  datetimeValue.value = value
}

function handleTimeChange({ value }: any) {
  timeValue.value = value
}

function handleYearChange({ value }: any) {
  yearValue.value = value
}

function handleMonthChange({ value }: any) {
  monthValue.value = value
}

function handleTimeNoSecondChange({ value }: any) {
  timeNoSecondValue.value = value
}

function handleCustomChange({ value }: any) {
  customValue.value = value
}

function handleHeightChange({ value }: any) {
  heightValue.value = value
}
</script>

<style lang="scss">
.m-datetime-picker-view-demo {
  padding: 24rpx;

  &__container {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
  }
}

.demo-datetime-picker-view-row {
  margin-top: 16rpx;
}

.demo-datetime-picker-view-card {
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 16rpx;
}

.demo-datetime-picker-view-result {
  margin-top: 12rpx;
  padding: 12rpx 16rpx;
  background: #e8f4ff;
  border-radius: 8rpx;
  font-size: 26rpx;
  color: #323233;
}
</style>
