<template>
  <view :class="`m-key-wrapper ${wider ? 'm-key-wrapper--wider' : ''}`" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <view :class="keyClass">
      <m-loading custom-class="m-key__loading-icon" v-if="props.loading" />
      <template v-if="type === 'delete'">
        <template v-if="text">
          {{ text }}
        </template>
        <m-icon v-else custom-class="m-key__icon" name="del" size="22px"></m-icon>
      </template>
      <template v-else-if="type === 'extra'">
        <template v-if="text">
          {{ text }}
        </template>
        <m-icon v-else custom-class="m-key__icon" name="keyboard" size="22px"></m-icon>
      </template>
      <template v-else>{{ text }}</template>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-key',
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
import { computed, ref } from 'vue'
import { useTouch } from '../../composables/useTouch'
import { keyProps } from './types'

const props = defineProps(keyProps)
const emit = defineEmits(['press'])

const touch = useTouch()
const active = ref<boolean>(false)

const keyClass = computed(() => {
  return `m-key ${props.large ? 'm-key--large' : ''} ${props.type === 'delete' ? 'm-key--delete' : ''} ${
    props.type === 'close' ? 'm-key--close' : ''
  } ${props.isCar ? 'is-car' : ''} ${active.value ? 'm-key--active' : ''}`
})

/**
 * 触摸开始事件处理
 * @param {TouchEvent} event 触摸事件对象
 */
function onTouchStart(event: TouchEvent) {
  touch.touchStart(event)
  active.value = true
}

/**
 * 触摸移动事件处理
 * @param {TouchEvent} event 触摸事件对象
 */
function onTouchMove(event: TouchEvent) {
  touch.touchMove(event)
  if (touch.direction.value) {
    active.value = false
  }
}

/**
 * 触摸结束事件处理
 */
function onTouchEnd() {
  if (active.value) {
    active.value = false
    emit('press', props.text, props.type)
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>