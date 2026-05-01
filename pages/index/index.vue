<template>
  <view class="m-home">
    <!-- 头部 -->
    <view class="m-home__header">
      <!-- 装饰元素 -->
      <view class="m-home__decor m-home__decor--top-left"></view>
      <view class="m-home__decor m-home__decor--bottom-right"></view>
      
      <view class="m-home__logo-container">
        <image class="m-home__logo" src="/static/logo-un-bg.png" mode="aspectFit" />
      </view>
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
      
      <!-- 搜索 & 分类筛选 -->
      <view class="m-home__toolbar">
        <view class="m-home__search">
          <input 
            v-model="searchText" 
            type="text" 
            class="m-home__search-input" 
            placeholder="搜索组件..."
          />
          <text v-if="searchText" class="m-home__search-clear" @click="clearSearch">✕</text>
        </view>
        
        <view class="m-home__categories">
          <text 
            v-for="cat in categories" 
            :key="cat.key"
            class="m-home__category-item"
            :class="{ 'm-home__category-item--active': activeCategory === cat.key }"
            @click="setCategory(cat.key)"
          >{{ cat.name }}</text>
        </view>
      </view>

      <!-- 组件网格 -->
      <view v-if="filteredComponents.length" class="m-home__grid">
        <view 
          v-for="item in filteredComponents" 
          :key="item.id"
          class="m-home__card" 
          @click="navigateTo(item.url)"
        >
          <view class="m-home__card-header">
            <text class="m-home__card-title">{{ item.title }}</text>
            <text class="m-home__card-badge">{{ getCategoryName(item.category) }}</text>
          </view>
          <text class="m-home__card-desc">{{ item.desc }}</text>
          <text class="m-home__card-link">查看详情 <m-icon name="arrow-right" size="24rpx" /></text>
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
const activeCategory = ref('all')

const categories = [
  { key: 'all', name: '全部' },
  { key: 'basic', name: '基础' },
  { key: 'feedback', name: '反馈' },
  { key: 'layout', name: '布局' },
  { key: 'navigation', name: '导航' },
  { key: 'display', name: '展示' },
]

const components = [
  { id: 'button', title: 'Button 按钮', desc: '按钮组件，支持多种类型和状态', category: 'basic', url: '/examples/pages/button-demo' },
  { id: 'icon', title: 'Icon 图标', desc: '图标组件，提供丰富的图标资源', category: 'basic', url: '/examples/pages/icon-demo' },
  { id: 'text', title: 'Text 文本', desc: '文本组件，支持多种样式和格式化', category: 'basic', url: '/examples/pages/text-demo' },
  { id: 'cell', title: 'Cell 单元格', desc: '单元格组件，用于展示列表数据', category: 'basic', url: '/examples/pages/cell-demo' },
  { id: 'divider', title: 'Divider 分割线', desc: '分割线组件，用于分隔内容', category: 'display', url: '/examples/pages/divider-demo' },
  { id: 'avatar', title: 'Avatar 头像', desc: '头像组件，支持图片、文本、图标和状态显示', category: 'display', url: '/examples/pages/avatar-demo' },
  { id: 'img', title: 'Img 图片', desc: '图片组件，支持多种填充模式和预览功能', category: 'display', url: '/examples/pages/img-demo' },
  { id: 'tag', title: 'Tag 标签', desc: '标签组件，用于标记和分类', category: 'display', url: '/examples/pages/tag-demo' },
  { id: 'badge', title: 'Badge 徽标', desc: '徽标组件，用于显示未读数量和状态', category: 'display', url: '/examples/pages/badge-demo' },
  { id: 'tabbar', title: 'Tabbar 底部导航', desc: '底部导航栏，用于在不同页面之间进行切换', category: 'navigation', url: '/examples/pages/tabbar-demo' },
  { id: 'layout', title: 'Layout 布局', desc: '栅格布局，支持 24 分栏', category: 'layout', url: '/examples/pages/layout-demo' },
  { id: 'popup', title: 'Popup 弹出层', desc: '弹出层组件，支持多种位置', category: 'feedback', url: '/examples/pages/popup-demo' },
  { id: 'transition', title: 'Transition 动画', desc: '过渡动画组件', category: 'feedback', url: '/examples/pages/transition-demo' },
  { id: 'card', title: 'Card 卡片', desc: '用于展示商品的图片、价格等信息', category: 'display', url: '/examples/pages/card-demo' },
  { id: 'steps', title: 'Steps 步骤条', desc: '步骤条组件，用于引导用户完成流程', category: 'display', url: '/examples/pages/steps-demo' },
  { id: 'grid', title: 'Grid 宫格', desc: '宫格组件，用于展示一组相关的内容', category: 'layout', url: '/examples/pages/grid-demo' },
  { id: 'collapse', title: 'Collapse 折叠面板', desc: '折叠面板组件，支持手风琴模式和普通模式', category: 'display', url: '/examples/pages/collapse-demo' },
  { id: 'sticky', title: 'Sticky 粘性布局', desc: '粘性布局组件，页面滚动时将元素固定在指定位置', category: 'display', url: '/examples/pages/sticky-demo' }
]

const steps = [
  { title: '安装', desc: 'npm install @your-scope/mini-ui' },
  { title: '注册', desc: '在 main.js 中导入组件库' },
  { title: '使用', desc: '在页面中直接使用组件' }
]

// 辅助函数：获取分类名称
const getCategoryName = (categoryKey) => {
  const cat = categories.find(c => c.key === categoryKey)
  return cat ? cat.name : ''
}

const filteredComponents = computed(() => {
  let result = components
  
  // 按分类筛选
  if (activeCategory.value !== 'all') {
    result = result.filter(c => c.category === activeCategory.value)
  }
  
  // 按关键词筛选
  if (searchText.value) {
    const keyword = searchText.value.toLowerCase()
    result = result.filter(c => 
      c.title.toLowerCase().includes(keyword) || 
      c.desc.toLowerCase().includes(keyword)
    )
  }
  
  // 按组件名称首字母 A-Z 排序
  result.sort((a, b) => {
    const titleA = a.title.charAt(0).toUpperCase()
    const titleB = b.title.charAt(0).toUpperCase()
    return titleA.localeCompare(titleB)
  })
  
  return result
})

const navigateTo = (url) => uni.navigateTo({ url })
const scrollTo = (id) => uni.pageScrollTo({ selector: `#${id}`, duration: 300 })
const clearSearch = () => { searchText.value = '' }
const setCategory = (key) => { activeCategory.value = key }
</script>

<style lang="scss" scoped>
.m-home {
  min-height: 100vh;
  background: #f5f7fc;
}

// 头部
.m-home__header {
  padding: 40rpx 32rpx;
  text-align: center;
  background: linear-gradient(135deg, #d5c5f3 0%, #c6aaee 100%);
  position: relative;
  overflow: hidden;
}

.m-home__header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  animation: pulse 6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
}

.m-home__header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.m-home__logo-container {
  width: 280rpx;
  height: 280rpx;
  margin: 0 auto 20rpx;
  border-radius: 28rpx;
  overflow: hidden;
  animation: float 3s ease-in-out infinite;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.m-home__logo-container:hover {
  // box-shadow: 0 16rpx 40rpx rgba(159, 122, 234, 0.3);
  transform: scale(1.5);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20rpx) rotate(2deg);
  }
  66% {
    transform: translateY(-5rpx) rotate(-2deg);
  }
}

.m-home__logo {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.m-home__logo-container:hover .m-home__logo {
  // transform: scale(1.1);
}

.m-home__title {
  display: block;
  font-size: 56rpx;
  font-weight: bold;
  color: #6d28d9;
  margin-bottom: 8rpx;
  position: relative;
  z-index: 1;
  text-shadow: 0 2rpx 8rpx rgba(109, 40, 217, 0.2);
  animation: fadeInUp 0.6s ease-out;
  transition: all 0.3s ease;
}

.m-home__title:hover {
  transform: scale(1.05);
  text-shadow: 0 4rpx 16rpx rgba(109, 40, 217, 0.3);
}

.m-home__desc {
  display: block;
  font-size: 28rpx;
  color: #fff;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.6s ease-out 0.2s both;
  transition: all 0.3s ease;
}

.m-home__desc:hover {
  color: #6d28d9;
  transform: translateY(-2rpx);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 添加装饰元素
.m-home__decor {
  position: absolute;
  z-index: 0;
}

.m-home__decor--top-left {
  top: 20rpx;
  left: 20rpx;
  width: 80rpx;
  height: 80rpx;
  background: rgba(145, 101, 232, 0.1);
  border-radius: 50%;
  animation: float 4s ease-in-out infinite 0.5s;
}

.m-home__decor--bottom-right {
  bottom: 20rpx;
  right: 20rpx;
  width: 120rpx;
  height: 120rpx;
  background: rgba(126, 88, 201, 0.08);
  border-radius: 50%;
  animation: float 5s ease-in-out infinite 1s;
}

// 导航
.m-home__nav {
  display: flex;
  justify-content: center;
  gap: 48rpx;
  padding: 20rpx 32rpx;
  background: #fff;
  box-shadow: 0 2rpx 12rpx rgba(159, 122, 234, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.m-home__nav-item {
  font-size: 28rpx;
  color: #666;
  transition: all 0.3s ease;
  position: relative;
  
  &:active {
    color: #9f7aea;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2rpx;
    background: #9f7aea;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
}

// 区块
.m-home__section {
  padding: 48rpx 32rpx;
  
  &--gray {
    background: #fff;
  }
}

.m-home__section-title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  text-align: center;
  color: #1e293b;
  margin-bottom: 40rpx;
}

// 工具栏
.m-home__toolbar {
  margin-bottom: 32rpx;
}

.m-home__search {
  position: relative;
  max-width: 100%;
  margin-bottom: 20rpx;
}

.m-home__search-input {
  width: 100%;
  height: 68rpx;
  padding: 0 72rpx 0 28rpx;
  background: #fff;
  border-radius: 34rpx;
  font-size: 26rpx;
  box-sizing: border-box;
  border: 1rpx solid #e2e8f0;
  transition: all 0.2s;
  
  &:focus {
    border-color: #6366f1;
    outline: none;
  }
}

.m-home__search-clear {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  text-align: center;
  color: #94a3b8;
  font-size: 28rpx;
}

.m-home__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.m-home__category-item {
  display: inline-block;  // 或 flex 也可以
  padding: 10rpx 28rpx;
  font-size: 26rpx;
  background: #fff;
  border-radius: 40rpx;
  color: #475569;
  border: 1rpx solid #e2e8f0;
  transition: all 0.2s;
  
  &--active {
    background: #6366f1;
    color: #fff;
    border-color: #6366f1;
  }
  
  &:active {
    opacity: 0.7;
  }
}

// 网格 - 更紧凑
.m-home__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
}

.m-home__card {
  flex: 1;
  min-width: 280rpx;
  padding: 24rpx;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
  border: 1rpx solid #f0f2f5;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.98);
    background: #fafcff;
  }
}

.m-home__card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12rpx;
  flex-wrap: wrap;
  gap: 8rpx;
}

.m-home__card-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1e293b;
}

.m-home__card-badge {
  font-size: 20rpx;
  color: #6366f1;
  background: #eef2ff;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}

.m-home__card-desc {
  display: block;
  font-size: 24rpx;
  color: #64748b;
  line-height: 1.4;
  margin-bottom: 20rpx;
}

.m-home__card-link {
  display: block;
  font-size: 24rpx;
  color: #6366f1;
  text-align: right;
}

// 步骤 - 更紧凑
.m-home__steps {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
}

.m-home__step {
  flex: 1;
  min-width: 200rpx;
  text-align: center;
}

.m-home__step-num {
  display: inline-block;
  width: 48rpx;
  height: 48rpx;
  line-height: 48rpx;
  text-align: center;
  background: #6366f1;
  color: #fff;
  font-size: 26rpx;
  font-weight: bold;
  border-radius: 50%;
  margin-bottom: 16rpx;
}

.m-home__step-title {
  display: block;
  font-size: 28rpx;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 8rpx;
}

.m-home__step-desc {
  display: block;
  font-size: 22rpx;
  color: #64748b;
  word-break: break-all;
}

// 空状态
.m-home__empty {
  text-align: center;
  padding: 60rpx 0;
}

.m-home__empty-icon {
  display: block;
  font-size: 72rpx;
  margin-bottom: 20rpx;
}

.m-home__empty-text {
  font-size: 26rpx;
  color: #94a3b8;
}

// 页脚
.m-home__footer {
  padding: 40rpx 32rpx;
  text-align: center;
  background: #1e293b;
}

.m-home__footer-text {
  font-size: 22rpx;
  color: rgba(255,255,255,0.5);
}
</style>