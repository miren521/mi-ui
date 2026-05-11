<template>
  <view class="demo-page">
    <demo-block title="基础用法" desc="默认样式开关">
      <view class="demo-row">
        <m-switch v-model="switchValue1"></m-switch>
      </view>
      <view class="demo-tip">当前值: {{ switchValue1 }}</view>
    </demo-block>

    <demo-block title="禁用状态" desc="设置 disabled 属性禁用开关">
      <view class="demo-row">
        <m-switch v-model="switchValue2" disabled></m-switch>
      </view>
    </demo-block>

    <demo-block title="加载状态" desc="设置 loading 属性显示加载状态">
      <view class="demo-row">
        <m-switch v-model="switchValue3" loading></m-switch>
      </view>
    </demo-block>

    <demo-block title="不同形状" desc="支持圆角(round)和方角(square)两种形状">
      <view class="demo-row">
        <view class="demo-item">
          <text class="demo-label">圆角</text>
          <m-switch v-model="switchValue4" shape="round"></m-switch>
        </view>
        <view class="demo-item">
          <text class="demo-label">方角</text>
          <m-switch v-model="switchValue5" shape="square"></m-switch>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义颜色" desc="通过 active-color 和 inactive-color 设置激活和非激活颜色">
      <view class="demo-row">
        <view class="demo-item">
          <text class="demo-label">绿色</text>
          <m-switch v-model="switchValue6" active-color="#07c160" inactive-color="#f2f3f5"></m-switch>
        </view>
        <view class="demo-item">
          <text class="demo-label">红色</text>
          <m-switch v-model="switchValue7" active-color="#ff4d4f" inactive-color="#f2f3f5"></m-switch>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义值" desc="通过 active-value 和 inactive-value 设置开关的值">
      <view class="demo-row">
        <view class="demo-item">
          <text class="demo-label">字符串值</text>
          <m-switch v-model="switchValue8" active-value="on" inactive-value="off"></m-switch>
        </view>
        <view class="demo-item">
          <text class="demo-label">数值</text>
          <m-switch v-model="switchValue9" :active-value="1" :inactive-value="0"></m-switch>
        </view>
      </view>
      <view class="demo-tip">当前值: {{ switchValue8 }} / {{ switchValue9 }}</view>
    </demo-block>

    <demo-block title="自定义文案" desc="通过 active-text 和 inactive-text 设置开关的文案">
      <view class="demo-row">
        <m-switch v-model="switchValue10" active-text="开" inactive-text="关"></m-switch>
      </view>
    </demo-block>

    <demo-block title="尺寸" desc="通过 size 属性设置开关大小">
      <view class="demo-row">
        <view class="demo-item">
          <text class="demo-label">小</text>
          <m-switch v-model="switchValue11" size="40rpx"></m-switch>
        </view>
        <view class="demo-item">
          <text class="demo-label">中</text>
          <m-switch v-model="switchValue12" size="52rpx"></m-switch>
        </view>
        <view class="demo-item">
          <text class="demo-label">大</text>
          <m-switch v-model="switchValue13" size="64rpx"></m-switch>
        </view>
      </view>
    </demo-block>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue1 = ref(true)
const switchValue2 = ref(true)
const switchValue3 = ref(false)
const switchValue4 = ref(true)
const switchValue5 = ref(true)
const switchValue6 = ref(true)
const switchValue7 = ref(false)
const switchValue8 = ref('on')
const switchValue9 = ref(1)
const switchValue10 = ref(true)
const switchValue11 = ref(true)
const switchValue12 = ref(true)
const switchValue13 = ref(true)
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 24rpx;
  background-color: #f5f6f7;
  min-height: 100vh;
}

.demo-row {
  padding: 16rpx 16rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 36rpx;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.demo-label {
  font-size: 24rpx;
  color: #969799;
}

.demo-tip {
  font-size: 24rpx;
  color: #969799;
  margin-top: 12rpx;
  padding-left: 16rpx;
}
</style>