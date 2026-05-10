<template>
  <view
    :class="`m-radio m-radio--${placementValue} ${isButton ? 'is-button' : 'm-radio--' + directionValue} ${isChecked ? 'is-checked' : ''} ${disabledValue ? 'is-disabled' : ''} ${readonlyValue ? 'is-readonly' : ''} ${customClass}`"
    :style="customStyle"
    @click="handleClick"
  >
    <view :class="`m-radio__label ${customLabelClass || ''}`" v-if="$slots.default">
      <slot></slot>
    </view>

    <template v-if="isButton">
      <slot name="icon" :is-checked="isChecked">
        <view v-if="isChecked" class="m-radio__shape">
          <m-icon custom-class="m-radio__icon" :custom-style="iconStyle" :name="iconValue"></m-icon>
        </view>
      </slot>
    </template>
    <view v-else class="m-radio__shape">
      <slot name="icon" :is-checked="isChecked">
        <m-icon custom-class="m-radio__icon" :custom-style="iconStyle" :name="iconValue"></m-icon>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-radio',
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
import { computed, watch } from 'vue'
import { useParent } from '../composables/useParent'
import { RADIO_GROUP_KEY } from '../m-radio-group/types'
import { radioProps, type RadioDirection, type RadioPlacement, type RadioType } from './types'
import { getPropByPath, isDef } from '../common/util'

const props = defineProps(radioProps)

const { parent: radioGroup } = useParent(RADIO_GROUP_KEY)

const isChecked = computed(() => {
  if (radioGroup.value) {
    return props.value === radioGroup.value.props.modelValue
  } else {
    return false
  }
})

const typeValue = computed(() => {
  return props.type || (getPropByPath(radioGroup.value, 'props.type') as RadioType) || 'circle'
})

const iconValue = computed(() => {
  let icon = ''
  switch (typeValue.value) {
    case 'circle':
      icon = isChecked.value ? 'check-circle-fill' : 'uncheck-circle'
      break
    case 'square':
      icon = isChecked.value ? 'check-square-fill' : 'uncheck-square'
      break
    case 'dot':
      icon = isChecked.value ? 'check-circle-radio-fill' : 'uncheck-circle'
      break
    case 'button':
      icon = isChecked.value ? 'check' : ''
      break
    default:
      icon = isChecked.value ? 'check-circle-fill' : 'uncheck-circle'
      break
  }
  return icon
})

const checkedColorValue = computed(() => {
  return props.checkedColor || getPropByPath(radioGroup.value, 'props.checkedColor')
})

const uncheckedColorValue = computed(() => {
  return props.uncheckedColor || getPropByPath(radioGroup.value, 'props.uncheckedColor')
})

const readonlyValue = computed(() => {
  if (isDef(props.readonly)) {
    return props.readonly
  } else {
    return getPropByPath(radioGroup.value, 'props.readonly')
  }
})

const iconStyle = computed(() => {
  if (isButton.value) return ''
  if (isChecked.value && checkedColorValue.value) {
    return `color: ${checkedColorValue.value}`
  }
  if (!isChecked.value && uncheckedColorValue.value) {
    return `color: ${uncheckedColorValue.value}`
  }
  return ''
})

const isButton = computed(() => {
  return typeValue.value === 'button'
})

const disabledValue = computed(() => {
  if (isDef(props.disabled)) {
    return props.disabled
  } else {
    return getPropByPath(radioGroup.value, 'props.disabled')
  }
})

const directionValue = computed(() => {
  if (isDef(props.direction)) {
    return props.direction
  } else {
    return getPropByPath(radioGroup.value, 'props.direction') as RadioDirection
  }
})

const placementValue = computed<RadioPlacement>(() => {
  if (isDef(props.placement)) {
    return props.placement
  } else {
    return getPropByPath(radioGroup.value, 'props.placement') || 'left'
  }
})

watch(
  () => props.type,
  (newValue) => {
    const type = ['circle', 'dot', 'button', 'square']
    if (!newValue || type.indexOf(newValue) === -1) console.error(`type must be one of ${type.toString()}`)
  }
)

function handleClick() {
  const { value } = props
  if (!disabledValue.value && !readonlyValue.value && radioGroup.value && isDef(value)) {
    const allowUncheck = radioGroup.value.props.allowUncheck
    if (allowUncheck && isChecked.value) {
      radioGroup.value.updateValue(null)
    } else {
      radioGroup.value.updateValue(value)
    }
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>