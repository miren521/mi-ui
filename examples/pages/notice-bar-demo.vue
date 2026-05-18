<template>
  <view class="m-notice-bar-demo">
    <view class="m-notice-bar-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="设置 text 属性显示通知内容">
        <m-notice-bar text="这是一条普通的通知消息，用于展示系统公告或重要信息" />
      </demo-block>

      <!-- 通知类型 -->
      <demo-block title="通知类型" desc="设置 type 属性支持 warning、info、danger 三种类型">
        <m-notice-bar text="警告通知：系统将于今晚22:00进行维护升级" type="warning" />
        <view class="m-notice-bar-demo__spacing"></view>
        <m-notice-bar text="信息通知：您的订单已发货，请及时查收" type="info" />
        <view class="m-notice-bar-demo__spacing"></view>
        <m-notice-bar text="危险通知：账户异常，请立即检查" type="danger" />
      </demo-block>

      <!-- 可关闭 -->
      <demo-block title="可关闭" desc="设置 closable 属性显示关闭按钮">
        <m-notice-bar text="点击右侧按钮可关闭此通知" closable />
      </demo-block>

      <!-- 自定义图标 -->
      <demo-block title="自定义图标" desc="设置 prefix 属性自定义左侧图标">
        <m-notice-bar text="有新消息提醒，请查看" prefix="sound-fill" />
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色" desc="设置 color 和 backgroundColor 属性自定义颜色">
        <m-notice-bar
          text="自定义颜色的通知"
          color="#59CDAAFF"
          backgroundColor="#F3FBF9FF"
        />
      </demo-block>

      <!-- 不滚动 -->
      <demo-block title="不滚动" desc="设置 scrollable=false 禁止滚动，内容超出时显示省略号">
        <m-notice-bar
          text="这是一条很长很长很长很长很长很长很长很长很长的不滚动通知，超出部分会显示省略号"
          :scrollable="false"
        />
      </demo-block>

      <!-- 换行显示 -->
      <demo-block title="换行显示" desc="设置 wrapable=true 允许内容换行显示">
        <m-notice-bar
          text="这是一条支持换行显示的通知消息，当内容超过一行时会自动换行，适合展示较长的文本内容"
          :wrapable="true"
          :scrollable="false"
        />
      </demo-block>

      <!-- 纵向滚动 -->
      <demo-block title="纵向滚动" desc="设置 direction=vertical 实现垂直滚动效果">
        <m-notice-bar
          :text="['第一条通知消息', '第二条通知消息', '第三条通知消息']"
          direction="vertical"
        />
      </demo-block>

      <!-- 自定义滚动速度 -->
      <demo-block title="自定义滚动速度" desc="设置 speed 属性调整滚动速度（px/s）">
        <m-notice-bar
          text="慢速滚动通知，speed=20"
          :speed="20"
        />
        <view class="m-notice-bar-demo__spacing"></view>
        <m-notice-bar
          text="快速滚动通知，speed=100"
          :speed="100"
        />
      </demo-block>

      <!-- 自定义延迟 -->
      <demo-block title="自定义延迟" desc="设置 delay 属性调整滚动延迟时间（秒）">
        <m-notice-bar
          text="延迟3秒后开始滚动"
          :delay="3"
        />
      </demo-block>

      <!-- 自定义插槽 -->
      <demo-block title="自定义插槽" desc="使用 prefix 和 suffix 插槽自定义内容">
        <m-notice-bar>
          <template #prefix>
            <m-icon name="gift" custom-class="m-notice-bar-demo__custom-icon" />
          </template>
          <text>限时优惠：全场商品8折起</text>
          <template #suffix>
            <m-button type="warning" size="small" >立即抢购</m-button>
          </template>
        </m-notice-bar>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mNoticeBar from '../../packages/m-notice-bar/m-notice-bar.vue'
import mIcon from '../../packages/m-icon/m-icon.vue'
import mButton from '../../packages/m-button/m-button.vue'
</script>

<style lang="scss">
.m-notice-bar-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__spacing {
    height: 12px;
  }

  &__custom-icon {
    font-size: 18px;
    color: #ff6b6b;
  }
}
</style>