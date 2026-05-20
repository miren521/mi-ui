<template>
	<view class="m-select-picker-demo">
		<view class="m-select-picker-demo__container">
			<!-- 基础多选 -->
			<demo-block title="基础多选" desc="默认类型为 checkbox，支持多选">
				<view class="demo-select-picker-row">
					<m-cell 
						title="选择城市" 
						:value="checkboxLabels || '请选择'"
						clickable
						@click="openCheckboxPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="checkboxValue"
						:columns="cityColumns"
						type="checkbox"
						title="选择城市"
						ref="checkboxPicker"
					/>
				</view>
			</demo-block>

			<!-- 单选模式 -->
			<demo-block title="单选模式" desc="设置 type 为 radio，只允许选择一项">
				<view class="demo-select-picker-row">
					<m-cell 
						title="选择性别" 
						:value="radioLabels || '请选择'"
						clickable
						@click="openRadioPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="radioValue"
						:columns="genderColumns"
						type="radio"
						title="选择性别"
						ref="radioPicker"
					/>
				</view>
			</demo-block>

			<!-- 可搜索 -->
			<demo-block title="可搜索" desc="设置 filterable 开启搜索功能，支持高亮匹配文本">
				<view class="demo-select-picker-row">
					<m-cell 
						title="搜索城市" 
						:value="filterLabels || '请选择'"
						clickable
						@click="openFilterPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="filterValue"
						:columns="cityColumns"
						type="checkbox"
						title="搜索城市"
						filterable
						filter-placeholder="请输入城市名称"
						ref="filterPicker"
					/>
				</view>
			</demo-block>

			<!-- 自定义颜色 -->
			<demo-block title="自定义颜色" desc="通过 checked-color 设置选中颜色">
				<view class="demo-select-picker-row">
					<m-cell 
						title="选择水果" 
						:value="colorLabels || '请选择'"
						clickable
						@click="openColorPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="colorValue"
						:columns="fruitColumns"
						type="checkbox"
						title="选择水果"
						checked-color="#ff6b6b"
						ref="colorPicker"
					/>
				</view>
			</demo-block>

			<!-- 数量限制 -->
			<demo-block title="数量限制" desc="设置 min 和 max 限制选中数量范围">
				<view class="demo-select-picker-row">
					<m-cell 
						title="选择爱好" 
						:value="limitLabels || '请选择(至少2项，最多4项)'"
						clickable
						@click="openLimitPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="limitValue"
						:columns="hobbyColumns"
						type="checkbox"
						title="选择爱好"
						:min="2"
						:max="4"
						ref="limitPicker"
					/>
				</view>
			</demo-block>

			<!-- 禁用选项 -->
			<demo-block title="禁用选项" desc="在 columns 中设置 disabled 禁用特定选项">
				<view class="demo-select-picker-row">
					<m-cell 
						title="选择部门" 
						:value="disabledLabels || '请选择'"
						clickable
						@click="openDisabledPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="disabledValue"
						:columns="departmentColumns"
						type="checkbox"
						title="选择部门"
						ref="disabledPicker"
					/>
				</view>
			</demo-block>

			<!-- 加载状态 -->
			<demo-block title="加载状态" desc="设置 loading 显示加载动画，禁用交互，每次打开都会模拟加载过程">
				<view class="demo-select-picker-row">
					<m-cell 
						title="加载示例" 
						:value="loadingLabels || '点击打开'"
						clickable
						@click="openLoadingPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="loadingValue"
						:columns="loadingColumns"
						type="checkbox"
						title="加载中"
						:loading="isLoading"
						loading-color="#ff6b6b"
						ref="loadingPicker"
					/>
				</view>
			</demo-block>

			<!-- 自定义确认按钮 -->
			<demo-block title="自定义按钮" desc="通过 confirm-button-text 自定义确认按钮文案">
				<view class="demo-select-picker-row">
					<m-cell 
						title="选择选项" 
						:value="customBtnLabels || '请选择'"
						clickable
						@click="openCustomBtnPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="customBtnValue"
						:columns="simpleColumns"
						type="checkbox"
						title="选择选项"
						confirm-button-text="提交"
						ref="customBtnPicker"
					/>
				</view>
			</demo-block>

			<!-- 单选不显示确认按钮 -->
			<demo-block title="单选即时选择" desc="radio 模式下设置 show-confirm 为 false，选择后立即确认">
				<view class="demo-select-picker-row">
					<m-cell 
						title="选择等级" 
						:value="instantLabels || '请选择'"
						clickable
						@click="openInstantPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="instantValue"
						:columns="levelColumns"
						type="radio"
						title="选择等级"
						:show-confirm="false"
						ref="instantPicker"
					/>
				</view>
			</demo-block>

			<!-- 事件监听 -->
			<demo-block title="事件监听" desc="支持 change、confirm、cancel、open、close 事件">
				<view class="demo-select-picker-row">
					<m-cell 
						title="选择" 
						:value="eventLabels || '请选择'"
						clickable
						@click="openEventPicker"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-select-picker
						v-model="eventValue"
						:columns="simpleColumns"
						type="checkbox"
						title="事件演示"
						@change="handleChange"
						@confirm="handleConfirm"
						@cancel="handleCancel"
						@open="handleOpen"
						@close="handleClose"
						ref="eventPicker"
					/>
				</view>
				<view class="demo-select-picker-events">
					<text>事件日志：{{ eventLog }}</text>
				</view>
			</demo-block>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const checkboxValue = ref<string[]>([]);
const radioValue = ref<string>('');
const filterValue = ref<string[]>([]);
const colorValue = ref<string[]>([]);
const limitValue = ref<string[]>([]);
const disabledValue = ref<string[]>([]);
const loadingValue = ref<string[]>([]);
const loadingColumns = ref<any[]>([]);
const isLoading = ref(true);
const customBtnValue = ref<string[]>([]);
const instantValue = ref<string>('');
const eventValue = ref<string[]>([]);
const eventLog = ref('');

const checkboxPicker = ref<any>(null);
const radioPicker = ref<any>(null);
const filterPicker = ref<any>(null);
const colorPicker = ref<any>(null);
const limitPicker = ref<any>(null);
const disabledPicker = ref<any>(null);
const loadingPicker = ref<any>(null);
const customBtnPicker = ref<any>(null);
const instantPicker = ref<any>(null);
const eventPicker = ref<any>(null);

const cityColumns = ref([
	{ value: 'beijing', label: '北京' },
	{ value: 'shanghai', label: '上海' },
	{ value: 'guangzhou', label: '广州' },
	{ value: 'shenzhen', label: '深圳' },
	{ value: 'chengdu', label: '成都' },
	{ value: 'hangzhou', label: '杭州' },
	{ value: 'wuhan', label: '武汉' },
	{ value: 'xian', label: '西安' },
]);

const genderColumns = ref([
	{ value: 'male', label: '男' },
	{ value: 'female', label: '女' },
	{ value: 'other', label: '其他' },
]);

const fruitColumns = ref([
	{ value: 'apple', label: '苹果' },
	{ value: 'banana', label: '香蕉' },
	{ value: 'orange', label: '橙子' },
	{ value: 'grape', label: '葡萄' },
	{ value: 'watermelon', label: '西瓜' },
]);

const hobbyColumns = ref([
	{ value: 'reading', label: '阅读' },
	{ value: 'sports', label: '运动' },
	{ value: 'music', label: '音乐' },
	{ value: 'travel', label: '旅行' },
	{ value: 'cooking', label: '烹饪' },
	{ value: 'photography', label: '摄影' },
]);

const departmentColumns = ref([
	{ value: 'tech', label: '技术部', disabled: true },
	{ value: 'product', label: '产品部' },
	{ value: 'design', label: '设计部' },
	{ value: 'marketing', label: '市场部', disabled: true },
	{ value: 'sales', label: '销售部' },
]);

const simpleColumns = ref([
	{ value: 'option1', label: '选项一' },
	{ value: 'option2', label: '选项二' },
	{ value: 'option3', label: '选项三' },
	{ value: 'option4', label: '选项四' },
]);

const levelColumns = ref([
	{ value: 'primary', label: '初级' },
	{ value: 'intermediate', label: '中级' },
	{ value: 'advanced', label: '高级' },
	{ value: 'expert', label: '专家' },
]);

// 根据 value 获取 label
function getLabels(columns: any[], values: string[] | string): string {
	if (!values || (Array.isArray(values) && values.length === 0)) {
		return '';
	}
	if (Array.isArray(values)) {
		return values.map(v => {
			const item = columns.find(col => col.value === v);
			return item ? item.label : v;
		}).join(',');
	}
	const item = columns.find(col => col.value === values);
	return item ? item.label : values;
}

// 计算选中的中文标签
const checkboxLabels = computed(() => getLabels(cityColumns.value, checkboxValue.value));
const radioLabels = computed(() => getLabels(genderColumns.value, radioValue.value));
const filterLabels = computed(() => getLabels(cityColumns.value, filterValue.value));
const colorLabels = computed(() => getLabels(fruitColumns.value, colorValue.value));
const limitLabels = computed(() => getLabels(hobbyColumns.value, limitValue.value));
const disabledLabels = computed(() => getLabels(departmentColumns.value, disabledValue.value));
const customBtnLabels = computed(() => getLabels(simpleColumns.value, customBtnValue.value));
const instantLabels = computed(() => getLabels(levelColumns.value, instantValue.value));
const eventLabels = computed(() => getLabels(simpleColumns.value, eventValue.value));
const loadingLabels = computed(() => getLabels(loadingColumns.value, loadingValue.value));

function openCheckboxPicker() {
	checkboxPicker.value?.open();
}

function openRadioPicker() {
	radioPicker.value?.open();
}

function openFilterPicker() {
	filterPicker.value?.open();
}

function openColorPicker() {
	colorPicker.value?.open();
}

function openLimitPicker() {
	limitPicker.value?.open();
}

function openDisabledPicker() {
	disabledPicker.value?.open();
}

function openLoadingPicker() {
	// 重置加载状态
	isLoading.value = true;
	loadingColumns.value = [];
	loadingValue.value = [];
	
	loadingPicker.value?.open();
	
	// 模拟2秒后加载成功
	setTimeout(() => {
		isLoading.value = false;
		loadingColumns.value = [
			{ value: 'item1', label: '加载成功项一' },
			{ value: 'item2', label: '加载成功项二' },
			{ value: 'item3', label: '加载成功项三' },
			{ value: 'item4', label: '加载成功项四' },
		];
	}, 1500);
}

function openCustomBtnPicker() {
	customBtnPicker.value?.open();
}

function openInstantPicker() {
	instantPicker.value?.open();
}

function openEventPicker() {
	eventPicker.value?.open();
}

function handleChange(e: any) {
	eventLog.value = `change: ${JSON.stringify(e.value)}`;
	console.log('change', e);
}

function handleConfirm(e: any) {
	eventLog.value = `confirm: ${JSON.stringify(e)}`;
	uni.showToast({ title: '确认选择', icon: 'none' });
	console.log('confirm', e);
}

function handleCancel() {
	eventLog.value = 'cancel';
	uni.showToast({ title: '取消选择', icon: 'none' });
	console.log('cancel');
}

function handleOpen() {
	eventLog.value = 'open';
	console.log('open');
}

function handleClose() {
	eventLog.value = 'close';
	console.log('close');
}
</script>

<style lang="scss" scoped>
.m-select-picker-demo {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding: 20rpx 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20rpx;
	}
}

.demo-select-picker-row {
	background: #ffffff;
	border-radius: 8rpx;
	padding: 0;
	overflow: hidden;

	:deep(.m-cell) {
		margin-bottom: 0;
	}
}

.demo-select-picker-events {
	margin-top: 16rpx;
	padding: 16rpx;
	background: #f0f0f0;
	border-radius: 8rpx;
	font-size: 24rpx;
	color: #666;
	word-break: break-all;
}
</style>