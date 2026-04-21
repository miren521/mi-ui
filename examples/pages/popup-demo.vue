<template>
  <view class="m-popup-demo">
    <view class="m-popup-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="从底部弹出的基本弹窗">
        <view class="demo-popup-row">
          <m-button type="primary" @click="showBasicPopup = true">打开弹窗</m-button>
        </view>
        <m-popup v-model:modelValue="showBasicPopup" position="bottom">
          <view class="demo-popup-content">
            <view class="demo-popup-content__title">提示</view>
            <view class="demo-popup-content__text">这是一个从底部弹出的基本弹窗</view>
            <view class="demo-popup-content__actions">
              <m-button type="info" @click="showBasicPopup = false">取消</m-button>
              <m-button type="primary" @click="showBasicPopup = false">确定</m-button>
            </view>
          </view>
        </m-popup>
      </demo-block>

      <!-- 弹出位置 -->
      <demo-block title="弹出位置" desc="展示不同 position 的弹出效果">
        <view class="demo-popup-row">
          <m-button type="primary" @click="showCenterPopup = true">居中弹窗</m-button>
          <m-button type="success" @click="showTopPopup = true">顶部弹窗</m-button>
          <m-button type="warning" @click="showBottomPopup = true">底部弹窗</m-button>
          <m-button type="danger" @click="showLeftPopup = true">左侧弹窗</m-button>
          <m-button type="info" @click="showRightPopup = true">右侧弹窗</m-button>
        </view>

        <m-popup v-model:modelValue="showCenterPopup" position="center">
          <view class="demo-popup-content">
            <view class="demo-popup-content__title">居中弹窗</view>
            <view class="demo-popup-content__text">这是一个居中显示的弹窗</view>
            <view class="demo-popup-content__actions">
              <m-button type="primary" @click="showCenterPopup = false">关闭</m-button>
            </view>
          </view>
        </m-popup>

        <m-popup v-model:modelValue="showTopPopup" position="top">
          <view class="demo-popup-content demo-popup-content--top">
            <view class="demo-popup-content__text">这是一个从顶部弹出的弹窗</view>
            <m-button type="primary" @click="showTopPopup = false">关闭</m-button>
          </view>
        </m-popup>

        <m-popup v-model:modelValue="showBottomPopup" position="bottom">
          <view class="demo-popup-content">
            <view class="demo-popup-content__title">底部弹窗</view>
            <view class="demo-popup-content__text">这是一个从底部弹出的弹窗</view>
            <view class="demo-popup-content__actions">
              <m-button type="info" @click="showBottomPopup = false">取消</m-button>
              <m-button type="primary" @click="showBottomPopup = false">确定</m-button>
            </view>
          </view>
        </m-popup>

        <m-popup v-model:modelValue="showLeftPopup" position="left" :customStyle="{ width: '280px' }">
          <view class="demo-popup-content demo-popup-content--side">
            <view class="demo-popup-content__title">左侧弹窗</view>
            <view class="demo-popup-content__text">这是一个从左侧弹出的弹窗</view>
            <m-button type="primary" @click="showLeftPopup = false">关闭</m-button>
          </view>
        </m-popup>

        <m-popup v-model:modelValue="showRightPopup" position="right" :customStyle="{ width: '280px' }">
          <view class="demo-popup-content demo-popup-content--side">
            <view class="demo-popup-content__title">右侧弹窗</view>
            <view class="demo-popup-content__text">这是一个从右侧弹出的弹窗</view>
            <m-button type="primary" @click="showRightPopup = false">关闭</m-button>
          </view>
        </m-popup>
      </demo-block>

      <!-- 带关闭按钮 -->
      <demo-block title="带关闭按钮" desc="展示 closable 属性">
        <view class="demo-popup-row">
          <m-button type="primary" @click="showClosablePopup = true">带关闭按钮</m-button>
        </view>
        <m-popup v-model:modelValue="showClosablePopup" position="center" closable>
          <view class="demo-popup-content">
            <view class="demo-popup-content__title">带关闭按钮</view>
            <view class="demo-popup-content__text">点击右上角的关闭按钮可以关闭弹窗</view>
            <view class="demo-popup-content__actions">
              <m-button type="primary" @click="showClosablePopup = false">确定</m-button>
            </view>
          </view>
        </m-popup>
      </demo-block>

      <!-- 自定义内容 -->
      <demo-block title="自定义内容" desc="展示表单、列表等复杂内容">
        <view class="demo-popup-row">
          <m-button type="primary" @click="showCustomContentPopup = true">自定义内容</m-button>
        </view>
        <m-popup v-model:modelValue="showCustomContentPopup" position="center" :customStyle="{ width: '320px' }">
          <view class="demo-popup-content">
            <view class="demo-popup-content__title">表单示例</view>
            <view class="demo-popup-content__form">
              <view class="demo-popup-content__form-item">
                <view class="demo-popup-content__form-label">姓名</view>
                <view class="demo-popup-content__form-input">
                  <input type="text" placeholder="请输入姓名" />
                </view>
              </view>
              <view class="demo-popup-content__form-item">
                <view class="demo-popup-content__form-label">邮箱</view>
                <view class="demo-popup-content__form-input">
                  <input type="email" placeholder="请输入邮箱" />
                </view>
              </view>
            </view>
            <view class="demo-popup-content__actions">
              <m-button type="info" @click="showCustomContentPopup = false">取消</m-button>
              <m-button type="primary" @click="showCustomContentPopup = false">提交</m-button>
            </view>
          </view>
        </m-popup>
      </demo-block>

      <!-- 自定义样式 -->
      <demo-block title="自定义样式" desc="展示 custom-style 自定义弹窗样式">
        <view class="demo-popup-row">
          <m-button type="primary" @click="showCustomStylePopup = true">自定义样式</m-button>
        </view>
        <m-popup v-model:modelValue="showCustomStylePopup" position="center" closable :customStyle="{
          width: '320px',
          borderRadius: '24rpx',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '0'
        }">
          <view class="demo-popup-content demo-popup-content--gradient">
            <view class="demo-popup-content--gradient__header">
              <view class="demo-popup-content--gradient__avatar">
                <m-icon name="success" :size="32" color="#fff" />
              </view>
              <view class="demo-popup-content--gradient__badge">操作成功</view>
            </view>
            <view class="demo-popup-content--gradient__body">
              <view class="demo-popup-content--gradient__title">恭喜您！</view>
              <view class="demo-popup-content--gradient__desc">您的请求已成功处理，请查看详情信息。</view>
              <view class="demo-popup-content--gradient__info">
                <view class="demo-popup-content--gradient__info-item">
                  <view class="demo-popup-content--gradient__info-label">处理时间</view>
                  <view class="demo-popup-content--gradient__info-value">2024-01-15 14:30</view>
                </view>
                <view class="demo-popup-content--gradient__info-item">
                  <view class="demo-popup-content--gradient__info-label">订单编号</view>
                  <view class="demo-popup-content--gradient__info-value">ORD20240115001</view>
                </view>
              </view>
            </view>
            <view class="demo-popup-content--gradient__footer">
              <m-button type="success"
                customClass="demo-popup-content--gradient__btn demo-popup-content--gradient__btn--secondary"
                @click="showCustomStylePopup = false">
                查看详情
              </m-button>
              <m-button type="primary"
                customClass="demo-popup-content--gradient__btn demo-popup-content--gradient__btn--primary"
                @click="showCustomStylePopup = false">
                继续操作
              </m-button>
            </view>
          </view>
        </m-popup>
      </demo-block>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showBasicPopup = ref(false)
const showCenterPopup = ref(false)
const showTopPopup = ref(false)
const showBottomPopup = ref(false)
const showLeftPopup = ref(false)
const showRightPopup = ref(false)
const showClosablePopup = ref(false)
const showCustomContentPopup = ref(false)
const showCustomStylePopup = ref(false)
</script>

<style lang="scss">
.m-popup-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-popup-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
}

.demo-popup-content {
  padding: 20px;

  &__title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    text-align: center;
  }

  &__text {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 20px;
    text-align: center;
  }

  &__actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  &--top {
    padding: 16px;
    text-align: center;
  }

  &--side {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__actions {
      margin-top: auto;
      justify-content: flex-end;
    }
  }

  &--custom {
    color: white;

    &__text {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  &__form {
    margin-bottom: 20px;

    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-label {
      width: 60px;
      font-size: 14px;
      color: #666;
    }

    &-input {
      flex: 1;

      input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #eee;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }

  &--gradient {
    color: white;
    padding: 0;
    background: transparent;
    box-shadow: 0 20rpx 40rpx rgba(102, 126, 234, 0.3);

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48rpx 32rpx 32rpx;
    }

    &__avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24rpx;
    }

    &__badge {
      font-size: 24rpx;
      padding: 8rpx 24rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 24rpx;
    }

    &__body {
      padding: 0 32rpx 32rpx;
      text-align: center;
    }

    &__title {
      font-size: 36rpx;
      font-weight: 600;
      margin-bottom: 16rpx;
    }

    &__desc {
      font-size: 28rpx;
      opacity: 0.9;
      line-height: 1.6;
      margin-bottom: 32rpx;
    }

    &__info {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16rpx;
      padding: 24rpx;
      margin-top: 24rpx;
    }

    &__info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12rpx 0;

      &:not(:last-child) {
        border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
      }
    }

    &__info-label {
      font-size: 26rpx;
      opacity: 0.8;
    }

    &__info-value {
      font-size: 26rpx;
      font-weight: 500;
    }

    &__footer {
      display: flex;
      gap: 24rpx;
      padding: 32rpx;
      border-top: 1rpx solid rgba(255, 255, 255, 0.1);
      align-items: center;
      justify-content: center;
    }

    &__btn {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      border-radius: 40rpx;

      &--secondary {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        border: none;
      }

      &--primary {
        background: white;
        color: #667eea;
        border: none;
      }
    }
  }
}
</style>
