<template>
  <view class="m-sidebar-scroll-demo">
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
          scroll-top="0"
          :scroll-top="scrollTop"
          scroll-with-animation
          @scrolltolower="loadMore"
        >
          <view class="demo-content-header">
            <view class="demo-header-title">{{ currentCategoryName }}</view>
            <view class="demo-header-subtitle">共 {{ currentItems.length }} 条内容</view>
          </view>
          <view
            v-for="item in displayItems"
            :key="item.id"
            class="demo-item-card"
            @click="handleItemClick(item)"
          >
            <view class="demo-item-image">
              <image :src="item.image" mode="aspectFill" />
            </view>
            <view class="demo-item-info">
              <text class="demo-item-title">{{ item.title }}</text>
              <text class="demo-item-desc">{{ item.description }}</text>
              <view class="demo-item-tags">
                <text v-for="tag in item.tags" :key="tag" class="demo-item-tag">{{ tag }}</text>
              </view>
            </view>
          </view>
          <view v-if="loading" class="demo-loading">
            <m-loading type="ring" color="#1989fa" size="24"></m-loading>
            <text class="loading-text">加载中...</text>
          </view>
          <view v-else-if="hasMore" class="demo-load-more" @click="loadMore">
            <text>点击加载更多</text>
          </view>
          <view v-else class="demo-no-more">
            <text>没有更多了</text>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import mLoading from '@/packages/m-loading/m-loading.vue'

interface Item {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
}

interface Category {
  id: number
  name: string
  items: Item[]
}

const categories = ref<Category[]>([
  {
    id: 1,
    name: '商品分类一',
    items: [
      { id: 1, title: '精美商品一', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_1.jpg', tags: ['热销', '新品'] },
      { id: 2, title: '精美商品二', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_2.jpg', tags: ['时尚'] },
      { id: 3, title: '精美商品三', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_3.jpg', tags: ['高端'] },
      { id: 4, title: '精美商品四', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_4.jpg', tags: ['推荐'] },
      { id: 5, title: '精美商品五', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_5.jpg', tags: ['数码'] },
    ]
  },
  {
    id: 2,
    name: '商品分类二',
    items: [
      { id: 6, title: '精选商品六', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_6.jpg', tags: ['美妆'] },
      { id: 7, title: '精选商品七', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_1.jpg', tags: ['护肤', '热销'] },
      { id: 8, title: '精选商品八', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_2.jpg', tags: ['饰品'] },
    ]
  },
  {
    id: 3,
    name: '商品分类三',
    items: [
      { id: 9, title: '优质商品九', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_3.jpg', tags: ['运动'] },
      { id: 10, title: '优质商品十', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_4.jpg', tags: ['健身'] },
      { id: 11, title: '优质商品十一', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_5.jpg', tags: ['户外', '新品'] },
      { id: 12, title: '优质商品十二', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_6.jpg', tags: ['鞋靴'] },
    ]
  },
  {
    id: 4,
    name: '商品分类四',
    items: [
      { id: 13, title: '精选好物十三', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_1.jpg', tags: ['家居'] },
      { id: 14, title: '精选好物十四', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_2.jpg', tags: ['厨具'] },
    ]
  },
  {
    id: 5,
    name: '商品分类五',
    items: [
      { id: 15, title: '热销商品十五', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_3.jpg', tags: ['图书', '热销'] },
      { id: 16, title: '热销商品十六', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_4.jpg', tags: ['文具'] },
      { id: 17, title: '热销商品十七', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_5.jpg', tags: ['办公'] },
      { id: 18, title: '热销商品十八', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_6.jpg', tags: ['礼品'] },
      { id: 19, title: '热销商品十九', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_1.jpg', tags: ['玩具'] },
    ]
  },
  {
    id: 6,
    name: '商品分类六',
    items: [
      { id: 20, title: '特惠商品二十', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_2.jpg', tags: ['零食', '特惠'] },
      { id: 21, title: '特惠商品二十一', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_3.jpg', tags: ['饮品'] },
    ]
  },
  {
    id: 7,
    name: '商品分类七',
    items: [
      { id: 22, title: '新品上市二十二', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_4.jpg', tags: ['绿植', '新品'] },
      { id: 23, title: '新品上市二十三', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_5.jpg', tags: ['宠物'] },
      { id: 24, title: '新品上市二十四', description: '这是商品描述信息，展示商品的详细特性和优势', image: '/static/img/img_6.jpg', tags: ['车品'] },
    ]
  }
])

const activeCategory = ref(1)
const scrollTop = ref(0)
const loading = ref(false)
const pageSize = 3
const currentPage = ref(1)

const currentCategoryName = computed(() => {
  const category = categories.value.find(c => c.id === activeCategory.value)
  return category ? category.name : ''
})

const currentItems = computed(() => {
  const category = categories.value.find(c => c.id === activeCategory.value)
  return category ? category.items : []
})

const displayItems = computed(() => {
  return currentItems.value.slice(0, currentPage.value * pageSize)
})

const hasMore = computed(() => {
  return displayItems.value.length < currentItems.value.length
})

function handleCategoryChange(e: any) {
  activeCategory.value = e.value
  scrollTop.value = 0
  currentPage.value = 1
  setTimeout(() => {
    scrollTop.value = 0
  }, 100)
}

function handleItemClick(item: Item) {
  uni.showToast({ title: `点击了：${item.title}`, icon: 'none' })
}

function loadMore() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  setTimeout(() => {
    currentPage.value++
    loading.value = false
  }, 1000)
}
</script>

<style lang="scss" scoped>
.m-sidebar-scroll-demo {
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

.demo-content-header {
  padding: 32rpx;
  background: linear-gradient(135deg, #1989fa 0%, #6366f1 100%);
}

.demo-header-title {
  font-size: 40rpx;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8rpx;
}

.demo-header-subtitle {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.demo-item-card {
  display: flex;
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: all 0.3s;
  
  &:active {
    background: #f8f9fa;
  }
}

.demo-item-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  overflow: hidden;
  flex-shrink: 0;
  
  image {
    width: 100%;
    height: 100%;
  }
}

.demo-item-info {
  flex: 1;
  padding-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.demo-item-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.demo-item-desc {
  font-size: 24rpx;
  color: #999;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.demo-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.demo-item-tag {
  font-size: 20rpx;
  color: #1989fa;
  background: rgba(25, 137, 250, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
}

.demo-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx;
}

.loading-text {
  font-size: 24rpx;
  color: #999;
  margin-top: 16rpx;
}

.demo-load-more {
  padding: 32rpx;
  text-align: center;
  font-size: 26rpx;
  color: #999;
  
  &:active {
    color: #1989fa;
  }
}

.demo-no-more {
  padding: 32rpx;
  text-align: center;
  font-size: 24rpx;
  color: #ccc;
}
</style>
