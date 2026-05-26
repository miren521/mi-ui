<template>
  <view class="m-slide-verify-demo">
    <view class="m-slide-verify-demo__container">
      <view class="m-slide-verify-demo__header">
        <text class="m-slide-verify-demo__title">滑块验证</text>
        <text class="m-slide-verify-demo__desc">滑动验证组件，用于人机验证场景</text>
      </view>

      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="默认的滑块验证组件，拖动滑块到右侧完成验证">
        <view class="demo-slide-verify-row">
          <m-slide-verify 
            @success="handleSuccess('basic')" 
            @fail="handleFail('basic')"
          />
        </view>
        <view v-if="verifyResults.basic" class="demo-slide-verify-result">
          <text :class="['demo-slide-verify-result-text', verifyResults.basic ? 'success' : 'fail']">
            {{ verifyResults.basic ? '验证成功' : '验证失败' }}
          </text>
        </view>
      </demo-block>

      <!-- 自定义提示文字 -->
      <demo-block title="自定义提示文字" desc="通过 text 和 success-text 属性自定义提示文字">
        <view class="demo-slide-verify-row">
          <m-slide-verify 
            text="请滑动验证"
            success-text="验证通过！"
            @success="handleSuccess('custom-text')" 
            @fail="handleFail('custom-text')"
          />
        </view>
        <view v-if="verifyResults['custom-text'] !== undefined" class="demo-slide-verify-result">
          <text :class="['demo-slide-verify-result-text', verifyResults['custom-text'] ? 'success' : 'fail']">
            {{ verifyResults['custom-text'] ? '验证成功' : '验证失败' }}
          </text>
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="通过 backgroundColor 和 activeBackgroundColor 属性自定义颜色">
        <view class="demo-slide-verify-row">
          <m-slide-verify 
            background-color="#f0f5ff"
            active-background-color="#1890ff"
            @success="handleSuccess('custom-color')" 
            @fail="handleFail('custom-color')"
          />
        </view>
        <view v-if="verifyResults['custom-color'] !== undefined" class="demo-slide-verify-result">
          <text :class="['demo-slide-verify-result-text', verifyResults['custom-color'] ? 'success' : 'fail']">
            {{ verifyResults['custom-color'] ? '验证成功' : '验证失败' }}
          </text>
        </view>
      </demo-block>

      <!-- 禁用状态 -->
      <demo-block title="禁用状态" desc="通过 disabled 属性禁用滑块验证">
        <view class="demo-slide-verify-row">
          <m-slide-verify 
            disabled
          />
        </view>
        <text class="demo-slide-verify-tip">禁用状态下无法拖动滑块</text>
      </demo-block>

      <!-- 自定义容错范围 -->
      <demo-block title="自定义容错范围" desc="通过 tolerance 属性设置容错范围，默认10px">
        <view class="demo-slide-verify-row">
          <m-slide-verify 
            :tolerance="30"
            text="容错范围 30px"
            @success="handleSuccess('tolerance')" 
            @fail="handleFail('tolerance')"
          />
        </view>
        <view v-if="verifyResults['tolerance'] !== undefined" class="demo-slide-verify-result">
          <text :class="['demo-slide-verify-result-text', verifyResults['tolerance'] ? 'success' : 'fail']">
            {{ verifyResults['tolerance'] ? '验证成功' : '验证失败' }}
          </text>
        </view>
      </demo-block>

      <!-- 重置功能 -->
      <demo-block title="重置功能" desc="通过 ref 调用 reset 方法重置验证状态">
        <view class="demo-slide-verify-row">
          <m-slide-verify 
            ref="resetRef"
            @success="handleSuccess('reset')" 
            @fail="handleFail('reset')"
          />
        </view>
        <view v-if="verifyResults['reset'] !== undefined" class="demo-slide-verify-result">
          <text :class="['demo-slide-verify-result-text', verifyResults['reset'] ? 'success' : 'fail']">
            {{ verifyResults['reset'] ? '验证成功' : '验证失败' }}
          </text>
          <m-button type="primary" size="small" @click="handleReset">重置验证</m-button>
        </view>
      </demo-block>

      <!-- 自定义图标 -->
      <demo-block title="自定义图标" desc="通过 icon 和 success-icon 属性自定义图标">
        <view class="demo-slide-verify-row">
          <m-slide-verify 
            icon="arrow-right"
            success-icon="check"
            @success="handleSuccess('custom-icon')" 
            @fail="handleFail('custom-icon')"
          />
        </view>
        <view v-if="verifyResults['custom-icon'] !== undefined" class="demo-slide-verify-result">
          <text :class="['demo-slide-verify-result-text', verifyResults['custom-icon'] ? 'success' : 'fail']">
            {{ verifyResults['custom-icon'] ? '验证成功' : '验证失败' }}
          </text>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { SlideVerifyInstance } from '../../packages/m-slide-verify/types'

const verifyResults = reactive<Record<string, boolean | undefined>>({})
const resetRef = ref<SlideVerifyInstance | null>(null)

const handleSuccess = (key: string) => {
  verifyResults[key] = true
  uni.showToast({
    title: '验证成功',
    icon: 'success'
  })
}

const handleFail = (key: string) => {
  verifyResults[key] = false
}

const handleReset = () => {
  resetRef.value?.reset()
  verifyResults['reset'] = undefined
}
</script>

<style lang="scss">
.m-slide-verify-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 32rpx 0;
}

.m-slide-verify-demo__container {
  max-width: 1200rpx;
  margin: 0 auto;
  padding: 0 32rpx;
}

.m-slide-verify-demo__header {
  margin-bottom: 40rpx;
}

.m-slide-verify-demo__title {
  font-size: 48rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 12rpx;
}

.m-slide-verify-demo__desc {
  font-size: 28rpx;
  color: #999;
}

.demo-slide-verify-row {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
}

.demo-slide-verify-result {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.demo-slide-verify-result-text {
  font-size: 28rpx;
  &.success {
    color: #52c41a;
  }
  &.fail {
    color: #ff4d4f;
  }
}

.demo-slide-verify-tip {
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #999;
}
</style>