<template>
  <view class="m-tag-demo">
    <view class="m-tag-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="标签的默认样式，支持多种类型">
        <view class="demo-tag-row">
          <m-tag>默认</m-tag>
          <m-tag type="primary">主要</m-tag>
          <m-tag type="success">成功</m-tag>
          <m-tag type="warning">警告</m-tag>
          <m-tag type="danger">危险</m-tag>
        </view>
      </demo-block>

      <!-- 更多颜色 -->
      <demo-block title="更多颜色" desc="提供更多颜色选项，满足不同场景需求">
        <view class="demo-tag-row">
          <m-tag type="volcano">火山</m-tag>
          <m-tag type="lightblue">天蓝</m-tag>
          <m-tag type="cyan">青色</m-tag>
          <m-tag type="pink">粉色</m-tag>
          <m-tag type="purple">紫色</m-tag>
        </view>
      </demo-block>

      <!-- 浅色模式 -->
      <demo-block title="浅色模式" desc="使用 variant='light' 属性开启浅色模式">
        <view class="demo-tag-row">
          <m-tag variant="light">默认</m-tag>
          <m-tag type="primary" variant="light">主要</m-tag>
          <m-tag type="success" variant="light">成功</m-tag>
          <m-tag type="warning" variant="light">警告</m-tag>
          <m-tag type="danger" variant="light">危险</m-tag>
        </view>
      </demo-block>

      <!-- 朴素模式 -->
      <demo-block title="朴素模式" desc="使用 variant='plain' 属性开启朴素模式">
        <view class="demo-tag-row">
          <m-tag variant="plain">默认</m-tag>
          <m-tag type="primary" variant="plain">主要</m-tag>
          <m-tag type="success" variant="plain">成功</m-tag>
          <m-tag type="warning" variant="plain">警告</m-tag>
          <m-tag type="danger" variant="plain">危险</m-tag>
        </view>
      </demo-block>

      <!-- 虚线模式 -->
      <demo-block title="虚线模式" desc="使用 variant='dashed' 属性开启虚线模式">
        <view class="demo-tag-row">
          <m-tag variant="dashed">默认</m-tag>
          <m-tag type="primary" variant="dashed">主要</m-tag>
          <m-tag type="success" variant="dashed">成功</m-tag>
          <m-tag type="warning" variant="dashed">警告</m-tag>
          <m-tag type="danger" variant="dashed">危险</m-tag>
        </view>
      </demo-block>

      <!-- 文字模式 -->
      <demo-block title="文字模式" desc="使用 variant='text' 属性开启文字模式">
        <view class="demo-tag-row">
          <m-tag variant="text">默认</m-tag>
          <m-tag type="primary" variant="text">主要</m-tag>
          <m-tag type="success" variant="text">成功</m-tag>
          <m-tag type="warning" variant="text">警告</m-tag>
          <m-tag type="danger" variant="text">危险</m-tag>
        </view>
      </demo-block>

      <!-- 圆角标签 -->
      <demo-block title="圆角标签" desc="使用 round 属性开启圆角样式">
        <view class="demo-tag-row">
          <m-tag round>默认</m-tag>
          <m-tag type="primary" round>主要</m-tag>
          <m-tag type="success" round>成功</m-tag>
          <m-tag type="warning" round>警告</m-tag>
          <m-tag type="danger" round>危险</m-tag>
        </view>
      </demo-block>

      <!-- 标记标签 -->
      <demo-block title="标记标签" desc="使用 mark 属性开启标记样式">
        <view class="demo-tag-row">
          <m-tag mark>默认</m-tag>
          <m-tag type="primary" mark>主要</m-tag>
          <m-tag type="success" mark>成功</m-tag>
          <m-tag type="warning" mark>警告</m-tag>
          <m-tag type="danger" mark>危险</m-tag>
        </view>
      </demo-block>

      <!-- 标签尺寸 -->
      <demo-block title="标签尺寸" desc="通过 size 属性设置不同尺寸">
        <view class="demo-tag-row">
          <m-tag size="small" type="primary">小尺寸</m-tag>
          <m-tag size="medium" type="primary">中尺寸</m-tag>
          <m-tag size="default" type="primary">默认</m-tag>
          <m-tag size="large" type="primary">大尺寸</m-tag>
          <m-tag size="extra-large" type="primary">超大</m-tag>
        </view>
      </demo-block>

      <!-- 可关闭标签 -->
      <demo-block title="可关闭标签" desc="使用 closable 属性开启标签关闭功能">
        <view class="demo-tag-row">
          <m-tag
            v-for="(tag, index) in closableTags"
            :key="index"
            closable
            round
            @close="handleClose(index)"
          >
            {{ tag }}
          </m-tag>
        </view>
      </demo-block>

      <!-- 带图标 -->
      <demo-block title="带图标" desc="通过 icon 属性为标签添加图标">
        <view class="demo-tag-row">
          <m-tag icon="user" type="primary">用户</m-tag>
          <m-tag icon="star" type="warning">收藏</m-tag>
          <m-tag icon="check" type="success">已完成</m-tag>
          <m-tag icon="warning" type="danger">错误</m-tag>
        </view>
      </demo-block>

      <!-- 动态标签 -->
      <demo-block title="动态标签" desc="使用 dynamic 属性创建可输入的动态标签">
        <view class="demo-tag-row">
          <m-tag
            v-for="(tag, index) in dynamicTags"
            :key="index"
            closable
            round
            @close="handleDynamicClose(index)"
          >
            {{ tag }}
          </m-tag>
          <m-tag dynamic round @confirm="handleConfirm" />
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="通过 bg-color 和 color 属性自定义标签颜色">
        <view class="demo-tag-row">
          <m-tag bg-color="#722ed1" color="#fff">紫色</m-tag>
          <m-tag bg-color="#13c2c2" color="#fff">青色</m-tag>
          <m-tag bg-color="#faad14" color="#fff">黄色</m-tag>
          <m-tag bg-color="#eb2f96" color="#fff">粉色</m-tag>
        </view>
      </demo-block>

    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 可关闭标签
const closableTags = ref(['标签一', '标签二', '标签三'])

// 动态标签
const dynamicTags = ref(['标签一', '标签二'])

// 关闭标签
const handleClose = (index: number) => {
  closableTags.value.splice(index, 1)
}

// 关闭动态标签
const handleDynamicClose = (index: number) => {
  dynamicTags.value.splice(index, 1)
}

// 确认添加标签
const handleConfirm = (event: { value: string }) => {
  if (event.value) {
    dynamicTags.value.push(event.value)
  }
}
</script>

<style lang="scss">
.m-tag-demo {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx 0;

  &__container {
    max-width: 1200rpx;
    margin: 0 auto;
    padding: 0 32rpx;
  }
}

.demo-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  align-items: center;
}
</style>