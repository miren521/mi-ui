<template>
  <view
    :class="`m-input-number m-input-number--${theme} ${customClass} ${disabled ? 'is-disabled' : ''} ${withoutInput ? 'is-without-input' : ''} ${
      round ? 'is-round' : ''
    }`"
    :style="customStyle"
  >
    <view
      :class="`m-input-number__action m-input-number__sub ${minDisabled || disableMinus || loading ? 'is-disabled' : ''} ${loadingType === 'sub' ? 'is-loading' : ''}`"
      @click="handleClick('sub')"
      @touchstart="handleTouchStart('sub')"
      @touchend.stop="handleTouchEnd"
    >
      <view v-if="loadingType !== 'sub'" class="m-input-number__action-divider" />
      <m-icon v-if="loadingType === 'sub'" name="refresh1" class="m-input-number__loading-icon" />
    </view>
    <view v-if="!withoutInput" class="m-input-number__inner" @click.stop="">
      <input
        class="m-input-number__input"
        :style="`${inputWidth ? 'width: ' + inputWidth : ''}`"
        :type="inputType"
        :input-mode="precision ? 'decimal' : 'numeric'"
        :disabled="disabled || disableInput || loading"
        :value="String(inputValue)"
        :placeholder="placeholder"
        :adjust-position="adjustPosition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </view>
    <view
      :class="`m-input-number__action m-input-number__add ${maxDisabled || disablePlus || loading ? 'is-disabled' : ''} ${loadingType === 'add' ? 'is-loading' : ''}`"
      @click="handleClick('add')"
      @touchstart="handleTouchStart('add')"
      @touchend.stop="handleTouchEnd"
    >
      <view v-if="loadingType !== 'add'" class="m-input-number__action-divider" />
      <m-icon v-if="loadingType === 'add'" name="refresh1" class="m-input-number__loading-icon" />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-input-number',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { isDef, isEqual, isFunction, isPromise } from '../common/util'
import { useParent } from '../composables/useParent'
import { inputNumberProps, type OperationType } from './types'
import { FORM_ITEM_VALIDATE_KEY } from '../m-form-item/types'

const props = defineProps(inputNumberProps)
const { parent: formItemValidate } = useParent(FORM_ITEM_VALIDATE_KEY)
const emit = defineEmits<{
  (e: 'change', value: { value: number | string }): void
  (e: 'focus', detail: any): void
  (e: 'blur', value: { value: string | number }): void
  (e: 'update:modelValue', value: number | string): void
}>()
const inputValue = ref<string | number>(getInitValue())
const loading = ref(false)
const loadingType = ref<OperationType | ''>('')
let longPressTimer: ReturnType<typeof setTimeout> | null = null

const minDisabled = computed(() => {
  const val = toNumber(inputValue.value)
  return props.disabled || val <= props.min || addStep(val, -props.step) < props.min
})

const maxDisabled = computed(() => {
  const val = toNumber(inputValue.value)
  return props.disabled || val >= props.max || addStep(val, props.step) > props.max
})

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = formatValue(val)
  }
)

watch([() => props.max, () => props.min, () => props.precision], () => {
  const val = toNumber(inputValue.value)
  inputValue.value = formatValue(val)
})

function getInitValue() {
  if (!props.updateOnInit) {
    return formatDisplay(props.modelValue)
  }

  const formatted = formatValue(props.modelValue)

  if (!isEqual(String(formatted), String(props.modelValue))) {
    emit('update:modelValue', formatted)
  }
  return formatted
}

function getPrecision(val?: number) {
  if (!isDef(val)) return 0
  const str = val.toString()
  const dotIndex = str.indexOf('.')
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1
}

function toPrecision(val: number) {
  const precision = Number(props.precision)
  return Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision)
}

function toNumber(val: string | number): number {
  if (props.allowNull && (!isDef(val) || val === '')) {
    return NaN
  }

  if (!isDef(val) || val === '') {
    return props.min
  }

  let str = String(val)

  if (str.endsWith('.')) str = str.slice(0, -1)
  if (str.startsWith('.')) str = '0' + str
  if (str.startsWith('-.')) str = '-0' + str.substring(1)
  if (str === '-' || str === '') return props.min

  let num = Number(str)
  if (isNaN(num)) num = props.min

  return normalizeValue(num)
}

function normalizeValue(val: number): number {
  let result = val

  if (props.stepStrictly) {
    const stepPrecision = getPrecision(props.step)
    const factor = Math.pow(10, stepPrecision)
    result = (Math.round(result / props.step) * factor * props.step) / factor
  }

  if (props.stepStrictly) {
    result = applyStrictBounds(result, props.min, props.max)
  } else {
    result = Math.min(Math.max(result, props.min), props.max)
  }

  if (isDef(props.precision)) {
    result = toPrecision(result)
  }

  return result
}

function applyStrictBounds(val: number, min: number, max: number): number {
  if (val >= min && val <= max) return val

  const stepPrecision = getPrecision(props.step)
  const factor = Math.pow(10, stepPrecision)

  if (val < min) {
    const minSteps = Math.ceil((min * factor) / (props.step * factor))
    const candidate = toPrecision((minSteps * props.step * factor) / factor)
    if (candidate > max) {
      const maxSteps = Math.floor((max * factor) / (props.step * factor))
      return toPrecision((maxSteps * props.step * factor) / factor)
    }
    return candidate
  }

  if (val > max) {
    const maxSteps = Math.floor((max * factor) / (props.step * factor))
    const candidate = toPrecision((maxSteps * props.step * factor) / factor)
    if (candidate < min) {
      const minSteps = Math.ceil((min * factor) / (props.step * factor))
      return toPrecision((minSteps * props.step * factor) / factor)
    }
    return candidate
  }

  return val
}

function formatValue(val: string | number): string | number {
  if (props.allowNull && (!isDef(val) || val === '')) {
    return ''
  }

  const num = toNumber(val)
  const precision = Number(props.precision)
  if (!isDef(props.precision)) {
    return num
  }
  return precision === 0 ? Number(num.toFixed(0)) : num.toFixed(precision)
}

function formatDisplay(val: string | number): string | number {
  if (props.allowNull && (!isDef(val) || val === '')) {
    return ''
  }

  if (!isDef(val) || val === '') {
    return props.min
  }

  let num = Number(val)
  if (isNaN(num)) {
    return props.min
  }

  const precision = Number(props.precision)
  if (!isDef(props.precision)) {
    return num
  }
  return precision === 0 ? Number(num.toFixed(0)) : num.toFixed(precision)
}

function isIntermediate(val: string): boolean {
  if (!val) return false
  const str = String(val)
  return str.endsWith('.') || str.startsWith('.') || str.startsWith('-.') || str === '-' || (Number(props.precision) > 0 && str.indexOf('.') === -1)
}

function cleanInput(val: string): string {
  if (!val) return ''

  let cleaned = val.replace(/[^\d.-]/g, '')

  const hasNegative = cleaned.startsWith('-')
  cleaned = cleaned.replace(/-/g, '')
  if (hasNegative) cleaned = '-' + cleaned

  const precision = Number(props.precision)
  if (precision > 0) {
    const parts = cleaned.split('.')
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('')
    }
  } else {
    cleaned = cleaned.split('.')[0]
  }

  if (cleaned.startsWith('.')) return '0' + cleaned
  if (cleaned.startsWith('-.')) return '-0' + cleaned.substring(1)

  return cleaned
}

async function callInterceptor(interceptor: any, options: { args: any[], done: () => void }) {
  if (!interceptor) {
    options.done()
    return
  }

  const result = interceptor(...options.args)
  if (isPromise(result)) {
    const res = await result
    if (res !== false) {
      options.done()
    }
  } else if (result !== false) {
    options.done()
  }
}

async function updateValue(val: string | number, type?: OperationType) {
  if (loading.value) return

  if (type) {
    loading.value = true
    loadingType.value = type
  }

  if (props.allowNull && (!isDef(val) || val === '')) {
    if (isEqual('', String(props.modelValue))) {
      inputValue.value = ''
      loading.value = false
      loadingType.value = ''
      return
    }

    const doUpdate = () => {
      inputValue.value = ''
      emit('update:modelValue', '')
      emit('change', { value: '' })
      loading.value = false
      loadingType.value = ''
    }

    await callInterceptor(props.beforeChange, { args: [''], done: doUpdate })
    return
  }

  const num = toNumber(val)
  const display = formatValue(val)

  if (isEqual(String(num), String(props.modelValue))) {
    inputValue.value = display
    loading.value = false
    loadingType.value = ''
    return
  }

  const doUpdate = () => {
    inputValue.value = display
    emit('update:modelValue', num)
    emit('change', { value: num })
    loading.value = false
    loadingType.value = ''
  }

  await callInterceptor(props.beforeChange, { args: [num], done: doUpdate })
}

function addStep(val: string | number, step: number) {
  const num = Number(val)
  if (isNaN(num)) return normalizeValue(props.min)

  const precision = Math.max(getPrecision(num), getPrecision(step))
  const factor = Math.pow(10, precision)
  const result = (num * factor + step * factor) / factor
  return normalizeValue(result)
}

async function handleClick(type: OperationType) {
  if (loading.value) return

  const step = type === 'add' ? props.step : -props.step
  if ((step < 0 && (minDisabled.value || props.disableMinus)) || (step > 0 && (maxDisabled.value || props.disablePlus))) return

  const newVal = addStep(inputValue.value, step)
  await updateValue(newVal, type)
}

function handleInput(event: any) {
  const rawVal = event.detail.value || ''

  inputValue.value = rawVal

  nextTick(() => {
    if (rawVal === '') {
      inputValue.value = ''
      if (props.immediateChange && props.allowNull) {
        updateValue('')
      }
      return
    }

    const cleaned = cleanInput(rawVal)

    if (Number(props.precision) > 0 && isIntermediate(cleaned)) {
      inputValue.value = cleaned
      return
    }

    inputValue.value = cleaned
    if (props.immediateChange) {
      updateValue(cleaned)
    }
  })
}

async function handleBlur(event: any) {
  const val = event.detail.value || ''
  await updateValue(val)
  emit('blur', { value: val })
  formItemValidate.value?.validateByTrigger('blur')
}

function handleFocus(event: any) {
  emit('focus', event.detail)
}

function longPressStep(type: OperationType) {
  clearLongPressTimer()
  longPressTimer = setTimeout(() => {
    handleClick(type)
    longPressStep(type)
  }, 250)
}

function handleTouchStart(type: OperationType) {
  if (!props.longPress) return
  clearLongPressTimer()
  longPressTimer = setTimeout(() => {
    handleClick(type)
    longPressStep(type)
  }, 600)
}

function handleTouchEnd() {
  if (!props.longPress) return
  clearLongPressTimer()
}

function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>