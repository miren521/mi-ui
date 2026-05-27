<template>
  <view class="m-tabbar-demo">
    <view class="m-tabbar-demo__container">
      <!-- 快速切换区域 -->
      <demo-block title="快速切换" desc="点击下方按钮切换底部标签栏样式">
        <view class="demo-tabbar-switch">
          <view class="demo-tabbar-switch-row">
            <m-button v-for="item in tabbarTypes" :key="item.value" :type="currentTabbarType === item.value ? 'primary' : 'default'" size="small" @click="switchTabbar(item.value)">{{ item.label }}</m-button>
          </view>
          <view class="demo-tabbar-switch-row" style="margin-top: 30rpx;">
            <m-switch v-model="showShadow" active-color="#1989fa" inactive-color="#ddd">
            </m-switch>
            <m-text text="显示顶部阴影" size="28rpx" />
          </view>
          <view class="demo-tabbar-switch-row" style="margin-top: 16rpx;">
            <m-switch v-model="safeAreaInsetBottom" active-color="#1989fa" inactive-color="#ddd">
            </m-switch>
            <m-text text="安全区适配" size="28rpx" />
          </view>
        </view>
      </demo-block>

      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="最简单的标签栏，包含图标和文字">
        <view class="demo-tabbar-row">
          <m-tabbar v-model="tabbarValue1">
            <m-tabbar-item name="home" icon="home" title="首页" />
            <m-tabbar-item name="message" icon="message" title="客服" />
            <m-tabbar-item name="image" icon="image" title="相册" />
            <m-tabbar-item name="user" icon="user" title="我的" />
          </m-tabbar>
        </view>
      </demo-block>

      <!-- 带徽标 -->
      <demo-block title="带徽标" desc="通过 value 和 is-dot 属性设置徽标">
        <view class="demo-tabbar-row">
          <m-tabbar v-model="tabbarValue2">
            <m-tabbar-item name="home" icon="home" title="首页" />
            <m-tabbar-item name="message" icon="message" title="客服" :value="5" />
            <m-tabbar-item name="image" icon="image" title="相册" :value="99" />
            <m-tabbar-item name="user" icon="user" title="我的" is-dot />
          </m-tabbar>
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="通过 active-color 和 inactive-color 设置激活和未激活颜色">
        <view class="demo-tabbar-row">
          <m-tabbar v-model="tabbarValue3" active-color="#ff6b6b" inactive-color="#999">
            <m-tabbar-item name="home" icon="home" title="首页" />
            <m-tabbar-item name="message" icon="message" title="客服" />
            <m-tabbar-item name="image" icon="image" title="相册" />
            <m-tabbar-item name="user" icon="user" title="我的" />
          </m-tabbar>
        </view>
      </demo-block>

      <!-- 圆角样式 -->
      <demo-block title="圆角样式" desc="通过 shape 属性设置为 round">
        <view class="demo-tabbar-row">
          <m-tabbar v-model="tabbarValue4" shape="round">
            <m-tabbar-item name="home" icon="home" title="首页" />
            <m-tabbar-item name="message" icon="message" title="客服" />
            <m-tabbar-item name="image" icon="image" title="相册" />
            <m-tabbar-item name="user" icon="user" title="我的" />
          </m-tabbar>
        </view>
      </demo-block>

      <!-- 固定底部 -->
      <demo-block title="固定底部" desc="通过 fixed 属性固定在底部，placeholder 生成占位元素">
        <view class="demo-tabbar-row">
          <m-tabbar v-model="tabbarValue5" placeholder>
            <m-tabbar-item name="home" icon="home" title="首页" />
            <m-tabbar-item name="message" icon="message" title="客服" />
            <m-tabbar-item name="image" icon="image" title="相册" />
            <m-tabbar-item name="user" icon="user" title="我的" />
          </m-tabbar>
        </view>
      </demo-block>

      <!-- 自定义图标 -->
      <demo-block title="自定义图标" desc="使用 icon 插槽自定义图标">
        <view class="demo-tabbar-row">
          <m-tabbar v-model="tabbarValue6">
            <m-tabbar-item name="home" title="首页">
              <template #icon="{ active }">
                <m-icon :name="active ? 'home' : 'home'" :custom-style="{ color: active ? '#1989fa' : '#999' }" />
              </template>
            </m-tabbar-item>
            <m-tabbar-item name="message" title="客服">
              <template #icon="{ active }">
                <m-icon :name="active ? 'message' : 'message'" :custom-style="{ color: active ? '#1989fa' : '#999' }" />
              </template>
            </m-tabbar-item>
            <m-tabbar-item name="image" title="相册">
              <template #icon="{ active }">
                <m-icon :name="active ? 'image' : 'image'" :custom-style="{ color: active ? '#1989fa' : '#999' }" />
              </template>
            </m-tabbar-item>
            <m-tabbar-item name="user" title="我的">
              <template #icon="{ active }">
                <m-icon :name="active ? 'user' : 'user'" :custom-style="{ color: active ? '#1989fa' : '#999' }" />
              </template>
            </m-tabbar-item>
          </m-tabbar>
        </view>
      </demo-block>

      <!-- 中间突出效果 -->
      <demo-block title="中间突出效果" desc="通过 active-icon 属性实现中间按钮突出显示">
        <view class="demo-tabbar-row">
          <m-tabbar v-model="tabbarValue7">
            <m-tabbar-item name="home" icon="home" title="首页" />
            <m-tabbar-item name="message" icon="message" title="客服" />
            <m-tabbar-item name="center" icon="plus" title="" :active-icon="true" />
            <m-tabbar-item name="image" icon="image" title="相册" />
            <m-tabbar-item name="user" icon="user" title="我的" />
          </m-tabbar>
        </view>
      </demo-block>

      <!-- 带顶部阴影 -->
      <demo-block title="带顶部阴影" desc="使用自定义样式添加顶部阴影">
        <view class="demo-tabbar-row">
          <m-tabbar v-model="tabbarValue8" custom-class="demo-tabbar-shadow">
            <m-tabbar-item name="home" icon="home" title="首页" />
            <m-tabbar-item name="message" icon="message" title="客服" />
            <m-tabbar-item name="center" icon="plus" title="" :active-icon="true" />
            <m-tabbar-item name="image" icon="image" title="相册" />
            <m-tabbar-item name="user" icon="user" title="我的" />
          </m-tabbar>
        </view>
      </demo-block>

    </view>

    <!-- 底部可切换的 tabbar -->
    <m-tabbar
      v-model="bottomTabbarValue"
      :key="currentTabbarType"
      :fixed="bottomTabbarConfig.fixed"
      :placeholder="bottomTabbarConfig.placeholder"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :bordered="bottomTabbarConfig.bordered"
      :shape="bottomTabbarConfig.shape"
      :active-color="bottomTabbarConfig.activeColor"
      :inactive-color="bottomTabbarConfig.inactiveColor"
      :z-index="bottomTabbarConfig.zIndex"
      :custom-class="showShadow ? 'demo-tabbar-shadow' : ''"
      @change="handleBottomTabbarChange"
    >
      <m-tabbar-item name="home" icon="home" title="首页" />
      <m-tabbar-item name="message" icon="message" title="客服" :value="5" />
      <m-tabbar-item name="center" icon="plus" title="" :active-icon="true" />
      <m-tabbar-item name="album" icon="image" title="相册" :value="99" />
      <m-tabbar-item name="user" icon="user" title="我的" is-dot />
    </m-tabbar>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import mTabbar from '../../packages/m-tabbar/m-tabbar.vue'
import mTabbarItem from '../../packages/m-tabbar-item/m-tabbar-item.vue'
import mButton from '../../packages/m-button/m-button.vue'
import mIcon from '../../packages/m-icon/m-icon.vue'
import mSwitch from '../../packages/m-switch/m-switch.vue'

const currentTabbarType = ref('basic')
const showShadow = ref(false)
const safeAreaInsetBottom = ref(false)

const tabbarTypes = [
  { value: 'basic', label: '基础样式' },
  { value: 'round', label: '圆角样式' },
  { value: 'colored', label: '自定义颜色' },
  { value: 'bordered', label: '带边框' }
]

const bottomTabbarConfig = computed(() => {
  const configs: Record<string, any> = {
    basic: {
      fixed: true,
      placeholder: true,
      safeAreaInsetBottom: false,
      bordered: false,
      shape: 'default',
      activeColor: '',
      inactiveColor: '',
      zIndex: 10
    },
    round: {
      fixed: true,
      placeholder: true,
      safeAreaInsetBottom: false,
      bordered: false,
      shape: 'round',
      activeColor: '',
      inactiveColor: '',
      zIndex: 10
    },
    colored: {
      fixed: true,
      placeholder: true,
      safeAreaInsetBottom: false,
      bordered: false,
      shape: 'default',
      activeColor: '#ff6b6b',
      inactiveColor: '#999',
      zIndex: 10
    },
    bordered: {
      fixed: true,
      placeholder: true,
      safeAreaInsetBottom: false,
      bordered: true,
      shape: 'default',
      activeColor: '',
      inactiveColor: '',
      zIndex: 10
    },
    safe: {
      fixed: true,
      placeholder: true,
      safeAreaInsetBottom: true,
      bordered: false,
      shape: 'default',
      activeColor: '',
      inactiveColor: '',
      zIndex: 10
    }
  }
  return configs[currentTabbarType.value] || configs.basic
})

const tabbarValue1 = ref('home')
const tabbarValue2 = ref('home')
const tabbarValue3 = ref('home')
const tabbarValue4 = ref('home')
const tabbarValue5 = ref('home')
const tabbarValue6 = ref('home')
const tabbarValue7 = ref('home')
const tabbarValue8 = ref('home')
const bottomTabbarValue = ref('home')

function switchTabbar(type: string) {
  currentTabbarType.value = type
  uni.showToast({ title: `已切换到: ${tabbarTypes.find(t => t.value === type)?.label}`, icon: 'none' })
}

function handleBottomTabbarChange(e: any) {
  console.log('底部 tabbar 切换:', e.value)
  uni.showToast({ title: `切换到: ${e.value}`, icon: 'none' })
}
</script>

<style lang="scss">
.m-tabbar-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;

  &__container {
    padding: 32rpx;
  }

  &__header {
    text-align: center;
    margin-bottom: 40rpx;

    .m-tabbar-demo__title {
      display: block;
      font-size: 40rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 16rpx;
    }

    .m-tabbar-demo__desc {
      display: block;
      font-size: 28rpx;
      color: #999;
    }
  }
}

.demo-tabbar-switch {
  padding: 20rpx 0;

  &-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }
}

.demo-tabbar-row {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 10rpx;
}

.demo-tabbar-shadow {
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
  height: 100%;
}

.demo-tabbar-switch-row{
  display: flex;
  align-items: center;
}
</style>