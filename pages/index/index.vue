<template>
  <view class="m-ui-home">
    <!-- 头部 -->
    <view class="m-ui-header">
      <view class="m-ui-header__content">
        <h1 class="m-ui-header__title">M-UI</h1>
        <p class="m-ui-header__desc">基于 uni-app 的跨端组件库</p>
      </view>
    </view>
    
    <!-- 导航 -->
    <view class="m-ui-nav">
      <view class="m-ui-nav__content">
        <nav class="m-ui-nav__menu">
          <a href="#components" class="m-ui-nav__item">组件列表</a>
          <a href="#usage" class="m-ui-nav__item">开始使用</a>
        </nav>
      </view>
    </view>
    
    <!-- 组件列表 -->
    <view id="components" class="m-ui-components">
      <view class="m-ui-components__content">
        <h2 class="m-ui-components__title">组件列表</h2>
        <div class="m-ui-components__grid">
          <!-- Button 组件卡片 -->
          <div class="m-ui-component-card" @click="navigateToButtonDemo">
            <div class="m-ui-component-card__header">
              <h3 class="m-ui-component-card__title">Button 按钮</h3>
            </div>
            <div class="m-ui-component-card__content">
              <p class="m-ui-component-card__desc">按钮用于触发操作，支持多种类型和状态。</p>
              <div class="m-ui-component-card__preview">
                <m-button type="primary" size="small">主要按钮</m-button>
                <m-button type="success" size="small" style="margin-left: 8px;">成功按钮</m-button>
                <m-button type="warning" size="small" style="margin-left: 8px;">警告按钮</m-button>
              </div>
            </div>
            <div class="m-ui-component-card__footer">
              <span class="m-ui-component-card__link">查看详情 →</span>
            </div>
          </div>
        </div>
      </view>
    </view>
    
    <!-- 开始使用 -->
    <view id="usage" class="m-ui-usage">
      <view class="m-ui-usage__content">
        <h2 class="m-ui-usage__title">开始使用</h2>
        <div class="m-ui-usage__steps">
          <div class="m-ui-usage__step">
            <h3 class="m-ui-usage__step-title">1. 安装组件库</h3>
            <p class="m-ui-usage__step-desc">在项目中引入 M-UI 组件库</p>
          </div>
          <div class="m-ui-usage__step">
            <h3 class="m-ui-usage__step-title">2. 注册组件</h3>
            <p class="m-ui-usage__step-desc">在 main.js 中注册需要的组件</p>
          </div>
          <div class="m-ui-usage__step">
            <h3 class="m-ui-usage__step-title">3. 使用组件</h3>
            <p class="m-ui-usage__step-desc">在页面中直接使用组件</p>
          </div>
        </div>
      </view>
    </view>
    
    <!-- 页脚 -->
    <view class="m-ui-footer">
      <view class="m-ui-footer__content">
        <p class="m-ui-footer__text">© 2026 M-UI. All rights reserved.</p>
      </view>
    </view>
  </view>
</template>

<script setup>
import MButton from '../../packages/button/index.js'

function navigateToButtonDemo() {
  uni.navigateTo({
    url: '/examples/pages/button-demo'
  })
}
</script>

<style lang="scss">
.m-ui-home {
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* 头部样式 */
.m-ui-header {
  background-color: #4D80F0;
  color: white;
  padding: 60px 0;
  text-align: center;
  
  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
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

/* 导航样式 */
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
    text-decoration: none;
    font-size: 16px;
    transition: color 0.2s;
    
    &:hover {
      color: #4D80F0;
    }
  }
}

/* 组件列表样式 */
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

/* 组件卡片样式 */
.m-ui-component-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
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
    flex-wrap: wrap;
  }
  
  &__footer {
    text-align: right;
  }
  
  &__link {
    color: #4D80F0;
    font-size: 14px;
    text-decoration: none;
  }
}

/* 开始使用样式 */
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

/* 页脚样式 */
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

/* 响应式设计 */
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
</style>