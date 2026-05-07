<template>
	<view class="m-curtain-demo">
		<view class="m-curtain-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="最基础的幕帘展示，点击关闭按钮关闭">
				<view class="demo-curtain-row">
					<m-button type="primary" @click="showBasic = true">打开幕帘</m-button>
				</view>
				<m-curtain v-model="showBasic" :src="imageUrl">
				</m-curtain>
			</demo-block>

			<!-- 关闭按钮位置 -->
			<demo-block title="关闭按钮位置" desc="通过 closePosition 属性设置关闭按钮位置">
				<view class="demo-curtain-row">
					<m-button type="primary" size="small" @click="openCurtain('inset')">默认位置</m-button>
					<m-button type="primary" size="small" @click="openCurtain('top')">顶部居中</m-button>
					<m-button type="primary" size="small" @click="openCurtain('bottom')">底部居中</m-button>
					<m-button type="primary" size="small" @click="openCurtain('top-right')">右上</m-button>
				</view>
				<m-curtain v-model="showPosition" :src="imageUrl" :closePosition="currentPosition">
				</m-curtain>
			</demo-block>

			<!-- 点击图片关闭 -->
			<demo-block title="点击图片关闭" desc="设置 closeOnClick 为 true，点击图片即可关闭幕帘">
				<view class="demo-curtain-row">
					<m-button type="success" @click="showClickClose = true">打开幕帘</m-button>
				</view>
				<m-curtain v-model="showClickClose" :src="imageUrl" :closeOnClick="true">
				</m-curtain>
			</demo-block>

			<!-- 点击遮罩关闭 -->
			<demo-block title="点击遮罩关闭" desc="设置 closeOnClickModal 为 true，点击遮罩即可关闭幕帘">
				<view class="demo-curtain-row">
					<m-button type="warning" @click="showModalClose = true">打开幕帘</m-button>
				</view>
				<m-curtain v-model="showModalClose" :src="imageUrl" :closeOnClickModal="true">
				</m-curtain>
			</demo-block>

			<!-- 自定义关闭按钮 -->
			<demo-block title="自定义关闭按钮" desc="通过 close 插槽自定义关闭按钮样式">
				<view class="demo-curtain-row">
					<m-button type="info" @click="showCustomClose = true">打开幕帘</m-button>
				</view>
				<m-curtain v-model="showCustomClose" :src="imageUrl">
					<template #close>
						<view class="custom-close-btn" @click="showCustomClose = false">
							<text class="custom-close-text">关闭</text>
						</view>
					</template>
				</m-curtain>
			</demo-block>

			<!-- 自定义图片宽度 -->
			<demo-block title="自定义图片宽度" desc="通过 width 属性设置图片宽度，高度会自动按比例缩放">
				<view class="demo-curtain-row">
					<m-button type="primary" @click="showCustomWidth = true">打开幕帘</m-button>
				</view>
				<m-curtain v-model="showCustomWidth" :src="imageUrl" :width="300">
				</m-curtain>
			</demo-block>

			<!-- 禁用点击关闭 -->
			<demo-block title="禁用点击关闭" desc="设置 closeOnClick 为 false，点击图片不会关闭幕帘">
				<view class="demo-curtain-row">
					<m-button type="danger" @click="showNoClickClose = true">打开幕帘</m-button>
				</view>
				<m-curtain v-model="showNoClickClose" :src="imageUrl" :closeOnClick="false">
				</m-curtain>
			</demo-block>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例图片地址（使用网络图片）
const imageUrl = ref('/static/img/img_2.jpg');

// 控制各演示场景的显示状态
const showBasic = ref(false);
const showPosition = ref(false);
const currentPosition = ref('inset');
const showClickClose = ref(false);
const showModalClose = ref(false);
const showCustomClose = ref(false);
const showCustomWidth = ref(false);
const showNoClickClose = ref(false);

function openCurtain(position: string) {
	currentPosition.value = position;
	showPosition.value = true;
}
</script>

<style lang="scss" scoped>
.m-curtain-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-curtain-row {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.custom-close-btn {
	position: absolute;
	bottom: 30px;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(0, 0, 0, 0.6);
	padding: 12px 32px;
	border-radius: 30px;
	backdrop-filter: blur(10px);
}

.custom-close-text {
	color: #fff;
	font-size: 16px;
	font-weight: 500;
}
</style>