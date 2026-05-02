<template>
  <view :style="`${rootStyle};display: inline-block;`">
    <view :class="`m-sticky ${customClass}`" :style="stickyStyle" :id="stickyId">
      <view class="m-sticky__container" :style="containerStyle">
        <m-resize @resize="handleResize" custom-style="display: inline-block;">
          <slot />
        </m-resize>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-sticky',
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import mResize from '../m-resize/m-resize.vue'
import { computed, getCurrentInstance, reactive, ref, type CSSProperties } from 'vue'
import { addUnit, getRect, objToStyle, pause, uuid } from '../common/util'
import { stickyProps } from './types'
import { useParent } from '../composables/useParent'
import { STICKY_BOX_KEY } from '../m-sticky-box/types'

const props = defineProps(stickyProps)
const stickyId = ref<string>(`m-sticky${uuid()}`)
const observerList = ref<UniApp.IntersectionObserver[]>([])

const stickyState = reactive({
  position: 'absolute',
  boxLeaved: false,
  top: 0,
  height: 0,
  width: 0,
  state: ''
})

const { parent: stickyBox } = useParent(STICKY_BOX_KEY)

const { proxy } = getCurrentInstance() as any

const rootStyle = computed(() => {
  const style: CSSProperties = {
    'z-index': props.zIndex,
    height: addUnit(stickyState.height),
    width: addUnit(stickyState.width)
  }
  if (!stickyState.boxLeaved) {
    style['position'] = 'relative'
  }
  return `${objToStyle(style)}${props.customStyle}`
})

const stickyStyle = computed(() => {
  const style: CSSProperties = {
    'z-index': props.zIndex,
    height: addUnit(stickyState.height),
    width: addUnit(stickyState.width)
  }
  if (!stickyState.boxLeaved) {
    style['position'] = 'relative'
  }
  return `${objToStyle(style)}`
})

const containerStyle = computed(() => {
  const style: CSSProperties = {
    position: stickyState.position as 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed',
    top: addUnit(stickyState.top)
  }
  return objToStyle(style)
})

const innerOffsetTop = computed(() => {
  let top: number = 0
  // #ifdef H5
  // H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
  // H5的导航栏高度为44px
  top = 44
  // #endif

  return top + props.offsetTop
})

function clearObserver() {
  while (observerList.value.length !== 0) {
    observerList.value.pop()!.disconnect()
  }
}

function createObserver() {
  const observer = uni.createIntersectionObserver(proxy, { thresholds: [0, 0.5] })
  observerList.value.push(observer)
  return observer
}

async function handleResize(detail: any) {
  stickyState.width = detail.width
  stickyState.height = detail.height
  await pause()
  observerContentScroll()
  if (!stickyBox || !stickyBox.observerForChild) return
  stickyBox.observerForChild(proxy)
}

function observerContentScroll() {
  if (stickyState.height === 0 && stickyState.width === 0) return
  const offset = innerOffsetTop.value + stickyState.height
  clearObserver()
  createObserver()
    .relativeToViewport({
      top: -offset
    })
    .observe(`#${stickyId.value}`, (result) => {
      handleRelativeTo(result)
    })
  getRect(`#${stickyId.value}`, false, proxy).then((res) => {
    // #ifdef H5
    // H5端，查询节点信息未计算导航栏高度
    res.bottom = Number(res.bottom) + 44
    // #endif
    if (Number(res.bottom) <= offset) handleRelativeTo({ boundingClientRect: res })
  })
}

function handleRelativeTo({ boundingClientRect }: any) {
  // sticky 高度大于或等于 m-sticky-box，使用 m-sticky-box 无任何意义
  if (stickyBox && stickyBox.boxStyle && stickyState.height >= stickyBox.boxStyle.height) {
    stickyState.position = 'absolute'
    stickyState.top = 0
    return
  }

  let isSticky = boundingClientRect.top <= innerOffsetTop.value
  // #ifdef H5 || APP-PLUS
  isSticky = boundingClientRect.top < innerOffsetTop.value
  // #endif

  if (isSticky) {
    stickyState.state = 'sticky'
    stickyState.boxLeaved = false
    stickyState.position = 'fixed'
    stickyState.top = innerOffsetTop.value
  } else {
    stickyState.state = 'normal'
    stickyState.boxLeaved = false
    stickyState.position = 'absolute'
    stickyState.top = 0
  }
}

function setPosition(boxLeaved: boolean, position: string, top: number) {
  stickyState.boxLeaved = boxLeaved
  stickyState.position = position
  stickyState.top = top
}

defineExpose({
  setPosition,
  stickyState,
  offsetTop: props.offsetTop
})
</script>

<style lang="scss">
@use './index.scss';
</style>
