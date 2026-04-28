<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-steps',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useChildren } from '../composables/useChildren'
import { STEPS_KEY, stepsProps } from './types'

const props = defineProps(stepsProps)

const { linkChildren } = useChildren(STEPS_KEY)

linkChildren({ props })

const rootClass = computed(() => {
  return `m-steps ${props.vertical ? 'm-steps--vertical' : ''}`
})
</script>

<style lang="scss" scoped>
.m-steps {
  position: relative;
  display: flex;
  width: 100%;
  box-sizing: border-box;

  &--vertical {
    flex-direction: column;
  }
}
</style>
