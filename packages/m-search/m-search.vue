<template>
  <view :class="rootClass" :style="customStyle">
    <view class="m-search__block" @click="handleClick">
      <slot name="prefix"></slot>
      <view class="m-search__field">
        <view v-if="!placeholderLeft" :style="coverStyle" class="m-search__cover" @click="closeCover">
          <m-icon name="search-line" custom-class="m-search__search-icon"></m-icon>
          <text :class="`m-search__placeholder-txt ${placeholderClass}`">{{ placeholder || translate('search') }}</text>
        </view>
        <m-icon v-if="showInput || inputValue || placeholderLeft" name="search-line" custom-class="m-search__search-left-icon"></m-icon>
        <input
          v-if="showInput || inputValue || placeholderLeft"
          :placeholder="placeholder || translate('search')"
          :placeholder-class="`m-search__placeholder-txt ${placeholderClass}`"
          :placeholder-style="placeholderStyle"
          confirm-type="search"
          v-model="inputValue"
          :class="['m-search__input', customInputClass]"
          @focus="handleFocus"
          @input="handleInput"
          @blur="handleBlur"
          @confirm="handleConfirm"
          :disabled="disabled"
          :maxlength="maxlength"
          :focus="isFocused"
        />
        <m-icon v-if="inputValue" custom-class="m-search__clear-icon" name="close-circle-fill" @click="handleClear" />
        <slot name="input-suffix"></slot>
      </view>
    </view>

    <slot v-if="!hideCancel" name="suffix">
      <view class="m-search__cancel" @click="handleCancel">
        {{ cancelTxt || translate('cancel') }}
      </view>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-search',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import mIcon from '../m-icon/m-icon.vue'
import { type CSSProperties, computed, onMounted, ref, watch } from 'vue'
import { objToStyle, pause } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { searchProps } from './types'

const props = defineProps(searchProps)
const emit = defineEmits(['update:modelValue', 'change', 'clear', 'search', 'focus', 'blur', 'cancel', 'click'])

const { translate } = useTranslate('search')

const isFocused = ref<boolean>(false)
const showInput = ref<boolean>(false)
const inputValue = ref<string>('')
const showPlaceHolder = ref<boolean>(true)
const clearing = ref<boolean>(false)

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
    if (newValue) {
      showInput.value = true
    }
  },
  { immediate: true }
)

watch(
  () => props.focus,
  (newValue) => {
    if (newValue) {
      if (props.disabled) return
      closeCover()
    }
  }
)

onMounted(() => {
  if (props.focus) {
    closeCover()
  }
})

const rootClass = computed(() => {
  const isLight = props.variant === 'light'
  const isPlain = props.variant === 'plain'
  return `m-search ${isLight ? 'is-light' : ''} ${isPlain ? 'is-plain' : ''} ${props.hideCancel ? 'is-without-cancel' : ''} ${props.customClass}`
})

const coverStyle = computed(() => {
  const coverStyle: CSSProperties = {
    display: inputValue.value === '' && showPlaceHolder.value ? 'flex' : 'none'
  }
  return objToStyle(coverStyle)
})

async function hackFocus(focus: boolean) {
  showInput.value = focus
  await pause()
  isFocused.value = focus
}

async function closeCover() {
  if (props.disabled) return
  await pause(100)
  showPlaceHolder.value = false
  hackFocus(true)
}

function handleInput(event: any) {
  inputValue.value = event.detail.value
  emit('update:modelValue', event.detail.value)
  emit('change', {
    value: event.detail.value
  })
}

async function handleClear() {
  inputValue.value = ''
  if (props.focusWhenClear) {
    clearing.value = true
    isFocused.value = false
  }
  await pause()
  if (props.focusWhenClear) {
    showPlaceHolder.value = false
    hackFocus(true)
  } else {
    showPlaceHolder.value = true
    hackFocus(false)
  }
  emit('change', {
    value: ''
  })
  emit('update:modelValue', '')
  emit('clear')
}

function handleConfirm({ detail: { value } }: any) {
  emit('search', {
    value
  })
}

function handleFocus() {
  showPlaceHolder.value = false
  emit('focus', {
    value: inputValue.value
  })
}

async function handleBlur() {
  await pause(150)
  if (clearing.value) {
    clearing.value = false
    return
  }
  showPlaceHolder.value = !inputValue.value
  showInput.value = !showPlaceHolder.value
  isFocused.value = false
  emit('blur', {
    value: inputValue.value
  })
}

function handleCancel() {
  emit('cancel', {
    value: inputValue.value
  })
}

function handleClick() {
  if (props.disabled) {
    emit('click')
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>