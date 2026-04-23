<template>
  <view class="m-cell-demo">
    <view class="m-cell-demo__container">
      <!-- 基础用法 -->
      <view class="demo-cell-group">
        <m-cell-group title="个人信息">
          <m-cell title="姓名" value="张三" />
          <m-cell title="手机号" value="138****5678" />
          <m-cell title="地址" value="北京市朝阳区" />
          <m-cell title="邮箱" value="zhan@example.com" />
        </m-cell-group>
      </view>

      <!-- 带图标 -->

      <view class="demo-cell-group">
        <m-cell-group title="显示图标" value="左侧显示图标">
          <m-cell title="个人资料" value="查看" icon="user" is-link />
          <m-cell title="消息通知" value="3条" icon="chat" is-link />
          <m-cell title="设置" value="" icon="setting" is-link />
          <m-cell title="帮助中心" value="" icon="help-circle" is-link />
        </m-cell-group>
      </view>

      <!-- 带描述 -->
      <view class="demo-cell-group">
        <m-cell-group title="带描述">
          <m-cell title="会员等级" value="VIP会员" label="有效期至：2024-12-31" />
          <m-cell title="积分余额" value="1280" label="可用于兑换商品" />
          <m-cell title="优惠券" value="5张" label="即将过期：2张" />
        </m-cell-group>
      </view>

      <!-- 卡片模式 -->
      <view style="margin-bottom: 20px;">
        <m-cell-group title="卡片模式" insert>
          <m-cell title="订单编号" value="20240423123456" />
          <m-cell title="订单金额" value="¥199.00" />
          <m-cell title="下单时间" value="2024-04-23 10:30" />
          <m-cell title="订单状态" value="已完成" />
        </m-cell-group>
      </view>

      <!-- 点击事件 -->
      <view class="demo-cell-group">
        <m-cell-group title="点击事件" value="展示点击反馈和事件处理">
          <m-cell title="点击反馈" value="点击我" clickable @click="handleClick('点击反馈')" />
          <m-cell title="链接跳转" value="查看详情" is-link to="/examples/pages/button-demo" />
          <m-cell title="自定义点击" value="触发事件" is-link @click="handleClick('自定义点击')" />
        </m-cell-group>
      </view>


      <!-- 自定义插槽 -->
      <view class="demo-cell-group">
        <m-cell-group title="自定义插槽" value="使用插槽自定义内容">
          <m-cell>
            <template #title>
              <view class="custom-title">
                <m-icon name="star" size="30rpx" color="#f0c14b" />
                <text style="margin-left: 12rpx;">自定义标题</text>
              </view>
            </template>
            <template #default>
              <!-- <m-switch v-model="switchValue" /> -->
            </template>
          </m-cell>
          <m-cell title="自定义右侧">
            <template #default>
              <m-button size="small" type="primary">操作</m-button>
            </template>
          </m-cell>
          <m-cell title="自定义图标">
            <template #icon>
              <view class="custom-icon">
                <text style="font-size: 24rpx; color: #4d80f0;">🎯</text>
              </view>
            </template>
            <template #default>
              <text>使用 emoji 作为图标</text>
            </template>
          </m-cell>
        </m-cell-group>

      </view>

      <!-- 其他属性 -->
      <view class="demo-cell-group">
        <m-cell-group title="其他属性" value="展示 size、center、required 等属性">
          <m-cell title="大号单元格" value="Large Size" size="large" />
          <m-cell title="居中对齐" value="Center Align" center />
          <m-cell title="必填项" value="" required />
          <m-cell title="多行文本" value="这是一段很长的文本内容，用于测试单元格的省略功能" ellipsis />
        </m-cell-group>
      </view>

      <!-- 垂直布局 -->
      <view class="demo-cell-group">
        <m-cell-group title="垂直布局" value="使用 vertical 属性展示垂直布局">
          <m-cell title="商品名称" value="iPhone 15 Pro 256GB" vertical>
            <template #label>
              <text>钛金属 自然色</text>
            </template>
          </m-cell>
          <m-cell title="商品价格" value="¥9999.00" vertical>
            <template #label>
              <text>优惠价：¥9499.00</text>
            </template>
          </m-cell>
        </m-cell-group>
      </view>

    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(false)

function handleClick(type) {
  uni.showToast({
    title: `点击了：${type}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.m-cell-demo {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx 0;

  &__container {
    max-width: 1200rpx;
    margin: 0 auto;
    padding: 0 32rpx;
  }
}

.demo-cell-group {
  background-color: #fff;
  overflow: hidden;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.custom-title {
  display: flex;
  align-items: center;
}

.custom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
}
</style>