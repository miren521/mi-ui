<template>
  <view :class="rootClass">
    <slot name="prefix">
      <m-text custom-class="m-count-to__separator-text" :type="type" :color="color" :text="prefix"></m-text>
    </slot>
    <slot :current="slotData">
      <m-text custom-class="m-count-to__main-text" :type="type" :color="color" :text="timeText"></m-text>
    </slot>
    <slot name="suffix">
      <m-text custom-class="m-count-to__separator-text" :type="type" :color="color" :text="suffix"></m-text>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-count-to',
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
import mText from '../m-text/m-text.vue'
import { computed, watch, onMounted } from 'vue'
import { countToProps, type CountToExpose } from './types'
import { easingFn, isNumber } from '../../wot-ui/common/util'
import { useCountDown } from '../../wot-ui/composables/useCountDown'

const props = defineProps(countToProps)
const emit = defineEmits(['mounted', 'finish'])

const { start, pause, reset, current } = useCountDown({
  time: props.duration,
  millisecond: true,
  onFinish: () => emit('finish')
})

const rootClass = computed(() => {
  return `m-count-to ${props.customClass}`
})

function calculateCurrentVal(remain: number): number {
  const { startVal, endVal, duration, useEasing } = props
  const progress = duration - remain
  const isPositive = startVal > endVal
  const progressRatio = progress / duration

  let currentVal: number

  if (useEasing) {
    if (isPositive) {
      currentVal = startVal - easingFn(progress, 0, startVal - endVal, duration) || 0
    } else {
      currentVal = easingFn(progress, startVal, endVal - startVal, duration)
    }
  } else {
    if (isPositive) {
      currentVal = startVal - (startVal - endVal) * progressRatio
    } else {
      currentVal = startVal + (endVal - startVal) * progressRatio
    }
  }
  return isPositive ? Math.max(endVal, currentVal) : Math.min(endVal, currentVal)
}

const currentValue = computed(() => {
  return calculateCurrentVal(current.value.total)
})

const slotData = computed(() => {
  return {
    total: currentValue.value,
    formatted: formatNumber(currentValue.value)
  }
})

const timeText = computed(() => {
  return formatNumber(currentValue.value)
})

watch([() => props.startVal, () => props.endVal, () => props.duration], resetTime, { immediate: false })

onMounted(() => {
  resetTime()
  emit('mounted')
})

function resetTime() {
  reset(props.duration)
  if (props.autoStart) {
    start()
  }
}

function formatNumber(num: any): string {
  if (typeof num !== 'number') {
    num = parseFloat(num)
    if (isNaN(num)) {
      return '0'
    }
  }
  num = num.toFixed(props.decimals)
  const parts = num.split('.')
  let integerPart = parts[0]
  const decimalPart = parts.length > 1 ? props.decimal + parts[1] : ''
  const rgx = /(\d+)(\d{3})/

  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(integerPart)) {
      integerPart = integerPart.replace(rgx, '$1' + props.separator + '$2')
    }
  }
  return integerPart + decimalPart
}

defineExpose<CountToExpose>({ start, reset: resetTime, pause })
</script>

<style lang="scss">
@use './index.scss';
</style>