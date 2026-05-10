<template>
  <template v-if="showControls">
    <view class="m-swiper-nav__btn m-swiper-nav__btn--prev" @click="handleNav('prev')">
      <m-icon name="left" custom-class="m-swiper-nav__btn-icon" color="#fff" size="18"></m-icon>
    </view>
    <view class="m-swiper-nav__btn m-swiper-nav__btn--next" @click="handleNav('next')">
      <m-icon name="right" custom-class="m-swiper-nav__btn-icon" color="#fff" size="18"></m-icon>
    </view>
  </template>
  <view
    v-if="total >= minShowNum"
    :style="customStyle"
    :class="`m-swiper-nav m-swiper-nav--${direction} m-swiper-nav--${type} m-swiper-nav--${indicatorPosition} ${customClass}`"
  >
    <block v-if="type === 'dots' || type === 'dots-bar'">
      <view
        v-for="(_, index) in total"
        :key="index"
        :class="`m-swiper-nav__item--${type} ${current === index ? 'is-active' : ''} is-${direction}`"
      ></view>
    </block>
    <block v-if="type === 'fraction'">{{ current + 1 }}/{{ total }}</block>
  </view>
</template>

<script lang="ts" setup>
import { swiperNavProps } from './types'
import MIcon from '../m-icon/m-icon.vue'

defineProps(swiperNavProps)

const emit = defineEmits(['change'])

function handleNav(dir: 'prev' | 'next') {
  const source: string = 'nav'
  emit('change', { dir, source })
}
</script>

<style lang="scss">
@import './index.scss';
</style>