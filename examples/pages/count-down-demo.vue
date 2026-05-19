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
      <view class="demo-count-group activity-card">
        <view class="demo-header">
          <text class="demo-title">活动倒计时</text>
          <text class="demo-desc">模拟电商活动倒计时场景</text>
        </view>
        <view class="demo-content">
          <view class="activity-card">
            <view class="activity-header">
              <view class="activity-badge">HOT</view>
              <text class="activity-title">限时特惠</text>
              <text class="activity-subtitle">距离活动结束</text>
              <view class="countdown-wrap">
                <m-count-down :time="activityTime">
                  <template #default="{ current }">
                    <view class="countdown">
                      <view class="countdown-item">
                        <text class="countdown-num">{{ padZero(current.days) }}</text>
                        <text class="countdown-label">天</text>
                      </view>
                      <view class="countdown-item">
                        <text class="countdown-num">{{ padZero(current.hours) }}</text>
                        <text class="countdown-label">时</text>
                      </view>
                      <view class="countdown-item">
                        <text class="countdown-num">{{ padZero(current.minutes) }}</text>
                        <text class="countdown-label">分</text>
                      </view>
                      <view class="countdown-item">
                        <text class="countdown-num">{{ padZero(current.seconds) }}</text>
                        <text class="countdown-label">秒</text>
                      </view>
                    </view>
                  </template>
                </m-count-down>
              </view>
            </view>
            <view class="product-card">
              <view class="product-image">
                <text class="icon">🎧</text>
                <view class="discount-tag">5折</view>
              </view>
              <view class="product-info">
                <text class="product-name">无线蓝牙耳机 Pro</text>
                <text class="product-desc">主动降噪 · 40小时续航 · 蓝牙5.3</text>
                <view class="price-row">
                  <view class="current-price">
                    <text class="symbol">¥</text>
                    <text class="value">199</text>
                  </view>
                  <text class="original-price">¥399</text>
                  <view class="sales">已售 2.6万</view>
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

  .activity-card {
    overflow: visible;
    padding: 24rpx;
    background: transparent;
    box-shadow: none;

    .demo-content {
      padding: 0;
    }
  }

  .activity-card {
    background: #fff;
    border-radius: 24rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);

    .activity-header {
      background: linear-gradient(135deg, #ff4757 0%, #ff6b81 50%, #ff7f50 100%);
      padding: 32rpx;
      text-align: center;

      .activity-badge {
        display: inline-block;
        background: #ffd93d;
        color: #c67b00;
        font-size: 22rpx;
        font-weight: 700;
        padding: 6rpx 16rpx;
        border-radius: 16rpx;
        margin-bottom: 12rpx;
      }

      .activity-title {
        display: block;
        font-size: 38rpx;
        font-weight: 700;
        color: #fff;
        margin-bottom: 8rpx;
      }

      .activity-subtitle {
        display: block;
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 20rpx;
      }

      .countdown-wrap {
        display: flex;
        justify-content: center;
      }

      .countdown {
        display: flex;
        align-items: center;
        gap: 8rpx;
      }

      .countdown-item {
        background: rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(10px);
        border-radius: 12rpx;
        padding: 16rpx 18rpx;
        min-width: 72rpx;
        text-align: center;

        .countdown-num {
          display: block;
          font-size: 36rpx;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }

        .countdown-label {
          display: block;
          font-size: 18rpx;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 4rpx;
        }
      }
    }

    .product-card {
      padding: 24rpx;
      display: flex;
      gap: 20rpx;

      .product-image {
        position: relative;
        width: 160rpx;
        height: 160rpx;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .icon {
          font-size: 56rpx;
        }

        .discount-tag {
          position: absolute;
          top: -8rpx;
          right: -8rpx;
          background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
          color: #fff;
          font-size: 22rpx;
          font-weight: 600;
          padding: 6rpx 14rpx;
          border-radius: 20rpx;
          box-shadow: 0 4rpx 12rpx rgba(255, 71, 87, 0.4);
        }
      }

      .product-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .product-name {
          font-size: 30rpx;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.3;
        }

        .product-desc {
          font-size: 24rpx;
          color: #888;
          line-height: 1.4;
        }

        .price-row {
          display: flex;
          align-items: center;
          gap: 12rpx;

          .current-price {
            display: flex;
            align-items: baseline;

            .symbol {
              font-size: 24rpx;
              font-weight: 600;
              color: #ff4757;
            }

            .value {
              font-size: 38rpx;
              font-weight: 700;
              color: #ff4757;
            }
          }

          .original-price {
            font-size: 22rpx;
            color: #bbb;
            text-decoration: line-through;
          }

          .sales {
            margin-left: auto;
            background: rgba(255, 71, 87, 0.08);
            color: #ff4757;
            font-size: 20rpx;
            padding: 4rpx 12rpx;
            border-radius: 16rpx;
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
