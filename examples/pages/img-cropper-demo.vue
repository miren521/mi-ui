<template>
	<view class="m-img-cropper-demo">
		<view class="m-img-cropper-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="点击按钮选择图片进行裁剪，支持手势缩放和拖拽">
				<view class="demo-img-cropper-row">
					<m-button type="primary" @click="chooseImage">选择图片裁剪</m-button>
				</view>
				<view v-if="croppedImage" class="demo-img-cropper-preview">
					<text class="demo-img-cropper-preview__title">裁剪结果：</text>
					<image :src="croppedImage" mode="widthFix" class="demo-img-cropper-preview__img" />
				</view>
			</demo-block>

			<!-- 自定义宽高比 -->
			<demo-block title="自定义宽高比" desc="通过 aspect-ratio 属性设置裁剪框的宽高比，默认 1:1">
				<view class="demo-img-cropper-row">
					<view><m-button type="success" @click="chooseImageWithRatio('1:1')">1:1 正方形</m-button></view>
					<view><m-button type="warning" @click="chooseImageWithRatio('4:3')">4:3 横屏</m-button></view>
					<view><m-button type="info" @click="chooseImageWithRatio('16:9')">16:9 宽屏</m-button></view>
					<view><m-button type="danger" @click="chooseImageWithRatio('9:16')">9:16 竖屏</m-button></view>
				</view>
			</demo-block>

			<!-- 禁用旋转 -->
			<demo-block title="禁用旋转" desc="设置 disabled-rotate 属性禁用旋转功能">
				<view class="demo-img-cropper-row">
					<m-button type="primary" @click="chooseImageWithRotate(true)">禁用旋转裁剪</m-button>
				</view>
				<view class="demo-img-cropper-tip">
					<text class="demo-img-cropper-tip__icon">💡</text>
					<text class="demo-img-cropper-tip__text">禁用旋转后，裁剪界面将不会显示旋转按钮</text>
				</view>
			</demo-block>

			<!-- 自定义按钮文字 -->
			<demo-block title="自定义按钮文字" desc="通过 cancel-button-text 和 confirm-button-text 自定义按钮文案">
				<view class="demo-img-cropper-row">
					<m-button type="primary" @click="chooseImageWithCustomText">自定义按钮</m-button>
				</view>
			</demo-block>

			<!-- 组件属性说明 -->
			<demo-block title="组件属性" desc="图片裁剪组件支持的主要属性">
				<view class="demo-img-cropper-props">
					<view class="demo-img-cropper-props__item">
						<text class="demo-img-cropper-props__name">model-value</text>
						<text class="demo-img-cropper-props__type">Boolean</text>
						<text class="demo-img-cropper-props__desc">控制裁剪组件的显示/隐藏</text>
					</view>
					<view class="demo-img-cropper-props__item">
						<text class="demo-img-cropper-props__name">img-src</text>
						<text class="demo-img-cropper-props__type">String</text>
						<text class="demo-img-cropper-props__desc">待裁剪图片的路径</text>
					</view>
					<view class="demo-img-cropper-props__item">
						<text class="demo-img-cropper-props__name">aspect-ratio</text>
						<text class="demo-img-cropper-props__type">String</text>
						<text class="demo-img-cropper-props__desc">裁剪框宽高比，如 '1:1'、'16:9'</text>
					</view>
					<view class="demo-img-cropper-props__item">
						<text class="demo-img-cropper-props__name">disabled-rotate</text>
						<text class="demo-img-cropper-props__type">Boolean</text>
						<text class="demo-img-cropper-props__desc">是否禁用旋转功能</text>
					</view>
					<view class="demo-img-cropper-props__item">
						<text class="demo-img-cropper-props__name">file-type</text>
						<text class="demo-img-cropper-props__type">String</text>
						<text class="demo-img-cropper-props__desc">输出图片格式：png、jpg、jpeg</text>
					</view>
					<view class="demo-img-cropper-props__item">
						<text class="demo-img-cropper-props__name">quality</text>
						<text class="demo-img-cropper-props__type">Number</text>
						<text class="demo-img-cropper-props__desc">输出图片质量，范围 0-1</text>
					</view>
				</view>
			</demo-block>
		</view>

		<!-- 图片裁剪组件 -->
		<m-img-cropper
			v-model="showCropper"
			:img-src="currentImgSrc"
			:aspect-ratio="currentAspectRatio"
			:disabled-rotate="disabledRotate"
			:cancel-button-text="cancelButtonText"
			:confirm-button-text="confirmButtonText"
			@confirm="handleConfirm"
			@cancel="handleCancel"
			@imgloaded="handleImgLoaded"
			@imgloaderror="handleImgLoadError"
		/>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 裁剪组件显示状态
const showCropper = ref(false)
// 当前图片路径
const currentImgSrc = ref('')
// 当前宽高比
const currentAspectRatio = ref('1:1')
// 是否禁用旋转
const disabledRotate = ref(false)
// 取消按钮文字
const cancelButtonText = ref('')
// 确认按钮文字
const confirmButtonText = ref('')
// 裁剪后的图片
const croppedImage = ref('')

/**
 * 选择图片
 */
function chooseImage() {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			currentImgSrc.value = res.tempFilePaths[0]
			currentAspectRatio.value = '1:1'
			disabledRotate.value = false
			cancelButtonText.value = ''
			confirmButtonText.value = ''
			showCropper.value = true
		},
		fail: () => {
			uni.showToast({
				title: '选择图片失败',
				icon: 'none'
			})
		}
	})
}

/**
 * 选择图片并指定宽高比
 */
function chooseImageWithRatio(ratio: string) {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			currentImgSrc.value = res.tempFilePaths[0]
			currentAspectRatio.value = ratio
			disabledRotate.value = false
			cancelButtonText.value = ''
			confirmButtonText.value = ''
			showCropper.value = true
		},
		fail: () => {
			uni.showToast({
				title: '选择图片失败',
				icon: 'none'
			})
		}
	})
}

/**
 * 选择图片并禁用旋转
 */
function chooseImageWithRotate(disabled: boolean) {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			currentImgSrc.value = res.tempFilePaths[0]
			currentAspectRatio.value = '1:1'
			disabledRotate.value = disabled
			cancelButtonText.value = ''
			confirmButtonText.value = ''
			showCropper.value = true
		},
		fail: () => {
			uni.showToast({
				title: '选择图片失败',
				icon: 'none'
			})
		}
	})
}

/**
 * 选择图片并使用自定义按钮文字
 */
function chooseImageWithCustomText() {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			currentImgSrc.value = res.tempFilePaths[0]
			currentAspectRatio.value = '1:1'
			disabledRotate.value = false
			cancelButtonText.value = '放弃'
			confirmButtonText.value = '完成'
			showCropper.value = true
		},
		fail: () => {
			uni.showToast({
				title: '选择图片失败',
				icon: 'none'
			})
		}
	})
}

/**
 * 处理裁剪确认
 */
function handleConfirm(result: { tempFilePath: string; width: number; height: number }) {
	croppedImage.value = result.tempFilePath
	uni.showToast({
		title: '裁剪成功',
		icon: 'success'
	})
}

/**
 * 处理裁剪取消
 */
function handleCancel() {
	uni.showToast({
		title: '已取消裁剪',
		icon: 'none'
	})
}

/**
 * 处理图片加载完成
 */
function handleImgLoaded(res: any) {
	console.log('图片加载完成:', res)
}

/**
 * 处理图片加载失败
 */
function handleImgLoadError(err: any) {
	uni.showToast({
		title: '图片加载失败',
		icon: 'none'
	})
	console.error('图片加载失败:', err)
}
</script>

<style lang="scss" scoped>
.m-img-cropper-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-img-cropper-row {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	align-items: center;
	justify-content: flex-start;
}

.demo-img-cropper-preview {
	margin-top: 24rpx;
	padding: 16rpx;
	background: #fff;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

	&__title {
		display: block;
		font-size: 28rpx;
		color: #666;
		margin-bottom: 12rpx;
	}

	&__img {
		display: block;
		max-width: 100%;
		border-radius: 8rpx;
	}
}

.demo-img-cropper-tip {
	display: flex;
	align-items: center;
	padding: 16rpx;
	background: #fffbe6;
	border-radius: 8rpx;
	margin-top: 16rpx;

	&__icon {
		font-size: 32rpx;
		margin-right: 12rpx;
	}

	&__text {
		font-size: 26rpx;
		color: #8b7355;
	}
}

.demo-img-cropper-code {
	margin-top: 16rpx;
	padding: 20rpx;
	background: #f5f5f5;
	border-radius: 8rpx;
	font-family: monospace;
	font-size: 24rpx;
	color: #333;
	white-space: pre-wrap;
	line-height: 1.6;
}

.demo-img-cropper-props {
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;

	&__item {
		display: flex;
		align-items: center;
		padding: 16rpx 20rpx;
		border-bottom: 1rpx solid #f0f0f0;

		&:last-child {
			border-bottom: none;
		}
	}

	&__name {
		flex: 0 0 200rpx;
		font-size: 26rpx;
		color: #6366f1;
		font-weight: 500;
	}

	&__type {
		flex: 0 0 120rpx;
		font-size: 24rpx;
		color: #f59e0b;
		background: #fffbeb;
		padding: 4rpx 12rpx;
		border-radius: 4rpx;
		text-align: center;
	}

	&__desc {
		flex: 1;
		font-size: 26rpx;
		color: #666;
		margin-left: 16rpx;
	}
}
</style>
