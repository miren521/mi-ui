<template>
  <view class="page">
    <view class="page-content">
      <!-- 基本用法 -->
      <demo-block title="基本用法">
        <view class="demo-divider-row">
          <view class="demo-divider-content">上方内容</view>
          <m-divider />
          <view class="demo-divider-content">下方内容</view>
        </view>
      </demo-block>

      <!-- 内容位置 -->
      <demo-block title="内容位置">
        <view class="demo-divider-row">
          <m-divider content-position="left">左侧内容</m-divider>
        </view>
        <view class="demo-divider-row">
          <m-divider content-position="center">中间内容</m-divider>
        </view>
        <view class="demo-divider-row">
          <m-divider content-position="right">右侧内容</m-divider>
        </view>
      </demo-block>

      <!-- 虚线样式 -->
      <demo-block title="虚线样式">
        <view class="demo-divider-row">
          <view class="demo-divider-content">上方内容</view>
          <m-divider dashed />
          <view class="demo-divider-content">下方内容</view>
        </view>
      </demo-block>

      <!-- 垂直分割线 -->
      <demo-block title="垂直分割线">
        <view class="demo-divider-row demo-divider-horizontal">
          <view class="demo-divider-content">左侧内容</view>
          <m-divider vertical />
          <view class="demo-divider-content">右侧内容</view>
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色">
        <view class="demo-divider-row">
          <view class="demo-divider-content">上方内容</view>
          <m-divider color="#1890ff" />
          <view class="demo-divider-content">下方内容</view>
        </view>
        <view class="demo-divider-row">
          <m-divider color="#52c41a" content-position="center">绿色分割线</m-divider>
        </view>
        <view class="demo-divider-row">
          <m-divider color="#faad14" content-position="left">黄色分割线</m-divider>
        </view>
        <view class="demo-divider-row">
          <m-divider color="#f5222d" content-position="right">红色分割线</m-divider>
        </view>
      </demo-block>

      <!-- 非细线模式 -->
      <demo-block title="非细线模式">
        <view class="demo-divider-row">
          <view class="demo-divider-content">上方内容</view>
          <m-divider :hairline="false" />
          <view class="demo-divider-content">下方内容</view>
        </view>
      </demo-block>

      <!-- 自定义内容 -->
      <demo-block title="自定义内容">
        <view class="demo-divider-row">
          <m-divider content-position="center">
            <view class="custom-content">
              <m-icon name="star" color="#faad14" size="28rpx" />
              <text class="custom-text">自定义内容</text>
              <m-icon name="star" color="#faad14" size="28rpx" />
            </view>
          </m-divider>
        </view>
        <view class="demo-divider-row">
          <m-divider content-position="center" dashed>
            <text class="custom-text custom-text-dashed">虚线分割线</text>
          </m-divider>
        </view>
      </demo-block>

      <!-- 垂直分割线自定义颜色 -->
      <demo-block title="垂直分割线自定义颜色">
        <view class="demo-divider-row demo-divider-horizontal">
          <view class="demo-divider-content">左侧内容</view>
          <m-divider vertical color="#1890ff" />
          <view class="demo-divider-content">中间内容</view>
          <m-divider vertical color="#52c41a" />
          <view class="demo-divider-content">右侧内容</view>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import mDivider from '../../packages/m-divider/m-divider.vue'
import mIcon from '../../packages/m-icon/m-icon.vue'
</script>

<style lang="scss">
.page {
  padding: 32rpx;
  background-color: #f5f6fa;
}

.demo-divider-row {

  &.demo-divider-horizontal {
    display: flex;
    align-items: center;
    justify-content: center;

    .demo-divider-content {
      margin: 0 20rpx;
    }
  }
}

.demo-divider-content {
  text-align: center;
  padding: 20rpx;
  color: #666;
}

.custom-content {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.custom-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.custom-text-dashed {
  color: #faad14;
}
</style>