<template>
  <view :class="`m-steps ${customClass} ${vertical ? 'is-vertical' : ''}`" :style="customStyle">
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-steps',
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
import { useChildren } from '../composables/useChildren'
import { STEPS_KEY, stepsProps } from './types'

const props = defineProps(stepsProps)

const { linkChildren } = useChildren(STEPS_KEY)

linkChildren({ props })
</script>
<style lang="scss">
@use './index.scss';
</style>