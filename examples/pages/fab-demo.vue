<template>
  <view class="m-fab-demo">
    <view class="m-fab-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="点击展开浮动按钮菜单">
        <view class="demo-fab-content">
          <view class="demo-fab-tip">点击右下角浮动按钮展开菜单</view>
        </view>
      </demo-block>

      <!-- 按钮类型 -->
      <demo-block title="按钮类型" desc="选择不同的按钮颜色类型">
        <view class="demo-fab-row">
          <m-radio-group v-model="type" direction="horizontal">
            <m-radio value="primary">primary</m-radio>
            <m-radio value="success">success</m-radio>
            <m-radio value="warning">warning</m-radio>
            <m-radio value="danger">danger</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 菜单位置 -->
      <demo-block title="菜单位置" desc="选择菜单位于屏幕的哪个角落">
        <view class="demo-fab-row">
          <m-radio-group v-model="position" direction="horizontal">
            <m-radio value="right-bottom">右下角</m-radio>
            <m-radio value="left-bottom">左下角</m-radio>
            <m-radio value="right-top">右上角</m-radio>
            <m-radio value="left-top">左上角</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 菜单方向 -->
      <demo-block title="菜单方向" desc="展开菜单的弹出方向">
        <view class="demo-fab-row">
          <m-radio-group v-model="direction" direction="horizontal">
            <m-radio value="top">向上</m-radio>
            <m-radio value="bottom">向下</m-radio>
            <m-radio value="left">向左</m-radio>
            <m-radio value="right">向右</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 是否禁用 -->
      <demo-block title="禁用状态" desc="禁用浮动按钮，点击无响应">
        <view class="demo-fab-row">
          <m-radio-group v-model="disabled" direction="horizontal">
            <m-radio :value="false">启用</m-radio>
            <m-radio :value="true">禁用</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 可拖动 -->
      <demo-block title="可拖动" desc="拖动浮动按钮到屏幕任意位置">
        <view class="demo-fab-row">
          <m-radio-group v-model="draggable" direction="horizontal">
            <m-radio :value="false">关闭</m-radio>
            <m-radio :value="true">开启</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

      <!-- 展开图标 -->
      <demo-block title="自定义图标" desc="自定义展开和收起时的图标">
        <view class="demo-fab-row">
          <m-radio-group v-model="useCustomIcon" direction="horizontal">
            <m-radio :value="false">默认图标</m-radio>
            <m-radio :value="true">自定义图标</m-radio>
          </m-radio-group>
        </view>
      </demo-block>

    </view>

    <!-- 浮动按钮 -->
    <m-fab
      :type="type"
      :position="position"
      :direction="direction"
      :disabled="disabled"
      :draggable="draggable"
      :inactive-icon="useCustomIcon ? 'down' : 'plus'"
      :active-icon="useCustomIcon ? 'up' : 'close'"
      :z-index="99"
      @click="handleFabClick"
    >
      <m-button type="success" round size="small" custom-class="m-fab__action-btn">分享</m-button>
      <m-button type="primary" round size="small" custom-class="m-fab__action-btn">编辑</m-button>
      <m-button type="warning" round size="small" custom-class="m-fab__action-btn">收藏</m-button>
    </m-fab>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mRadioGroup from '../../packages/m-radio-group/m-radio-group.vue'
import mRadio from '../../packages/m-radio/m-radio.vue'
import mFab from '../../packages/m-fab/m-fab.vue'
import mButton from '../../packages/m-button/m-button.vue'

const type = ref<string>('primary')
const position = ref<string>('right-bottom')
const direction = ref<string>('top')
const disabled = ref<boolean>(false)
const draggable = ref<boolean>(false)
const useCustomIcon = ref<boolean>(false)

function handleFabClick() {
  console.log('fab clicked')
}
</script>

<style lang="scss" scoped>
.m-fab-demo {
  min-height: 100vh;
  background-color: #f5f5f7;

  &__container {
    padding: 32rpx 24rpx;
    padding-bottom: 90rpx;
  }
}

.demo-fab-content {
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  text-align: center;
}

.demo-fab-tip {
  font-size: 26rpx;
  color: #666;
}

.demo-fab-row {
  padding: 16rpx 0;
}

.demo-fab-scroll-area {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-fab-scroll-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.demo-fab-scroll-item__icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.demo-fab-scroll-item__content {
  flex: 1;
}

.demo-fab-scroll-item__title {
  display: block;
  font-size: 28rpx;
  color: #323233;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.demo-fab-scroll-item__desc {
  font-size: 24rpx;
  color: #999;
}

:deep(.m-fab__action-btn) {
  margin: 16rpx 0;
}
</style>
