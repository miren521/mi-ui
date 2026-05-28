<template>
  <m-transition :show="show" name="fade">
    <view
      :class="`m-backtop ${customClass} is-${shape}`"
      :style="`z-index: ${zIndex}; bottom: ${bottom}px; right: ${right}px; ${customStyle}`"
      @click="handleBacktop"
    >
      <slot>
        <view class="m-backtop__content">
          <m-icon custom-class="m-backtop__backicon" name="to-top" :custom-style="iconStyle" />
          <text class="m-backtop__text" v-if="text">{{ text }}</text>
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
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import mTransition from '../m-transition/m-transition.vue'
import mIcon from '../m-icon/m-icon.vue'
import { backtopProps } from './types'

const props = defineProps(backtopProps)
const emit = defineEmits(['update:scrollTop', 'click'])

const currentScrollTop = ref(props.scrollTop || 0)

watch(() => props.scrollTop, (val) => {
  if (val !== undefined && val !== null) {
    currentScrollTop.value = val
  }
})

const show = computed(() => {
  const scrollVal = props.scrollTop !== undefined && props.scrollTop !== null 
    ? props.scrollTop 
    : currentScrollTop.value
  return scrollVal > props.top
})

function handleBacktop() {
  emit('click')
  uni.pageScrollTo({
    scrollTop: 0,
    duration: props.duration
  })
}

function updateScrollTop(val: number) {
  if (props.scrollTop === undefined || props.scrollTop === null) {
    currentScrollTop.value = val
  }
  emit('update:scrollTop', val)
}

function handleWindowScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  updateScrollTop(scrollTop)
}

function handlePageScroll(e: any) {
  updateScrollTop(e.scrollTop)
}

onMounted(() => {
  // #ifdef H5
  window.addEventListener('scroll', handleWindowScroll, { passive: true })
  // #endif
  // #ifndef H5
  uni.$on('pageScroll', handlePageScroll)
  // #endif
})

onUnmounted(() => {
  // #ifdef H5
  window.removeEventListener('scroll', handleWindowScroll)
  // #endif
  // #ifndef H5
  uni.$off('pageScroll', handlePageScroll)
  // #endif
})

defineExpose({ updateScrollTop })
</script>

<style lang="scss">
@use './index.scss';
</style>