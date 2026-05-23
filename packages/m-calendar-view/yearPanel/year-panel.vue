<template>
  <view class="m-year-panel">
    <view class="m-year-panel__controls">
      <view class="m-year-panel__control">
        <m-icon
          :custom-class="`m-year-panel__control-icon ${isPrevDecadeDisabled ? 'is-disabled' : ''}`"
          name="left"
          @click="!isPrevDecadeDisabled && changeDecade(-1)"
        />
      </view>
      <text class="m-year-panel__controls-title">{{ controlsTitle }}</text>
      <view class="m-year-panel__control">
        <m-icon
          :custom-class="`m-year-panel__control-icon ${isNextDecadeDisabled ? 'is-disabled' : ''}`"
          name="right"
          @click="!isNextDecadeDisabled && changeDecade(1)"
        />
      </view>
    </view>

    <view class="m-year-panel__years">
      <view
        v-for="(item, index) in years"
        :key="index"
        :class="`m-year-panel__year ${item.selected ? 'is-selected' : ''} ${item.disabled ? 'is-disabled' : ''}`"
        @click="handleClick(item)"
      >
        <view class="m-year-panel__year-text">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-year-panel',
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
import mIcon from '../../m-icon/m-icon.vue'
import { computed, ref, watch, onMounted } from 'vue'
import { isArray, isNumber } from '../../common/util'
import { yearPanelProps } from './types'

const props = defineProps(yearPanelProps)
const emit = defineEmits(['change'])

const currentDecade = ref<number>(new Date().getFullYear())

const controlsTitle = computed(() => {
  const start = Math.floor(currentDecade.value / 10) * 10
  const end = start + 9
  return `${start}-${end}`
})

const isPrevDecadeDisabled = computed(() => {
  const start = Math.floor(currentDecade.value / 10) * 10 - 10
  return start < new Date(props.minDate).getFullYear()
})

const isNextDecadeDisabled = computed(() => {
  const end = Math.floor(currentDecade.value / 10) * 10 + 19
  return end > new Date(props.maxDate).getFullYear()
})

const years = computed(() => {
  const yearList: Array<{ text: string; date: number; selected: boolean; disabled: boolean }> = []
  const start = Math.floor(currentDecade.value / 10) * 10
  for (let year = start; year < start + 12; year++) {
    const date = new Date(year, 0, 1).getTime()
    const disabled = year < new Date(props.minDate).getFullYear() || year > new Date(props.maxDate).getFullYear()

    let selected = false
    if (props.value) {
      if (props.type === 'year') {
        selected = new Date(props.value as number).getFullYear() === year
      } else {
        const value = props.value as number[]
        const isSelected = value.some((item) => {
          if (!item) return false
          return new Date(item).getFullYear() === year
        })
        selected = isSelected
      }
    }

    yearList.push({
      text: String(year),
      date,
      selected,
      disabled
    })
  }
  return yearList
})

function changeDecade(delta: number) {
  currentDecade.value += delta * 10
}

function handleClick(item: { date: number; disabled: boolean }) {
  if (!item.disabled) {
    emit('change', {
      value: item.date,
      type: 'year'
    })
  }
}

onMounted(() => {
  initCurrentDecade()
})

function initCurrentDecade() {
  let activeDate: number | null = null

  if (isArray(props.value)) {
    const sortedValue = [...props.value].sort((a, b) => (a || 0) - (b || 0))
    activeDate = sortedValue[0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  if (activeDate < props.minDate) {
    activeDate = props.minDate
  } else if (activeDate > props.maxDate) {
    activeDate = props.maxDate
  }

  currentDecade.value = new Date(activeDate).getFullYear()
}

watch(
  () => props.value,
  () => {
    initCurrentDecade()
  }
)
</script>

<style lang="scss">
@use './index.scss';
</style>