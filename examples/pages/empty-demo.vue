<template>
  <view class="m-empty-demo">
    <view class="m-empty-demo__container">
      <!-- 基础用法 -->
      <view class="demo-empty-group">
        <view class="demo-header">
          <text class="demo-title">基础用法</text>
          <text class="demo-desc">默认空状态展示</text>
        </view>
        <view class="demo-content">
          <m-empty />
        </view>
      </view>

      <!-- 自定义提示文案 -->
      <view class="demo-empty-group">
        <view class="demo-header">
          <text class="demo-title">自定义提示文案</text>
          <text class="demo-desc">通过 tip 属性设置提示文字</text>
        </view>
        <view class="demo-content">
          <m-empty tip="暂无数据" />
        </view>
      </view>

      <!-- 自定义图标 -->
      <view class="demo-empty-group">
        <view class="demo-header">
          <text class="demo-title">自定义图标</text>
          <text class="demo-desc">通过 icon 属性设置图标类型</text>
        </view>
        <view class="demo-content">
          <m-empty icon="shake" tip="未搜索到相关内容" />
        </view>
      </view>

      <!-- 自定义图标大小 -->
      <view class="demo-empty-group">
        <view class="demo-header">
          <text class="demo-title">自定义图标大小</text>
          <text class="demo-desc">通过 icon-size 属性调整图标尺寸</text>
        </view>
        <view class="demo-content">
          <m-empty icon="printer" :icon-size="120" tip="购物车空空如也" />
        </view>
      </view>

      <!-- 自定义图片插槽 -->
      <view class="demo-empty-group">
        <view class="demo-header">
          <text class="demo-title">自定义图片插槽</text>
          <text class="demo-desc">使用 image 插槽自定义空状态图片</text>
        </view>
        <view class="demo-content">
          <m-empty tip="暂无收藏">
            <template #image>
              <view class="custom-icon">
                <text class="icon-text">♥</text>
              </view>
            </template>
          </m-empty>
        </view>
      </view>

      <!-- 底部插槽 -->
      <view class="demo-empty-group">
        <view class="demo-header">
          <text class="demo-title">底部插槽</text>
          <text class="demo-desc">使用 bottom 插槽添加操作按钮</text>
        </view>
        <view class="demo-content">
          <m-empty tip="暂无优惠券">
            <template #bottom>
              <m-button type="primary" size="small" style="margin-top: 10px;">去领取</m-button>
            </template>
          </m-empty>
        </view>
      </view>

      <!-- 完整示例 -->
      <view class="demo-empty-group">
        <view class="demo-header">
          <text class="demo-title">完整示例</text>
          <text class="demo-desc">结合多个属性和插槽的完整用法</text>
        </view>
        <view class="demo-content">
          <m-empty icon="mind-mapping" :icon-size="160" tip="暂无收货地址" custom-class="address-empty">
            <template #bottom>
              <m-button type="primary" size="small" style="margin-top: 10px;">添加收货地址</m-button>
            </template>
          </m-empty>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '',
      orderList: [],
      searchResult: []
    }
  },
  watch: {
    searchKeyword(newVal) {
      if (newVal.trim()) {
        this.searchResult = []
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-empty-demo {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx 0;

  &__container {
    max-width: 1200rpx;
    margin: 0 auto;
    padding: 0 32rpx;
  }
}

.demo-empty-group {
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
  min-height: 300rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .list-scene {
    padding: 0;

    .list-header {
      padding: 24rpx 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #f0f0f0;

      .list-title {
        font-size: 30rpx;
        font-weight: 600;
        color: #333;
      }

      .list-subtitle {
        font-size: 24rpx;
        color: #999;
      }
    }

    .list-body {
      padding: 48rpx 32rpx;
      min-height: 300rpx;

      .order-list {
        width: 100%;

        .order-item {
          padding: 24rpx 0;
          border-bottom: 1rpx dashed #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .order-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 16rpx;

            .order-id {
              font-size: 26rpx;
              color: #666;
            }

            .order-time {
              font-size: 24rpx;
              color: #999;
            }
          }

          .order-items {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16rpx;

            .order-product {
              font-size: 28rpx;
              color: #333;
            }

            .order-price {
              font-size: 28rpx;
              font-weight: 600;
              color: #fa4350;
            }
          }

          .order-status {
            font-size: 24rpx;
            padding: 8rpx 20rpx;
            border-radius: 20rpx;

            &.pending {
              background-color: #fff7e6;
              color: #d97706;
            }

            &.completed {
              background-color: #ecfdf5;
              color: #059669;
            }

            &.cancelled {
              background-color: #f8fafc;
              color: #64748b;
            }
          }
        }
      }
    }
  }

  .search-scene {
    padding: 0;

    .search-box {
      padding: 24rpx 32rpx;
      border-bottom: 1rpx solid #f0f0f0;
    }

    .search-result {
      padding: 48rpx 32rpx;
      min-height: 300rpx;

      .product-list {
        width: 100%;

        .product-item {
          display: flex;
          padding: 24rpx 0;
          border-bottom: 1rpx solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .product-image {
            width: 160rpx;
            height: 160rpx;
            margin-right: 24rpx;

            .image-placeholder {
              width: 100%;
              height: 100%;
              background-color: #f8f9fa;
              border-radius: 12rpx;
            }
          }

          .product-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .product-name {
              font-size: 28rpx;
              font-weight: 500;
              color: #333;
            }

            .product-desc {
              font-size: 24rpx;
              color: #999;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            .product-price {
              font-size: 28rpx;
              font-weight: 600;
              color: #fa4350;
            }
          }
        }
      }
    }
  }

  .custom-icon {
    width: 196rpx;
    height: 196rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fef2f2;
    border-radius: 50%;

    .icon-text {
      font-size: 100rpx;
      color: #fda4af;
    }
  }

  .address-empty {
    padding-bottom: 10rpx;
  }
}
</style>