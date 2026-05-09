<template>
  <view :class="`m-form-item ${customClass}`" :style="customStyle">
    <!-- 标题区域 -->
    <view v-if="showTitle" class="m-form-item__label" :style="labelStyle">
      <text v-if="isRequired && !formItemHideAsterisk" class="m-form-item__asterisk">*</text>
      <text class="m-form-item__title">{{ title }}</text>
    </view>
    
    <!-- 内容区域 -->
    <view class="m-form-item__content" :style="contentStyle">
      <slot>
        <text v-if="showPlaceholder" class="m-form-item__placeholder">{{ placeholder }}</text>
        <text v-else-if="isDef(value)">{{ value }}</text>
      </slot>
    </view>
    
    <!-- 错误提示 -->
    <view v-if="errorMessage" class="m-form-item__error-message">{{ errorMessage }}</view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-form-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useChildren } from '../composables/useChildren'
import { useParent } from '../composables/useParent'
import { FORM_KEY, FORM_VALIDATE_EVENTS, type FormValidateEvent, type FormValidateTrigger } from '../m-form/types'
import { FORM_ITEM_VALIDATE_KEY, formItemProps } from './types'
import { getPropByPath, isDef } from '../common/util'

const props = defineProps(formItemProps)

const { parent: form, index } = useParent(FORM_KEY)
const { linkChildren } = useChildren(FORM_ITEM_VALIDATE_KEY)

defineEmits(['click'])

function normalizeValidateTrigger(trigger?: FormValidateTrigger | FormValidateTrigger[]): FormValidateEvent[] {
  const triggerList = Array.isArray(trigger) ? trigger : trigger ? [trigger] : []
  return triggerList.filter((item): item is FormValidateEvent => {
    return FORM_VALIDATE_EVENTS.includes(item as FormValidateEvent)
  })
}

const validateTriggerSet = computed(() => {
  const formTrigger = form.value?.props.validateTrigger
  const currentTrigger = isDef(props.validateTrigger) ? props.validateTrigger : formTrigger
  return new Set(normalizeValidateTrigger(currentTrigger))
})

function shouldTrigger(event: FormValidateEvent): boolean {
  return validateTriggerSet.value.has(event)
}

async function validateByTrigger(event: FormValidateEvent): Promise<void> {
  if (!props.prop || !shouldTrigger(event)) {
    return
  }
  await form.value?.validate?.(props.prop)
}

const propValue = computed(() => {
  if (!props.prop) {
    return undefined
  }
  return getPropByPath(form.value?.props.model, props.prop)
})

watch(
  () => propValue.value,
  async () => {
    await validateByTrigger('change')
  },
  {
    deep: true
  }
)

linkChildren({
  prop: props.prop,
  shouldTrigger,
  validateByTrigger
})

const errorMessage = computed(() => {
  if (form.value && props.prop && form.value.errorMessages && form.value.errorMessages[props.prop]) {
    return form.value.errorMessages[props.prop]
  } else {
    return ''
  }
})

const formItemBorder = computed(() => {
  if (isDef(props.border)) {
    return props.border
  }
  if (index.value > 0 && form.value && form.value.props.border) {
    return true
  }
  return false
})

const formItemCenter = computed(() => {
  return isDef(props.center) ? props.center : form.value?.props.center
})

const formItemSize = computed(() => {
  return isDef(props.size) ? props.size : form.value?.props.size
})

const formItemTitleWidth = computed(() => {
  return isDef(props.titleWidth) ? props.titleWidth : form.value?.props.titleWidth || '98px'
})

const formItemLayout = computed(() => {
  return isDef(props.layout) ? props.layout : form.value?.props.layout || 'horizontal'
})

const formItemValueAlign = computed(() => {
  return isDef(props.valueAlign) ? props.valueAlign : form.value?.props.valueAlign || 'left'
})

const formItemEllipsis = computed(() => {
  return isDef(props.ellipsis) ? props.ellipsis : form.value?.props.ellipsis
})

const formItemAsteriskPosition = computed(() => {
  return isDef(props.asteriskPosition) ? props.asteriskPosition : form.value?.props.asteriskPosition || 'start'
})

const formItemHideAsterisk = computed(() => {
  return isDef(props.hideAsterisk) ? props.hideAsterisk : form.value?.props.hideAsterisk
})

const showPlaceholder = computed(() => {
  return Boolean(props.placeholder && (props.value === '' || props.value === undefined || props.value === null))
})

const isRequired = computed(() => {
  if (props.required === true) {
    return true
  }
  if (!props.prop || !form.value?.props.schema?.isRequired) {
    return false
  }
  return !!form.value.props.schema.isRequired(props.prop)
})

const showTitle = computed(() => {
  return Boolean(props.title)
})

const labelStyle = computed(() => {
  const style: Record<string, string> = {}
  if (formItemLayout.value === 'horizontal') {
    style.width = typeof formItemTitleWidth.value === 'number' ? `${formItemTitleWidth.value}px` : String(formItemTitleWidth.value)
  }
  return style
})

const contentStyle = computed(() => {
  const style: Record<string, string> = {}
  if (formItemValueAlign.value) {
    style.textAlign = formItemValueAlign.value
  }
  return style
})
</script>

<style lang="scss" scoped>
@use '../common/styles/variables.scss' as *;

$form-item-label-width: 98px;
$form-item-label-font-size: var(--m-font-size-base, 28rpx);
$form-item-label-color: var(--m-text-primary, #323233);
$form-item-content-font-size: var(--m-font-size-base, 28rpx);
$form-item-content-color: var(--m-text-primary, #323233);
$form-item-asterisk-color: var(--m-color-danger, #ee0a24);

.m-form-item {
  display: flex;
  align-items: center;
  padding: var(--m-spacing-loose, 16rpx) var(--m-spacing-loose, 16rpx);
  background: var(--m-bg-white, #ffffff);
  flex-wrap: wrap;

  &__label {
    flex-shrink: 0;
    font-size: $form-item-label-font-size;
    color: $form-item-label-color;
    display: flex;
    align-items: center;
  }

  &__asterisk {
    color: $form-item-asterisk-color;
    margin-right: 4rpx;
  }

  &__title {
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    font-size: $form-item-content-font-size;
    color: $form-item-content-color;
  }

  &__placeholder {
    color: var(--m-text-placeholder, #c8c9cc);
  }

  &__error-message {
    flex-basis: 100%;
    font-size: 24rpx;
    color: var(--m-color-danger, #ee0a24);
    margin-top: 12rpx;
    padding-left: calc(var(--m-spacing-loose, 16rpx) + 70px);
    word-break: break-all;
    text-align: left;
  }
}
</style>