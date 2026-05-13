<template>
  <view class="m-dialog-demo">
    <view class="m-dialog-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="展示最基础的对话框用法">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showAlertDialog">Alert 对话框</m-button>
          <m-button type="success" @click="showConfirmDialog">Confirm 对话框</m-button>
        </view>
        <m-dialog selector="basic" />
      </demo-block>

      <!-- 提示图标 -->
      <demo-block title="提示图标" desc="通过 icon 属性显示不同状态的图标">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showSuccessIconDialog">成功</m-button>
          <m-button type="danger" @click="showErrorIconDialog">错误</m-button>
          <m-button type="warning" @click="showWarningIconDialog">警告</m-button>
          <m-button type="info" @click="showInfoIconDialog">信息</m-button>
        </view>
        <m-dialog selector="icon" />
      </demo-block>

      <!-- 确认对话框 -->
      <demo-block title="确认对话框" desc="带有标题和描述的确认弹窗">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showConfirmWithTitle">显示确认</m-button>
        </view>
        <m-dialog selector="confirm" />
      </demo-block>

      <!-- 圆角按钮风格 -->
      <demo-block title="圆角按钮风格" desc="通过 theme 属性设置按钮风格为 text">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showTextThemeDialog">Text 风格</m-button>
        </view>
        <m-dialog selector="textTheme" />
      </demo-block>

      <!-- 垂直按钮布局 -->
      <demo-block title="垂直按钮布局" desc="通过 actionLayout 属性设置垂直排列按钮">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showVerticalLayoutDialog">垂直布局</m-button>
        </view>
        <m-dialog selector="vertical" />
      </demo-block>

      <!-- 点击蒙层关闭 -->
      <demo-block title="点击蒙层关闭" desc="通过 closeOnClickModal 属性开启点击蒙层关闭">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showClickModalDialog">可点击关闭</m-button>
        </view>
        <m-dialog selector="clickModal" />
      </demo-block>

      <!-- 显示关闭按钮 -->
      <demo-block title="显示关闭按钮" desc="通过 showClose 属性显示右上角关闭按钮">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showCloseButtonDialog">显示关闭</m-button>
        </view>
        <m-dialog selector="closeBtn" />
      </demo-block>

      <!-- 顶部图片 -->
      <demo-block title="顶部图片" desc="通过 headerImage 属性设置顶部通栏图片">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showHeaderImageDialog">顶部图片</m-button>
        </view>
        <m-dialog selector="headerImg" />
      </demo-block>

      <!-- 自定义内容 -->
      <demo-block title="自定义内容" desc="使用默认插槽自定义对话框内容">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showCustomContentDialog">自定义内容</m-button>
        </view>
        <m-dialog selector="custom">
          <view class="demo-dialog-custom">
            <view class="demo-dialog-custom__icon">
              <m-icon name="check-circle-fill" size="48" color="#07c160" />
            </view>
            <view class="demo-dialog-custom__title">自定义内容区域</view>
            <view class="demo-dialog-custom__desc">这是通过插槽自定义的内容区域</view>
          </view>
        </m-dialog>
      </demo-block>

      <!-- 异步关闭 -->
      <demo-block title="异步关闭" desc="通过 beforeConfirm 钩子实现异步确认">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showAsyncConfirmDialog">异步确认</m-button>
        </view>
        <m-dialog selector="async" />
      </demo-block>

      <!-- 多按钮 -->
      <demo-block title="多按钮" desc="通过 actions 属性设置多个操作按钮">
        <view class="demo-dialog-row">
          <m-button type="primary" @click="showMultiActionsDialog">多按钮</m-button>
        </view>
        <m-dialog selector="multiActions" />
      </demo-block>
    </view>
  </view>
</template>

<script setup>
import { useDialog } from '../../packages/m-dialog/index'

const { alert: alertBasic, confirm: confirmBasic } = useDialog('basic')
const { confirm: confirmIcon } = useDialog('icon')
const { confirm: confirmWithTitle } = useDialog('confirm')
const { confirm: confirmTextTheme } = useDialog('textTheme')
const { confirm: confirmVertical } = useDialog('vertical')
const { confirm: confirmClickModal } = useDialog('clickModal')
const { confirm: confirmCloseBtn } = useDialog('closeBtn')
const { confirm: confirmHeaderImg } = useDialog('headerImg')
const { confirm: confirmCustom } = useDialog('custom')
const { confirm: confirmAsync } = useDialog('async')
const { confirm: confirmMultiActions } = useDialog('multiActions')

function showAlertDialog() {
  alertBasic({
    title: '提示',
    msg: '这是一个 Alert 对话框'
  })
}

function showConfirmDialog() {
  confirmBasic({
    title: '确认操作',
    msg: '确定要执行此操作吗？'
  })
}

function showSuccessIconDialog() {
  confirmIcon({
    title: '操作成功',
    msg: '您的操作已成功完成',
    icon: 'success'
  })
}

function showErrorIconDialog() {
  confirmIcon({
    title: '操作失败',
    msg: '抱歉，操作失败了',
    icon: 'danger'
  })
}

function showWarningIconDialog() {
  confirmIcon({
    title: '警告',
    msg: '请注意当前操作有风险',
    icon: 'warning'
  })
}

function showInfoIconDialog() {
  confirmIcon({
    title: '提示信息',
    msg: '这是一条提示信息',
    icon: 'info'
  })
}

function showConfirmWithTitle() {
  confirmWithTitle({
    title: '确认删除',
    msg: '删除后数据将无法恢复，确定要删除吗？'
  })
}

function showTextThemeDialog() {
  confirmTextTheme({
    title: 'Text 风格',
    msg: '这是一个圆角按钮风格的对话框',
    theme: 'text'
  })
}

function showVerticalLayoutDialog() {
  confirmVertical({
    title: '垂直布局',
    msg: '按钮将垂直排列显示',
    actionLayout: 'vertical'
  })
}

function showClickModalDialog() {
  confirmClickModal({
    title: '点击蒙层关闭',
    msg: '点击蒙层区域可以关闭此对话框',
    closeOnClickModal: true
  })
}

function showCloseButtonDialog() {
  confirmCloseBtn({
    title: '关闭按钮',
    msg: '右上角显示关闭按钮',
    showClose: true
  })
}

function showHeaderImageDialog() {
  confirmHeaderImg({
    title: '图片展示',
    msg: '顶部有一张图片',
    headerImage: 'https://placehold.co/280x120/3b82f6/ffffff?text=Header+Image'
  })
}

function showCustomContentDialog() {
  confirmCustom({
    title: '自定义内容',
    msg: '使用默认插槽'
  })
}

function showAsyncConfirmDialog() {
  confirmAsync({
    title: '异步确认',
    msg: '点击确定后将模拟异步请求',
    beforeConfirm: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          uni.showToast({ title: '异步操作完成', icon: 'success' })
          resolve(true)
        }, 1000)
      })
    }
  })
}

function showMultiActionsDialog() {
  confirmMultiActions({
    title: '选择操作',
    msg: '请选择以下操作之一',
    actions: [
      { text: '操作一', click: () => console.log('点击了操作一') },
      { text: '操作二', type: 'primary', click: () => console.log('点击了操作二') },
      { text: '操作三', type: 'danger', click: () => console.log('点击了操作三') }
    ]
  })
}
</script>

<style lang="scss">
.m-dialog-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-dialog-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
}

.demo-dialog-custom {
  padding: 20px;
  text-align: center;

  &__icon {
    margin-bottom: 16px;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 14px;
    color: #666;
  }
}
</style>