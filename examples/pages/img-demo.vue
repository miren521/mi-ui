<template>
  <view class="page">
    <view class="page__content">
      <!-- 基本用法 -->
      <demo-block title="基本用法" desc="图片的默认样式">
        <view class="demo-img-row">
          <m-img 
            src="/static/img/img_1.jpg"
            width="200"
            height="200"
          />
        </view>
      </demo-block>

      <!-- 不同填充模式 -->
      <demo-block title="不同填充模式" desc="通过 mode 属性设置图片的填充模式">
        <view class="demo-img-grid">
          <view class="demo-img-item">
            <m-img 
              src="/static/img/img_1.jpg"
              width="150"
              height="100"
              mode="scaleToFill"
            />
            <text class="demo-img-label">scaleToFill</text>
          </view>
          <view class="demo-img-item">
            <m-img 
              src="/static/img/img_4.jpg"
              width="150"
              height="100"
              mode="aspectFit"
            />
            <text class="demo-img-label">aspectFit</text>
          </view>
          <view class="demo-img-item">
            <m-img 
              src="/static/img/img_2.jpg"
              width="150"
              height="100"
              mode="aspectFill"
            />
            <text class="demo-img-label">aspectFill</text>
          </view>
          <view class="demo-img-item">
            <m-img 
              src="/static/img/img_3.jpg"
              width="150"
              mode="widthFix"
            />
            <text class="demo-img-label">widthFix</text>
          </view>
        </view>
      </demo-block>

      <!-- 圆形图片 -->
      <demo-block title="圆形图片" desc="使用 round 属性创建圆形图片">
        <view class="demo-img-row">
          <m-img 
            src="/static/img/img_3.jpg"
            width="150"
            height="150"
            round
          />
        </view>
      </demo-block>

      <!-- 自定义圆角 -->
      <demo-block title="自定义圆角" desc="通过 radius 属性设置图片的圆角大小">
        <view class="demo-img-row">
          <m-img 
            src="/static/img/img_4.jpg"
            width="200"
            height="150"
            radius="20"
            mode="widthFix"
          />
        </view>
      </demo-block>

      <!-- 图片预览 -->
      <demo-block title="图片预览" desc="使用 enable-preview 属性开启图片预览功能">
        <view class="demo-img-row">
          <m-img 
            src="/static/img/img_1.jpg"
            width="200"
            height="150"
            mode="aspectFill"
            enable-preview
          />
          <text class="demo-img-hint">点击图片预览</text>
        </view>
      </demo-block>

      <!-- 懒加载 -->
      <demo-block title="懒加载" desc="使用 lazy-load 属性开启图片懒加载">
        <view class="demo-img-row">
          <m-img 
            src="/static/img/img_5.jpg"
            width="200"
            height="150"
            lazy-load
            mode="aspectFill"
          />
        </view>
      </demo-block>

      <!-- 错误状态 -->
      <demo-block title="错误状态" desc="图片加载失败时的显示效果">
        <view class="demo-img-row">
          <m-img 
            src=""
            width="200"
            height="150"
          />
        </view>
      </demo-block>

      <!-- 自定义加载和错误状态 -->
      <demo-block title="自定义加载和错误状态" desc="使用插槽自定义加载和错误状态的显示内容">
        <view class="demo-img-row">
          <m-img 
            src=""
            width="200"
            height="150"
            mode="aspectFill"
          >
            <template #loading>
              <view class="custom-loading">
                <text class="custom-loading-text">加载中...</text>
              </view>
            </template>
          </m-img>

          <m-img 
            src="xxx"
            width="200"
            height="150"
            mode="aspectFill"
          >
            <template #error>
              <view class="custom-error">
                <text class="custom-error-text">加载失败</text>
              </view>
            </template>
          </m-img>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
// 导入组件
import mImg from '../../packages/m-img/m-img.vue'
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background-color: #f5f5f5;

  &__header {
    padding: 32rpx;
    background-color: #fff;
    text-align: center;
    border-bottom: 1rpx solid #e8e8e8;

    &__title {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
    }
  }

  &__content {
    padding: 32rpx;
  }
}

.demo-img-row {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.demo-img-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.demo-img-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.demo-img-label {
  font-size: 24rpx;
  color: #666;
  text-align: center;
}

.demo-img-hint {
  font-size: 24rpx;
  color: #999;
}

.custom-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.custom-loading-text {
  font-size: 24rpx;
  color: #999;
}

.custom-error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.custom-error-text {
  font-size: 24rpx;
  color: #ff4d4f;
}
</style>
