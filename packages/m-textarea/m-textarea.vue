<template>
  <view :class="rootClass" :style="customStyle">
    <view class="m-textarea__body">
      <textarea
        :class="`m-textarea__inner ${customTextareaClass}`"
        :style="textareaStyle"
        v-model="inputValue"
        :show-count="false"
        :placeholder="placeholderValue"
        :disabled="disabled || readonly"
        :enable-native="enableNative"
        :maxlength="maxlength"
        :focus="focused"
        :auto-focus="autoFocus"
        :placeholder-style="placeholderStyle"
        :placeholder-class="inputPlaceholderClass"
        :auto-height="autoHeight"
        :cursor-spacing="cursorSpacing"
        :fixed="fixed"
        :cursor="cursor"
        :show-confirm-bar="showConfirmBar"
        :selection-start="selectionStart"
        :selection-end="selectionEnd"
        :adjust-position="adjustPosition"
        :hold-keyboard="holdKeyboard"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :disable-default-padding="disableDefaultPadding"
        :ignoreCompositionEvent="ignoreCompositionEvent"
        :inputmode="inputmode"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
        @linechange="handleLineChange"
        @keyboardheightchange="handleKeyboardheightchange"
      />
      <view v-if="props.readonly" class="m-textarea__readonly-mask" />
      <m-icon v-if="showClear" custom-class="m-textarea__clear" name="close-circle" @click="handleClear" />
    </view>
    <view v-if="showWordCount" class="m-textarea__count">{{ currentLength }}/{{ maxlength }}</view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-textarea',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import mIcon from '../m-icon/m-icon.vue'
import { isDef, pause } from '../common/util'
import { useParent } from '../composables/useParent'
import { textareaProps, type AutoSize } from './types'
import { FORM_ITEM_VALIDATE_KEY } from '../m-form-item/types'

const props = defineProps(textareaProps)
const emit = defineEmits(['update:modelValue', 'clear', 'blur', 'focus', 'input', 'keyboardheightchange', 'confirm', 'linechange', 'click'])
const { parent: formItemValidate } = useParent(FORM_ITEM_VALIDATE_KEY)

const placeholderValue = computed(() => {
  return isDef(props.placeholder) ? props.placeholder : ''
})

const clearing = ref<boolean>(false)
const focused = ref<boolean>(false)
const focusing = ref<boolean>(false)
const inputValue = ref<string>('')
const currentRows = ref<number>(props.rows)

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
  },
  { immediate: true, deep: true }
)

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

const isAutoSize = computed(() => {
  return isDef(props.autoSize) && props.autoSize !== false
})

const rootClass = computed(() => {
  return `m-textarea ${props.error ? 'is-error' : ''} ${props.disabled ? 'is-disabled' : ''} ${props.autoHeight ? 'is-auto-height' : ''} ${
    isAutoSize.value ? 'is-auto-size' : ''
  } ${isCompact.value ? 'is-compact' : ''} ${props.border ? 'is-border' : ''} ${props.customClass}`
})

const isCompact = computed(() => {
  return isDef(props.compact) ? props.compact : isDef(formItemValidate.value)
})

const inputPlaceholderClass = computed(() => {
  return `m-textarea__placeholder ${props.placeholderClass}`
})

const customTextareaClass = computed(() => {
  return props.customTextareaClass
})

const customStyle = computed(() => {
  return props.customStyle
})

const textareaStyle = computed(() => {
  const style: Record<string, string> = {}
  const lineHeight = 42 // rpx，与 index.scss 中的 line-height: 1.5; font-size: 28rpx; 保持一致
  
  // 使用动态的 currentRows
  if (!props.autoHeight) {
    style.height = `${currentRows.value * lineHeight}rpx`
  }
  
  // 如果是 autoSize 模式且有最大行数限制，添加最大高度
  if (isAutoSize.value && typeof props.autoSize === 'object' && props.autoSize.maxRows !== undefined) {
    style.maxHeight = `${props.autoSize.maxRows * lineHeight}rpx`
  }
  
  return style
})

onBeforeMount(() => {
  initState()
})

function initState() {
  inputValue.value = formatValue(inputValue.value)
  emit('update:modelValue', inputValue.value)
}

function formatValue(value: string | number) {
  if (value === null || value === undefined) return ''
  const { maxlength, showWordLimit } = props
  if (showWordLimit && maxlength !== -1 && String(value).length > maxlength) {
    return value.toString().substring(0, maxlength)
  }
  return `${value}`
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

async function handleBlur({ detail }: any) {
  await pause(150)

  if (clearing.value) {
    clearing.value = false
    return
  }

  focusing.value = false
  emit('blur', {
    value: inputValue.value,
    cursor: detail.cursor ? detail.cursor : null
  })
  await formItemValidate.value?.validateByTrigger('blur')
}

function handleFocus({ detail }: any) {
  focusing.value = true
  emit('focus', detail)
}

function handleInput({ detail }: any) {
  inputValue.value = formatValue(inputValue.value as string)
  emit('update:modelValue', inputValue.value)
  emit('input', detail)
}

function handleKeyboardheightchange({ detail }: any) {
  emit('keyboardheightchange', detail)
}

function handleConfirm({ detail }: any) {
  emit('confirm', detail)
}

function handleLineChange({ detail }: any) {
  if (detail && detail.lineCount !== undefined && isAutoSize.value) {
    const autoSizeConfig = props.autoSize as AutoSize
    
    if (typeof autoSizeConfig === 'object') {
      const minRows = autoSizeConfig.minRows || 1
      const maxRows = autoSizeConfig.maxRows
      
      // 根据行数动态调整 currentRows，限制在 minRows 和 maxRows 之间
      let newRows = detail.lineCount
      
      if (newRows < minRows) {
        newRows = minRows
      }
      
      if (maxRows !== undefined && newRows > maxRows) {
        newRows = maxRows
      }
      
      currentRows.value = newRows
    } else {
      // autoSize 为 true，无限制自适应
      currentRows.value = detail.lineCount
    }
  }
  emit('linechange', detail)
}
</script>

<style lang="scss">
@import './index.scss';
</style>