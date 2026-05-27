<template>
  <view class="m-sidebar-anchor-demo">
    <view class="demo-sidebar-container">
      <view class="demo-sidebar-wrapper">
        <m-sidebar v-model="activeCategory" @change="handleCategoryChange">
          <m-sidebar-item
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </m-sidebar>
        <scroll-view
          class="demo-content-scroll"
          scroll-y
          :scroll-into-view="scrollIntoView"
          scroll-with-animation
        >
          <view
            v-for="category in categories"
            :key="category.id"
            :id="'category-' + category.id"
            class="demo-category-section"
          >
            <view class="demo-category-title">{{ category.name }}</view>
            <view
              v-for="item in category.items"
              :key="item.id"
              class="demo-item-card"
            >
              <view class="demo-item-header">
                <text class="demo-item-title">{{ item.title }}</text>
                <text class="demo-item-icon">&lt;/&gt;</text>
              </view>
              <text class="demo-item-desc">{{ item.description }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Item {
  id: number
  title: string
  description: string
}

interface Category {
  id: number
  name: string
  items: Item[]
}

const categories = ref<Category[]>([
  {
    id: 1,
    name: '分类一',
    items: [
      { id: 1, title: '标题一', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 2, title: '标题二', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 3, title: '标题三', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 4, title: '标题四', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 5, title: '标题五', description: '这是描述这是描述这是描述这是描述这是描述' },
    ]
  },
  {
    id: 2,
    name: '分类二',
    items: [
      { id: 6, title: '标题六', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 7, title: '标题七', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 8, title: '标题八', description: '这是描述这是描述这是描述这是描述这是描述' },
    ]
  },
  {
    id: 3,
    name: '分类三',
    items: [
      { id: 9, title: '标题九', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 10, title: '标题十', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 11, title: '标题十一', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 12, title: '标题十二', description: '这是描述这是描述这是描述这是描述这是描述' },
    ]
  },
  {
    id: 4,
    name: '分类四',
    items: [
      { id: 13, title: '标题十三', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 14, title: '标题十四', description: '这是描述这是描述这是描述这是描述这是描述' },
    ]
  },
  {
    id: 5,
    name: '分类五',
    items: [
      { id: 15, title: '标题十五', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 16, title: '标题十六', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 17, title: '标题十七', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 18, title: '标题十八', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 19, title: '标题十九', description: '这是描述这是描述这是描述这是描述这是描述' },
    ]
  },
  {
    id: 6,
    name: '分类六',
    items: [
      { id: 20, title: '标题二十', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 21, title: '标题二十一', description: '这是描述这是描述这是描述这是描述这是描述' },
    ]
  },
  {
    id: 7,
    name: '分类七',
    items: [
      { id: 22, title: '标题二十二', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 23, title: '标题二十三', description: '这是描述这是描述这是描述这是描述这是描述' },
      { id: 24, title: '标题二十四', description: '这是描述这是描述这是描述这是描述这是描述' },
    ]
  }
])

const activeCategory = ref(1)
const scrollIntoView = ref('')

function handleCategoryChange(e: any) {
  const categoryId = e.value
  scrollIntoView.value = ''
  setTimeout(() => {
    scrollIntoView.value = 'category-' + categoryId
  }, 100)
}
</script>

<style lang="scss" scoped>
.m-sidebar-anchor-demo {
  min-height: 100vh;
  background-color: #f5f5f7;
}

.demo-sidebar-container {
  height: 100vh;
  display: flex;
}

.demo-sidebar-wrapper {
  flex: 1;
  display: flex;
  background: #f5f5f7;
}

.demo-content-scroll {
  flex: 1;
  height: 100vh;
  background: #fff;
}

.demo-category-section {
  padding: 32rpx;
}

.demo-category-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
  padding-left: 16rpx;
  border-left: 6rpx solid #1989fa;
}

.demo-item-card {
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.demo-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.demo-item-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.demo-item-icon {
  font-size: 24rpx;
  color: #999;
  font-family: monospace;
}

.demo-item-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}
</style>
