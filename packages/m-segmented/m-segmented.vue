<template>
  <view :class="`m-segmented ${theme ? `m-segmented--${theme}` : ''} ${customClass}`" :style="customStyle">
    <view
      :class="`m-segmented__item ${state.activeIndex === index ? 'is-active' : ''} ${
        disabled || (isObj(option) ? option.disabled : false) ? 'is-disabled' : ''
      }`"
      @click="handleClick(option, index)"
      v-for="(option, index) in options"
      :key="index"
    >
      <view class="m-segmented__item-label">
        <slot name="label" v-if="$slots.label" :option="isObj(option) ? option : { value: option }"></slot>
        <template v-else>
          {{ isObj(option) ? option.value : option }}
        </template>
      </view>
    </view>
    <view :class="`m-segmented__slider ${activeDisabled ? 'is-disabled' : ''}`" :style="state.activeStyle" v-if="theme === 'card'"></view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-segmented',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, watch } from 'vue'
import { getRect, isObj, objToStyle, addUnit, pause, isEqual } from '../common/util'
import type { CSSProperties } from 'vue'
import { segmentedProps, type SegmentedExpose, type SegmentedOption } from './types'

const $item = '.m-segmented__item'

const props = defineProps(segmentedProps)
const emit = defineEmits(['update:value', 'change', 'click'])

const state = reactive({
  activeIndex: 0,
  activeStyle: ''
})

const activeDisabled = computed(() => {
  return props.disabled || (props.options[0] && isObj(props.options[0]) ? props.options[0].disabled : false)
})

watch(
  () => props.value,
  () => {
    updateCurrentIndex()
    updateActiveStyle()
    if (props.vibrateShort) {
      uni.vibrateShort({})
    }
  },
  {
    immediate: false
  }
)

const { proxy } = getCurrentInstance() as any

onMounted(async () => {
  updateCurrentIndex()
  await pause()
  updateActiveStyle(false)
})

function updateActiveStyle(animation: boolean = true) {
  if (props.theme === 'outline') {
    return
  }

  getRect($item, true, proxy).then((rects) => {
    const rect = rects[state.activeIndex]
    const style: CSSProperties = {
      position: 'absolute',
      width: addUnit(rect.width!),
      'z-index': 0
    }
    const left = rects.slice(0, state.activeIndex).reduce((prev, curr) => prev + Number(curr.width), 0)
    if (left) {
      style.transform = `translateX(${left}px)`
    }
    if (animation) {
      style.transition = 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)'
    }
    state.activeStyle = objToStyle(style)
  })
}

function updateValue(newValue: string | number, option: string | number | SegmentedOption) {
  if (!isEqual(newValue, props.value)) {
    emit('update:value', newValue)
    emit('change', isObj(option) ? option : { value: newValue })
  }
}

function updateCurrentIndex() {
  const index = props.options.findIndex((option: string | number | SegmentedOption) => {
    const value = isObj(option) ? option.value : option
    return isEqual(value, props.value)
  })
  if (index >= 0) {
    state.activeIndex = index
  } else {
    const value = isObj(props.options[0]) ? props.options[0].value : props.options[0]
    updateValue(value, props.options[0])
  }
}

function handleClick(option: string | number | SegmentedOption, index: number) {
  const disabled = props.disabled || (isObj(option) ? option.disabled : false)
  if (disabled) {
    return
  }
  const value = isObj(option) ? option.value : option

  state.activeIndex = index
  updateActiveStyle()
  updateValue(value, option)
  emit('click', isObj(option) ? option : { value })
}

defineExpose<SegmentedExpose>({
  updateActiveStyle
})
</script>

<style lang="scss">
@use './index.scss';
</style>
