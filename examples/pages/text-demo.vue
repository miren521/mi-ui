<template>
  <view class="m-text-demo">
    <view class="m-text-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="不同尺寸的文本">
        <view class="demo-text-row">
          <m-text text="产品标题" size="32rpx" />
          <m-text text="¥299.00" size="28rpx" />
          <m-text text="商品描述" size="24rpx" />
        </view>
      </demo-block>

      <!-- 颜色 -->
      <demo-block title="颜色" desc="不同主题颜色的文本">
        <view class="demo-text-row">
          <m-text text="普通提示：请填写完整信息" type="default" />
          <m-text text="主要信息：点击查看详情" type="primary" />
          <m-text text="成功提示：操作已完成" type="success" />
          <m-text text="警告提示：请检查输入" type="warning" />
          <m-text text="错误提示：网络连接失败" type="error" />
        </view>
      </demo-block>

      <!-- 粗细 -->
      <demo-block title="粗细" desc="加粗文本">
        <view class="demo-text-row">
          <m-text text="Vue 3 组合式 API 最佳实践" :bold="true" />
          <m-text text="本文介绍 Vue 3 组合式 API 的核心概念和使用方法..." />
        </view>
      </demo-block>

      <!-- 对齐方式 -->
      <demo-block title="对齐方式" desc="不同对齐方式的文本">
        <view class="demo-text-align">
          <m-text text="在现代前端开发中，组件化已经成为主流趋势。通过将 UI 拆分为独立的组件，可以提高代码的可维护性和复用性。" custom-class="text-left" />
          <m-text text="前端开发最佳实践" custom-class="text-center" />
          <m-text text="— 技术文档" custom-class="text-right" />
        </view>
      </demo-block>

      <!-- 行数限制 -->
      <demo-block title="行数限制" desc="超出文本将被省略">
        <view class="demo-text-lines">
          <m-text text="iPhone 15 Pro 采用钛金属设计，搭载 A17 Pro 芯片，支持 USB-C 接口，拥有更强大的相机系统和更长的电池续航。" :lines="1" />
          <m-text text="这是一款高性能笔记本电脑，配备最新的处理器和独立显卡，适合专业设计和游戏使用。机身轻薄，续航持久，是商务人士和学生的理想选择。" :lines="2" />
          <m-text text="全新智能手表采用 AMOLED 屏幕，支持心率监测、血氧检测和睡眠追踪等健康功能，还可以接收通知和进行移动支付。防水设计，适合各种运动场景。" :lines="3" />
        </view>
      </demo-block>

      <!-- 自定义样式 -->
      <demo-block title="自定义样式" desc="使用 custom-class 和 custom-style">
        <view class="demo-text-row">
          <m-text text="限时优惠" :color="'#ff6b6b'" />
          <m-text text="大标题" size="36rpx" />
          <m-text text="点击查看详情" decoration="underline" />
          <m-text text="原价 ¥599" decoration="line-through" />
        </view>
      </demo-block>

      <!-- 格式化 -->
      <demo-block title="格式化" desc="不同模式的文本格式化">
        <view class="demo-text-format">
          <m-text text="13812345678" mode="phone" :format="true" />
          <m-text text="李小明" mode="name" :format="true" />
          <m-text text="987654" mode="price" />
          <m-text text="1713704646000" mode="date" />
        </view>
      </demo-block>

      <!-- 前后缀 -->
      <demo-block title="前后缀" desc="添加前后缀内容">
        <view class="demo-text-row">
          <m-text text="199" prefix="¥" suffix=".00" />
          <m-text text="85" prefix="" suffix="分" />
        </view>
      </demo-block>

      <!-- 插槽 -->
      <demo-block title="插槽" desc="使用 prefix 和 suffix 插槽">
        <view class="demo-text-row">
          <m-text text="收藏">
            <template #prefix>
              <m-icon name="star" size="32rpx" color="#f0c14b" />
            </template>
          </m-text>
          <m-text text="更多选项">
            <template #suffix>
              <m-icon name="arrow-right" size="32rpx" color="#999" />
            </template>
          </m-text>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style lang="scss" scoped>
.m-text-demo {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx 0;

  &__container {
    max-width: 1200rpx;
    margin: 0 auto;
    padding: 0 32rpx;
  }
}

.demo-text-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  align-items: center;
  margin-bottom: 24rpx;
}

.demo-text-align {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.demo-text-lines {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 24rpx;
  width: 100%;
  max-width: 600rpx;
}

.demo-text-format {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  align-items: center;
  margin-bottom: 24rpx;
}
</style>