<template>
  <view class="m-pagination-demo">
    <view class="m-pagination-demo__container">
      <demo-block title="基础用法" desc="通过 v-model 绑定当前页码，totalPage 指定总页数">
        <view class="demo-pagination-card">
          <m-pagination v-model="currentPage1" :total-page="10" />
        </view>
      </demo-block>

      <demo-block title="通过总数计算" desc="通过 total 和 pageSize 自动计算总页数">
        <view class="demo-pagination-card">
          <m-pagination v-model="currentPage2" :total="100" :page-size="10" />
        </view>
      </demo-block>

      <demo-block title="显示图标" desc="设置 showIcon 显示图标形式的分页按钮">
        <view class="demo-pagination-card">
          <m-pagination v-model="currentPage3" :total-page="10" show-icon />
        </view>
      </demo-block>

      <demo-block title="显示信息" desc="设置 showMessage 显示当前页码、总条数等信息">
        <view class="demo-pagination-card">
          <m-pagination v-model="currentPage4" :total="100" :page-size="10" show-message />
        </view>
      </demo-block>

      <demo-block title="自定义文本" desc="通过 prevText 和 nextText 自定义按钮文本">
        <view class="demo-pagination-card">
          <m-pagination v-model="currentPage5" :total-page="10" prev-text="上一页" next-text="下一页" />
        </view>
      </demo-block>

      <demo-block title="按钮变体" desc="通过 buttonVariant 设置按钮样式">
        <view class="demo-pagination-card">
          <view class="demo-variant-row">
            <text class="demo-variant-label">base:</text>
            <m-pagination v-model="currentPage6" :total-page="5" button-variant="base" />
          </view>
          <view class="demo-variant-row">
            <text class="demo-variant-label">plain:</text>
            <m-pagination v-model="currentPage6" :total-page="5" button-variant="plain" />
          </view>
          <view class="demo-variant-row">
            <text class="demo-variant-label">dashed:</text>
            <m-pagination v-model="currentPage6" :total-page="5" button-variant="dashed" />
          </view>
          <view class="demo-variant-row">
            <text class="demo-variant-label">text:</text>
            <m-pagination v-model="currentPage6" :total-page="5" button-variant="text" />
          </view>
        </view>
      </demo-block>

      <demo-block title="隐藏单页" desc="设置 hideIfOnePage 当只有一页时隐藏分页">
        <view class="demo-pagination-card">
          <m-pagination v-model="currentPage7" :total-page="1" hide-if-one-page />
          <view class="demo-hidden-tip">当只有一页时，分页组件已隐藏</view>
        </view>
      </demo-block>

      <demo-block title="事件监听" desc="支持 change 事件，返回当前页码信息">
        <view class="demo-pagination-card">
          <m-pagination v-model="currentPage8" :total-page="10" @change="handleChange" />
          <view class="demo-event-log">
            <text class="demo-event-label">事件日志：</text>
            <text class="demo-event-content">{{ eventLog }}</text>
          </view>
        </view>
      </demo-block>

      <demo-block title="自定义插槽" desc="通过插槽自定义上一页、下一页按钮和页码显示">
        <view class="demo-pagination-card">
          <m-pagination v-model="currentPage9" :total-page="10">
            <template #prev>
              <m-button type="default" size="small" @click="currentPage9 > 1 && currentPage9--">
                ⬅️ 上一页
              </m-button>
            </template>
            <template #size>
              <view class="demo-custom-size">
                <text>当前: {{ currentPage9 }}</text>
              </view>
            </template>
            <template #next>
              <m-button type="success" size="small" @click="currentPage9 < 10 && currentPage9++">
                下一页 ➡️
              </m-button>
            </template>
          </m-pagination>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)
const currentPage4 = ref(1)
const currentPage5 = ref(1)
const currentPage6 = ref(1)
const currentPage7 = ref(1)
const currentPage8 = ref(1)
const currentPage9 = ref(1)
const eventLog = ref('')

function handleChange(e: any) {
  eventLog.value = `change: ${JSON.stringify(e)}`
  uni.showToast({ title: `跳转到第 ${e.value} 页`, icon: 'none' })
}
</script>

<style lang="scss" scoped>
.m-pagination-demo {
  min-height: 100vh;
  background-color: #f5f5f7;
  padding: 32rpx 0;

  &__container {
    max-width: 680rpx;
    margin: 0 auto;
    padding: 0 24rpx;
  }
}

.demo-pagination-card {
  padding: 32rpx;
  background: #fff;
  border-radius: 16rpx;
}

.demo-variant-row {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.demo-variant-label {
  width: 120rpx;
  font-size: 28rpx;
  color: #999;
  margin-right: 20rpx;
}

.demo-hidden-tip {
  margin-top: 20rpx;
  text-align: center;
  font-size: 26rpx;
  color: #999;
}

.demo-event-log {
  margin-top: 24rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
}

.demo-event-label {
  font-size: 24rpx;
  color: #999;
}

.demo-event-content {
  font-size: 24rpx;
  color: #666;
  word-break: break-all;
}

.demo-custom-size {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
}
</style>
