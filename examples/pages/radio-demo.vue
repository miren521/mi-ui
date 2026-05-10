<template>
  <view class="demo-page">

    <demo-block title="基础用法">
      <view class="demo-radio-row">
        <m-radio-group v-model="radioValue1">
          <m-radio value="选项一">选项一</m-radio>
          <m-radio value="选项二">选项二</m-radio>
          <m-radio value="选项三">选项三</m-radio>
        </m-radio-group>
      </view>
      <view class="demo-tip">当前选中: {{ radioValue1 }}</view>
    </demo-block>

    <demo-block title="水平排列">
      <view class="demo-radio-row">
        <m-radio-group v-model="radioValue2" direction="horizontal">
          <m-radio value="选项一">选项一</m-radio>
          <m-radio value="选项二">选项二</m-radio>
          <m-radio value="选项三">选项三</m-radio>
        </m-radio-group>
      </view>
    </demo-block>

    <demo-block title="不同类型">
      <view class="demo-radio-row">
        <view class="demo-radio-section">
          <text class="demo-section-title">圆形 (circle)</text>
          <m-radio-group v-model="radioValue3">
            <m-radio value="1" type="circle">选项一</m-radio>
            <m-radio value="2" type="circle">选项二</m-radio>
          </m-radio-group>
        </view>
        <view class="demo-radio-section">
          <text class="demo-section-title">方形 (square)</text>
          <m-radio-group v-model="radioValue4">
            <m-radio value="1" type="square">选项一</m-radio>
            <m-radio value="2" type="square">选项二</m-radio>
          </m-radio-group>
        </view>
        <view class="demo-radio-section">
          <text class="demo-section-title">点状 (dot)</text>
          <m-radio-group v-model="radioValue5">
            <m-radio value="1" type="dot">选项一</m-radio>
            <m-radio value="2" type="dot">选项二</m-radio>
          </m-radio-group>
        </view>
        <view class="demo-radio-section">
          <text class="demo-section-title">按钮 (button)</text>
          <m-radio-group v-model="radioValue6" direction="horizontal">
            <m-radio value="1" type="button">选项一</m-radio>
            <m-radio value="2" type="button">选项二</m-radio>
            <m-radio value="3" type="button">选项三</m-radio>
          </m-radio-group>
        </view>
      </view>
    </demo-block>

    <demo-block title="禁用状态">
      <view class="demo-radio-row">
        <m-radio-group v-model="radioValue7">
          <m-radio value="1" disabled>禁用选项</m-radio>
          <m-radio value="2">可选选项</m-radio>
          <m-radio value="3">可选选项</m-radio>
        </m-radio-group>
      </view>
    </demo-block>

    <demo-block title="只读状态">
      <view class="demo-radio-row">
        <m-radio-group v-model="radioValue8" readonly>
          <m-radio value="1">选项一</m-radio>
          <m-radio value="2">选项二</m-radio>
          <m-radio value="3">选项三</m-radio>
        </m-radio-group>
      </view>
      <view class="demo-tip">只读状态下可以看到选中状态，但无法点击切换</view>
    </demo-block>

    <demo-block title="允许取消选中">
      <view class="demo-radio-row">
        <m-radio-group v-model="radioValue9" allow-uncheck>
          <m-radio value="1">选项一</m-radio>
          <m-radio value="2">选项二</m-radio>
          <m-radio value="3">选项三</m-radio>
        </m-radio-group>
      </view>
      <view class="demo-tip">点击已选中的选项可取消选中</view>
    </demo-block>

    <demo-block title="自定义颜色">
      <view class="demo-radio-row">
        <m-radio-group v-model="radioValue10" checked-color="#07c160" unchecked-color="#999999">
          <m-radio value="1">绿色主题</m-radio>
          <m-radio value="2">绿色主题</m-radio>
          <m-radio value="3">绿色主题</m-radio>
        </m-radio-group>
      </view>
    </demo-block>

    <demo-block title="标签位置">
      <view class="demo-radio-row">
        <view class="demo-radio-section">
          <text class="demo-section-title">标签在左</text>
          <m-radio-group v-model="radioValue11">
            <m-radio value="1" placement="left">选项一</m-radio>
            <m-radio value="2" placement="left">选项二</m-radio>
          </m-radio-group>
        </view>
        <view class="demo-radio-section">
          <text class="demo-section-title">标签在右</text>
          <m-radio-group v-model="radioValue12">
            <m-radio value="1" placement="right">选项一</m-radio>
            <m-radio value="2" placement="right">选项二</m-radio>
          </m-radio-group>
        </view>
      </view>
    </demo-block>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radioValue1 = ref('选项一')
const radioValue2 = ref('选项一')
const radioValue3 = ref('1')
const radioValue4 = ref('1')
const radioValue5 = ref('1')
const radioValue6 = ref('1')
const radioValue7 = ref('2')
const radioValue8 = ref('2')
const radioValue9 = ref('1')
const radioValue10 = ref('1')
const radioValue11 = ref('1')
const radioValue12 = ref('1')
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 24rpx;
  background-color: #f5f6f7;
  min-height: 100vh;
}

.demo-header {
  margin-bottom: 24rpx;
}

.demo-title {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  color: #323233;
  margin-bottom: 8rpx;
}

.demo-desc {
  font-size: 28rpx;
  color: #969799;
}

.demo-radio-row {
  padding: 8rpx 16rpx;
}

.demo-radio-section {
  margin-bottom: 24rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-section-title {
  display: block;
  font-size: 26rpx;
  color: #969799;
  margin-bottom: 12rpx;
}

.demo-tip {
  font-size: 24rpx;
  color: #969799;
  margin-top: 12rpx;
  padding-left: 16rpx;
}
</style>