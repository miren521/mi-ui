<template>
  <view class="m-year">
    <view class="m-year__title" v-if="showTitle">{{ yearTitle }}</view>
    <view class="m-year__months">
      <view
        v-for="(item, index) in months"
        :key="index"
        :class="`m-year__month ${item.selected ? 'is-selected' : ''} ${item.disabled ? 'is-disabled' : ''}`"
        @click="handleClick(index)"
      >
        <view class="m-year__month-text">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-year',
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
import { computed, watch, ref } from 'vue'
import { compareDate } from '../utils'
import { useTranslate } from '../../composables/useTranslate'
import { yearProps } from './types'

const props = defineProps(yearProps)
const emit = defineEmits(['change'])

const { translate } = useTranslate('calendar-view')

const months = ref<Array<{ text: string; date: number; selected: boolean; disabled: boolean }>>([])

const yearTitle = computed(() => {
  return `${new Date(props.date).getFullYear()}${translate('year')}`
})

watch(
  [() => props.date, () => props.value, () => props.minDate, () => props.maxDate],
  () => {
    setMonths()
  },
  {
    deep: true,
    immediate: true
  }
)

function setMonths() {
  const year = new Date(props.date).getFullYear()
  const monthList: Array<{ text: string; date: number; selected: boolean; disabled: boolean }> = []
  for (let month = 0; month < 12; month++) {
    const date = new Date(year, month, 1).getTime()
    const disabled = compareDate(date, props.minDate) === -1 || compareDate(date, props.maxDate) === 1

    let selected = false
    if (props.value) {
      if (props.type === 'year') {
        selected = new Date(props.value as number).getFullYear() === year
      } else {
        const value = props.value as number[]
        const isSelected = value.some((item) => {
          if (!item) return false
          return new Date(item).getFullYear() === year && new Date(item).getMonth() === month
        })
        selected = isSelected
      }
    }

    monthList.push({
      text: translate('month', month + 1),
      date,
      selected,
      disabled
    })
  }
  months.value = monthList
}

function handleClick(index: number) {
  const item = months.value[index]
  if (!item.disabled) {
    emit('change', {
      value: item.date,
      type: 'month'
    })
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>