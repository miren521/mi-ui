<template>
	<view class="m-textarea-demo">
		<view class="m-textarea-demo__container">
			<!-- 基础用法 -->
			<demo-block title="基础用法" desc="最简单的文本域使用场景">
				<view class="demo-textarea-row">
					<m-textarea v-model="basicValue" placeholder="请输入内容" />
				</view>
				<view class="demo-textarea-value">
					<text>当前值：{{ basicValue }}</text>
				</view>
			</demo-block>

			<!-- 禁用状态 -->
			<demo-block title="禁用状态" desc="设置 disabled 属性禁用文本域，无法进行任何操作">
				<view class="demo-textarea-row">
					<m-textarea v-model="disabledValue" disabled placeholder="禁用状态" />
				</view>
			</demo-block>

			<!-- 只读状态 -->
			<demo-block title="只读状态" desc="设置 readonly 属性为只读，可以滚动查看但无法编辑">
				<view class="demo-textarea-row">
					<m-textarea v-model="readonlyValue" readonly placeholder="只读状态" />
				</view>
			</demo-block>

			<!-- 字数统计 -->
			<demo-block title="字数统计" desc="设置 show-word-limit 属性显示当前输入字数，需配合 maxlength 使用">
				<view class="demo-textarea-row">
					<m-textarea v-model="limitValue" :maxlength="100" show-word-limit placeholder="最多输入100个字" />
				</view>
			</demo-block>

			<!-- 固定行数 -->
			<demo-block title="固定行数" desc="通过 rows 属性设置固定行数（rows=3）">
				<view class="demo-textarea-row">
					<m-textarea v-model="rowsValue" :rows="3" placeholder="固定3行高度" />
				</view>
			</demo-block>

			<!-- 自适应高度 -->
			<demo-block title="自适应高度" desc="设置 auto-height 属性使文本域高度随内容自动调整">
				<view class="demo-textarea-row">
					<m-textarea v-model="autoHeightValue" auto-height placeholder="输入内容会自动增高" />
				</view>
			</demo-block>

			<!-- 自动适应（带范围） -->
			<demo-block title="自动适应高度（范围）" desc="通过 auto-size 设置最小和最大行数限制">
				<view class="demo-textarea-row">
					<m-textarea v-model="autoSizeValue" :auto-size="{ minRows: 2, maxRows: 5 }" placeholder="最少2行，最多5行" />
				</view>
			</demo-block>

			<!-- 可清除 -->
			<demo-block title="可清除" desc="设置 clearable 属性显示清除按钮，点击可清空内容">
				<view class="demo-textarea-row">
					<m-textarea v-model="clearableValue" clearable placeholder="输入内容后可清除" />
				</view>
			</demo-block>

			<!-- 错误状态 -->
			<demo-block title="错误状态" desc="设置 error 属性显示错误样式（红色文字）">
				<view class="demo-textarea-row">
					<m-textarea v-model="errorValue" error placeholder="输入错误内容" />
				</view>
			</demo-block>

			<!-- 紧凑模式 -->
			<demo-block title="紧凑模式" desc="设置 compact 属性使用紧凑布局，无背景色和内边距，适合表单场景">
				<view class="demo-textarea-row">
					<m-textarea v-model="compactValue" compact placeholder="紧凑模式文本域" />
				</view>
			</demo-block>

			<!-- 边框模式 -->
			<demo-block title="边框模式" desc="设置 border 属性显示边框，白色背景">
				<view class="demo-textarea-row border-demo">
					<m-textarea v-model="borderValue" border placeholder="带边框的文本域" />
				</view>
			</demo-block>

			<!-- 边框模式 + 自适应 -->
			<demo-block title="边框模式 + 自适应" desc="边框模式结合 auto-size 使用">
				<view class="demo-textarea-row border-demo">
					<m-textarea v-model="borderAutoSizeValue" border :auto-size="{ minRows: 2, maxRows: 4 }" placeholder="边框模式 + 自适应高度" />
				</view>
			</demo-block>

			<!-- 使用 m-form 的表单场景 -->
			<demo-block title="表单场景（m-form）" desc="使用 m-form 和 m-form-item 组件构建表单">
				<m-form :model="formData" class="demo-form" :title-width="60">
					<m-form-item prop="username" title="用户名">
						<m-input v-model="formData.username" placeholder="请输入用户名" clearable />
					</m-form-item>
					<m-form-item prop="content" title="内容">
						<m-textarea v-model="formData.content" :maxlength="200" show-word-limit :auto-size="{ minRows: 3, maxRows: 6 }" placeholder="请输入内容（3-6行自动适应）" />
					</m-form-item>
					<m-form-item prop="remark" title="备注">
						<m-textarea v-model="formData.remark" placeholder="请输入备注（选填）" />
					</m-form-item>
				</m-form>
			</demo-block>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const basicValue = ref('');
const disabledValue = ref('禁用状态的内容');
const readonlyValue = ref('这是只读的内容，无法编辑');
const limitValue = ref('');
const rowsValue = ref('');
const autoHeightValue = ref('');
const autoSizeValue = ref('');
const autoSizeNoLimitValue = ref('');
const clearableValue = ref('可清除的文本内容');
const errorValue = ref('');
const compactValue = ref('');
const borderValue = ref('');
const borderAutoSizeValue = ref('');

const formData = reactive({
	username: '',
	content: '',
	remark: ''
});
</script>

<style lang="scss" scoped>
.m-textarea-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-textarea-row {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;

	&.border-demo {
		background: transparent;
		padding: 16rpx;
	}
}

.demo-textarea-value {
	margin-top: 16rpx;
	padding: 12rpx 16rpx;
	background: #f0f2f5;
	border-radius: 4px;
	font-size: 24rpx;
	color: #666;
}

.demo-form {
}
</style>