<template>
  <view :class="`m-pagination ${customClass}`" :style="customStyle" v-if="!(hideIfOnePage && totalPageNum === 1)">
    <view class="m-pagination__content">
      <slot name="prev" :modelValue="modelValue" :totalPageNum="totalPageNum" :total="total" :pageSize="pageSize">
        <m-button
          :plain="plain"
          type="info"
          size="small"
          :disabled="modelValue <= 1"
          :custom-class="`m-pagination__nav`"
          @click="sub"
        >
          <m-icon v-if="showIcon" name="left" size="16" />
          <text v-else>{{ prevText || '上一页' }}</text>
        </m-button>
      </slot>
      <slot name="size" :modelValue="modelValue" :totalPageNum="totalPageNum" :total="total" :pageSize="pageSize">
        <view class="m-pagination__size">
          <text class="m-pagination__current">{{ modelValue }}</text>
          <text class="m-pagination__separator">/</text>
          <text class="m-pagination__total">{{ totalPageNum }}</text>
        </view>
      </slot>
      <slot name="next" :modelValue="modelValue" :totalPageNum="totalPageNum" :total="total" :pageSize="pageSize">
        <m-button
          :plain="plain"
          type="primary"
          size="small"
          :disabled="modelValue >= totalPageNum"
          :custom-class="`m-pagination__nav`"
          @click="add"
        >
          <m-icon v-if="showIcon" name="right" size="16" />
          <text v-else>{{ nextText || '下一页' }}</text>
        </m-button>
      </slot>
    </view>
    <slot name="message" :modelValue="modelValue" :totalPageNum="totalPageNum" :total="total" :pageSize="pageSize" v-if="showMessage">
      <view class="m-pagination__message">
        <text>第 {{ modelValue }} 页，</text>
        <text v-if="total">共 {{ total }} 条，</text>
        <text>每页 {{ pageSize }} 条</text>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import mButton from '../m-button/m-button.vue'
import mIcon from '../m-icon/m-icon.vue'
import { ref, watch, computed } from 'vue'
import { paginationProps } from './types'

const props = defineProps(paginationProps)
const emit = defineEmits(['change', 'update:modelValue'])

const totalPageNum = computed(() => {
  if (props.total > 0) {
    return Math.ceil(props.total / props.pageSize)
  }
  return props.totalPage
})

function add() {
  const { modelValue } = props
  if (modelValue > totalPageNum.value - 1) {
    return
  }
  emit('change', { value: modelValue + 1 })
  emit('update:modelValue', modelValue + 1)
}

function sub() {
  const { modelValue } = props
  if (modelValue < 2) {
    return
  }
  emit('change', { value: modelValue - 1 })
  emit('update:modelValue', modelValue - 1)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
