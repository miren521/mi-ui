<template>
  <view @click="handleClick" :class="rootClass" :style="rootStyle">
    <image v-if="isImage" class="m-icon__image" :src="name" />
    <text v-else-if="isDef(cssIcon)" :class="`m-icon__css ${customClass}`" :style="cssIconStyle">{{ cssIcon }}</text>
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
  cssIcon?: string | boolean
}

const props = withDefaults(defineProps<IconProps>(), {
  classPrefix: 'm-icon',
  customClass: '',
  customStyle: '',
  cssIcon: ''
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

const isCssIcon = computed(() => {
  return isDef(props.cssIcon) && props.cssIcon !== ''
})

const rootClass = computed(() => {
  const prefix = props.classPrefix
  if (isCssIcon.value) {
    return props.customClass
  }
  return `${prefix} ${props.customClass} ${isImage.value ? 'm-icon--image' : prefix + '-' + props.name}`
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.color && !isCssIcon.value) {
    style['color'] = props.color
  }
  if (props.size && !isCssIcon.value) {
    style['font-size'] = addUnit(props.size)
  }
  return `${objToStyle(style)} ${props.customStyle}`
})

const cssIconStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.color) {
    style['color'] = props.color
  }
  if (props.size) {
    style['font-size'] = addUnit(props.size)
  }
  return objToStyle(style)
})

function handleClick(event: any) {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
