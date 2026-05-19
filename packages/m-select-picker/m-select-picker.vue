<template>
  <view :class="`m-select-picker ${customClass}`" :style="customStyle">
    <m-action-sheet
      v-model="pickerShow"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      @close="close"
      @after-enter="scrollIntoView ? setScrollIntoView() : ''"
      custom-class="m-select-picker__popup"
    >
      <m-search
        v-if="filterable"
        v-model="filterVal"
        :placeholder="filterPlaceholder || translate('filterPlaceholder')"
        hide-cancel
        placeholder-left
        @change="handleFilterChange"
      />
      <scroll-view
        :class="`m-select-picker__wrapper ${loading ? 'is-loading' : ''} ${customContentClass}`"
        :scroll-y="!loading"
        :scroll-top="scrollTop"
        :scroll-with-animation="true"
        enhanced
        :show-scrollbar="false"
      >
        <!-- 多选 -->
        <view v-if="type === 'checkbox' && isArray(selectList)" class="m-select-picker__checkbox" id="m-checkbox-group">
          <m-checkbox-group
            v-model="selectList"
            :size="selectSize"
            :checked-color="checkedColor"
            :min="min"
            :max="max"
            type="square"
            placement="right"
            @change="handleChange"
          >
            <view v-for="item in filterColumns" :key="item[valueKey]" :id="'check' + item[valueKey]" class="m-select-picker__checkbox-item">
              <m-checkbox :name="item[valueKey]" :disabled="item.disabled" custom-label-class="m-select-picker__checkbox-label">
                <block v-if="showHighlightText">
                  <block v-for="text in item[labelKey]" :key="text.label">
                    <text v-if="text.type === 'active'" class="m-select-picker__text-active">{{ text.label }}</text>
                    <block v-else>{{ text.label }}</block>
                  </block>
                </block>
                <block v-else>
                  {{ item[labelKey] }}
                </block>
              </m-checkbox>
            </view>
          </m-checkbox-group>
        </view>
        <!-- 单选 -->
        <view v-if="type === 'radio' && !isArray(selectList)" class="m-select-picker__radio" id="m-radio-group">
          <m-radio-group
            v-model="selectList"
            cell
            :size="selectSize"
            :checked-color="checkedColor"
            placement="right"
            type="dot"
            @change="handleChange"
          >
            <view v-for="(item, index) in filterColumns" :key="index" :id="'radio' + item[valueKey]" class="m-select-picker__radio-item">
              <m-radio :value="item[valueKey]" :disabled="item.disabled" custom-label-class="m-select-picker__radio-label">
                <block v-if="showHighlightText">
                  <block v-for="text in item[labelKey]" :key="text.label">
                    <text :class="`${text.type === 'active' ? 'm-select-picker__text-active' : ''}`">{{ text.label }}</text>
                  </block>
                </block>
                <block v-else>
                  {{ item[labelKey] }}
                </block>
              </m-radio>
            </view>
          </m-radio-group>
        </view>
        <view v-if="loading" class="m-select-picker__loading" @touchmove="noop">
          <m-loading :color="loadingColor" custom-class="m-select-picker__loading-icon" />
        </view>
      </scroll-view>
      <!-- 确认按钮 -->
      <view v-if="showConfirm" class="m-select-picker__footer">
        <m-button block size="large" @click="onConfirm" :disabled="loading">{{ confirmButtonText || '确认' }}</m-button>
      </view>
    </m-action-sheet>
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-select-picker',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import mActionSheet from '../m-action-sheet/m-action-sheet.vue'
import mCheckbox from '../m-checkbox/m-checkbox.vue'
import mCheckboxGroup from '../m-checkbox-group/m-checkbox-group.vue'
import mRadio from '../m-radio/m-radio.vue'
import mRadioGroup from '../m-radio-group/m-radio-group.vue'
import mButton from '../m-button/m-button.vue'
import mLoading from '../m-loading/m-loading.vue'
import mSearch from '../m-search/m-search.vue'

import { getCurrentInstance, onBeforeMount, ref, watch, nextTick, computed } from 'vue'
import { getRect, isArray, isDef, isFunction, pause } from '../common/util'
import { callInterceptor } from '../common/interceptor'
import { useTranslate } from '../composables/useTranslate'
import { selectPickerProps, type SelectPickerExpose } from './types'

const { translate } = useTranslate('select-picker')

const props = defineProps(selectPickerProps)
const emit = defineEmits(['change', 'cancel', 'confirm', 'update:modelValue', 'open', 'close', 'update:visible'])

const pickerShow = ref<boolean>(false)
const selectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const isConfirm = ref<boolean>(false)
const lastSelectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const filterVal = ref<string>('')
const filterColumns = ref<Array<Record<string, any>>>([])
const scrollTop = ref<number>(0)

const valueItemMap = computed(() => {
  const map = new Map<string | number | boolean, Record<string, any>>()
  const { columns, valueKey } = props
  columns.forEach((item) => {
    map.set(item[valueKey], item)
  })
  return map
})

const showHighlightText = computed(() => {
  return props.filterable && !!filterVal.value
})

function getModelValueWatchKey(value: string | number | boolean | (string | number | boolean)[]) {
  if (props.type === 'checkbox') {
    return isArray(value) ? value.join('|') : ''
  }
  return isDef(value) ? String(value) : ''
}

function getColumnsWatchKey(columns: Record<string, any>[]) {
  const { valueKey, labelKey } = props
  return columns
    .map((item) => {
      const value = isDef(item[valueKey]) ? String(item[valueKey]) : ''
      const label = isDef(item[labelKey]) ? String(item[labelKey]) : ''
      return `${value}|${label}|${item.disabled ? '1' : '0'}`
    })
    .join('||')
}

watch(
  () => getModelValueWatchKey(props.modelValue),
  () => {
    const newValue = props.modelValue
    if (newValue === selectList.value) return
    selectList.value = valueFormat(newValue)
    lastSelectList.value = valueFormat(newValue)
  },
  {
    immediate: true
  }
)

watch(
  () => getColumnsWatchKey(props.columns),
  () => {
    const newValue = props.columns
    if (props.filterable && filterVal.value) {
      formatFilterColumns(newValue, filterVal.value)
    } else {
      filterColumns.value = newValue
    }
  },
  {
    immediate: true
  }
)

watch(
  () => props.visible,
  (val) => {
    pickerShow.value = val
  },
  {
    immediate: true
  }
)

onBeforeMount(() => {
  selectList.value = valueFormat(props.modelValue)
  filterColumns.value = props.columns
})

const { proxy } = getCurrentInstance() as any

async function setScrollIntoView() {
  let wraperSelector: string = ''
  let targetSelector: string = ''
  if (isDef(selectList.value) && selectList.value !== '' && !isArray(selectList.value)) {
    wraperSelector = '#m-radio-group'
    targetSelector = `#radio${selectList.value}`
  } else if (isArray(selectList.value) && selectList.value.length > 0) {
    wraperSelector = '#m-checkbox-group'
    targetSelector = `#check${selectList.value[0]}`
  }
  if (wraperSelector && targetSelector) {
    await pause(2000 / 30)
    const [scrollView, wraper, target] = await Promise.all([
      getRect('.m-select-picker__wrapper', false, proxy),
      getRect(wraperSelector, false, proxy),
      getRect(targetSelector, false, proxy)
    ])

    if (isDef(wraper) && isDef(scrollView) && isDef(target)) {
      const isVisible = target.bottom! > scrollView.top! && target.top! < scrollView.bottom!
      if (!isVisible) {
        scrollTop.value = -1
        nextTick(() => {
          scrollTop.value = Math.max(0, target.top! - wraper.top! - scrollView.height! / 2)
        })
      }
    }
  }
}

function noop() {}

function getSelectedItem(value: string | number | boolean) {
  const { valueKey, labelKey } = props
  const selected = valueItemMap.value.get(value)

  if (selected) {
    return selected
  }

  return {
    [valueKey]: value,
    [labelKey]: ''
  }
}

function valueFormat(value: string | number | boolean | (string | number | boolean)[]) {
  return props.type === 'checkbox' ? (isArray(value) ? value : []) : value
}

function handleChange({ value }: { value: string | number | boolean | (string | number | boolean)[] }) {
  selectList.value = value
  emit('change', { value })
  if (props.type === 'radio' && !props.showConfirm) {
    onConfirm()
  }
}

function close() {
  if (!pickerShow.value) return
  pickerShow.value = false
  emit('update:visible', false)
  if (!isConfirm.value) {
    selectList.value = valueFormat(lastSelectList.value)
  }
  emit('cancel')
  emit('close')
}

function open() {
  selectList.value = valueFormat(props.modelValue)
  pickerShow.value = true
  emit('update:visible', true)
  isConfirm.value = false
  emit('open')
}

function onConfirm() {
  if (props.loading) {
    pickerShow.value = false
    emit('update:visible', false)
    emit('confirm')
    emit('close')
    return
  }
  callInterceptor(props.beforeConfirm, {
    args: [selectList.value],
    done: () => {
      handleConfirm()
    }
  })
}

function handleConfirm() {
  isConfirm.value = true
  pickerShow.value = false
  emit('update:visible', false)
  lastSelectList.value = valueFormat(selectList.value)
  let selectedItems: Record<string, any> = {}
  if (props.type === 'checkbox') {
    selectedItems = (isArray(lastSelectList.value) ? lastSelectList.value : []).map((item) => {
      return getSelectedItem(item)
    })
  } else {
    selectedItems = getSelectedItem(lastSelectList.value as string | number | boolean)
  }
  emit('update:modelValue', lastSelectList.value)
  emit('confirm', {
    value: lastSelectList.value,
    selectedItems
  })
  emit('close')
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getFilterText(label: string, filterVal: string): Array<{ type: 'active' | 'normal'; label: string }> {
  const reg = new RegExp(`(${escapeRegExp(filterVal)})`, 'g')

  return label.split(reg).map((text) => {
    return {
      type: text === filterVal ? 'active' : 'normal',
      label: text
    }
  })
}

function handleFilterChange({ value }: { value: string }) {
  filterVal.value = value
  if (value === '') {
    filterColumns.value = props.columns
  } else {
    formatFilterColumns(props.columns, value)
  }
}

function formatFilterColumns(columns: Record<string, any>[], filterVal: string) {
  const filterColumnsTemp = columns.filter((item) => {
    return item[props.labelKey].indexOf(filterVal) > -1
  })

  const formatFilterColumns = filterColumnsTemp.map((item) => {
    return {
      ...item,
      [props.labelKey]: getFilterText(item[props.labelKey], filterVal)
    }
  })
  filterColumns.value = formatFilterColumns
}

const showConfirm = computed(() => {
  return (props.type === 'radio' && props.showConfirm) || props.type === 'checkbox'
})

defineExpose<SelectPickerExpose>({
  close,
  open
})
</script>
<style lang="scss">
@import './index.scss';
</style>