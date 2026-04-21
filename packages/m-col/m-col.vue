<template>
  <view :class="['m-col', span && 'm-col__' + span, offset && 'm-col__offset-' + offset, customClass]" :style="rootStyle">
    <!-- 每一列 -->
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'm-col',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, watch, inject } from 'vue'

interface ColProps {
  span?: number
  offset?: number
  customClass?: string
  customStyle?: string
}

const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
  customClass: '',
  customStyle: ''
})

// 从父组件注入 row 信息
const row = inject('m-row', null)

const rootStyle = computed(() => {
  const gutter = row ? row.props.gutter || 0 : 0
  const padding = `${gutter / 2}rpx`
  const style = gutter > 0 ? `padding-left: ${padding}; padding-right: ${padding};background-clip: content-box;` : ''
  return `${style}${props.customStyle}`
})

watch([() => props.span, () => props.offset], () => {
  check()
})

function check() {
  const { span, offset } = props
  if (span < 0 || offset < 0) {
    console.error('[m-ui] warning(m-col): attribute span/offset must be greater than or equal to 0')
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
