<template>
  <view :class="`m-navbar-capsule ${customClass}`" :style="customStyle">
    <m-icon @click="handleBack" name="left" custom-class="m-navbar-capsule__icon" />
    <m-icon @click="handleBackHome" name="home" custom-class="m-navbar-capsule__icon" />
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-navbar-capsule',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import mIcon from '../m-icon/m-icon.vue'
import { navbarCapsuleProps } from './types'

defineProps(navbarCapsuleProps)

const emit = defineEmits(['back', 'back-home'])

function handleBack() {
  emit('back')
}

function handleBackHome() {
  emit('back-home')
}
</script>

<style lang="scss">
@use './index.scss';
</style>