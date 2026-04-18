<template>
  <view class="m-layout-demo">
    <view class="m-layout-demo__container">
      <!-- 基本用法 -->
      <m-demo-block title="基本用法" desc="基础的 24 分栏布局，通过 span 属性设置占位格数">
        <view class="demo-layout-row">
          <m-row>
            <m-col :span="24" class="demo-layout-col">
              <view class="demo-layout-col__content">span=24</view>
            </m-col>
          </m-row>
        </view>
        <view class="demo-layout-row">
          <m-row>
            <m-col :span="12" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--odd">span=12</view>
            </m-col>
            <m-col :span="12" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--even">span=12</view>
            </m-col>
          </m-row>
        </view>
        <view class="demo-layout-row">
          <m-row>
            <m-col :span="8" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--odd">span=8</view>
            </m-col>
            <m-col :span="8" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--even">span=8</view>
            </m-col>
            <m-col :span="8" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--odd">span=8</view>
            </m-col>
          </m-row>
        </view>
        <view class="demo-layout-row">
          <m-row>
            <m-col :span="6" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--odd">span=6</view>
            </m-col>
            <m-col :span="6" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--even">span=6</view>
            </m-col>
            <m-col :span="6" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--odd">span=6</view>
            </m-col>
            <m-col :span="6" class="demo-layout-col">
              <view class="demo-layout-col__content demo-layout-col__content--even">span=6</view>
            </m-col>
          </m-row>
        </view>
      </m-demo-block>

      <!-- 分栏偏移 -->
      <m-demo-block title="分栏偏移" desc="使用 offset 属性设置左侧偏移格数">
        <view class="demo-layout-row">
          <m-row>
            <m-col :span="4" class="demo-layout-col">
              <view class="demo-layout-col__content">span=4</view>
            </m-col>
            <m-col :span="12" :offset="4" class="demo-layout-col">
              <view class="demo-layout-col__content">span=12 offset=4</view>
            </m-col>
          </m-row>
        </view>
        <view class="demo-layout-row">
          <m-row>
            <m-col :span="12" :offset="8" class="demo-layout-col">
              <view class="demo-layout-col__content">span=12 offset=8</view>
            </m-col>
          </m-row>
        </view>
        <view class="demo-layout-row">
          <m-row>
            <m-col :span="8" :offset="4" class="demo-layout-col">
              <view class="demo-layout-col__content">span=8 offset=4</view>
            </m-col>
            <m-col :span="8" :offset="4" class="demo-layout-col">
              <view class="demo-layout-col__content">span=8 offset=4</view>
            </m-col>
          </m-row>
        </view>
      </m-demo-block>

      <!-- 分栏间隔 -->
      <m-demo-block title="分栏间隔" desc="使用 gutter 属性设置列之间的间距">
        <view class="demo-layout-row-title demo-layout-row-title--first">gutter=16</view>
        <m-row :gutter="16" class="demo-layout-row--gutter">
          <m-col :span="8" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--primary">span=8</view>
          </m-col>
          <m-col :span="8" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--primary">span=8</view>
          </m-col>
          <m-col :span="8" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--primary">span=8</view>
          </m-col>
        </m-row>
        <view class="demo-layout-row-title">gutter=32</view>
        <m-row :gutter="32" class="demo-layout-row--gutter">
          <m-col :span="8" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--primary">span=8</view>
          </m-col>
          <m-col :span="8" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--primary">span=8</view>
          </m-col>
          <m-col :span="8" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--primary">span=8</view>
          </m-col>
        </m-row>
      </m-demo-block>

      <!-- 对齐方式 -->
      <m-demo-block title="对齐方式" desc="使用 justify 和 align 属性设置主轴和交叉轴对齐方式">
        <view class="demo-layout-row-title">默认（start + top）</view>
        <m-row class="demo-layout-row--gutter">
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--even">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content">span=4</view>
          </m-col>
        </m-row>
        <view class="demo-layout-row-title">justify=center</view>
        <m-row justify="center" class="demo-layout-row--justify">
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--even">span=4</view>
          </m-col>
        </m-row>
        <view class="demo-layout-row-title">justify=end</view>
        <m-row justify="end" class="demo-layout-row--justify">
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--even">span=4</view>
          </m-col>
        </m-row>
        <view class="demo-layout-row-title">justify=space-between</view>
        <m-row justify="space-between" class="demo-layout-row--justify">
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--even">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content">span=4</view>
          </m-col>
        </m-row>
        <view class="demo-layout-row-title">align=middle</view>
        <m-row align="middle" class="demo-layout-row--justify">
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--tall">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--even">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--tall">span=4</view>
          </m-col>
        </m-row>
        <view class="demo-layout-row-title">align=bottom</view>
        <m-row align="bottom" class="demo-layout-row--justify">
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--tall">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--even">span=4</view>
          </m-col>
          <m-col :span="4" class="demo-layout-col">
            <view class="demo-layout-col__content demo-layout-col__content--tall">span=4</view>
          </m-col>
        </m-row>
      </m-demo-block>
    </view>
  </view>
</template>

<script setup>
import MRow from '@/packages/row/index.js'
import MCol from '@/packages/col/index.js'
</script>

<style lang="scss">
.m-layout-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-layout-row {
  margin-bottom: 16px;

  &--gutter {
    margin-top: 8px;
  }

  &--justify {
    margin-top: 16px;
    padding: 8px 0;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
}

.demo-layout-row-title {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;

  &--first {
    margin-top: 0;
  }
}

.demo-layout-col {
  &__content {
    background-color: #4D80F0;
    color: white;
    text-align: center;
    padding: 10px 8px;
    font-size: 14px;
    border-radius: 8px;
    // min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--odd {
      background-color: #4D80F0;
    }

    &--even {
      background-color: #6E9EF5;
    }

    &--primary {
      background-color: #4D80F0;
    }

    &--success {
      background-color: #34d19d;
    }

    &--tall {
      min-height: 80px;
    }
  }
}
</style>