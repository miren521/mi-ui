<template>
  <button
    :class="[
      'm-button',
      `m-button--${type}`,
      `m-button--${size}`,
      { 'm-button--plain': plain },
      { 'm-button--round': round },
      { 'm-button--disabled': disabled },
      { 'm-button--loading': loading },
      props.customClass
    ]"
    :style="props.customStyle"
    :disabled="disabled"
    @click="handleClick"
  >
    <div class="m-button__content">
      <div v-if="loading" class="m-button__loading">
        <m-icon name="sync" :size="loadingSize" />
      </div>
      <div class="m-button__text"><slot /></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'large' | 'medium' | 'small'
  plain?: boolean
  round?: boolean
  disabled?: boolean
  loading?: boolean
  loadingColor?: string
  customClass?: string
  customStyle?: string | object
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  plain: false,
  round: false,
  disabled: false,
  loading: false,
  loadingColor: '',
  customClass: '',
  customStyle: () => ({})
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const loadingSize = computed(() => {
  switch (props.size) {
    case 'large':
      return '19px'
    case 'small':
      return '14px'
    default:
      return '16px'
  }
})

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>