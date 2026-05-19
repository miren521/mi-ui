<template>
	<view class="m-search-demo">
		<view class="m-search-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="默认样式，包含搜索图标和取消按钮">
				<view class="demo-search-row">
					<m-search v-model="basicValue" />
				</view>
			</demo-block>

			<!-- 样式变体 -->
			<demo-block title="样式变体" desc="支持三种样式：filled（深色背景）、plain（边框模式）、light（浅色背景）">
				<view class="demo-search-row demo-search-row--bg">
					<m-search v-model="filledValue" variant="filled" placeholder="深色背景" />
				</view>
				<view class="demo-search-row demo-search-row--bg" style="margin-top: 20rpx">
					<m-search v-model="plainValue" variant="plain" placeholder="边框模式" />
				</view>
				<view class="demo-search-row demo-search-row--bg" style="margin-top: 20rpx">
					<m-search v-model="lightValue" variant="light" placeholder="浅色背景" />
				</view>
			</demo-block>

			<!-- 自定义取消按钮 -->
			<demo-block title="自定义取消按钮" desc="通过 cancel-txt 自定义右侧按钮文字">
				<view class="demo-search-row">
					<m-search v-model="cancelValue" cancel-txt="搜索" placeholder="点击搜索" />
				</view>
			</demo-block>

			<!-- 隐藏取消按钮 -->
			<demo-block title="隐藏取消按钮" desc="设置 hide-cancel 隐藏右侧按钮，适合嵌入场景">
				<view class="demo-search-row">
					<m-search v-model="hideCancelValue" hide-cancel placeholder="隐藏取消按钮" />
				</view>
			</demo-block>

			<!-- 带扫一扫的搜索框 -->
			<demo-block title="扫一扫功能" desc="使用 prefix 插槽添加扫一扫按钮，模拟真实搜索场景">
				<view class="demo-search-row">
					<m-search v-model="scanValue" placeholder="搜索商品">
						<template #prefix>
							<view class="demo-search-scan-btn" @click="handleScan">
								<m-icon name="fullscreen" custom-class="demo-search-scan-icon" />
							</view>
						</template>
					</m-search>
				</view>
			</demo-block>

			<!-- 带语音搜索的搜索框 -->
			<demo-block title="语音搜索" desc="使用 input-suffix 插槽添加语音输入按钮">
				<view class="demo-search-row">
					<m-search v-model="voiceValue" placeholder="语音搜索">
						<template #input-suffix>
							<view class="demo-search-voice-btn" :class="{ 'active': isRecording }" @click="handleVoice">
								<m-icon :name="isRecording ? 'mfill' : 'mic'" custom-class="demo-search-voice-icon" />
							</view>
						</template>
					</m-search>
				</view>
			</demo-block>

			<!-- 带热门搜索标签 -->
			<demo-block title="热门搜索" desc="使用 prefix 插槽添加热门标签标识">
				<view class="demo-search-row">
					<m-search v-model="hotValue" placeholder="热门搜索">
						<template #prefix>
							<view class="demo-search-hot-tag">
								<m-tag type="warning">热门</m-tag>
							</view>
						</template>
					</m-search>
				</view>
			</demo-block>

			<!-- 自定义右侧按钮 -->
			<demo-block title="自定义右侧按钮" desc="使用 suffix 插槽自定义右侧操作区域">
				<view class="demo-search-row">
					<m-search v-model="suffixValue" placeholder="搜索内容">
						<template #suffix>
							<m-button type="primary" size="small" @click="handleCustomSearch">搜索</m-button>
						</template>
					</m-search>
				</view>
			</demo-block>

			<!-- 高级搜索入口 -->
			<demo-block title="高级搜索" desc="组合使用多个插槽，实现高级搜索功能入口">
				<view class="demo-search-row">
					<m-search v-model="advancedValue" placeholder="输入关键词">
						<template #prefix>
							<view class="demo-search-advanced-btn" @click="handleAdvanced">
								<m-icon name="filter-line" custom-class="demo-search-advanced-icon" />
							</view>
						</template>
						<template #input-suffix>
							<view class="demo-search-qrcode-btn" @click="handleQrcode">
								<m-icon name="qrcode-line" custom-class="demo-search-qrcode-icon" />
							</view>
						</template>
						<template #suffix>
							<view class="demo-search-cancel-btn" @click="handleAdvancedCancel">取消</view>
						</template>
					</m-search>
				</view>
			</demo-block>

			<!-- 多图标组合 -->
			<demo-block title="多图标组合" desc="在输入框内添加多个功能图标">
				<view class="demo-search-row">
					<m-search v-model="multiValue" placeholder="搜索">
						<template #prefix>
							<view class="demo-search-prefix-group">
								<m-icon name="search-line" custom-class="demo-search-prefix-icon" />
							</view>
						</template>
						<template #input-suffix>
							<view class="demo-search-suffix-group">
								<m-icon name="mic-line" custom-class="demo-search-mic-icon" @click="handleVoice" />
								<m-icon name="scan-line" custom-class="demo-search-scan-icon-small" @click="handleScan" />
							</view>
						</template>
					</m-search>
				</view>
			</demo-block>

			<!-- 事件监听 -->
			<demo-block title="事件监听" desc="支持 change、search、focus、blur、clear、cancel 事件">
				<view class="demo-search-row">
					<m-search 
						v-model="eventValue" 
						placeholder="输入内容触发事件"
						@change="handleChange"
						@search="handleSearch"
						@focus="handleFocus"
						@blur="handleBlur"
						@clear="handleClear"
						@cancel="handleCancel"
					/>
				</view>
				<view class="demo-search-events">
					<text>事件日志：{{ eventLog }}</text>
				</view>
			</demo-block>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const basicValue = ref('');
const filledValue = ref('');
const plainValue = ref('');
const lightValue = ref('');
const cancelValue = ref('');
const hideCancelValue = ref('');
const scanValue = ref('');
const voiceValue = ref('');
const isRecording = ref(false);
const hotValue = ref('');
const suffixValue = ref('');
const advancedValue = ref('');
const multiValue = ref('');
const eventValue = ref('');
const eventLog = ref('');

function handleScan() {
	uni.showToast({ title: '打开扫一扫', icon: 'none' });
}

function handleVoice() {
	isRecording.value = !isRecording.value;
	if (isRecording.value) {
		uni.showToast({ title: '开始录音', icon: 'none' });
		setTimeout(() => {
			isRecording.value = false;
			uni.showToast({ title: '录音结束', icon: 'none' });
		}, 3000);
	}
}

function handleCustomSearch() {
	uni.showToast({ title: '搜索: ' + suffixValue.value, icon: 'none' });
}

function handleAdvanced() {
	uni.showToast({ title: '打开高级搜索', icon: 'none' });
}

function handleQrcode() {
	uni.showToast({ title: '扫码识别', icon: 'none' });
}

function handleAdvancedCancel() {
	advancedValue.value = '';
	uni.showToast({ title: '已清空', icon: 'none' });
}

function handleChange(e: any) {
	eventLog.value = `change: ${e.value}`;
}

function handleSearch(e: any) {
	eventLog.value = `search: ${e.value}`;
	uni.showToast({ title: '搜索: ' + e.value, icon: 'none' });
}

function handleFocus() {
	eventLog.value = 'focus';
}

function handleBlur() {
	eventLog.value = 'blur';
}

function handleClear() {
	eventLog.value = 'clear';
}

function handleCancel() {
	eventLog.value = 'cancel';
	uni.showToast({ title: '取消搜索', icon: 'none' });
}
</script>

<style lang="scss" scoped>
.m-search-demo {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding: 20rpx 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20rpx;
	}
}

.demo-search-row {
	background: #ffffff;
	border-radius: 8rpx;
	overflow: hidden;

	&--bg {
		background: transparent;
		border-radius: 0;
	}
}

.demo-search-scan-btn {
	padding: 0 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.demo-search-scan-icon {
	font-size: 36rpx;
	color: #1989fa;
}

.demo-search-voice-btn {
	padding: 0 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: color 0.3s;

	&.active {
		.demo-search-voice-icon {
			color: #ff6b6b;
			animation: pulse 1s infinite;
		}
	}
}

.demo-search-voice-icon {
	font-size: 36rpx;
	color: #1989fa;
}

.demo-search-hot-tag {
	padding: 0 16rpx;
}

.demo-search-advanced-btn {
	padding: 0 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.demo-search-advanced-icon {
	font-size: 32rpx;
	color: #999;
}

.demo-search-qrcode-btn {
	padding: 0 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.demo-search-qrcode-icon {
	font-size: 32rpx;
	color: #1989fa;
}

.demo-search-cancel-btn {
	padding: 0 24rpx;
	font-size: 28rpx;
	color: #666;
}

.demo-search-prefix-group {
	padding: 0 8rpx;
	display: flex;
	align-items: center;
}

.demo-search-prefix-icon {
	font-size: 32rpx;
	color: #999;
}

.demo-search-suffix-group {
	display: flex;
	align-items: center;
	padding: 0 8rpx;
	gap: 16rpx;
}

.demo-search-mic-icon {
	font-size: 32rpx;
	color: #1989fa;
}

.demo-search-scan-icon-small {
	font-size: 32rpx;
	color: #1989fa;
}

.demo-search-events {
	margin-top: 16rpx;
	padding: 16rpx;
	background: #f0f0f0;
	border-radius: 8rpx;
	font-size: 24rpx;
	color: #666;
	word-break: break-all;
}

@keyframes pulse {
	0%, 100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
}
</style>