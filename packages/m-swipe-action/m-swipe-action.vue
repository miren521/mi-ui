<template>
  <view
    :class="`m-swipe-action ${customClass}`"
    :style="customStyle"
    @click.stop="handleClick()"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <view class="m-swipe-action__wrapper" :style="wrapperStyle">
      <view class="m-swipe-action__left" @click.stop="handleClick('left')">
        <slot name="left" />
      </view>
      <slot />
      <view class="m-swipe-action__right" @click.stop="handleClick('right')">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-swipe-action',
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
import { getCurrentInstance, inject, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { callInterceptor } from '../common/interceptor'
import { closeOther, pushToQueue, removeFromQueue } from '../common/clickoutside'
import { type Queue, queueKey } from '../composables/useQueue'
import { useTouch } from '../composables/useTouch'
import { getRect } from '../common/util'
import {
  swipeActionProps,
  type SwipeActionEmits,
  type SwipeActionExpose,
  type SwipeActionPosition,
  type SwipeActionReason,
  type SwipeActionStatus
} from './types'

const props = defineProps(swipeActionProps)
const emit = defineEmits<SwipeActionEmits>()

const queue = inject<Queue | null>(queueKey, null)

const wrapperStyle = ref<string>('')
const originOffset = ref<number>(0)
const wrapperOffset = ref<number>(0)
const touching = ref<boolean>(false)

const touch = useTouch()

const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (value, old) => {
    changeState(value, old)
  },
  {
    deep: true
  }
)

onBeforeMount(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy)
  } else {
    pushToQueue(proxy)
  }
  originOffset.value = 0
  wrapperOffset.value = 0
  touching.value = false
})

onMounted(() => {
  touching.value = true
  changeState(props.modelValue)
  touching.value = false
})

onBeforeUnmount(() => {
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy)
  } else {
    removeFromQueue(proxy)
  }
})

function changeState(value: SwipeActionStatus, old?: SwipeActionStatus) {
  if (props.disabled) {
    return
  }
  getWidths().then(([leftWidth, rightWidth]) => {
    switch (value) {
      case 'close':
        if (wrapperOffset.value === 0) return
        close('value', old)
        break
      case 'left':
        swipeMove(leftWidth)
        break
      case 'right':
        swipeMove(-rightWidth)
        break
    }
  })
}

function getWidths(): Promise<[number, number]> {
  return Promise.all([
    getRect('.m-swipe-action__left', false, proxy).then((rect) => {
      return rect.width ? rect.width : 0
    }),
    getRect('.m-swipe-action__right', false, proxy).then((rect) => {
      return rect.width ? rect.width : 0
    })
  ])
}

function swipeMove(offset = 0) {
  const transform = `translate3d(${offset}px, 0, 0)`
  const transition = touching.value ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'
  wrapperStyle.value = `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `
  wrapperOffset.value = offset
}

function handleClick(position?: SwipeActionPosition) {
  if (props.disabled || wrapperOffset.value === 0) {
    return
  }

  const clickPosition = position || 'inside'
  close('click', clickPosition, () => {
    emit('click', {
      value: clickPosition
    })
  })
}

function startDrag(event: TouchEvent) {
  if (props.disabled) return

  originOffset.value = wrapperOffset.value
  touch.touchStart(event)
  if (queue && queue.closeOther) {
    queue.closeOther(proxy)
  } else {
    closeOther(proxy)
  }
}

function onDrag(event: TouchEvent) {
  if (props.disabled) return

  touch.touchMove(event)
  if (touch.direction.value === 'vertical') {
    return
  } else {
    event.preventDefault()
    event.stopPropagation()
  }

  touching.value = true

  const offset = originOffset.value + touch.deltaX.value
  getWidths().then(([leftWidth, rightWidth]) => {
    if ((leftWidth === 0 && offset > 0) || (rightWidth === 0 && offset < 0)) {
      swipeMove(0)
      return startDrag(event)
    }
    if (leftWidth !== 0 && offset >= leftWidth) {
      swipeMove(leftWidth)
      return startDrag(event)
    } else if (rightWidth !== 0 && -offset >= rightWidth) {
      swipeMove(-rightWidth)
      return startDrag(event)
    }
    swipeMove(offset)
  })
}

function endDrag() {
  if (props.disabled) return
  const THRESHOLD = 0.3
  touching.value = false

  getWidths().then(([leftWidth, rightWidth]) => {
    if (
      originOffset.value < 0 &&
      wrapperOffset.value < 0 &&
      wrapperOffset.value - originOffset.value < rightWidth * THRESHOLD
    ) {
      swipeMove(-rightWidth)
      emit('update:modelValue', 'right')
    } else if (
      originOffset.value > 0 &&
      wrapperOffset.value > 0 &&
      originOffset.value - wrapperOffset.value < leftWidth * THRESHOLD
    ) {
      swipeMove(leftWidth)
      emit('update:modelValue', 'left')
    } else if (
      rightWidth > 0 &&
      originOffset.value >= 0 &&
      wrapperOffset.value < 0 &&
      Math.abs(wrapperOffset.value) > rightWidth * THRESHOLD
    ) {
      swipeMove(-rightWidth)
      emit('update:modelValue', 'right')
    } else if (
      leftWidth > 0 &&
      originOffset.value <= 0 &&
      wrapperOffset.value > 0 &&
      Math.abs(wrapperOffset.value) > leftWidth * THRESHOLD
    ) {
      swipeMove(leftWidth)
      emit('update:modelValue', 'left')
    } else {
      close('swipe')
    }
  })
}

function close(reason: SwipeActionReason, position?: SwipeActionPosition, afterClose?: () => void) {
  if (reason === 'swipe' && originOffset.value === 0) {
    return swipeMove(0)
  }

  let closePosition = position

  if (reason === 'swipe' && originOffset.value > 0) {
    closePosition = 'left'
  } else if (reason === 'swipe' && originOffset.value < 0) {
    closePosition = 'right'
  }

  const doClose = () => {
    swipeMove(0)
    if (props.modelValue !== 'close') {
      emit('update:modelValue', 'close')
    }
    afterClose?.()
  }

  if (reason && closePosition) {
    callInterceptor(props.beforeClose, {
      args: [reason, closePosition],
      done: doClose
    })
  } else {
    doClose()
  }
}

defineExpose<SwipeActionExpose>({ close })
</script>
<style lang="scss">
@use './index.scss';
</style>