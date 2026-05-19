<template>
  <view class="m-count-to-demo">
    <view class="m-count-to-demo__container">
      <!-- 基础用法 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">基础用法</text>
          <text class="demo-desc">默认从 0 计数到 2024</text>
        </view>
        <view class="demo-content">
          <m-count-to />
        </view>
      </view>

      <!-- 完全自定义样式 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">完全自定义样式</text>
          <text class="demo-desc">通过自定义类名和插槽实现完全自定义样式</text>
        </view>
        <view class="demo-content">
          <view class="custom-styles-card">
            <view class="custom-item">
              <view class="custom-label">用户增长</view>
              <view class="custom-number">
                <text class="custom-num">+</text>
                <m-count-to :end-val="12580" :decimals="0" :separator="''">
                  <template #default="{ current }">
                    <text class="custom-value">{{ formatNumber(current.total) }}</text>
                  </template>
                </m-count-to>
                <text class="custom-unit">人</text>
              </view>
            </view>
            <view class="custom-item">
              <view class="custom-label">销售额</view>
              <view class="custom-number sales">
                <text class="custom-num">¥</text>
                <m-count-to :end-val="985620.50" :decimals="2">
                  <template #default="{ current }">
                    <text class="custom-value">{{ formatCurrency(current.total) }}</text>
                  </template>
                </m-count-to>
              </view>
            </view>
            <view class="custom-item">
              <view class="custom-label">转化率</view>
              <view class="custom-number rate">
                <m-count-to :end-val="23.85" :decimals="2" :duration="2000">
                  <template #default="{ current }">
                    <text class="custom-value">{{ formatPercent(current.total) }}</text>
                  </template>
                </m-count-to>
                <text class="custom-unit">%</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 自定义样式 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">自定义样式</text>
          <text class="demo-desc">通过 type 和 color 属性设置样式</text>
        </view>
        <view class="demo-content">
          <view class="format-list">
            <view class="format-item">
              <text class="format-label">primary 主题</text>
              <m-count-to :end-val="1000" type="primary" />
            </view>
            <view class="format-item">
              <text class="format-label">success 主题</text>
              <m-count-to :end-val="1000" type="success" />
            </view>
            <view class="format-item">
              <text class="format-label">warning 主题</text>
              <m-count-to :end-val="1000" type="warning" />
            </view>
            <view class="format-item">
              <text class="format-label">error 主题</text>
              <m-count-to :end-val="1000" type="error" />
            </view>
            <view class="format-item">
              <text class="format-label">自定义颜色</text>
              <m-count-to :end-val="1000" color="#667eea" />
            </view>
          </view>
        </view>
      </view>

      <!-- 设置起始值和结束值 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">自定义数值</text>
          <text class="demo-desc">通过 startVal 和 endVal 设置起始和结束值</text>
        </view>
        <view class="demo-content">
          <view class="format-list">
            <view class="format-item">
              <text class="format-label">0 → 1000</text>
              <m-count-to :start-val="0" :end-val="1000" />
            </view>
            <view class="format-item">
              <text class="format-label">1000 → 0</text>
              <m-count-to :start-val="1000" :end-val="0" />
            </view>
            <view class="format-item">
              <text class="format-label">100 → 9999</text>
              <m-count-to :start-val="100" :end-val="9999" />
            </view>
          </view>
        </view>
      </view>

      <!-- 设置小数位数 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">小数位数</text>
          <text class="demo-desc">通过 decimals 设置保留的小数位数</text>
        </view>
        <view class="demo-content">
          <view class="format-list">
            <view class="format-item">
              <text class="format-label">保留 1 位小数</text>
              <m-count-to :start-val="0" :end-val="3.14" :decimals="1" />
            </view>
            <view class="format-item">
              <text class="format-label">保留 2 位小数</text>
              <m-count-to :start-val="0" :end-val="3.1415" :decimals="2" />
            </view>
            <view class="format-item">
              <text class="format-label">保留 4 位小数</text>
              <m-count-to :start-val="0" :end-val="3.1415926" :decimals="4" />
            </view>
          </view>
        </view>
      </view>

      <!-- 千分位分隔符 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">千分位分隔符</text>
          <text class="demo-desc">通过 separator 设置千分位分隔符</text>
        </view>
        <view class="demo-content">
          <view class="format-list">
            <view class="format-item">
              <text class="format-label">默认逗号分隔</text>
              <m-count-to :end-val="1234567" />
            </view>
            <view class="format-item">
              <text class="format-label">空格分隔</text>
              <m-count-to :end-val="1234567" separator=" " />
            </view>
            <view class="format-item">
              <text class="format-label">禁用分隔符</text>
              <m-count-to :end-val="1234567" :separator="''" />
            </view>
          </view>
        </view>
      </view>

      <!-- 前缀和后缀 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">前缀和后缀</text>
          <text class="demo-desc">通过 prefix 和 suffix 设置前后缀</text>
        </view>
        <view class="demo-content">
          <view class="format-list">
            <view class="format-item">
              <text class="format-label">金额显示</text>
              <m-count-to prefix="¥" :end-val="9999" />
            </view>
            <view class="format-item">
              <text class="format-label">百分比显示</text>
              <m-count-to :end-val="100" suffix="%" />
            </view>
            <view class="format-item">
              <text class="format-label">带单位</text>
              <m-count-to prefix="共 " :end-val="8888" suffix=" 人" />
            </view>
          </view>
        </view>
      </view>

      <!-- 设置时长 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">动画时长</text>
          <text class="demo-desc">通过 duration 设置动画时长（毫秒）</text>
        </view>
        <view class="demo-content">
          <view class="format-list">
            <view class="format-item">
              <text class="format-label">1 秒</text>
              <m-count-to :end-val="100" :duration="1000" />
            </view>
            <view class="format-item">
              <text class="format-label">3 秒</text>
              <m-count-to :end-val="100" :duration="3000" />
            </view>
            <view class="format-item">
              <text class="format-label">5 秒</text>
              <m-count-to :end-val="100" :duration="5000" />
            </view>
          </view>
        </view>
      </view>

      <!-- 手动控制 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">手动控制</text>
          <text class="demo-desc">通过 ref 调用 start、pause、reset 方法</text>
        </view>
        <view class="demo-content">
          <view class="control-card">
            <view class="control-display">
              <m-count-to ref="countToRef" :auto-start="false" :end-val="520" />
            </view>
            <view class="control-buttons">
              <button class="control-btn" @click="handleStart">开始</button>
              <button class="control-btn" @click="handlePause">暂停</button>
              <button class="control-btn" @click="handleReset">重置</button>
            </view>
          </view>
        </view>
      </view>

      <!-- 监听事件 -->
      <view class="demo-count-group">
        <view class="demo-header">
          <text class="demo-title">监听事件</text>
          <text class="demo-desc">监听 mounted 和 finish 事件</text>
        </view>
        <view class="demo-content">
          <view class="event-card">
            <m-count-to :end-val="100" @mounted="onMounted" @finish="onFinish" />
            <view class="event-logs">
              <text class="log-item" v-for="(log, index) in eventLogs" :key="index">{{ log }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import mCountTo from '../../packages/m-count-to/m-count-to.vue'

const countToRef = ref()
const eventLogs = ref<string[]>([])

function onMounted() {
  eventLogs.value.push('组件挂载完成')
}

function onFinish() {
  eventLogs.value.push('计数完成')
}

function handleStart() {
  countToRef.value?.start()
}

function handlePause() {
  countToRef.value?.pause()
}

function handleReset() {
  countToRef.value?.reset()
}

function formatNumber(val: number): string {
  return Math.round(val).toString()
}

function formatCurrency(val: number): string {
  return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function formatPercent(val: number): string {
  return val.toFixed(2)
}
</script>

<style lang="scss" scoped>
.m-count-to-demo {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 24rpx;
  box-sizing: border-box;

  &__container {
    width: 100%;
  }
}

.demo-count-group {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);

  .demo-header {
    margin-bottom: 20rpx;

    .demo-title {
      display: block;
      font-size: 30rpx;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8rpx;
    }

    .demo-desc {
      display: block;
      font-size: 24rpx;
      color: #999;
    }
  }

  .demo-content {
    padding-top: 8rpx;
  }
}

.format-list {
  .format-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16rpx 0;
    border-bottom: 1rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .format-label {
      font-size: 26rpx;
      color: #666;
    }
  }
}

.custom-styles-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  padding: 24rpx;

  .custom-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16rpx 0;
    border-bottom: 1rpx solid rgba(255, 255, 255, 0.2);

    &:last-child {
      border-bottom: none;
    }

    .custom-label {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.85);
    }

    .custom-number {
      display: flex;
      align-items: baseline;

      .custom-num {
        font-size: 24rpx;
        color: #fff;
        margin-right: 4rpx;
      }

      .custom-value {
        font-size: 40rpx;
        font-weight: 700;
        color: #fff;
      }

      .custom-unit {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.85);
        margin-left: 4rpx;
      }

      &.sales {
        .custom-value {
          color: #ffd93d;
        }
      }

      &.rate {
        .custom-value {
          color: #69ff94;
        }
      }
    }
  }
}

.control-card {
  text-align: center;

  .control-display {
    margin-bottom: 24rpx;
    padding: 24rpx;
    background: #fafafa;
    border-radius: 12rpx;
  }

  .control-buttons {
    display: flex;
    gap: 16rpx;

    .control-btn {
      flex: 1;
      height: 72rpx;
      border-radius: 36rpx;
      font-size: 28rpx;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border: none;

      &:active {
        opacity: 0.8;
      }
    }
  }
}

.event-card {
  text-align: center;

  .event-logs {
    margin-top: 24rpx;
    padding-top: 24rpx;
    border-top: 1rpx dashed #f0f0f0;
    max-height: 200rpx;
    overflow-y: auto;

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