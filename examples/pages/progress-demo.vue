<template>
  <view class="m-progress-demo">
    <view class="m-progress-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="设置 percentage 属性表示进度条的目标百分比">
        <view class="m-progress-demo__row">
          <m-progress :percentage="30" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="50" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="70" />
        </view>
      </demo-block>

      <!-- 不显示文字 -->
      <demo-block title="不显示文字" desc="设置 hideText 属性隐藏进度条文字">
        <view class="m-progress-demo__row">
          <m-progress :percentage="30" :hideText="true" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="50" :hideText="true" />
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="设置 color 属性自定义进度条颜色">
        <view class="m-progress-demo__row">
          <m-progress :percentage="30" color="#ff0000" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="50" color="#00ff00" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="70" color="#0000ff" />
        </view>
      </demo-block>

      <!-- 渐变色 -->
      <demo-block title="渐变色" desc="设置 color 为数组实现渐变效果">
        <view class="m-progress-demo__row">
          <m-progress :percentage="30" :color="['#ff0000', '#00ff00', '#0000ff']" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="60" :color="['#ff0000', '#00ff00', '#0000ff']" />
        </view>
      </demo-block>

      <!-- 分段颜色 -->
      <demo-block title="分段颜色" desc="设置 color 为对象数组实现分段颜色，不同进度区间显示不同颜色">
        <view class="m-progress-demo__row">
          <m-progress :percentage="segmentedPercentage" :color="[{ color: '#ff0000', percentage: 30 }, { color: '#00ff00', percentage: 70 }, { color: '#0000ff', percentage: 100 }]" />
        </view>
        <view class="m-progress-demo__row m-progress-demo__btn-row">
          <m-button type="primary" @click="segmentedPercentage = 15">15%</m-button>
          <m-button type="primary" @click="segmentedPercentage = 45">45%</m-button>
          <m-button type="primary" @click="segmentedPercentage = 85">85%</m-button>
          <m-button type="primary" @click="segmentedPercentage = 100">100%</m-button>
        </view>
      </demo-block>

      <!-- 状态颜色 -->
      <demo-block title="状态颜色" desc="设置 status 属性显示不同状态的进度条">
        <view class="m-progress-demo__row">
          <m-progress :percentage="30" status="success" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="50" status="danger" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="70" status="warning" />
        </view>
      </demo-block>

      <!-- 动态改变 -->
      <demo-block title="动态改变" desc="点击按钮动态改变进度条进度">
        <view class="m-progress-demo__row">
          <m-progress :percentage="dynamicPercentage" />
        </view>
        <view class="m-progress-demo__row m-progress-demo__btn-row">
          <m-button type="primary" @click="dynamicPercentage = 30">30%</m-button>
          <m-button type="primary" @click="dynamicPercentage = 50">50%</m-button>
          <m-button type="primary" @click="dynamicPercentage = 70">70%</m-button>
          <m-button type="primary" @click="dynamicPercentage = 100">100%</m-button>
        </view>
      </demo-block>

      <!-- 文字位置 -->
      <demo-block title="文字位置" desc="设置 percentPosition 属性调整文字位置">
        <view class="m-progress-demo__row">
          <m-progress :percentage="30" :percentPosition="{ type: 'inner', align: 'left' }" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="50" :percentPosition="{ type: 'inner', align: 'center' }" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="70" :percentPosition="{ type: 'inner', align: 'right' }" />
        </view>
      </demo-block>

      <!-- 动画时长 -->
      <demo-block title="动画时长" desc="设置 duration 属性调整动画时长">
        <view class="m-progress-demo__row">
          <m-progress :percentage="30" :duration="10" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="50" :duration="30" />
        </view>
        <view class="m-progress-demo__row">
          <m-progress :percentage="70" :duration="60" />
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicPercentage = ref(30)
const segmentedPercentage = ref(30)
</script>

<style lang="scss">
.m-progress-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__row {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
}
</style>