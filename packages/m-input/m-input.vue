<template>
  <view :class="rootClass" :style="customStyle" @click="handleClick">
    <view v-if="prefixIcon || $slots.prefix" class="m-input__prefix">
      <m-icon v-if="prefixIcon && !$slots.prefix" custom-class="m-input__icon" :name="prefixIcon" @click="onClickPrefixIcon" />
      <slot v-else name="prefix"></slot>
    </view>

    <!-- 【修复核心】：防止 iOS/浏览器自动填充密码的“诱饵”输入框 -->
    <!-- 当当前组件是密码类型时，渲染这个隐藏框 -->
    <input 
      v-if="type === 'password'" 
      type="text" 
      class="fake-input-hidden" 
      autocomplete="new-password"
      aria-hidden="true"
    />

    <input
      :class="[
        'm-input__inner',
        prefixIcon ? 'm-input__inner--prefix' : '',
        showWordCount ? 'm-input__inner--count' : '',
        alignRight ? 'is-align-right' : '',
        customInputClass
      ]"
      :type="showPassword ? 'text' : type"
      :password="showPassword && !isPwdVisible"
      v-model="inputValue"
      :placeholder="placeholderValue"
      :disabled="disabled || readonly"
      :maxlength="maxlength"
      :focus="focused"
      :confirm-type="confirmType"
      :confirm-hold="confirmHold"
      :cursor="cursor"
      :cursor-spacing="cursorSpacing"
      :placeholder-style="placeholderStyle"
      :selection-start="selectionStart"
      :selection-end="selectionEnd"
      :adjust-position="adjustPosition"
      :hold-keyboard="holdKeyboard"
      :always-embed="alwaysEmbed"
      :placeholder-class="inputPlaceholderClass"
      :ignore-composition-event="ignoreCompositionEvent"
      :inputmode="inputmode"
      :enable-native="enableNative"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @confirm="handleConfirm"
      @keyboardheightchange="handleKeyboardheightchange"
    />
    <view v-if="readonly" class="m-input__readonly-mask" />
    <view v-if="showClear || showPassword || suffixIcon || showWordCount || $slots.suffix" class="m-input__suffix">
      <m-icon v-if="showClear" custom-class="m-input__clear" name="close-circle" @click="handleClear" />
      <m-icon v-if="showPassword" custom-class="m-input__icon" :name="isPwdVisible ? 'view' : 'browse-off'" @click="togglePwdVisible" />
      <view v-if="showWordCount" class="m-input__count">{{ currentLength }}/{{ maxlength }}</view>
      <m-icon v-if="suffixIcon && !$slots.suffix" custom-class="m-input__icon" :name="suffixIcon" @click="onClickSuffixIcon" />
      <slot v-else name="suffix"></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-input',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import mIcon from '../m-icon/m-icon.vue'
import { isDef, pause, isEqual } from '../common/util'
import { useParent } from '../composables/useParent'
import { inputProps } from './types'
import { FORM_ITEM_VALIDATE_KEY } from '../m-form-item/types'

const props = defineProps(inputProps)

const emit = defineEmits([
  'update:modelValue',
  'clear',
  'blur',
  'focus',
  'input',
  'keyboardheightchange',
  'confirm',
  'clicksuffixicon',
  'clickprefixicon',
  'click'
])

const { parent: formItemValidate } = useParent(FORM_ITEM_VALIDATE_KEY)

const isPwdVisible = ref<boolean>(false)
const clearing = ref<boolean>(false)
const focused = ref<boolean>(false)
const focusing = ref<boolean>(false)
const inputValue = ref<string | number>(getInitValue())

watch(
  () => props.focus,
  (newValue) => {
    focused.value = newValue
  },
  { immediate: true, deep: true }
)

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = isDef(newValue) ? String(newValue) : ''
  }
)

const placeholderValue = computed(() => {
  return isDef(props.placeholder) ? props.placeholder : ''
})

const showClear = computed(() => {
  const { disabled, readonly, clearable, clearTrigger } = props
  if (clearable && !readonly && !disabled && inputValue.value && (clearTrigger === 'always' || (props.clearTrigger === 'focus' && focusing.value))) {
    return true
  } else {
    return false
  }
})

const showWordCount = computed(() => {
  const { disabled, readonly, maxlength, showWordLimit } = props
  return Boolean(!disabled && !readonly && isDef(maxlength) && maxlength > -1 && showWordLimit)
})

const currentLength = computed(() => {
  return Array.from(String(formatValue(props.modelValue))).length
})

const rootClass = computed(() => {
  return `m-input ${props.error ? 'is-error' : ''} ${props.disabled ? 'is-disabled' : ''} ${isCompact.value ? 'is-compact' : ''} ${props.customClass}`
})

const inputPlaceholderClass = computed(() => {
  return `m-input__placeholder ${props.placeholderClass}`
})

const isCompact = computed(() => {
  return isDef(props.compact) ? props.compact : isDef(formItemValidate.value)
})

function getInitValue() {
  const formatted = formatValue(props.modelValue)
  if (!isValueEqual(formatted, props.modelValue)) {
    emit('update:modelValue', formatted)
  }
  return formatted
}

function formatValue(value: string | number) {
  const { maxlength } = props
  if (isDef(maxlength) && maxlength !== -1 && String(value).length > maxlength) {
    return value.toString().slice(0, maxlength)
  }
  return value
}

function togglePwdVisible() {
  isPwdVisible.value = !isPwdVisible.value
}

async function handleClear() {
  focusing.value = false
  inputValue.value = ''
  if (props.focusWhenClear) {
    clearing.value = true
    focused.value = false
  }
  await pause()
  if (props.focusWhenClear) {
    focused.value = true
    focusing.value = true
  }
  emit('update:modelValue', inputValue.value)
  emit('clear')
}

async function handleBlur() {
  await pause(150)
  if (clearing.value) {
    clearing.value = false
    return
  }
  focusing.value = false
  emit('blur', {
    value: inputValue.value
  })
  await formItemValidate.value?.validateByTrigger('blur')
}

function handleFocus({ detail }: any) {
  focusing.value = true
  emit('focus', detail)
}

function handleInput({ detail }: any) {
  emit('update:modelValue', inputValue.value)
  emit('input', detail)
}

function handleKeyboardheightchange({ detail }: any) {
  emit('keyboardheightchange', detail)
}

function handleConfirm({ detail }: any) {
  emit('confirm', detail)
}

function onClickSuffixIcon() {
  emit('clicksuffixicon')
}

function onClickPrefixIcon() {
  emit('clickprefixicon')
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}

function isValueEqual(value1: number | string, value2: number | string) {
  return isEqual(String(value1), String(value2))
}
</script>

<style lang="scss">
@import './index.scss';
</style>