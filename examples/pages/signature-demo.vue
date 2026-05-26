<template>
  <view class="m-signature-demo">
    <view class="m-signature-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="默认的签名组件，支持手写签名和导出图片">
        <view class="demo-signature-row">
          <m-signature 
            ref="basicSignatureRef"
            :height="200"
            @confirm="(r) => handleCardConfirm(r, 'basic')"
            @start="handleStart"
            @end="handleEnd"
          />
        </view>
        <view v-if="signatureImages.basic" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.basic" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="通过 pen-color 属性自定义签名笔颜色">
        <view class="demo-signature-row">
          <m-signature 
            :height="200"
            pen-color="#FF6B6B"
            confirm-text="确认签名"
            clear-text="清空"
            @confirm="(r) => handleCardConfirm(r, 'color')"
          />
        </view>
        <view v-if="signatureImages.color" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.color" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 自定义笔触宽度 -->
      <demo-block title="自定义笔触宽度" desc="通过 line-width 属性调整笔触粗细">
        <view class="demo-signature-row">
          <m-signature 
            :height="200"
            :line-width="5"
            pen-color="#4ECDC4"
            @confirm="(r) => handleCardConfirm(r, 'width')"
          />
        </view>
        <view v-if="signatureImages.width" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.width" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 压感模式 -->
      <demo-block title="压感模式" desc="开启 pressure 属性，根据书写速度动态调整笔触宽度">
        <view class="demo-signature-row">
          <m-signature 
            :height="200"
            :pressure="true"
            :max-width="8"
            :min-width="2"
            pen-color="#95E1D3"
            @confirm="(r) => handleCardConfirm(r, 'pressure')"
          />
        </view>
        <view v-if="signatureImages.pressure" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.pressure" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 自定义背景色 -->
      <demo-block title="自定义背景色" desc="通过 background-color 属性设置画布背景色">
        <view class="demo-signature-row">
          <m-signature 
            :height="200"
            background-color="#FFF8E7"
            pen-color="#E63946"
            @confirm="(r) => handleCardConfirm(r, 'bgcolor')"
          />
        </view>
        <view v-if="signatureImages.bgcolor" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.bgcolor" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 历史记录 -->
      <demo-block title="历史记录" desc="开启 enable-history 属性，支持撤销和恢复操作">
        <view class="demo-signature-row">
          <m-signature 
            :height="200"
            :enable-history="true"
            pen-color="#2D3436"
            @confirm="(r) => handleCardConfirm(r, 'history')"
          />
        </view>
        <view v-if="signatureImages.history" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.history" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 禁用状态 -->
      <demo-block title="禁用状态" desc="通过 disabled 属性禁用签名功能">
        <view class="demo-signature-row">
          <m-signature 
            :height="200"
            :disabled="true"
            pen-color="#636E72"
            @confirm="(r) => handleCardConfirm(r, 'disabled')"
          />
        </view>
        <view v-if="signatureImages.disabled" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.disabled" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 自定义尺寸 -->
      <demo-block title="自定义尺寸" desc="通过 width 和 height 属性自定义画布尺寸">
        <view class="demo-signature-row">
          <m-signature 
            :width="280"
            :height="150"
            pen-color="#0984E3"
            @confirm="(r) => handleCardConfirm(r, 'size')"
          />
        </view>
        <view v-if="signatureImages.size" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.size" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 自定义底部按钮 -->
      <demo-block title="自定义底部按钮" desc="使用 footer 插槽自定义底部操作按钮">
        <view class="demo-signature-row">
          <m-signature 
            :height="200"
            :enable-history="true"
            pen-color="#6C5CE7"
            @confirm="(r) => handleCardConfirm(r, 'custom')"
          >
            <template #footer="{ clear, confirm, revoke, restore, canUndo, canRedo }">
              <m-button size="small" plain @click="revoke" :disabled="!canUndo">撤销</m-button>
              <m-button size="small" plain @click="restore" :disabled="!canRedo">恢复</m-button>
              <m-button size="small" plain @click="clear">清空画布</m-button>
              <m-button size="small" type="primary" @click="confirm">保存签名</m-button>
            </template>
          </m-signature>
        </view>
        <view v-if="signatureImages.custom" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.custom" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { SignatureResult } from '@/packages/m-signature/types'

const signatureImages = reactive<Record<string, string>>({})
const basicSignatureRef = ref()

const handleCardConfirm = (result: SignatureResult, key: string) => {
  if (result.success) {
    signatureImages[key] = result.tempFilePath
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

const handleStart = () => {
  console.log('开始签名')
}

const handleEnd = () => {
  console.log('结束签名')
}
</script>

<style lang="scss" scoped>
.m-signature-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

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