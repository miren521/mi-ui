<template>
	<view class="m-datetime-picker-demo">
		<view class="m-datetime-picker-demo__container">
			<!-- 日期选择 -->
			<demo-block title="日期选择" desc="选择年月日，支持设置最小日期和最大日期">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openDatePicker">
						<text class="demo-datetime-picker-label">日期选择</text>
						<view class="demo-datetime-picker-value">
							<text>{{ dateText || '请选择日期' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 设置最小日期 -->
			<demo-block title="设置最小日期" desc="通过 min-date 属性设置可选的最小日期，适用于选择出生日期等场景">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openMinDatePicker">
						<text class="demo-datetime-picker-label">出生日期</text>
						<view class="demo-datetime-picker-value">
							<text>{{ minDateText || '请选择出生日期' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 时间选择 -->
			<demo-block title="时间选择" desc="选择时分秒，支持设置最小和最大小时">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openTimePicker">
						<text class="demo-datetime-picker-label">时间选择</text>
						<view class="demo-datetime-picker-value">
							<text>{{ timeText || '请选择时间' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 日期时间选择 -->
			<demo-block title="日期时间选择" desc="选择完整的日期和时间">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openDateTimePicker">
						<text class="demo-datetime-picker-label">日期时间选择</text>
						<view class="demo-datetime-picker-value">
							<text>{{ dateTimeText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 年月选择 -->
			<demo-block title="年月选择" desc="只选择年份和月份">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openYearMonthPicker">
						<text class="demo-datetime-picker-label">年月选择</text>
						<view class="demo-datetime-picker-value">
							<text>{{ yearMonthText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 仅年份选择 -->
			<demo-block title="仅年份选择" desc="只选择年份">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openYearPicker">
						<text class="demo-datetime-picker-label">仅年份选择</text>
						<view class="demo-datetime-picker-value">
							<text>{{ yearText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 展示秒 -->
			<demo-block title="展示秒" desc="时间选择器支持显示秒">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openTimeWithSecondPicker">
						<text class="demo-datetime-picker-label">显示秒</text>
						<view class="demo-datetime-picker-value">
							<text>{{ timeWithSecondText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 区域选择 -->
			<demo-block title="区域选择" desc="选择日期范围">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openRangePicker">
						<text class="demo-datetime-picker-label">日期范围</text>
						<view class="demo-datetime-picker-value">
							<text>{{ rangeText || '请选择日期范围' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 自定义按钮文案 -->
			<demo-block title="自定义按钮文案" desc="自定义取消和确认按钮的文案">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openCustomButtonPicker">
						<text class="demo-datetime-picker-label">自定义按钮</text>
						<view class="demo-datetime-picker-value">
							<text>{{ customButtonText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 自定义标题 -->
			<demo-block title="自定义标题" desc="通过 title 属性设置弹窗标题">
				<view class="demo-datetime-picker-row">
					<view class="demo-datetime-picker-item" @click="openTitlePicker">
						<text class="demo-datetime-picker-label">自定义标题</text>
						<view class="demo-datetime-picker-value">
							<text>{{ titleText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- DatetimePickerView 基础用法 -->
			<demo-block title="DatetimePickerView 基础用法" desc="直接在页面中嵌入日期时间选择器视图">
				<view class="demo-datetime-picker-row demo-datetime-picker-row--view">
					<m-datetime-picker-view
						v-model="pickerViewValue"
						type="datetime"
						:min-date="pickerViewMinDate"
						:max-date="pickerViewMaxDate"
						@change="onPickerViewChange"
					/>
				</view>
				<view class="demo-datetime-picker-value">
					<text>当前值：{{ pickerViewValue }}</text>
				</view>
			</demo-block>

			<!-- DatetimePickerView 时间选择 -->
			<demo-block title="DatetimePickerView 时间选择" desc="嵌入的时间选择器视图">
				<view class="demo-datetime-picker-row demo-datetime-picker-row--view">
					<m-datetime-picker-view
						v-model="pickerViewTimeValue"
						type="time"
						use-second
						@change="onPickerViewTimeChange"
					/>
				</view>
				<view class="demo-datetime-picker-value">
					<text>当前值：{{ pickerViewTimeValue }}</text>
				</view>
			</demo-block>
		</view>

		<!-- 日期选择 -->
		<m-datetime-picker
			ref="datePickerRef"
			v-model="dateValue"
			type="date"
			title="选择日期"
			@confirm="onDateConfirm"
		/>

		<!-- 设置最小日期 -->
		<m-datetime-picker
			ref="minDatePickerRef"
			v-model="minDateValue"
			type="date"
			title="选择出生日期"
			:min-date="minDate"
			@confirm="onMinDateConfirm"
		/>

		<!-- 时间选择 -->
		<m-datetime-picker
			ref="timePickerRef"
			v-model="timeValue"
			type="time"
			title="选择时间"
			@confirm="onTimeConfirm"
		/>

		<!-- 日期时间选择 -->
		<m-datetime-picker
			ref="dateTimePickerRef"
			v-model="dateTimeValue"
			type="datetime"
			title="选择日期时间"
			@confirm="onDateTimeConfirm"
		/>

		<!-- 年月选择 -->
		<m-datetime-picker
			ref="yearMonthPickerRef"
			v-model="yearMonthValue"
			type="year-month"
			title="选择年月"
			@confirm="onYearMonthConfirm"
		/>

		<!-- 年份选择 -->
		<m-datetime-picker
			ref="yearPickerRef"
			v-model="yearValue"
			type="year"
			title="选择年份"
			@confirm="onYearConfirm"
		/>

		<!-- 显示秒的时间选择 -->
		<m-datetime-picker
			ref="timeWithSecondPickerRef"
			v-model="timeWithSecondValue"
			type="time"
			title="选择时间"
			use-second
			@confirm="onTimeWithSecondConfirm"
		/>

		<!-- 范围选择 -->
		<m-datetime-picker
			ref="rangePickerRef"
			v-model="rangeValue"
			type="date"
			title="选择日期范围"
			@confirm="onRangeConfirm"
		/>

		<!-- 自定义按钮文案 -->
		<m-datetime-picker
			ref="customButtonPickerRef"
			v-model="customButtonValue"
			type="datetime"
			title="自定义按钮"
			cancel-button-text="算了"
			confirm-button-text="好的"
			@confirm="onCustomButtonConfirm"
		/>

		<!-- 自定义标题 -->
		<m-datetime-picker
			ref="titlePickerRef"
			v-model="titleValue"
			type="datetime"
			title="出发时间"
			@confirm="onTitleConfirm"
		/>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref<string | number>('')
const minDateValue = ref<string | number>('')
const timeValue = ref<string>('')
const dateTimeValue = ref<string | number>('')
const yearMonthValue = ref<string | number>('')
const yearValue = ref<string | number>('')
const timeWithSecondValue = ref<string>('')
const rangeValue = ref<Array<string | number>>([])
const customButtonValue = ref<string | number>('')
const titleValue = ref<string | number>('')

const pickerViewValue = ref<string | number>(Date.now())
const pickerViewTimeValue = ref<string>('12:30:45')

const dateText = ref('')
const minDateText = ref('')
const timeText = ref('')
const dateTimeText = ref('')
const yearMonthText = ref('')
const yearText = ref('')
const timeWithSecondText = ref('')
const rangeText = ref('')
const customButtonText = ref('')
const titleText = ref('')

const datePickerRef = ref()
const minDatePickerRef = ref()
const timePickerRef = ref()
const dateTimePickerRef = ref()
const yearMonthPickerRef = ref()
const yearPickerRef = ref()
const timeWithSecondPickerRef = ref()
const rangePickerRef = ref()
const customButtonPickerRef = ref()
const titlePickerRef = ref()

const minDate = new Date(1900, 0, 1).getTime()
const pickerViewMinDate = new Date(new Date().getFullYear() - 5, 0, 1).getTime()
const pickerViewMaxDate = new Date(new Date().getFullYear() + 5, 11, 31).getTime()

function openDatePicker() {
	datePickerRef.value?.open()
}

function openMinDatePicker() {
	minDatePickerRef.value?.open()
}

function openTimePicker() {
	timePickerRef.value?.open()
}

function openDateTimePicker() {
	dateTimePickerRef.value?.open()
}

function openYearMonthPicker() {
	yearMonthPickerRef.value?.open()
}

function openYearPicker() {
	yearPickerRef.value?.open()
}

function openTimeWithSecondPicker() {
	timeWithSecondPickerRef.value?.open()
}

function openRangePicker() {
	rangePickerRef.value?.open()
}

function openCustomButtonPicker() {
	customButtonPickerRef.value?.open()
}

function openTitlePicker() {
	titlePickerRef.value?.open()
}

function formatDate(timestamp: string | number) {
	if (!timestamp) return ''
	const date = new Date(timestamp)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

function formatTime(time: string) {
	if (!time) return ''
	return time
}

function onDateConfirm({ value }: any) {
	dateText.value = formatDate(value)
}

function onMinDateConfirm({ value }: any) {
	minDateText.value = formatDate(value)
}

function onTimeConfirm({ value }: any) {
	timeText.value = formatTime(value)
}

function onDateTimeConfirm({ value }: any) {
	const date = new Date(value)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	dateTimeText.value = `${year}-${month}-${day} ${hours}:${minutes}`
}

function onYearMonthConfirm({ value }: any) {
	const date = new Date(value)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	yearMonthText.value = `${year}-${month}`
}

function onYearConfirm({ value }: any) {
	const date = new Date(value)
	yearText.value = `${date.getFullYear()}`
}

function onTimeWithSecondConfirm({ value }: any) {
	timeWithSecondText.value = formatTime(value)
}

function onRangeConfirm({ value }: any) {
	if (Array.isArray(value) && value.length === 2) {
		const start = formatDate(value[0])
		const end = formatDate(value[1])
		rangeText.value = `${start} 至 ${end}`
	}
}

function onCustomButtonConfirm({ value }: any) {
	customButtonText.value = formatDate(value)
}

function onTitleConfirm({ value }: any) {
	const date = new Date(value)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	titleText.value = `${year}-${month}-${day} ${hours}:${minutes}`
}

function onPickerViewChange({ value }: any) {
	console.log('picker-view change:', value)
}

function onPickerViewTimeChange({ value }: any) {
	console.log('picker-view time change:', value)
}
</script>

<style lang="scss" scoped>
.m-datetime-picker-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-datetime-picker-row {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;

	&--view {
		padding: 16rpx 0;
		background: #ffffff;
	}
}

.demo-datetime-picker-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx;
	border-bottom: 1px solid #f0f0f0;

	&:last-child {
		border-bottom: none;
	}
}

.demo-datetime-picker-label {
	font-size: 28rpx;
	color: #323233;
}

.demo-datetime-picker-value {
	display: flex;
	align-items: center;
	gap: 8rpx;
	font-size: 28rpx;
	color: #969799;

	text {
		color: #969799;
		line-height: 1;
	}
}
</style>