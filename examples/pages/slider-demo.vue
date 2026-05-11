<template>
  <view class="demo-page">
    <demo-block title="基础用法" desc="基础滑块，默认值为0，范围0-100">
      <view class="demo-row">
        <m-slider v-model="sliderValue1"></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue1 }}</view>
    </demo-block>

    <demo-block title="双向滑块" desc="设置 range 属性启用双向滑块模式">
      <view class="demo-row">
        <m-slider v-model="sliderValue2" range></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue2 }}</view>
    </demo-block>

    <demo-block title="自定义范围" desc="通过 min 和 max 设置滑块范围">
      <view class="demo-row">
        <m-slider v-model="sliderValue3" :min="10" :max="90"></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue3 }}</view>
    </demo-block>

    <demo-block title="步长设置" desc="通过 step 设置每次滑动的步长">
      <view class="demo-row">
        <m-slider v-model="sliderValue4" :step="10"></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue4 }} (步长: 10)</view>
    </demo-block>

    <demo-block title="管道风格" desc="设置 theme 为 capsule 使用管道风格">
      <view class="demo-row">
        <m-slider v-model="sliderValue5" theme="capsule"></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue5 }}</view>
    </demo-block>

    <demo-block title="双向管道风格" desc="结合 range 和 capsule 使用">
      <view class="demo-row">
        <m-slider v-model="sliderValue6" range theme="capsule"></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue6 }}</view>
    </demo-block>

    <demo-block title="显示极值" desc="设置 show-extreme-value 显示最小最大值">
      <view class="demo-row">
        <m-slider v-model="sliderValue7" show-extreme-value></m-slider>
      </view>
    </demo-block>

    <demo-block title="禁用状态" desc="设置 disabled 属性禁用滑块">
      <view class="demo-row">
        <m-slider v-model="sliderValue8" disabled></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue8 }}</view>
    </demo-block>

    <demo-block title="气泡显示" desc="popover-visible 控制气泡显示模式">
      <view class="demo-bubble-item">
        <text class="demo-bubble-label">始终显示</text>
        <m-slider v-model="sliderValue9" popover-visible="always"></m-slider>
      </view>
      <view class="demo-bubble-item">
        <text class="demo-bubble-label">拖动时显示</text>
        <m-slider v-model="sliderValue10"></m-slider>
      </view>
      <view class="demo-bubble-item">
        <text class="demo-bubble-label">从不显示</text>
        <m-slider v-model="sliderValue11" popover-visible="never"></m-slider>
      </view>
    </demo-block>

    <demo-block title="自定义颜色" desc="通过 active-color 和 inactive-color 设置颜色">
      <view class="demo-row">
        <m-slider 
          v-model="sliderValue12" 
          active-color="#ff6b6b" 
          inactive-color="#ffeaea"
        ></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue12 }}</view>
    </demo-block>

    <demo-block title="刻度标记" desc="通过 marks 设置刻度标记">
      <view class="demo-row">
        <m-slider 
          v-model="sliderValue13" 
          :marks="[0, 25, 50, 75, 100]"
        ></m-slider>
      </view>
      <view class="demo-row" style="margin-top: 16rpx;">
        <m-slider 
          v-model="sliderValue14" 
          :marks="{ 0: '0°C', 25: '25°C', 50: '50°C', 75: '75°C', 100: '100°C' }"
        ></m-slider>
      </view>
    </demo-block>

    <demo-block title="管道刻度标记" desc="管道风格结合刻度标记">
      <view class="demo-row">
        <m-slider 
          v-model="sliderValue15" 
          theme="capsule"
          :marks="[0, 25, 50, 75, 100]"
        ></m-slider>
      </view>
    </demo-block>

    <demo-block title="垂直滑块" desc="设置 vertical 属性使用垂直滑块">
      <view class="demo-row vertical-demo">
        <m-slider v-model="sliderValue16" vertical></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue16 }}</view>
    </demo-block>

    <demo-block title="垂直双向滑块" desc="垂直滑块结合双向模式">
      <view class="demo-row vertical-demo">
        <m-slider v-model="sliderValue17" vertical range></m-slider>
      </view>
      <view class="demo-tip">当前值: {{ sliderValue17 }}</view>
    </demo-block>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sliderValue1 = ref(30)
const sliderValue2 = ref([20, 80])
const sliderValue3 = ref(50)
const sliderValue4 = ref(50)
const sliderValue5 = ref(40)
const sliderValue6 = ref([30, 70])
const sliderValue7 = ref(50)
const sliderValue8 = ref(50)
const sliderValue9 = ref(30)
const sliderValue10 = ref(40)
const sliderValue11 = ref(50)
const sliderValue12 = ref(60)
const sliderValue13 = ref(50)
const sliderValue14 = ref(50)
const sliderValue15 = ref(50)
const sliderValue16 = ref(50)
const sliderValue17 = ref([30, 70])
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 32rpx;
  background-color: #f5f6fa;
}

.demo-row {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
}

.demo-tip {
  font-size: 24rpx;
  color: #969799;
  margin-top: 8rpx;
}

.demo-item {
  flex: 1;
  
  .demo-label {
    font-size: 24rpx;
    color: #969799;
    display: block;
    margin-bottom: 12rpx;
  }
}

.vertical-demo {
  justify-content: center;
  height: 300rpx;
}

.demo-bubble-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 24rpx;

  .demo-bubble-label {
    font-size: 28rpx;
    color: #969799;
    margin-bottom: 12rpx;
  }
}
</style>