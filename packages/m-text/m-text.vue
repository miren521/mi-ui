<template>
  <text @click="handleClick" :class="rootClass" :style="rootStyle">
    <slot v-if="$slots.prefix || prefix" name="prefix">{{ prefix }}</slot>
    <text>{{ formattedText }}</text>
    <slot v-if="$slots.suffix || suffix" name="suffix">{{ suffix }}</slot>
  </text>
</template>

<script lang="ts">
export default {
  name: 'm-text',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { isDef, objToStyle } from '../common/util'
import { textProps } from './types'
import dayjs from 'dayjs'

const props = defineProps(textProps)
const emit = defineEmits(['click'])

const textClass = ref<string>('')

watch(
  () => ({
    type: props.type,
    text: props.text,
    mode: props.mode,
    color: props.color,
    bold: props.bold,
    lines: props.lines,
    format: props.format
  }),
  ({ type }) => {
    const types = ['primary', 'error', 'warning', 'success', 'default']
    if (type && !types.includes(type)) {
      console.error(`type must be one of ${types.toString()}`)
    }
    computeTextClass()
  },
  { deep: true, immediate: true }
)

const rootClass = computed(() => {
  return `m-text ${props.customClass} ${textClass.value}`
})

const rootStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.color) {
    style['color'] = props.color
  }
  if (props.size) {
    style['font-size'] = `${props.size}`
  }
  if (props.lineHeight) {
    style['line-height'] = `${props.lineHeight}`
  }
  if (props.decoration) {
    style['text-decoration'] = `${props.decoration}`
  }
  return `${objToStyle(style)}${props.customStyle}`
})

function computeTextClass() {
  const { type, color, bold, lines } = props
  const textClassList: string[] = []
  if (!color) {
    textClassList.push(`is-${type}`)
  }
  if (isDef(lines)) {
    textClassList.push(`is-lines-${lines}`)
  }
  bold && textClassList.push('is-bold')
  textClass.value = textClassList.join(' ')
}

function formatText(text: string, format: boolean, mode: string): string {
  if (format) {
    if (mode === 'phone') {
      return text.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    } else if (mode === 'name') {
      return text.replace(/^(.).*(.)$/, '$1**$2')
    } else {
      throw new Error('mode must be one of phone or name for encryption')
    }
  }
  return text
}

function formatNumber(num: number | string): string {
  num = Number(num).toFixed(2)
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1,$2')
  }
  return x1 + x2
}

const formattedText = computed(() => {
  const { text, mode, format } = props
  if (mode === 'date') {
    return dayjs(Number(text)).format('YYYY-MM-DD')
  }
  if (mode === 'price') {
    return formatNumber(text)
  }
  return formatText(`${text}`, format, mode)
})

function handleClick(event: Event) {
  emit('click', event)
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>