<template>
  <m-popup
    v-model="state.visible"
    :custom-style="popupStyle"
    :position="state.position"
    :z-index="state.zIndex"
    :modal="false"
    :root-portal="state.rootPortal"
    @leave="onClosed"
    @enter="onOpened"
    contentStyle="padding: 0"
  >
    <view
      :class="[
        'm-notify',
        `m-notify--${state.type}`,
        `m-notify--${state.position}`,
        state.variant === 'floating' ? 'm-notify--floating' : '',
        customClass
      ]"
      :style="rootStyle"
      @click="onClick"
    >
      <slot name="prefix">
        <m-icon v-if="iconName" :name="iconName" custom-class="m-notify__prefix"></m-icon>
      </slot>
      <view class="m-notify__content">
        <slot>
          <text>{{ state.message }}</text>
        </slot>
      </view>
      <slot name="close" v-if="state.closable">
        <m-icon name="close" custom-class="m-notify__close" @click.stop="handleClose"></m-icon>
      </slot>
    </view>
  </m-popup>
</template>

<script lang="ts">
export default {
  name: 'm-notify',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import mPopup from '../m-popup/m-popup.vue'
import mIcon from '../m-icon/m-icon.vue'
import { inject, computed, watch, ref, type CSSProperties } from 'vue'
import { notifyProps, type NotifyProps } from './types'
import { getNotifyOptionKey } from '.'
import { addUnit, isFunction, objToStyle } from '../common/util'

const props = defineProps(notifyProps)

const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'click', event: MouseEvent): void
  (e: 'closed'): void
  (e: 'opened'): void
}>()

const state = inject(getNotifyOptionKey(props.selector), ref<NotifyProps>(props))

const iconName = computed(() => {
  const { type } = state.value
  switch (type) {
    case 'success':
      return 'check-circle-fill'
    case 'warning':
      return 'exclamation-circle-fill'
    case 'danger':
      return 'close-circle-fill'
    default:
      return 'info-circle-fill'
  }
})

const popupStyle = computed(() => {
  const { safeHeight, position, variant } = state.value
  const styles: CSSProperties = {
    overflow: 'unset',
    background: 'transparent'
  }
  switch (position) {
    case 'top':
      styles['top'] = `calc(var(--window-top, 0px) + ${addUnit(safeHeight || 0)})`
      break
    case 'bottom':
      styles['bottom'] = 'var(--window-bottom, 0px)'
      break
    default:
      break
  }
  if (variant === 'floating') {
    styles['left'] = 'var(--m-notify-floating-margin-horizontal, 12px)'
    styles['right'] = 'var(--m-notify-floating-margin-horizontal, 12px)'
    styles['width'] = 'auto'
  }
  return objToStyle(styles)
})

const rootStyle = computed(() => {
  const { customStyle } = props
  const style: CSSProperties = {}
  if (state.value.color) {
    style.color = state.value.color
  }
  if (state.value.background) {
    style.background = state.value.background
  }
  return `${objToStyle(style)};${customStyle}`
})

const onClick = (event: MouseEvent) => {
  if (isFunction(state.value.onClick)) return state.value.onClick(event)
  emits('click', event)
}

const onClosed = () => {
  if (isFunction(state.value.onClosed)) return state.value.onClosed()
  emits('closed')
}

const onOpened = () => {
  if (isFunction(state.value.onOpened)) return state.value.onOpened()
  emits('opened')
}

const handleClose = () => {
  state.value.visible = false
}

watch(
  () => state.value.visible,
  (visible) => {
    emits('update:visible', visible as boolean)
  },
  { deep: true }
)
</script>

<style lang="scss">
@import './index.scss';
</style>