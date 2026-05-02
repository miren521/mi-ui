<template>
  <view style="position: relative">
    <view :class="`m-sticky-box ${props.customClass}`" :style="customStyle" :id="stickyBoxId">
      <m-resize @resize="handleResize">
        <slot />
      </m-resize>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-sticky-box',
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import mResize from '../m-resize/m-resize.vue'
import { getCurrentInstance, onBeforeMount, reactive, ref } from 'vue'
import { getRect, uuid } from '../common/util'
import { baseProps } from '../common/props'
import { STICKY_BOX_KEY } from './types'
import { useChildren } from '../composables/useChildren'

const props = defineProps(baseProps)

const stickyBoxId = ref<string>(`m-sticky-box${uuid()}`)

const observerMap = ref<Map<any, any>>(new Map())

const boxStyle = reactive({
  height: 0,
  width: 0
})

const { proxy } = getCurrentInstance() as any

const { children: stickyList, linkChildren } = useChildren(STICKY_BOX_KEY)
linkChildren({
  boxStyle: boxStyle,
  observerForChild
})

onBeforeMount(() => {
  observerMap.value = new Map()
})

function handleResize(detail: any) {
  boxStyle.width = detail.width
  boxStyle.height = detail.height

  const temp = observerMap.value
  observerMap.value = new Map()
  for (const [uid] of temp) {
    const child = stickyList.find((sticky) => {
      return sticky.$.uid === uid
    })
    observerForChild(child)
  }
  temp.forEach((observer) => {
    observer.disconnect()
  })
  temp.clear()
}

function deleteObserver(child: any) {
  const observer = observerMap.value.get(child.$.uid)
  if (!observer) return
  observer.disconnect()
  observerMap.value.delete(child.$.uid)
}

function createObserver(child: any) {
  const observer = uni.createIntersectionObserver(proxy, { thresholds: [0, 0.5] })
  observerMap.value.set(child.$.uid, observer)
  return observer
}

function observerForChild(child: any) {
  deleteObserver(child)
  const observer = createObserver(child)
  const exposed = child.$.exposed
  let offset = exposed.stickyState.height + exposed.offsetTop
  // #ifdef H5
  // H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
  // H5的导航栏高度为44px
  offset = offset + 44
  // #endif

  if (boxStyle.height <= exposed.stickyState.height) {
    exposed.setPosition(false, 'absolute', 0)
  }
  observer.relativeToViewport({ top: -offset }).observe(`#${stickyBoxId.value}`, (result) => {
    handleRelativeTo(exposed, result)
  })
  // 当子组件默认处于边界外且永远不会进入边界内时，需要手动调用一次
  getRect(`#${stickyBoxId.value}`, false, proxy)
    .then((res) => {
      // #ifdef H5
      // H5端，查询节点信息未计算导航栏高度
      res.bottom = Number(res.bottom) + 44
      // #endif
      if (Number(res.bottom) <= offset) handleRelativeTo(exposed, { boundingClientRect: res })
    })
    .catch((res) => {
      console.log(res)
    })
}

function handleRelativeTo(exposed: any, { boundingClientRect }: any) {
  let childOffsetTop = exposed.offsetTop
  // #ifdef H5
  // H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
  // H5的导航栏高度为44px
  childOffsetTop = childOffsetTop + 44
  // #endif
  const offset = exposed.stickyState.height + childOffsetTop
  let isAbsolute = boundingClientRect.bottom <= offset
  // #ifdef H5 || APP-PLUS
  isAbsolute = boundingClientRect.bottom < offset
  // #endif
  if (isAbsolute) {
    exposed.setPosition(true, 'absolute', boundingClientRect.height - exposed.stickyState.height)
  } else if (boundingClientRect.top <= offset && !isAbsolute) {
    if (exposed.stickyState.state === 'normal') return
    exposed.setPosition(false, 'fixed', childOffsetTop)
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
