<template>
  <m-transition :show="show" name="fade">
    <view
      :class="`m-backtop ${customClass} is-${shape} is-${effect}`"
      :style="`z-index: ${zIndex}; bottom: ${bottom}px; right: ${right}px; ${customStyle}`"
      @click="handleBacktop"
    >
      <slot>
        <view class="m-backtop__content">
          <m-icon custom-class="m-backtop__backicon" name="to-top" :color="color" />
          <text class="m-backtop__text" :style="{ color: color }" v-if="text">{{ text }}</text>
        </view>
      </slot>
    </view>
  </m-transition>
</template>

<script lang="ts">
export default {
  name: 'm-backtop',
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
import mTransition from '../m-transition/m-transition.vue'
import mIcon from '../m-icon/m-icon.vue'
import { backtopProps } from './types'

const props = defineProps(backtopProps)
const emit = defineEmits(['click'])

/**
 * 是否显示回到顶部按钮
 */
const show = computed(() => props.scrollTop > props.top)

/**
 * 处理点击回到顶部
 */
function handleBacktop() {
  emit('click')
  uni.pageScrollTo({
    scrollTop: 0,
    duration: props.duration
  })
}
</script>

<style lang="scss">
@use './index.scss';
</style>