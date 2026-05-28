<template>
  <view class="m-index-bar" :id="indexBarId">
    <!-- #ifdef MP-DINGTALK -->
    <view class="m-index-bar" :id="indexBarId">
      <!-- #endif -->
      <scroll-view :scrollTop="scrollState.scrollTop" :scroll-y="true" class="m-index-bar__content" @scroll="handleScroll">
        <slot></slot>
      </scroll-view>
      <view v-if="scrollState.touching" class="m-index-bar__current-index">{{ state.activeIndex }}</view>
      <view
        class="m-index-bar__sidebar"
        @touchstart.stop.prevent="handleTouchStart"
        @touchmove.stop.prevent="handleTouchMove"
        @touchend.stop.prevent="handleTouchEnd"
        @touchcancel.stop.prevent="handleTouchEnd"
      >
        <view class="m-index-bar__index" :class="{ 'is-active': item.index === state.activeIndex }" v-for="item in children" :key="item.index">
          {{ item.index }}
        </view>
      </view>
      <!-- #ifdef MP-DINGTALK -->
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import type { AnchorIndex } from './types'
import { indexBarInjectionKey, indexBarProps } from './types'
import { ref, getCurrentInstance, onMounted, reactive, nextTick, watch } from 'vue'
import { getRect, isDef, uuid, pause } from '../common/util'
import { useChildren } from '../composables/useChildren'

const props = defineProps(indexBarProps)

const indexBarId = ref<string>(`indexBar${uuid()}`)

const { proxy } = getCurrentInstance()!

const state = reactive({
  activeIndex: null as AnchorIndex | null
})

const { linkChildren, children } = useChildren(indexBarInjectionKey)

linkChildren({ props, anchorState: state })

watch(
  () => children,
  (newValue) => {
    if (!newValue.length) {
      state.activeIndex = null
      return
    }

    if (!isDef(state.activeIndex) || !newValue.find((item) => item.index === state.activeIndex)) {
      state.activeIndex = newValue[0].index
    }
  },
  { deep: true, immediate: true }
)

const scrollState = reactive({
  scrollTop: 0,
  prevScrollTop: 0,
  touching: false
})

let offsetTop = 0
let sidebarInfo = {
  offsetTop: 0,
  indexHeight: 24
}

function init() {
  setTimeout(() => {
    Promise.all([
      getRect(`#${indexBarId.value}`, false, proxy),
      getRect('.m-index-bar__sidebar', false, proxy),
      getRect('.m-index-bar__index', false, proxy)
    ]).then(([bar, sidebar, index]) => {
      offsetTop = bar.top!
      sidebarInfo.offsetTop = sidebar.top!
      sidebarInfo.indexHeight = index.height!
    })
  }, 100)
}

onMounted(() => {
  init()
})

function handleScroll(scrollEvent: any) {
  if (scrollState.touching) {
    return
  }
  const { detail } = scrollEvent
  const scrolltop = Math.floor(detail.scrollTop)
  const anchor = children.find((item, index) => {
    if (!isDef(children[index + 1])) return true
    if (item.$.exposed!.top.value - offsetTop <= scrolltop && children[index + 1].$.exposed!.top.value - offsetTop > scrolltop) return true
    return false
  })
  if (isDef(anchor) && state.activeIndex !== anchor.index) {
    state.activeIndex = anchor.index
  }
  scrollState.prevScrollTop = scrolltop
}

function getAnchorByPageY(pageY: number) {
  const y = pageY - sidebarInfo.offsetTop
  let idx = Math.floor(y / sidebarInfo.indexHeight)
  if (idx < 0) idx = 0
  else if (idx > children.length - 1) idx = children.length - 1
  return children[idx]
}

function handleTouchStart() {
  scrollState.touching = true
}

function handleTouchMove(e: TouchEvent) {
  const clientY = e.touches[0].pageY
  if (state.activeIndex === getAnchorByPageY(clientY).index) {
    return
  }
  state.activeIndex = getAnchorByPageY(clientY).index
  setScrollTop(getAnchorByPageY(clientY).$.exposed!.top.value - offsetTop)
}

async function handleTouchEnd(e: TouchEvent) {
  const clientY = e.changedTouches[0].pageY
  state.activeIndex = getAnchorByPageY(clientY).index
  setScrollTop(getAnchorByPageY(clientY).$.exposed!.top.value - offsetTop)
  await pause()
  scrollState.touching = false
}

function setScrollTop(top: number) {
  if (scrollState.scrollTop === top) {
    scrollState.scrollTop = scrollState.prevScrollTop
    nextTick(() => {
      scrollState.scrollTop = top
    })
  } else {
    scrollState.scrollTop = top
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
