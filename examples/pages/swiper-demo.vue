<template>
  <view class="page">
    <view class="page-content">
      <demo-block title="基础用法" desc="默认自动播放的图片轮播">
        <view class="demo-swiper-row">
          <m-swiper :list="imageList" height="200" />
        </view>
      </demo-block>

      <demo-block title="垂直轮播" desc="设置 direction 为 vertical，指示器自动显示在右侧">
        <view class="demo-swiper-row">
          <m-swiper
            :list="imageList"
            height="200"
            direction="vertical"
            :indicator="{ type: 'dots' }"
          />
        </view>
      </demo-block>

      <demo-block title="圆角轮播" desc="设置 radius 属性添加圆角效果">
        <view class="demo-swiper-row">
          <m-swiper
            :list="imageList"
            height="200"
            :radius="showRadius ? 16 : 0"
          />
        </view>
        <view class="demo-swiper-switch">
          <switch :checked="showRadius" @change="onRadiusChange" />
          <text class="demo-swiper-switch-text">{{ showRadius ? '已开启圆角' : '已关闭圆角' }}</text>
        </view>
      </demo-block>

      <demo-block title="指示器类型" desc="支持 dots、dots-bar、fraction 三种类型">
        <view class="demo-swiper-row">
          <view class="demo-swiper-card">
            <text class="demo-swiper-label">dots（点状）</text>
            <m-swiper :list="imageList" height="200" :indicator="{ type: 'dots' }" />
          </view>
          <view class="demo-swiper-card">
            <text class="demo-swiper-label">dots-bar（条状）</text>
            <m-swiper :list="imageList" height="200" :indicator="{ type: 'dots-bar' }" />
          </view>
          <view class="demo-swiper-card">
            <text class="demo-swiper-label">fraction（分式）</text>
            <m-swiper :list="imageList" height="200" :indicator="{ type: 'fraction' }" />
          </view>
        </view>
      </demo-block>

      <demo-block title="指示器位置" desc="indicatorPosition 控制指示器位置">
        <view class="demo-swiper-row">
          <view class="demo-swiper-card">
            <text class="demo-swiper-label">top-left</text>
            <m-swiper :list="imageList" height="200" indicator-position="top-left" />
          </view>
          <view class="demo-swiper-card">
            <text class="demo-swiper-label">bottom-right</text>
            <m-swiper :list="imageList" height="200" indicator-position="bottom-right" />
          </view>
        </view>
      </demo-block>

      <demo-block title="控制按钮" desc="开启 showControls 显示左右切换按钮">
        <view class="demo-swiper-row">
          <m-swiper
            :list="imageList"
            height="300"
            :indicator="{ showControls: true, type: 'fraction' }"
          />
        </view>
      </demo-block>

      <demo-block title="卡片模式" desc="显示部分相邻卡片，营造立体卡片效果">
        <view class="card-swiper">
          <m-swiper
            :list="imageList"
            height="180"
            :previous-margin="48"
            :next-margin="48"
            :loop="false"
            :indicator="{ type: 'dots' }"
            custom-indicator-class="custom-indicator-class"
            custom-image-class="custom-image"
            custom-next-image-class="custom-image-prev"
            custom-prev-image-class="custom-image-prev"
          />
        </view>
      </demo-block>

      <demo-block title="自定义内容" desc="使用 slot 自定义轮播内容">
        <view class="demo-swiper-row">
          <m-swiper height="200">
            <template #default="{ item, index }">
              <view class="demo-swiper-custom">
                <image :src="item" mode="aspectFill" class="demo-swiper-custom-img" />
                <text class="demo-swiper-custom-text">第 {{ index + 1 }} 张图片</text>
              </view>
            </template>
          </m-swiper>
        </view>
      </demo-block>

      <demo-block title="事件监听" desc="监听 change、click 等事件">
        <view class="demo-swiper-row">
          <m-swiper
            :list="imageList"
            height="200"
            @change="handleChange"
            @click="handleClick"
          />
        </view>
        <view class="demo-swiper-events">
          <text class="demo-swiper-event-text">当前索引：{{ currentIndex }}</text>
          <text class="demo-swiper-event-text">点击索引：{{ clickIndex }}</text>
        </view>
      </demo-block>

      <demo-block title="手动控制" desc="通过 v-model:current 控制当前页">
        <view class="demo-swiper-row">
          <m-swiper
            v-model:current="manualCurrent"
            :list="imageList"
            :autoplay="false"
            height="200"
          />
        </view>
        <view class="demo-swiper-controls">
          <m-button type="primary" @click="prevSlide">上一页</m-button>
          <text class="demo-swiper-current">{{ manualCurrent + 1 }} / {{ imageList.length }}</text>
          <m-button type="primary" @click="nextSlide">下一页</m-button>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageList = [
  '/static/img/img_1.jpg',
  '/static/img/img_2.jpg',
  '/static/img/img_3.jpg',
  '/static/img/img_4.jpg',
  '/static/img/img_5.jpg',
]

const currentIndex = ref(0)
const clickIndex = ref(-1)
const manualCurrent = ref(0)
const showRadius = ref(false)

function handleChange(e: { current: number }) {
  currentIndex.value = e.current
}

function handleClick(e: { index: number }) {
  clickIndex.value = e.index
}

function prevSlide() {
  manualCurrent.value = manualCurrent.value > 0 ? manualCurrent.value - 1 : imageList.length - 1
}

function nextSlide() {
  manualCurrent.value = manualCurrent.value < imageList.length - 1 ? manualCurrent.value + 1 : 0
}

function onRadiusChange(e: { detail: { value: boolean } }) {
  showRadius.value = e.detail.value
}
</script>

<style lang="scss" scoped>
.page {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-content {
  padding-bottom: 40rpx;
}

.demo-swiper-row {
  margin-bottom: 20rpx;
}

.demo-swiper-card-row {
  padding: 0 20rpx;
}

.demo-swiper-card {
  flex: 1;
  min-width: 280rpx;
}

.demo-swiper-label {
  display: block;
  font-size: 24rpx;
  color: #64748b;
  margin-bottom: 12rpx;
  text-align: center;
}

.demo-swiper-custom {
  position: relative;
  width: 100%;
  height: 100%;
}

.demo-swiper-custom-img {
  width: 100%;
  height: 100%;
}

.demo-swiper-custom-text {
  position: absolute;
  bottom: 20rpx;
  left: 20rpx;
  color: #fff;
  font-size: 28rpx;
  background: rgba(0, 0, 0, 0.5);
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
}

.demo-swiper-switch {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 20rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
}

.demo-swiper-switch-text {
  font-size: 26rpx;
  color: #1e293b;
}

.demo-swiper-events {
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  margin-top: 20rpx;
}

.demo-swiper-event-text {
  display: block;
  font-size: 26rpx;
  color: #64748b;
  margin-bottom: 8rpx;
}

.demo-swiper-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32rpx;
  margin-top: 20rpx;
}

.demo-swiper-current {
  font-size: 28rpx;
  color: #1e293b;
  font-weight: 500;
}

.card-swiper {
  --m-swiper-radius: 0;
  --m-swiper-item-padding: 0 16rpx;
  --m-swiper-nav-dot-color: #e7e7e7;
  --m-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 20rpx;

  :deep(.custom-indicator-class) {
    bottom: -16px;
  }

  :deep(.custom-image) {
    border-radius: 12rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  }

  :deep(.custom-image-prev) {
    transform: scale(0.9);
    opacity: 0.8;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  }
}

:deep(.demo-swiper-prev),
:deep(.demo-swiper-next) {
  transform: scale(0.85);
  opacity: 0.7;
  transition: all 0.3s ease;
}

:deep(.demo-swiper-prev image),
:deep(.demo-swiper-next image) {
  border-radius: 16rpx;
}
</style>