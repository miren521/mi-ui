<template>
  <view class="m-collapse-demo">
    <!-- 基本使用 -->
    <demo-block title="基本使用" desc="使用 v-model 绑定展开的面板名称，支持同时展开多个面板">
      <view class="demo-collapse-row">
        <m-collapse v-model="activeNames1">
          <m-collapse-item name="1" title="标题1">
            <view class="demo-collapse-content">
              内容1：这是折叠面板的内容区域，可以放置任何内容。
              内容1：这是折叠面板的内容区域，可以放置任何内容。
              内容1：这是折叠面板的内容区域，可以放置任何内容。
            </view>
          </m-collapse-item>
          <m-collapse-item name="2" title="标题2">
            <view class="demo-collapse-content">
              内容2：这是折叠面板的内容区域，可以放置任何内容。
              内容2：这是折叠面板的内容区域，可以放置任何内容。
              内容2：这是折叠面板的内容区域，可以放置任何内容。
            </view>
          </m-collapse-item>
          <m-collapse-item name="3" title="标题3">
            <view class="demo-collapse-content">
              内容3：这是折叠面板的内容区域，可以放置任何内容。
              内容3：这是折叠面板的内容区域，可以放置任何内容。
              内容3：这是折叠面板的内容区域，可以放置任何内容。
            </view>
          </m-collapse-item>
        </m-collapse>
      </view>
    </demo-block>

    <!-- 手风琴模式 -->
    <demo-block title="手风琴模式" desc="设置 accordion 属性为 true，只能同时展开一个面板">
      <view class="demo-collapse-row">
        <m-collapse v-model="activeName2" :accordion="true">
          <m-collapse-item name="1" title="标题1">
            <view class="demo-collapse-content">
              内容1：手风琴模式下，只能同时展开一个面板。
              内容1：手风琴模式下，只能同时展开一个面板。
              内容1：手风琴模式下，只能同时展开一个面板。
            </view>
          </m-collapse-item>
          <m-collapse-item name="2" title="标题2">
            <view class="demo-collapse-content">
              内容2：手风琴模式下，只能同时展开一个面板。
              内容2：手风琴模式下，只能同时展开一个面板。
              内容2：手风琴模式下，只能同时展开一个面板。
            </view>
          </m-collapse-item>
          <m-collapse-item name="3" title="标题3">
            <view class="demo-collapse-content">
              内容3：手风琴模式下，只能同时展开一个面板。
              内容3：手风琴模式下，只能同时展开一个面板。
              内容3：手风琴模式下，只能同时展开一个面板。
            </view>
          </m-collapse-item>
        </m-collapse>
      </view>
    </demo-block>

    <!-- 禁用状态 -->
    <demo-block title="禁用状态" desc="设置 disabled 属性为 true，禁用面板的点击操作">
      <view class="demo-collapse-row">
        <m-collapse v-model="activeNames3">
          <m-collapse-item name="1" title="标题1">
            <view class="demo-collapse-content">
              内容1：这是一个可展开的面板。
            </view>
          </m-collapse-item>
          <m-collapse-item name="2" title="标题2" :disabled="true">
            <view class="demo-collapse-content">
              内容2：这是一个禁用的面板，点击无反应。
            </view>
          </m-collapse-item>
          <m-collapse-item name="3" title="标题3">
            <view class="demo-collapse-content">
              内容3：这是一个可展开的面板。
            </view>
          </m-collapse-item>
        </m-collapse>
      </view>
    </demo-block>

    <!-- 自定义标题 -->
    <demo-block title="自定义标题" desc="使用 title 插槽自定义标题内容，可访问 expanded 和 disabled 状态">
      <view class="demo-collapse-row">
        <m-collapse v-model="activeNames4">
          <m-collapse-item name="1">
            <template #title="{ expanded }">
              <view class="demo-collapse-custom-title">
                <text>自定义标题1</text>
                <text class="demo-collapse-custom-badge">{{ expanded ? '展开' : '收起' }}</text>
                <uni-icons type="bottom" size="24" :class="{ 'is-rotated': expanded }" />
              </view>
            </template>
            <view class="demo-collapse-content">
              内容1：使用自定义标题插槽。
            </view>
          </m-collapse-item>
          <m-collapse-item name="2">
            <template #title="{ expanded, disabled }">
              <view class="demo-collapse-custom-title">
                <text :class="{ 'is-disabled': disabled }">自定义标题2</text>
                <uni-icons type="bottom" size="24" :class="{ 'is-rotated': expanded }" />
              </view>
            </template>
            <view class="demo-collapse-content">
              内容2：使用自定义标题插槽。
            </view>
          </m-collapse-item>
        </m-collapse>
      </view>
    </demo-block>

    <!-- 无边框 -->
    <demo-block title="无边框" desc="设置 border 属性为 false，移除面板间的边框">
      <view class="demo-collapse-row">
        <m-collapse v-model="activeNames5">
          <m-collapse-item name="1" title="标题1" :border="false">
            <view class="demo-collapse-content">
              内容1：无边框样式。
            </view>
          </m-collapse-item>
          <m-collapse-item name="2" title="标题2" :border="false">
            <view class="demo-collapse-content">
              内容2：无边框样式。
            </view>
          </m-collapse-item>
        </m-collapse>
      </view>
    </demo-block>

    <!-- 展开前回调 -->
    <demo-block title="展开前回调" desc="设置 beforeExpand 属性，点击展开前会触发回调，返回 false 可阻止展开">
      <view class="demo-collapse-row">
        <m-collapse v-model="activeNames6">
          <m-collapse-item name="1" title="标题1" :beforeExpand="beforeExpand">
            <view class="demo-collapse-content">
              内容1：点击时会触发展开前回调。
            </view>
          </m-collapse-item>
          <m-collapse-item name="2" title="标题2">
            <view class="demo-collapse-content">
              内容2：正常展开。
            </view>
          </m-collapse-item>
        </m-collapse>
      </view>
    </demo-block>

    <!-- 异步展开 -->
    <demo-block title="异步展开" desc="beforeExpand 回调支持返回 Promise，会显示加载状态，等待 Promise 完成后再切换展开状态">
      <view class="demo-collapse-row">
        <m-collapse v-model="activeNames7">
          <m-collapse-item name="1" title="标题1" :beforeExpand="asyncBeforeExpand">
            <view class="demo-collapse-content">
              内容1：点击后会模拟异步操作，显示加载状态。
            </view>
          </m-collapse-item>
          <m-collapse-item name="2" title="标题2">
            <view class="demo-collapse-content">
              内容2：正常展开。
            </view>
          </m-collapse-item>
        </m-collapse>
      </view>
    </demo-block>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 基本使用
const activeNames1 = ref(['1'])

// 手风琴模式
const activeName2 = ref('1')

// 禁用状态
const activeNames3 = ref(['1'])

// 自定义标题
const activeNames4 = ref(['1'])

// 无边框
const activeNames5 = ref(['1'])

// 展开前回调
const activeNames6 = ref(['1'])

// 异步展开
const activeNames7 = ref(['1'])

// 展开前回调函数
const beforeExpand = (name) => {
  return new Promise((resolve) => {
    uni.showModal({
      title: '提示',
      content: `确定要展开 ${name} 吗？`,
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}

// 异步展开前回调函数
const asyncBeforeExpand = (name) => {
  return new Promise((resolve) => {
    // 模拟异步操作，比如网络请求
    setTimeout(() => {
      resolve(true)
    }, 1500)
  })
}
</script>

<style lang="scss" scoped>
.m-collapse-demo {
  padding: 32rpx;
  background: #f5f7fc;
  min-height: 100vh;
}

.m-demo-header {
  text-align: center;
  margin-bottom: 40rpx;
  padding: 40rpx 0;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
}

.m-demo-title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12rpx;
}

.m-demo-desc {
  display: block;
  font-size: 24rpx;
  color: #64748b;
}

.demo-collapse-row {
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
}

.demo-collapse-content {
  line-height: 40rpx;
}

.demo-collapse-custom-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  .demo-collapse-custom-badge {
    margin-right: 16rpx;
    font-size: 24rpx;
    color: #6366f1;
  }
  
  .is-disabled {
    color: #94a3b8;
  }
}

.is-rotated {
  transform: rotate(-180deg);
  transition: transform 0.3s ease;
}

.demo-code {
  background: #f8fafc;
  border-radius: 12rpx;
  padding: 24rpx;
  font-size: 24rpx;
  line-height: 40rpx;
  font-family: 'Courier New', Courier, monospace;
}

.demo-code-title {
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16rpx;
  margin-top: 24rpx;
  
  &:first-child {
    margin-top: 0;
  }
}

.demo-code-content {
  background: #1e293b;
  color: #e2e8f0;
  padding: 20rpx;
  border-radius: 8rpx;
  overflow-x: auto;
}

.demo-code-line {
  display: block;
  white-space: pre;
}
</style>