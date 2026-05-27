<template>
  <view :class="`m-sidebar ${customClass}`" :style="customStyle">
    <slot></slot>
    <view class="m-sidebar__padding"></view>
  </view>
</template>

<script setup lang="ts">
import { callInterceptor } from '../common/interceptor'
import { useChildren } from '../composables/useChildren'
import { SIDEBAR_KEY, sidebarProps } from './types'

const props = defineProps(sidebarProps)
const emit = defineEmits(['change', 'update:modelValue'])

const { linkChildren } = useChildren(SIDEBAR_KEY)
linkChildren({ props, setChange })

function setChange(value: number | string, label: string) {
  callInterceptor(props.beforeChange, {
    args: [value],
    done: () => updateValue(value, label)
  })
}

function updateValue(value: number | string, label: string) {
  emit('update:modelValue', value)
  emit('change', { value, label })
}
</script>

<style lang="scss">
@use './index.scss';
</style>
