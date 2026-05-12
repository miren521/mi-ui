<template>
  <view class="m-overlay-demo">
    <view class="m-overlay-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="展示最基础的遮罩层效果">
        <view class="demo-overlay-row">
          <m-button type="primary" @click="showBasicOverlay = true">显示遮罩层</m-button>
        </view>
        <m-overlay :show="showBasicOverlay" @click="showBasicOverlay = false">
          <!-- <view class="demo-overlay-content">
            <view class="demo-overlay-content__title">遮罩层内容</view>
            <view class="demo-overlay-content__text">点击遮罩层可以关闭</view>
            <m-button type="primary" @click="showBasicOverlay = false">关闭遮罩</m-button>
          </view> -->
        </m-overlay>
      </demo-block>

      <!-- 自定义背景色 -->
      <demo-block title="自定义背景色" desc="通过 CSS 变量自定义遮罩层背景色">
        <view class="demo-overlay-row">
          <m-button type="success" @click="showCustomColorOverlay = true">自定义背景色</m-button>
        </view>
        <m-overlay :show="showCustomColorOverlay" customStyle="background: rgba(255, 100, 100, 0.3);" @click="showCustomColorOverlay = false">
          <view class="demo-overlay-content">
            <view class="demo-overlay-content__title">自定义背景色</view>
            <view class="demo-overlay-content__text">红色半透明遮罩</view>
            <m-button type="primary" @click="showCustomColorOverlay = false">关闭遮罩</m-button>
          </view>
        </m-overlay>
      </demo-block>

      <!-- 自定义层级 -->
      <demo-block title="自定义层级" desc="通过 zIndex 属性设置遮罩层级">
        <view class="demo-overlay-row">
          <m-button type="warning" @click="showCustomZIndexOverlay = true">自定义层级</m-button>
        </view>
        <m-overlay :show="showCustomZIndexOverlay" :zIndex="100" @click="showCustomZIndexOverlay = false">
          <view class="demo-overlay-content">
            <view class="demo-overlay-content__title">自定义层级</view>
            <view class="demo-overlay-content__text">z-index: 100</view>
            <m-button type="primary" @click="showCustomZIndexOverlay = false">关闭遮罩</m-button>
          </view>
        </m-overlay>
      </demo-block>

      <!-- 动画时长 -->
      <demo-block title="动画时长" desc="通过 duration 属性设置动画时长">
        <view class="demo-overlay-row">
          <m-button type="danger" @click="showCustomDurationOverlay = true">慢速动画</m-button>
        </view>
        <m-overlay :show="showCustomDurationOverlay" :duration="1000" @click="showCustomDurationOverlay = false">
          <view class="demo-overlay-content">
            <view class="demo-overlay-content__title">慢速动画</view>
            <view class="demo-overlay-content__text">动画时长: 1000ms</view>
            <m-button type="primary" @click="showCustomDurationOverlay = false">关闭遮罩</m-button>
          </view>
        </m-overlay>
      </demo-block>

      <!-- 不锁定滚动 -->
      <demo-block title="不锁定滚动" desc="通过 lockScroll 属性控制是否锁定页面滚动">
        <view class="demo-overlay-row">
          <m-button type="info" @click="showNoLockScrollOverlay = true">不锁定滚动</m-button>
        </view>
        <m-overlay :show="showNoLockScrollOverlay" :lockScroll="false" @click="showNoLockScrollOverlay = false">
          <view class="demo-overlay-content">
            <view class="demo-overlay-content__title">不锁定滚动</view>
            <view class="demo-overlay-content__text">遮罩层显示时仍可滚动页面</view>
            <m-button type="primary" @click="showNoLockScrollOverlay = false">关闭遮罩</m-button>
          </view>
        </m-overlay>
      </demo-block>

      <!-- 过渡事件 -->
      <demo-block title="过渡事件" desc="展示遮罩层的过渡生命周期事件">
        <view class="demo-overlay-row">
          <m-button type="primary" @click="showEventOverlay = true">查看事件</m-button>
        </view>
        <view class="demo-overlay-events">
          <view class="demo-overlay-events__title">事件日志：</view>
          <scroll-view scroll-y class="demo-overlay-events__list">
            <view v-for="(event, index) in eventLogs" :key="index" class="demo-overlay-events__item">
              {{ event }}
            </view>
          </scroll-view>
        </view>
        <m-overlay
          :show="showEventOverlay"
          @click="showEventOverlay = false"
          @before-enter="addEventLog('before-enter')"
          @enter="addEventLog('enter')"
          @after-enter="addEventLog('after-enter')"
          @before-leave="addEventLog('before-leave')"
          @leave="addEventLog('leave')"
          @after-leave="addEventLog('after-leave')"
        >
          <view class="demo-overlay-content">
            <view class="demo-overlay-content__title">过渡事件</view>
            <view class="demo-overlay-content__text">打开控制台查看事件触发顺序</view>
            <m-button type="primary" @click="showEventOverlay = false">关闭遮罩</m-button>
          </view>
        </m-overlay>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showBasicOverlay = ref(false)
const showCustomColorOverlay = ref(false)
const showCustomZIndexOverlay = ref(false)
const showCustomDurationOverlay = ref(false)
const showNoLockScrollOverlay = ref(false)
const showEventOverlay = ref(false)
const eventLogs = ref<string[]>([])

function addEventLog(eventName: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.push(`${time} - ${eventName}`)
  console.log(`[Overlay Event] ${eventName}`)
}
</script>

<style lang="scss">
.m-overlay-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-overlay-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

.demo-overlay-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  &__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }

  &__text {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.5;
  }
}

.demo-overlay-events {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 12px;
  }

  &__list {
    max-height: 200px;
    overflow-y: auto;
  }

  &__item {
    font-size: 12px;
    color: #999;
    padding: 4px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>