<template>
  <view :class="rootClass" :style="rootStyle" @click="handleClick">
    <input
      v-if="dynamicInput && dynamic"
      class="m-tag__input"
      placeholder="请输入"
      placeholder-class="m-tag__placeholder"
      type="text"
      :focus="true"
      v-model="dynamicValue"
      @blur="handleBlur"
      @confirm="handleConfirm"
    />
    <view v-else-if="dynamic" class="m-tag__text" :style="textStyle" @click.stop="handleAdd">
      <slot name="add">
        <m-icon name="plus" custom-class="m-tag__add" />
        <text>新增</text>
      </slot>
    </view>

    <template v-else>
      <slot name="icon" v-if="$slots.icon || icon">
        <m-icon :name="icon" custom-class="m-tag__icon" />
      </slot>
      <text class="m-tag__text" :style="textStyle" v-if="$slots.default">
        <slot />
      </text>
      <view class="m-tag__close" v-if="closable" @click.stop="handleClose">
        <m-icon name="close" custom-class="m-tag__close-icon"></m-icon>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-tag',
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
import { objToStyle } from '../common/util'
import { computed, ref } from 'vue'
import { tagProps } from './types'

const props = defineProps(tagProps)
const emit = defineEmits(['click', 'close', 'confirm'])

const dynamicValue = ref<string>('')
const dynamicInput = ref<boolean>(false)

/**
 * 根节点类名
 */
const rootClass = computed<string>(() => {
  const { type, variant, size, round, mark, customClass } = props
  const classList: string[] = []
  type && classList.push(`is-${type}`)
  variant && classList.push(`is-${variant}`)
  size && classList.push(`is-${size}`)
  round && classList.push('is-round')
  mark && classList.push('is-mark')
  return `m-tag ${customClass} ${classList.join(' ')}`
})

/**
 * 根节点样式
 */
const rootStyle = computed<string>(() => {
  const rootStyle: Record<string, any> = {}
  if (props.variant !== 'plain' && props.variant !== 'dashed' && props.variant !== 'text' && props.bgColor) {
    rootStyle['background'] = props.bgColor
  }
  if (props.bgColor) {
    rootStyle['border-color'] = props.bgColor
  }
  return `${objToStyle(rootStyle)}${props.customStyle}`
})

/**
 * 文本样式
 */
const textStyle = computed<string>(() => {
  const textStyle: Record<string, any> = {}
  if (props.color) {
    textStyle['color'] = props.color
  }
  return objToStyle(textStyle)
})

/**
 * 处理点击事件
 * @param {MouseEvent} event 鼠标事件对象
 * @returns {void}
 */
function handleClick(event: MouseEvent) {
  emit('click', event)
}

/**
 * 处理关闭事件
 * @param {MouseEvent} event 鼠标事件对象
 * @returns {void}
 */
function handleClose(event: MouseEvent): void {
  emit('close', event)
}

/**
 * 处理添加事件
 * @returns {void}
 */
function handleAdd(): void {
  dynamicInput.value = true
  dynamicValue.value = ''
}

/**
 * 处理输入框失焦事件
 * @returns {void}
 */
function handleBlur(): void {
  setDynamicInput()
}

/**
 * 处理输入完成事件
 * @param {any} event 回车或完成事件对象
 * @returns {void}
 */
function handleConfirm(event: any): void {
  setDynamicInput()
  emit('confirm', {
    value: event.detail.value
  })
}

/**
 * 重置动态输入框状态
 * @returns {void}
 */
function setDynamicInput() {
  dynamicInput.value = false
}
</script>

<style lang="scss">
@import './index.scss';
</style>