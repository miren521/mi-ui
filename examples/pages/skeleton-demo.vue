<template>
  <view class="page">
    <view class="page-content">
      <view class="demo-skeleton-control">
        <m-button type="primary" size="small" @click="toggleLoading">
          {{ loading ? '隐藏骨架屏' : '显示骨架屏' }}
        </m-button>
      </view>

      <demo-block title="基础用法" desc="text 主题，默认文本占位">
        <view class="demo-skeleton-row">
          <m-skeleton :loading="loading" theme="text" />
        </view>
      </demo-block>

      <demo-block title="头像主题" desc="avatar 主题，圆形头像占位">
        <view class="demo-skeleton-row">
          <m-skeleton :loading="loading" theme="avatar" />
        </view>
      </demo-block>

      <demo-block title="图片主题" desc="image 主题，矩形图片占位">
        <view class="demo-skeleton-row">
          <m-skeleton :loading="loading" theme="image" />
        </view>
      </demo-block>

      <demo-block title="段落主题" desc="paragraph 主题，多行段落占位">
        <view class="demo-skeleton-row">
          <m-skeleton :loading="loading" theme="paragraph" />
        </view>
      </demo-block>

      <demo-block title="渐变动画" desc="animation='gradient' 渐变扫光效果">
        <view class="demo-skeleton-row">
          <m-skeleton :loading="loading" theme="paragraph" animation="gradient" />
        </view>
      </demo-block>

      <demo-block title="闪烁动画" desc="animation='flashed' 闪烁效果">
        <view class="demo-skeleton-row">
          <m-skeleton :loading="loading" theme="paragraph" animation="flashed" />
        </view>
      </demo-block>

      <demo-block title="自定义行列配置" desc="通过 rowCol 自定义骨架屏布局">
        <view class="demo-skeleton-row">
          <m-skeleton
            :loading="loading"
            :row-col="[
              { type: 'circle', size: '48px' },
              [
                { width: '60%', height: '16px' },
                { width: '30%', height: '16px' }
              ],
              { width: '100%', height: '16px' },
              { width: '45%', height: '16px' }
            ]"
          />
        </view>
      </demo-block>

      <demo-block title="用户卡片组合" desc="头像 + 昵称 + 描述的组合布局">
        <view class="demo-skeleton-row">
          <m-skeleton
            :loading="loading"
            :row-col="[
              { type: 'circle', size: '64px' },
              [
                { width: '120px', height: '20px', marginRight: '12px' },
                { width: '80px', height: '20px' }
              ],
              { width: '200px', height: '16px', marginTop: '8px' }
            ]"
            animation="gradient"
          />
        </view>
      </demo-block>

      <demo-block title="商品卡片组合" desc="图片 + 标题 + 价格 + 描述的组合布局">
        <view class="demo-skeleton-row">
          <m-skeleton
            :loading="loading"
            :row-col="[
              { type: 'rect', width: '100%', height: '160px' },
              { width: '100%', height: '16px', marginTop: '12px' },
              [
                { width: '60%', height: '16px' },
                { width: '30%', height: '16px' }
              ],
              { width: '40%', height: '14px', marginTop: '8px' }
            ]"
            animation="gradient"
          />
        </view>
      </demo-block>

      <demo-block title="文章列表组合" desc="头像 + 标题 + 两行描述的组合布局">
        <view class="demo-skeleton-row">
          <m-skeleton
            :loading="loading"
            :row-col="[
              { type: 'circle', size: '48px' },
              [
                { width: '70%', height: '18px', marginRight: '16px' },
                { width: '20%', height: '18px' }
              ],
              { width: '90%', height: '14px', marginTop: '8px' },
              { width: '60%', height: '14px', marginTop: '6px' }
            ]"
            animation="flashed"
          />
        </view>
      </demo-block>

      <demo-block title="评论组合" desc="头像 + 用户名 + 评论内容的组合布局">
        <view class="demo-skeleton-row">
          <m-skeleton
            :loading="loading"
            :row-col="[
              { type: 'circle', size: '40px' },
              [
                { width: '80px', height: '14px', marginRight: '8px' },
                { width: '50px', height: '12px' }
              ],
              { width: '100%', height: '14px', marginTop: '8px' },
              { width: '85%', height: '14px', marginTop: '6px' },
              { width: '50%', height: '14px', marginTop: '6px' }
            ]"
          />
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-content {
  padding-bottom: 40rpx;
}

.demo-skeleton-control {
  padding: 20rpx 0;
  margin-bottom: 20rpx;
  text-align: center;
}

.demo-skeleton-row {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
}
</style>