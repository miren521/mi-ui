<template>
  <view :class="rootClass" :style="[customStyle, { backgroundColor: bgColor }]">
    <slot name="header"></slot>
    <view v-if="title || $slots.title || desc || extra" class="m-card__title" :class="customTitleClass">
      <view class="m-card__title-header">
        <slot name="title">
          <text class="m-card__title-text" v-if="title">{{ title }}</text>
        </slot>
        <slot name="extra">
          <text class="m-card__title-extra" v-if="extra" @click="$emit('click:extra')">{{ extra }}</text>
        </slot>
      </view>
      <text class="m-card__title-desc" v-if="desc">{{ desc }}</text>
    </view>
    <view class="m-card__content" :class="[customContentClass, { 'm-card__content--has-title': title || $slots.title }]">
      <slot></slot>
    </view>
    <view v-if="$slots.footer" class="m-card__footer" :class="customFooterClass">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-card',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { cardProps, cardEmits } from './types'

const props = defineProps(cardProps)
const emit = defineEmits(cardEmits)

const rootClass = computed(() => {
  return `m-card ${props.type ? `m-card--${props.type}` : ''} ${props.customClass}`
})
</script>

<style lang="scss" src="./index.scss"></style>