<template>
  <m-transition
    :show="show"
    name="fade"
    :custom-class="`m-overlay ${customClass}`"
    :duration="duration"
    :custom-style="`z-index: ${zIndex}; ${customStyle}`"
    :disable-touch-move="lockScroll"
    @before-enter="emit('before-enter')"
    @enter="emit('enter')"
    @after-enter="emit('after-enter')"
    @before-leave="emit('before-leave')"
    @leave="emit('leave')"
    @after-leave="emit('after-leave')"
    @click="handleClick"
  >
    <slot></slot>
  </m-transition>
</template>

<script lang="ts">
export default {
  name: 'm-overlay',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import MTransition from '../m-transition/m-transition.vue'
import { overlayProps } from './types'

const props = defineProps(overlayProps)

const emit = defineEmits(['click', 'before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave'])

function handleClick() {
  emit('click')
}
</script>

<style lang="scss">
@import './index.scss';
</style>