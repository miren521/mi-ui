<template>
  <view 
    :class="[
      'm-col',
      span && `m-col__${span}`,
      offset && `m-col__offset-${offset}`,
      customClass
    ]" 
    :style="colStyle"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, watch, inject, type CSSProperties } from 'vue'

interface ColProps {
  span?: string | number
  offset?: string | number
  customClass?: string
  customStyle?: string | object
}

const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
  customClass: '',
  customStyle: () => ({})
})

// 从父组件注入 row 信息
const row = inject('m-row', null)

// 计算列样式
const colStyle = computed(() => {
  const style: CSSProperties = {}
  
  // 获取父组件的 gutter 值
  const gutter = row?.props.gutter || 0
  
  if (gutter) {
    const gutterValue = typeof gutter === 'string' ? gutter : `${gutter}rpx`
    style.paddingLeft = gutterValue
    style.paddingRight = gutterValue
  }
  
  return {
    ...style,
    ...(typeof props.customStyle === 'object' ? props.customStyle : {})
  }
})

// 检查 span 和 offset 的值是否合法
watch([() => props.span, () => props.offset], () => {
  check()
})

function check() {
  const { span, offset } = props
  const spanNum = typeof span === 'string' ? parseInt(span) : span
  const offsetNum = typeof offset === 'string' ? parseInt(offset) : offset
  
  if (spanNum < 0 || offsetNum < 0) {
    console.error('[m-ui] warning(m-col): attribute span/offset must be greater than or equal to 0')
  }
  
  if (spanNum > 24 || offsetNum > 24) {
    console.error('[m-ui] warning(m-col): attribute span/offset must be less than or equal to 24')
  }
}
</script>

<style lang="scss" scoped>
@import '../style/index.scss';
</style>