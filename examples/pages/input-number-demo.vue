<template>
	<view class="m-input-number-demo">
		<view class="m-input-number-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="最简单的计数器，默认最小值为1，步进为1">
				<view class="demo-input-number-row">
					<m-input-number v-model="basicValue" />
				</view>
				<view class="demo-input-number-value">
					<text>当前值：{{ basicValue }}</text>
				</view>
			</demo-block>

			<!-- 设置范围 -->
			<demo-block title="设置范围" desc="通过 min 和 max 属性限制数值范围">
				<view class="demo-input-number-row">
					<m-input-number v-model="rangeValue" :min="10" :max="100" />
				</view>
				<view class="demo-input-number-value">
					<text>范围：10 ~ 100，当前值：{{ rangeValue }}</text>
				</view>
			</demo-block>

			<!-- 设置步进 -->
			<demo-block title="设置步进" desc="通过 step 属性设置每次增减的数值">
				<view class="demo-input-number-row">
					<m-input-number v-model="stepValue" :step="5" :min="0" :max="50" />
				</view>
				<view class="demo-input-number-value">
					<text>步进值：5，当前值：{{ stepValue }}</text>
				</view>
			</demo-block>

			<!-- 精度控制 -->
			<demo-block title="精度控制" desc="通过 precision 属性设置小数位数">
				<view class="demo-input-number-row">
					<m-input-number v-model="precisionValue" :step="0.1" :precision="1" :min="0" :max="10" />
				</view>
				<view class="demo-input-number-value">
					<text>精度：1位小数，当前值：{{ precisionValue }}</text>
				</view>
			</demo-block>

			<!-- 禁用状态 -->
			<demo-block title="禁用状态" desc="设置 disabled 属性禁用整个计数器">
				<view class="demo-input-number-row">
					<m-input-number v-model="disabledValue" disabled />
				</view>
			</demo-block>

			<!-- 禁用输入框 -->
			<demo-block title="禁用输入框" desc="设置 disable-input 属性仅禁用输入框，仍可点击按钮增减">
				<view class="demo-input-number-row">
					<m-input-number v-model="disableInputValue" disable-input />
				</view>
			</demo-block>

			<!-- 禁用加减按钮 -->
			<demo-block title="禁用加减按钮" desc="分别通过 disable-minus 和 disable-plus 属性控制">
				<view class="demo-input-number-row">
					<m-input-number v-model="disableBtnValue" disable-minus />
				</view>
				<view class="demo-input-number-row" style="margin-top: 20rpx">
					<m-input-number v-model="disableBtnValue2" disable-plus />
				</view>
			</demo-block>

			<!-- 不显示输入框 -->
			<demo-block title="不显示输入框" desc="设置 without-input 属性仅显示加减按钮">
				<view class="demo-input-number-row">
					<m-input-number v-model="withoutInputValue" without-input :min="1" :max="10" />
				</view>
			</demo-block>

			<!-- 圆角模式 -->
			<demo-block title="圆角模式" desc="设置 round 属性使用圆角按钮样式">
				<view class="demo-input-number-row">
					<m-input-number v-model="roundValue" round />
				</view>
			</demo-block>

			<!-- 不同主题样式 -->
			<demo-block title="主题样式" desc="支持四种主题：default、outline、outline-split、primary">
				<view class="demo-input-number-row">
					<m-input-number v-model="themeValue" theme="default" />
				</view>
				<view class="demo-input-number-row" style="margin-top: 20rpx">
					<m-input-number v-model="themeValue" theme="outline" />
				</view>
				<view class="demo-input-number-row" style="margin-top: 20rpx">
					<m-input-number v-model="themeValue" theme="outline-split" />
				</view>
				<view class="demo-input-number-row" style="margin-top: 20rpx">
					<m-input-number v-model="themeValue" theme="primary" />
				</view>
			</demo-block>

			<!-- 事件监听 -->
			<demo-block title="事件监听" desc="监听 change、focus、blur 事件">
				<view class="demo-input-number-row">
					<m-input-number 
						v-model="eventValue" 
						@change="handleChange"
						@focus="handleFocus"
						@blur="handleBlur"
					/>
				</view>
				<view class="demo-input-number-value">
					<text>当前值：{{ eventValue }}</text>
				</view>
				<view class="demo-input-number-events">
					<text>{{ eventLog }}</text>
				</view>
			</demo-block>

			<!-- 异步验证 -->
			<demo-block title="异步验证" desc="通过 before-change 属性进行异步验证，加减按钮会显示 loading 图标">
				<view class="demo-input-number-row">
					<m-input-number 
						v-model="asyncValue" 
						:before-change="handleBeforeChange"
						:min="1"
						:max="10"
					/>
				</view>
				<view class="demo-input-number-value">
					<text>当前值：{{ asyncValue }}</text>
				</view>
				<view class="demo-input-number-events">
					<text>{{ asyncLog }}</text>
				</view>
			</demo-block>

			<!-- 异步验证（主色主题） -->
			<demo-block title="异步验证（主色主题）" desc="不同主题下的 loading 效果展示">
				<view class="demo-input-number-row">
					<m-input-number 
						v-model="asyncValue2" 
						:before-change="handleBeforeChange2"
						theme="primary"
						:min="1"
						:max="10"
					/>
				</view>
				<view class="demo-input-number-value">
					<text>当前值：{{ asyncValue2 }}</text>
				</view>
				<view class="demo-input-number-events">
					<text>{{ asyncLog2 }}</text>
				</view>
			</demo-block>

			<!-- 配合表单使用 -->
			<demo-block title="表单场景" desc="配合 m-form 和 m-form-item 使用">
				<m-form :model="formData" class="demo-form" :title-width="90">
					<m-form-item prop="quantity" title="购买数量" required>
						<m-input-number v-model="formData.quantity" :min="1" :max="99" />
					</m-form-item>
					<m-form-item prop="price" title="单价">
						<m-input-number v-model="formData.price" :step="0.01" :precision="2" :min="0" />
					</m-form-item>
				</m-form>
			</demo-block>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const basicValue = ref(1)
const rangeValue = ref(50)
const stepValue = ref(0)
const precisionValue = ref(0)
const disabledValue = ref(5)
const disableInputValue = ref(3)
const disableBtnValue = ref(1)
const disableBtnValue2 = ref(5)
const withoutInputValue = ref(5)
const roundValue = ref(3)
const themeValue = ref(3)
const eventValue = ref(1)
const eventLog = ref('')
const asyncValue = ref(5)
const asyncLog = ref('')
const asyncValue2 = ref(5)
const asyncLog2 = ref('')

const formData = reactive({
	quantity: 1,
	price: 0
})

function handleChange({ value }: { value: number | string }) {
	eventLog.value = `change: ${value}`
}

function handleFocus(detail: any) {
	eventLog.value = 'focus'
}

function handleBlur({ value }: { value: string | number }) {
	eventLog.value = `blur: ${value}`
}

function handleBeforeChange(value: number | string): Promise<boolean> {
	asyncLog.value = `正在验证值: ${value}...`
	return new Promise((resolve) => {
		setTimeout(() => {
			if (Number(value) > 7) {
				asyncLog.value = `值 ${value} 超过限制，已拒绝`
				resolve(false)
			} else {
				asyncLog.value = `值 ${value} 验证通过`
				resolve(true)
			}
		}, 1500)
	})
}

function handleBeforeChange2(value: number | string): Promise<boolean> {
	asyncLog2.value = `正在处理: ${value}...`
	return new Promise((resolve) => {
		setTimeout(() => {
			asyncLog2.value = `处理完成: ${value}`
			resolve(true)
		}, 2000)
	})
}
</script>

<style lang="scss" scoped>
.m-input-number-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-input-number-row {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
	padding: 16rpx;
	display: flex;
	justify-content: center;
}

.demo-input-number-value {
	margin-top: 16rpx;
	padding: 12rpx 16rpx;
	background: #f0f2f5;
	border-radius: 4px;
	font-size: 24rpx;
	color: #666;
}

.demo-input-number-events {
	margin-top: 16rpx;
	padding: 12rpx 16rpx;
	background: #e8f5e9;
	border-radius: 4px;
	font-size: 24rpx;
	color: #388e3c;
}

.demo-form {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
	padding: 8rpx;
}
</style>