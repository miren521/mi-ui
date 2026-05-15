<template>
  <view class="m-notify-demo">
    <view class="m-notify-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="调用 showNotify 方法显示通知提示">
        <view class="m-notify-demo__btn-row">
          <m-button type="primary" size="small" @click="showBasicNotify">显示通知</m-button>
        </view>
      </demo-block>

      <!-- 通知类型 -->
      <demo-block title="通知类型" desc="支持四种类型：danger、primary、success、warning">
        <view class="m-notify-demo__btn-row">
          <m-button type="primary" size="small" @click="showNotifyByType('danger')">danger</m-button>
          <m-button type="primary" size="small" @click="showNotifyByType('primary')">primary</m-button>
          <m-button type="primary" size="small" @click="showNotifyByType('success')">success</m-button>
          <m-button type="primary" size="small" @click="showNotifyByType('warning')">warning</m-button>
        </view>
      </demo-block>

      <!-- 自定义位置 -->
      <demo-block title="自定义位置" desc="设置 position 属性，支持顶部和底部显示">
        <view class="m-notify-demo__btn-row">
          <m-button type="primary" size="small" @click="showNotifyAtPosition('top')">顶部显示</m-button>
          <m-button type="primary" size="small" @click="showNotifyAtPosition('bottom')">底部显示</m-button>
        </view>
      </demo-block>

      <!-- 自定义时长 -->
      <demo-block title="自定义时长" desc="设置 duration 属性控制显示时长，0 表示不自动关闭">
        <view class="m-notify-demo__btn-row">
          <m-button type="primary" size="small" @click="showNotifyWithDuration(1000)">1秒</m-button>
          <m-button type="primary" size="small" @click="showNotifyWithDuration(5000)">5秒</m-button>
          <m-button type="primary" size="small" @click="showNotifyWithDuration(0)">不自动关闭</m-button>
          <m-button type="info" size="small" @click="closeNotify">关闭通知</m-button>
        </view>
      </demo-block>

      <!-- 浮动形态 -->
      <demo-block title="浮动形态" desc="设置 variant='floating' 显示浮动样式">
        <view class="m-notify-demo__btn-row">
          <m-button type="primary" size="small" @click="showFloatingNotify">浮动样式</m-button>
          <m-button type="primary" size="small" @click="showFloatingNotifyWithIcon">带图标浮动</m-button>
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="设置 color 和 background 属性自定义颜色">
        <view class="m-notify-demo__btn-row">
          <m-button type="primary" size="small" @click="showCustomColorNotify">自定义颜色</m-button>
          <m-button type="primary" size="small" @click="showCustomBgNotify">自定义背景</m-button>
        </view>
      </demo-block>

      <!-- 可关闭 -->
      <demo-block title="可关闭" desc="设置 closable 属性显示关闭按钮">
        <view class="m-notify-demo__btn-row">
          <m-button type="primary" size="small" @click="showClosableNotify">显示关闭按钮</m-button>
        </view>
      </demo-block>

      <!-- 多行文本 -->
      <demo-block title="多行文本" desc="message 支持通过 \n 换行显示多行文本">
        <view class="m-notify-demo__btn-row">
          <m-button type="primary" size="small" @click="showMultiLineNotify">多行文本</m-button>
        </view>
      </demo-block>
    </view>

    <m-notify selector="demo" />
  </view>
</template>

<script setup lang="ts">
import { useNotify } from '../../packages/m-notify'

const { showNotify, closeNotify } = useNotify('demo')

function showBasicNotify() {
  showNotify('这是一条通知消息')
}

function showNotifyByType(type: 'danger' | 'primary' | 'success' | 'warning') {
  const messages: Record<string, string> = {
    danger: '操作失败，请重试',
    primary: '操作成功',
    success: '提交成功',
    warning: '请注意查看'
  }
  showNotify({ type, message: messages[type] })
}

function showNotifyAtPosition(position: 'top' | 'bottom') {
  showNotify({ message: `在${position === 'top' ? '顶部' : '底部'}显示`, position })
}

function showNotifyWithDuration(duration: number) {
  showNotify({ message: duration === 0 ? '点击关闭按钮或下方按钮关闭' : `显示${duration / 1000}秒`, duration })
}

function showFloatingNotify() {
  showNotify({ message: '浮动样式通知', variant: 'floating' })
}

function showFloatingNotifyWithIcon() {
  showNotify({ type: 'success', message: '操作成功', variant: 'floating' })
}

function showCustomColorNotify() {
  showNotify({ message: '自定义文字颜色', color: '#ffe066' })
}

function showCustomBgNotify() {
  showNotify({ message: '自定义背景颜色', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' })
}

function showClosableNotify() {
  showNotify({ message: '点击右侧按钮关闭', closable: true, duration: 0 })
}

function showMultiLineNotify() {
  showNotify({ message: '第一行文本\n第二行文本\n第三行文本' })
}
</script>

<style lang="scss">
.m-notify-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__btn-row {
    display: flex;
    justify-content: flex-start;
    gap: 12px;
    flex-wrap: wrap;
  }
}
</style>