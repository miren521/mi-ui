<template>
  <view class="m-demo-block">
    <view class="m-demo-block__header">
      <h2 class="m-demo-block__title">{{ title }}</h2>
      <p v-if="desc" class="m-demo-block__desc">{{ desc }}</p>
    </view>
    <view class="m-demo-block__content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
interface DemoBlockProps {
  title: string
  desc?: string
}

const props = defineProps<DemoBlockProps>()
</script>

<style lang="scss" scoped>
@import '../style/index.scss';
</style>