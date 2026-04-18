<template>
  <view class="m-ui-home">
    <view class="m-ui-header">
      <h1 class="m-ui-header__title">M-UI</h1>
      <p class="m-ui-header__desc">基于 uni-app 的跨端组件库</p>
    </view>

    <view class="m-ui-nav">
      <view class="m-ui-nav__content">
        <nav class="m-ui-nav__menu">
          <text class="m-ui-nav__item" @click="scrollTo('components')">组件列表</text>
          <text class="m-ui-nav__item" @click="scrollTo('usage')">开始使用</text>
        </nav>
      </view>
    </view>

    <view id="components" class="m-ui-components">
      <view class="m-ui-components__content">
        <h2 class="m-ui-components__title">组件列表</h2>
        <div class="m-ui-components__grid">
          <view class="m-ui-component-card" @click="navigateTo('/examples/pages/button-demo')">
            <view class="m-ui-component-card__header">
              <h3 class="m-ui-component-card__title">Button 按钮</h3>
            </view>
            <view class="m-ui-component-card__content">
              <p class="m-ui-component-card__desc">按钮用于触发操作，支持多种类型和状态。</p>
              <view class="m-ui-component-card__preview">
                <m-button type="primary" size="small" class="fit-content-btn">主要按钮</m-button>
                <m-button type="success" size="small" class="fit-content-btn" style="margin-left: 8px;">成功按钮</m-button>
                <m-button type="warning" size="small" class="fit-content-btn" style="margin-left: 8px;">警告按钮</m-button>
              </view>
            </view>
            <view class="m-ui-component-card__footer">
              <text class="m-ui-component-card__link">查看详情 →</text>
            </view>
          </view>

          <view class="m-ui-component-card" @click="navigateTo('/examples/pages/icon-demo')">
            <view class="m-ui-component-card__header">
              <h3 class="m-ui-component-card__title">Icon 图标</h3>
            </view>
            <view class="m-ui-component-card__content">
              <p class="m-ui-component-card__desc">图标组件，提供丰富的图标资源。</p>
              <view class="m-ui-component-card__preview">
                <m-icon name="check" size="24px" color="#4D80F0" />
                <m-icon name="close" size="24px" color="#fa4350" style="margin-left: 8px;" />
                <m-icon name="add" size="24px" color="#34d19d" style="margin-left: 8px;" />
              </view>
            </view>
            <view class="m-ui-component-card__footer">
              <text class="m-ui-component-card__link">查看详情 →</text>
            </view>
          </view>

          <view class="m-ui-component-card" @click="navigateTo('/examples/pages/layout-demo')">
            <view class="m-ui-component-card__header">
              <h3 class="m-ui-component-card__title">Layout 布局</h3>
            </view>
            <view class="m-ui-component-card__content">
              <p class="m-ui-component-card__desc">栅格布局组件，支持 24 分栏和响应式设计。</p>
              <view class="m-ui-component-card__preview">
                <view class="demo-layout-preview">
                  <view class="demo-layout-preview__row">
                    <view class="demo-layout-preview__col demo-layout-preview__col--span6"></view>
                    <view class="demo-layout-preview__col demo-layout-preview__col--span6"></view>
                    <view class="demo-layout-preview__col demo-layout-preview__col--span6"></view>
                    <view class="demo-layout-preview__col demo-layout-preview__col--span6"></view>
                  </view>
                </view>
              </view>
            </view>
            <view class="m-ui-component-card__footer">
              <text class="m-ui-component-card__link">查看详情 →</text>
            </view>
          </view>

          <view class="m-ui-component-card" @click="navigateTo('/examples/pages/popup-demo')">
            <view class="m-ui-component-card__header">
              <h3 class="m-ui-component-card__title">Popup 弹出层</h3>
            </view>
            <view class="m-ui-component-card__content">
              <p class="m-ui-component-card__desc">弹出层组件，支持多种位置和动画效果。</p>
            </view>
            <view class="m-ui-component-card__footer">
              <text class="m-ui-component-card__link">查看详情 →</text>
            </view>
          </view>
        </div>
      </view>
    </view>

    <view id="usage" class="m-ui-usage">
      <view class="m-ui-usage__content">
        <h2 class="m-ui-usage__title">开始使用</h2>
        <view class="m-ui-usage__steps">
          <view class="m-ui-usage__step">
            <h3 class="m-ui-usage__step-title">1. 安装组件库</h3>
            <p class="m-ui-usage__step-desc">在项目中引入 M-UI 组件库</p>
          </view>
          <view class="m-ui-usage__step">
            <h3 class="m-ui-usage__step-title">2. 注册组件</h3>
            <p class="m-ui-usage__step-desc">在 main.js 中注册需要的组件</p>
          </view>
          <view class="m-ui-usage__step">
            <h3 class="m-ui-usage__step-title">3. 使用组件</h3>
            <p class="m-ui-usage__step-desc">在页面中直接使用组件</p>
          </view>
        </view>
      </view>
    </view>

    <view class="m-ui-footer">
      <view class="m-ui-footer__content">
        <p class="m-ui-footer__text">© 2026 M-UI. All rights reserved.</p>
      </view>
    </view>

  </view>
</template>

<script setup>
import MButton from '../../packages/button/index.js'
import MIcon from '../../packages/icon/index.js'
import MPopup from '../../packages/popup/index.js'

function navigateTo(url) {
  uni.navigateTo({
    url: url
  })
}

function scrollTo(id) {
  uni.pageScrollTo({
    selector: '#' + id,
    duration: 300
  })
}

// 引入 ref
import { ref } from 'vue'
</script>

<style lang="scss">
.m-ui-home {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.m-ui-header {
  background-color: #4D80F0;
  color: white;
  padding: 60px 0;
  text-align: center;

  &__title {
    font-size: 48px;
    font-weight: 700;
    margin: 0 0 16px;
  }

  &__desc {
    font-size: 18px;
    margin: 0;
    opacity: 0.9;
  }
}

.m-ui-nav {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__menu {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: block;
    padding: 16px 24px;
    color: #333;
    font-size: 16px;
    transition: color 0.2s;
  }
}

.m-ui-components {
  padding: 60px 0;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__title {
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin: 0 0 48px;
    color: #333;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
}

.m-ui-component-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  &__header {
    margin-bottom: 16px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    color: #333;
  }

  &__content {
    margin-bottom: 20px;
  }

  &__desc {
    font-size: 14px;
    color: #666;
    margin: 0 0 16px;
    line-height: 1.5;
  }

  &__preview {
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }

  &__footer {
    text-align: right;
  }

  &__link {
    color: #4D80F0;
    font-size: 14px;
  }
}

.m-ui-usage {
  background-color: white;
  padding: 60px 0;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__title {
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin: 0 0 48px;
    color: #333;
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
  }

  &__step {
    text-align: center;
  }

  &__step-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 12px;
    color: #333;
  }

  &__step-desc {
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }
}

.m-ui-footer {
  background-color: #333;
  color: white;
  padding: 32px 0;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
  }

  &__text {
    margin: 0;
    font-size: 14px;
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .m-ui-header {
    padding: 40px 0;

    &__title {
      font-size: 32px;
    }

    &__desc {
      font-size: 16px;
    }
  }

  .m-ui-components,
  .m-ui-usage {
    padding: 40px 0;
  }

  .m-ui-components__title,
  .m-ui-usage__title {
    font-size: 24px;
    margin-bottom: 32px;
  }
}

.fit-content-btn {
  flex: none !important;
  width: auto !important;
  min-width: auto !important;
}

.demo-layout-preview {
  width: 100%;
  padding: 8px;

  &__row {
    display: flex;
    gap: 8px;
  }

  &__col {
    height: 24px;
    background-color: #4D80F0;
    border-radius: 2px;

    &--span6 {
      flex: 1;
    }
  }
}
</style>