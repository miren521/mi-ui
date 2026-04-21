# M-Row / M-Col 栅格布局组件

基于 24 栅格系统的响应式布局组件，M-Row 和 M-Col 需要配合使用，提供灵活的页面布局方案。

## 平台兼容

- ✅ H5
- ✅ 微信小程序
- ✅ uni-app 全平台

## 组件介绍

### M-Row（行容器）

M-Row 是栅格布局的行容器，用于包裹 M-Col 列组件，提供整体布局控制。

### M-Col（列容器）

M-Col 是栅格布局的列组件，用于在 M-Row 中定义列的宽度，基于 24 栅格系统。

### 使用原则

- M-Row 必须作为 M-Col 的父组件使用
- M-Row 中可以包含多个 M-Col
- 所有 M-Col 的 span 值之和不应超过 24

## 基本用法

### 基础布局

使用 M-Row 包裹 M-Col，通过 span 属性设置列宽。

```vue
<template>
  <m-row>
    <m-col :span="24">
      <view class="col-content">span 24</view>
    </m-col>
  </m-row>
  
  <m-row>
    <m-col :span="12">
      <view class="col-content">span 12</view>
    </m-col>
    <m-col :span="12">
      <view class="col-content">span 12</view>
    </m-col>
  </m-row>
  
  <m-row>
    <m-col :span="8">
      <view class="col-content">span 8</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">span 8</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">span 8</view>
    </m-col>
  </m-row>
</template>

<style>
.col-content {
  padding: 20px;
  background: #f2f3f5;
  text-align: center;
  margin-bottom: 12px;
}
</style>
```

### 等分布局

将一行平均分成多列。

```vue
<template>
  <m-row>
    <m-col :span="8">
      <view class="col-content">1/3</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">1/3</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">1/3</view>
    </m-col>
  </m-row>
</template>
```

### 混合布局

不同列宽的组合。

```vue
<template>
  <m-row>
    <m-col :span="16">
      <view class="col-content">span 16</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">span 8</view>
    </m-col>
  </m-row>
  
  <m-row>
    <m-col :span="6">
      <view class="col-content">span 6</view>
    </m-col>
    <m-col :span="12">
      <view class="col-content">span 12</view>
    </m-col>
    <m-col :span="6">
      <view class="col-content">span 6</view>
    </m-col>
  </m-row>
</template>
```

## Row 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| gutter | `string \| number` | `0` | 栅格间距，单位为 rpx |
| justify | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` | 水平对齐方式 |
| align | `'top' \| 'middle' \| 'bottom'` | `'top'` | 垂直对齐方式 |
| customClass | `string` | `''` | 自定义类名 |
| customStyle | `string \| object` | `{}` | 自定义内联样式 |

### justify 属性说明

- `start` - 左对齐（默认）
- `end` - 右对齐
- `center` - 居中对齐
- `space-around` - 每列两侧间距相等
- `space-between` - 两端对齐，列之间间距相等
- `space-evenly` - 所有间距（包括两端）都相等

### align 属性说明

- `top` - 顶部对齐（默认）
- `middle` - 居中对齐
- `bottom` - 底部对齐

## Col 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| span | `number` | `24` | 栅格占用的列数（1-24） |
| offset | `number` | `0` | 栅格左侧的偏移列数 |
| customClass | `string` | `''` | 自定义类名 |
| customStyle | `string` | `{}` | 自定义内联样式 |

### span 属性说明

基于 24 栅格系统，span 值表示该列占用的列数：
- span="24" - 占满整行（100%）
- span="12" - 占半行（50%）
- span="8" - 占三分之一行（33.33%）
- span="6" - 占四分之一行（25%）
- 以此类推...

### offset 属性说明

offset 值表示该列左侧偏移的列数，用于创建间隔：
- offset="6" - 左侧偏移 6 列（25%）
- offset="12" - 左侧偏移 12 列（50%）
- 以此类推...

## 栅格间距

通过 gutter 属性设置列之间的间距。

```vue
<template>
  <m-row :gutter="16">
    <m-col :span="8">
      <view class="col-content">间距 16rpx</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">间距 16rpx</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">间距 16rpx</view>
    </m-col>
  </m-row>
  
  <m-row :gutter="24">
    <m-col :span="8">
      <view class="col-content">间距 24rpx</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">间距 24rpx</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">间距 24rpx</view>
    </m-col>
  </m-row>
</template>
```

## 水平对齐

通过 justify 属性设置水平对齐方式。

```vue
<template>
  <m-row justify="start">
    <m-col :span="8">
      <view class="col-content">左对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">左对齐</view>
    </m-col>
  </m-row>
  
  <m-row justify="center">
    <m-col :span="8">
      <view class="col-content">居中对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">居中对齐</view>
    </m-col>
  </m-row>
  
  <m-row justify="end">
    <m-col :span="8">
      <view class="col-content">右对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">右对齐</view>
    </m-col>
  </m-row>
  
  <m-row justify="space-between">
    <m-col :span="8">
      <view class="col-content">两端对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content">两端对齐</view>
    </m-col>
  </m-row>
</template>
```

## 垂直对齐

通过 align 属性设置垂直对齐方式。

```vue
<template>
  <m-row align="top">
    <m-col :span="8">
      <view class="col-content" style="height: 60px;">顶部对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content" style="height: 100px;">顶部对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content" style="height: 80px;">顶部对齐</view>
    </m-col>
  </m-row>
  
  <m-row align="middle">
    <m-col :span="8">
      <view class="col-content" style="height: 60px;">居中对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content" style="height: 100px;">居中对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content" style="height: 80px;">居中对齐</view>
    </m-col>
  </m-row>
  
  <m-row align="bottom">
    <m-col :span="8">
      <view class="col-content" style="height: 60px;">底部对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content" style="height: 100px;">底部对齐</view>
    </m-col>
    <m-col :span="8">
      <view class="col-content" style="height: 80px;">底部对齐</view>
    </m-col>
  </m-row>
</template>
```

## 列偏移

通过 offset 属性设置列的偏移。

```vue
<template>
  <m-row>
    <m-col :span="8">
      <view class="col-content">span 8</view>
    </m-col>
    <m-col :span="8" :offset="8">
      <view class="col-content">offset 8</view>
    </m-col>
  </m-row>
  
  <m-row>
    <m-col :span="6" :offset="6">
      <view class="col-content">offset 6</view>
    </m-col>
    <m-col :span="6" :offset="6">
      <view class="col-content">offset 6</view>
    </m-col>
  </m-row>
  
  <m-row>
    <m-col :span="12" :offset="12">
      <view class="col-content">居中</view>
    </m-col>
  </m-row>
</template>
```

## 完整代码示例

### 响应式卡片布局

```vue
<template>
  <view class="page">
    <m-row :gutter="16">
      <m-col :span="24">
        <view class="card">
          <view class="card-title">卡片标题</view>
          <view class="card-content">这是一个全宽卡片</view>
        </view>
      </m-col>
    </m-row>
    
    <m-row :gutter="16">
      <m-col :span="12">
        <view class="card">
          <view class="card-title">卡片 1</view>
          <view class="card-content">半宽卡片内容</view>
        </view>
      </m-col>
      <m-col :span="12">
        <view class="card">
          <view class="card-title">卡片 2</view>
          <view class="card-content">半宽卡片内容</view>
        </view>
      </m-col>
    </m-row>
    
    <m-row :gutter="16">
      <m-col :span="8">
        <view class="card">
          <view class="card-title">卡片 3</view>
          <view class="card-content">三分之一卡片</view>
        </view>
      </m-col>
      <m-col :span="8">
        <view class="card">
          <view class="card-title">卡片 4</view>
          <view class="card-content">三分之一卡片</view>
        </view>
      </m-col>
      <m-col :span="8">
        <view class="card">
          <view class="card-title">卡片 5</view>
          <view class="card-content">三分之一卡片</view>
        </view>
      </m-col>
    </m-row>
  </view>
</template>

<style>
.page {
  padding: 16px;
}

.card {
  background: #fff;
  border-radius: 8rpx;
  padding: 16px;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-content {
  font-size: 14px;
  color: #666;
}
</style>
```

### 表单布局

```vue
<template>
  <view class="form-page">
    <m-row :gutter="16">
      <m-col :span="24">
        <view class="form-item">
          <text class="form-label">用户名</text>
          <input class="form-input" placeholder="请输入用户名" />
        </view>
      </m-col>
    </m-row>
    
    <m-row :gutter="16">
      <m-col :span="12">
        <view class="form-item">
          <text class="form-label">手机号</text>
          <input class="form-input" placeholder="请输入手机号" />
        </view>
      </m-col>
      <m-col :span="12">
        <view class="form-item">
          <text class="form-label">验证码</text>
          <input class="form-input" placeholder="请输入验证码" />
        </view>
      </m-col>
    </m-row>
    
    <m-row :gutter="16">
      <m-col :span="24">
        <view class="form-item">
          <text class="form-label">地址</text>
          <input class="form-input" placeholder="请输入地址" />
        </view>
      </m-col>
    </m-row>
    
    <m-row :gutter="16">
      <m-col :span="12">
        <m-button type="info" block>取消</m-button>
      </m-col>
      <m-col :span="12">
        <m-button type="primary" block>提交</m-button>
      </m-col>
    </m-row>
  </view>
</template>

<style>
.form-page {
  padding: 16px;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4rpx;
  font-size: 14px;
}
</style>
```

### 仪表盘布局

```vue
<template>
  <view class="dashboard">
    <m-row :gutter="16">
      <m-col :span="6">
        <view class="stat-card">
          <text class="stat-value">1,234</text>
          <text class="stat-label">用户总数</text>
        </view>
      </m-col>
      <m-col :span="6">
        <view class="stat-card">
          <text class="stat-value">567</text>
          <text class="stat-label">今日访问</text>
        </view>
      </m-col>
      <m-col :span="6">
        <view class="stat-card">
          <text class="stat-value">89</text>
          <text class="stat-label">新增订单</text>
        </view>
      </m-col>
      <m-col :span="6">
        <view class="stat-card">
          <text class="stat-value">¥12,345</text>
          <text class="stat-label">今日收入</text>
        </view>
      </m-col>
    </m-row>
    
    <m-row :gutter="16">
      <m-col :span="16">
        <view class="chart-card">
          <view class="card-title">数据趋势</view>
          <view class="chart-placeholder">图表区域</view>
        </view>
      </m-col>
      <m-col :span="8">
        <view class="list-card">
          <view class="card-title">最新消息</view>
          <view class="list-item">消息 1</view>
          <view class="list-item">消息 2</view>
          <view class="list-item">消息 3</view>
        </view>
      </m-col>
    </m-row>
  </view>
</template>

<style>
.dashboard {
  padding: 16px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8rpx;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.chart-card,
.list-card {
  background: #fff;
  border-radius: 8rpx;
  padding: 16px;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}

.chart-placeholder {
  height: 200px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.list-item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.list-item:last-child {
  border-bottom: none;
}
</style>
```

## 实现原理

1. **24 栅格系统**：
   - 基于 24 列的栅格系统
   - 每列宽度 = span / 24 * 100%
   - 偏移量 = offset / 24 * 100%

2. **间距处理**：
   - 通过 gutter 属性设置列间距
   - 使用负 margin 和 padding 实现间距
   - 确保内容不受间距影响

3. **对齐方式**：
   - justify 控制水平对齐
   - align 控制垂直对齐
   - 基于 flex 布局实现

4. **父子通信**：
   - M-Row 通过 provide 向子组件传递 gutter 信息
   - M-Col 通过 inject 获取父组件的 gutter
   - 自动计算 padding 实现间距

## 注意事项

1. **栅格总和**：
   - 单行内所有 M-Col 的 span 值之和不应超过 24
   - 超过 24 会导致换行

2. **gutter 限制**：
   - gutter 值必须大于等于 0
   - 负值会触发警告

3. **span/offset 限制**：
   - span 和 offset 值必须大于等于 0
   - 负值会触发警告

4. **嵌套布局**：
   - 支持在 M-Col 中嵌套 M-Row
   - 嵌套时注意 gutter 的叠加

5. **性能优化**：
   - 避免过多的嵌套层级
   - 合理使用 gutter 减少样式计算

6. **小程序兼容**：
   - 确保样式在小程序端正常渲染
   - 注意 flex 布局在不同平台的差异

7. **响应式设计**：
   - 当前版本不支持响应式断点
   - 如需响应式，可通过条件编译实现

8. **样式隔离**：
   - M-Col 使用 `styleIsolation: 'shared'` 允许样式穿透
   - 可以通过 customClass 自定义样式
