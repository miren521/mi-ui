<template>
  <view :class="['m-loadmore', customClass]" :style="customStyle" @click="reload">
    <slot v-if="state === 'finished'" name="finished">
      <m-divider custom-class="m-loadmore__divider">{{ finishedText || translate('finished') }}</m-divider>
    </slot>
    <slot v-else-if="state === 'error'" name="error">
      <text class="m-loadmore__text">{{ errorText || translate('error') }}</text>
      <text class="m-loadmore__refresh-text">{{ translate('retry') }}</text>
      <m-icon name="refresh" custom-class="m-loadmore__refresh" />
    </slot>
    <slot v-else-if="state === 'loading'" name="loading">
      <m-loading v-bind="customLoadingProps" />
      <text class="m-loadmore__text">{{ loadingText || translate('loading') }}</text>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-loadmore',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import MLoading from '../m-loading/m-loading.vue'
import MIcon from '../m-icon/m-icon.vue'
import MDivider from '../m-divider/m-divider.vue'
import { useTranslate } from '../composables/useTranslate'
import { loadmoreProps } from './types'
import type { LoadMoreState } from './types'
import type { LoadingProps } from '../m-loading/types'
import { isDef, isUndefined, omitBy } from '../common/util'

const props = defineProps(loadmoreProps)
const emit = defineEmits<{
  reload: []
}>()

const { translate } = useTranslate('loadmore')

const currentState = ref<LoadMoreState | null>(null)

const customLoadingProps = computed(() => {
  const loadingProps: Partial<LoadingProps> = isDef(props.loadingProps) ? omitBy(props.loadingProps, isUndefined) : {}
  loadingProps.customClass = `m-loadmore__loading ${loadingProps.customClass || ''}`
  return loadingProps
})

function reload() {
  if (props.state !== 'error') return
  currentState.value = 'loading'
  emit('reload')
}
</script>

<style lang="scss">
@import './index.scss';
</style>