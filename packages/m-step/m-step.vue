<template>
  <view :class="rootClass">
    <view class="m-step__main">
      <view :class="`m-step__icon-wrap ${dot ? 'm-step__icon-wrap--dot' : ''}`">
        <view :class="`m-step__icon m-step__icon--${currentStatus}`">
          <text v-if="currentStatus === 'finished'" class="m-step__icon-inner">✓</text>
          <text v-else-if="currentStatus === 'error'" class="m-step__icon-inner">✕</text>
          <text v-else class="m-step__icon-num">{{ realIndex + 1 }}</text>
        </view>
      </view>
      <view v-if="realIndex < childrenLength - 1" class="m-step__line"></view>
    </view>
    <view class="m-step__content" v-if="title || description">
      <text class="m-step__title">{{ title || `步骤${realIndex + 1}` }}</text>
      <text v-if="description" class="m-step__description">{{ description }}</text>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-step',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useParent } from '../composables/useParent'
import { STEPS_KEY } from '../m-steps/types'
import { stepProps, type StepStatus } from '../m-steps/types'

const props = defineProps(stepProps)

const { parent: steps, index } = useParent(STEPS_KEY)

const realIndex = computed(() => {
  return index.value >= 0 ? index.value : 0
})

const currentStatus = computed<StepStatus | string>(() => {
  if (props.status) {
    return props.status
  }
  
  if (steps.value && steps.value.props) {
    const active = Number(steps.value.props.active)
    if (active > realIndex.value) {
      return 'finished'
    } else if (active === realIndex.value) {
      return 'process'
    }
  }
  return 'wait'
})

const dot = computed(() => {
  return steps.value && steps.value.props && steps.value.props.dot
})

const childrenLength = computed(() => {
  return steps.value ? steps.value.children.length : 0
})

const isVertical = computed(() => {
  return steps.value && steps.value.props && steps.value.props.vertical
})

const rootClass = computed(() => {
  const classes = ['m-step']
  if (isVertical.value) classes.push('m-step--vertical')
  if (steps.value && steps.value.props && steps.value.props.alignCenter && !isVertical.value) {
    classes.push('m-step--center')
  }
  return classes.join(' ')
})
</script>

<style lang="scss" scoped>
.m-step {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &--vertical {
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 32rpx;

    &:last-child {
      padding-bottom: 0;
    }

    .m-step__main {
      flex-direction: column;
      align-items: flex-start;
      margin-right: 16rpx;
      margin-bottom: 0;
    }

    .m-step__line {
      width: 4rpx;
      height: calc(100% - 56rpx);
      top: 56rpx;
      left: 26rpx;
      transform: none;
    }

    .m-step__content {
      flex: 1;
      text-align: left;
      margin-top: 0;
    }
  }

  &--center {
    flex: none;
    margin: 0 24rpx;
  }

  &__main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56rpx;
    margin-bottom: 8rpx;
  }

  &__icon-wrap {
    position: relative;
    z-index: 1;
    flex-shrink: 0;

    &--dot {
      .m-step__icon {
        width: 24rpx;
        height: 24rpx;
      }
    }
  }

  &__icon {
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    font-weight: 600;
    transition: all 0.3s ease;

    &--wait {
      background-color: #e8e8e8;
      color: #999999;
    }

    &--process {
      background-color: #1c64fd;
      color: #ffffff;
    }

    &--finished {
      background-color: #e5edff;
      color: #1c64fd;
    }

    &--error {
      background-color: #f14646;
      color: #ffffff;
    }
  }

  &--dot &__icon {
    &--process {
      background-color: #1c64fd;
      box-shadow: 0 0 0 4rpx rgba(28, 100, 253, 0.3);
    }

    &--finished {
      background-color: #b8cfff;
      border: 4rpx solid #1c64fd;
    }
  }

  &__icon-inner {
    font-size: 28rpx;
    font-weight: bold;
  }

  &__icon-num {
    font-size: 28rpx;
    font-weight: 600;
  }

  &__line {
    position: absolute;
    left: 56rpx;
    top: 26rpx;
    right: 0;
    height: 4rpx;
    background-color: #e8e8e8;
    transition: all 0.3s ease;
  }

  &--finished &__line {
    background-color: #1c64fd;
  }

  &__content {
    text-align: center;
    padding: 0 8rpx;
  }

  &__title {
    font-size: 28rpx;
    line-height: 40rpx;
    font-weight: 500;
    color: #666666;
    display: block;
    transition: all 0.3s ease;
  }

  &--process &__title {
    color: #1c64fd;
    font-weight: 600;
  }

  &--finished &__title {
    color: #333333;
  }

  &--error &__title {
    color: #f14646;
  }

  &__description {
    font-size: 24rpx;
    line-height: 36rpx;
    font-weight: 400;
    color: #999999;
    display: block;
    margin-top: 4rpx;
  }
}
</style>
