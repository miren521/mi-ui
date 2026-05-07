<template>
	<view class="m-watermark-demo">
		<view class="m-watermark-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="最简单的文本水印，只需设置 content 属性">
				<view class="demo-watermark-row">
					<view class="demo-watermark-box">
						<m-watermark content="水印文字" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>基础水印示例</p>
							<p>content: '水印文字'</p>
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 自定义颜色和大小 -->
			<demo-block title="自定义颜色和大小" desc="通过 color 属性设置文字颜色，size 属性设置字体大小">
				<view class="demo-watermark-row">
					<view class="demo-watermark-box">
						<m-watermark content="蓝色水印" color="#4D80F0" :size="16" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>color: #4D80F0</p>
							<p>size: 16px</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="红色水印" color="#E54D42" :size="18" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>color: #E54D42</p>
							<p>size: 18px</p>
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 自定义旋转角度 -->
			<demo-block title="旋转角度" desc="通过 rotate 属性设置水印旋转角度，默认 -25 度">
				<view class="demo-watermark-row">
					<view class="demo-watermark-box">
						<m-watermark content="正向水印" :rotate="0" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>rotate: 0deg</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="倾斜水印" :rotate="-45" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>rotate: -45deg</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="反向水印" :rotate="30" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>rotate: 30deg</p>
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 自定义间距 -->
			<demo-block title="自定义间距" desc="通过 gutterX 和 gutterY 设置水印之间的水平和垂直间距">
				<view class="demo-watermark-row">
					<view class="demo-watermark-box">
						<m-watermark content="紧凑布局" :gutterX="20" :gutterY="20" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>gutterX: 20px</p>
							<p>gutterY: 20px</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="宽松布局" :gutterX="60" :gutterY="60" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>gutterX: 60px</p>
							<p>gutterY: 60px</p>
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 布局模式 -->
			<demo-block title="布局模式" desc="支持 grid 网格布局和 staggered 交错布局">
				<view class="demo-watermark-row">
					<view class="demo-watermark-box">
						<m-watermark content="网格布局" layout="grid" :gutterX="40" :gutterY="40" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>layout: grid</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="交错布局" layout="staggered" :gutterX="40" :gutterY="40" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>layout: staggered</p>
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 自定义透明度 -->
			<demo-block title="自定义透明度" desc="通过 opacity 属性设置水印整体透明度，取值 0~1">
				<view class="demo-watermark-row">
					<view class="demo-watermark-box">
						<m-watermark content="清晰水印" :opacity="0.8" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>opacity: 0.8</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="半透明水印" :opacity="0.4" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>opacity: 0.4</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="淡水印" :opacity="0.2" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>opacity: 0.2</p>
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 多行文本水印 -->
			<demo-block title="多行文本水印" desc="水印文本会自动换行显示">
				<view class="demo-watermark-row">
					<view class="demo-watermark-box">
						<m-watermark content="这是一段比较长的水印文本，当文本宽度超过水印宽度时会自动换行显示" :width="180" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>超长文本自动换行</p>
							<p>width: 180px</p>
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 自定义字体样式 -->
			<demo-block title="自定义字体样式" desc="支持自定义字体样式、字重和字体家族">
				<view class="demo-watermark-row">
					<view class="demo-watermark-box">
						<m-watermark content="斜体水印" font-style="italic" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>font-style: italic</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="粗体水印" font-weight="bold" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>font-weight: bold</p>
						</view>
					</view>
					<view class="demo-watermark-box">
						<m-watermark content="Arial字体" font-family="Arial" :fullScreen="false" />
						<view class="demo-watermark-content">
							<p>font-family: Arial</p>
						</view>
					</view>
				</view>
			</demo-block>

			<!-- 全屏/非全屏切换 -->
			<demo-block title="全屏模式切换" desc="通过 fullScreen 属性控制水印是否覆盖全屏">
				<view class="demo-watermark-header">
					<text class="demo-watermark-label">全屏模式</text>
					<switch :checked="isFullScreen" @change="isFullScreen = !isFullScreen" color="#4D80F0" />
				</view>
				<view class="demo-watermark-row">
					<view :class="isFullScreen ? 'demo-watermark-fullscreen-box' : 'demo-watermark-box'">
						<m-watermark :content="isFullScreen ? '全屏水印' : '局部水印'" :fullScreen="isFullScreen" />
						<view class="demo-watermark-content">
							<p>{{ isFullScreen ? '水印覆盖整个页面' : '水印仅覆盖此容器' }}</p>
							<p>fullScreen: {{ isFullScreen }}</p>
						</view>
					</view>
				</view>
				<view v-if="isFullScreen" class="demo-watermark-tip">
					<text>提示：全屏水印会覆盖整个页面，请在实际使用时注意层级设置</text>
				</view>
			</demo-block>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const isFullScreen = ref(false);
</script>

<style lang="scss" scoped>
.m-watermark-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-watermark-header { 
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 20rpx;
}

.demo-watermark-row {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.demo-watermark-box {
	flex: 1;
	min-width: 280px;
	height: 200px;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	position: relative;
	overflow: hidden;
}

.demo-watermark-fullscreen-box {
	width: 100%;
	height: 200px;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	position: relative;
	overflow: hidden;
}

.demo-watermark-content {
	position: relative;
	z-index: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;

	p {
		margin: 8px 0;
		color: #666;
		font-size: 14px;
		text-align: center;
	}
}

.demo-watermark-tip {
	margin-top: 12px;
	padding: 12px 16px;
	background: #fff3e0;
	border-radius: 8px;
	border-left: 4px solid #ff9800;

	text {
		font-size: 13px;
		color: #e65100;
	}
}
</style>