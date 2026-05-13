<template>
  <view class="m-action-sheet-wrapper">
    <m-popup
      custom-class="m-action-sheet-wrapper__popup"
      :custom-style="`${(actions && actions.length) || (panels && panels.length) ? 'background: transparent;' : ''}`"
      v-model="showPopup"
      :duration="duration"
      position="bottom"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :lazy-render="lazyRender"
      :root-portal="rootPortal"
      round
      @close="close"
      @enter="emit('enter')"
      @after-enter="emit('after-enter')"
      @leave="emit('leave')"
      @after-leave="emit('after-leave')"
      @click-modal="handleClickModal"
      :z-index="zIndex"
    >
      <view
        :class="`m-action-sheet ${customClass}`"
        :style="`${(actions && actions.length) || (panels && panels.length) ? ' ' : ''} ${customStyle}`"
      >
        <view v-if="title" :class="`m-action-sheet__title ${customTitleClass}`">
          {{ title }}
          <slot name="close" :close="close">
            <m-icon custom-class="m-action-sheet__close" name="close" @click="close" />
          </slot>
        </view>

        <slot>
          <view class="m-action-sheet__actions" v-if="actions && actions.length">
            <view
              v-for="(action, rowIndex) in actions"
              :key="rowIndex"
              :class="`m-action-sheet__action ${title ? '' : 'is-border'} ${action.disabled ? 'm-action-sheet__action--disabled' : ''}  ${
                action.loading ? 'm-action-sheet__action--loading' : ''
              }`"
              :style="`color: ${action.color}`"
              @click="select(rowIndex, 'action')"
            >
              <m-loading custom-class="`m-action-sheet__action-loading" v-if="action.loading" />
              <view v-else class="m-action-sheet__name">{{ action.name }}</view>
              <view v-if="!action.loading && action.description" class="m-action-sheet__description">{{ action.description }}</view>
            </view>
          </view>
          <view v-if="isArray(formatPanels) && formatPanels.length" class="m-action-sheet__panels-wrap">
            <view v-for="(panel, rowIndex) in formatPanels" :key="rowIndex" class="m-action-sheet__panels">
              <view class="m-action-sheet__panels-content">
                <view v-for="(col, colIndex) in panel" :key="colIndex" class="m-action-sheet__panel" @click="select(rowIndex, 'panels', colIndex)">
                  <m-icon custom-class="m-action-sheet__panel-img" :name="col.icon" />
                  <view class="m-action-sheet__panel-title">{{ col.title }}</view>
                </view>
              </view>
            </view>
          </view>
        </slot>
        <view v-if="cancelText" class="m-action-sheet__gap"></view>
        <view v-if="cancelText" class="m-action-sheet__cancel" @click="handleCancel">{{ cancelText }}</view>
      </view>
    </m-popup>
  </view>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import mPopup from '../m-popup/m-popup.vue'
import mIcon from '../m-icon/m-icon.vue'
import mLoading from '../m-loading/m-loading.vue'
import { actionSheetProps, type Panel } from './types'
import { isArray } from '../common/util'

const props = defineProps(actionSheetProps)
const emit = defineEmits(['select', 'click-modal', 'cancel', 'leave', 'after-leave', 'close', 'enter', 'after-enter', 'update:modelValue'])

const formatPanels = ref<Array<Panel[]>>([])
const showPopup = ref<boolean>(false)

watch(() => props.panels, computedValue, { deep: true, immediate: true })

watch(
  () => props.modelValue,
  (newValue) => {
    showPopup.value = newValue
  },
  { deep: true, immediate: true }
)

function isPanelArray() {
  return props.panels.length && !isArray(props.panels[0])
}

function computedValue() {
  formatPanels.value = isPanelArray() ? [props.panels as Panel[]] : (props.panels as Panel[][])
}

function select(rowIndex: number, type: 'action' | 'panels', colIndex?: number) {
  if (type === 'action') {
    if (props.actions[rowIndex].disabled || props.actions[rowIndex].loading) {
      return
    }
    emit('select', {
      item: props.actions[rowIndex],
      index: rowIndex
    })
  } else if (isPanelArray()) {
    emit('select', {
      item: props.panels[Number(colIndex)],
      index: colIndex
    })
  } else {
    emit('select', {
      item: (props.panels as Panel[][])[rowIndex][Number(colIndex)],
      rowIndex,
      colIndex
    })
  }
  if (props.closeOnClickAction) {
    emit('update:modelValue', false)
  }
}

function handleClickModal() {
  emit('click-modal')
}

function handleCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

function close() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style lang="scss">
@use './index.scss';
</style>
