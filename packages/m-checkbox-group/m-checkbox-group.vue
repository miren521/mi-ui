<template>
  <view :class="`m-checkbox-group ${customClass}`" :style="customStyle">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-checkbox-group',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { watch } from 'vue'
import { checkNumRange, deepClone, isBoolean } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { CHECKBOX_GROUP_KEY, checkboxGroupProps, type CheckboxGroupExpose, type CheckboxGroupToggleAllOptions } from './types'

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(['change', 'update:modelValue'])

const { linkChildren, children } = useChildren(CHECKBOX_GROUP_KEY)

linkChildren({ props, changeSelectState })

watch(
  () => props.modelValue,
  (newValue) => {
    if (new Set(newValue).size !== newValue.length) {
      console.error("checkboxGroup's bound value includes same value")
    }
    if (newValue.length < props.min) {
      console.error("checkboxGroup's bound value's length can't be less than min")
    }
    if (props.max !== 0 && newValue.length > props.max) {
      console.error("checkboxGroup's bound value's length can't be large than max")
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.type,
  (newValue) => {
    const type = ['circle', 'square', 'button', 'dot']
    if (type.indexOf(newValue) === -1) console.error(`type must be one of ${type.toString()}`)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.min,
  (newValue) => {
    checkNumRange(newValue, 'min')
  },
  { deep: true, immediate: true }
)

watch(
  () => props.max,
  (newValue) => {
    checkNumRange(newValue, 'max')
  },
  { deep: true, immediate: true }
)

function changeSelectState(value: string | number | boolean) {
  const temp: (string | number | boolean)[] = deepClone(props.modelValue)
  const index = temp.indexOf(value)
  if (index > -1) {
    temp.splice(index, 1)
  } else {
    if (props.max !== 0 && temp.length >= props.max) {
      return
    }
    temp.push(value)
  }
  emit('update:modelValue', temp)

  emit('change', {
    value: temp
  })
}

const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
  const { modelValue } = props
  let checked: boolean | undefined
  let skipDisabled = false

  if (isBoolean(options)) {
    checked = options
  } else {
    checked = options.checked
    skipDisabled = options.skipDisabled || false
  }

  const newModelValue: (string | number | boolean)[] = []

  children.forEach((child: any) => {
    if (skipDisabled && child.disabled) {
      if (modelValue.includes(child.name)) {
        newModelValue.push(child.name)
      }
    } else {
      const isCurrentChecked = modelValue.includes(child.name)
      const target = checked === undefined ? !isCurrentChecked : checked

      if (target) {
        newModelValue.push(child.name)
      }
    }
  })

  emit('update:modelValue', newModelValue)
  emit('change', {
    value: newModelValue
  })
}

defineExpose<CheckboxGroupExpose>({
  toggleAll
})
</script>

<style lang="scss">
@import './index.scss';
</style>