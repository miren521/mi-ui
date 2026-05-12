<template>
  <view class="m-toast-demo">
    <view class="m-toast-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="展示最基础的 Toast 提示">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showBasicToast">文字提示</m-button>
        </view>
        <m-toast selector="basic" />
      </demo-block>

      <!-- 成功提示 -->
      <demo-block title="成功提示" desc="展示操作成功的 Toast 提示">
        <view class="demo-toast-row">
          <m-button type="success" @click="showSuccessToast">成功提示</m-button>
        </view>
        <m-toast selector="success" />
      </demo-block>

      <!-- 错误提示 -->
      <demo-block title="错误提示" desc="展示操作失败的 Toast 提示">
        <view class="demo-toast-row">
          <m-button type="danger" @click="showErrorToast">错误提示</m-button>
        </view>
        <m-toast selector="error" />
      </demo-block>

      <!-- 警告提示 -->
      <demo-block title="警告提示" desc="展示警告信息的 Toast 提示">
        <view class="demo-toast-row">
          <m-button type="warning" @click="showWarningToast">警告提示</m-button>
        </view>
        <m-toast selector="warning" />
      </demo-block>

      <!-- 信息提示 -->
      <demo-block title="信息提示" desc="展示普通信息的 Toast 提示">
        <view class="demo-toast-row">
          <m-button type="info" @click="showInfoToast">信息提示</m-button>
        </view>
        <m-toast selector="info" />
      </demo-block>

      <!-- 自动关闭的 Loading -->
      <demo-block title="自动关闭 Loading" desc="设置 duration 让 loading 自动关闭">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showAutoLoadingToast">自动关闭</m-button>
        </view>
        <m-toast selector="autoLoading" />
      </demo-block>

      <!-- Loading 图标类型 -->
      <demo-block title="Loading 图标类型" desc="通过 loadingType 属性设置不同的加载图标">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showCircularLoading">圆形</m-button>
          <m-button type="success" @click="showSpinnerLoading">环形</m-button>
          <m-button type="warning" @click="showDotsLoading">点状</m-button>
        </view>
        <m-toast selector="loadingType" />
      </demo-block>

      <!-- 自定义图标 -->
      <demo-block title="自定义图标" desc="通过 iconClass 属性使用自定义图标">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showCustomIconToast">自定义图标</m-button>
          <m-button type="success" @click="showCustomIconToast2">心形图标</m-button>
        </view>
        <m-toast selector="customIcon" />
      </demo-block>

      <!-- 自定义位置 -->
      <demo-block title="自定义位置" desc="通过 position 属性设置 Toast 显示位置">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showTopToast">顶部</m-button>
          <m-button type="success" @click="showMiddleTopToast">中上</m-button>
          <m-button type="warning" @click="showMiddleToast">居中</m-button>
          <m-button type="danger" @click="showBottomToast">底部</m-button>
        </view>
        <m-toast selector="position" />
      </demo-block>

      <!-- 自定义时长 -->
      <demo-block title="自定义时长" desc="通过 duration 属性设置显示时长（毫秒）">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showShortToast">短时间(1秒)</m-button>
          <m-button type="success" @click="showLongToast">长时间(5秒)</m-button>
        </view>
        <m-toast selector="duration" />
      </demo-block>

      <!-- 垂直排列 -->
      <demo-block title="垂直排列" desc="通过 direction 属性设置图标和文字垂直排列">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showVerticalToast">垂直排列</m-button>
        </view>
        <m-toast selector="vertical" />
      </demo-block>

      <!-- 自定义图标大小 -->
      <demo-block title="自定义图标大小" desc="通过 iconSize 属性设置图标大小">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showLargeIconToast">大图标</m-button>
          <m-button type="success" @click="showSmallIconToast">小图标</m-button>
        </view>
        <m-toast selector="iconSize" />
      </demo-block>

      <!-- 回调函数 -->
      <demo-block title="回调函数" desc="展示 opened 和 closed 回调函数">
        <view class="demo-toast-row">
          <m-button type="primary" @click="showCallbackToast">带回调</m-button>
        </view>
        <view class="demo-toast-events">
          <view class="demo-toast-events__title">回调日志：</view>
          <scroll-view scroll-y class="demo-toast-events__list">
            <view v-for="(event, index) in eventLogs" :key="index" class="demo-toast-events__item">
              {{ event }}
            </view>
          </scroll-view>
        </view>
        <m-toast selector="callback" />
      </demo-block>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '../../packages/m-toast/index'

const { show: showBasic, close: closeBasic } = useToast('basic')
const { success: showSuccess } = useToast('success')
const { error: showError } = useToast('error')
const { warning: showWarning } = useToast('warning')
const { info: showInfo } = useToast('info')
const { loading: showLoading, close: closeLoading } = useToast('loading')
const { show: showPosition } = useToast('position')
const { show: showDuration } = useToast('duration')
const { show: showVertical } = useToast('vertical')
const { show: showIconSize } = useToast('iconSize')
const { show: showCallback } = useToast('callback')
const { show: showAutoLoading } = useToast('autoLoading')
const { show: showLoadingType } = useToast('loadingType')
const { show: showCustomIcon } = useToast('customIcon')

const eventLogs = ref([])

function showBasicToast() {
  showBasic('这是一个普通提示')
}

function showSuccessToast() {
  showSuccess('操作成功')
}

function showErrorToast() {
  showError('操作失败')
}

function showWarningToast() {
  showWarning('请注意')
}

function showInfoToast() {
  showInfo('这是一条信息')
}

function showLoadingToast() {
  showLoading('加载中...')
}

function hideLoadingToast() {
  closeLoading()
}

function showAutoLoadingToast() {
  showAutoLoading({
    iconName: 'loading',
    msg: '自动关闭',
    duration: 2000
  })
}

function showCircularLoading() {
  showLoadingType({
    iconName: 'loading',
    msg: '圆形加载',
    loadingType: 'circular',
    duration: 2000
  })
}

function showSpinnerLoading() {
  showLoadingType({
    iconName: 'loading',
    msg: '环形加载',
    loadingType: 'spinner',
    duration: 2000
  })
}

function showDotsLoading() {
  showLoadingType({
    iconName: 'loading',
    msg: '点状加载',
    loadingType: 'dots',
    duration: 2000
  })
}

function showCustomIconToast() {
  showCustomIcon({
    iconClass: 'star',
    msg: '自定义图标',
    iconSize: 30
  })
}

function showCustomIconToast2() {
  showCustomIcon({
    iconClass: 'heart',
    msg: '心形图标',
    iconSize: 30
  })
}

function showTopToast() {
  showPosition({ msg: '顶部提示', position: 'top' })
}

function showMiddleTopToast() {
  showPosition({ msg: '中上提示', position: 'middle-top' })
}

function showMiddleToast() {
  showPosition({ msg: '居中提示', position: 'middle' })
}

function showBottomToast() {
  showPosition({ msg: '底部提示', position: 'bottom' })
}

function showShortToast() {
  showDuration({ msg: '1秒后消失', duration: 1000 })
}

function showLongToast() {
  showDuration({ msg: '5秒后消失', duration: 5000 })
}

function showVerticalToast() {
  showVertical({ msg: '垂直排列', iconName: 'success', direction: 'vertical' })
}

function showLargeIconToast() {
  showIconSize({ msg: '大图标', iconName: 'success', iconSize: 30 })
}

function showSmallIconToast() {
  showIconSize({ msg: '小图标', iconName: 'success', iconSize: 24 })
}

function showCallbackToast() {
  const time = new Date().toLocaleTimeString()
  eventLogs.value = []
  showCallback({
    msg: '带回调的提示',
    opened: () => {
      const log = `${time} - opened: Toast 已显示`
      eventLogs.value.push(log)
      console.log(log)
    },
    closed: () => {
      const log = `${new Date().toLocaleTimeString()} - closed: Toast 已关闭`
      eventLogs.value.push(log)
      console.log(log)
    }
  })
}
</script>

<style lang="scss">
.m-toast-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-toast-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
}

.demo-toast-events {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 12px;
  }

  &__list {
    max-height: 150px;
    overflow-y: auto;
  }

  &__item {
    font-size: 12px;
    color: #999;
    padding: 4px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>