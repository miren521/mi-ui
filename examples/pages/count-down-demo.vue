<template>
  <view class="m-count-down-demo">
    <view class="m-count-down-demo__container">
      <!-- 基础用法 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">基础用法</text>
          <text class="demo-desc">默认格式显示倒计时</text>
        </view>
        <view class="demo-content">
          <m-count-down :time="3661000" />
        </view>
      </view>

      <!-- 自定义格式 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">自定义格式</text>
          <text class="demo-desc">通过 format 属性自定义显示格式</text>
        </view>
        <view class="demo-content">
          <view class="format-list">
            <view class="format-item">
              <text class="format-label">DD天 HH时 mm分 ss秒</text>
              <m-count-down :time="86400000 * 2 + 3661000" format="DD天 HH时 mm分 ss秒" />
            </view>
            <view class="format-item">
              <text class="format-label">HH:mm:ss</text>
              <m-count-down :time="3661000" format="HH:mm:ss" />
            </view>
            <view class="format-item">
              <text class="format-label">mm分ss秒</text>
              <m-count-down :time="61000" format="mm分ss秒" />
            </view>
          </view>
        </view>
      </view>

      <!-- 毫秒级显示 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">毫秒级显示</text>
          <text class="demo-desc">开启 millisecond 属性显示毫秒</text>
        </view>
        <view class="demo-content">
          <m-count-down :time="60000" millisecond format="HH:mm:ss.SSS" />
        </view>
      </view>

      <!-- 手动控制 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">手动控制</text>
          <text class="demo-desc">通过 ref 手动控制开始、暂停、重置</text>
        </view>
        <view class="demo-content">
          <view class="control-display">
            <m-count-down ref="countDownRef" :time="60000" format="mm:ss" />
          </view>
          <view class="control-buttons">
            <m-button size="small" type="primary" @click="handleStart">开始</m-button>
            <m-button size="small" type="warning" @click="handlePause">暂停</m-button>
            <m-button size="small" type="info" @click="handleReset">重置</m-button>
          </view>
        </view>
      </view>

      <!-- 自定义显示 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">自定义显示</text>
          <text class="demo-desc">使用插槽自定义倒计时样式</text>
        </view>
        <view class="demo-content">
          <m-count-down :time="3661000">
            <template #default="{ current }">
              <view class="custom-count">
                <view class="count-item">
                  <text class="count-num">{{ current.days }}</text>
                  <text class="count-label">天</text>
                </view>
                <view class="count-separator">:</view>
                <view class="count-item">
                  <text class="count-num">{{ padZero(current.hours) }}</text>
                  <text class="count-label">时</text>
                </view>
                <view class="count-separator">:</view>
                <view class="count-item">
                  <text class="count-num">{{ padZero(current.minutes) }}</text>
                  <text class="count-label">分</text>
                </view>
                <view class="count-separator">:</view>
                <view class="count-item">
                  <text class="count-num">{{ padZero(current.seconds) }}</text>
                  <text class="count-label">秒</text>
                </view>
              </view>
            </template>
          </m-count-down>
        </view>
      </view>

      <!-- 活动倒计时 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">活动倒计时</text>
          <text class="demo-desc">模拟电商活动倒计时场景</text>
        </view>
        <view class="demo-content activity-scene">
          <view class="activity-header">
            <text class="activity-title">限时特惠</text>
            <text class="activity-subtitle">距离活动结束</text>
          </view>
          <view class="activity-countdown">
            <m-count-down :time="activityTime" format="DD天 HH:mm:ss" />
          </view>
          <view class="activity-products">
            <view class="product-card">
              <view class="product-image">
                <view class="image-placeholder"></view>
                <view class="product-tag">限时5折</view>
              </view>
              <view class="product-info">
                <text class="product-name">无线蓝牙耳机</text>
                <view class="product-price">
                  <text class="price-current">¥199</text>
                  <text class="price-original">¥399</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 监听事件 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">监听事件</text>
          <text class="demo-desc">监听 change 和 finish 事件</text>
        </view>
        <view class="demo-content">
          <m-count-down 
            :time="10000" 
            @change="handleChange" 
            @finish="handleFinish" 
          />
          <view class="event-logs">
            <text v-for="(log, index) in eventLogs" :key="index" class="log-item">{{ log }}</text>
          </view>
        </view>
      </view>

      <!-- 不自动开始 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">不自动开始</text>
          <text class="demo-desc">设置 auto-start 为 false</text>
        </view>
        <view class="demo-content">
          <m-count-down ref="manualCountDown" :time="30000" :auto-start="false" format="ss秒" />
          <m-button size="small" type="primary" @click="handleStartManual" style="margin-top: 10px;">点击开始</m-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activityTime: 86400000 + 3600000 * 2 + 60000 * 30,
      eventLogs: []
    }
  },
  methods: {
    padZero(num) {
      return num.toString().padStart(2, '0')
    },
    handleStart() {
      if (this.$refs.countDownRef) {
        this.$refs.countDownRef.start()
      }
    },
    handlePause() {
      if (this.$refs.countDownRef) {
        this.$refs.countDownRef.pause()
      }
    },
    handleReset() {
      if (this.$refs.countDownRef) {
        this.$refs.countDownRef.reset()
      }
    },
    handleStartManual() {
      if (this.$refs.manualCountDown) {
        this.$refs.manualCountDown.start()
      }
    },
    handleChange(current) {
      const timeStr = `${this.padZero(current.hours)}:${this.padZero(current.minutes)}:${this.padZero(current.seconds)}`
      this.eventLogs.unshift(`变化: ${timeStr}`)
      if (this.eventLogs.length > 5) {
        this.eventLogs.pop()
      }
    },
    handleFinish() {
      this.eventLogs.unshift('倒计时结束！')
      if (this.eventLogs.length > 5) {
        this.eventLogs.pop()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-count-down-demo {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx 0;

  &__container {
    max-width: 1200rpx;
    margin: 0 auto;
    padding: 0 32rpx;
  }
}

.demo-count-group {
  background-color: #fff;
  overflow: hidden;
  border-radius: 20rpx;
  margin: 10rpx 0 32rpx 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.demo-header {
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;

  .demo-title {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 8rpx;
  }

  .demo-desc {
    font-size: 24rpx;
    color: #999;
  }
}

.demo-content {
  padding: 48rpx 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .format-list {
    width: 100%;

    .format-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16rpx 0;
      border-bottom: 1rpx dashed #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .format-label {
        font-size: 26rpx;
        color: #666;
      }
    }
  }

  .control-display {
    font-size: 48rpx;
    font-weight: 600;
    color: #3b82f6;
    margin-bottom: 32rpx;
  }

  .control-buttons {
    display: flex;
    gap: 20rpx;
  }

  .custom-count {
    display: flex;
    align-items: center;

    .count-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #1e293b;
      padding: 16rpx 24rpx;
      border-radius: 12rpx;

      .count-num {
        font-size: 36rpx;
        font-weight: 600;
        color: #fff;
      }

      .count-label {
        font-size: 20rpx;
        color: #94a3b8;
        margin-top: 4rpx;
      }
    }

    .count-separator {
      font-size: 32rpx;
      font-weight: bold;
      color: #1e293b;
      margin: 0 12rpx;
    }
  }

  .activity-scene {
    padding: 0;
    background: linear-gradient(135deg, #fa4350 0%, #f87171 100%);

    .activity-header {
      padding: 32rpx;
      text-align: center;

      .activity-title {
        display: block;
        font-size: 40rpx;
        font-weight: 600;
        color: #fff;
        margin-bottom: 8rpx;
      }

      .activity-subtitle {
        font-size: 26rpx;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .activity-countdown {
      padding: 16rpx 32rpx 32rpx;
      text-align: center;
      font-size: 36rpx;
      font-weight: 600;
      color: #fff;
      letter-spacing: 2rpx;
    }

    .activity-products {
      padding: 24rpx;
      background-color: #fff;

      .product-card {
        display: flex;
        background-color: #f8f9fa;
        border-radius: 16rpx;
        overflow: hidden;

        .product-image {
          position: relative;
          width: 200rpx;
          height: 200rpx;

          .image-placeholder {
            width: 100%;
            height: 100%;
            background-color: #e2e8f0;
          }

          .product-tag {
            position: absolute;
            top: 12rpx;
            left: 12rpx;
            background-color: #fa4350;
            color: #fff;
            font-size: 20rpx;
            padding: 4rpx 12rpx;
            border-radius: 8rpx;
          }
        }

        .product-info {
          flex: 1;
          padding: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .product-name {
            font-size: 28rpx;
            font-weight: 500;
            color: #333;
          }

          .product-price {
            display: flex;
            align-items: baseline;
            gap: 12rpx;

            .price-current {
              font-size: 32rpx;
              font-weight: 600;
              color: #fa4350;
            }

            .price-original {
              font-size: 24rpx;
              color: #999;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }

  .event-logs {
    margin-top: 24rpx;
    width: 100%;

    .log-item {
      display: block;
      font-size: 24rpx;
      color: #666;
      padding: 8rpx 0;
      border-bottom: 1rpx dashed #f0f0f0;
    }
  }
}
</style>