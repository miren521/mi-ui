<template>
  <view class="page">
    <view class="page-content">
      <!-- 基本用法 -->
      <demo-block title="基本用法">
        <view class="demo-grid-row">
          <m-grid :column="4">
            <m-grid-item icon="home" text="首页" />
            <m-grid-item icon="Fire" text="热门" />
            <m-grid-item icon="heart" text="收藏" />
            <m-grid-item icon="user" text="我的" />
          </m-grid>
        </view>
      </demo-block>

      <!-- 带边框 -->
      <demo-block title="带边框">
        <view class="demo-grid-row">
          <m-grid :column="4" :border="true">
            <m-grid-item icon="home" text="首页" />
            <m-grid-item icon="Fire" text="热门" />
            <m-grid-item icon="heart" text="收藏" />
            <m-grid-item icon="user" text="我的" />
          </m-grid>
        </view>
      </demo-block>

      <!-- 带间距 -->
      <demo-block title="带间距">
        <view class="demo-grid-row">
          <m-grid :column="3" :gutter="20">
            <m-grid-item icon="home" text="首页" />
            <m-grid-item icon="Fire" text="热门" />
            <m-grid-item icon="heart" text="收藏" />
          </m-grid>
        </view>
      </demo-block>

      <!-- 自定义列数 -->
      <demo-block title="自定义列数">
        <view class="demo-grid-row">
          <m-grid :column="3" :gutter="10">
            <m-grid-item>
              <template #default>
                <view class="demo-grid-custom-content">
                  <image src="/static/img/img_1.jpg" class="demo-grid-custom-image" />
                  <text class="demo-grid-custom-text">图片1</text>
                </view>
              </template>
            </m-grid-item>
            <m-grid-item>
              <template #default>
                <view class="demo-grid-custom-content">
                  <image src="/static/img/img_2.jpg" class="demo-grid-custom-image" />
                  <text class="demo-grid-custom-text">图片2</text>
                </view>
              </template>
            </m-grid-item>
            <m-grid-item>
              <template #default>
                <view class="demo-grid-custom-content">
                  <image src="/static/img/img_3.jpg" class="demo-grid-custom-image" />
                  <text class="demo-grid-custom-text">图片3</text>
                </view>
              </template>
            </m-grid-item>
            <m-grid-item>
              <template #default>
                <view class="demo-grid-custom-content">
                  <image src="/static/img/img_4.jpg" class="demo-grid-custom-image" />
                  <text class="demo-grid-custom-text">图片4</text>
                </view>
              </template>
            </m-grid-item>
            <m-grid-item>
              <template #default>
                <view class="demo-grid-custom-content">
                  <image src="/static/img/img_5.jpg" class="demo-grid-custom-image" />
                  <text class="demo-grid-custom-text">图片5</text>
                </view>
              </template>
            </m-grid-item>
            <m-grid-item>
              <template #default>
                <view class="demo-grid-custom-content">
                  <image src="/static/img/img_6.jpg" class="demo-grid-custom-image" />
                  <text class="demo-grid-custom-text">图片6</text>
                </view>
              </template>
            </m-grid-item>
          </m-grid>
        </view>
      </demo-block>

      <!-- 水平排列 -->
      <demo-block title="水平排列">
        <view class="demo-grid-row">
          <m-grid :column="3" :direction="'horizontal'">
            <m-grid-item icon="home" text="首页" />
            <m-grid-item icon="heart" text="收藏" />
            <m-grid-item icon="Fire" text="热门" />
          </m-grid>
        </view>
      </demo-block>

      <!-- 带徽标 -->
      <demo-block title="带徽标">
        <view class="demo-grid-row">
          <m-grid :column="4" :gutter="10">
            <m-grid-item icon="home" text="首页" />
            <m-grid-item icon="Fire" text="热门" :value="3" />
            <m-grid-item icon="heart" text="收藏" :is-dot="true" />
            <m-grid-item icon="user" text="我的" :value="99" />
          </m-grid>
        </view>
      </demo-block>

      <!-- 可点击 -->
      <demo-block title="可点击">
        <view class="demo-grid-row">
          <m-grid :column="4" :clickable="true" :gutter="10">
            <m-grid-item icon="home" text="首页" @click="handleClick" />
            <m-grid-item icon="Fire" text="热门" @click="handleClick" />
            <m-grid-item icon="heart" text="收藏" @click="handleClick" />
            <m-grid-item icon="user" text="我的" @click="handleClick" />
          </m-grid>
        </view>
      </demo-block>

      <!-- 自定义内容 -->
      <demo-block title="自定义内容">
        <view class="demo-grid-row">
          <m-grid :column="2" :gutter="10">
            <m-grid-item>
              <template #default>
                <view class="demo-grid-custom-content">
                  <m-img src="/static/img/img_1.jpg" width="60" height="60" />
                  <text class="demo-grid-custom-text">手机</text>
                </view>
              </template>
            </m-grid-item>
            <m-grid-item>
              <template #default>
                <view class="demo-grid-custom-content">
                  <m-img src="/static/img/img_2.jpg" width="60" height="60" />
                  <text class="demo-grid-custom-text">电脑</text>
                </view>
              </template>
            </m-grid-item>
          </m-grid>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
const handleClick = () => {
  uni.showToast({
    title: '点击了宫格项',
    icon: 'none'
  })
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background-color: #f5f6fa;
}

.page-header {
  padding: 60rpx 32rpx;
  text-align: center;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.page-title {
  display: block;
  font-size: 56rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8rpx;
}

.page-subtitle {
  display: block;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
}

.page-content {
  padding: 32rpx;
}

.demo-grid-row {
  // margin-bottom: 24rpx;
}

.demo-grid-custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.demo-grid-custom-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
}

.demo-grid-custom-text {
  font-size: 28rpx;
  color: #333;
}
</style>