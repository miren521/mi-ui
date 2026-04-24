<template>
  <view class="page">
    <view class="page__content">
      <!-- 基本用法 -->
      <demo-block title="基本用法" desc="头像的默认样式，支持图片、文本和图标">
        <view class="demo-avatar-row">
          <m-avatar shape="round" src="/static/img/img_1.jpg" />
          <m-avatar shape="round" text="张"></m-avatar>
          <m-avatar shape="round" icon="user"></m-avatar>
        </view>
      </demo-block>

      <!-- 不同尺寸 -->
      <demo-block title="不同尺寸" desc="通过 size 属性设置头像的尺寸">
        <view class="demo-avatar-row">
          <m-avatar shape="round" size="large" src="/static/img/img_1.jpg">
          </m-avatar>
          <m-avatar shape="round" size="medium" src="/static/img/img_1.jpg">
          </m-avatar>
          <m-avatar shape="round" size="normal" src="/static/img/img_1.jpg">
          </m-avatar>
          <m-avatar shape="round" size="small" src="/static/img/img_1.jpg">
          </m-avatar>
          <m-avatar shape="round" size="40" src="/static/img/img_1.jpg">
          </m-avatar>
        </view>
      </demo-block>

      <!-- 不同形状 -->
      <demo-block title="不同形状" desc="通过 shape 属性设置头像的形状">
        <view class="demo-avatar-row">
          <m-avatar shape="round" src="/static/img/img_1.jpg">
          </m-avatar>
          <m-avatar shape="square" src="/static/img/img_1.jpg">
          </m-avatar>
        </view>
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="通过 color 和 bg-color 属性自定义头像颜色">
        <view class="demo-avatar-row">
          <m-avatar shape="round" text="张" color="#fff" bg-color="#1890ff"></m-avatar>
          <m-avatar shape="round" text="李" color="#fff" bg-color="#52c41a"></m-avatar>
          <m-avatar shape="round" text="王" color="#fff" bg-color="#faad14"></m-avatar>
          <m-avatar shape="round" text="赵" color="#fff" bg-color="#ff4d4f"></m-avatar>
        </view>
      </demo-block>

      <!-- 状态徽标 -->
      <demo-block title="状态徽标" desc="通过 status 属性设置头像状态">
        <view class="demo-avatar-row">
          <m-avatar shape="round" src="/static/img/img_1.jpg" status="online">
          </m-avatar>
          <m-avatar shape="round" src="/static/img/img_1.jpg" status="offline">
          </m-avatar>
          <m-avatar shape="round" src="/static/img/img_1.jpg" status="busy">
          </m-avatar>
          <m-avatar shape="round" src="/static/img/img_1.jpg" status="vip">
          </m-avatar>
        </view>
      </demo-block>

      <!-- 状态位置 -->
      <demo-block title="状态位置" desc="通过 status-position 属性设置状态徽标的位置">
        <view class="demo-avatar-row">
          <m-avatar shape="round" src="/static/img/img_1.jpg" status="online" status-position="top-right">
          </m-avatar>
          <m-avatar shape="round" src="/static/img/img_1.jpg" status="online" status-position="bottom-right">
          </m-avatar>
        </view>
      </demo-block>

      <!-- 自定义状态图标 -->
      <demo-block title="自定义状态图标" desc="使用 status-icon 插槽自定义状态图标">
        <view class="demo-avatar-row">
          <m-avatar shape="round" src="/static/img/img_1.jpg">
            <template #status-icon>
              <view class="custom-status-icon">
                <text class="custom-status-text">V</text>
              </view>
            </template>
          </m-avatar>
        </view>
      </demo-block>

      <!-- 头像组 -->
      <demo-block title="头像组" desc="使用 m-avatar-group 展示多个头像">
        <view class="demo-avatar-group">
          <m-avatar-group>
            <m-avatar shape="round" src="/static/img/img_1.jpg">
            </m-avatar>
            <m-avatar shape="round" src="/static/img/img_2.jpg">
            </m-avatar>
            <m-avatar shape="round" src="/static/img/img_3.jpg">
            </m-avatar>
            <m-avatar shape="round" src="/static/img/img_4.jpg">
            </m-avatar>
          </m-avatar-group>
        </view>
      </demo-block>

      <!-- 头像组最大数量 -->
      <demo-block title="头像组最大数量" desc="通过 max-count 属性设置最大显示数量">
        <view class="demo-avatar-group">
          <m-avatar-group :max-count="3">
            <m-avatar shape="round" src="/static/img/img_1.jpg" />
            <m-avatar shape="round" src="/static/img/img_2.jpg" />
            <m-avatar shape="round" src="/static/img/img_3.jpg" />
            <m-avatar shape="round" src="/static/img/img_4.jpg" />
            <m-avatar shape="round" src="/static/img/img_5.jpg" />
          </m-avatar-group>
        </view>
      </demo-block>

      <!-- 头像组层叠方向 -->
      <demo-block title="头像组层叠方向" desc="通过 cascading 属性设置层叠方向">
        <view class="demo-avatar-group-row">
          <view class="demo-avatar-group-item">
            <view class="demo-avatar-group-label">左侧在上</view>
            <m-avatar-group cascading="left-up">
              <m-avatar shape="round" src="/static/img/img_1.jpg">
              </m-avatar>
              <m-avatar shape="round" src="/static/img/img_2.jpg">
              </m-avatar>
              <m-avatar shape="round" src="/static/img/img_3.jpg">
              </m-avatar>
            </m-avatar-group>
          </view>
          <view class="demo-avatar-group-item">
            <view class="demo-avatar-group-label">右侧在上</view>
            <m-avatar-group cascading="right-up">
              <m-avatar shape="round" src="/static/img/img_1.jpg">
              </m-avatar>
              <m-avatar shape="round" src="/static/img/img_2.jpg">
              </m-avatar>
              <m-avatar shape="round" src="/static/img/img_3.jpg">
              </m-avatar>
            </m-avatar-group>
          </view>
        </view>
      </demo-block>

      <!-- 垂直头像组 -->
      <demo-block title="垂直头像组" desc="使用 vertical 属性创建垂直头像组">
        <view class="demo-avatar-group-row">
          <view class="demo-avatar-group-item">
            <view class="demo-avatar-group-label">左侧在上</view>
            <m-avatar-group cascading="left-up" vertical>
              <m-avatar shape="round" src="/static/img/img_1.jpg">
              </m-avatar>
              <m-avatar shape="round" src="/static/img/img_2.jpg">
              </m-avatar>
              <m-avatar shape="round" src="/static/img/img_3.jpg">
              </m-avatar>
            </m-avatar-group>
          </view>
          <view class="demo-avatar-group-item">
            <view class="demo-avatar-group-label">右侧在上</view>
            <m-avatar-group cascading="right-up" vertical>
              <m-avatar shape="round" src="/static/img/img_1.jpg">
              </m-avatar>
              <m-avatar shape="round" src="/static/img/img_2.jpg">
              </m-avatar>
              <m-avatar shape="round" src="/static/img/img_3.jpg">
              </m-avatar>
            </m-avatar-group>
          </view>
        </view>
      </demo-block>

      <!-- 头像与徽标组合 -->
      <demo-block title="头像与徽标组合" desc="头像与徽章组件的组合使用">
        <view class="demo-avatar-row">
          <m-badge value="8">
            <m-avatar shape="round" src="/static/img/img_1.jpg">
            </m-avatar>
          </m-badge>
          <m-badge value="128">
            <m-avatar shape="round" src="/static/img/img_2.jpg">
            </m-avatar>
          </m-badge>
          <m-badge value="0" show-zero>
            <m-avatar shape="round" src="/static/img/img_3.jpg">
            </m-avatar>
          </m-badge>
          <m-badge is-dot>
            <m-avatar shape="round" src="/static/img/img_4.jpg">
            </m-avatar>
          </m-badge>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
// 导入组件
import mAvatar from '../../packages/m-avatar/m-avatar.vue'
import mAvatarGroup from '../../packages/m-avatar-group/m-avatar-group.vue'
import mBadge from '../../packages/m-badge/m-badge.vue'
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

.demo-avatar-row {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.demo-avatar-group {
  margin-bottom: 24rpx;
}

.demo-avatar-group-row {
  display: flex;
  gap: 48rpx;
  margin-bottom: 24rpx;
}

.demo-avatar-group-item {
  display: flex;
  flex-direction: column;
  gap: 16rpx;

  &-label {
    font-size: 28rpx;
    color: #666;
  }
}

.custom-status-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #faad14;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-status-text {
  font-size: 8px;
  color: #fff;
  font-weight: bold;
}
</style>
