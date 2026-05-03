<template>
  <view class="page">
    <view class="page-content">
      <demo-block title="加载中状态" desc="state='loading' 显示加载中状态">
        <view class="demo-loadmore-row">
          <m-loadmore state="loading" />
        </view>
      </demo-block>

      <demo-block title="加载完成状态" desc="state='finished' 显示加载完成状态">
        <view class="demo-loadmore-row">
          <m-loadmore state="finished" />
        </view>
      </demo-block>

      <demo-block title="加载失败状态" desc="state='error' 显示加载失败状态，点击重试按钮模拟加载流程">
        <view class="demo-loadmore-row">
          <m-loadmore :state="errorState" @reload="handleErrorReload" />
        </view>
      </demo-block>

      <demo-block title="自定义加载文案" desc="通过 loading-text 属性自定义加载提示文字">
        <view class="demo-loadmore-row">
          <m-loadmore state="loading" loading-text="正在努力加载..." />
        </view>
      </demo-block>

      <demo-block title="自定义完成文案" desc="通过 finished-text 属性自定义完成提示文字">
        <view class="demo-loadmore-row">
          <m-loadmore state="finished" finished-text="我是有底线的~" />
        </view>
      </demo-block>

      <demo-block title="自定义失败文案" desc="通过 error-text 属性自定义失败提示文字，点击重试模拟加载流程">
        <view class="demo-loadmore-row">
          <m-loadmore :state="customErrorState" error-text="网络开小差了" @reload="handleCustomErrorReload" />
        </view>
      </demo-block>

      <demo-block title="自定义加载动画" desc="通过 loading-props 配置加载动画类型">
        <view class="demo-loadmore-row">
          <m-loadmore state="loading" :loading-props="{ type: 'wave' }" />
        </view>
      </demo-block>

      <demo-block title="使用插槽自定义" desc="通过 slot 自定义加载状态展示内容">
        <view class="demo-loadmore-row">
          <m-loadmore state="loading">
            <template #loading>
              <m-loading type="pulse" />
              <text style="margin-left: 12rpx; color: #999;">拼命加载中...</text>
            </template>
          </m-loadmore>
        </view>
      </demo-block>

      <demo-block title="触底加载示例" desc="滑动列表到底部自动触发加载，模拟完整加载流程：加载成功 → 随机失败 → 点击重试 → 继续加载 → 完成">
        <view class="demo-loadmore-row">
          <scroll-view 
            class="demo-loadmore-scroll" 
            scroll-y 
            :scroll-top="scrollTop"
            @scrolltolower="onScrollToLower"
          >
            <view class="demo-loadmore-list">
              <view class="demo-loadmore-list__item" v-for="item in list" :key="item.id">
                <text>{{ item.text }}</text>
              </view>
            </view>
            <m-loadmore :state="listState" @reload="handleListReload" />
          </scroll-view>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

// 加载失败演示状态
const errorState = ref<'loading' | 'error' | 'finished'>('error')

const handleErrorReload = () => {
  errorState.value = 'loading'
  setTimeout(() => {
    errorState.value = 'error'
  }, 1500)
}

// 自定义失败文案演示状态
const customErrorState = ref<'loading' | 'error' | 'finished'>('error')

const handleCustomErrorReload = () => {
  customErrorState.value = 'loading'
  setTimeout(() => {
    customErrorState.value = 'error'
  }, 1500)
}

// 触底加载示例
const list = reactive([
  { id: 1, text: '列表项内容 1' },
  { id: 2, text: '列表项内容 2' },
  { id: 3, text: '列表项内容 3' }
])

const listState = ref<'loading' | 'error' | 'finished'>('error')
const scrollTop = ref(0)
let listCount = 3
let loadCount = 0
let hasMore = true

const onScrollToLower = () => {
  if (listState.value === 'loading' || listState.value === 'finished') return
  loadMore()
}

const loadMore = () => {
  if (listState.value === 'loading' || !hasMore) return
  
  listState.value = 'loading'
  loadCount++
  
  setTimeout(() => {
    if (loadCount === 2) {
      listState.value = 'error'
    } else {
      for (let i = 0; i < 3; i++) {
        listCount++
        list.push({ id: listCount, text: `列表项内容 ${listCount}` })
      }
      if (listCount >= 12) {
        hasMore = false
        listState.value = 'finished'
      } else {
        listState.value = 'error'
      }
    }
  }, 1500)
}

const handleListReload = () => {
  listState.value = 'loading'
  
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      listCount++
      list.push({ id: listCount, text: `列表项内容 ${listCount}` })
    }
    if (listCount >= 12) {
      hasMore = false
      listState.value = 'finished'
    } else {
      listState.value = 'error'
    }
  }, 1500)
}
</script>

<style lang="scss" scoped>
.page {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-content {
  padding-bottom: 40rpx;
}

.demo-loadmore-row {
  background-color: #fff;
  border-radius: 8rpx;
  overflow: hidden;
}

.demo-loadmore-scroll {
  height: 600rpx;
}

.demo-loadmore-list {
  padding: 0 30rpx;

  &__item {
    padding: 30rpx 0;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>