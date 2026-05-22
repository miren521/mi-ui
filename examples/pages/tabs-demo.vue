<template>
  <view class="m-tabs-demo">
    <view class="m-tabs-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="最基础的标签页用法">
        <view class="demo-tabs-card">
          <m-tabs v-model="active1">
            <m-tab title="热门">
              <view class="demo-tabs-content">
                <view class="demo-product-list">
                  <view class="demo-product-item" v-for="item in hotProducts" :key="item.id">
                    <image :src="item.image" mode="aspectFill" class="demo-product-img" />
                    <view class="demo-product-info">
                      <text class="demo-product-name">{{ item.name }}</text>
                      <text class="demo-product-price">¥{{ item.price }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </m-tab>
            <m-tab title="推荐">
              <view class="demo-tabs-content">
                <view class="demo-product-list">
                  <view class="demo-product-item" v-for="item in recommendProducts" :key="item.id">
                    <image :src="item.image" mode="aspectFill" class="demo-product-img" />
                    <view class="demo-product-info">
                      <text class="demo-product-name">{{ item.name }}</text>
                      <text class="demo-product-price">¥{{ item.price }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </m-tab>
            <m-tab title="上新">
              <view class="demo-tabs-content">
                <view class="demo-product-list">
                  <view class="demo-product-item" v-for="item in newProducts" :key="item.id">
                    <image :src="item.image" mode="aspectFill" class="demo-product-img" />
                    <view class="demo-product-info">
                      <text class="demo-product-name">{{ item.name }}</text>
                      <text class="demo-product-price">¥{{ item.price }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </m-tab>
          </m-tabs>
        </view>
      </demo-block>

      <!-- 匹配名称 -->
      <demo-block title="匹配名称" desc="通过 name 属性匹配，默认为索引">
        <view class="demo-tabs-card">
          <m-tabs v-model="active2">
            <m-tab title="今日特惠" name="today">
              <view class="demo-tabs-content">
                <view class="demo-promotion-card">
                  <text class="demo-promotion-title">限时特惠</text>
                  <text class="demo-promotion-desc">全场商品低至5折起</text>
                  <view class="demo-promotion-btn">立即抢购</view>
                </view>
              </view>
            </m-tab>
            <m-tab title="会员专享" name="vip">
              <view class="demo-tabs-content">
                <view class="demo-promotion-card demo-promotion-card--vip">
                  <text class="demo-promotion-title">会员特权</text>
                  <text class="demo-promotion-desc">专属折扣 + 积分翻倍</text>
                  <view class="demo-promotion-btn">查看权益</view>
                </view>
              </view>
            </m-tab>
            <m-tab title="新品首发" name="new">
              <view class="demo-tabs-content">
                <view class="demo-promotion-card demo-promotion-card--new">
                  <text class="demo-promotion-title">新品上市</text>
                  <text class="demo-promotion-desc">首发立减100元</text>
                  <view class="demo-promotion-btn">了解详情</view>
                </view>
              </view>
            </m-tab>
          </m-tabs>
        </view>
      </demo-block>

      <!-- 禁用标签 -->
      <demo-block title="禁用标签" desc="设置 disabled 属性禁用标签">
        <view class="demo-tabs-card">
          <m-tabs v-model="active3">
            <m-tab title="全部订单">
              <view class="demo-tabs-content">
                <view class="demo-order-list">
                  <view class="demo-order-item">
                    <text class="demo-order-num">订单号：202401010001</text>
                    <text class="demo-order-status">已完成</text>
                  </view>
                  <view class="demo-order-item">
                    <text class="demo-order-num">订单号：202401010002</text>
                    <text class="demo-order-status">待评价</text>
                  </view>
                </view>
              </view>
            </m-tab>
            <m-tab title="待付款" disabled>
              <view class="demo-tabs-content">
                <text class="demo-empty-text">暂无待付款订单</text>
              </view>
            </m-tab>
            <m-tab title="待发货">
              <view class="demo-tabs-content">
                <view class="demo-order-list">
                  <view class="demo-order-item">
                    <text class="demo-order-num">订单号：202401010003</text>
                    <text class="demo-order-status">待发货</text>
                  </view>
                </view>
              </view>
            </m-tab>
          </m-tabs>
        </view>
      </demo-block>

      <!-- 样式风格 -->
      <demo-block title="样式风格" desc="支持 normal、text、underline、dot 四种样式">
        <view class="demo-tabs-card">
          <view class="demo-style-section">
            <text class="demo-style-label">normal（默认）</text>
            <m-tabs v-model="active4" line-theme="normal">
              <m-tab title="首页">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">首页内容</text>
                </view>
              </m-tab>
              <m-tab title="分类">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">分类内容</text>
                </view>
              </m-tab>
              <m-tab title="购物车">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">购物车内容</text>
                </view>
              </m-tab>
            </m-tabs>
          </view>
          <view class="demo-style-section">
            <text class="demo-style-label">text（跟随文字）</text>
            <m-tabs v-model="active5" line-theme="text">
              <m-tab title="首页">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">首页内容</text>
                </view>
              </m-tab>
              <m-tab title="分类">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">分类内容</text>
                </view>
              </m-tab>
              <m-tab title="购物车">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">购物车内容</text>
                </view>
              </m-tab>
            </m-tabs>
          </view>
          <view class="demo-style-section">
            <text class="demo-style-label">underline（下划线）</text>
            <m-tabs v-model="active6" line-theme="underline">
              <m-tab title="首页">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">首页内容</text>
                </view>
              </m-tab>
              <m-tab title="分类">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">分类内容</text>
                </view>
              </m-tab>
              <m-tab title="购物车">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">购物车内容</text>
                </view>
              </m-tab>
            </m-tabs>
          </view>
          <view class="demo-style-section">
            <text class="demo-style-label">dot（点状）</text>
            <m-tabs v-model="active7" line-theme="dot">
              <m-tab title="首页">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">首页内容</text>
                </view>
              </m-tab>
              <m-tab title="分类">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">分类内容</text>
                </view>
              </m-tab>
              <m-tab title="购物车">
                <view class="demo-simple-content">
                  <text class="demo-simple-text">购物车内容</text>
                </view>
              </m-tab>
            </m-tabs>
          </view>
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="通过 color 和 inactiveColor 自定义颜色">
        <view class="demo-tabs-card">
          <m-tabs v-model="active8" color="#ff6b6b" inactive-color="#999">
            <m-tab title="精选">
              <view class="demo-tabs-content">
                <view class="demo-color-showcase">
                  <view class="demo-color-item" style="background: linear-gradient(135deg, #ff6b6b, #ffa502);"></view>
                  <text class="demo-color-text">红色主题</text>
                </view>
              </view>
            </m-tab>
            <m-tab title="潮流">
              <view class="demo-tabs-content">
                <view class="demo-color-showcase">
                  <view class="demo-color-item" style="background: linear-gradient(135deg, #ff6b6b, #ffa502);"></view>
                  <text class="demo-color-text">时尚潮流</text>
                </view>
              </view>
            </m-tab>
            <m-tab title="生活">
              <view class="demo-tabs-content">
                <view class="demo-color-showcase">
                  <view class="demo-color-item" style="background: linear-gradient(135deg, #ff6b6b, #ffa502);"></view>
                  <text class="demo-color-text">品质生活</text>
                </view>
              </view>
            </m-tab>
          </m-tabs>
        </view>
      </demo-block>

      <!-- 滑动切换 -->
      <demo-block title="滑动切换" desc="设置 swipeable 属性开启手势滑动切换">
        <view class="demo-tabs-card">
          <m-tabs v-model="active10" swipeable>
            <m-tab title="美食">
              <view class="demo-tabs-content demo-tabs-content--swipe">
                <view class="demo-swipe-card">
                  <image src="/static/img/img_1.jpg" mode="aspectFill" class="demo-swipe-img" />
                  <text class="demo-swipe-title">美食推荐</text>
                </view>
              </view>
            </m-tab>
            <m-tab title="旅行">
              <view class="demo-tabs-content demo-tabs-content--swipe">
                <view class="demo-swipe-card">
                  <image src="/static/img/img_2.jpg" mode="aspectFill" class="demo-swipe-img" />
                  <text class="demo-swipe-title">旅行攻略</text>
                </view>
              </view>
            </m-tab>
            <m-tab title="娱乐">
              <view class="demo-tabs-content demo-tabs-content--swipe">
                <view class="demo-swipe-card">
                  <image src="/static/img/img_3.jpg" mode="aspectFill" class="demo-swipe-img" />
                  <text class="demo-swipe-title">娱乐资讯</text>
                </view>
              </view>
            </m-tab>
          </m-tabs>
        </view>
      </demo-block>

      <!-- 徽标 -->
      <demo-block title="徽标" desc="通过 badgeProps 属性设置徽标">
        <view class="demo-tabs-card">
          <m-tabs v-model="active12">
            <m-tab title="消息" :badge-props="{ content: '5' }">
              <view class="demo-tabs-content">
                <view class="demo-message-list">
                  <view class="demo-message-item">
                    <view class="demo-message-avatar"></view>
                    <view class="demo-message-info">
                      <text class="demo-message-name">系统通知</text>
                      <text class="demo-message-text">您的订单已发货</text>
                    </view>
                  </view>
                  <view class="demo-message-item">
                    <view class="demo-message-avatar"></view>
                    <view class="demo-message-info">
                      <text class="demo-message-name">客服中心</text>
                      <text class="demo-message-text">您好，有什么可以帮您？</text>
                    </view>
                  </view>
                </view>
              </view>
            </m-tab>
            <m-tab title="动态" :badge-props="{ isDot: true }">
              <view class="demo-tabs-content">
                <view class="demo-message-list">
                  <view class="demo-message-item">
                    <view class="demo-message-avatar"></view>
                    <view class="demo-message-info">
                      <text class="demo-message-name">好友动态</text>
                      <text class="demo-message-text">发布了新动态</text>
                    </view>
                  </view>
                </view>
              </view>
            </m-tab>
            <m-tab title="收藏">
              <view class="demo-tabs-content">
                <view class="demo-message-list">
                  <view class="demo-message-item">
                    <view class="demo-message-avatar"></view>
                    <view class="demo-message-info">
                      <text class="demo-message-name">我的收藏</text>
                      <text class="demo-message-text">暂无收藏内容</text>
                    </view>
                  </view>
                </view>
              </view>
            </m-tab>
          </m-tabs>
        </view>
      </demo-block>

      <!-- 导航地图 -->
      <demo-block title="导航地图" desc="标签数超过 mapNum 时显示导航地图">
        <view class="demo-tabs-card">
          <m-tabs v-model="active13" :map-num="4">
            <m-tab title="首页">
              <view class="demo-simple-content">
                <text class="demo-simple-text">首页内容</text>
              </view>
            </m-tab>
            <m-tab title="精选好物">
              <view class="demo-simple-content">
                <text class="demo-simple-text">精选内容</text>
              </view>
            </m-tab>
            <m-tab title="手机数码">
              <view class="demo-simple-content">
                <text class="demo-simple-text">数码内容</text>
              </view>
            </m-tab>
            <m-tab title="服装">
              <view class="demo-simple-content">
                <text class="demo-simple-text">服装内容</text>
              </view>
            </m-tab>
            <m-tab title="美食外卖">
              <view class="demo-simple-content">
                <text class="demo-simple-text">美食内容</text>
              </view>
            </m-tab>
            <m-tab title="家居生活">
              <view class="demo-simple-content">
                <text class="demo-simple-text">家居内容</text>
              </view>
            </m-tab>
            <m-tab title="运动户外">
              <view class="demo-simple-content">
                <text class="demo-simple-text">运动内容</text>
              </view>
            </m-tab>
            <m-tab title="母婴用品">
              <view class="demo-simple-content">
                <text class="demo-simple-text">母婴内容</text>
              </view>
            </m-tab>
            <m-tab title="美妆护肤">
              <view class="demo-simple-content">
                <text class="demo-simple-text">美妆内容</text>
              </view>
            </m-tab>
            <m-tab title="限时特惠">
              <view class="demo-simple-content">
                <text class="demo-simple-text">特惠内容</text>
              </view>
            </m-tab>
          </m-tabs>
        </view>
      </demo-block>

      <!-- 事件监听 -->
      <demo-block title="事件监听" desc="支持 change、click、disabled 事件">
        <view class="demo-tabs-card">
          <m-tabs v-model="active14" @change="handleChange" @click="handleClick" @disabled="handleDisabled">
            <m-tab title="标签A">
              <view class="demo-tabs-content">
                <text class="demo-event-text">当前选择：标签A</text>
              </view>
            </m-tab>
            <m-tab title="标签B">
              <view class="demo-tabs-content">
                <text class="demo-event-text">当前选择：标签B</text>
              </view>
            </m-tab>
            <m-tab title="标签C" disabled>
              <view class="demo-tabs-content">
                <text class="demo-event-text">当前选择：标签C（禁用）</text>
              </view>
            </m-tab>
          </m-tabs>
          <view class="demo-event-log">
            <text class="demo-event-label">事件日志：</text>
            <text class="demo-event-content">{{ eventLog }}</text>
          </view>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active1 = ref(0)
const active2 = ref('today')
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const active6 = ref(0)
const active7 = ref(0)
const active8 = ref(0)
const active10 = ref(0)
const active12 = ref(0)
const active13 = ref(0)
const active14 = ref(0)
const active15 = ref(0)
const active16 = ref(0)
const eventLog = ref('')

// 模拟商品数据
const hotProducts = [
  { id: 1, name: '无线蓝牙耳机', price: 299, image: '/static/img/img_1.jpg' },
  { id: 2, name: '智能手表', price: 899, image: '/static/img/img_2.jpg' },
  { id: 3, name: '便携充电宝', price: 159, image: '/static/img/img_3.jpg' },
]

const recommendProducts = [
  { id: 4, name: '机械键盘', price: 459, image: '/static/img/img_2.jpg' },
  { id: 5, name: '无线鼠标', price: 199, image: '/static/img/img_3.jpg' },
  { id: 6, name: '护眼台灯', price: 269, image: '/static/img/img_4.jpg' },
]

const newProducts = [
  { id: 7, name: '降噪耳机', price: 699, image: '/static/img/img_3.jpg' },
  { id: 8, name: '智能音箱', price: 399, image: '/static/img/img_4.jpg' },
  { id: 9, name: '平板电脑', price: 2499, image: '/static/img/img_5.jpg' },
]

function handleChange(e: any) {
  eventLog.value = `change: index=${e.index}, name=${e.name}`
  uni.showToast({ title: `切换到: ${e.name || e.index}`, icon: 'none' })
}

function handleClick(e: any) {
  eventLog.value = `click: index=${e.index}, name=${e.name}`
}

function handleDisabled(e: any) {
  eventLog.value = `disabled: index=${e.index}, name=${e.name}`
  uni.showToast({ title: '该标签已禁用', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.m-tabs-demo {
  min-height: 100vh;
  background-color: #f5f5f7;
  padding: 32rpx 0;

  &__container {
    max-width: 680rpx;
    margin: 0 auto;
    padding: 0 24rpx;
  }
}

.demo-tabs-card {
  padding: 0;
}

.demo-tabs-content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &--tall {
    min-height: 450rpx;
  }

  &--swipe {
    min-height: 360rpx;
  }
}

.demo-product-list {
  width: 100%;
}

.demo-product-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.demo-product-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
  background: #f5f5f7;
}

.demo-product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.demo-product-name {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.demo-product-price {
  font-size: 30rpx;
  color: #ff6b6b;
  font-weight: 600;
}

.demo-promotion-card {
  width: 100%;
  padding: 40rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  color: #fff;

  &--vip {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  }

  &--new {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
}

.demo-promotion-title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
}

.demo-promotion-desc {
  display: block;
  font-size: 26rpx;
  opacity: 0.9;
  margin-bottom: 24rpx;
}

.demo-promotion-btn {
  display: inline-block;
  padding: 16rpx 48rpx;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 40rpx;
  font-size: 26rpx;
}

.demo-order-list {
  width: 100%;
}

.demo-order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.demo-order-num {
  font-size: 26rpx;
  color: #666;
}

.demo-order-status {
  font-size: 26rpx;
  color: #ff6b6b;
}

.demo-empty-text {
  font-size: 28rpx;
  color: #999;
}

.demo-style-label {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 16rpx;
}

.demo-slidable-section {
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #f5f5f7;

  &:last-child {
    border-bottom: none;
  }
}

.demo-slidable-label {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 16rpx;
}

.demo-color-showcase {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-color-item {
  width: 200rpx;
  height: 200rpx;
  border-radius: 24rpx;
  margin-bottom: 24rpx;
}

.demo-color-text {
  font-size: 28rpx;
  color: #666;
}

.demo-video-card {
  width: 100%;
  padding: 24rpx;
  background: #f5f5f7;
  border-radius: 16rpx;
  margin-bottom: 20rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-video-cover {
  width: 100%;
  height: 200rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.demo-video-icon {
  font-size: 60rpx;
  color: #fff;
  opacity: 0.8;
}

.demo-video-title {
  display: block;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.demo-video-play {
  font-size: 24rpx;
  color: #999;
}

.demo-article-card {
  width: 100%;
  margin-bottom: 20rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-article-img {
  width: 100%;
  height: 240rpx;
  border-radius: 12rpx;
  margin-bottom: 12rpx;
  background: #f5f5f7;
}

.demo-article-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.demo-status-card {
  display: flex;
  align-items: center;
  padding: 24rpx;
  background: #f5f5f7;
  border-radius: 12rpx;
  margin-bottom: 20rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-status-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-right: 20rpx;
}

.demo-status-content {
  flex: 1;
}

.demo-status-name {
  display: block;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.demo-status-text {
  font-size: 24rpx;
  color: #999;
}

.demo-swipe-card {
  width: 100%;
  position: relative;
}

.demo-swipe-img {
  width: 100%;
  height: 380rpx;
  border-radius: 16rpx;
  background: #f5f5f7;
}

.demo-swipe-title {
  position: absolute;
  bottom: 20rpx;
  left: 20rpx;
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.demo-message-list {
  width: 100%;
}

.demo-message-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.demo-message-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-right: 20rpx;
}

.demo-message-info {
  flex: 1;
}

.demo-message-name {
  display: block;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.demo-message-text {
  font-size: 24rpx;
  color: #999;
}

.demo-event-text {
  font-size: 28rpx;
  color: #666;
}

.demo-event-log {
  margin: 24rpx 32rpx 32rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
}

.demo-event-label {
  font-size: 24rpx;
  color: #999;
}

.demo-event-content {
  font-size: 24rpx;
  color: #666;
  word-break: break-all;
}

.demo-simple-content {
  display: flex;
  align-items: center;
  justify-content: center;
  // min-height: 160rpx;
  padding: 24rpx;
}

.demo-simple-text {
  font-size: 28rpx;
  color: #666;
  background: #f5f5f7;
  padding: 16rpx 32rpx;
  border-radius: 8rpx;
}

.demo-map-card {
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}
</style>