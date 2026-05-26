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

      <!-- 弹窗签名 -->
      <demo-block title="弹窗签名" desc="点击按钮在弹窗中打开签名组件">
        <view class="demo-signature-row">
          <m-button type="primary" @click="showModal = true">打开弹窗签名</m-button>
        </view>
        <view v-if="signatureImages.modal" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.modal" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>

      <!-- 保存图片到相册 -->
      <demo-block title="保存图片" desc="签名确认后点击按钮将图片保存到相册">
        <view class="demo-signature-row">
          <m-signature 
            :height="200"
            pen-color="#00CEC9"
            @confirm="(r) => handleCardConfirm(r, 'save')"
          />
        </view>
        <view v-if="signatureImages.save" class="demo-signature-preview">
          <text class="demo-signature-label">签名预览：</text>
          <image :src="signatureImages.save" mode="widthFix" class="demo-signature-image" />
          <view class="demo-signature-actions">
            <m-button type="primary" size="small" @click="saveToAlbum">保存到相册</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 横屏签名 -->
      <demo-block title="横屏签名" desc="适合宽幅签名场景，设置宽度大于高度">
        <view class="demo-signature-row">
          <m-signature 
            :width="600"
            :height="200"
            pen-color="#E17055"
            confirm-text="确认横屏签名"
            @confirm="(r) => handleCardConfirm(r, 'landscape')"
          />
        </view>
        <view v-if="signatureImages.landscape" class="demo-signature-preview">
          <text class="demo-signature-label">横屏签名预览：</text>
          <image :src="signatureImages.landscape" mode="widthFix" class="demo-signature-image" />
        </view>
      </demo-block>
    </view>

    <!-- 弹窗组件 -->
    <view v-if="showModal" class="demo-modal-mask" @click="showModal = false">
      <view class="demo-modal-content" @click.stop>
        <view class="demo-modal-header">
          <text class="demo-modal-title">弹窗签名</text>
          <text class="demo-modal-close" @click="showModal = false">×</text>
        </view>
        <view class="demo-modal-body">
          <m-signature 
            :height="300"
            pen-color="#2D3436"
            @confirm="(r) => handleModalConfirm(r)"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { SignatureResult } from '@/packages/m-signature/types'

const signatureImages = reactive<Record<string, string>>({})
const basicSignatureRef = ref()
const showModal = ref(false)

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

const handleModalConfirm = (result: SignatureResult) => {
  if (result.success) {
    signatureImages.modal = result.tempFilePath
    showModal.value = false
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

const saveToAlbum = () => {
  const filePath = signatureImages.save
  if (!filePath) {
    uni.showToast({
      title: '请先签名',
      icon: 'none'
    })
    return
  }
  
  // #ifdef H5
  // H5环境下使用下载方式
  downloadImage(filePath)
  // #endif
  
  // #ifndef H5
  // 小程序和App环境使用原生API
  uni.saveImageToPhotosAlbum({
    filePath: filePath,
    success: () => {
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
    },
    fail: (err) => {
      console.error('保存失败:', err)
      // 尝试使用另一种方式
      if (filePath.startsWith('data:')) {
        downloadImage(filePath)
      } else {
        uni.showToast({
          title: '保存失败，请重试',
          icon: 'error'
        })
      }
    }
  })
  // #endif
}

const downloadImage = (base64Data: string) => {
  try {
    // 创建临时链接
    let url = base64Data
    if (base64Data.startsWith('data:')) {
      // base64转blob
      const arr = base64Data.split(',')
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr], { type: mime })
      url = URL.createObjectURL(blob)
    }
    
    // 创建下载链接
    const link = document.createElement('a')
    link.href = url
    link.download = `signature_${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    if (url !== base64Data) {
      URL.revokeObjectURL(url)
    }
    
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
  } catch (err) {
    console.error('下载失败:', err)
    uni.showToast({
      title: '下载失败，请长按图片保存',
      icon: 'none',
      duration: 3000
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

.demo-signature-actions {
  margin-top: 16rpx;
  display: flex;
  justify-content: center;
}

/* 弹窗样式 */
.demo-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.demo-modal-content {
  width: 90%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  border-bottom: 1px solid #eee;
}

.demo-modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.demo-modal-close {
  font-size: 48rpx;
  color: #999;
  line-height: 1;
}

.demo-modal-body {
  padding: 24rpx;
}
</style>