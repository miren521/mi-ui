export interface ComponentItem {
  id: string
  title: string
  enTitle: string
  zhTitle: string
  desc: string
  category: string
  url: string
}

// 基础
export const basicComponents: ComponentItem[] = [
  { id: 'button', title: 'Button 按钮', enTitle: 'Button', zhTitle: '按钮', desc: '按钮组件，支持多种类型和状态', category: 'basic', url: '/examples/pages/button-demo' },
  { id: 'icon', title: 'Icon 图标', enTitle: 'Icon', zhTitle: '图标', desc: '图标组件，提供丰富的图标资源', category: 'basic', url: '/examples/pages/icon-demo' },
  { id: 'text', title: 'Text 文本', enTitle: 'Text', zhTitle: '文本', desc: '文本组件，支持多种样式和格式化', category: 'basic', url: '/examples/pages/text-demo' },
  { id: 'cell', title: 'Cell 单元格', enTitle: 'Cell', zhTitle: '单元格', desc: '单元格组件，用于展示列表数据', category: 'basic', url: '/examples/pages/cell-demo' },
]

// 反馈
export const feedbackComponents: ComponentItem[] = [
  { id: 'popup', title: 'Popup 弹出层', enTitle: 'Popup', zhTitle: '弹出层', desc: '弹出层组件，支持多种位置', category: 'feedback', url: '/examples/pages/popup-demo' },
  { id: 'transition', title: 'Transition 动画', enTitle: 'Transition', zhTitle: '动画', desc: '过渡动画组件', category: 'feedback', url: '/examples/pages/transition-demo' },
  { id: 'loading', title: 'Loading 加载指示器', enTitle: 'Loading', zhTitle: '加载指示器', desc: '加载动画，用于表示加载中的过渡状态', category: 'feedback', url: '/examples/pages/loading-demo' },
]

// 布局
export const layoutComponents: ComponentItem[] = [
  { id: 'layout', title: 'Layout 布局', enTitle: 'Layout', zhTitle: '布局', desc: '栅格布局，支持 24 分栏', category: 'layout', url: '/examples/pages/layout-demo' },
  { id: 'grid', title: 'Grid 宫格', enTitle: 'Grid', zhTitle: '宫格', desc: '宫格组件，用于展示一组相关的内容', category: 'layout', url: '/examples/pages/grid-demo' },
]

// 导航
export const navigationComponents: ComponentItem[] = [
  { id: 'tabbar', title: 'Tabbar 底部导航', enTitle: 'Tabbar', zhTitle: '底部导航', desc: '底部导航栏，用于在不同页面之间进行切换', category: 'navigation', url: '/examples/pages/tabbar-demo' },
]

// 展示
export const displayComponents: ComponentItem[] = [
  { id: 'divider', title: 'Divider 分割线', enTitle: 'Divider', zhTitle: '分割线', desc: '分割线组件，用于分隔内容', category: 'display', url: '/examples/pages/divider-demo' },
  { id: 'avatar', title: 'Avatar 头像', enTitle: 'Avatar', zhTitle: '头像', desc: '头像组件，支持图片、文本、图标和状态显示', category: 'display', url: '/examples/pages/avatar-demo' },
  { id: 'img', title: 'Img 图片', enTitle: 'Img', zhTitle: '图片', desc: '图片组件，支持多种填充模式和预览功能', category: 'display', url: '/examples/pages/img-demo' },
  { id: 'tag', title: 'Tag 标签', enTitle: 'Tag', zhTitle: '标签', desc: '标签组件，用于标记和分类', category: 'display', url: '/examples/pages/tag-demo' },
  { id: 'badge', title: 'Badge 徽标', enTitle: 'Badge', zhTitle: '徽标', desc: '徽标组件，用于显示未读数量和状态', category: 'display', url: '/examples/pages/badge-demo' },
  { id: 'card', title: 'Card 卡片', enTitle: 'Card', zhTitle: '卡片', desc: '用于展示商品的图片、价格等信息', category: 'display', url: '/examples/pages/card-demo' },
  { id: 'steps', title: 'Steps 步骤条', enTitle: 'Steps', zhTitle: '步骤条', desc: '步骤条组件，用于引导用户完成流程', category: 'display', url: '/examples/pages/steps-demo' },
  { id: 'collapse', title: 'Collapse 折叠面板', enTitle: 'Collapse', zhTitle: '折叠面板', desc: '折叠面板组件，支持手风琴模式和普通模式', category: 'display', url: '/examples/pages/collapse-demo' },
  { id: 'sticky', title: 'Sticky 粘性布局', enTitle: 'Sticky', zhTitle: '粘性布局', desc: '粘性布局组件，页面滚动时将元素固定在指定位置', category: 'display', url: '/examples/pages/sticky-demo' },
  { id: 'skeleton', title: 'Skeleton 骨架屏', enTitle: 'Skeleton', zhTitle: '骨架屏', desc: '骨架屏用于内容加载时的占位展示', category: 'display', url: '/examples/pages/skeleton-demo' },
  { id: 'loadmore', title: 'Loadmore 加载更多', enTitle: 'Loadmore', zhTitle: '加载更多', desc: '用于在列表底部展示加载状态', category: 'display', url: '/examples/pages/loadmore-demo' },
  { id: 'imagePreview', title: 'ImagePreview 图片预览', enTitle: 'ImagePreview', zhTitle: '图片预览', desc: '图片预览组件，支持多图预览、滑动切换', category: 'display', url: '/examples/pages/image-preview-demo' },
  { id: 'videoPreview', title: 'VideoPreview 视频预览', enTitle: 'VideoPreview', zhTitle: '视频预览', desc: '视频预览组件，支持组件实例、函数式调用', category: 'display', url: '/examples/pages/video-preview-demo' },
  { id: 'imgCropper', title: 'ImgCropper 图片裁剪', enTitle: 'ImgCropper', zhTitle: '图片裁剪', desc: '图片剪裁组件，用于图片裁剪', category: 'display', url: '/examples/pages/img-cropper-demo' },
]

export const components: ComponentItem[] = [
  ...basicComponents,
  ...feedbackComponents,
  ...layoutComponents,
  ...navigationComponents,
  ...displayComponents,
]

export const totalCount = components.length
