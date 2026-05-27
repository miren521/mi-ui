<template>
  <view class="m-sidebar-demo">
    <view class="m-sidebar-demo__container">
      <demo-block title="基础用法" desc="最基础的侧边栏用法，通过 v-model 绑定选中值">
        <view class="demo-sidebar-card">
          <view class="demo-sidebar-wrapper">
            <m-sidebar v-model="active1">
              <m-sidebar-item label="推荐" :value="0" />
              <m-sidebar-item label="热点" :value="1" />
              <m-sidebar-item label="视频" :value="2" />
              <m-sidebar-item label="图片" :value="3" />
            </m-sidebar>
            <view class="demo-sidebar-content">
              <view class="demo-content-item" v-if="active1 === 0">推荐内容</view>
              <view class="demo-content-item" v-if="active1 === 1">热点内容</view>
              <view class="demo-content-item" v-if="active1 === 2">视频内容</view>
              <view class="demo-content-item" v-if="active1 === 3">图片内容</view>
            </view>
          </view>
        </view>
      </demo-block>

      <demo-block title="带徽标" desc="通过 badge 属性添加徽标提示">
        <view class="demo-sidebar-card">
          <m-sidebar v-model="active2">
            <m-sidebar-item label="推荐" :value="0" />
            <m-sidebar-item label="消息" :value="1" badge="5" />
            <m-sidebar-item label="通知" :value="2" :is-dot="true" />
            <m-sidebar-item label="设置" :value="3" />
          </m-sidebar>
        </view>
      </demo-block>

      <demo-block title="带图标" desc="通过 icon 属性设置图标">
        <view class="demo-sidebar-card">
          <m-sidebar v-model="active3">
            <m-sidebar-item label="首页" :value="0" icon="home" />
            <m-sidebar-item label="搜索" :value="1" icon="search" />
            <m-sidebar-item label="消息" :value="2" icon="message" />
            <m-sidebar-item label="我的" :value="3" icon="user" />
          </m-sidebar>
        </view>
      </demo-block>

      <demo-block title="禁用状态" desc="设置 disabled 属性禁用选项">
        <view class="demo-sidebar-card">
          <m-sidebar v-model="active4">
            <m-sidebar-item label="推荐" :value="0" />
            <m-sidebar-item label="热点" :value="1" disabled />
            <m-sidebar-item label="视频" :value="2" />
            <m-sidebar-item label="图片" :value="3" />
          </m-sidebar>
        </view>
      </demo-block>

      <demo-block title="自定义图标" desc="通过 icon 插槽自定义图标内容">
        <view class="demo-sidebar-card">
          <m-sidebar v-model="active5">
            <m-sidebar-item label="首页" :value="0">
              <template #icon>
                <text class="demo-custom-icon">🏠</text>
              </template>
            </m-sidebar-item>
            <m-sidebar-item label="搜索" :value="1">
              <template #icon>
                <text class="demo-custom-icon">🔍</text>
              </template>
            </m-sidebar-item>
            <m-sidebar-item label="消息" :value="2">
              <template #icon>
                <text class="demo-custom-icon">💬</text>
              </template>
            </m-sidebar-item>
          </m-sidebar>
        </view>
      </demo-block>

      <demo-block title="事件监听" desc="支持 change 事件，返回选中项的 value 和 label">
        <view class="demo-sidebar-card">
          <m-sidebar v-model="active6" @change="handleChange">
            <m-sidebar-item label="选项一" :value="0" />
            <m-sidebar-item label="选项二" :value="1" />
            <m-sidebar-item label="选项三" :value="2" />
          </m-sidebar>
          <view class="demo-event-log">
            <text class="demo-event-label">事件日志：</text>
            <text class="demo-event-content">{{ eventLog }}</text>
          </view>
        </view>
      </demo-block>

      <demo-block title="切换拦截" desc="通过 beforeChange 拦截切换操作">
        <view class="demo-sidebar-card">
          <m-sidebar v-model="active7" :before-change="beforeChange">
            <m-sidebar-item label="允许切换" :value="0" />
            <m-sidebar-item label="拦截切换" :value="1" />
            <m-sidebar-item label="选项三" :value="2" />
          </m-sidebar>
          <view class="demo-tip">点击「拦截切换」项会触发拦截</view>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const active6 = ref(0)
const active7 = ref(0)
const eventLog = ref('')

function handleChange(e: any) {
  eventLog.value = `change: ${JSON.stringify(e)}`
  uni.showToast({ title: `切换到: ${e.label}`, icon: 'none' })
}

function beforeChange(value: number | string) {
  if (value === 1) {
    uni.showToast({ title: '此选项已被拦截', icon: 'none' })
    return false
  }
  return true
}
</script>

<style lang="scss" scoped>
.m-sidebar-demo {
  min-height: 100vh;
  background-color: #f5f5f7;
  padding: 32rpx 0;

  &__container {
    max-width: 680rpx;
    margin: 0 auto;
    padding: 0 24rpx;
  }
}

.demo-sidebar-card {
}

.demo-sidebar-wrapper {
  display: flex;
  height: 400rpx;
  background: #f5f5f7;
  border-radius: 16rpx;
}

.demo-sidebar-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f7;
  border-radius: 0 16rpx 16rpx 0;
}

.demo-content-item {
  font-size: 32rpx;
  color: #666;
}

.demo-custom-icon {
  font-size: 32rpx;
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

.demo-tip {
  margin-top: 24rpx;
  padding: 16rpx;
  background: #fff3e8;
  border-radius: 8rpx;
  font-size: 24rpx;
  color: #f57f00;
}
</style>
