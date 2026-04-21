/** 
  * ColorUI 组件库 
  * @description 基于 ColorUI CSS 封装的 uni-app 组件库 
  */ 

import CuButton from './m-button/src/index.vue'

// 所有组件 
const components = [ 
	CuButton, 
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
} 

export default { 
	install, 
	CuButton, 
}