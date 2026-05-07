<template>
	<view class="m-form-demo">
		<view class="m-form-demo__container">
			<!-- 基础表单 -->
			<demo-block title="基础表单" desc="包含用户名、密码和邮箱的基础表单，点击提交按钮触发校验">
				<view class="demo-form-wrapper">
					<m-form ref="formRef" :model="formData" :schema="formSchema">
						<m-form-item prop="username" title="用户名">
							<m-input v-model="formData.username" placeholder="请输入用户名" />
						</m-form-item>
						
						<m-form-item prop="password" title="密码">
							<m-input v-model="formData.password" type="password" placeholder="请输入密码" />
						</m-form-item>
						
						<m-form-item prop="email" title="邮箱">
							<m-input v-model="formData.email" type="email" placeholder="请输入邮箱" />
						</m-form-item>
					</m-form>
					
					<view class="demo-form-actions">
						<m-button type="primary" @click="handleSubmit">提交</m-button>
						<m-button type="default" @click="handleReset">重置</m-button>
					</view>
				</view>
			</demo-block>
			
			<!-- 表单数据展示 -->
			<demo-block title="表单数据" desc="实时显示表单数据变化">
				<view class="demo-form-data">
					<text class="demo-form-data__label">当前表单数据：</text>
					<view class="demo-form-data__content">
						<text>{{ JSON.stringify(formData, null, 2) }}</text>
					</view>
				</view>
			</demo-block>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 表单引用
const formRef = ref(null);

// 表单数据
const formData = reactive({
	username: '',
	password: '',
	email: ''
});

// 表单校验规则
const formSchema = {
	validate: (model) => {
		const errors = [];
		
		if (!model.username || model.username.trim() === '') {
			errors.push({
				path: ['username'],
				message: '请输入用户名'
			});
		} else if (model.username.length < 3) {
			errors.push({
				path: ['username'],
				message: '用户名长度不能少于3个字符'
			});
		}
		
		if (!model.password || model.password.trim() === '') {
			errors.push({
				path: ['password'],
				message: '请输入密码'
			});
		} else if (model.password.length < 6) {
			errors.push({
				path: ['password'],
				message: '密码长度不能少于6个字符'
			});
		}
		
		if (!model.email || model.email.trim() === '') {
			errors.push({
				path: ['email'],
				message: '请输入邮箱'
			});
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(model.email)) {
			errors.push({
				path: ['email'],
				message: '请输入有效的邮箱地址'
			});
		}
		
		return errors;
	},
	isRequired: (path) => {
		return ['username', 'password', 'email'].includes(path);
	}
};

// 提交表单
async function handleSubmit() {
	if (formRef.value) {
		const result = await formRef.value.validate();
		if (result.valid) {
			uni.showToast({
				title: '表单校验通过',
				icon: 'success'
			});
			console.log('表单数据:', formData);
		} else {
			console.log('校验失败:', result.errors);
		}
	}
}

// 重置表单
function handleReset() {
	formData.username = '';
	formData.password = '';
	formData.email = '';
	if (formRef.value) {
		formRef.value.reset();
	}
}
</script>

<style lang="scss" scoped>
.m-form-demo {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px 0;

	&__container {
		max-width: 600px;
		margin: 0 auto;
		padding: 0 20px;
	}
}

.demo-form-wrapper {
	background: #ffffff;
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.demo-form-actions {
	display: flex;
	gap: 16px;
	margin-top: 30px;
	
	:deep(.m-button) {
		flex: 1;
	}
}

.demo-form-data {
	background: #f8f9fa;
	border-radius: 8px;
	padding: 16px;
	
	&__label {
		font-size: 14px;
		color: #666;
		margin-bottom: 8px;
		display: block;
	}
	
	&__content {
		background: #ffffff;
		border-radius: 4px;
		padding: 12px;
		font-family: monospace;
		font-size: 13px;
		color: #333;
		white-space: pre-wrap;
		word-break: break-all;
	}
}
</style>