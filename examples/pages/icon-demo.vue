<template>
  <view class="m-icon-demo">
    <view class="m-icon-demo__container">

      <demo-block title="图标搜索" desc="搜索图标">
        <view class="demo-search-box">
          <m-icon name="search" size="20px" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #999;" />
          <input 
            v-model="searchText" 
            type="text" 
            placeholder="搜索图标名称" 
            class="demo-search-input"
          />
        </view>
      </demo-block>

      <demo-block title="图标列表" desc="网格展示所有图标">
        <view class="demo-icon-grid">
          <view class="demo-icon-grid__item" v-for="icon in filteredIcons" :key="icon" @click="copyIconCode(icon)">
            <m-icon :name="icon" size="22px" />
            <text class="demo-icon-grid__name">{{ icon }}</text>
          </view>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchText = ref('')

const iconList = [
  'expand',
  'del',
  'multiple-horizontal',
  'left',
  'left-circle',
  'down-circle',
  'caret-down',
  'double-left',
  'caret-right',
  'double-right',
  'double-down',
  'down',
  'arrow-right',
  'caret-left',
  'arrow-down',
  'arrow-left',
  'up',
  'arrow-rise',
  'double-up',
  'to-right',
  'up-circle',
  'sort-fill',
  'to-top',
  'to-left',
  'menu-fold',
  'swap',
  'drag-arrow',
  'sort-fill-1',
  'to-bottom',
  'caret-up',
  'rotate-left',
  'arrow-up',
  'arrow-fall',
  'right',
  'menu-unfold',
  'rotate-right',
  'shrink',
  'right-circle',
  'bold',
  'filter-fill',
  'deleteall',
  'brush',
  'font-colors',
  'edit',
  'filter',
  'find-replace',
  'eraser',
  'copy',
  'delete',
  'circular',
  'bg-colors',
  'align-right',
  'align-center',
  'align-left',
  'unordered-list',
  'undo',
  'zoom-out',
  'sort-ascending',
  'scissor',
  'quote',
  'sort-descending',
  'link',
  'ordered-list',
  'h3',
  'h4',
  'italic',
  'redo',
  'highlight',
  'original-size',
  'h1',
  'h5',
  'oblique-line',
  'line-height',
  'h7',
  'h2',
  'apps',
  'application',
  'no-wifi',
  'no-result',
  'no-product',
  'no-message',
  'no-content',
  'no-comment',
  'no-collection',
  'failpayment',
  'formula',
  'zoom-in',
  'sort',
  'textarea',
  'paste',
  'h6',
  'number',
  'underline',
  'strikethrough',
  'drag-dot',
  'dice',
  'drive-file',
  'email',
  'drag-dot-vertical',
  'compass',
  'dashboard',
  'common',
  'desktop',
  'copyright',
  'cloud',
  'company',
  'command',
  'camera',
  'camera-fill',
  'branch',
  'calendar-line',
  'bug',
  'bulb',
  'book',
  'archive',
  'gift',
  'image-failloading',
  'interaction',
  'image-close',
  'Fire',
  'image',
  'idcard',
  'folder-add',
  'face-frown-fill',
  'folder',
  'folder-delete',
  'file-video',
  'file',
  'file-pdf',
  'experiment',
  'file-audio',
  'face-meh-fill',
  'file-image',
  'empty',
  'face-smile-fill',
  'ear',
  'mobile',
  'lock',
  'mind-mapping',
  'location',
  'loop',
  'language',
  'locate',
  'keyboard',
  'loading',
  'layout',
  'phone',
  'printer',
  'pen-fill',
  'organization',
  'notification-close',
  'old-version',
  'moon',
  'notification',
  'nav',
  'mosaic',
  'man',
  'moon-fill',
  'menu',
  'tags',
  'tag',
  'thunderbolt',
  'sun',
  'store',
  'sun-fill',
  'subscribed',
  'stamp',
  'subscribe',
  'skin',
  'storage',
  'subscribe-add',
  'shake',
  'safe',
  'public',
  'pen',
  'robot',
  'robot-add',
  'pushpin',
  'qrcode',
  'eye-fill',
  'code',
  'code-square',
  'Export',
  'download',
  'clock-circle-fill',
  'code-block',
  'cloud-download',
  'buble-circle-fill',
  'barcode',
  'at',
  'wifi',
  'tool',
  'woman',
  'video-camera',
  'user',
  'user-group',
  'time-line',
  'trophy',
  'user-add',
  'unlock',
  'refresh',
  'more',
  'more-vertical',
  'mic',
  'module-fill',
  'mfill',
  'message',
  'message-banned',
  'lightning-circle-fill',
  'import',
  'list',
  'Launch',
  'home',
  'home-fill',
  'heart',
  'history',
  'headset',
  'heart-fill',
  'headset-off',
  'headset-fill',
  'headset-off-fill',
  'eye',
  'eye-invisible',
  'eye-invisible-fill',
  'live-broadcast',
  'fullscreen',
  'fullscreen-exit',
  'forward',
  'backward',
  'voice',
  'upload',
  'translate',
  'thumb-up',
  'sync',
  'thumb-down',
  'thumb-up-fill',
  'star',
  'thumb-down-fill',
  'share-internal',
  'star-fill',
  'share-external',
  'settings',
  'share-alt',
  'send',
  'select-all',
  'poweroff',
  'search-line',
  'save',
  'scan',
  'reply',
  'check-half-square-fill',
  'check-circle',
  'check-circle-radio-fill',
  'check-circle-fill',
  'sound',
  'skip-next-fill',
  'sound-fill',
  'skip-previous',
  'skip-previous-fill',
  'skip-next',
  'record-stop',
  'record',
  'play-circle',
  'play-circle-fill',
  'play-arrow',
  'play-arrow-fill',
  'pause-circle',
  'pause',
  'mute-fill',
  'pause-circle-fill',
  'music',
  'mute',
  'page-fill',
  'minus-square',
  'minus-square-3px',
  'minus-circle',
  'minus-circle-fill',
  'info',
  'info-circle',
  'info-circle-fill',
  'exclamation',
  'exclamation-polygon-fill',
  'exclamation-circle',
  'exclamation-circle-fill',
  'doublecheck',
  'close',
  'division',
  'close-circle',
  'close-circle-fill',
  'clock-circle',
  'check',
  'check-square',
  'check-square-fill',
  'uncheck-square',
  'stop',
  'uncheck-circle',
  'question-circle',
  'question',
  'question-circle-fill',
  'plus-square-3px',
  'plus',
  'plus-square',
  'plus-circle',
  'plus-circle-fill',
  'minus'
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