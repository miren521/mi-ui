# uniapp + wot-design-uni 组件库开发规范

## 技术栈
- 框架: uni-app + Vue3 + Composition API
- 组件库: wot-design-uni
- 样式: SCSS
- 类型: TypeScript（可选）

## 组件开发规范
- 组件目录: src/components/[组件名]/index.vue
- 组件命名: PascalCase，文件名使用kebab-case
- props命名: camelCase
- 事件命名: kebab-case (如 @update:model-value)
- 样式隔离: 使用scoped，类名采用BEM命名

## 演示页面规范
- 目录: src/pages/demo/button-demo.vue
- 需展示组件的所有属性变体、尺寸、状态
- 包含代码示例展示

## 代码风格
- 使用setup语法糖
- 类型定义放在组件内或types文件夹
- 注释清晰，说明props用途和组件用法

## 演示页面区块包裹规范

所有演示页面的示例区块必须使用 m-demo-block 组件包裹，格式如下：

<m-demo-block title="[区块标题]">
  <view class="demo-[组件名]-row">
    <!-- 示例内容 -->
  </view>
</m-demo-block>

m-demo-block 组件属性：
- title：必填，区块标题，描述当前展示的组件属性或状态
- desc：可选，区块的补充说明文字
- m-demo-block 组件已全局注册
