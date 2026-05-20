<template>
  <view :class="['m-cascader', customClass]" :style="customStyle">
    <m-action-sheet
      v-model="pickerShow"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      custom-class="m-cascader__popup"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @leave="handleLeave"
      @close="handlePickerClose"
      @after-leave="handleAfterLeave"
    >
      <template v-if="props.checkStrictly" #close>
        <view class="m-cascader__action">
          <view
            :class="`m-cascader__action-confirm ${!canStrictConfirm ? 'm-cascader__action-confirm--disabled' : ''}`"
            @click="handleStrictConfirm"
          >
            {{ confirmButtonText }}
          </view>
        </view>
      </template>
      <m-tabs
        ref="tabsRef"
        :model-value="activeTab"
        slidable="always"
        :animated="inited"
        @click="handleTabClick"
        :line-width="lineWidth"
        :line-height="lineHeight"
        :line-theme="lineTheme"
      >
        <m-tab
          v-for="(tab, tabIndex) in tabs"
          :key="tabIndex"
          :title="tab.selectedOption ? tab.selectedOption[textKey] : translate('select')"
          :name="tabIndex"
          :lazy="false"
        >
          <view :class="['m-cascader__panel', { 'is-loading': loadingTabs.includes(tabIndex) }]">
            <scroll-view :scroll-y="!loadingTabs.includes(tabIndex)" class="m-cascader__list">
              <view
                v-for="(item, index) in tab.options"
                :key="index"
                :class="[
                  'm-cascader__list-item',
                  { 'm-cascader__list-item--selected': tab.selectedOption && item[valueKey] === tab.selectedOption[valueKey] },
                  { 'm-cascader__list-item--disabled': item.disabled }
                ]"
                @click="chooseItem(tabIndex, index)"
              >
                <view class="m-cascader__list-item-content">
                  <view class="m-cascader__list-item-label">{{ item[textKey] }}</view>
                  <view v-if="item[tipKey]" class="m-cascader__list-item-tip">{{ item[tipKey] }}</view>
                </view>
                <m-icon
                  custom-class="m-cascader__checked"
                  name="check"
                  v-if="tab.selectedOption && item[valueKey] === tab.selectedOption[valueKey]"
                />
              </view>
            </scroll-view>
            <view v-if="loadingTabs.includes(tabIndex)" class="m-cascader__loading">
              <m-loading custom-class="m-cascader__loading-icon" />
            </view>
          </view>
        </m-tab>
      </m-tabs>
    </m-action-sheet>
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-cascader',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import mIcon from '../m-icon/m-icon.vue'
import mActionSheet from '../m-action-sheet/m-action-sheet.vue'
import mTabs from '../m-tabs/m-tabs.vue'
import mTab from '../m-tab/m-tab.vue'
import mLoading from '../m-loading/m-loading.vue'
import { callInterceptor } from '../common/interceptor'
import { ref, watch, nextTick, computed } from 'vue'
import { isArray, isDef } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { cascaderProps, type CascaderExpose, type CascaderOption, type CascaderTab } from './types'
import { type TabsInstance } from '../m-tabs/types'

const { translate } = useTranslate('cascader')

const props = defineProps(cascaderProps)
const emit = defineEmits(['close', 'update:modelValue', 'confirm', 'update:visible'])

const tabsRef = ref<TabsInstance>()
const pickerShow = ref<boolean>(false)
const tabs = ref<CascaderTab[]>([])
const activeTab = ref<number>(0)
const inited = ref<boolean>(false)
const loadingTabs = ref<number[]>([])
const innerOptions = ref<CascaderOption[]>(props.options as CascaderOption[])
const isRestoring = ref<boolean>(false)

function getLeafValue(): string | number | '' {
  const { modelValue } = props
  if (isArray(modelValue)) {
    return modelValue.length > 0 ? modelValue[modelValue.length - 1] : ''
  }
  return isDef(modelValue) ? modelValue : ''
}

function getPathValues(): (string | number)[] {
  const { modelValue } = props
  if (isArray(modelValue)) return modelValue
  return isDef(modelValue) && modelValue !== '' ? [modelValue] : []
}

function getCachedChildren(parentValue: string | number): CascaderOption[] | null {
  const { valueKey, childrenKey } = props
  function dfs(options: CascaderOption[]): CascaderOption[] | null {
    for (const option of options) {
      if (option[valueKey] === parentValue) {
        const children = option[childrenKey]
        return isArray(children) ? children : null
      }
      if (option[childrenKey] && option[childrenKey].length > 0) {
        const result = dfs(option[childrenKey])
        if (result) return result
      }
    }
    return null
  }
  return innerOptions.value.length > 0 ? dfs(innerOptions.value) : null
}

function attachChildrenToTree(parentValue: string | number, children: CascaderOption[]) {
  const { valueKey, childrenKey } = props
  function dfs(options: CascaderOption[]): boolean {
    for (const option of options) {
      if (option[valueKey] === parentValue) {
        option[childrenKey] = children
        return true
      }
      if (option[childrenKey] && option[childrenKey].length > 0) {
        if (dfs(option[childrenKey])) return true
      }
    }
    return false
  }
  dfs(innerOptions.value)
}

function buildTabsFromTree() {
  const { childrenKey } = props
  if (!innerOptions.value.length) {
    tabs.value = []
    return
  }

  const leafValue = getLeafValue()
  const path = leafValue !== '' ? findPathByValue(innerOptions.value, leafValue) || [] : []
  const newTabs: CascaderTab[] = []

  for (let opts: CascaderOption[] | undefined = innerOptions.value, i = 0; opts?.length; i++) {
    const selectedOption = path[i] || null
    newTabs.push({ options: opts, selectedOption })
    opts = selectedOption?.[childrenKey]?.length ? selectedOption[childrenKey] : undefined
  }

  tabs.value = newTabs
  activeTab.value = Math.max(newTabs.length - 1, 0)
}

function autoRestoreFromPath(pathValues: (string | number)[]) {
  const { lazyLoad, valueKey } = props
  if (!lazyLoad || pathValues.length === 0) return

  isRestoring.value = true
  const newTabs: CascaderTab[] = []

  function restoreLevel(level: number, parentOption: CascaderOption | null) {
    const targetValue = pathValues[level]
    const isLastLevel = level === pathValues.length - 1

    let cachedOptions: CascaderOption[] | null = null
    if (level === 0) {
      cachedOptions = innerOptions.value.length > 0 ? innerOptions.value : null
    } else if (parentOption) {
      cachedOptions = getCachedChildren(parentOption[valueKey])
    }

    if (cachedOptions) {
      const matched = cachedOptions.find((opt) => opt[valueKey] === targetValue)
      newTabs.push({ options: cachedOptions, selectedOption: matched || null })
      tabs.value = [...newTabs]
      activeTab.value = newTabs.length - 1

      if (!matched || isLastLevel) {
        isRestoring.value = false
        return
      }
      restoreLevel(level + 1, matched)
    } else {
      const tabIndex = level
      newTabs.push({ options: [], selectedOption: null })
      tabs.value = [...newTabs]
      loadingTabs.value = [...loadingTabs.value, tabIndex]

      lazyLoad!(parentOption, tabIndex, (children) => {
        loadingTabs.value = loadingTabs.value.filter((i) => i !== tabIndex)

        if (level === 0) {
          innerOptions.value = children
        } else if (parentOption) {
          attachChildrenToTree(parentOption[valueKey], children)
        }

        if (children.length === 0) {
          tabs.value = newTabs.slice(0, level)
          isRestoring.value = false
          return
        }

        const matched = children.find((opt) => opt[valueKey] === targetValue)
        newTabs[tabIndex] = { options: children, selectedOption: matched || null }
        tabs.value = [...newTabs]
        activeTab.value = newTabs.length - 1

        if (!matched || isLastLevel) {
          isRestoring.value = false
          return
        }
        restoreLevel(level + 1, matched)
      })
    }
  }

  restoreLevel(0, null)
}

function buildTabs() {
  const { lazyLoad } = props

  if (lazyLoad) {
    const leafValue = getLeafValue()
    if (leafValue !== '' && innerOptions.value.length > 0) {
      const path = findPathByValue(innerOptions.value, leafValue)
      if (path) {
        buildTabsFromTree()
        return
      }
    }
    const pathValues = getPathValues()
    if (pathValues.length > 0) {
      autoRestoreFromPath(pathValues)
    }
    return
  }

  buildTabsFromTree()
}

function findPathByValue(options: CascaderOption[], target: string | number): CascaderOption[] | null {
  const { valueKey, childrenKey } = props
  for (const option of options) {
    if (option[valueKey] === target) {
      return [option]
    }
    if (option[childrenKey] && option[childrenKey].length > 0) {
      const path = findPathByValue(option[childrenKey], target)
      if (path) {
        return [option, ...path]
      }
    }
  }
  return null
}

const selectedValues = computed(() => {
  return tabs.value.map((tab: CascaderTab) => (tab.selectedOption ? tab.selectedOption[props.valueKey] : undefined)).filter(isDef)
})

const selectedOptions = computed(() => {
  return tabs.value.map((tab: CascaderTab) => tab.selectedOption).filter(Boolean) as CascaderOption[]
})

const canStrictConfirm = computed(() => {
  return !isRestoring.value
})

const confirmButtonText = computed(() => {
  return props.confirmText || translate('confirm')
})

watch(
  () => props.options,
  (newOptions) => {
    innerOptions.value = newOptions as CascaderOption[]
    if (!props.lazyLoad) {
      buildTabs()
    }
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  () => {
    if (!props.lazyLoad) {
      buildTabs()
    } else {
      const pathValues = getPathValues()
      if (pathValues.length > 0) {
        buildTabs()
      }
    }
  },
  { immediate: true }
)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      open()
    } else {
      close()
    }
  },
  { immediate: true }
)

watch(pickerShow, (val) => {
  emit('update:visible', val)
})

function close() {
  pickerShow.value = false
  handlePickerClose()
}

function open() {
  pickerShow.value = true
  if (props.lazyLoad && !tabs.value.length) {
    if (innerOptions.value.length > 0) {
      buildTabsFromTree()
    } else {
      tabs.value = [{ options: [], selectedOption: null }]
      loadingTabs.value = [0]
      props.lazyLoad(null, 0, (children) => {
        innerOptions.value = children
        tabs.value = [{ options: children, selectedOption: null }]
        loadingTabs.value = loadingTabs.value.filter((i) => i !== 0)
      })
    }
  }
}

function handleEnter() {
  tabsRef.value?.updateLineStyle()
}

function handleLeave() {
  tabsRef.value?.updateLineStyle()
}

function handleAfterEnter() {
  inited.value = true
  tabsRef.value?.updateLineStyle()
}

function handlePickerClose() {
  emit('close')
}

function handleAfterLeave() {
  buildTabs()
}

function handleStrictConfirm() {
  if (!canStrictConfirm.value) return
  handleFinish()
}

function chooseItem(tabIndex: number, index: number) {
  const currentTab = tabs.value[tabIndex]
  const item = currentTab.options[index]

  if (item.disabled) return

  const { childrenKey, lazyLoad, isLeafKey, valueKey, checkStrictly } = props

  if (checkStrictly && currentTab.selectedOption?.[valueKey] === item[valueKey]) {
    currentTab.selectedOption = null
    tabs.value = tabs.value.slice(0, tabIndex + 1)
    return
  }

  currentTab.selectedOption = item

  if (item[isLeafKey] === true) {
    tabs.value = tabs.value.slice(0, tabIndex + 1)
    handleFinish()
    return
  }

  if (lazyLoad) {
    const cachedChildren = getCachedChildren(item[valueKey])
    if (cachedChildren !== null) {
      if (cachedChildren.length === 0) {
        tabs.value = tabs.value.slice(0, tabIndex + 1)
        handleFinish()
      } else {
        const nextTabs = tabs.value.slice(0, tabIndex + 1)
        nextTabs.push({ options: cachedChildren, selectedOption: null })
        tabs.value = nextTabs
        nextTick(() => {
          activeTab.value = tabIndex + 1
        })
      }
    } else {
      const nextTabIndex = tabIndex + 1
      const nextTabs = tabs.value.slice(0, tabIndex + 1)
      nextTabs.push({ options: [], selectedOption: null })
      tabs.value = nextTabs
      loadingTabs.value = [...loadingTabs.value, nextTabIndex]
      nextTick(() => {
        activeTab.value = nextTabIndex
      })
      lazyLoad(item, nextTabIndex, (children) => {
        loadingTabs.value = loadingTabs.value.filter((i) => i !== nextTabIndex)
        attachChildrenToTree(item[valueKey], children)
        if (children.length === 0) {
          tabs.value = tabs.value.slice(0, tabIndex + 1)
          handleFinish()
        } else {
          if (tabs.value[nextTabIndex]) {
            tabs.value[nextTabIndex].options = children
          }
        }
      })
    }
    return
  }

  if (item[childrenKey] && item[childrenKey].length > 0) {
    const nextTabs = tabs.value.slice(0, tabIndex + 1)
    nextTabs.push({
      options: item[childrenKey],
      selectedOption: null
    })
    tabs.value = nextTabs
    nextTick(() => {
      activeTab.value = tabIndex + 1
    })
  } else {
    tabs.value = tabs.value.slice(0, tabIndex + 1)
    handleFinish()
  }
}

function handleFinish() {
  const { beforeConfirm } = props
  const values = selectedValues.value
  const options = selectedOptions.value
  const finalValue = values.length > 0 ? values[values.length - 1] : ''

  callInterceptor(beforeConfirm, {
    args: [finalValue, options],
    done: () => onConfirm(values, options)
  })
}

function onConfirm(selectedValues: (string | number)[], selectedOptions: CascaderOption[]) {
  pickerShow.value = false
  tabsRef.value?.updateLineStyle()
  if (props.lazyLoad) {
    emit('update:modelValue', selectedValues)
    emit('confirm', {
      value: selectedValues,
      selectedOptions
    })
  } else {
    const finalValue = selectedValues.length > 0 ? selectedValues[selectedValues.length - 1] : ''
    emit('update:modelValue', finalValue)
    emit('confirm', {
      value: finalValue,
      selectedOptions
    })
  }
}

function handleTabClick({ name }: { name: number }) {
  activeTab.value = name
}

defineExpose<CascaderExpose>({
  close,
  open
})
</script>

<style lang="scss">
@use './index.scss';
</style>