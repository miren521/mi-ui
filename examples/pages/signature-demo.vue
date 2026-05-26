<template>
  <view class="demo-page">
    <demo-block title="基础用法" desc="默认的签名组件，支持手写签名和导出图片">
      <view class="demo-signature-row">
        <m-signature 
          ref="basicSignatureRef"
          :height="200"
          @confirm="handleConfirm"
          @start="handleStart"
          @end="handleEnd"
        />
      </view>
      <view v-if="signatureImage" class="demo-signature-preview">
        <text class="demo-signature-label">签名预览：</text>
        <image :src="signatureImage" mode="widthFix" class="demo-signature-image" />
      </view>
    </demo-block>

    <demo-block title="自定义颜色" desc="通过 pen-color 属性自定义签名笔颜色">
      <view class="demo-signature-row">
        <m-signature 
          :height="200"
          pen-color="#FF6B6B"
          confirm-text="确认签名"
          clear-text="清空"
        />
      </view>
    </demo-block>

    <demo-block title="自定义笔触宽度" desc="通过 line-width 属性调整笔触粗细">
      <view class="demo-signature-row">
        <m-signature 
          :height="200"
          :line-width="5"
          pen-color="#4ECDC4"
        />
      </view>
    </demo-block>

    <demo-block title="压感模式" desc="开启 pressure 属性，根据书写速度动态调整笔触宽度">
      <view class="demo-signature-row">
        <m-signature 
          :height="200"
          :pressure="true"
          :max-width="8"
          :min-width="2"
          pen-color="#95E1D3"
        />
      </view>
    </demo-block>

    <demo-block title="自定义背景色" desc="通过 background-color 属性设置画布背景色">
      <view class="demo-signature-row">
        <m-signature 
          :height="200"
          background-color="#FFF8E7"
          pen-color="#E63946"
        />
      </view>
    </demo-block>

    <demo-block title="历史记录" desc="开启 enable-history 属性，支持撤销和恢复操作">
      <view class="demo-signature-row">
        <m-signature 
          :height="200"
          :enable-history="true"
          pen-color="#2D3436"
        />
      </view>
    </demo-block>

    <demo-block title="禁用状态" desc="通过 disabled 属性禁用签名功能">
      <view class="demo-signature-row">
        <m-signature 
          :height="200"
          :disabled="true"
          pen-color="#636E72"
        />
      </view>
    </demo-block>

    <demo-block title="自定义尺寸" desc="通过 width 和 height 属性自定义画布尺寸">
      <view class="demo-signature-row">
        <m-signature 
          :width="280"
          :height="150"
          pen-color="#0984E3"
        />
      </view>
    </demo-block>

    <demo-block title="自定义底部按钮" desc="使用 footer 插槽自定义底部操作按钮">
      <view class="demo-signature-row">
        <m-signature 
          :height="200"
          :enable-history="true"
          pen-color="#6C5CE7"
          @confirm="handleCustomConfirm"
        >
          <template #footer="{ clear, confirm, revoke, restore, canUndo, canRedo }">
            <m-button size="small" plain @click="revoke" :disabled="!canUndo">撤销</m-button>
            <m-button size="small" plain @click="restore" :disabled="!canRedo">恢复</m-button>
            <m-button size="small" plain @click="clear">清空画布</m-button>
            <m-button size="small" type="primary" @click="confirm">保存签名</m-button>
          </template>
        </m-signature>
      </view>
    </demo-block>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SignatureResult } from '@/packages/m-signature/types'

const signatureImage = ref('')
const basicSignatureRef = ref()

const handleConfirm = (result: SignatureResult) => {
  if (result.success) {
    signatureImage.value = result.tempFilePath
    uni.showToast({
      title: '签名成功',
      icon: 'success'
    })
  } else {
    uni.showToast({
      title: '签名失败',
      icon: 'error'
    })
  }
}

const handleCustomConfirm = (result: SignatureResult) => {
  if (result.success) {
    uni.showToast({
      title: '签名已保存',
      icon: 'success'
    })
  }
}

const handleStart = () => {
  console.log('开始签名')
}

const handleEnd = () => {
  console.log('结束签名')
}
</script>

<style lang="scss">
.demo-signature-row {
  margin-bottom: 16rpx;
}

.demo-signature-preview {
  margin-top: 16rpx;
  padding: 16rpx;
  background: #f8f9fa;
  border-radius: 8rpx;
}

.demo-signature-label {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 12rpx;
  display: block;
}

.demo-signature-image {
  max-width: 100%;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>