<template>
  <view :class="`m-swiper ${customClass}`" :style="customStyle">
    <!-- #ifdef MP-WEIXIN -->
    <scroll-view scroll-x scroll-y style="width: 100%; height: 100%">
    <!-- #endif -->
    <swiper
      :adjust-height="adjustHeight"
      :adjust-vertical-height="adjustVerticalHeight"
      class="m-swiper__track"
      :autoplay="autoplay && !videoPlaying"
      :current="navCurrent"
      :interval="interval"
      :duration="duration"
      :circular="loop"
      :vertical="direction == 'vertical'"
      :easing-function="easingFunction"
      :previous-margin="addUnit(previousMargin)"
      :next-margin="addUnit(nextMargin)"
      :snap-to-edge="snapToEdge"
      :display-multiple-items="displayMultipleItems"
      :style="swiperStyle"
      @change="handleChange"
      @animationfinish="handleAnimationfinish"
    >
      <swiper-item v-for="(item, index) in list" :key="index" :class="getSwiperItemClass(index)">
        <slot :item="item" :index="index">
          <video
            v-if="isVideo(item)"
            :id="`video-${index}-${uid}`"
            :style="{ height: addUnit(height) }"
            :src="isObj(item) ? item[valueKey] : item"
            :poster="isObj(item) ? item.poster : ''"
            :class="`m-swiper__video ${customItemClass} ${getCustomItemClass(currentValue, index, list)}`"
            @play="handleVideoPaly"
            @pause="handleVideoPause"
            :enable-progress-gesture="false"
            :loop="videoLoop"
            :muted="muted"
            :autoplay="autoplayVideo"
            objectFit="cover"
            @click="handleClick(index, item)"
          />
          <image
            v-else
            :src="isObj(item) ? item[valueKey] : item"
            :class="`m-swiper__image ${customImageClass} ${getCustomImageClass(currentValue, index, list)}`"
            :style="{ height: addUnit(height) }"
            :mode="imageMode"
            :show-menu-by-longpress="showMenuByLongpress"
            @click="handleClick(index, item)"
          />
          <text v-if="isObj(item) && item[textKey]" :class="`m-swiper__text ${customTextClass}`" :style="customTextStyle">
            {{ item[textKey] }}
          </text>
        </slot>
      </swiper-item>
    </swiper>
    <!-- #ifdef MP-WEIXIN -->
    </scroll-view>
    <!-- #endif -->

    <template v-if="indicator">
      <slot name="indicator" :current="currentValue" :total="list.length"></slot>
      <m-swiper-nav
        v-if="!$slots.indicator"
        :custom-class="customIndicatorClass"
        :type="swiperIndicator.type"
        :current="swiperIndicator.current"
        :total="swiperIndicator.total"
        :direction="swiperIndicator.direction"
        :indicator-position="swiperIndicator.indicatorPosition"
        :min-show-num="swiperIndicator.minShowNum"
        :show-controls="swiperIndicator.showControls"
        @change="handleIndicatorChange"
      />
    </template>
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-swiper',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, watch, ref, getCurrentInstance, useSlots, type CSSProperties } from 'vue'
import { addUnit, isObj, isImageUrl, isVideoUrl, uuid, isDef, objToStyle } from '../common/util'
import { swiperProps, type SwiperItem, type SwiperNavProps } from './types'
import MSwiperNav from '../m-swiper-nav/m-swiper-nav.vue'

const slots = useSlots()

const props = defineProps(swiperProps)
const emit = defineEmits(['click', 'change', 'animationfinish', 'update:current'])
const navCurrent = ref<number>(props.current)
const currentValue = ref<number>(props.current)

const updateCurrent = (current: number, force: boolean = false) => {
  currentValue.value = current
  if (force) {
    navCurrent.value = current
  }
  emit('update:current', current)
}

const videoPlaying = ref<boolean>(false)

const { proxy } = getCurrentInstance() as any

const uid = ref<string>(uuid())

watch(
  () => props.current,
  (val) => {
    if (val < 0) {
      props.loop ? goToEnd() : goToStart()
    } else if (val >= props.list.length) {
      props.loop ? goToStart() : goToEnd()
    } else {
      navTo(val)
    }
  }
)

const swiperStyle = computed(() => {
  const style: CSSProperties = {
    height: addUnit(props.height)
  }

  if (isDef(props.radius)) {
    style.borderRadius = addUnit(props.radius)
  }
  return objToStyle(style)
})

const swiperItemClass = computed(() => {
  return `m-swiper__item ${slots.default ? 'm-swiper__item--slot' : ''}`
})

const getSwiperItemClass = (index: number) => {
  const baseClass = swiperItemClass.value
  const customClass = props.customItemClass || ''
  return `${baseClass} ${customClass}`
}

const swiperIndicator = computed(() => {
  const { list, direction, indicatorPosition, indicator } = props
  const isVertical = direction === 'vertical'
  const swiperIndicator: Partial<SwiperNavProps> = {
    current: currentValue.value || 0,
    total: list.length || 0,
    direction: direction || 'horizontal',
    indicatorPosition: isVertical ? 'right' : (indicatorPosition || 'bottom')
  }
  if (isObj(indicator)) {
    swiperIndicator.type = indicator.type || 'dots'
    swiperIndicator.minShowNum = indicator.minShowNum || 2
    swiperIndicator.showControls = indicator.showControls || false
  }
  return swiperIndicator
})

const getMediaType = (item: string | SwiperItem, type: 'video' | 'image') => {
  const checkType = (url: string) => (type === 'video' ? isVideoUrl(url) : isImageUrl(url))

  if (isObj(item)) {
    return item.type && ['video', 'image'].includes(item.type) ? item.type === type : checkType(item[props.valueKey])
  } else {
    return checkType(item)
  }
}

const isVideo = (item: string | SwiperItem) => {
  return getMediaType(item, 'video')
}

const isImage = (item: string | SwiperItem) => {
  return getMediaType(item, 'image')
}

function navTo(index: number) {
  if (index === currentValue.value) return
  updateCurrent(index, true)
}

function goToStart() {
  navTo(0)
}

function goToEnd() {
  navTo(props.list.length - 1)
}

function handleVideoPaly() {
  props.stopAutoplayWhenVideoPlay && (videoPlaying.value = true)
}

function handleVideoPause() {
  videoPlaying.value = false
}

function isPrev(current: number, index: number, list: string[] | SwiperItem[]) {
  return (current - 1 + list.length) % list.length === index
}

function isNext(current: number, index: number, list: string[] | SwiperItem[]) {
  return (current + 1 + list.length) % list.length === index
}

function getCustomImageClass(current: number, index: number, list: string[] | SwiperItem[]) {
  let customImageClass: string = ''
  if (isPrev(current, index, list)) {
    customImageClass = props.customPrevImageClass || props.customPrevClass
  }
  if (isNext(current, index, list)) {
    customImageClass = props.customNextImageClass || props.customNextClass
  }
  return customImageClass
}

function getCustomItemClass(current: number, index: number, list: string[] | SwiperItem[]) {
  let customItemClass: string = ''
  if (isPrev(current, index, list)) {
    customItemClass = props.customPrevClass || props.customPrevImageClass
  }
  if (isNext(current, index, list)) {
    customItemClass = props.customNextClass || props.customNextImageClass
  }
  return customItemClass
}

function handleChange(e: { detail: { current: number; source: string } }) {
  const { current, source } = e.detail
  const previous = currentValue.value
  emit('change', { current, source })
  if (current !== currentValue.value) {
    const forceUpdate = source === 'autoplay' || source === 'touch'
    updateCurrent(current, forceUpdate)
  }
  handleVideoChange(previous, current)
}

function handleVideoChange(previous: number, current: number) {
  handleStopVideoPaly(previous)
  handleStartVideoPaly(current)
}

function handleStartVideoPaly(index: number) {
  if (props.autoplayVideo) {
    const currentItem = props.list[index]
    if (isDef(currentItem) && isVideo(currentItem)) {
      const video = uni.createVideoContext(`video-${index}-${uid.value}`, proxy)
      video.play()
    }
  }
}

function handleStopVideoPaly(index: number) {
  if (props.stopPreviousVideo) {
    const previousItem = props.list[index]
    if (isDef(previousItem) && isVideo(previousItem)) {
      const video = uni.createVideoContext(`video-${index}-${uid.value}`, proxy)
      video.pause()
    }
  } else if (props.stopAutoplayWhenVideoPlay) {
    handleVideoPause()
  }
}

function handleAnimationfinish(e: { detail: { current: any; source: string } }) {
  const { current, source } = e.detail
  if (current !== currentValue.value) {
    const forceUpdate = source === 'autoplay' || source === 'touch'
    updateCurrent(current, forceUpdate)
  }
  emit('animationfinish', { current, source })
}

function handleClick(index: number, item: string | SwiperItem) {
  emit('click', { index, item })
}

function handleIndicatorChange({ dir }: { dir: 'prev' | 'next' }) {
  const { list, loop } = props
  const total = list.length
  let nextPos = dir === 'next' ? currentValue.value + 1 : currentValue.value - 1
  if (loop) {
    nextPos = dir === 'next' ? (currentValue.value + 1) % total : (currentValue.value - 1 + total) % total
  } else {
    nextPos = nextPos < 0 || nextPos >= total ? currentValue.value : nextPos
  }
  if (nextPos === currentValue.value) return
  navTo(nextPos)
}
</script>

<style lang="scss">
@import './index.scss';
</style>