<template>
  <view class="m-badge-demo">
    <view class="m-badge-demo__container">
      <!-- 基本用法 -->
      <demo-block title="基本用法">
        <view class="demo-badge-row">
          <m-badge value="8">
            <view class="demo-badge-btn">消息</view>
          </m-badge>
          <m-badge value="128">
            <view class="demo-badge-btn">通知</view>
          </m-badge>
          <m-badge value="0" show-zero>
            <view class="demo-badge-btn">零值</view>
          </m-badge>
        </view>
      </demo-block>

      <!-- 最大值设置 -->
      <demo-block title="最大值设置">
        <view class="demo-badge-row">
          <m-badge value="20" max="9">
            <view class="demo-badge-btn">消息</view>
          </m-badge>
          <m-badge value="100" max="99">
            <view class="demo-badge-btn">通知</view>
          </m-badge>
          <m-badge value="1000" max="999">
            <view class="demo-badge-btn">提醒</view>
          </m-badge>
        </view>
      </demo-block>

      <!-- 点状徽标 -->
      <demo-block title="点状徽标">
        <view class="demo-badge-row">
          <m-badge is-dot>
            <view class="demo-badge-btn">消息</view>
          </m-badge>
          <m-badge is-dot type="success">
            <view class="demo-badge-btn">通知</view>
          </m-badge>
          <m-badge is-dot hidden>
            <view class="demo-badge-btn">隐藏</view>
          </m-badge>
        </view>
      </demo-block>

      <!-- 不同类型 -->
      <demo-block title="不同类型">
        <view class="demo-badge-row">
          <m-badge value="1" type="primary">
            <view class="demo-badge-btn">主要</view>
          </m-badge>
          <m-badge value="2" type="success">
            <view class="demo-badge-btn">成功</view>
          </m-badge>
          <m-badge value="3" type="warning">
            <view class="demo-badge-btn">警告</view>
          </m-badge>
          <m-badge value="4" type="danger">
            <view class="demo-badge-btn">危险</view>
          </m-badge>
          <m-badge value="5" type="info">
            <view class="demo-badge-btn">信息</view>
          </m-badge>
        </view>
      </demo-block>

      <!-- 不同形状 -->
      <demo-block title="不同形状">
        <view class="demo-badge-row">
          <m-badge value="1" shape="circle">
            <view class="demo-badge-btn">圆形</view>
          </m-badge>
          <m-badge value="2" shape="square">
            <view class="demo-badge-btn">方形</view>
          </m-badge>
          <m-badge value="3" shape="bubble">
            <view class="demo-badge-btn">气泡</view>
          </m-badge>
        </view>
      </demo-block>

      <!-- 自定义位置 -->
      <demo-block title="自定义位置">
        <view class="demo-badge-row">
          <m-badge value="1" top="-5" right="-5">
            <view class="demo-badge-btn">上移左移</view>
          </m-badge>
          <m-badge value="2" top="10" right="10">
            <view class="demo-badge-btn">下移右移</view>
          </m-badge>
        </view>
      </demo-block>

      <!-- 自定义背景色 -->
      <demo-block title="自定义背景色">
        <view class="demo-badge-row">
          <m-badge value="1" bg-color="#722ed1">
            <view class="demo-badge-btn">紫色</view>
          </m-badge>
          <m-badge value="2" bg-color="#13c2c2">
            <view class="demo-badge-btn">青色</view>
          </m-badge>
          <m-badge value="3" bg-color="#faad14">
            <view class="demo-badge-btn">黄色</view>
          </m-badge>
        </view>
      </demo-block>

      <!-- 显示白色描边 -->
      <demo-block title="显示白色描边">
        <view class="demo-badge-row">
          <m-badge value="1" border>
            <view class="demo-badge-btn">带描边</view>
          </m-badge>
          <m-badge value="2" type="success" border>
            <view class="demo-badge-btn">彩色带描边</view>
          </m-badge>
        </view>
      </demo-block>

      <!-- 独立使用 -->
      <demo-block title="独立使用" desc="徽标可以独立使用，不依赖于其他元素">
        <view class="demo-badge-row">
          <m-badge value="123" right="-12" />
          <m-badge value="456" type="success" right="-30" />
          <m-badge value="789" type="warning" right="-48" />
          <m-badge value="99+" type="danger" right="-66" />
        </view>
      </demo-block>

      <!-- 实际应用场景 -->
      <demo-block title="实际应用场景">
        <view class="demo-badge-row">
          <m-badge value="5">
            <view class="demo-badge-btn">消息</view>
          </m-badge>
          <m-badge is-dot>
            <view class="demo-badge-btn">通知</view>
          </m-badge>
          <m-badge value="99+" type="warning">
            <view class="demo-badge-btn">活动</view>
          </m-badge>
          <m-badge value="3" type="success">
            <view class="demo-badge-btn">任务</view>
          </m-badge>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
// 无需状态管理，直接展示组件功能
</script>

<style lang="scss">
.m-badge-demo {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx 0;

  &__container {
    max-width: 1200rpx;
    margin: 0 auto;
    padding: 0 32rpx;
  }
}

.demo-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 36rpx;
  align-items: center;
}

.demo-badge-btn {
  width: 120rpx;
  height: 48rpx;
  background-color: #f5f5f5;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #666;
  border: 1rpx solid #e5e5e5;
}
</style>