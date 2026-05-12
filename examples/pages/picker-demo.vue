<template>
	<view class="m-picker-demo">
		<view class="m-picker-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="最基本的单列选择器使用场景">
				<view class="demo-picker-row">
					<view class="demo-picker-item" @click="openBasicPicker">
						<text class="demo-picker-label">单列选择</text>
						<view class="demo-picker-value">
							<text>{{ basicText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 多列选择 -->
			<demo-block title="多列选择" desc="多列选择器，适用于需要同时选择多个维度的场景">
				<view class="demo-picker-row">
					<view class="demo-picker-item" @click="openMultiPicker">
						<text class="demo-picker-label">多列选择</text>
						<view class="demo-picker-value">
							<text>{{ multiText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 级联选择 -->
			<demo-block title="级联选择" desc="级联选择器，适用于省市区等联动选择的场景">
				<view class="demo-picker-row">
					<view class="demo-picker-item" @click="openCascadePicker">
						<text class="demo-picker-label">级联选择</text>
						<view class="demo-picker-value">
							<text>{{ cascadeText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 禁用选项 -->
			<demo-block title="禁用选项" desc="某些选项被禁用，无法选择">
				<view class="demo-picker-row">
					<view class="demo-picker-item" @click="openDisabledPicker">
						<text class="demo-picker-label">禁用选项</text>
						<view class="demo-picker-value">
							<text>{{ disabledText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 自定义标题 -->
			<demo-block title="自定义标题" desc="通过 title 属性设置弹窗标题">
				<view class="demo-picker-row">
					<view class="demo-picker-item" @click="openTitlePicker">
						<text class="demo-picker-label">自定义标题</text>
						<view class="demo-picker-value">
							<text>{{ titleText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 手动控制 -->
			<demo-block title="手动控制" desc="通过 ref 调用 open 和 close 方法控制弹窗">
				<view class="demo-picker-row">
					<view class="demo-picker-item" @click="openManualPicker">
						<text class="demo-picker-label">手动控制</text>
						<view class="demo-picker-value">
							<text>{{ manualText || '请选择' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 异步校验 -->
			<demo-block title="异步校验" desc="通过 beforeConfirm 钩子在确认前进行异步校验，返回 false 可阻止确认">
				<view class="demo-picker-row">
					<view class="demo-picker-item" @click="openBeforeConfirmPicker">
						<text class="demo-picker-label">异步校验</text>
						<view class="demo-picker-value">
							<text>{{ beforeConfirmText || '请选择（选择广州会被拒绝）' }}</text>
							<m-icon name="right" :size="18" />
						</view>
					</view>
				</view>
			</demo-block>

			<!-- picker-view 基础用法 -->
			<demo-block title="PickerView 基础用法" desc="直接在页面中嵌入选择器视图">
				<view class="demo-picker-row demo-picker-row--view">
					<m-picker-view v-model="pickerViewValue" :columns="basicColumns" @change="onPickerViewChange" />
				</view>
				<view class="demo-picker-value">
					<text>当前值：{{ pickerViewValue }}</text>
				</view>
			</demo-block>

			<!-- picker-view 多列 -->
			<demo-block title="PickerView 多列" desc="多列选择器视图">
				<view class="demo-picker-row demo-picker-row--view">
					<m-picker-view v-model="pickerViewMultiValue" :columns="multiColumns" @change="onPickerViewMultiChange" />
				</view>
				<view class="demo-picker-value">
					<text>当前值：{{ pickerViewMultiValue }}</text>
				</view>
			</demo-block>
		</view>

		<!-- 基础选择器 -->
		<m-picker
			ref="basicPickerRef"
			v-model="basicValue"
			:columns="basicColumns"
			title="请选择"
			@confirm="onBasicConfirm"
		/>

		<!-- 多列选择器 -->
		<m-picker
			ref="multiPickerRef"
			v-model="multiValue"
			:columns="multiColumns"
			title="请选择"
			@confirm="onMultiConfirm"
		/>

		<!-- 级联选择器 -->
		<m-picker
			ref="cascadePickerRef"
			v-model="cascadeValue"
			:columns="cascadeColumns"
			title="请选择地区"
			cascade
			@confirm="onCascadeConfirm"
		/>

		<!-- 禁用选项选择器 -->
		<m-picker
			ref="disabledPickerRef"
			v-model="disabledValue"
			:columns="disabledColumns"
			title="请选择"
			@confirm="onDisabledConfirm"
		/>

		<!-- 自定义标题选择器 -->
		<m-picker
			ref="titlePickerRef"
			v-model="titleValue"
			:columns="basicColumns"
			title="自定义标题"
			cancel-button-text="算了"
			confirm-button-text="好的"
			@confirm="onTitleConfirm"
		/>

		<!-- 手动控制选择器 -->
		<m-picker
			ref="manualPickerRef"
			v-model="manualValue"
			:columns="basicColumns"
			title="手动控制"
			@confirm="onManualConfirm"
		/>

		<!-- 异步校验选择器 -->
		<m-picker
			ref="beforeConfirmPickerRef"
			v-model="beforeConfirmValue"
			:columns="basicColumns"
			title="异步校验示例"
			:before-confirm="asyncBeforeConfirm"
			@confirm="onBeforeConfirmConfirm"
		/>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref<number[]>([])
const multiValue = ref<number[]>([])
const cascadeValue = ref<number[]>([])
const disabledValue = ref<number[]>([])
const titleValue = ref<number[]>([])
const manualValue = ref<number[]>([])
const beforeConfirmValue = ref<number[]>([])
const pickerViewValue = ref<string[]>([])
const pickerViewMultiValue = ref<string[]>([])

const basicText = ref('')
const multiText = ref('')
const cascadeText = ref('')
const disabledText = ref('')
const titleText = ref('')
const manualText = ref('')
const beforeConfirmText = ref('')

const basicPickerRef = ref()
const multiPickerRef = ref()
const cascadePickerRef = ref()
const disabledPickerRef = ref()
const titlePickerRef = ref()
const manualPickerRef = ref()
const beforeConfirmPickerRef = ref()

const basicColumns = [
	{ label: '北京', value: 1 },
	{ label: '上海', value: 2 },
	{ label: '广州', value: 3 },
	{ label: '深圳', value: 4 },
	{ label: '杭州', value: 5 },
	{ label: '成都', value: 6 }
]

const multiColumns = [
	[
		{ label: '周一', value: 1 },
		{ label: '周二', value: 2 },
		{ label: '周三', value: 3 },
		{ label: '周四', value: 4 },
		{ label: '周五', value: 5 }
	],
	[
		{ label: '上午', value: 1 },
		{ label: '下午', value: 2 },
		{ label: '晚上', value: 3 }
	]
]

const cascadeColumns = [
	{
		label: '北京',
		value: 1,
		children: [
			{ label: '朝阳区', value: 11 },
			{ label: '海淀区', value: 12 },
			{ label: '东城区', value: 13 }
		]
	},
	{
		label: '上海',
		value: 2,
		children: [
			{ label: '黄浦区', value: 21 },
			{ label: '徐汇区', value: 22 },
			{ label: '静安区', value: 23 }
		]
	},
	{
		label: '广东',
		value: 3,
		children: [
			{
				label: '广州',
				value: 31,
				children: [
					{ label: '天河区', value: 311 },
					{ label: '越秀区', value: 312 }
				]
			},
			{
				label: '深圳',
				value: 32,
				children: [
					{ label: '南山区', value: 321 },
					{ label: '福田区', value: 322 }
				]
			}
		]
	}
]

const disabledColumns = [
	{ label: '选项一', value: 1 },
	{ label: '选项二', value: 2, disabled: true },
	{ label: '选项三', value: 3 },
	{ label: '选项四', value: 4, disabled: true },
	{ label: '选项五', value: 5 }
]

function openBasicPicker() {
	basicPickerRef.value?.open()
}

function openMultiPicker() {
	multiPickerRef.value?.open()
}

function openCascadePicker() {
	cascadePickerRef.value?.open()
}

function openDisabledPicker() {
	disabledPickerRef.value?.open()
}

function openTitlePicker() {
	titlePickerRef.value?.open()
}

function openManualPicker() {
	manualPickerRef.value?.open()
}

function openBeforeConfirmPicker() {
	beforeConfirmPickerRef.value?.open()
}

function onBasicConfirm({ selectedItems }: any) {
	if (selectedItems && selectedItems.length > 0) {
		basicText.value = selectedItems.map((item: any) => item.label).join(', ')
	}
}

function onMultiConfirm({ selectedItems }: any) {
	if (selectedItems && selectedItems.length > 0) {
		multiText.value = selectedItems.map((item: any) => item.label).join(' ')
	}
}

function onCascadeConfirm({ selectedItems }: any) {
	if (selectedItems && selectedItems.length > 0) {
		cascadeText.value = selectedItems.map((item: any) => item.label).join('/')
	}
}

function onDisabledConfirm({ selectedItems }: any) {
	if (selectedItems && selectedItems.length > 0) {
		disabledText.value = selectedItems.map((item: any) => item.label).join(', ')
	}
}

function onTitleConfirm({ selectedItems }: any) {
	if (selectedItems && selectedItems.length > 0) {
		titleText.value = selectedItems.map((item: any) => item.label).join(', ')
	}
}

function onManualConfirm({ selectedItems }: any) {
	if (selectedItems && selectedItems.length > 0) {
		manualText.value = selectedItems.map((item: any) => item.label).join(', ')
	}
}

async function asyncBeforeConfirm(value: number[]) {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (value[0] === 3) {
				uni.showToast({
					title: '选择广州被拒绝',
					icon: 'none'
				})
				resolve(false)
			} else {
				uni.showToast({
					title: '校验通过',
					icon: 'success'
				})
				resolve(true)
			}
		}, 1000)
	})
}

function onBeforeConfirmConfirm({ selectedItems }: any) {
	if (selectedItems && selectedItems.length > 0) {
		beforeConfirmText.value = selectedItems.map((item: any) => item.label).join(', ')
	}
}

function onPickerViewChange(e: any) {
	console.log('picker-view change:', e)
}

function onPickerViewMultiChange(e: any) {
	console.log('picker-view multi change:', e)
}
</script>

<style lang="scss" scoped>
.m-picker-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-picker-row {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;

	&--view {
		padding: 16rpx 0;
		background: #ffffff;
	}
}

.demo-picker-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx;
	border-bottom: 1px solid #f0f0f0;

	&:last-child {
		border-bottom: none;
	}
}

.demo-picker-label {
	font-size: 28rpx;
	color: #323233;
}

.demo-picker-value {
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

.demo-picker-value-text {
	color: #969799;
}
</style>
