<template>
  <view :class="`m-loading m-loading--${direction} ${customClass}`" :style="rootStyle">
    <view :class="`m-loading__spinner m-loading__spinner--${type} ${customSpinnerClass}`" :style="spinnerStyle">
      <template v-if="type === 'circular'">
        <view class="m-loading__spinner-wraper"></view>
      </template>
      <template v-if="type === 'spinner'">
        <view class="m-loading__spinner-wraper">
          <view class="m-loading__spinner-dot" v-for="i in dots" :key="i"></view>
        </view>
      </template>
      <template v-else-if="type === 'dots'">
        <view class="m-loading__spinner-wraper">
          <view class="m-loading__spinner-dot" v-for="i in 3" :key="i"></view>
        </view>
      </template>
      <template v-else-if="type === 'wave'">
        <view class="m-loading__spinner-wraper">
          <view class="m-loading__spinner-wave-bar" v-for="i in 4" :key="i">
            <view class="m-loading__spinner-wave-bar-inner"></view>
          </view>
        </view>
      </template>
      <template v-else-if="type === 'pulse'">
        <view class="m-loading__spinner-wraper">
          <view class="m-loading__spinner-pulse-dot" v-for="i in 2" :key="i"></view>
        </view>
      </template>
      <template v-else-if="type === 'sync'">
        <view class="m-loading__spinner-wraper">
          <view class="m-loading__spinner-sync-dot" v-for="i in 2" :key="i"></view>
        </view>
      </template>
    </view>
    <view class="m-loading__text" v-if="$slots.default || text">
      <slot>{{ text }}</slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-loading',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import { objToStyle, addUnit, isDef } from '../common/util'
import { loadingProps } from './types'

const props = defineProps(loadingProps)

const dots = Array.from({ length: 12 }, (_, i) => i)

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.color)) {
    style.color = props.color
  }
  if (props.inheritColor) {
    style.color = 'inherit'
  }
  return `${objToStyle(style)} ${props.customStyle}`
})

const spinnerStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.size)) {
    style.height = addUnit(props.size)
    style.width = addUnit(props.size)
  }
  return objToStyle(style)
})
</script>

<style lang="scss">
@import './index.scss';
</style>