<template>
	<view class="m-checkbox-demo">
		<view class="m-checkbox-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="最简单的复选框，单独使用时绑定布尔值">
				<view class="demo-checkbox-row">
					<m-checkbox v-model="basicValue">复选框</m-checkbox>
				</view>
				<view class="demo-checkbox-value">
					<text>当前值：{{ basicValue }}</text>
				</view>
			</demo-block>

			<!-- 自定义值 -->
			<demo-block title="自定义值" desc="通过 true-value 和 false-value 设置自定义选中/未选中值">
				<view class="demo-checkbox-row">
					<m-checkbox v-model="customValue" true-value="yes" false-value="no">同意协议</m-checkbox>
				</view>
				<view class="demo-checkbox-value">
					<text>当前值：{{ customValue }}</text>
				</view>
			</demo-block>

			<!-- 复选框组 -->
			<demo-block title="复选框组" desc="使用 m-checkbox-group 管理多个复选框，绑定数组值">
				<m-checkbox-group v-model="groupValue" class="demo-checkbox-group">
					<m-checkbox name="apple">苹果</m-checkbox>
					<m-checkbox name="banana">香蕉</m-checkbox>
					<m-checkbox name="orange">橙子</m-checkbox>
					<m-checkbox name="grape">葡萄</m-checkbox>
				</m-checkbox-group>
				<view class="demo-checkbox-value">
					<text>当前选中：{{ groupValue.join(', ') || '无' }}</text>
				</view>
			</demo-block>

			<!-- 水平布局 -->
			<demo-block title="水平布局" desc="设置 direction='horizontal' 使复选框水平排列">
				<m-checkbox-group v-model="horizontalValue" direction="horizontal" class="demo-checkbox-group">
					<m-checkbox name="option1">选项一</m-checkbox>
					<m-checkbox name="option2">选项二</m-checkbox>
					<m-checkbox name="option3">选项三</m-checkbox>
				</m-checkbox-group>
			</demo-block>

			<!-- 不同形状 -->
			<demo-block title="不同形状" desc="支持 square（默认）、circle、dot 三种形状">
				<view class="demo-checkbox-row">
					<m-checkbox v-model="shapeValue1">方形（默认）</m-checkbox>
				</view>
				<view class="demo-checkbox-row">
					<m-checkbox v-model="shapeValue2" type="circle">圆形</m-checkbox>
				</view>
				<view class="demo-checkbox-row">
					<m-checkbox v-model="shapeValue3" type="dot">点状</m-checkbox>
				</view>
			</demo-block>

			<!-- 按钮模式 -->
			<demo-block title="按钮模式" desc="设置 type='button' 使用按钮样式的复选框">
				<m-checkbox-group v-model="buttonValue" type="button" direction="horizontal" class="demo-checkbox-group">
					<m-checkbox name="btn1">选项一</m-checkbox>
					<m-checkbox name="btn2">选项二</m-checkbox>
					<m-checkbox name="btn3">选项三</m-checkbox>
				</m-checkbox-group>
			</demo-block>

			<!-- 文字位置 -->
			<demo-block title="文字位置" desc="设置 placement='right' 将文字放在图标右侧">
				<view class="demo-checkbox-row">
					<m-checkbox v-model="placementValue" placement="right">文字在右侧</m-checkbox>
				</view>
			</demo-block>

			<!-- 禁用状态 -->
			<demo-block title="禁用状态" desc="设置 disabled 属性禁用复选框">
				<view class="demo-checkbox-row">
					<m-checkbox v-model="disabledValue1" disabled>禁用状态（未选中）</m-checkbox>
				</view>
				<view class="demo-checkbox-row">
					<m-checkbox v-model="disabledValue2" disabled>禁用状态（已选中）</m-checkbox>
				</view>
			</demo-block>

			<!-- 组内禁用 -->
			<demo-block title="组内禁用" desc="在 checkbox-group 中禁用某个选项">
				<m-checkbox-group v-model="groupDisabledValue" class="demo-checkbox-group">
					<m-checkbox name="a">选项A</m-checkbox>
					<m-checkbox name="b" disabled>选项B（禁用）</m-checkbox>
					<m-checkbox name="c">选项C</m-checkbox>
				</m-checkbox-group>
			</demo-block>

			<!-- 限制选中数量 -->
			<demo-block title="限制选中数量" desc="通过 min 和 max 属性限制选中数量">
				<m-checkbox-group v-model="limitValue" :min="1" :max="2" class="demo-checkbox-group">
					<m-checkbox name="minmax1">至少选1个，最多选2个</m-checkbox>
					<m-checkbox name="minmax2">选项二</m-checkbox>
					<m-checkbox name="minmax3">选项三</m-checkbox>
				</m-checkbox-group>
				<view class="demo-checkbox-value">
					<text>已选 {{ limitValue.length }} 个（限制：1~2个）</text>
				</view>
			</demo-block>

			<!-- 自定义颜色 -->
			<demo-block title="自定义颜色" desc="通过 checked-color 设置选中颜色">
				<view class="demo-checkbox-row">
					<m-checkbox v-model="colorValue1" checked-color="#ff6b6b">红色主题</m-checkbox>
				</view>
				<view class="demo-checkbox-row">
					<m-checkbox v-model="colorValue2" checked-color="#10b981">绿色主题</m-checkbox>
				</view>
			</demo-block>

			<!-- 组内自定义颜色 -->
			<demo-block title="组内自定义颜色" desc="在 checkbox-group 上统一设置选中颜色">
				<m-checkbox-group v-model="groupColorValue" checked-color="#8b5cf6" class="demo-checkbox-group">
					<m-checkbox name="purple1">紫色主题选项一</m-checkbox>
					<m-checkbox name="purple2">紫色主题选项二</m-checkbox>
					<m-checkbox name="purple3">紫色主题选项三</m-checkbox>
				</m-checkbox-group>
			</demo-block>

			<!-- 不确定状态 -->
			<demo-block title="不确定状态" desc="设置 indeterminate 属性显示半选状态">
				<view class="demo-checkbox-row">
					<m-checkbox v-model="indeterminateValue" :indeterminate="showIndeterminate">全选</m-checkbox>
				</view>
				<view class="demo-checkbox-group">
					<m-checkbox v-model="subValue1" name="sub1">子选项一</m-checkbox>
					<m-checkbox v-model="subValue2" name="sub2">子选项二</m-checkbox>
					<m-checkbox v-model="subValue3" name="sub3">子选项三</m-checkbox>
				</view>
				<view class="demo-checkbox-value">
					<text>全选状态：{{ showIndeterminate ? '半选' : (indeterminateValue ? '全选' : '未选') }}</text>
				</view>
			</demo-block>

			<!-- 事件监听 -->
			<demo-block title="事件监听" desc="监听 change 事件获取选中状态变化">
				<view class="demo-checkbox-row">
					<m-checkbox v-model="eventValue" @change="handleChange">点击触发事件</m-checkbox>
				</view>
				<view class="demo-checkbox-events">
					<text>{{ eventLog }}</text>
				</view>
			</demo-block>

			<!-- toggleAll 方法 -->
			<demo-block title="toggleAll 方法" desc="通过 ref 调用 toggleAll 方法全选/取消全选">
				<m-checkbox-group v-model="toggleAllValue" ref="checkboxGroupRef" class="demo-checkbox-group">
					<m-checkbox name="all1">选项一</m-checkbox>
					<m-checkbox name="all2">选项二</m-checkbox>
					<m-checkbox name="all3">选项三</m-checkbox>
				</m-checkbox-group>
				<view class="demo-checkbox-actions">
					<m-button size="small" @click="handleToggleAll(true)">全选</m-button>
					<m-button size="small" @click="handleToggleAll(false)">取消全选</m-button>
					<m-button size="small" @click="handleToggleAll()">反选</m-button>
				</view>
			</demo-block>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const basicValue = ref(false)
const customValue = ref('no')
const groupValue = ref(['apple', 'orange'])
const horizontalValue = ref([])
const shapeValue1 = ref(true)
const shapeValue2 = ref(false)
const shapeValue3 = ref(false)
const buttonValue = ref(['btn1'])
const placementValue = ref(true)
const disabledValue1 = ref(false)
const disabledValue2 = ref(true)
const groupDisabledValue = ref(['a'])
const limitValue = ref(['minmax1'])
const colorValue1 = ref(true)
const colorValue2 = ref(true)
const groupColorValue = ref(['purple1', 'purple3'])
const indeterminateValue = ref(false)
const showIndeterminate = ref(true)
const subValue1 = ref(true)
const subValue2 = ref(false)
const subValue3 = ref(true)
const eventValue = ref(false)
const eventLog = ref('')
const toggleAllValue = ref([])

const checkboxGroupRef = ref()

watch([subValue1, subValue2, subValue3], () => {
  const checkedCount = [subValue1.value, subValue2.value, subValue3.value].filter(Boolean).length
  if (checkedCount === 0) {
    indeterminateValue.value = false
    showIndeterminate.value = false
  } else if (checkedCount === 3) {
    indeterminateValue.value = true
    showIndeterminate.value = false
  } else {
    indeterminateValue.value = false
    showIndeterminate.value = true
  }
})

function handleChange({ value }: { value: boolean }) {
  eventLog.value = `change: ${value}`
}

function handleToggleAll(checked?: boolean) {
  if (checked !== undefined) {
    checkboxGroupRef.value?.toggleAll(checked)
  } else {
    checkboxGroupRef.value?.toggleAll()
  }
}
</script>

<style lang="scss" scoped>
.m-checkbox-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-checkbox-row {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
	padding: 16rpx;
}

.demo-checkbox-group {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
	padding: 16rpx;
}

.demo-checkbox-value {
	margin-top: 16rpx;
	padding: 12rpx 16rpx;
	background: #f0f2f5;
	border-radius: 4px;
	font-size: 24rpx;
	color: #666;
}

.demo-checkbox-events {
	margin-top: 16rpx;
	padding: 12rpx 16rpx;
	background: #e8f5e9;
	border-radius: 4px;
	font-size: 24rpx;
	color: #388e3c;
}

.demo-checkbox-actions {
	margin-top: 16rpx;
	display: flex;
	gap: 16rpx;
}
</style>