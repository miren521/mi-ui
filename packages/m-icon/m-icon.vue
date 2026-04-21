<template>
  <view @click="handleClick" :class="rootClass" :style="rootStyle">
    <image v-if="isImage" class="m-icon__image" :src="name"></image>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-icon',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'

interface IconProps {
  name: string
  color?: string
  size?: string | number
  classPrefix?: string
  customClass?: string
  customStyle?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  classPrefix: 'm-icon',
  customClass: '',
  customStyle: ''
})

const emit = defineEmits(['click', 'touch'])

function isDef(value: any): boolean {
  return value !== undefined && value !== null
}

function addUnit(value: string | number): string {
  if (isDef(value)) {
    const str = String(value)
    return /^\d+(\.\d+)?$/.test(str) ? `${str}px` : str
  }
  return ''
}

function objToStyle(style: CSSProperties): string {
  return Object.keys(style).map(key => `${key}: ${style[key]}`).join('; ')
}

const isImage = computed(() => {
  return isDef(props.name) && props.name.includes('/')
})

const rootClass = computed(() => {
  const prefix = props.classPrefix
  return `${prefix} ${props.customClass} ${isImage.value ? 'm-icon--image' : prefix + '-' + props.name}`
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.color) {
    style['color'] = props.color
  }
  if (props.size) {
    style['font-size'] = addUnit(props.size)
  }
  return `${objToStyle(style)} ${props.customStyle}`
})

function handleClick(event: any) {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>