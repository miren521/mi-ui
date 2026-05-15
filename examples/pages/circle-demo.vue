<template>
  <view class="m-circle-demo">
    <view class="m-circle-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="设置 modelValue 属性表示进度百分比，默认显示百分比文字">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="30" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="70" />
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="设置 color 属性自定义进度条颜色，文字颜色随之变化">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" color="#ff6b6b" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" color="#4ecdc4" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" color="#45b7d1" />
        </view>
      </demo-block>

      <!-- 渐变色 -->
      <demo-block title="渐变色" desc="设置 color 为对象实现渐变效果，文字使用灰色">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" :color="{ '0': '#ff6b6b', '100': '#4ecdc4' }" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="70" :color="{ '0': '#667eea', '50': '#764ba2', '100': '#f093fb' }" />
        </view>
      </demo-block>

      <!-- 自定义宽度 -->
      <demo-block title="自定义宽度" desc="设置 strokeWidth 属性调整进度条宽度">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" :strokeWidth="6" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" :strokeWidth="14" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" :strokeWidth="22" />
        </view>
      </demo-block>

      <!-- 自定义大小 -->
      <demo-block title="自定义大小" desc="设置 size 属性调整圆环大小">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" :size="80" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="60" :size="120" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="70" :size="160" />
        </view>
      </demo-block>

      <!-- 自定义文字 -->
      <demo-block title="自定义文字" desc="设置 text 属性显示自定义文字，适合展示状态">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="30" text="进行中" color="#ff6b6b" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" text="一半了" color="#4ecdc4" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="100" text="已完成" color="#9a8dc4" />
        </view>
      </demo-block>

      <!-- 文字颜色 -->
      <demo-block title="文字颜色" desc="文字颜色与进度条颜色保持一致">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="30" color="#999" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="60" color="#e6a23c" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="100" color="#67c23a" />
        </view>
      </demo-block>

      <!-- 插槽内容 -->
      <demo-block title="插槽内容" desc="使用默认插槽自定义复杂内容">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="75">
            <view class="m-circle-demo__slot-content">
              <text class="m-circle-demo__slot-percent">75%</text>
              <text class="m-circle-demo__slot-label">存储空间</text>
            </view>
          </m-circle>
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="90" color="#4ecdc4">
            <view class="m-circle-demo__slot-content">
              <text class="m-circle-demo__slot-percent">90%</text>
              <text class="m-circle-demo__slot-label">电量充足</text>
            </view>
          </m-circle>
        </view>
      </demo-block>

      <!-- 动态改变 -->
      <demo-block title="动态改变" desc="点击按钮动态改变进度，带动画效果">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="dynamicValue" />
        </view>
        <view class="m-circle-demo__row m-circle-demo__btn-row">
          <m-button type="primary" @click="dynamicValue = 30">30%</m-button>
          <m-button type="primary" @click="dynamicValue = 50">50%</m-button>
          <m-button type="primary" @click="dynamicValue = 70">70%</m-button>
          <m-button type="primary" @click="dynamicValue = 100">100%</m-button>
        </view>
      </demo-block>

      <!-- 逆时针 -->
      <demo-block title="逆时针" desc="设置 clockwise 为 false 实现逆时针增加">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="30" :clockwise="false" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" :clockwise="false" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="70" :clockwise="false" />
        </view>
      </demo-block>

      <!-- 端点形状 -->
      <demo-block title="端点形状" desc="设置 strokeLinecap 属性调整端点形状">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" strokeLinecap="butt" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" strokeLinecap="round" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" strokeLinecap="square" />
        </view>
      </demo-block>

      <!-- 填充 -->
      <demo-block title="填充" desc="设置 fill 属性填充圆环内部区域">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="30" fill="#e6f7ff" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="50" fill="#f6ffed" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="70" fill="#fff7e6" />
        </view>
      </demo-block>

      <!-- 动画速度 -->
      <demo-block title="动画速度" desc="设置 speed 属性调整动画速度（rate/s）">
        <view class="m-circle-demo__row">
          <m-circle :modelValue="80" :speed="10" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="80" :speed="50" />
        </view>
        <view class="m-circle-demo__row">
          <m-circle :modelValue="80" :speed="200" />
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicValue = ref(30)
</script>

<style lang="scss">
.m-circle-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    gap: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__btn-row {
    gap: 12px;
  }

  &__slot-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__slot-percent {
    font-size: 28px;
    font-weight: 600;
    line-height: 1.2;
  }

  &__slot-label {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }
}
</style>