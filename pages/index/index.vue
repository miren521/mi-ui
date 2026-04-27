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
  { id: 'grid', title: 'Grid 宫格', desc: '宫格组件，用于展示一组相关的内容', category: 'layout', url: '/examples/pages/grid-demo' },
  { id: 'collapse', title: 'Collapse 折叠面板', desc: '折叠面板组件，支持手风琴模式和普通模式', category: 'layout', url: '/examples/pages/collapse-demo' }
]

const steps = [
  { title: '安装', desc: 'npm install @your-scope/m-ui' },
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
  padding: 60rpx 32rpx;
  text-align: center;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.m-home__title {
  display: block;
  font-size: 56rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8rpx;
}

.m-home__desc {
  display: block;
  font-size: 26rpx;
  color: rgba(255,255,255,0.85);
}

// 导航
.m-home__nav {
  display: flex;
  justify-content: center;
  gap: 48rpx;
  padding: 20rpx 32rpx;
  background: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.02);
}

.m-home__nav-item {
  font-size: 28rpx;
  color: #666;
  
  &:active {
    color: #6366f1;
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