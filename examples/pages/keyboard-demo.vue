<template>
  <view class="m-keyboard-demo">
    <view class="m-keyboard-demo__container">
      <view class="m-keyboard-demo__header">
        <text class="m-keyboard-demo__title">键盘组件</text>
        <text class="m-keyboard-demo__desc">自定义数字键盘，支持多种模式和配置</text>
      </view>

      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="默认的数字键盘，点击按钮唤起键盘">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ defaultValue || '点击按钮唤起键盘' }}</text>
            <m-button type="primary" size="small" @click="showDefaultKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 带遮罩层 -->
      <demo-block title="带遮罩层" desc="通过 modal 属性开启遮罩层，点击遮罩可关闭键盘">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ modalValue || '点击按钮唤起带遮罩的键盘' }}</text>
            <m-button type="primary" size="small" @click="showModalKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 点击外部关闭 -->
      <demo-block title="点击外部关闭" desc="通过 hide-on-click-outside 属性控制是否点击外部关闭">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ outsideValue || '点击遮罩不会关闭' }}</text>
            <m-button type="primary" size="small" @click="showOutsideKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 自定义键盘 -->
      <demo-block title="自定义键盘" desc="通过 extra-key 属性添加自定义按键（单个）">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ customValue || '点击按钮唤起自定义键盘' }}</text>
            <m-button type="primary" size="small" @click="showCustomKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 两个额外按键 -->
      <demo-block title="两个额外按键" desc="extra-key 传入数组时可添加两个额外按键">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ doubleExtraValue || '点击按钮唤起双额外键键盘' }}</text>
            <m-button type="primary" size="small" @click="showDoubleExtraKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 车牌键盘 -->
      <demo-block title="车牌键盘" desc="用于输入车牌号码，支持省份和字母切换">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ carValue || '点击按钮唤起车牌键盘' }}</text>
            <m-button type="primary" size="small" @click="showCarKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 随机按键顺序 -->
      <demo-block title="随机按键顺序" desc="开启 random-key-order 属性随机打乱按键顺序">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ randomValue || '点击按钮唤起随机键盘' }}</text>
            <m-button type="primary" size="small" @click="showRandomKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 最大长度限制 -->
      <demo-block title="最大长度限制" desc="通过 maxlength 属性限制输入长度">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">
              {{ maxlengthValue || '点击按钮唤起键盘' }}
              <text class="demo-keyboard-length" v-if="maxlengthValue">({{ maxlengthValue.length }}/6)</text>
            </text>
            <m-button type="primary" size="small" @click="showMaxlengthKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 带标题和关闭按钮 -->
      <demo-block title="带标题和关闭按钮" desc="通过 title 和 close-text 属性添加标题和关闭按钮">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ titleValue || '点击按钮唤起带标题的键盘' }}</text>
            <m-button type="primary" size="small" @click="showTitleKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 关闭按钮加载状态 -->
      <demo-block title="关闭按钮加载状态" desc="通过 close-button-loading 属性显示关闭按钮加载状态">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ loadingValue || '点击按钮测试加载状态' }}</text>
            <m-button type="primary" size="small" @click="handleLoadingKeyboard">输入</m-button>
          </view>
        </view>
      </demo-block>

      <!-- 不显示删除键 -->
      <demo-block title="不显示删除键" desc="通过 show-delete-key 属性隐藏删除键">
        <view class="demo-keyboard-row">
          <view class="demo-keyboard-input-wrapper">
            <text class="demo-keyboard-value">{{ noDeleteValue || '点击按钮唤起无删除键键盘' }}</text>
            <m-button type="primary" size="small" @click="showNoDeleteKeyboard = true">输入</m-button>
          </view>
        </view>
      </demo-block>
    </view>

    <!-- 默认键盘 -->
    <m-keyboard
      :visible="showDefaultKeyboard"
      v-model="defaultValue"
      @close="showDefaultKeyboard = false"
    />

    <!-- 带遮罩键盘 -->
    <m-keyboard
      :visible="showModalKeyboard"
      v-model="modalValue"
      modal
      close-text="关闭"
      @close="showModalKeyboard = false"
    />

    <!-- 点击外部不关闭键盘 -->
    <m-keyboard
      :visible="showOutsideKeyboard"
      v-model="outsideValue"
      :hide-on-click-outside="false"
      modal
      close-text="关闭"
      @close="showOutsideKeyboard = false"
    />

    <!-- 自定义键盘 -->
    <m-keyboard
      :visible="showCustomKeyboard"
      v-model="customValue"
      mode="custom"
      extra-key="."
      close-text="确认"
      @close="showCustomKeyboard = false"
    />

    <!-- 两个额外按键键盘 -->
    <m-keyboard
      :visible="showDoubleExtraKeyboard"
      v-model="doubleExtraValue"
      mode="custom"
      :extra-key="['X', 'Y']"
      close-text="确认"
      @close="showDoubleExtraKeyboard = false"
    />

    <!-- 车牌键盘 -->
    <m-keyboard
      :visible="showCarKeyboard"
      v-model="carValue"
      mode="car"
      :maxlength="8"
      :auto-switch-lang="true"
      close-text="确认"
      @close="showCarKeyboard = false"
    />

    <!-- 随机键盘 -->
    <m-keyboard
      :visible="showRandomKeyboard"
      v-model="randomValue"
      :random-key-order="true"
      @close="showRandomKeyboard = false"
    />

    <!-- 最大长度限制键盘 -->
    <m-keyboard
      :visible="showMaxlengthKeyboard"
      v-model="maxlengthValue"
      :maxlength="6"
      @close="showMaxlengthKeyboard = false"
    />

    <!-- 带标题键盘 -->
    <m-keyboard
      :visible="showTitleKeyboard"
      v-model="titleValue"
      title="请输入数字"
      close-text="完成"
      @close="showTitleKeyboard = false"
    />

    <!-- 加载状态键盘 -->
    <m-keyboard
      :visible="showLoadingKeyboard"
      v-model="loadingValue"
      :close-button-loading="closeButtonLoading"
      @close="handleCloseLoading"
    />

    <!-- 无删除键键盘 -->
    <m-keyboard
      :visible="showNoDeleteKeyboard"
      v-model="noDeleteValue"
      :show-delete-key="false"
      @close="showNoDeleteKeyboard = false"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const defaultValue = ref('')
const modalValue = ref('')
const outsideValue = ref('')
const customValue = ref('')
const doubleExtraValue = ref('')
const carValue = ref('')
const randomValue = ref('')
const maxlengthValue = ref('')
const titleValue = ref('')
const loadingValue = ref('')
const noDeleteValue = ref('')

const showDefaultKeyboard = ref(false)
const showModalKeyboard = ref(false)
const showOutsideKeyboard = ref(false)
const showCustomKeyboard = ref(false)
const showDoubleExtraKeyboard = ref(false)
const showCarKeyboard = ref(false)
const showRandomKeyboard = ref(false)
const showMaxlengthKeyboard = ref(false)
const showTitleKeyboard = ref(false)
const showLoadingKeyboard = ref(false)
const showNoDeleteKeyboard = ref(false)

const closeButtonLoading = ref(false)

const handleLoadingKeyboard = () => {
  showLoadingKeyboard.value = true
}

const handleCloseLoading = () => {
  closeButtonLoading.value = true
  setTimeout(() => {
    closeButtonLoading.value = false
    showLoadingKeyboard.value = false
    loadingValue.value = ''
  }, 1500)
}
</script>

<style lang="scss">
.m-keyboard-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 32rpx 0;
}

.m-keyboard-demo__container {
  max-width: 1200rpx;
  margin: 0 auto;
  padding: 0 32rpx;
}

.m-keyboard-demo__header {
  margin-bottom: 40rpx;
}

.m-keyboard-demo__title {
  font-size: 48rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 12rpx;
}

.m-keyboard-demo__desc {
  font-size: 28rpx;
  color: #999;
}

.demo-keyboard-row {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
}

.demo-keyboard-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.demo-keyboard-value {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  padding: 16rpx 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-keyboard-length {
  color: #999;
  font-size: 24rpx;
}
</style>