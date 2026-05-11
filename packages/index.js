/** 
  * ColorUI 组件库 
  * @description 基于 ColorUI CSS 封装的 uni-app 组件库 
  */ 

import CuButton from './m-button/src/index.vue'
import mStep from './m-step/m-step.vue'
import mSteps from './m-steps/m-steps.vue'
import mWatermark from './m-watermark/m-watermark.vue'
import mCurtain from './m-curtain/m-curtain.vue'
import mInput from './m-input/m-input.vue'
import mInputNumber from './m-input-number/m-input-number.vue'
import mCheckbox from './m-checkbox/m-checkbox.vue'
import mCheckboxGroup from './m-checkbox-group/m-checkbox-group.vue'
import mTextarea from './m-textarea/m-textarea.vue'
import mForm from './m-form/m-form.vue'
import mFormItem from './m-form-item/m-form-item.vue'
import mSlider from './m-slider/m-slider.vue'

// 所有组件 
const components = [ 
	CuButton, 
	mStep,
	mSteps,
	mWatermark,
	mCurtain,
	mInput,
	mInputNumber,
	mCheckbox,
	mCheckboxGroup,
	mTextarea,
	mForm,
	mFormItem,
	mSlider,
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
	mInput,
	mInputNumber,
	mCheckbox,
	mCheckboxGroup,
	mTextarea,
	mForm,
	mFormItem,
	mSlider,
} 

export default { 
	install, 
	CuButton, 
	mStep,
	mSteps,
	mWatermark,
	mCurtain,
	mInput,
	mInputNumber,
	mCheckbox,
	mCheckboxGroup,
	mTextarea,
	mForm,
	mFormItem,
	mSlider,
}
