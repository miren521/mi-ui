<template>
  <view class="page">
    <view class="page-content">
      <demo-block title="圆形加载" desc="circular 类型，环形旋转加载动画">
        <view class="demo-loading-row">
          <m-loading type="circular" />
        </view>
      </demo-block>

      <demo-block title="花朵旋转" desc="spinner 类型，12 个点旋转加载动画">
        <view class="demo-loading-row">
          <m-loading type="spinner" />
        </view>
      </demo-block>

      <demo-block title="闪烁圆点" desc="dots 类型，3 个点闪烁动画">
        <view class="demo-loading-row">
          <m-loading type="dots" />
        </view>
      </demo-block>

      <demo-block title="波浪动画" desc="wave 类型，4 柱波浪起伏动画">
        <view class="demo-loading-row">
          <m-loading type="wave" />
        </view>
      </demo-block>

      <demo-block title="脉冲动画" desc="pulse 类型，双点脉冲缩放动画">
        <view class="demo-loading-row">
          <m-loading type="pulse" />
        </view>
      </demo-block>

      <demo-block title="交替动画" desc="sync 类型，双点左右交替出现动画">
        <view class="demo-loading-row">
          <m-loading type="sync" />
        </view>
      </demo-block>

      <demo-block title="自定义颜色" desc="通过 color 属性设置加载动画颜色">
        <view class="demo-loading-row">
          <m-loading type="circular" color="#ff6b6b" />
        </view>
      </demo-block>

      <demo-block title="自定义尺寸" desc="通过 size 属性设置加载动画尺寸">
        <view class="demo-loading-row">
          <m-loading type="circular" :size="40" />
        </view>
      </demo-block>

      <demo-block title="加载文本" desc="通过默认插槽或 text 属性设置加载提示文字">
        <view class="demo-loading-row">
          <m-loading type="circular" text="加载中..." />
        </view>
      </demo-block>

      <demo-block title="水平排列" desc="通过 direction='horizontal' 设置水平排列">
        <view class="demo-loading-row">
          <m-loading type="wave" direction="horizontal" text="加载中..." />
        </view>
      </demo-block>

      <demo-block title="继承颜色" desc="通过 inherit-color 属性继承父元素颜色">
        <view class="demo-loading-row demo-loading-row--color">
          <m-loading type="circular" inherit-color />
        </view>
      </demo-block>

      <demo-block title="组合展示" desc="多种加载类型并排展示">
        <view class="demo-loading-row demo-loading-row--center">
          <m-loading type="circular" />
          <m-loading type="spinner" />
          <m-loading type="dots" />
          <m-loading type="wave" />
          <m-loading type="pulse" />
          <m-loading type="sync" />
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.page {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-content {
  padding-bottom: 40rpx;
}

.demo-loading-row {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  &--color {
    color: #ff6b6b;
  }

  &--center {
    gap: 40rpx;
    flex-wrap: wrap;
  }
}
</style>