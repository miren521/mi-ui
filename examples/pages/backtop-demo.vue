<template>
  <view class="m-backtop-demo">
    <view class="m-backtop-demo__container">
      <!-- 按钮形状 -->
      <demo-block title="按钮形状" desc="选择返回顶部按钮的外观形状">
        <view class="demo-backtop-option">
          <m-radio-group v-model="shape" direction="horizontal">
            <m-radio value="circle">圆形</m-radio>
            <m-radio value="square">方形</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 显示文本 -->
      <demo-block title="显示文本" desc="是否在按钮下方显示提示文字">
        <view class="demo-backtop-option">
          <m-radio-group v-model="showText" direction="horizontal">
            <m-radio :value="false">不显示</m-radio>
            <m-radio :value="true">显示</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 自定义位置 -->
      <demo-block title="自定义位置" desc="调整按钮在页面中的位置">
        <view class="demo-backtop-option">
          <view class="demo-backtop-option__label">bottom 值：</view>
          <m-radio-group v-model="bottom" direction="horizontal">
            <m-radio :value="60">60px</m-radio>
            <m-radio :value="100">100px</m-radio>
            <m-radio :value="150">150px</m-radio>
            <m-radio :value="200">200px</m-radio>
          </m-radio-group>
        </view>
        <view class="demo-backtop-option">
          <view class="demo-backtop-option__label">right 值：</view>
          <m-radio-group v-model="right" direction="horizontal">
            <m-radio :value="10">10px</m-radio>
            <m-radio :value="20">20px</m-radio>
            <m-radio :value="40">40px</m-radio>
            <m-radio :value="60">60px</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 滚动阈值 -->
      <demo-block title="滚动阈值" desc="页面滚动超过该值时显示按钮">
        <view class="demo-backtop-option">
          <m-radio-group v-model="scrollThreshold" direction="horizontal">
            <m-radio :value="100">100px</m-radio>
            <m-radio :value="200">200px</m-radio>
            <m-radio :value="300">300px</m-radio>
            <m-radio :value="500">500px</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 动画时长 -->
      <demo-block title="动画时长" desc="点击按钮后返回顶部的动画时间">
        <view class="demo-backtop-option">
          <m-radio-group v-model="duration" direction="horizontal">
            <m-radio :value="100">100ms</m-radio>
            <m-radio :value="300">300ms</m-radio>
            <m-radio :value="500">500ms</m-radio>
            <m-radio :value="1000">1000ms</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 当前配置预览 -->
      <demo-block title="当前配置" desc="实时预览当前配置效果">
        <view class="demo-backtop-preview">
          <view class="demo-backtop-preview__item">
            <text class="demo-backtop-preview__label">形状：</text>
            <text class="demo-backtop-preview__value">{{ shape === 'circle' ? '圆形' : '方形' }}</text>
          </view>
          <view class="demo-backtop-preview__item">
            <text class="demo-backtop-preview__label">显示文本：</text>
            <text class="demo-backtop-preview__value">{{ showText ? '是' : '否' }}</text>
          </view>
          <view class="demo-backtop-preview__item">
            <text class="demo-backtop-preview__label">bottom：</text>
            <text class="demo-backtop-preview__value">{{ bottom }}px</text>
          </view>
          <view class="demo-backtop-preview__item">
            <text class="demo-backtop-preview__label">right：</text>
            <text class="demo-backtop-preview__value">{{ right }}px</text>
          </view>
          <view class="demo-backtop-preview__item">
            <text class="demo-backtop-preview__label">滚动阈值：</text>
            <text class="demo-backtop-preview__value">{{ scrollThreshold }}px</text>
          </view>
          <view class="demo-backtop-preview__item">
            <text class="demo-backtop-preview__label">动画时长：</text>
            <text class="demo-backtop-preview__value">{{ duration }}ms</text>
          </view>
        </view>
      </demo-block>

      <!-- 滚动测试区域 -->
      <demo-block title="滚动测试" desc="向下滚动页面测试返回顶部按钮">
        <view class="demo-backtop-scroll-area">
          <view class="demo-backtop-scroll-item" v-for="item in scrollItems" :key="item">
            <view class="demo-backtop-scroll-item__icon">{{ item.icon }}</view>
            <view class="demo-backtop-scroll-item__content">
              <text class="demo-backtop-scroll-item__title">{{ item.title }}</text>
              <text class="demo-backtop-scroll-item__desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </demo-block>
    </view>

    <!-- 预览按钮 -->
    <m-backtop
      :scroll-top="scrollTop"
      :shape="shape"
      :text="showText ? '顶部' : ''"
      :bottom="bottom"
      :right="right"
      :top="scrollThreshold"
      :duration="duration"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import mRadioGroup from '../../packages/m-radio-group/m-radio-group.vue'
import mRadio from '../../packages/m-radio/m-radio.vue'

const scrollTop = ref(0)
const shape = ref<'circle' | 'square'>('circle')
const showText = ref(false)
const bottom = ref(100)
const right = ref(20)
const scrollThreshold = ref(300)
const duration = ref(300)

const scrollItems = [
  { icon: '🌺', title: '功能介绍', desc: '返回顶部按钮可以帮助用户快速回到页面顶部' },
  { icon: '🎨', title: '形状定制', desc: '支持圆形和方形两种按钮形状' },
  { icon: '📝', title: '文本提示', desc: '可选择是否显示"顶部"提示文字' },
  { icon: '📍', title: '位置调整', desc: '自由调整按钮在页面中的位置' },
  { icon: '⚡', title: '阈值设置', desc: '自定义按钮显示的滚动阈值' },
  { icon: '⏱️', title: '动画时长', desc: '设置返回顶部的动画时间' },
  { icon: '💡', title: '使用场景', desc: '适用于长页面、列表页等需要快速返回顶部的场景' },
  { icon: '🔧', title: 'API 文档', desc: '提供丰富的属性配置，满足各种需求' },
  { icon: '🌐', title: '跨端支持', desc: '完美支持 H5、小程序、App 等多种平台' },
  { icon: '✨', title: '主题定制', desc: '支持通过 CSS 变量自定义主题颜色' }
]

function onPageScroll(e: any) {
  scrollTop.value = e.scrollTop
}

onMounted(() => {
  uni.$on('pageScroll', onPageScroll)
})

onUnmounted(() => {
  uni.$off('pageScroll', onPageScroll)
})
</script>

<style lang="scss" scoped>
.m-backtop-demo {
  min-height: 100vh;
  background-color: #f5f5f7;

  &__container {
    padding: 32rpx 24rpx;
    padding-bottom: 180rpx;
  }
}

.demo-backtop-option {
  padding: 16rpx 0;

  &:not(:last-child) {
    border-bottom: 1rpx solid #f0f0f0;
  }

  &__label {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 16rpx;
    display: block;
  }
}

.demo-backtop-preview {
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
}

.demo-backtop-preview__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 0;

  &:not(:last-child) {
    border-bottom: 1rpx solid #f5f5f7;
  }
}

.demo-backtop-preview__label {
  font-size: 26rpx;
  color: #666;
}

.demo-backtop-preview__value {
  font-size: 26rpx;
  color: #1989fa;
  font-weight: 500;
}

.demo-backtop-scroll-area {
  padding: 0;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-backtop-scroll-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.demo-backtop-scroll-item__icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.demo-backtop-scroll-item__content {
  flex: 1;
}

.demo-backtop-scroll-item__title {
  display: block;
  font-size: 28rpx;
  color: #323233;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.demo-backtop-scroll-item__desc {
  font-size: 24rpx;
  color: #999;
}
</style>
