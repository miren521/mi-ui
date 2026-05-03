<template>
  <view class="page">
    <view class="page-content">
      <demo-block title="基础用法" desc="点击下方按钮打开图片预览">
        <view class="demo-image-preview-row">
          <view class="demo-image-preview-list">
            <view class="demo-image-preview-item" v-for="(img, index) in images" :key="index" @click="handlePreview(index)">
              <image :src="img" mode="aspectFill" />
            </view>
          </view>
          <m-image-preview
            v-model:show="show1"
            :images="images"
            :start-position="currentIndex"
          />
        </view>
      </demo-block>

      <demo-block title="函数式调用" desc="使用 useImagePreview hook 调用">
        <view class="demo-image-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handlePreviewHook">打开预览</m-button></view>
        </view>
        <m-image-preview selector="hook" />
      </demo-block>

      <demo-block title="关闭按钮位置" desc="closeIconPosition 可选值 top-left / top-right">
        <view class="demo-image-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenLeft">左上角</m-button></view>
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenRight">右上角</m-button></view>
        </view>
        <m-image-preview selector="position" />
      </demo-block>

      <demo-block title="隐藏页码" desc="设置 showIndex 为 false">
        <view class="demo-image-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenNoIndex">打开预览</m-button></view>
        </view>
        <m-image-preview selector="noindex" />
      </demo-block>

      <demo-block title="禁用循环播放" desc="设置 loop 为 false">
        <view class="demo-image-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenNoLoop">打开预览</m-button></view>
        </view>
        <m-image-preview selector="noloop" />
      </demo-block>

      <demo-block title="禁用点击关闭" desc="设置 closeOnClick 为 false">
        <view class="demo-image-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenNoClose">打开预览</m-button></view>
        </view>
        <m-image-preview selector="noclose" />
      </demo-block>

      <demo-block title="自定义插槽" desc="使用 slot 自定义关闭按钮和指示器">
        <view class="demo-image-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenSlot">打开预览</m-button></view>
        </view>
        <m-image-preview v-model:show="showSlot" :images="images">
          <template #close="{ close }">
            <view class="demo-image-preview__close-slot" @click.stop="close">
              <text>关闭</text>
            </view>
          </template>
          <template #indicator="{ total, current }">
            <view class="demo-image-preview__index-slot">
              <text>{{ current + 1 }} / {{ total }}</text>
            </view>
          </template>
        </m-image-preview>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useImagePreview } from '../../packages/m-image-preview/index'

const images = [
  '/static/img/img_1.jpg',
  '/static/img/img_2.jpg',
  '/static/img/img_3.jpg',
  '/static/img/img_4.jpg',
  '/static/img/img_5.jpg',
  '/static/img/img_6.jpg',
]

const show1 = ref(false)
const currentIndex = ref(0)
const showSlot = ref(false)

function handlePreview(index: number) {
  currentIndex.value = index
  show1.value = true
}

const { previewImage: previewHook } = useImagePreview('hook')
function handlePreviewHook() {
  previewHook(images)
}

const { previewImage: previewLeft } = useImagePreview('position')
function handleOpenLeft() {
  previewLeft({ images, closeIconPosition: 'top-left' })
}

function handleOpenRight() {
  previewLeft({ images, closeIconPosition: 'top-right' })
}

const { previewImage: previewNoIndex } = useImagePreview('noindex')
function handleOpenNoIndex() {
  previewNoIndex({ images, showIndex: false })
}

const { previewImage: previewNoLoop } = useImagePreview('noloop')
function handleOpenNoLoop() {
  previewNoLoop({ images, loop: false })
}

const { previewImage: previewNoClose } = useImagePreview('noclose')
function handleOpenNoClose() {
  previewNoClose({ images, closeOnClick: false })
}

function handleOpenSlot() {
  showSlot.value = true
}
</script>

<style lang="scss" scoped>
.page {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-content {
  padding-bottom: 40rpx;
}

.demo-image-preview-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  align-items: center;
}

.demo-image-preview-list {
  display: flex;
  gap: 20rpx;
  flex-wrap: wrap;
}

.demo-image-preview-item {
  width: 160rpx;
  height: 160rpx;
  border-radius: 8rpx;
  overflow: hidden;

  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}



.demo-image-preview__close-slot {
  position: absolute;
  top: 40rpx;
  right: 40rpx;
  padding: 20rpx 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8rpx;
  color: #fff;
  font-size: 28rpx;
  z-index: 10;
}

.demo-image-preview__index-slot {
  position: absolute;
  top: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  padding: 20rpx 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8rpx;
  color: #fff;
  font-size: 28rpx;
  z-index: 10;
}
</style>