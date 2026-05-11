<template>
  <view class="demo-page">
    <demo-block title="基础用法" desc="默认样式评分">
      <view class="demo-row">
        <m-rate v-model="rateValue1"></m-rate>
      </view>
      <view class="demo-tip">当前值: {{ rateValue1 }}</view>
    </demo-block>

    <demo-block title="只读状态" desc="设置 readonly 属性显示只读评分">
      <view class="demo-row">
        <m-rate v-model="rateValue2" readonly></m-rate>
      </view>
    </demo-block>

    <demo-block title="禁用状态" desc="设置 disabled 属性禁用评分">
      <view class="demo-row">
        <m-rate v-model="rateValue3" disabled></m-rate>
      </view>
    </demo-block>

    <demo-block title="半选状态" desc="设置 allow-half 属性允许半选">
      <view class="demo-row">
        <m-rate v-model="rateValue4" allow-half></m-rate>
      </view>
      <view class="demo-tip">当前值: {{ rateValue4 }}</view>
    </demo-block>

    <demo-block title="可清空" desc="设置 clearable 属性，当选中最小值时再次点击可清空为 0">
      <view class="demo-row">
        <m-rate v-model="rateValue5" clearable></m-rate>
      </view>
      <view class="demo-tip">当前值: {{ rateValue5 }}</view>
    </demo-block>

    <demo-block title="自定义数量" desc="通过 num 属性设置评分数量">
      <view class="demo-row">
        <m-rate v-model="rateValue6" :num="10"></m-rate>
      </view>
      <view class="demo-tip">当前值: {{ rateValue6 }}</view>
    </demo-block>

    <demo-block title="自定义颜色" desc="通过 color 和 active-color 设置颜色">
      <view class="demo-row">
        <view class="demo-item">
          <text class="demo-label">绿色</text>
          <m-rate v-model="rateValue7" color="#e5e5e5" active-color="#07c160"></m-rate>
        </view>
        <view class="demo-item">
          <text class="demo-label">红色</text>
          <m-rate v-model="rateValue8" color="#e5e5e5" active-color="#ff4d4f"></m-rate>
        </view>
      </view>
    </demo-block>

    <demo-block title="分段颜色" desc="active-color 支持数组实现分段颜色">
      <view class="demo-row">
        <m-rate v-model="rateValue9" :active-color="['#ff4d4f', '#52c41a']"></m-rate>
      </view>
      <view class="demo-tip">当前值: {{ rateValue9 }}</view>
    </demo-block>

    <demo-block title="自定义间距" desc="通过 space 属性设置图标间距">
      <view class="demo-row">
        <m-rate v-model="rateValue10" space="16rpx"></m-rate>
      </view>
    </demo-block>

    <demo-block title="自定义尺寸" desc="通过 size 属性设置图标大小">
      <view class="demo-row">
        <view class="demo-item">
          <text class="demo-label">小</text>
          <m-rate v-model="rateValue11" size="24rpx"></m-rate>
        </view>
        <view class="demo-item">
          <text class="demo-label">中</text>
          <m-rate v-model="rateValue12" size="32rpx"></m-rate>
        </view>
        <view class="demo-item">
          <text class="demo-label">大</text>
          <m-rate v-model="rateValue13" size="48rpx"></m-rate>
        </view>
      </view>
    </demo-block>

    <demo-block title="块级元素" desc="设置 block 属性显示为块级元素">
      <view class="demo-row">
        <m-rate v-model="rateValue14" block></m-rate>
      </view>
    </demo-block>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rateValue1 = ref(3)
const rateValue2 = ref(4)
const rateValue3 = ref(2)
const rateValue4 = ref(3.5)
const rateValue5 = ref(1)
const rateValue6 = ref(7)
const rateValue7 = ref(3)
const rateValue8 = ref(3)
const rateValue9 = ref(4)
const rateValue10 = ref(3)
const rateValue11 = ref(3)
const rateValue12 = ref(3)
const rateValue13 = ref(3)
const rateValue14 = ref(3)
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 24rpx;
  background-color: #f5f6f7;
  min-height: 100vh;
}

.demo-row {
  padding: 6rpx 16rpx;
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
