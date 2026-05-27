<template>
  <view class="m-segmented-demo">
    <view class="m-segmented-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="最基础的分段器用法，通过 v-model 绑定选中值">
        <view class="demo-segmented-card">
          <m-segmented v-model="active1" :options="options1" />
        </view>
      </demo-block>

      <!-- 图标主题 -->
      <demo-block title="卡片主题" desc="默认的卡片主题样式，带有滑块动画">
        <view class="demo-segmented-card">
          <m-segmented v-model="active2" :options="options2" theme="card" />
        </view>
      </demo-block>

      <!-- 轮廓主题 -->
      <demo-block title="轮廓主题" desc="设置 theme 为 outline 显示轮廓样式">
        <view class="demo-segmented-card">
          <m-segmented v-model="active3" :options="options3" theme="outline" />
        </view>
      </demo-block>

      <!-- 对象数组选项 -->
      <demo-block title="对象数组选项" desc="支持传入对象数组，每个对象包含 value 和 disabled 属性">
        <view class="demo-segmented-card">
          <m-segmented v-model="active4" :options="options4" />
        </view>
      </demo-block>

      <!-- 禁用状态 -->
      <demo-block title="禁用状态" desc="设置 disabled 属性禁用整个分段器">
        <view class="demo-segmented-card">
          <m-segmented v-model="active5" :options="options5" disabled />
        </view>
      </demo-block>

      <!-- 单个选项禁用 -->
      <demo-block title="单个选项禁用" desc="在选项对象中设置 disabled: true 禁用单个选项">
        <view class="demo-segmented-card">
          <m-segmented v-model="active6" :options="options6" />
        </view>
      </demo-block>

      <!-- 自定义选项内容 -->
      <demo-block title="自定义选项内容" desc="通过 label 插槽自定义选项内容（文字+图片）">
        <view class="demo-segmented-card">
          <m-segmented v-model="active7" :options="options7">
            <template #label="{ option }">
              <view class="demo-custom-label">
                <image :src="option.image" mode="aspectFill" class="demo-label-image" />
                <text>{{ option.value }}</text>
              </view>
            </template>
          </m-segmented>
        </view>
      </demo-block>

      <!-- 振动反馈 -->
      <demo-block title="振动反馈" desc="设置 vibrateShort 开启点击振动反馈">
        <view class="demo-segmented-card">
          <m-segmented v-model="active8" :options="options8" vibrate-short />
        </view>
      </demo-block>

      <!-- 事件监听 -->
      <demo-block title="事件监听" desc="支持 change 和 click 事件">
        <view class="demo-segmented-card">
          <m-segmented v-model="active9" :options="options9" @change="handleChange" @click="handleClick" />
          <view class="demo-event-log">
            <text class="demo-event-label">事件日志：</text>
            <text class="demo-event-content">{{ eventLog }}</text>
          </view>
        </view>
      </demo-block>

      </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const active1 = ref('tab1')
const active2 = ref('推荐')
const active3 = ref('全部')
const active4 = ref('apple')
const active5 = ref('周一')
const active6 = ref('待付款')
const active7 = ref('home')
const active8 = ref('A')
const active9 = ref('选项1')
const eventLog = ref('')
const isMounted = ref(false)

const options1 = ['tab1', 'tab2', 'tab3']

const options2 = ['推荐', '热门', '最新']

const options3 = ['全部', '待付款', '待发货', '已完成']

const options4 = [
  { value: 'apple', label: '苹果' },
  { value: 'orange', label: '橙子' },
  { value: 'banana', label: '香蕉' }
]

const options5 = ['周一', '周二', '周三', '周四', '周五']

const options6 = [
  { value: '待付款', disabled: false },
  { value: '待发货', disabled: true },
  { value: '待收货', disabled: false },
  { value: '已完成', disabled: false }
]

const options7 = [
  { value: '韩梅', image: '/static/img/img_1.jpg' },
  { value: '安若', image: '/static/img/img_2.jpg' },
  { value: '王晓晓', image: '/static/img/img_3.jpg' }
]

const options8 = ['A', 'B', 'C', 'D']

const options9 = ['选项1', '选项2', '选项3']

function handleChange(e: any) {
  eventLog.value = `change: ${JSON.stringify(e)}`
  if (isMounted.value) {
    uni.showToast({ title: `切换到: ${e.value || e}`, icon: 'none' })
  }
}

onMounted(() => {
  isMounted.value = true
})

function handleClick(e: any) {
  eventLog.value = `click: ${JSON.stringify(e)}`
}
</script>

<style lang="scss" scoped>
.m-segmented-demo {
  min-height: 100vh;
  background-color: #f5f5f7;
  padding: 32rpx 0;

  &__container {
    max-width: 680rpx;
    margin: 0 auto;
    padding: 0 24rpx;
  }
}

.demo-segmented-card {
  padding: 32rpx;
  background: #fff;
  border-radius: 16rpx;
}

.demo-custom-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.demo-label-image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #f5f5f7;
}

.demo-label-icon {
  font-size: 40rpx;
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

.demo-btn-group {
  display: flex;
  gap: 20rpx;
  margin-top: 24rpx;
}
</style>
