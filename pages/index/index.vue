<template>
  <view class="m-home">
    <!-- 头部 -->
    <view class="m-home__header">
      <text class="m-home__title">M-UI</text>
      <text class="m-home__desc">基于 uni-app 的跨端组件库</text>
    </view>

    <!-- 导航 -->
    <view class="m-home__nav">
      <text class="m-home__nav-item" @click="scrollTo('components')">组件列表</text>
      <text class="m-home__nav-item" @click="scrollTo('usage')">开始使用</text>
    </view>

    <!-- 组件列表 -->
    <view id="components" class="m-home__section">
      <text class="m-home__section-title">组件列表</text>
      
      <!-- 搜索 -->
      <view class="m-home__search">
        <input 
          v-model="searchText" 
          type="text" 
          class="m-home__search-input" 
          placeholder="搜索组件..."
        />
        <text v-if="searchText" class="m-home__search-clear" @click="clearSearch">✕</text>
      </view>

      <!-- 组件网格 -->
      <view v-if="filteredComponents.length" class="m-home__grid">
        <view 
          v-for="item in filteredComponents" 
          :key="item.id"
          class="m-home__card" 
          @click="navigateTo(item.url)"
        >
          <text class="m-home__card-title">{{ item.title }}</text>
          <text class="m-home__card-desc">{{ item.desc }}</text>
          <text class="m-home__card-link">查看详情 →</text>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="m-home__empty">
        <text class="m-home__empty-icon">🔍</text>
        <text class="m-home__empty-text">未找到匹配的组件</text>
      </view>
    </view>

    <!-- 开始使用 -->
    <view id="usage" class="m-home__section m-home__section--gray">
      <text class="m-home__section-title">开始使用</text>
      <view class="m-home__steps">
        <view v-for="(step, index) in steps" :key="index" class="m-home__step">
          <text class="m-home__step-num">{{ index + 1 }}</text>
          <text class="m-home__step-title">{{ step.title }}</text>
          <text class="m-home__step-desc">{{ step.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 页脚 -->
    <view class="m-home__footer">
      <text class="m-home__footer-text">© 2026 M-UI</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchText = ref('')

const components = [
  { id: 'button', title: 'Button 按钮', desc: '按钮组件，支持多种类型和状态', url: '/examples/pages/button-demo' },
  { id: 'icon', title: 'Icon 图标', desc: '图标组件，提供丰富的图标资源', url: '/examples/pages/icon-demo' },
  { id: 'layout', title: 'Layout 布局', desc: '栅格布局，支持 24 分栏', url: '/examples/pages/layout-demo' },
  { id: 'popup', title: 'Popup 弹出层', desc: '弹出层组件，支持多种位置', url: '/examples/pages/popup-demo' },
  { id: 'transition', title: 'Transition 动画', desc: '过渡动画组件', url: '/examples/pages/transition-demo' }
]

const steps = [
  { title: '安装', desc: 'npm install @your-scope/m-ui' },
  { title: '注册', desc: '在 main.js 中导入组件库' },
  { title: '使用', desc: '在页面中直接使用组件' }
]

const filteredComponents = computed(() => {
  if (!searchText.value) return components
  const keyword = searchText.value.toLowerCase()
  return components.filter(c => 
    c.title.toLowerCase().includes(keyword) || 
    c.desc.toLowerCase().includes(keyword)
  )
})

const navigateTo = (url) => uni.navigateTo({ url })
const scrollTo = (id) => uni.pageScrollTo({ selector: `#${id}`, duration: 300 })
const clearSearch = () => { searchText.value = '' }
</script>

<style lang="scss" scoped>
.m-home {
  min-height: 100vh;
  background: #f5f6fa;
}

// 头部
.m-home__header {
  padding: 80rpx 32rpx;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.m-home__title {
  display: block;
  font-size: 64rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 16rpx;
}

.m-home__desc {
  display: block;
  font-size: 28rpx;
  color: rgba(255,255,255,0.85);
}

// 导航
.m-home__nav {
  display: flex;
  justify-content: center;
  gap: 48rpx;
  padding: 24rpx 32rpx;
  background: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.m-home__nav-item {
  font-size: 28rpx;
  color: #666;
  
  &:active {
    color: #667eea;
  }
}

// 区块
.m-home__section {
  padding: 60rpx 32rpx;
  
  &--gray {
    background: #fff;
  }
}

.m-home__section-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 48rpx;
}

// 搜索
.m-home__search {
  position: relative;
  max-width: 600rpx;
  margin: 0 auto 48rpx;
}

.m-home__search-input {
  width: 100%;
  height: 72rpx;
  padding: 0 80rpx 0 32rpx;
  background: #f5f6fa;
  border-radius: 36rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.m-home__search-clear {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}

// 网格
.m-home__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
}

.m-home__card {
  flex: 1;
  min-width: 300rpx;
  padding: 32rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.1);
  }
}

.m-home__card-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 12rpx;
}

.m-home__card-desc {
  display: block;
  font-size: 26rpx;
  color: #999;
  line-height: 1.5;
  margin-bottom: 24rpx;
}

.m-home__card-link {
  display: block;
  font-size: 26rpx;
  color: #667eea;
  text-align: right;
}

// 步骤
.m-home__steps {
  display: flex;
  flex-wrap: wrap;
  gap: 32rpx;
}

.m-home__step {
  flex: 1;
  min-width: 240rpx;
  text-align: center;
}

.m-home__step-num {
  display: inline-block;
  width: 56rpx;
  height: 56rpx;
  line-height: 56rpx;
  text-align: center;
  background: #667eea;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  border-radius: 50%;
  margin-bottom: 20rpx;
}

.m-home__step-title {
  display: block;
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 12rpx;
}

.m-home__step-desc {
  display: block;
  font-size: 24rpx;
  color: #999;
}

// 空状态
.m-home__empty {
  text-align: center;
  padding: 80rpx 0;
}

.m-home__empty-icon {
  display: block;
  font-size: 80rpx;
  margin-bottom: 24rpx;
}

.m-home__empty-text {
  font-size: 28rpx;
  color: #999;
}

// 页脚
.m-home__footer {
  padding: 48rpx 32rpx;
  text-align: center;
  background: #333;
}

.m-home__footer-text {
  font-size: 24rpx;
  color: rgba(255,255,255,0.6);
}
</style>