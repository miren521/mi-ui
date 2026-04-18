<template>
	<view class="m-button-demo">
		<view class="m-button-demo__container">
			<!-- 基础用法 -->
			<m-demo-block title="基础用法" desc="">
				<view class="demo-button-row">
					<m-button type="primary" class="fit-content-btn">主要按钮</m-button>
					<m-button type="success" class="fit-content-btn">成功按钮</m-button>
					<m-button type="warning" class="fit-content-btn">警告按钮</m-button>
					<m-button type="danger" class="fit-content-btn">危险按钮</m-button>
					<m-button type="info" class="fit-content-btn">信息按钮</m-button>
				</view>
			</m-demo-block>

			<!-- 按钮尺寸 -->
			<m-demo-block title="按钮尺寸" desc="支持 large、medium、small 三种尺寸">
				<view class="demo-button-row">
					<m-button type="primary" size="large" class="fit-content-btn">大按钮</m-button>
					<m-button type="primary" size="medium" class="fit-content-btn">中按钮</m-button>
					<m-button type="primary" size="small" class="fit-content-btn">小按钮</m-button>
				</view>
			</m-demo-block>

			<!-- 朴素按钮 -->
			<m-demo-block title="朴素按钮" desc="透明背景，彩色边框和文字">
				<view class="demo-button-row">
					<m-button type="primary" plain class="fit-content-btn">主要按钮</m-button>
					<m-button type="success" plain class="fit-content-btn">成功按钮</m-button>
					<m-button type="warning" plain class="fit-content-btn">警告按钮</m-button>
					<m-button type="danger" plain class="fit-content-btn">危险按钮</m-button>
					<m-button type="info" plain class="fit-content-btn">信息按钮</m-button>
				</view>
			</m-demo-block>

			<!-- 圆角按钮 -->
			<m-demo-block title="圆角按钮" desc="使用 round 属性创建圆角按钮">
				<view class="demo-button-row">
					<m-button type="primary" round class="fit-content-btn">圆角主要按钮</m-button>
					<m-button type="success" round class="fit-content-btn">圆角成功按钮</m-button>
					<m-button type="warning" round class="fit-content-btn">圆角警告按钮</m-button>
				</view>
			</m-demo-block>

			<!-- 禁用状态 -->
			<m-demo-block title="禁用状态" desc="使用 disabled 属性禁用按钮">
				<view class="demo-button-row">
					<m-button type="primary" disabled class="fit-content-btn">主要按钮</m-button>
					<m-button type="success" disabled class="fit-content-btn">成功按钮</m-button>
					<m-button type="warning" disabled class="fit-content-btn">警告按钮</m-button>
					<m-button type="danger" disabled class="fit-content-btn">危险按钮</m-button>
					
					<m-button type="primary" plain disabled class="fit-content-btn">主要按钮</m-button>
					<m-button type="success" plain disabled class="fit-content-btn">成功按钮</m-button>
					<m-button type="warning" plain disabled class="fit-content-btn">警告按钮</m-button>
					<m-button type="danger" plain disabled class="fit-content-btn">危险按钮</m-button>
				</view>
			</m-demo-block>

			<!-- 加载状态 -->
			<m-demo-block title="加载状态" desc="使用 loading 属性显示加载状态，点击后模拟异步请求">
				<view class="demo-button-row">
					<m-button type="primary" loading class="fit-content-btn">加载中按钮</m-button>
					<m-button type="success" :loading="isLoading" @click="handleLoading" class="fit-content-btn">
						{{ isLoading ? '加载中...' : '点击加载' }}
					</m-button>
					<m-button loading type="warning" plain class="fit-content-btn">朴素加载按钮</m-button>
				</view>
			</m-demo-block>

			<!-- 主题定制 -->
			<m-demo-block title="主题定制" desc="通过 CSS 变量实时修改主题色">
				<div class="demo-button-theme">
					<div class="demo-button-theme__item">
						<span class="demo-button-theme__label">主要按钮背景色:</span>
						<input type="color" v-model="primaryColor" @change="updateTheme" class="demo-button-theme__color" />
						<span class="demo-button-theme__value">{{ primaryColor }}</span>
					</div>
					<div class="demo-button-row" style="margin-top: 16px">
						<m-button type="primary" class="fit-content-btn">主题预览按钮</m-button>
						<m-button type="primary" plain class="fit-content-btn">朴素主题按钮</m-button>
						<m-button type="primary" round class="fit-content-btn">圆角主题按钮</m-button>
					</div>
				</div>
			</m-demo-block>
		</view>
	</view>
</template>

<script setup>
import MButton from '../../packages/button/index.js';
import { ref, onMounted } from 'vue';

// 加载状态
const isLoading = ref(false);

// 主题颜色
const primaryColor = ref('#4D80F0');

// 加载状态处理
function handleLoading() {
	isLoading.value = true;
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
}

// 更新主题
function updateTheme() {
	document.documentElement.style.setProperty('--m-button-primary-bg-color', primaryColor.value);
}

// 初始化时获取当前主题色
onMounted(() => {
	const computedStyle = getComputedStyle(document.documentElement);
	primaryColor.value = computedStyle.getPropertyValue('--m-button-primary-bg-color').trim();
});
</script>

<style lang="scss">
.m-button-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-button-row {
	// display: flex;
	// flex-wrap: wrap;
	// gap: 20rpx;
	// align-items: center;
	// justify-content: flex-start;

	.fit-content-btn {
		margin: 10rpx 20rpx 10rpx 0;
	}
}

.demo-button-theme {
	width: 100%;

	&__item {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	&__label {
		font-size: 14px;
		color: #666;
		margin-right: 12px;
	}

	&__color {
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		margin-right: 12px;
	}

	&__value {
		font-size: 14px;
		color: #666;
		font-family: monospace;
	}
}
</style>
