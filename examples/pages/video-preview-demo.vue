<template>
  <view class="page">
    <view class="page-content">
      <demo-block title="基础用法" desc="点击按钮打开视频预览">
        <view class="demo-video-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpen">打开视频预览</m-button></view>
        </view>
        <m-video-preview selector="basic" />
      </demo-block>

      <demo-block title="带封面和标题" desc="传入 poster 封面和 title 标题">
        <view class="demo-video-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenWithPoster">打开预览(带封面)</m-button></view>
        </view>
        <m-video-preview selector="poster" />
      </demo-block>

      <demo-block title="函数式调用" desc="使用 useVideoPreview hook 调用">
        <view class="demo-video-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenHook">hook 调用</m-button></view>
        </view>
        <m-video-preview selector="hook" />
      </demo-block>

      <demo-block title="事件监听" desc="监听 open 和 close 事件">
        <view class="demo-video-preview-row">
          <view><m-button type="success" class="fit-content-btn" @click="handleOpenEvents">打开预览(监听事件)</m-button></view>
        </view>
        <m-video-preview 
          selector="events" 
          @open="handleOpenEvent" 
          @close="handleCloseEvent" 
        />
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useVideoPreview } from '../../packages/m-video-preview/index'

const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'
// const posterUrl = 'https://picsum.photos/id/1/320/180'
const posterUrl = '/static/img/img_1.jpg'
const videoTitle = '示例视频'

const { previewVideo: previewBasic, closeVideoPreview: closeBasic } = useVideoPreview('basic')
function handleOpen() {
  previewBasic({ url: videoUrl })
}

const { previewVideo: previewPoster } = useVideoPreview('poster')
function handleOpenWithPoster() {
  previewPoster({ url: videoUrl, poster: posterUrl, title: videoTitle })
}

const { previewVideo: previewHook, closeVideoPreview: closeHook } = useVideoPreview('hook')
function handleOpenHook() {
  previewHook({ url: videoUrl, poster: posterUrl, title: videoTitle })
}

const { previewVideo: previewEvents } = useVideoPreview('events')
function handleOpenEvents() {
  previewEvents({ url: videoUrl })
}

function handleOpenEvent() {
  console.log('视频预览打开了')
}

function handleCloseEvent() {
  console.log('视频预览关闭了')
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-content {
  padding-bottom: 40rpx;
}

.demo-video-preview-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  align-items: center;
}
</style>