# M-Popup 弹窗组件

功能丰富的弹出层组件，支持多种弹出位置和交互方式。

## 平台兼容

- ✅ H5
- ✅ 微信小程序
- ✅ uni-app 全平台

## 基本用法

### 基础弹窗

使用 `v-model` 控制弹窗的显示和隐藏。

```vue
<template>
  <view>
    <m-button @click="showPopup = true">打开弹窗</m-button>
    <m-popup v-model="showPopup">
      <view class="popup-content">
        <text>这是一个弹窗</text>
      </view>
    </m-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showPopup = ref(false)
</script>

<style>
.popup-content {
  padding: 20px;
  text-align: center;
}
</style>
```

### 带关闭按钮的弹窗

通过 `closable` 属性显示关闭按钮。

```vue
<template>
  <view>
    <m-button @click="showPopup = true">打开弹窗</m-button>
    <m-popup v-model="showPopup" closable>
      <view class="popup-content">
        <text>带关闭按钮的弹窗</text>
      </view>
    </m-popup>
  </view>
</template>
```

## 弹窗位置

通过 `position` 属性设置弹窗位置，支持 5 种位置：`center`、`top`、`right`、`bottom`、`left`。

### 居中弹窗

```vue
<template>
  <m-popup v-model="showPopup" position="center">
    <view class="popup-content">
      <text>居中弹窗</text>
    </view>
  </m-popup>
</template>
```

### 顶部弹窗

```vue
<template>
  <m-popup v-model="showPopup" position="top">
    <view class="popup-content">
      <text>顶部弹窗</text>
    </view>
  </m-popup>
</template>
```

### 底部弹窗

```vue
<template>
  <m-popup v-model="showPopup" position="bottom">
    <view class="popup-content">
      <text>底部弹窗</text>
    </view>
  </m-popup>
</template>
```

### 左侧弹窗

```vue
<template>
  <m-popup v-model="showPopup" position="left">
    <view class="popup-content">
      <text>左侧弹窗</text>
    </view>
  </m-popup>
</template>
```

### 右侧弹窗

```vue
<template>
  <m-popup v-model="showPopup" position="right">
    <view class="popup-content">
      <text>右侧弹窗</text>
    </view>
  </m-popup>
</template>
```

## 自定义遮罩

### 禁用遮罩

通过 `modal` 属性禁用遮罩。

```vue
<template>
  <m-popup v-model="showPopup" :modal="false">
    <view class="popup-content">
      <text>无遮罩弹窗</text>
    </view>
  </m-popup>
</template>
```

### 自定义遮罩样式

通过 `modalStyle` 属性自定义遮罩样式。

```vue
<template>
  <m-popup 
    v-model="showPopup" 
    :modalStyle="{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }"
  >
    <view class="popup-content">
      <text>自定义遮罩样式</text>
    </view>
  </m-popup>
</template>
```

## 自定义弹窗样式

通过 `customStyle` 属性自定义弹窗样式。

```vue
<template>
  <m-popup 
    v-model="showPopup" 
    :customStyle="{ width: '80%', borderRadius: '16rpx' }"
  >
    <view class="popup-content">
      <text>自定义样式弹窗</text>
    </view>
  </m-popup>
</template>
```

## 安全区域适配

通过 `safeAreaInsetBottom` 属性适配底部安全区域。

```vue
<template>
  <m-popup 
    v-model="showPopup" 
    position="bottom"
    safeAreaInsetBottom
  >
    <view class="popup-content">
      <text>适配底部安全区域</text>
    </view>
  </m-popup>
</template>
```

## 插槽使用

### 头部插槽

```vue
<template>
  <m-popup v-model="showPopup">
    <template #header>
      <view class="popup-header">
        <text>弹窗标题</text>
      </view>
    </template>
    <view class="popup-content">
      <text>弹窗内容</text>
    </view>
  </m-popup>
</template>

<style>
.popup-header {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: bold;
  text-align: center;
}
</style>
```

### 底部插槽

```vue
<template>
  <m-popup v-model="showPopup">
    <view class="popup-content">
      <text>弹窗内容</text>
    </view>
    <template #footer>
      <view class="popup-footer">
        <m-button type="info" @click="showPopup = false">取消</m-button>
        <m-button type="primary" @click="showPopup = false">确定</m-button>
      </view>
    </template>
  </m-popup>
</template>

<style>
.popup-footer {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.popup-footer .m-button {
  flex: 1;
}
</style>
```

## 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| open | 弹窗开始打开时触发 | - |
| opened | 弹窗打开动画结束时触发 | - |
| close | 弹窗开始关闭时触发 | - |
| closed | 弹窗关闭动画结束时触发 | - |
| click-modal | 点击遮罩层时触发 | - |

### 事件监听示例

```vue
<template>
  <m-popup 
    v-model="showPopup"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    @click-modal="handleClickModal"
  >
    <view class="popup-content">
      <text>带事件监听的弹窗</text>
    </view>
  </m-popup>
</template>

<script setup>
function handleOpen() {
  console.log('弹窗开始打开')
}

function handleOpened() {
  console.log('弹窗打开动画结束')
}

function handleClose() {
  console.log('弹窗开始关闭')
}

function handleClosed() {
  console.log('弹窗关闭动画结束')
}

function handleClickModal() {
  console.log('点击了遮罩层')
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | `boolean` | `false` | 控制弹窗显示/隐藏 |
| position | `'center' \| 'top' \| 'right' \| 'bottom' \| 'left'` | `'center'` | 弹窗位置 |
| closable | `boolean` | `false` | 是否显示关闭按钮 |
| closeOnClickModal | `boolean` | `true` | 点击遮罩层是否关闭弹窗 |
| duration | `number` | `300` | 动画持续时间（毫秒） |
| zIndex | `number` | `2000` | 弹窗层级 |
| customStyle | `string \| object` | - | 自定义弹窗样式 |
| modal | `boolean` | `true` | 是否显示遮罩层 |
| modalStyle | `string \| object` | - | 自定义遮罩样式 |
| hideWhenClose | `boolean` | `true` | 关闭时是否隐藏 DOM |
| lazyRender | `boolean` | `true` | 是否延迟渲染 |
| safeAreaInsetBottom | `boolean` | `false` | 是否适配底部安全区域 |
| lockScroll | `boolean` | `true` | 是否锁定背景滚动 |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 弹窗内容 |
| header | 弹窗头部 |
| footer | 弹窗底部 |

## 使用示例

### 确认弹窗

```vue
<template>
  <view>
    <m-button @click="showConfirm = true">删除</m-button>
    <m-popup v-model="showConfirm">
      <view class="confirm-content">
        <text class="confirm-title">确认删除</text>
        <text class="confirm-desc">确定要删除这条数据吗？</text>
      </view>
      <template #footer>
        <view class="confirm-footer">
          <m-button type="info" @click="showConfirm = false">取消</m-button>
          <m-button type="danger" @click="handleDelete">删除</m-button>
        </view>
      </template>
    </m-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showConfirm = ref(false)

function handleDelete() {
  // 执行删除操作
  console.log('删除数据')
  showConfirm.value = false
}
</script>

<style>
.confirm-content {
  padding: 20px;
}

.confirm-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
}

.confirm-desc {
  color: #666;
  text-align: center;
}

.confirm-footer {
  display: flex;
  border-top: 1px solid #f0f0f0;
}

.confirm-footer .m-button {
  flex: 1;
  border-radius: 0;
}
</style>
```

### 底部操作弹窗

```vue
<template>
  <view>
    <m-button @click="showActions = true">更多操作</m-button>
    <m-popup v-model="showActions" position="bottom">
      <view class="action-item" @click="handleAction('share')">
        <m-icon name="share" :size="24" />
        <text>分享</text>
      </view>
      <view class="action-item" @click="handleAction('save')">
        <m-icon name="save" :size="24" />
        <text>保存</text>
      </view>
      <view class="action-item" @click="handleAction('report')">
        <m-icon name="warning" :size="24" />
        <text>举报</text>
      </view>
      <view class="action-cancel" @click="showActions = false">
        <text>取消</text>
      </view>
    </m-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showActions = ref(false)

function handleAction(action) {
  console.log('执行操作:', action)
  showActions.value = false
}
</script>

<style>
.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.action-item text {
  margin-top: 8px;
  font-size: 14px;
}

.action-cancel {
  margin-top: 12px;
  padding: 16px;
  background: #f5f5f5;
  text-align: center;
  border-radius: 0 0 16rpx 16rpx;
}
</style>
```

### 右侧侧边栏

```vue
<template>
  <view>
    <m-button @click="showSidebar = true">打开侧边栏</m-button>
    <m-popup v-model="showSidebar" position="right" :customStyle="{ width: '70%' }">
      <template #header>
        <view class="sidebar-header">
          <text>侧边栏</text>
        </view>
      </template>
      <view class="sidebar-content">
        <view class="menu-item" @click="handleMenu('home')">首页</view>
        <view class="menu-item" @click="handleMenu('profile')">个人中心</view>
        <view class="menu-item" @click="handleMenu('settings')">设置</view>
        <view class="menu-item" @click="handleMenu('help')">帮助</view>
      </view>
    </m-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showSidebar = ref(false)

function handleMenu(menu) {
  console.log('选择菜单:', menu)
  showSidebar.value = false
}
</script>

<style>
.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: bold;
}

.sidebar-content {
  padding: 16px 0;
}

.menu-item {
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
}
</style>
```

## 实现原理

1. **显示/隐藏控制**：
   - 使用 `v-model` 双向绑定控制弹窗状态
   - 支持延迟渲染和动画过渡

2. **位置控制**：
   - 通过 `position` 属性设置弹窗位置
   - 对应不同位置的样式处理

3. **遮罩层**：
   - 可控制是否显示遮罩
   - 支持自定义遮罩样式
   - 点击遮罩可关闭弹窗

4. **关闭机制**：
   - 支持关闭按钮
   - 支持点击遮罩关闭
   - 支持手动调用关闭方法

5. **动画效果**：
   - 支持自定义动画持续时间
   - 显示/隐藏时的过渡动画

6. **安全区域**：
   - 支持底部安全区域适配

7. **事件系统**：
   - 提供完整的生命周期事件
   - 支持点击遮罩事件

## 注意事项

1. **z-index**：
   - 默认 z-index 为 2000，可根据需要调整
   - 确保弹窗层级高于其他元素

2. **性能优化**：
   - 默认开启 `lazyRender`，只在需要时渲染 DOM
   - `hideWhenClose` 为 true 时，关闭后会移除 DOM

3. **动画效果**：
   - 动画持续时间默认为 300ms，可根据需要调整
   - 小程序端动画效果可能与 H5 端略有差异

4. **安全区域**：
   - 在刘海屏设备上，底部弹窗建议开启 `safeAreaInsetBottom`

5. **滚动锁定**：
   - 默认锁定背景滚动，可通过 `lockScroll` 属性关闭

6. **插槽使用**：
   - header 和 footer 插槽是可选的
   - 默认插槽用于放置主要内容

7. **样式自定义**：
   - 可通过 `customStyle` 自定义弹窗样式
   - 可通过 `modalStyle` 自定义遮罩样式

8. **微信小程序**：
   - 确保样式兼容小程序环境
   - 网络图片需要配置域名白名单
