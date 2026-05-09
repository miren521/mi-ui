<template>
  <view
    :class="`m-checkbox m-checkbox--${placementValue} ${isButton ? 'is-button' : 'm-checkbox--' + directionValue} ${
      isChecked ? 'is-checked' : ''
    } ${indeterminate ? 'is-indeterminate' : ''} ${disabledValue ? 'is-disabled' : ''} ${customClass}`"
    :style="customStyle"
    @click="toggle"
  >
    <view :class="`m-checkbox__label ${customLabelClass || ''}`" v-if="$slots.default">
      <slot></slot>
    </view>

    <template v-if="isButton">
      <slot name="icon" :is-checked="isChecked">
        <view v-if="isChecked" class="m-checkbox__shape">
          <m-icon custom-class="m-checkbox__icon" :custom-style="iconStyle" :name="iconValue"></m-icon>
        </view>
      </slot>
    </template>
    <view v-else class="m-checkbox__shape">
      <slot name="icon" :is-checked="isChecked">
        <m-icon custom-class="m-checkbox__icon" :custom-style="iconStyle" :name="iconValue"></m-icon>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-checkbox',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, onBeforeMount, watch } from 'vue'
import { useParent } from '../composables/useParent'
import { CHECKBOX_GROUP_KEY } from '../m-checkbox-group/types'
import { getPropByPath, isDef } from '../common/util'
import { checkboxProps, type CheckboxDirection, type CheckboxExpose, type CheckboxPlacement, type CheckboxType } from './types'

const props = defineProps(checkboxProps)
const emit = defineEmits(['change', 'update:modelValue'])

defineExpose<CheckboxExpose>({
  toggle
})

const { parent: checkboxGroup } = useParent(CHECKBOX_GROUP_KEY)
const { proxy } = getCurrentInstance() as any

const isChecked = computed(() => {
  if (checkboxGroup.value) {
    return checkboxGroup.value.props.modelValue.indexOf(props.name) > -1
  } else {
    return props.modelValue === props.trueValue
  }
})

const typeValue = computed(() => {
  return props.type || getPropByPath(checkboxGroup.value, 'props.type') || 'circle'
})

const isButton = computed(() => {
  return typeValue.value === 'button'
})

const iconValue = computed(() => {
  if (props.indeterminate && !isButton.value) {
    return 'minus-circle-filled'
  }
  let icon = ''
  switch (typeValue.value) {
    case 'circle':
      icon = isChecked.value ? 'check-circle-filled' : 'circle'
      break
    case 'square':
      icon = isChecked.value ? 'check-rectangle-filled' : 'rectangle'
      break
    case 'dot':
      icon = isChecked.value ? 'check-circle-radio-fill' : 'circle'
      break
    case 'button':
      icon = isChecked.value ? 'check' : ''
      break
  }
  return icon
})

const checkedColorValue = computed(() => {
  return props.checkedColor || getPropByPath(checkboxGroup.value, 'props.checkedColor')
})

const uncheckedColorValue = computed(() => {
  return props.uncheckedColor || getPropByPath(checkboxGroup.value, 'props.uncheckedColor')
})

const disabledValue = computed(() => {
  if (isDef(props.disabled)) {
    return props.disabled
  }
  if (checkboxGroup.value) {
    const { max, min, modelValue, disabled } = checkboxGroup.value.props
    if ((max && modelValue.length >= max && !isChecked.value) || (min && modelValue.length <= min && isChecked.value) || disabled) {
      return true
    }
  }
  return false
})

const readonlyValue = computed(() => {
  if (isDef(props.readonly)) {
    return props.readonly
  } else {
    return getPropByPath(checkboxGroup.value, 'props.readonly') || false
  }
})

const directionValue = computed(() => {
  if (isDef(props.direction)) {
    return props.direction
  } else {
    return (getPropByPath(checkboxGroup.value, 'props.direction') as CheckboxDirection) || 'vertical'
  }
})

const placementValue = computed<CheckboxPlacement>(() => {
  if (isDef(props.placement)) {
    return props.placement
  } else {
    return getPropByPath(checkboxGroup.value, 'props.placement') || 'left'
  }
})

const iconStyle = computed(() => {
  if (isButton.value) return ''
  if ((isChecked.value || props.indeterminate) && checkedColorValue.value) {
    return `color: ${checkedColorValue.value}`
  }
  if (!isChecked.value && uncheckedColorValue.value) {
    return `color: ${uncheckedColorValue.value}`
  }
  return ''
})

watch(
  () => props.name,
  () => {
    if (checkboxGroup.value) {
      checkName()
    }
  }
)

watch(
  () => props.type,
  (newValue) => {
    const type = ['circle', 'square', 'button', 'dot']
    if (isDef(newValue) && type.indexOf(newValue) === -1) console.error(`type must be one of ${type.toString()}`)
  }
)

onBeforeMount(() => {
  if (props.modelValue === null && !checkboxGroup.value) console.warn("checkbox's value must be set")
  if (checkboxGroup.value && !props.name) {
    console.warn("checkbox's name must be set when used in checkbox-group")
  }
})

function checkName() {
  checkboxGroup.value &&
    checkboxGroup.value.children &&
    checkboxGroup.value.children.forEach((child: any) => {
      if (child.$.uid !== proxy.$.uid && child.name === props.name) {
        console.error(`The checkbox's bound value: ${props.name} has been used`)
      }
    })
}

function toggle() {
  if (disabledValue.value || readonlyValue.value) return
  if (checkboxGroup.value) {
    checkboxGroup.value.changeSelectState(props.name)
  } else {
    const newVal = props.modelValue === props.trueValue ? props.falseValue : props.trueValue
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>