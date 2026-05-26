<template>
  <view class="m-navbar-demo">
    <!-- 可切换的顶部导航栏 -->
    <m-navbar fixed placeholder :key="currentNavbarType" :title="currentNavbarTitle" :left-arrow="currentNavbarLeftArrow" :left-text="currentNavbarLeftText" :right-text="currentNavbarRightText" :bordered="currentNavbarBordered" :safe-area-inset-top="true" @click-left="handleClickLeft" @click-right="handleClickRight">
      <template #left v-if="currentNavbarType === 'customLeft'">
        <m-popover v-model="showPopover" mode="menu" :content="popoverMenuItems" placement="bottom-start">
          <view class="demo-navbar-custom-left">
            <m-icon name="more" />
            <text>菜单</text>
          </view>
        </m-popover>
      </template>
      <template #right v-if="currentNavbarType === 'customRight'">
        <view class="demo-navbar-custom-right">
          <m-icon name="share" />
        </view>
      </template>
      <template #title v-if="currentNavbarType === 'customTitle'">
        <view class="demo-navbar-custom-title">
          <text class="demo-navbar-title-icon">★</text>
          <text>自定义标题</text>
        </view>
      </template>
      <template #capsule v-if="currentNavbarType === 'capsule'">
        <m-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
      </template>
    </m-navbar>

    <view class="m-navbar-demo__container">
      <view class="m-navbar-demo__header">
        <text class="m-navbar-demo__title">导航栏组件</text>
        <text class="m-navbar-demo__desc">自定义导航栏，支持多种配置和插槽</text>
      </view>

      <!-- 快速切换区域 -->
      <demo-block title="快速切换" desc="点击下方按钮切换当前页面顶部的导航栏样式">
        <view class="demo-navbar-switch">
          <view class="demo-navbar-switch-row">
            <m-button v-for="item in navbarTypes" :key="item.value" :type="currentNavbarType === item.value ? 'primary' : 'default'" size="small" @click="switchNavbar(item.value)">{{ item.label }}</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="最简单的导航栏，仅包含标题">
        <view class="demo-navbar-row">
          <m-navbar title="基础导航栏" />
        </view>
      </demo-block>

      <!-- 带左侧箭头 -->
      <demo-block title="带左侧箭头" desc="通过 left-arrow 属性显示返回箭头">
        <view class="demo-navbar-row">
          <m-navbar title="返回首页" left-arrow @click-left="handleClickLeft" />
        </view>
      </demo-block>

      <!-- 带左右文本 -->
      <demo-block title="带左右文本" desc="通过 left-text 和 right-text 设置左右侧文本">
        <view class="demo-navbar-row">
          <m-navbar title="标题" left-text="返回" right-text="保存" @click-left="handleClickLeft" @click-right="handleClickRight" />
        </view>
      </demo-block>

      <!-- 自定义左侧内容 -->
      <demo-block title="自定义左侧内容" desc="使用 left 插槽自定义左侧内容，结合 popover 实现下拉菜单">
        <view class="demo-navbar-row">
          <m-navbar title="自定义左侧">
            <template #left>
              <m-popover mode="menu" :content="popoverMenuItems" placement="bottom-start">
                <view class="demo-navbar-custom-left">
                  <m-icon name="more" />
                  <text>菜单</text>
                </view>
              </m-popover>
            </template>
          </m-navbar>
        </view>
      </demo-block>

      <!-- 自定义右侧内容 -->
      <demo-block title="自定义右侧内容" desc="使用 right 插槽自定义右侧内容">
        <view class="demo-navbar-row">
          <m-navbar title="自定义右侧">
            <template #right>
              <view class="demo-navbar-custom-right">
                <m-icon name="share" />
              </view>
            </template>
          </m-navbar>
        </view>
      </demo-block>

      <!-- 自定义标题 -->
      <demo-block title="自定义标题" desc="使用 title 插槽自定义标题内容">
        <view class="demo-navbar-row">
          <m-navbar>
            <template #title>
              <view class="demo-navbar-custom-title">
                <text class="demo-navbar-title-icon">★</text>
                <text>自定义标题</text>
              </view>
            </template>
          </m-navbar>
        </view>
      </demo-block>

      <!-- 带边框 -->
      <demo-block title="带边框" desc="通过 bordered 属性显示底部边框">
        <view class="demo-navbar-row">
          <m-navbar title="带边框导航栏" bordered />
        </view>
      </demo-block>

      <!-- 固定到顶部 -->
      <demo-block title="固定到顶部" desc="通过 fixed 属性固定到顶部，placeholder 生成等高占位元素">
        <view class="demo-navbar-row">
          <m-navbar title="固定导航栏" bordered />
          <view class="demo-navbar-tips">
            <text>使用方式：&lt;m-navbar fixed placeholder /&gt;</text>
          </view>
        </view>
      </demo-block>

      <!-- 禁用状态 -->
      <demo-block title="禁用状态" desc="通过 left-disabled 和 right-disabled 禁用按钮">
        <view class="demo-navbar-row">
          <m-navbar title="禁用状态" left-text="返回" right-text="保存" left-disabled right-disabled />
        </view>
      </demo-block>

      <!-- 使用胶囊组件 -->
      <demo-block title="使用胶囊组件" desc="通过 capsule 插槽使用 navbar-capsule 组件">
        <view class="demo-navbar-row">
          <m-navbar title="胶囊导航">
            <template #capsule>
              <m-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
            </template>
          </m-navbar>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import mNavbar from '../../packages/m-navbar/m-navbar.vue'
import mNavbarCapsule from '../../packages/m-navbar-capsule/m-navbar-capsule.vue'
import mIcon from '../../packages/m-icon/m-icon.vue'
import mButton from '../../packages/m-button/m-button.vue'
import mPopover from '../../packages/m-popover/m-popover.vue'
import type { PopoverMenuItem } from '../../packages/m-popover/types'

const currentNavbarType = ref('basic')
const showPopover = ref(false)

const popoverMenuItems = ref<PopoverMenuItem[]>([
  { content: '全部订单', iconClass: 'm-icon-order' },
  { content: '待付款', iconClass: 'm-icon-wait' },
  { content: '待发货', iconClass: 'm-icon-delivery' },
  { content: '待收货', iconClass: 'm-icon-receive' },
  { content: '待评价', iconClass: 'm-icon-comment' },
  { content: '退换/售后', iconClass: 'm-icon-refund' }
])

const navbarTypes = [
  { value: 'basic', label: '基础标题' },
  { value: 'arrow', label: '带返回箭头' },
  { value: 'text', label: '带左右文本' },
  { value: 'customLeft', label: '自定义左侧' },
  { value: 'customRight', label: '自定义右侧' },
  { value: 'customTitle', label: '自定义标题' },
  { value: 'bordered', label: '带边框' },
  { value: 'capsule', label: '胶囊导航' }
]

const currentNavbarTitle = computed(() => {
  const titles: Record<string, string> = {
    basic: '基础导航栏',
    arrow: '返回首页',
    text: '标题',
    customLeft: '自定义左侧',
    customRight: '自定义右侧',
    customTitle: '',
    bordered: '带边框导航栏',
    capsule: '胶囊导航'
  }
  return titles[currentNavbarType.value] || ''
})

const currentNavbarLeftArrow = computed(() => currentNavbarType.value === 'arrow')
const currentNavbarLeftText = computed(() => currentNavbarType.value === 'text' ? '返回' : '')
const currentNavbarRightText = computed(() => currentNavbarType.value === 'text' ? '保存' : '')
const currentNavbarBordered = computed(() => currentNavbarType.value === 'bordered')

const switchNavbar = (type: string) => {
  currentNavbarType.value = type
  uni.showToast({ title: `已切换到: ${navbarTypes.find(t => t.value === type)?.label}`, icon: 'none' })
}

const handleClickLeft = () => {
  uni.showToast({ title: '点击左侧', icon: 'none' })
}

const handleClickRight = () => {
  uni.showToast({ title: '点击右侧', icon: 'none' })
}

const handleBack = () => {
  uni.showToast({ title: '返回上一页', icon: 'none' })
}

const handleBackHome = () => {
  uni.showToast({ title: '返回首页', icon: 'none' })
}
</script>

<style lang="scss">
.m-navbar-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 32rpx 0;
}

.m-navbar-demo__container {
  max-width: 1200rpx;
  margin: 0 auto;
  padding: 0 32rpx;
}

.m-navbar-demo__header {
  margin-bottom: 40rpx;
}

.m-navbar-demo__title {
  font-size: 48rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 12rpx;
}

.m-navbar-demo__desc {
  font-size: 28rpx;
  color: #999;
}

.demo-navbar-row {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.demo-navbar-tips {
  padding: 20rpx;
  margin-top: 16rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  text-align: center;

  text {
    display: block;
    color: #666;
    font-size: 24rpx;
    font-family: monospace;
  }
}

.demo-navbar-custom-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: #333;
  font-size: 28rpx;
}

.demo-navbar-custom-right {
  color: #333;
}

.demo-navbar-custom-title {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.demo-navbar-title-icon {
  font-size: 32rpx;
  color: #ff6b6b;
}

.demo-navbar-switch {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
}

.demo-navbar-switch-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}
</style>