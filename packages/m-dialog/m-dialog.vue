<template>
  <m-popup
    transition="zoom-in"
    v-model="dialogState.show"
    :close-on-click-modal="dialogState.closeOnClickModal"
    :lazy-render="dialogState.lazyRender"
    custom-class="m-dialog"
    @click-modal="toggleModal('modal')"
    :z-index="dialogState.zIndex"
    :duration="200"
    :root-portal="rootPortal"
  >
    <view :class="rootClass">
      <m-icon v-if="dialogState.showClose" custom-class="m-dialog__close" name="close" @click="toggleModal('modal')"></m-icon>
      <slot name="header" />
      <view :class="bodyClass">
        <slot name="image">
          <image v-if="dialogState.headerImage" mode="widthFix" class="m-dialog__img" :src="dialogState.headerImage"></image>
        </slot>
        <slot name="title" :icon="dialogState.icon" :title="dialogState.title" :iconProps="dialogState.iconProps">
          <view v-if="dialogState.iconProps?.name || dialogState.title" class="m-dialog__title">
            <m-icon
              v-if="dialogState.iconProps?.name"
              :custom-class="`m-dialog__icon ${iconTypeClass}`"
              :name="dialogState.iconProps.name"
              :color="dialogState.iconProps.color"
              :size="dialogState.iconProps.size"
            ></m-icon>
            {{ dialogState.title }}
          </view>
        </slot>
        <view class="m-dialog__content" v-if="dialogState.type === 'prompt' || !!dialogState.msg || $slots.default">
          <slot
            :msg="dialogState.msg"
            :type="dialogState.type"
            :inputValue="inputVal"
            :showErr="dialogState.showErr"
            :inputError="dialogState.inputError"
          >
            <block v-if="dialogState.type === 'prompt'">
              <m-textarea
                v-if="dialogState.textareaProps"
                v-model="inputVal"
                custom-class="m-dialog__input"
                v-bind="textareaPropsWithoutModelValue"
              />
              <m-input v-else v-model="inputVal" custom-class="m-dialog__input" v-bind="inputPropsWithoutModelValue" />
              <view v-if="dialogState.showErr" class="m-dialog__input-error">
                {{ dialogState.inputError || '请输入正确内容' }}
              </view>
            </block>
            <text v-else class="m-dialog__content-text">{{ dialogState.msg }}</text>
          </slot>
        </view>
      </view>
      <slot name="actions" :confirm="() => toggleModal('confirm')" :cancel="() => toggleModal('cancel')" :close="() => toggleModal('modal')">
        <view
          :class="`m-dialog__actions ${dialogState.actionLayout === 'vertical' ? 'm-dialog__actions--vertical' : ''} ${
            dialogState.actionLayout === 'vertical' || showCancelButton || (dialogState.actions && dialogState.actions.length > 1)
              ? 'm-dialog__flex'
              : 'm-dialog__block'
          } ${dialogState.theme === 'text' ? 'is-text' : ''}`"
        >
          <block v-if="customActions && customActions.length">
            <m-button
              v-for="(btn, index) in customActions"
              :key="index"
              v-bind="getActionButtonProps(btn)"
              @click="handleAction(btn, index)"
              @getuserinfo="(e: any) => handleOpenTypeEvent(btn, 'onGetuserinfo', e)"
              @contact="(e: any) => handleOpenTypeEvent(btn, 'onContact', e)"
              @getphonenumber="(e: any) => handleOpenTypeEvent(btn, 'onGetphonenumber', e)"
              @getrealtimephonenumber="(e: any) => handleOpenTypeEvent(btn, 'onGetrealtimephonenumber', e)"
              @error="(e: any) => handleOpenTypeEvent(btn, 'onError', e)"
              @launchapp="(e: any) => handleOpenTypeEvent(btn, 'onLaunchapp', e)"
              @opensetting="(e: any) => handleOpenTypeEvent(btn, 'onOpensetting', e)"
              @chooseavatar="(e: any) => handleOpenTypeEvent(btn, 'onChooseavatar', e)"
              @agreeprivacyauthorization="(e: any) => handleOpenTypeEvent(btn, 'onAgreeprivacyauthorization', e)"
              custom-class="m-dialog__actions-btn"
            >
              {{ btn.text }}
            </m-button>
          </block>
          <block v-else>
            <m-button
              v-bind="customCancelProps"
              v-if="showCancelButton"
              @click="toggleModal('cancel')"
              @getuserinfo="(e: any) => handleButtonOpenTypeEvent('cancel', 'onGetuserinfo', e)"
              @contact="(e: any) => handleButtonOpenTypeEvent('cancel', 'onContact', e)"
              @getphonenumber="(e: any) => handleButtonOpenTypeEvent('cancel', 'onGetphonenumber', e)"
              @getrealtimephonenumber="(e: any) => handleButtonOpenTypeEvent('cancel', 'onGetrealtimephonenumber', e)"
              @error="(e: any) => handleButtonOpenTypeEvent('cancel', 'onError', e)"
              @launchapp="(e: any) => handleButtonOpenTypeEvent('cancel', 'onLaunchapp', e)"
              @opensetting="(e: any) => handleButtonOpenTypeEvent('cancel', 'onOpensetting', e)"
              @chooseavatar="(e: any) => handleButtonOpenTypeEvent('cancel', 'onChooseavatar', e)"
              @agreeprivacyauthorization="(e: any) => handleButtonOpenTypeEvent('cancel', 'onAgreeprivacyauthorization', e)"
            >
              {{ getCancelText() }}
            </m-button>
            <m-button
              v-bind="customConfirmProps"
              v-if="showConfirmButton"
              @click="toggleModal('confirm')"
              @getuserinfo="(e: any) => handleButtonOpenTypeEvent('confirm', 'onGetuserinfo', e)"
              @contact="(e: any) => handleButtonOpenTypeEvent('confirm', 'onContact', e)"
              @getphonenumber="(e: any) => handleButtonOpenTypeEvent('confirm', 'onGetphonenumber', e)"
              @getrealtimephonenumber="(e: any) => handleButtonOpenTypeEvent('confirm', 'onGetrealtimephonenumber', e)"
              @error="(e: any) => handleButtonOpenTypeEvent('confirm', 'onError', e)"
              @launchapp="(e: any) => handleButtonOpenTypeEvent('confirm', 'onLaunchapp', e)"
              @opensetting="(e: any) => handleButtonOpenTypeEvent('confirm', 'onOpensetting', e)"
              @chooseavatar="(e: any) => handleButtonOpenTypeEvent('confirm', 'onChooseavatar', e)"
              @agreeprivacyauthorization="(e: any) => handleButtonOpenTypeEvent('confirm', 'onAgreeprivacyauthorization', e)"
            >
              {{ getConfirmText() }}
            </m-button>
          </block>
        </view>
      </slot>
    </view>
  </m-popup>
</template>
<script lang="ts">
export default {
  name: 'm-dialog',
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
import MPopup from '../m-popup/m-popup.vue'
import MButton from '../m-button/m-button.vue'
import MInput from '../m-input/m-input.vue'
import MTextarea from '../m-textarea/m-textarea.vue'
import MIcon from '../m-icon/m-icon.vue'
import { computed, inject, reactive, ref, watch } from 'vue'
import {
  dialogProps,
  type DialogBeforeConfirm,
  type DialogOptionsWithCallBack,
  type DialogResult,
  type DialogBuiltinIconType,
  DIALOG_BUILTIN_ICON_MAP,
  type DialogAction,
  type DialogButtonOpenTypeEvents,
  OPEN_TYPE_EVENT_KEYS
} from './types'
import { defaultOptions, getDialogDefaultOptionKey } from './index'
import { callInterceptor } from '../common/interceptor'
import { deepAssign, isDef, isFunction, isObj, isString, isUndefined, omitBy } from '../common/util'
import type { ButtonProps, ButtonVariant } from '../m-button/types'

const props = defineProps(dialogProps)

const iconType = ref<string>('')

const iconTypeClass = computed(() => {
  return iconType.value ? `is-${iconType.value}` : ''
})

const rootClass = computed(() => {
  return `m-dialog__container ${props.customClass}`
})

const bodyClass = computed(() => {
  return `m-dialog__body  ${dialogState.type === 'prompt' ? 'is-prompt' : ''}`
})

const messageOptionKey = getDialogDefaultOptionKey(props.selector)
const messageOption = inject(messageOptionKey, ref<DialogOptionsWithCallBack>(defaultOptions))

const inputVal = ref<string | number>('')

const dialogState = reactive<DialogOptionsWithCallBack>({
  msg: '',
  show: false,
  title: '',
  closeOnClickModal: false,
  type: 'alert',
  inputProps: {
    type: 'text',
    modelValue: ''
  },
  inputError: '',
  showErr: false,
  zIndex: 99,
  lazyRender: true,
  headerImage: '',
  showClose: false,
  actionLayout: 'horizontal',
  theme: 'button'
})

function getConfirmText(): string {
  const { confirmButtonProps } = dialogState
  if (isString(confirmButtonProps)) {
    return confirmButtonProps
  }
  if (isDef(confirmButtonProps) && isObj(confirmButtonProps) && confirmButtonProps.text) {
    return confirmButtonProps.text as string
  }
  return '确定'
}

function getCancelText(): string {
  const { cancelButtonProps } = dialogState
  if (isString(cancelButtonProps)) {
    return cancelButtonProps
  }
  if (isDef(cancelButtonProps) && isObj(cancelButtonProps) && cancelButtonProps.text) {
    return cancelButtonProps.text as string
  }
  return '取消'
}

const showCancelButton = computed(() => {
  return isDef(dialogState.cancelButtonProps)
})

const showConfirmButton = computed(() => {
  return isDef(dialogState.confirmButtonProps)
})

const inputPropsWithoutModelValue = computed(() => {
  if (!dialogState.inputProps) return {}
  const { modelValue, ...rest } = dialogState.inputProps
  return rest
})

const textareaPropsWithoutModelValue = computed(() => {
  if (!dialogState.textareaProps) return {}
  const { modelValue, ...rest } = dialogState.textareaProps
  return rest
})

const customActions = computed(() => {
  if (!dialogState.actions || !dialogState.actions.length) return []
  return dialogState.actions.map((action) => {
    if (dialogState.theme === 'text') {
      return { ...action, variant: 'text' as ButtonVariant }
    }
    return action
  })
})

function getActionButtonProps(btn: DialogAction) {
  const result: Record<string, any> = {}
  for (const key in btn) {
    if (!OPEN_TYPE_EVENT_KEYS.includes(key as keyof DialogButtonOpenTypeEvents) && key !== 'click' && key !== 'text') {
      result[key] = (btn as any)[key]
    }
  }
  return result
}

function handleOpenTypeEvent(btn: DialogAction, eventName: keyof DialogButtonOpenTypeEvents, event: any) {
  const handler = btn[eventName]
  if (isFunction(handler)) {
    handler(event)
  }
}

function handleButtonOpenTypeEvent(type: 'confirm' | 'cancel', eventName: keyof DialogButtonOpenTypeEvents, event: any) {
  const buttonProps = type === 'confirm' ? dialogState.confirmButtonProps : dialogState.cancelButtonProps
  if (isDef(buttonProps) && isObj(buttonProps)) {
    const handler = (buttonProps as DialogAction)[eventName]
    if (isFunction(handler)) {
      handler(event)
    }
  }
}

const customConfirmProps = computed(() => {
  const defaultProps: Partial<ButtonProps> = {
    block: true
  }
  let buttonProps: Partial<ButtonProps> = { ...defaultProps }

  const { confirmButtonProps } = dialogState

  if (isDef(confirmButtonProps) && isObj(confirmButtonProps)) {
    const { text, ...restProps } = confirmButtonProps
    buttonProps = deepAssign(buttonProps, omitBy(restProps, isUndefined))
  }

  if (dialogState.theme === 'text') {
    buttonProps.variant = 'text'
  }

  buttonProps.customClass = `${buttonProps.customClass || ''} m-dialog__actions-btn m-dialog__actions-btn--confirm`
  return buttonProps
})

const customCancelProps = computed(() => {
  const defaultProps: Partial<ButtonProps> = {
    block: true,
    type: 'info',
    variant: 'plain'
  }
  let buttonProps: Partial<ButtonProps> = { ...defaultProps }

  const { cancelButtonProps } = dialogState

  if (isDef(cancelButtonProps) && isObj(cancelButtonProps)) {
    const { text, ...restProps } = cancelButtonProps
    buttonProps = deepAssign(buttonProps, omitBy(restProps, isUndefined))
  }

  if (dialogState.theme === 'text') {
    buttonProps.variant = 'text'
  }

  buttonProps.customClass = `${buttonProps.customClass || ''} m-dialog__actions-btn`
  return buttonProps
})

watch(
  () => messageOption.value,
  (newVal: DialogOptionsWithCallBack) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => dialogState.show,
  (newValue) => {
    resetErr(!!newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

function toggleModal(action: 'confirm' | 'cancel' | 'modal') {
  if (action === 'modal' && !dialogState.closeOnClickModal) {
    return
  }
  if (dialogState.type === 'prompt' && action === 'confirm' && !validate()) {
    return
  }
  switch (action) {
    case 'confirm':
      if (dialogState.beforeConfirm) {
        callInterceptor(dialogState.beforeConfirm as DialogBeforeConfirm, {
          args: [inputVal.value],
          done: () =>
            handleConfirm({
              action: action,
              value: inputVal.value
            })
        })
      } else {
        handleConfirm({
          action: action,
          value: inputVal.value
        })
      }
      break
    case 'cancel':
      handleCancel({
        action: action
      })
      break
    default:
      handleCancel({
        action: 'modal'
      })
      break
  }
}

function handleAction(action: any, index: number) {
  if (action.disabled || action.loading) return

  if (isFunction(action.click)) {
    action.click()
  }

  handleConfirm({
    action: 'confirm',
    value: inputVal.value
  })
}

function handleConfirm(result: DialogResult) {
  dialogState.show = false
  if (isFunction(dialogState.success)) {
    dialogState.success(result)
  }
}

function handleCancel(result: DialogResult) {
  dialogState.show = false
  if (isFunction(dialogState.success)) {
    dialogState.success(result)
  }
}

function validate() {
  if (dialogState.inputPattern && !dialogState.inputPattern.test(String(inputVal.value))) {
    dialogState.showErr = true
    return false
  }
  if (isFunction(dialogState.inputValidate)) {
    const validateResult = dialogState.inputValidate(inputVal.value!)
    if (!validateResult) {
      dialogState.showErr = true
      return false
    }
  }
  dialogState.showErr = false
  return true
}

function resetErr(val: boolean) {
  if (val === false) {
    dialogState.showErr = false
  }
}

watch(
  () => inputVal.value,
  (val) => {
    if (val === '') {
      dialogState.showErr = false
    }
  }
)

function reset(option: DialogOptionsWithCallBack) {
  if (option) {
    dialogState.title = isDef(option.title) ? option.title : ''
    dialogState.show = option.show
    dialogState.closeOnClickModal = option.closeOnClickModal
    dialogState.msg = option.msg
    dialogState.type = option.type
    dialogState.inputProps = option.inputProps
    dialogState.textareaProps = option.textareaProps

    if (isDef(option.inputValue)) {
      inputVal.value = option.inputValue!
    } else if (option.textareaProps && isDef(option.textareaProps.modelValue)) {
      inputVal.value = option.textareaProps.modelValue!
    } else if (option.inputProps && isDef(option.inputProps.modelValue)) {
      inputVal.value = option.inputProps.modelValue!
    } else {
      inputVal.value = ''
    }

    dialogState.inputPattern = option.inputPattern!
    dialogState.inputValidate = option.inputValidate
    dialogState.success = option.success
    dialogState.fail = option.fail
    dialogState.beforeConfirm = option.beforeConfirm
    dialogState.inputError = option.inputError
    dialogState.showErr = option.showErr
    dialogState.zIndex = option.zIndex
    dialogState.lazyRender = option.lazyRender
    dialogState.confirmButtonProps = option.confirmButtonProps
    dialogState.cancelButtonProps = option.cancelButtonProps
    dialogState.headerImage = option.headerImage

    const iconName = option.iconProps?.name || option.icon
    if (iconName && iconName in DIALOG_BUILTIN_ICON_MAP) {
      const builtinIcon = DIALOG_BUILTIN_ICON_MAP[iconName as DialogBuiltinIconType]
      dialogState.iconProps = { ...option.iconProps, name: builtinIcon }
      iconType.value = iconName
    } else {
      dialogState.iconProps = option.iconProps
      iconType.value = ''
    }
    dialogState.showClose = option.showClose
    dialogState.actionLayout = option.actionLayout
    dialogState.theme = option.theme
    dialogState.actions = option.actions
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>