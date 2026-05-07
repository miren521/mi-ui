/** 
  * ColorUI 组件库 
  * @description 基于 ColorUI CSS 封装的 uni-app 组件库 
  */ 

import CuButton from './m-button/src/index.vue'
import mStep from './m-step/m-step.vue'
import mSteps from './m-steps/m-steps.vue'
import mWatermark from './m-watermark/m-watermark.vue'
import mCurtain from './m-curtain/m-curtain.vue'

// 所有组件 
const components = [ 
	CuButton, 
	mStep,
	mSteps,
	mWatermark,
	mCurtain,
] 

// 安装函数 
const install = (Vue) => { 
	if (install.installed) return 
	install.installed = true 
	components.forEach(component => { 
		Vue.component(component.name, component) 
	}) 
} 

// 自动安装（浏览器环境） 
if (typeof window !== 'undefined' && window.Vue) { 
	install(window.Vue) 
} 

export { 
	CuButton, 
	CuBadge, 
	mStep,
	mSteps,
	mWatermark,
	mCurtain,
} 

export default { 
	install, 
	CuButton, 
	mStep,
	mSteps,
	mWatermark,
	mCurtain,
}
