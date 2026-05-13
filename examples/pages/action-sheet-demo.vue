<template>
  <view class="m-action-sheet-demo">
    <view class="m-action-sheet-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="展示最基础的上拉菜单用法">
        <view class="demo-action-sheet-row">
          <m-button type="primary" @click="showBasicActionSheet">基础操作</m-button>
        </view>
        <m-action-sheet v-model="showBasic" :actions="basicActions" cancel-text="取消" />
      </demo-block>

      <!-- 带标题 -->
      <demo-block title="带标题" desc="通过 title 属性设置标题">
        <view class="demo-action-sheet-row">
          <m-button type="primary" @click="showTitleActionSheet">带标题</m-button>
        </view>
        <m-action-sheet v-model="showTitle" title="请选择操作" :actions="basicActions" cancel-text="取消" />
      </demo-block>

      <!-- 带描述 -->
      <demo-block title="带描述" desc="通过 description 属性添加二级描述">
        <view class="demo-action-sheet-row">
          <m-button type="primary" @click="showDescActionSheet">带描述</m-button>
        </view>
        <m-action-sheet v-model="showDesc" :actions="descActions" cancel-text="取消" />
      </demo-block>

      <!-- 禁用选项 -->
      <demo-block title="禁用选项" desc="通过 disabled 属性禁用选项">
        <view class="demo-action-sheet-row">
          <m-button type="primary" @click="showDisabledActionSheet">禁用选项</m-button>
        </view>
        <m-action-sheet v-model="showDisabled" :actions="disabledActions" cancel-text="取消" />
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="通过 color 属性自定义选项颜色">
        <view class="demo-action-sheet-row">
          <m-button type="primary" @click="showColorActionSheet">自定义颜色</m-button>
        </view>
        <m-action-sheet v-model="showColor" :actions="colorActions" cancel-text="取消" />
      </demo-block>


      <!-- 宫格面板 -->
      <demo-block title="宫格面板" desc="通过 panels 属性展示宫格选项">
        <view class="demo-action-sheet-row">
          <m-button type="primary" @click="showPanelActionSheet">宫格面板</m-button>
        </view>
        <m-action-sheet v-model="showPanel" :panels="panelData" cancel-text="取消" />
      </demo-block>

      <!-- 加载状态 -->
      <demo-block title="加载状态" desc="通过 loading 属性展示加载状态">
        <view class="demo-action-sheet-row">
          <m-button type="primary" @click="showLoadingActionSheet">加载状态</m-button>
        </view>
        <m-action-sheet v-model="showLoading" :actions="loadingActions" cancel-text="取消" />
      </demo-block>

      <!-- 真实场景 -->
      <demo-block title="真实场景" desc="展示退出登录、分享、删除等常见场景">
        <view class="demo-action-sheet-card">
          <view class="demo-action-sheet-card__item">
            <view class="demo-action-sheet-card__icon">
              <m-icon name="user" :size="24" />
            </view>
            <view class="demo-action-sheet-card__content">
              <view class="demo-action-sheet-card__title">退出登录</view>
              <view class="demo-action-sheet-card__desc">安全退出当前账号</view>
            </view>
            <m-button type="primary" size="small" @click="showLogoutActionSheet">操作</m-button>
          </view>

          <view class="demo-action-sheet-card__item">
            <view class="demo-action-sheet-card__icon demo-action-sheet-card__icon--share">
              <m-icon name="share" :size="24" />
            </view>
            <view class="demo-action-sheet-card__content">
              <view class="demo-action-sheet-card__title">分享内容</view>
              <view class="demo-action-sheet-card__desc">将内容分享给好友</view>
            </view>
            <m-button type="success" size="small" @click="showShareActionSheet">分享</m-button>
          </view>

          <view class="demo-action-sheet-card__item">
            <view class="demo-action-sheet-card__icon demo-action-sheet-card__icon--delete">
              <m-icon name="delete" :size="24" />
            </view>
            <view class="demo-action-sheet-card__content">
              <view class="demo-action-sheet-card__title">删除记录</view>
              <view class="demo-action-sheet-card__desc">删除后无法恢复</view>
            </view>
            <m-button type="danger" size="small" @click="showDeleteActionSheet">删除</m-button>
          </view>
        </view>

        <!-- 退出登录 -->
        <m-action-sheet v-model="showLogout" title="确认退出登录" :actions="logoutActions" cancel-text="取消" />

        <!-- 分享 -->
        <m-action-sheet v-model="showShare" title="分享到" :actions="shareActions" cancel-text="取消" />

        <!-- 删除 -->
        <m-action-sheet v-model="showDelete" title="确认删除" :actions="deleteActions" :cancel-text="''" />
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mActionSheet from '../../packages/m-action-sheet/m-action-sheet.vue'
import type { Action, Panel } from '../../packages/m-action-sheet/types'

const showBasic = ref(false)
const showTitle = ref(false)
const showDesc = ref(false)
const showDisabled = ref(false)
const showColor = ref(false)
const showPanel = ref(false)
const showLoading = ref(false)
const showLogout = ref(false)
const showShare = ref(false)
const showDelete = ref(false)

const basicActions: Action[] = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' }
]

const descActions: Action[] = [
  { name: '保存图片', description: '将图片保存到相册' },
  { name: '分享图片', description: '分享给好友' },
  { name: '删除图片', description: '删除后无法恢复' }
]

const disabledActions: Action[] = [
  { name: '可用选项' },
  { name: '禁用选项', disabled: true },
  { name: '另一个可用选项' }
]

const colorActions: Action[] = [
  { name: '普通选项' },
  { name: '主要选项', color: '#1989fa' },
  { name: '危险选项', color: '#ee0a24' }
]

const panelData: Panel[] = [
  { icon: 'user', title: '好友' },
  { icon: 'qrcode', title: '二维码' },
  { icon: 'save', title: '保存' },
  { icon: 'delete', title: '删除' },
  { icon: 'copy', title: '复制' }
]

const loadingActions: Action[] = [
  { name: '正常选项' },
  { name: '加载中', loading: true },
  { name: '另一个选项' }
]

const logoutActions: Action[] = [
  { name: '退出登录', color: '#ee0a24', }
]

const shareActions: Action[] = [
  { name: '微信好友', description: '分享给微信好友' },
  { name: '微信朋友圈', description: '分享到朋友圈' },
  { name: 'QQ好友', description: '分享给QQ好友' },
  { name: '复制链接', description: '复制链接到剪贴板' }
]

const deleteActions: Action[] = [
  { name: '删除', color: '#ee0a24', description: '删除后无法恢复' },
  { name: '取消' }
]

function showBasicActionSheet() {
  showBasic.value = true
}

function showTitleActionSheet() {
  showTitle.value = true
}

function showDescActionSheet() {
  showDesc.value = true
}

function showDisabledActionSheet() {
  showDisabled.value = true
}

function showColorActionSheet() {
  showColor.value = true
}

function showPanelActionSheet() {
  showPanel.value = true
}

function showLoadingActionSheet() {
  showLoading.value = true
}

function showLogoutActionSheet() {
  showLogout.value = true
}

function showShareActionSheet() {
  showShare.value = true
}

function showDeleteActionSheet() {
  showDelete.value = true
}
</script>

<style lang="scss">
.m-action-sheet-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-action-sheet-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
}

.demo-action-sheet-card {
  background: white;
  border-radius: 12px;
  padding: 6px;

  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 0;

    &:not(:last-child) {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #e6f7ff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1890ff;

    &--share {
      background: #f6ffed;
      color: #52c41a;
    }

    &--delete {
      background: #fff2f0;
      color: #ff4d4f;
    }
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
  }

  &__desc {
    font-size: 14px;
    color: #999;
  }
}
</style>