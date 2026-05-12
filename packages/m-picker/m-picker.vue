<template>
  <view :class="`m-picker ${customClass}`" :style="customStyle">
    <m-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      @close="onCancel"
      custom-class="m-picker__popup"
    >
      <view class="m-picker__wraper">
        <view v-if="toastVisible" class="m-picker__toast">
          <view class="m-picker__toast-icon" v-if="toastIcon">
            <m-icon :name="toastIcon" :size="24" />
          </view>
          <text class="m-picker__toast-text">{{ toastText }}</text>
        </view>
        <view class="m-picker__toolbar" @touchmove="noop">
          <view class="m-picker__action m-picker__action--cancel" @click="onCancel">
            {{ cancelButtonText || '取消' }}
          </view>
          <view v-if="title" class="m-picker__title">{{ title }}</view>
          <view class="m-picker__action m-picker__action--confirm" @click="onConfirm">
            <view v-if="confirmLoading" class="m-picker__loading">
              <view class="m-picker__loading-icon"></view>
            </view>
            <text v-else>{{ confirmButtonText || '完成' }}</text>
          </view>
        </view>
        <m-picker-view
          ref="pickerViewRef"
          :custom-class="customViewClass"
          v-model="pickerValue"
          :columns="displayColumns"
          :item-height="itemHeight"
          :visible-item-count="visibleItemCount"
          :value-key="valueKey"
          :label-key="labelKey"
          :cascade="cascade"
          :children-key="childrenKey"
          :immediate-change="immediateChange"
          @change="pickerViewChange"
          @pickstart="onPickStart"
          @pickend="onPickEnd"
        />
      </view>
    </m-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-picker',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import MPopup from '../m-popup/m-popup.vue'
import MPickerView from '../m-picker-view/m-picker-view.vue'
import { getCurrentInstance, onBeforeMount, ref, watch, onMounted } from 'vue'
import { deepClone } from '../common/util'
import { callInterceptor } from '../common/interceptor'
import { type PickerOption, type PickerViewExpose } from '../m-picker-view/types'
import { pickerProps, type PickerExpose } from './types'
import { type Numeric } from '../common/props'

const props = defineProps(pickerProps)
const emit = defineEmits(['confirm', 'open', 'cancel', 'update:modelValue', 'update:visible'])

const popupShow = ref<boolean>(false)
const pickerValue = ref<Numeric[]>([])
const pickerSelectedOptions = ref<PickerOption[]>([])
const pickerViewRef = ref<PickerViewExpose>()
const displayColumns = ref<Array<PickerOption | Array<PickerOption>>>([])
const isPicking = ref<boolean>(false)
const hasConfirmed = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const toastVisible = ref<boolean>(false)
const toastText = ref<string>('')
const toastIcon = ref<string>('')

watch(
  () => props.modelValue,
  (newValue) => {
    pickerValue.value = newValue as Numeric[]
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columns,
  (newValue) => {
    displayColumns.value = deepClone(newValue)
    if (newValue.length === 0) {
      pickerValue.value = []
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      showPopup()
    } else {
      popupShow.value = false
    }
  }
)

watch(popupShow, (val) => {
  emit('update:visible', val)
})

const { proxy } = getCurrentInstance() as any

onMounted(() => {
  if (props.visible) {
    showPopup()
  }
})

onBeforeMount(() => {
  displayColumns.value = deepClone(props.columns)
})

function open() {
  showPopup()
}

function close() {
  onCancel()
}

function showPopup() {
  emit('open')
  popupShow.value = true
  pickerValue.value = props.modelValue
  displayColumns.value = deepClone(props.columns)
}

function onCancel() {
  popupShow.value = false
  emit('cancel')
}

function showToast(text: string, icon: string = 'success') {
  toastText.value = text
  toastIcon.value = icon
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2000)
}

function onConfirm() {
  if (isPicking.value) {
    hasConfirmed.value = true
    return
  }

  const { beforeConfirm } = props
  confirmLoading.value = true
  callInterceptor(beforeConfirm, {
    args: [pickerValue.value],
    done: () => {
      confirmLoading.value = false
      handleConfirm()
    },
    canceled: () => {
      confirmLoading.value = false
    }
  })
}

function handleConfirm() {
  const values = pickerViewRef.value?.getSelectedValues() || pickerValue.value
  const selects = pickerViewRef.value?.getSelectedOptions() || pickerSelectedOptions.value

  popupShow.value = false
  emit('update:modelValue', values)

  emit('confirm', {
    value: values,
    selectedItems: selects
  })
}

function pickerViewChange({ selectedValues, selectedOptions }: any) {
  pickerValue.value = selectedValues
  pickerSelectedOptions.value = selectedOptions
}

function noop() {}

function onPickStart() {
  isPicking.value = true
}

function onPickEnd() {
  isPicking.value = false

  if (hasConfirmed.value) {
    hasConfirmed.value = false
    onConfirm()
  }
}

defineExpose<PickerExpose>({
  close,
  open
})
</script>

<style lang="scss">
@import './index.scss';
</style>
