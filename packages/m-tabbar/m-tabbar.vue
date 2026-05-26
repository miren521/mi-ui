<template>
  <view :class="{ 'm-tabbar__placeholder': fixed && placeholder }" :style="{ height: addUnit(height) }">
    <view
      :class="`m-tabbar m-tabbar--${shape} ${customClass} ${fixed ? 'is-fixed' : ''} ${safeAreaInsetBottom ? 'is-safe' : ''} ${
        bordered ? 'is-border' : ''
      }`"
      :style="rootStyle"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref, watch, nextTick, computed, type CSSProperties } from 'vue'
import type { TabbarItem } from '../m-tabbar-item/types'
import { addUnit, getRect, isDef, objToStyle } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { TABBAR_KEY, tabbarProps } from './types'
import { callInterceptor } from '../common/interceptor'

const props = defineProps(tabbarProps)
const emit = defineEmits(['change', 'update:modelValue'])

const height = ref<number | string>('')
const { proxy } = getCurrentInstance() as any

const { linkChildren } = useChildren(TABBAR_KEY)

linkChildren({
  props,
  setChange
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.zIndex)) {
    style['z-index'] = props.zIndex
  }
  return `${objToStyle(style)}${props.customStyle}`
})

watch(
  [() => props.fixed, () => props.placeholder],
  () => {
    setPlaceholderHeight()
  },
  { deep: true, immediate: false }
)

onMounted(() => {
  if (props.fixed && props.placeholder) {
    nextTick(() => {
      setPlaceholderHeight()
    })
  }
})

function setChange(child: TabbarItem) {
  let active = child.name
  if (active === props.modelValue) {
    return
  }
  const change = () => {
    emit('update:modelValue', active)
    emit('change', {
      value: active
    })
  }
  callInterceptor(props.beforeChange, { args: [active], done: change })
}

function setPlaceholderHeight() {
  if (!props.fixed || !props.placeholder) {
    return
  }

  getRect('.m-tabbar', false, proxy).then((res) => {
    height.value = Number(res.height)
  })
}
</script>

<style lang="scss">
@use './index.scss';
</style>
