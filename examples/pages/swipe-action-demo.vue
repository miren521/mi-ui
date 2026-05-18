<template>
  <view class="m-swipe-action-demo">
    <view class="m-swipe-action-demo__container">
      <!-- 基础用法 -->
      <view class="demo-swipe-group">
        <view class="demo-header">
          <text class="demo-title">基础用法</text>
          <text class="demo-desc">从右侧滑动显示操作按钮</text>
        </view>
        <view class="demo-content">
          <m-swipe-action>
            <view class="swipe-content">
              <text>向左滑动查看操作</text>
            </view>
            <template #right>
              <view class="swipe-btn swipe-btn--delete">删除</view>
            </template>
          </m-swipe-action>
        </view>
      </view>

      <!-- 双向滑动 -->
      <view class="demo-swipe-group">
        <view class="demo-header">
          <text class="demo-title">双向滑动</text>
          <text class="demo-desc">左右两侧都可滑动显示操作按钮</text>
        </view>
        <view class="demo-content">
          <m-swipe-action>
            <view class="swipe-content">
              <text>左右滑动查看操作</text>
            </view>
            <template #left>
              <view class="swipe-btn swipe-btn--primary">置顶</view>
            </template>
            <template #right>
              <view class="swipe-btn swipe-btn--delete">删除</view>
            </template>
          </m-swipe-action>
        </view>
      </view>

      <!-- 多个操作按钮 -->
      <view class="demo-swipe-group">
        <view class="demo-header">
          <text class="demo-title">多个操作按钮</text>
          <text class="demo-desc">右侧支持多个操作按钮</text>
        </view>
        <view class="demo-content">
          <m-swipe-action>
            <view class="swipe-content">
              <text>向左滑动查看更多操作</text>
            </view>
            <template #right>
              <view class="swipe-btn swipe-btn--info">收藏</view>
              <view class="swipe-btn swipe-btn--warning">编辑</view>
              <view class="swipe-btn swipe-btn--delete">删除</view>
            </template>
          </m-swipe-action>
        </view>
      </view>

      <!-- 禁用状态 -->
      <view class="demo-swipe-group">
        <view class="demo-header">
          <text class="demo-title">禁用状态</text>
          <text class="demo-desc">禁用后无法滑动操作</text>
        </view>
        <view class="demo-content">
          <m-swipe-action disabled>
            <view class="swipe-content swipe-content--disabled">
              <text>已禁用滑动</text>
            </view>
            <template #right>
              <view class="swipe-btn swipe-btn--delete">删除</view>
            </template>
          </m-swipe-action>
        </view>
      </view>

      <!-- 控制关闭 -->
      <view class="demo-swipe-group">
        <view class="demo-header">
          <text class="demo-title">控制关闭</text>
          <text class="demo-desc">点击操作按钮后关闭滑动菜单</text>
        </view>
        <view class="demo-content">
          <m-swipe-action @click="handleClick">
            <view class="swipe-content">
              <text>点击操作按钮自动关闭</text>
            </view>
            <template #right>
              <view class="swipe-btn swipe-btn--delete">删除</view>
            </template>
          </m-swipe-action>
        </view>
      </view>

      <!-- 列表场景 -->
      <view class="demo-swipe-group">
        <view class="demo-header">
          <text class="demo-title">列表场景</text>
          <text class="demo-desc">配合列表使用，自动关闭其他已展开项</text>
        </view>
        <view class="demo-content list-content">
          <m-cell-group>
            <m-swipe-action v-for="(item, index) in listData" :key="item.id">
              <m-cell :title="item.title" :value="item.value" />
              <template #right>
                <view class="swipe-btn swipe-btn--delete" @click="handleDelete(index)">删除</view>
              </template>
            </m-swipe-action>
          </m-cell-group>
        </view>
      </view>

      <!-- beforeClose 钩子 -->
      <view class="demo-swipe-group">
        <view class="demo-header">
          <text class="demo-title">beforeClose 钩子</text>
          <text class="demo-desc">关闭前的确认钩子，支持异步</text>
        </view>
        <view class="demo-content">
          <m-swipe-action :before-close="beforeClose">
            <view class="swipe-content">
              <text>滑动关闭时触发确认</text>
            </view>
            <template #right>
              <view class="swipe-btn swipe-btn--delete">删除</view>
            </template>
          </m-swipe-action>
        </view>
      </view>

      <!-- 手动控制 -->
      <view class="demo-swipe-group">
        <view class="demo-header">
          <text class="demo-title">手动控制</text>
          <text class="demo-desc">通过 ref 手动控制展开和关闭</text>
        </view>
        <view class="demo-content">
          <view class="control-buttons">
            <m-button size="small" type="primary" @click="openLeft">展开左侧</m-button>
            <m-button size="small" type="primary" @click="openRight">展开右侧</m-button>
            <m-button size="small" type="info" @click="closeSwipe">关闭</m-button>
          </view>
          <m-swipe-action v-model="swipeState">
            <view class="swipe-content">
              <text>点击按钮控制展开/关闭</text>
            </view>
            <template #left>
              <view class="swipe-btn swipe-btn--primary">置顶</view>
            </template>
            <template #right>
              <view class="swipe-btn swipe-btn--delete">删除</view>
            </template>
          </m-swipe-action>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swipeState: 'close',
      listData: [
        { id: 1, title: '商品订单', value: '20240518001' },
        { id: 2, title: '服务订单', value: '20240518002' },
        { id: 3, title: '退款订单', value: '20240518003' }
      ]
    }
  },
  methods: {
    handleClick(e) {
      uni.showToast({
        title: `点击了 ${e.value}`,
        icon: 'none'
      })
    },
    handleDelete(index) {
      this.listData.splice(index, 1)
      uni.showToast({
        title: '删除成功',
        icon: 'success'
      })
    },
    beforeClose(reason, position) {
      return new Promise((resolve) => {
        uni.showModal({
          title: '确认删除',
          content: '确定要删除这条记录吗？',
          success: (res) => {
            resolve(res.confirm)
          }
        })
      })
    },
    openLeft() {
      this.swipeState = 'left'
    },
    openRight() {
      this.swipeState = 'right'
    },
    closeSwipe() {
      this.swipeState = 'close'
    }
  }
}
</script>

<style lang="scss" scoped>
.m-swipe-action-demo {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx 0;

  &__container {
    max-width: 1200rpx;
    margin: 0 auto;
    padding: 0 32rpx;
  }
}

.demo-swipe-group {
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
  padding: 24rpx 32rpx;

  .swipe-content {
    background-color: #f8f9fa;
    padding: 32rpx;
    border-radius: 12rpx;
    text-align: center;
    color: #666;
    font-size: 28rpx;

    &--disabled {
      background-color: #f0f0f0;
      color: #ccc;
    }
  }

  .list-content {
    padding: 0;

    .swipe-content {
      background-color: transparent;
      padding: 0;
    }
  }

  .control-buttons {
    display: flex;
    gap: 20rpx;
    margin-bottom: 24rpx;
  }
}

.swipe-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 40rpx;
  font-size: 28rpx;
  color: #fff;
  white-space: nowrap;

  &--primary {
    background-color: #4d80f0;
  }

  &--success {
    background-color: #34d19d;
  }

  &--warning {
    background-color: #f0883a;
  }

  &--info {
    background-color: #6c757d;
  }

  &--delete {
    background-color: #fa4350;
  }
}
</style>