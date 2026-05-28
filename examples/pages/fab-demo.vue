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

      <!-- 自定义触发按钮样式 -->
      <demo-block title="自定义触发按钮" desc="选择触发按钮的样式">
        <view class="demo-fab-row">
          <m-radio-group v-model="customStyle" direction="horizontal">
            <m-radio :value="false">默认样式</m-radio>
            <m-radio :value="true">自定义样式</m-radio>
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

      <!-- 手动触发演示 -->
      <demo-block title="手动触发" desc="通过按钮手动控制菜单展开/收起">
        <view class="demo-fab-row">
          <m-button type="primary" @click="handleOpen" class="fit-content-btn">展开菜单</m-button>
          <m-button type="warning" @click="handleClose" class="fit-content-btn">收起菜单</m-button>
          <m-button type="info" plain @click="handleToggle" class="fit-content-btn">切换状态</m-button>
        </view>
      </demo-block>

    </view>

    <!-- 浮动按钮 - 支持自定义样式切换 -->
    <m-fab
      ref="fabRef"
      :type="type"
      :position="position"
      :direction="direction"
      :disabled="disabled"
      :draggable="draggable"
      :inactive-icon="useCustomIcon ? 'down' : 'plus'"
      :active-icon="useCustomIcon ? 'up' : 'close'"
      :z-index="99"
      :active="isFabActive"
      @click="handleFabClick"
      @update:active="handleActiveChange"
    >
      <!-- 自定义触发按钮 -->
      <template #trigger="{ disabled }">
        <view v-if="customStyle" class="custom-fab-trigger" :class="{ 'custom-fab-trigger--disabled': disabled }">
          <m-icon name="apps" size="24" color="#fff" />
          <text class="custom-fab-trigger__text">菜单</text>
        </view>
        <!-- 默认触发按钮由组件内部渲染 -->
      </template>

      <!-- 操作按钮 - 根据方向动态显示 -->
      <template v-if="isHorizontalDirection">
        <!-- 左右方向：只显示图标 -->
        <m-button icon="edit" type="primary" round size="small" custom-class="m-fab__action-btn m-fab__action-btn--icon-only"></m-button>
        <m-button icon="star" type="warning" round size="small" custom-class="m-fab__action-btn m-fab__action-btn--icon-only"></m-button>
        <m-button icon="download" type="info" round size="small" custom-class="m-fab__action-btn m-fab__action-btn--icon-only"></m-button>
        <m-button icon="delete" type="danger" round size="small" custom-class="m-fab__action-btn m-fab__action-btn--icon-only"></m-button>
      </template>
      <template v-else>
        <!-- 上下方向：图标+文字 -->
        <m-button icon="edit" type="primary" round size="small" custom-class="m-fab__action-btn">编辑</m-button>
        <m-button icon="star" type="warning" round size="small" custom-class="m-fab__action-btn">收藏</m-button>
        <m-button icon="download" type="info" round size="small" custom-class="m-fab__action-btn">下载</m-button>
        <m-button icon="delete" type="danger" round size="small" custom-class="m-fab__action-btn">删除</m-button>
      </template>
    </m-fab>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import mRadioGroup from '../../packages/m-radio-group/m-radio-group.vue'
import mRadio from '../../packages/m-radio/m-radio.vue'
import mFab from '../../packages/m-fab/m-fab.vue'
import mButton from '../../packages/m-button/m-button.vue'
import mIcon from '../../packages/m-icon/m-icon.vue'

const type = ref<string>('primary')
const position = ref<string>('right-bottom')
const direction = ref<string>('top')
const disabled = ref<boolean>(false)
const draggable = ref<boolean>(false)
const useCustomIcon = ref<boolean>(false)
const customStyle = ref<boolean>(false)
const isFabActive = ref<boolean>(false)
const fabRef = ref<InstanceType<typeof mFab> | null>(null)

const isHorizontalDirection = computed(() => {
  return direction.value === 'left' || direction.value === 'right'
})

function handleFabClick() {
  console.log('fab clicked')
}

function handleActiveChange(val: boolean) {
  isFabActive.value = val
}

function handleOpen() {
  if (fabRef.value) {
    fabRef.value.open()
  }
}

function handleClose() {
  if (fabRef.value) {
    fabRef.value.close()
  }
}

function handleToggle() {
  if (fabRef.value) {
    if (isFabActive.value) {
      fabRef.value.close()
    } else {
      fabRef.value.open()
    }
  }
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .fit-content-btn {
    margin: 10rpx 20rpx 10rpx 0;
  }
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

.demo-fab-status-card {
  display: flex;
  align-items: center;
  padding: 20rpx 32rpx;
  background: #fff;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.demo-fab-status-label {
  font-size: 28rpx;
  color: #666;
  margin-right: 16rpx;
}

.demo-fab-status-value {
  font-size: 28rpx;
  font-weight: 500;
  color: #999;
  padding: 8rpx 20rpx;
  background: #f5f5f5;
  border-radius: 20rpx;

  &--active {
    color: #4d80f0;
    background: #e8f0fe;
  }
}

// 自定义悬浮按钮样式
.custom-fab-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90rpx;
  height: 90rpx;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  border-radius: 50%;
  box-shadow: 
    0 8rpx 24rpx rgba(99, 102, 241, 0.4),
    0 4rpx 12rpx rgba(139, 92, 246, 0.3),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  padding: 10rpx;

  &:active {
    transform: translateY(-2rpx) scale(0.98);
    box-shadow: 
      0 4rpx 12rpx rgba(99, 102, 241, 0.3),
      inset 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    transform: none !important;
    box-shadow: 0 4rpx 12rpx rgba(99, 102, 241, 0.2);
  }

  &__text {
    font-size: 20rpx;
    color: #fff;
    margin-top: 4rpx;
    font-weight: 500;
    text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
  }
}

:deep(.m-fab__action-btn) {
  margin: 16rpx 0;
}
</style>
