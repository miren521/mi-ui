export interface ComponentItem {
  id: string
  title: string
  enTitle?: string
  zhTitle?: string
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
  { id: 'overlay', title: 'Overlay 遮罩层', enTitle: 'Overlay', zhTitle: '遮罩层', desc: '遮罩层组件，用于覆盖在页面内容之上', category: 'feedback', url: '/examples/pages/overlay-demo' },
  { id: 'toast', title: 'Toast 轻提示', enTitle: 'Toast', zhTitle: '轻提示', desc: '轻提示组件，用于消息提示', category: 'feedback', url: '/examples/pages/toast-demo' },
  { id: 'dialog', title: 'Dialog 对话框', enTitle: 'Dialog', zhTitle: '对话框', desc: '对话框组件，用于消息提示和确认操作', category: 'feedback', url: '/examples/pages/dialog-demo' },
  { id: 'action-sheet', title: 'ActionSheet 上拉菜单', enTitle: 'ActionSheet', zhTitle: '上拉菜单', desc: '底部弹出的动作菜单面板', category: 'feedback', url: '/examples/pages/action-sheet-demo' },
  { id: 'drop-menu', title: 'DropMenu 下拉菜单', enTitle: 'DropMenu', zhTitle: '下拉菜单', desc: '下拉菜单组件，支持多级联动选择', category: 'feedback', url: '/examples/pages/drop-menu-demo' },
  { id: 'popover', title: 'Popover 气泡卡片', enTitle: 'Popover', zhTitle: '气泡卡片', desc: '气泡卡片组件，用于展示提示信息', category: 'feedback', url: '/examples/pages/popover-demo' },
  { id: 'floating-panel', title: 'FloatingPanel 浮动面板', enTitle: 'FloatingPanel', zhTitle: '浮动面板', desc: '浮动面板组件，支持拖拽调整高度', category: 'feedback', url: '/examples/pages/floating-panel-demo' },
  { id: 'progress', title: 'Progress 进度条', enTitle: 'Progress', zhTitle: '进度条', desc: '进度条组件，用于展示任务进度', category: 'feedback', url: '/examples/pages/progress-demo' },
  { id: 'transition', title: 'Transition 动画', enTitle: 'Transition', zhTitle: '动画', desc: '过渡动画组件', category: 'feedback', url: '/examples/pages/transition-demo' },
  { id: 'loading', title: 'Loading 加载指示器', enTitle: 'Loading', zhTitle: '加载指示器', desc: '加载动画，用于表示加载中的过渡状态', category: 'feedback', url: '/examples/pages/loading-demo' },
  { id: 'Circle', title: 'Circle 环形进度条', enTitle: 'Circle', zhTitle: '环形进度条', desc: '支持颜色定制、渐变色、方向控制', category: 'feedback', url: '/examples/pages/circle-demo' },
]

// 表单
export const formComponents: ComponentItem[] = [
  { id: 'form', title: 'Form 表单', enTitle: 'Form', zhTitle: '表单', desc: '表单组件，用于数据录入、校验', category: 'form', url: '/examples/pages/form-demo' },
  { id: 'Input', title: 'Input 输入框', enTitle: 'Input', zhTitle: '输入框', desc: '用户可以在文本框中输入内容', category: 'form', url: '/examples/pages/input-demo' },
  { id: 'Textarea', title: 'Textarea 文本域', enTitle: 'Textarea', zhTitle: '文本域', desc: '用于输入多行文本，高度自适应与紧凑布局', category: 'form', url: '/examples/pages/textarea-demo' },
  { id: 'InputNumber', title: 'InputNumber 计数器', enTitle: 'InputNumber', zhTitle: '计数器', desc: '由增加按钮、减少按钮和输入框组成', category: 'form', url: '/examples/pages/input-number-demo' },
  { id: 'Checkbox', title: 'Checkbox 复选框', enTitle: 'Checkbox', zhTitle: '复选框', desc: '用于在一组备选项中进行多选', category: 'form', url: '/examples/pages/checkbox-demo' },
  { id: 'Radio', title: 'Radio 单选框', enTitle: 'Radio', zhTitle: '单选框', desc: '单选框用于在一组备选项中进行单选', category: 'form', url: '/examples/pages/radio-demo' },
  { id: 'Switch', title: 'Switch 开关', enTitle: 'Switch', zhTitle: '开关', desc: '用来打开或关闭选项', category: 'form', url: '/examples/pages/switch-demo' },
  { id: 'Rate', title: 'Rate 评分', enTitle: 'Rate', zhTitle: '评分', desc: '评分组件，支持半选、可清空', category: 'form', url: '/examples/pages/rate-demo' },
  { id: 'Slider', title: 'Slider 滑块', enTitle: 'Slider', zhTitle: '滑块', desc: '滑块组件，支持双向、刻度、垂直', category: 'form', url: '/examples/pages/slider-demo' },
  { id: 'Picker', title: 'Picker 选择器', enTitle: 'Picker', zhTitle: '选择器', desc: '选择器组件，支持单列、多列、级联选择', category: 'form', url: '/examples/pages/picker-demo' },
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
  { id: 'swiper', title: 'Swiper 轮播', enTitle: 'Swiper', zhTitle: '轮播', desc: '用于创建轮播，支持水平和垂直方向滑动', category: 'display', url: '/examples/pages/swiper-demo' },
  { id: 'table', title: 'Table 表格', enTitle: 'Table', zhTitle: '表格', desc: '用于展示多条结构类似的数据', category: 'display', url: '/examples/pages/table-demo' },
  { id: 'watermark', title: 'Watermark 水印', enTitle: 'Watermark', zhTitle: '水印', desc: '在页面或组件上添加指定的图片或文字', category: 'display', url: '/examples/pages/watermark-demo' },
  { id: 'curtain', title: 'Curtain 幕帘', enTitle: 'Curtain', zhTitle: '幕帘', desc: '一般用于公告类图片弹窗展示', category: 'display', url: '/examples/pages/curtain-demo' },
]

export const components: ComponentItem[] = [
  ...basicComponents,
  ...feedbackComponents,
  ...layoutComponents,
  ...navigationComponents,
  ...displayComponents,
  ...formComponents,
]

export const totalCount = components.length