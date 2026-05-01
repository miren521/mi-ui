<template>
  <view class="page">
    <view class="page-content">
      <demo-block title="基础用法" desc="最简单的吸顶效果">
        <m-sticky>
          <m-button type="primary" block>吸顶按钮</m-button>
        </m-sticky>
        <view class="scroll-area">
          <view class="scroll-content">向下滚动查看效果</view>
        </view>
      </demo-block>

      <demo-block title="吸顶距离" desc="设置 offset-top 为 60rpx">
        <m-sticky :offset-top="60">
          <m-button type="warning" block>距顶60rpx</m-button>
        </m-sticky>
        <view class="scroll-area">
          <view class="scroll-content">向下滚动查看效果</view>
        </view>
      </demo-block>

      <demo-block title="相对容器" desc="在容器内吸顶">
        <m-sticky-box>
          <view class="box-content">
            <m-sticky>
              <m-button type="success" block style="margin-left: 220rpx;">容器内吸顶</m-button>
            </m-sticky>
            <view class="scroll-content">容器内滚动内容</view>
            <view class="scroll-content">容器内滚动内容</view>
            <view class="scroll-content">容器内滚动内容</view>
          </view>
        </m-sticky-box>
      </demo-block>

      <demo-block title="相对容器+吸顶距离" desc="结合使用">
        <m-sticky-box>
          <view class="box-content">
            <m-sticky :offset-top="40">
              <m-button type="danger" block style="margin-left: 220rpx;">容器内距顶40rpx</m-button>
            </m-sticky>
            <view class="scroll-content">容器内滚动内容</view>
            <view class="scroll-content">容器内滚动内容</view>
            <view class="scroll-content">容器内滚动内容</view>
          </view>
        </m-sticky-box>
      </demo-block>
    </view>

    <view class="page-footer">
      <text class="footer-text">继续下滑查看吸顶效果</text>
      <text class="footer-arrow">↓</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.page-content {
  padding: 24rpx;
}

.scroll-area {
  padding: 40rpx 0;
}

.scroll-content {
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 16rpx;
  border-radius: 8rpx;
  color: #666;
  font-size: 28rpx;
}

.box-content {
  background-color: #fff;
  border-radius: 12rpx;
  // overflow: hidden;
  width: 100%;
}

.page-footer {
  height: 1500rpx;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  color: #999;
  font-size: 28rpx;
}

.footer-text {
  margin-bottom: 16rpx;
}

.footer-arrow {
  font-size: 48rpx;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10rpx);
  }
}
</style>
