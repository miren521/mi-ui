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
        <m-popup 
          v-model:modelValue="showCustomStylePopup" 
          position="center" 
          :customStyle="{
            width: '300px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6E9EF5 0%, #4D80F0 100%)',
            color: 'white'
          }"
        >
          <view class="demo-popup-content demo-popup-content--custom">
            <view class="demo-popup-content__title">自定义样式</view>
            <view class="demo-popup-content__text">这是一个带有渐变背景的弹窗</view>
            <view class="demo-popup-content__actions">
              <m-button type="info" plain @click="showCustomStylePopup = false">取消</m-button>
              <m-button type="primary" plain @click="showCustomStylePopup = false">确定</m-button>
            </view>
          </view>
        </m-popup>
      </demo-block>

      <!-- 覆盖导航栏 -->
      <demo-block title="覆盖导航栏" desc="弹窗默认覆盖整个视口，包括导航栏">
        <view class="demo-popup-row">
          <m-button type="primary" @click="showCoverNavbarPopup = true">打开弹窗</m-button>
        </view>
        <m-popup v-model:modelValue="showCoverNavbarPopup" position="center">
          <view class="demo-popup-content">
            <view class="demo-popup-content__title">覆盖导航栏</view>
            <view class="demo-popup-content__text">这是一个默认的弹窗，会覆盖整个视口包括导航栏</view>
            <view class="demo-popup-content__text">当前设置：coverNavbar=true (默认)</view>
            <view class="demo-popup-content__actions">
              <m-button type="primary" @click="showCoverNavbarPopup = false">关闭</m-button>
            </view>
          </view>
        </m-popup>
      </demo-block>

      <!-- 不覆盖导航栏 -->
      <demo-block title="不覆盖导航栏" desc="设置 coverNavbar=false，并设置 topOffset=88（导航栏高度）">
        <view class="demo-popup-row">
          <m-button type="primary" @click="showNoCoverNavbarPopup = true">打开弹窗</m-button>
        </view>
        <m-popup v-model:modelValue="showNoCoverNavbarPopup" position="top" :coverNavbar="false" :topOffset="88">
          <view class="demo-popup-content">
            <view class="demo-popup-content__title">不覆盖导航栏</view>
            <view class="demo-popup-content__text">这是一个不覆盖导航栏的弹窗，从导航栏下方弹出</view>
            <view class="demo-popup-content__text">当前设置：coverNavbar=false, topOffset=88</view>
            <view class="demo-popup-content__actions">
              <m-button type="primary" @click="showNoCoverNavbarPopup = false">关闭</m-button>
            </view>
          </view>
        </m-popup>
      </demo-block>
    </view>
  </view>
</template>

<script setup>
// 引入 ref
import { ref } from 'vue'

// 基础弹窗
const showBasicPopup = ref(false)

// 不同位置弹窗
const showCenterPopup = ref(false)
const showTopPopup = ref(false)
const showBottomPopup = ref(false)
const showLeftPopup = ref(false)
const showRightPopup = ref(false)

// 带关闭按钮
const showClosablePopup = ref(false)

// 自定义内容
const showCustomContentPopup = ref(false)

// 自定义样式
const showCustomStylePopup = ref(false)

// 覆盖导航栏
const showCoverNavbarPopup = ref(false)

// 不覆盖导航栏
const showNoCoverNavbarPopup = ref(false)

// 定义方法
const openPopup = (popupRef) => {
  popupRef.value = true
}

const closePopup = (popupRef) => {
  popupRef.value = false
}

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
  margin-bottom: 16px;
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
}
</style>