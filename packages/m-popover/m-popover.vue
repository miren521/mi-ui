<template>
  <view :class="`m-popover ${customClass}`" :style="customStyle" @click.stop>
    <view class="m-popover__pos m-popover__hidden" id="pos">
      <view :class="`m-popover__container ${customPop}`">
        <view v-if="!$slots.content && mode === 'normal'" class="m-popover__inner">
          {{ content }}
        </view>
        <view v-if="!$slots.content && mode === 'menu' && typeof content === 'object'" class="m-popover__menu">
          <view v-for="(item, index) in content" :key="index" class="m-popover__menu-inner" @click="menuClick(index)">
            <m-icon v-if="item.iconClass" :name="item.iconClass" custom-class="m-popover__icon" />
            <text>{{ item.content }}</text>
          </view>
        </view>
      </view>
    </view>
    <m-transition
      custom-class="m-popover__pos"
      :custom-style="popover.popStyle.value"
      :show="showPopover"
      name="fade"
      @after-enter="handleAfterEnter"
    >
      <view ref="popoverContentRef" :class="`m-popover__container ${customPop}`" id="content" @click.stop>
        <view
          v-if="props.visibleArrow"
          :class="`m-popover__arrow ${popover.arrowClass.value} ${customArrow}`"
          :style="popover.arrowStyle.value"
        ></view>
        <slot name="content">
          <!-- 普通模式 -->
          <view v-if="mode === 'normal'" class="m-popover__inner">
            {{ content }}
          </view>
          <!-- 列表模式 -->
          <view v-if="mode === 'menu'" class="m-popover__menu">
            <view
              v-for="(item, index) in content"
              :key="index"
              :class="['m-popover__menu-inner', index === 0 ? 'is-first' : '']"
              @click="menuClick(index)"
            >
              <m-icon v-if="isObj(item) && item.iconClass" :name="item.iconClass" custom-class="m-popover__menu-icon" />
              <view class="m-popover__text">{{ isObj(item) && item.content ? item.content : '' }}</view>
            </view>
          </view>
        </slot>

        <m-icon v-if="showClose" name="close" custom-class="m-popover__close-icon" @click="toggle"></m-icon>
      </view>
    </m-transition>
    <view ref="targetRef" @click="toggle" class="m-popover__target" id="target">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-popover',
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
import mTransition from '../m-transition/m-transition.vue'
import { getCurrentInstance, inject, onBeforeMount, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import { usePopover } from '../composables/usePopover'
import { closeOther, pushToQueue, removeFromQueue } from '../common/clickoutside'
import { useQueue, queueKey } from '../composables/useQueue'
import type { Queue } from '../composables/useQueue'
import { popoverProps, type PopoverExpose } from './types'
import { isArray, isObj } from '../common/util'

const props = defineProps(popoverProps)
const emit = defineEmits(['update:modelValue', 'menuclick', 'change', 'open', 'close'])

const queue = inject<Queue | null>(queueKey, null)
const selector: string = 'popover'
const { proxy } = getCurrentInstance() as any
const popover = usePopover(props.visibleArrow, 'm')

const showPopover = ref<boolean>(false)
const popoverContentRef = ref<HTMLElement | null>(null)
const targetRef = ref<HTMLElement | null>(null)

watch(
  () => props.content,
  (newVal) => {
    const { mode } = props
    if (mode === 'normal' && typeof newVal !== 'string') {
      console.error('The value type must be a string type in normal mode')
    } else if (mode === 'menu' && !isArray(newVal)) {
      console.error('The value type must be a Array type in menu mode')
    }
  }
)

watch(
  () => props.placement,
  () => {
    popover.init(props.placement, props.visibleArrow, selector)
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    showPopover.value = newValue
  }
)

watch(
  () => showPopover.value,
  (newValue) => {
    if (newValue) {
      popover.control(props.placement, props.offset)
      if (queue && queue.closeOther) {
        queue.closeOther(proxy)
      } else {
        closeOther(proxy)
      }
      nextTick(() => {
        document.addEventListener('click', handleDocumentClick)
      })
    } else {
      document.removeEventListener('click', handleDocumentClick)
    }
    popover.showStyle.value = newValue ? 'display: inline-block;' : 'display: none;'
    emit('change', { show: newValue })
    emit(`${newValue ? 'open' : 'close'}`)
  }
)

function handleDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  
  const popoverEl = popoverContentRef.value as unknown as HTMLElement
  const targetEl = targetRef.value as unknown as HTMLElement
  
  const isClickOnPopover = popoverEl && popoverEl.contains && popoverEl.contains(target)
  const isClickOnTarget = targetEl && targetEl.contains && targetEl.contains(target)
  
  if (!isClickOnPopover && !isClickOnTarget) {
    close()
  }
}

onMounted(() => {
  popover.init(props.placement, props.visibleArrow, selector)
})

onBeforeMount(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy)
  } else {
    pushToQueue(proxy)
  }
  popover.showStyle.value = showPopover.value ? 'display: inline-block;' : 'display: none;'
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy)
  } else {
    removeFromQueue(proxy)
  }
})

function menuClick(index: number) {
  updateModelValue(false)
  emit('menuclick', {
    item: (props.content as Array<Record<string, any>>)[index],
    index
  })
}

function toggle() {
  if (props.disabled) return
  updateModelValue(!showPopover.value)
}

function open() {
  updateModelValue(true)
}

function close() {
  updateModelValue(false)
}

function handleAfterEnter() {
  popover.updatePosition(props.placement, props.offset)
}

function updateModelValue(value: boolean) {
  showPopover.value = value
  emit('update:modelValue', value)
}

defineExpose<PopoverExpose>({
  open,
  close,
  updatePosition: () => popover.updatePosition(props.placement, props.offset)
})
</script>
<style lang="scss">
@use './index.scss';
</style>