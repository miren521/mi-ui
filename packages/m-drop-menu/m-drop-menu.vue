<template>
  <view :style="customStyle" :class="`m-drop-menu ${customClass}`" @click.stop.prevent="noop" :id="dropMenuId">
    <m-overlay
      :show="overlayVisible"
      :duration="duration"
      :z-index="12"
      :custom-style="modalStyle"
      @click="handleClickOverlay"
      @touchmove="noop"
      v-if="modal"
    />

    <!-- #ifdef MP-DINGTALK -->
    <view :id="dropMenuId">
      <!-- #endif -->
      <view class="m-drop-menu__list">
        <view
          v-for="(child, index) in children"
          :key="index"
          @click="toggle(child)"
          :class="`m-drop-menu__option ${child.disabled ? 'is-disabled' : ''} ${child.$.exposed!.getShowPop() ? 'is-active' : ''}`"
        >
          <view class="m-drop-menu__option-title">
            <view class="m-drop-menu__option-title-text">{{ getDisplayTitle(child) }}</view>
            <m-icon :name="child.icon" :size="child.iconSize" custom-class="m-drop-menu__arrow" />
          </view>
        </view>
      </view>
      <slot />
      <!-- #ifdef MP-DINGTALK -->
    </view>
    <!-- #endif -->
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-drop-menu',
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
import { computed, getCurrentInstance, inject, onBeforeMount, ref, watch } from 'vue'
import { getRect, getSystemInfo, uuid } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { DROP_MENU_KEY, dropMenuProps } from './types'
import MOverlay from '../m-overlay/m-overlay.vue'
import MIcon from '../m-icon/m-icon.vue'

const props = defineProps(dropMenuProps)
const dropMenuId = ref<string>(`dropMenuId${uuid()}`)
const offset = ref<number>(0)
const windowHeight = ref<number>(0)
const modalStyle = computed(() => {
  return props.direction === 'down'
    ? `top: calc(var(--window-top) + ${offset.value}px); bottom: 0;`
    : `top: 0; bottom: calc(var(--window-bottom) + ${offset.value}px)`
})

const { proxy } = getCurrentInstance() as any

const { linkChildren, children } = useChildren(DROP_MENU_KEY)

const showOverlay = computed(() => {
  return children.some((child) => child.$.exposed!.getShowPop())
})

const overlayVisible = ref(false)
let overlayTimer: ReturnType<typeof setTimeout> | null

watch(showOverlay, (newVal) => {
  if (overlayTimer) {
    clearTimeout(overlayTimer)
  }
  if (newVal) {
    overlayVisible.value = true
  } else {
    overlayTimer = setTimeout(() => {
      overlayVisible.value = false
      overlayTimer = null
    }, 16)
  }
})

linkChildren({ props, fold, offset })

watch(
  () => props.direction,
  (newValue) => {
    if (!['up', 'down'].includes(newValue)) {
      console.error("[m-ui] warning(m-drop-menu): direction must be 'up' or 'down'")
    }
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  windowHeight.value = getSystemInfo().windowHeight
})

function noop() {}

function getDisplayTitle(child: any) {
  const { title, modelValue, options, valueKey, labelKey } = child

  if (title) {
    return title
  }
  for (let i = 0, len = options.length; i < len; i++) {
    if (modelValue === options[i][valueKey]) {
      return options[i][labelKey]
    }
  }
  console.error('[m-ui] warning(m-drop-menu-item): no value is matched in the options option.')
}

function toggle(child: any) {
  if (child && !child.disabled) {
    children.forEach((c) => {
      if (c.$.uid !== child.$.uid) {
        c.$.exposed!.close()
      }
    })
    fold(child)
  }
}

function fold(child: any) {
  getRect(`#${dropMenuId.value}`, false, proxy).then((rect) => {
    if (!rect) return
    const { top, bottom } = rect as UniApp.NodeInfo
    if (props.direction === 'down') {
      offset.value = Number(bottom)
    } else {
      offset.value = windowHeight.value - Number(top)
    }
    child.$.exposed!.toggle()
  })
}

function handleClickOverlay() {
  if (props.closeOnClickModal) {
    children.forEach((child) => {
      child.$.exposed!.close()
    })
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
