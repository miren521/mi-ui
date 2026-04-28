<template>
  <view class="page">
    <view class="page-content">
      <demo-block title="基本用法">
        <view class="demo-steps-row">
          <m-steps :active="0">
            <m-step title="步骤1" />
            <m-step title="步骤2" />
            <m-step title="步骤3" />
          </m-steps>
        </view>
      </demo-block>

      <demo-block title="标题和描述信息">
        <view class="demo-steps-row">
          <m-steps :active="active" align-center>
            <m-step title="步骤1" description="注册1个账号" />
            <m-step title="步骤2" description="登录账号并绑定手机" />
            <m-step title="步骤3" description="完善个人信息" />
          </m-steps>
        </view>
        <view class="demo-steps-button">
          <m-button size="small" @click="nextStep">下一步</m-button>
        </view>
      </demo-block>

      <demo-block title="组件状态">
        <view class="demo-steps-row">
          <m-steps :active="1" align-center>
            <m-step title="绑定手机" />
            <m-step title="重新绑定手机" status="error" />
            <m-step title="步骤3" />
          </m-steps>
        </view>
      </demo-block>

      <demo-block title="水平居中">
        <view class="demo-steps-row">
          <m-steps :active="0" align-center>
            <m-step title="步骤1" />
            <m-step title="步骤2" />
            <m-step title="步骤3" />
          </m-steps>
        </view>
      </demo-block>

      <demo-block title="竖向步骤条">
        <view class="demo-steps-row">
          <m-steps :active="1" vertical>
            <m-step title="步骤1" description="注册1个账号" />
            <m-step title="步骤2" description="登录账号并绑定手机" />
            <m-step title="步骤3" description="完善个人信息" />
          </m-steps>
        </view>
      </demo-block>

      <demo-block title="点状步骤条">
        <view class="demo-steps-row">
          <m-steps :active="1" align-center dot>
            <m-step title="步骤1" description="注册1个账号" />
            <m-step title="步骤2" description="登录账号并绑定手机" />
            <m-step title="步骤3" description="完善个人信息" />
          </m-steps>
        </view>
      </demo-block>

      <demo-block title="可控制的点状步骤条">
        <view class="demo-steps-row">
          <m-steps :active="dotActive" align-center dot>
            <m-step title="步骤1" description="注册一个账号" />
            <m-step title="步骤2" description="登录账号并绑定手机" />
            <m-step title="步骤3" description="完善个人信息" />
          </m-steps>
        </view>
        <view class="demo-steps-button">
          <m-button size="small" @click="nextDotStep">下一步</m-button>
        </view>
      </demo-block>

      <demo-block title="竖向点状步骤条">
        <view class="demo-steps-row">
          <m-steps :active="1" vertical dot>
            <m-step title="步骤1" description="注册1个账号" />
            <m-step title="步骤2" description="登录账号并绑定手机" />
            <m-step title="步骤3" description="完善个人信息" />
          </m-steps>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
const dotActive = ref(0)

const nextStep = () => {
  if (active.value < 2) {
    active.value += 1
  } else {
    active.value = 0
  }
}

const nextDotStep = () => {
  if (dotActive.value < 2) {
    dotActive.value += 1
  } else {
    dotActive.value = 0
  }
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background-color: #f5f6fa;
}

.page-content {
  padding: 24rpx;
}

.demo-steps-row {
  margin-bottom: 24rpx;
  padding: 24rpx;
  background-color: #fff;
  border-radius: 16rpx;
}

.demo-steps-button {
  display: flex;
  justify-content: center;
  margin-top: 24rpx;
}
</style>
