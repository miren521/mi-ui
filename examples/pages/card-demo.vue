<template>
  <view class="page">
    <view class="page-content">
      <!-- 基本用法 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card>
            这是一张基本卡片，包含默认的内容区域。
          </m-card>
        </view>
      </view>

      <!-- 自定义内容样式 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card custom-content-class="custom-content-blue">
            这是一张使用自定义内容样式的卡片。
          </m-card>
        </view>
      </view>

      <!-- 带标题的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="带标题的卡片">
            这是一张带标题的卡片，默认显示标题下方的横线。
          </m-card>
        </view>
      </view>

      <!-- 带描述的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="带描述的卡片" desc="这是卡片的描述信息，用于展示更多详细内容">
            这是一张带描述的卡片，描述显示在标题下方。
          </m-card>
        </view>
      </view>

      <!-- 带右侧内容的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="带右侧内容的卡片" extra="2026-04-26">
            这是一张带右侧内容的卡片，右侧显示了日期信息。
          </m-card>
        </view>
      </view>

      <!-- 带描述和右侧内容的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="完整卡片" desc="这是一张包含标题、描述和右侧内容的完整卡片" extra="更多" @click:extra="handleExtraClick">
            这是一张完整的卡片，包含了标题、描述和右侧内容。
          </m-card>
        </view>
      </view>

      <!-- 带底部插槽的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="卡片标题">
            <template #default>
              这是一张带底部插槽的卡片，可以放置操作按钮等内容。
            </template>
            <template #footer>
              <view class="demo-card-footer">
                <text class="demo-card-action">操作1</text>
                <text class="demo-card-action demo-card-action--primary">操作2</text>
              </view>
            </template>
          </m-card>
        </view>
      </view>

      <!-- 自定义标题插槽 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card>
            <template #title>
              <view class="demo-card-title-custom">
                <m-icon name="star" color="#faad14" />
                <text>自定义标题</text>
              </view>
            </template>
            <template #default>
              这是一张使用自定义标题插槽的卡片，可以在标题区域添加图标等元素。
            </template>
          </m-card>
        </view>
      </view>

      <!-- 通栏卡片 -->
      <view class="card-section">
        <view class="demo-card-row demo-card-row--full">
          <m-card type="rectangle" title="通栏卡片">
            这是一张通栏卡片，没有边距和圆角，适合作为页面的标题栏或底部栏。
          </m-card>
        </view>
      </view>

      <!-- 不同样式的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="无边距卡片" custom-class="demo-card-no-margin">
            这是一张没有水平边距的卡片，适合在容器内使用。
          </m-card>
        </view>
        <view class="demo-card-row">
          <m-card title="无阴影卡片" custom-class="demo-card-no-shadow">
            这是一张没有阴影的卡片，适合在已有背景的场景中使用。
          </m-card>
        </view>
      </view>

      <!-- 自定义背景颜色的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="蓝色背景" :bg-color="'#e6f7ff'">
            这是一张蓝色背景的卡片。
          </m-card>
        </view>
      </view>

      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="黄色背景" :bg-color="'#fffbe6'">
            这是一张黄色背景的卡片。
          </m-card>
        </view>
      </view>

      <!-- 带图片的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="带图片的卡片">
            <template #header>
              <image
                src="/static//img//img_3.jpg" 
                class="card-image"
                height="160"
                mode="aspectFill"
              />
            </template>
            <template #default>
              <text class="demo-card-text">
                这是一张带图片的卡片，展示了美丽的山水风景。
              </text>
            </template>
            <template #footer>
              <view class="demo-card-footer">
                <text class="demo-card-action">查看详情</text>
              </view>
            </template>
          </m-card>
        </view>
      </view>

      <!-- 带列表的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="个人信息">
            <template #default>
              <view class="demo-card-list">
                <view class="demo-card-list-item">
                  <text class="demo-card-list-label">姓名</text>
                  <text class="demo-card-list-value">张三</text>
                </view>
                <view class="demo-card-list-item">
                  <text class="demo-card-list-label">年龄</text>
                  <text class="demo-card-list-value">28</text>
                </view>
                <view class="demo-card-list-item">
                  <text class="demo-card-list-label">职业</text>
                  <text class="demo-card-list-value">产品经理</text>
                </view>
                <view class="demo-card-list-item">
                  <text class="demo-card-list-label">邮箱</text>
                  <text class="demo-card-list-value">zhangsan@example.com</text>
                </view>
              </view>
            </template>
          </m-card>
        </view>
      </view>

      <!-- 带状态的卡片 -->
      <view class="card-section">
        <view class="demo-card-row">
          <m-card title="订单状态">
            <template #default>
              <view class="demo-card-status">
                <view class="demo-card-status-item">
                  <text class="demo-card-status-label">订单号</text>
                  <text class="demo-card-status-value">202604250001</text>
                </view>
                <view class="demo-card-status-item">
                  <text class="demo-card-status-label">下单时间</text>
                  <text class="demo-card-status-value">2026-04-25 10:30:00</text>
                </view>
                <view class="demo-card-status-item">
                  <text class="demo-card-status-label">订单金额</text>
                  <text class="demo-card-status-value demo-card-status-value--primary">¥99.00</text>
                </view>
                <view class="demo-card-status-item">
                  <text class="demo-card-status-label">订单状态</text>
                  <text class="demo-card-status-value demo-card-status-value--success">已支付</text>
                </view>
              </view>
            </template>
          </m-card>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import mIcon from '../../packages/m-icon/m-icon.vue'
import mBadge from '../../packages/m-badge/m-badge.vue'

const handleExtraClick = () => {
  uni.showToast({
    title: '点击了右侧内容',
    icon: 'none'
  })
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background-color: #f5f6fa;
}

.page-header {
  padding: 60rpx 32rpx;
  text-align: center;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.page-title {
  display: block;
  font-size: 56rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8rpx;
}

.page-subtitle {
  display: block;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
}

.page-content {
  padding: 24rpx;
}

.card-section {
  margin-bottom: 40rpx;
}

.card-section-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
  padding-left: 16rpx;
  border-left: 4rpx solid #1890ff;
  line-height: 1.2;
}

.demo-card-row {
  margin-bottom: 24rpx;

  &--full {
    margin: 0 -24rpx 24rpx -24rpx;
    padding: 0;
  }
}

.demo-card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24rpx;
  width: 100%;

  .demo-card-action--full {
    flex: 1;
    text-align: center;
    padding: 12rpx 0;
    border-radius: 8rpx;
    background-color: #1890ff;
    color: #fff !important;
  }
}

.demo-card-action {
  font-size: 24rpx;
  color: #666;

  &--primary {
    color: #1890ff;
  }
}

.demo-card-title-custom {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.custom-title-red {
  color: #f5222d !important;
  font-weight: 600;
}

// 使用样式穿透
::v-deep .custom-content-blue {
  color: #1890ff !important;
}

.demo-card-image-container {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.demo-card-image {
  width: 100%;
  height: 300rpx;
  object-fit: cover;
  border-radius: 8rpx;
}

.demo-card-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.demo-card-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.demo-card-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.demo-card-list-label {
  font-size: 26rpx;
  color: #666;
}

.demo-card-list-value {
  font-size: 26rpx;
  color: #333;
}

.demo-card-form {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.demo-card-form-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.demo-card-form-label {
  font-size: 24rpx;
  color: #666;
}

.demo-card-form-input {
  width: 100%;
  height: 64rpx;
  padding: 0 16rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  font-size: 26rpx;
  box-sizing: border-box;
}

.demo-card-status {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.demo-card-status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.demo-card-status-label {
  font-size: 26rpx;
  color: #666;
}

.demo-card-status-value {
  font-size: 26rpx;
  color: #333;

  &--primary {
    color: #1890ff;
    font-weight: 600;
  }

  &--success {
    color: #52c41a;
    font-weight: 600;
  }
}

.demo-card-icon-content {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
}

.demo-card-icon-text {
  flex: 1;
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.demo-card-no-margin {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.demo-card-no-shadow {
  box-shadow: none !important;
  border: 1rpx solid #e0e0e0;
}

.demo-card-custom-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.demo-card-custom-image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.demo-card-custom-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
}

.demo-card-custom-image-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}

.card-image {
  width: 100%;
  height: 280rpx;
  object-fit: cover;
}
</style>