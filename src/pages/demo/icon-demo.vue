<template>
  <view class="m-icon-demo">
    <view class="m-icon-demo__container">

      <m-demo-block title="图标搜索" desc="搜索图标">
        <view class="demo-search-box">
          <m-icon name="search" size="20px" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #999;" />
          <input 
            v-model="searchText" 
            type="text" 
            placeholder="搜索图标名称" 
            class="demo-search-input"
          />
        </view>
      </m-demo-block>

      <m-demo-block title="图标列表" desc="网格展示所有图标">
        <view class="demo-icon-grid">
          <view class="demo-icon-grid__item" v-for="icon in filteredIcons" :key="icon" @click="copyIconCode(icon)">
            <m-icon :name="icon" size="22px" />
            <text class="demo-icon-grid__name">{{ icon }}</text>
          </view>
        </view>
      </m-demo-block>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import MIcon from '../../../packages/icon/index.js'
import MDemoBlock from '../../../src/components/m-demo-block/index.js'

const searchText = ref('')

const iconList = [
  'check',
  'refresh',
  'phone',
  'filter',
  'thin-arrow-left',
  'more',
  'delete',
  'search',
  'close',
  'translate-bold',
  'scan',
  'add',
  'delete-thin',
  'chat',
  'keywords',
  'transfer',
  'camera',
  'warning',
  'video',
  'note',
  'list',
  'lenovo',
  'goods',
  'evaluation',
  'picture',
  'eye-close',
  'view',
  'clock',
  'computer',
  'phone-compute',
  'download',
  'spool',
  'jdm',
  'decrease',
  'bags',
  'copy',
  'add-circle',
  'edit-outline',
  'dong',
  'fill-arrow-down',
  'read',
  'detection',
  'subscribe',
  'wifi-error',
  'check-outline',
  'close-bold',
  'close-outline',
  'warn-bold',
  'error-fill',
  'check-bold',
  'star-on',
  'fill-camera',
  'arrow-left',
  'arrow-up',
  'arrow-down',
  'arrow-right',
  'setting',
  'rotate',
  'arrow-thin-down',
  'arrow-thin-up',
  'keyboard-delete',
  'keyboard-collapse',
  'usergroup-clear',
  'user-circle',
  'user-talk',
  'user-clear',
  'user',
  'usergroup-add',
  'usergroup',
  'user-add',
  'user-avatar',
  'pointing-hand',
  'cursor',
  'fullsreen',
  'cloud-download',
  'chevron-down-rectangle',
  'edit',
  'fullscreen-exit',
  'circle1',
  'close-normal',
  'browse',
  'browse-off',
  'chevron-up-rectangle',
  'add-rectangle',
  'add1',
  'add-circle1',
  'download1',
  'link',
  'edit-1',
  'jump',
  'chevron-down-circle',
  'delete1',
  'filter-clear',
  'check-rectangle-filled',
  'minus-circle-filled',
  'play',
  'pause-circle-filled',
  'filter1',
  'move',
  'login',
  'minus-circle',
  'close-circle',
  'logout',
  'search1',
  'pause-circle',
  'play-circle',
  'more1',
  'minus-rectangle',
  'stop',
  'scan1',
  'close-rectangle',
  'rollback',
  'a-order-adjustmentcolumn',
  'pause',
  'ellipsis',
  'cloud-upload',
  'stop-circle-filled',
  'clear',
  'remove',
  'zoom-out',
  'thumb-down',
  'setting1',
  'save',
  'unfold-more',
  'zoom-in',
  'thumb-up',
  'unfold-less',
  'play-circle-filled',
  'poweroff',
  'share',
  'refresh1',
  'link-unlink',
  'upload',
  'rectangle',
  'stop-circle',
  'backtop-rectangle',
  'caret-down',
  'arrow-left1',
  'help-circle',
  'help-circle-filled',
  'time-filled',
  'close-circle-filled',
  'info-circle',
  'info-circle-filled',
  'check1',
  'help',
  'error',
  'check-circle',
  'error-circle-filled',
  'error-circle',
  'check-rectangle',
  'check-circle-filled',
  'chevron-up',
  'chevron-up-circle',
  'chevron-right',
  'arrow-down-rectangle',
  'caret-up-small',
  'chevron-right-rectangle',
  'caret-right-small',
  'arrow-right1',
  'backtop',
  'arrow-up1',
  'caret-up',
  'backward',
  'arrow-down1',
  'chevron-left',
  'caret-right',
  'caret-left',
  'page-last',
  'next',
  'swap',
  'round',
  'previous',
  'enter',
  'chevron-down',
  'caret-down-small',
  'swap-right',
  'chevron-left-circle',
  'caret-left-small',
  'chevron-right-circle',
  'a-chevron-leftdouble',
  'chevron-left-rectangle',
  'a-chevron-rightdouble',
  'page-first',
  'forward',
  'view-column',
  'view-module',
  'format-vertical-align-right',
  'view-list',
  'order-descending',
  'format-horizontal-align-bottom',
  'queue',
  'menu-fold',
  'menu-unfold',
  'format-horizontal-align-top',
  'a-rootlist',
  'order-ascending',
  'format-vertical-align-left',
  'format-horizontal-align-center',
  'format-vertical-align-center',
  'swap-left',
  'flag',
  'code',
  'cart',
  'attach',
  'chart',
  'creditcard',
  'calendar',
  'app',
  'books',
  'barcode',
  'chart-pie',
  'chart-bar',
  'chart-bubble',
  'bulletpoint',
  'bianjiliebiao',
  'image',
  'laptop',
  'hourglass',
  'call',
  'mobile-vibrate',
  'mail',
  'notification-filled',
  'desktop',
  'history',
  'discount-filled',
  'dashboard',
  'discount',
  'heart-filled',
  'chat1',
  'a-controlplatform',
  'gift',
  'photo',
  'play-circle-stroke',
  'notification',
  'cloud',
  'gender-female',
  'fork',
  'layers',
  'lock-off',
  'location',
  'mobile',
  'qrcode',
  'home1',
  'time',
  'heart',
  'lock-on',
  'print',
  'slash',
  'usb',
  'tools',
  'wifi',
  'star-filled',
  'server',
  'sound',
  'a-precisemonitor',
  'service',
  'tips',
  'pin',
  'secured',
  'star',
  'gender-male',
  'shop',
  'money-circle',
  'file-word',
  'file-unknown',
  'folder-open',
  'file-pdf',
  'folder',
  'folder-add',
  'file',
  'file-image',
  'file-powerpoint',
  'file-add',
  'file-icon',
  'file-paste',
  'file-excel',
  'file-copy',
  'video1',
  'wallet',
  'ie',
  'logo-codepen',
  'github-filled',
  'ie-filled',
  'apple',
  'windows-filled',
  'internet',
  'github',
  'windows',
  'apple-filled',
  'chrome-filled',
  'chrome',
  'android',
  'circle',
  'home'
]

const filteredIcons = computed(() => {
  if (!searchText.value) {
    return iconList
  }
  const searchLower = searchText.value.toLowerCase()
  return iconList.filter(icon => icon.toLowerCase().includes(searchLower))
})

function copyIconCode(icon) {
  const code = `<m-icon name="${icon}" size="22px" />`
  if (uni.setClipboardData) {
    uni.setClipboardData({
      data: code,
      success: function() {
        uni.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function() {
        uni.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
  } else {
    uni.showToast({
      title: '当前环境不支持复制',
      icon: 'none',
      duration: 1500
    })
  }
}
</script>

<style lang="scss">
.m-icon-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-icon-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.demo-search-box {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.demo-search-input {
  width: 100%;
  height: 40px;
  padding: 0 40px 0 36px;
  border: 1px solid #e8e9ea;
  border-radius: 20px;
  font-size: 14px;
  background-color: #f8f9fa;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #4D80F0;
    box-shadow: 0 0 0 2px rgba(77, 128, 240, 0.1);
  }
}

.demo-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 8px;
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background-color: #e8e9ea;
      transform: translateY(-2px);
    }

    &:active {
      background-color: #d8d9da;
      transform: translateY(0);
    }
  }

  &__name {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .demo-icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 12px;

    &__item {
      padding: 12px 4px;
    }

    &__name {
      font-size: 10px;
    }
  }
}
</style>