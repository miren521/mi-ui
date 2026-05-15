<template>
  <view class="m-popover-demo">
    <view class="m-popover-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="点击触发元素显示气泡卡片">
        <view class="m-popover-demo__row">
          <m-popover content="这是一段提示文字">
            <m-button type="primary">点击显示</m-button>
          </m-popover>
        </view>
      </demo-block>

      <!-- 弹出位置 -->
      <demo-block title="弹出位置" desc="设置 placement 属性改变气泡弹出位置">
        <view class="m-popover-demo__row">
          <view class="m-popover-demo__placement">
            <m-popover content="顶部" placement="top">
              <m-button size="small">上</m-button>
            </m-popover>
          </view>
          <view class="m-popover-demo__placement">
            <m-popover content="底部" placement="bottom">
              <m-button size="small">下</m-button>
            </m-popover>
          </view>
          <view class="m-popover-demo__placement">
            <m-popover content="左侧" placement="left">
              <m-button size="small">左</m-button>
            </m-popover>
          </view>
          <view class="m-popover-demo__placement">
            <m-popover content="右侧" placement="right">
              <m-button size="small">右</m-button>
            </m-popover>
          </view>
        </view>
      </demo-block>

      <!-- 带箭头 -->
      <demo-block title="带箭头" desc="设置 visibleArrow 为 true 显示箭头，默认为 true">
        <view class="m-popover-demo__row">
          <m-popover content="带箭头的气泡" :visibleArrow="true">
            <m-button type="primary">带箭头</m-button>
          </m-popover>
          <m-popover content="不带箭头的气泡" :visibleArrow="false">
            <m-button>不带箭头</m-button>
          </m-popover>
        </view>
      </demo-block>

      <!-- 列表模式 -->
      <demo-block title="列表模式" desc="设置 mode 为 menu 使用列表模式，content 为数组">
        <view class="m-popover-demo__row">
          <m-popover :content="menuItems" mode="menu" @menuclick="handleMenuClick">
            <m-button type="primary">菜单模式</m-button>
          </m-popover>
        </view>
      </demo-block>

      <!-- 自定义内容 -->
      <demo-block title="自定义内容" desc="使用 content 插槽自定义气泡内容">
        <view class="m-popover-demo__row">
          <m-popover>
            <m-button type="primary">自定义内容</m-button>
            <template #content>
              <view class="m-popover-demo__custom-content">
                <text class="m-popover-demo__title">自定义标题</text>
                <text class="m-popover-demo__desc">这是自定义的气泡内容，可以包含任意元素</text>
                <m-button size="small" type="primary" @click="handleCustomClick">确认</m-button>
              </view>
            </template>
          </m-popover>
        </view>
      </demo-block>

      <!-- 禁用状态 -->
      <demo-block title="禁用状态" desc="设置 disabled 属性禁用气泡">
        <view class="m-popover-demo__row">
          <m-popover content="禁用状态" :disabled="true">
            <m-button disabled>禁用状态</m-button>
          </m-popover>
        </view>
      </demo-block>

      <!-- 显示关闭按钮 -->
      <demo-block title="显示关闭按钮" desc="设置 showClose 属性显示关闭按钮">
        <view class="m-popover-demo__row">
          <m-popover content="可关闭的气泡" :showClose="true">
            <m-button type="primary">显示关闭按钮</m-button>
          </m-popover>
        </view>
      </demo-block>

      <!-- 手动控制 -->
      <demo-block title="手动控制" desc="使用 v-model 手动控制气泡显示">
        <view class="m-popover-demo__row">
          <m-popover v-model="visible" content="手动控制显示">
            <m-button type="primary">点击显示</m-button>
          </m-popover>
          <m-button @click="visible = !visible">{{ visible ? '关闭' : '打开' }}</m-button>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const menuItems = [
  { content: '选项一', iconClass: 'star' },
  { content: '选项二', iconClass: 'heart' },
  { content: '选项三', iconClass: 'settings' },
  { content: '选项四', iconClass: 'share-alt' }
]

function handleMenuClick(event: { item: Record<string, any>; index: number }) {
  uni.showToast({
    title: `点击了 ${event.item.content}`,
    icon: 'none'
  })
}

function handleCustomClick() {
  uni.showToast({
    title: '点击了确认按钮',
    icon: 'none'
  })
}
</script>

<style lang="scss">
.m-popover-demo {
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
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__placement {
    flex: 1;
    min-width: 80px;
    text-align: center;
  }

  &__custom-content {
    padding: 16px;
    text-align: left;
    min-width: 150px;
    box-sizing: border-box;

    .m-popover-demo__title {
      font-weight: bold;
      font-size: 16px;
      color: #333;
      display: block;
      margin-bottom: 8px;
    }

    .m-popover-demo__desc {
      font-size: 14px;
      color: #666;
      display: block;
      margin-bottom: 12px;
      line-height: 1.5;
    }
  }
}
</style>