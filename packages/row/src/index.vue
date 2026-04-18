<template>
  <view 
    :class="[
      'm-row',
      `m-row--justify-${justify}`,
      `m-row--align-${align}`,
      customClass
    ]" 
    :style="rowStyle"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, provide } from 'vue'

interface RowProps {
  gutter?: string | number
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'top' | 'middle' | 'bottom'
  customClass?: string
  customStyle?: string | object
}

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  customClass: '',
  customStyle: () => ({})
})

// 提供 row 信息给子组件
provide('m-row', {
  props
})

const rowStyle = computed(() => {
  const style: CSSProperties = {}
  const { gutter } = props
  
  if (typeof gutter === 'number' && gutter < 0) {
    console.error('[m-ui] warning(m-row): attribute gutter must be greater than or equal to 0')
  } else if (gutter) {
    const gutterValue = typeof gutter === 'string' ? gutter : `${gutter}rpx`
    style.marginLeft = `-${gutterValue}`
    style.marginRight = `-${gutterValue}`
  }
  
  return {
    ...style,
    ...(typeof props.customStyle === 'object' ? props.customStyle : {})
  }
})
</script>

<style lang="scss" scoped>
@import '../style/index.scss';
</style>