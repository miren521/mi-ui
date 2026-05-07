<template>
	<view class="m-input-demo">
		<view class="m-input-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="最简单的输入框使用场景">
				<view class="demo-input-row">
					<m-input v-model="basicValue" placeholder="请输入文本" />
				</view>
				<view class="demo-input-value">
					<text>当前值：{{ basicValue }}</text>
				</view>
			</demo-block>

			<!-- 密码输入框 -->
			<demo-block title="密码输入框" desc="使用 type='password' 和 show-password 属性显示密码切换按钮">
				<view class="demo-input-row">
					<m-input v-model="passwordValue" type="password" show-password placeholder="请输入密码" />
				</view>
			</demo-block>

			<!-- 可清除输入框 -->
			<demo-block title="可清除输入框" desc="设置 clearable 属性显示清除按钮，点击可清空内容">
				<view class="demo-input-row">
					<m-input v-model="clearableValue" clearable placeholder="请输入内容后点击清除" />
				</view>
			</demo-block>

			<!-- 禁用状态 -->
			<demo-block title="禁用状态" desc="设置 disabled 属性禁用输入框，无法进行任何操作">
				<view class="demo-input-row">
					<m-input v-model="disabledValue" disabled placeholder="禁用状态" />
				</view>
			</demo-block>

			<!-- 只读状态 -->
			<demo-block title="只读状态" desc="设置 readonly 属性为只读，可以点击但无法编辑">
				<view class="demo-input-row">
					<m-input v-model="readonlyValue" readonly placeholder="只读状态" />
				</view>
			</demo-block>

			<!-- 带图标输入框 -->
			<demo-block title="带图标输入框" desc="使用 prefix-icon 和 suffix-icon 属性添加前置和后置图标">
				<view class="demo-input-row">
					<m-input v-model="iconValue1" prefix-icon="search" placeholder="搜索内容" />
				</view>
				<view class="demo-input-row" style="margin-top: 20rpx">
					<m-input v-model="iconValue2" suffix-icon="warning" placeholder="带警告提示" />
				</view>
			</demo-block>

			<!-- 字数统计 -->
			<demo-block title="字数统计" desc="设置 show-word-limit 属性显示当前输入字数">
				<view class="demo-input-row">
					<m-input v-model="limitValue" :maxlength="50" show-word-limit placeholder="最多输入50个字" />
				</view>
			</demo-block>

			<!-- 手机号输入 -->
			<demo-block title="手机号输入" desc="type='tel' 用于手机号键盘输入">
				<view class="demo-input-row">
					<m-input v-model="telValue" type="tel" placeholder="请输入手机号" />
				</view>
			</demo-block>

			<!-- 数字输入 -->
			<demo-block title="数字输入" desc="type='number' 弹出数字键盘">
				<view class="demo-input-row">
					<m-input v-model="numberValue" type="number" placeholder="请输入数字" />
				</view>
			</demo-block>

			<!-- 错误状态 -->
			<demo-block title="错误状态" desc="设置 error 属性显示错误样式">
				<view class="demo-input-row">
					<m-input v-model="errorValue" error placeholder="输入错误内容" />
				</view>
			</demo-block>

			<!-- 紧凑模式 -->
			<demo-block title="紧凑模式" desc="设置 compact 属性使用紧凑布局">
				<view class="demo-input-row">
					<m-input v-model="compactValue" compact placeholder="紧凑模式输入框" />
				</view>
			</demo-block>

			<!-- 不同类型的 confirmType -->
			<demo-block title="键盘确认按钮" desc="通过 confirm-type 属性自定义键盘确认按钮文字">
				<view class="demo-input-row">
					<m-input v-model="searchValue" confirm-type="search" placeholder="搜索" @confirm="handleSearch" />
				</view>
				<view class="demo-input-row" style="margin-top: 20rpx">
					<m-input v-model="sendValue" confirm-type="send" placeholder="发送" @confirm="handleSend" />
				</view>
			</demo-block>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const basicValue = ref('');
const passwordValue = ref('');
const clearableValue = ref('可清除的内容');
const disabledValue = ref('禁用状态');
const readonlyValue = ref('只读内容');
const iconValue1 = ref('');
const iconValue2 = ref('');
const limitValue = ref('');
const telValue = ref('');
const numberValue = ref('');
const errorValue = ref('');
const compactValue = ref('');
const searchValue = ref('');
const sendValue = ref('');

function handleSearch() {
	uni.showToast({
		title: '搜索: ' + searchValue.value,
		icon: 'none'
	});
}

function handleSend() {
	uni.showToast({
		title: '发送: ' + sendValue.value,
		icon: 'none'
	});
}
</script>

<style lang="scss" scoped>
.m-input-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-input-row {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
}

.demo-input-value {
	margin-top: 16rpx;
	padding: 12rpx 16rpx;
	background: #f0f2f5;
	border-radius: 4px;
	font-size: 24rpx;
	color: #666;
}
</style>