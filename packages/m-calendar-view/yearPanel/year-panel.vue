<template>
  <view class="m-year-panel">
    <view class="m-year-panel__controls" v-if="switchMode !== 'none'">
      <view class="m-year-panel__control">
        <m-icon
          name="left"
          :custom-class="`m-year-panel__control-icon ${isPrevYearDisabled ? 'is-disabled' : ''}`"
          @click="!isPrevYearDisabled && changeYear(-1)"
        />
      </view>
      <text class="m-year-panel__controls-title">{{ controlsTitle }}</text>
      <view class="m-year-panel__control">
        <m-icon
          name="right"
          :custom-class="`m-year-panel__control-icon ${isNextYearDisabled ? 'is-disabled' : ''}`"
          @click="!isNextYearDisabled && changeYear(1)"
        />
      </view>
    </view>

    <view v-if="showPanelTitle && switchMode === 'none'" class="m-year-panel__title">{{ title }}</view>

    <scroll-view
      class="m-year-panel__container"
      :style="`height: ${scrollHeight}px`"
      :scroll-y="true"
      :scroll-top="scrollTop"
      @scroll="switchMode === 'none' ? yearScroll($event) : undefined"
    >
      <view v-for="(item, index) in displayYears" :key="index" :id="`year${index}`">
        <year
          :type="type"
          :date="item.date"
          :value="value"
          :min-date="minDate"
          :max-date="maxDate"
          :max-range="maxRange"
          :formatter="formatter"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :showTitle="switchMode === 'none' && index !== 0"
          @change="handleDateChange"
        />
      </view>
    </scroll-view>
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
import { computed, ref, onMounted } from 'vue'
import { compareYear, formatYearTitle, getYears } from '../utils'
import { isArray, isNumber, pause } from '../../common/util'
import Year from '../year/year.vue'
import mIcon from '../../m-icon/m-icon.vue'
import { yearPanelProps, type YearInfo, type YearPanelExpose } from './types'

const props = defineProps(yearPanelProps)
const emit = defineEmits(['change'])

const scrollTop = ref<number>(0)
const scrollIndex = ref<number>(0)

const currentDisplayYear = ref<number>(new Date().getFullYear())

const scrollHeight = computed(() => {
  const scrollHeight: number = props.panelHeight + (props.showPanelTitle ? 26 : 16)
  return scrollHeight
})

const years = computed<YearInfo[]>(() => {
  return getYears(props.minDate, props.maxDate).map((year, index) => {
    return {
      date: year,
      height: index === 0 ? 188 : 228
    }
  })
})

const currentYearDate = computed(() => {
  return new Date(currentDisplayYear.value, 0, 1).getTime()
})

const displayYears = computed<YearInfo[]>(() => {
  if (props.switchMode === 'none') {
    return years.value
  }
  return [
    {
      date: currentYearDate.value,
      height: 188
    }
  ]
})

const controlsTitle = computed(() => {
  return formatYearTitle(currentYearDate.value)
})

const title = computed(() => {
  return formatYearTitle(years.value[scrollIndex.value].date)
})

const isPrevYearDisabled = computed(() => {
  const minYear = new Date(props.minDate).getFullYear()
  return currentDisplayYear.value <= minYear
})

const isNextYearDisabled = computed(() => {
  const maxYear = new Date(props.maxDate).getFullYear()
  return currentDisplayYear.value >= maxYear
})

function changeYear(delta: number) {
  currentDisplayYear.value += delta
}

onMounted(() => {
  if (props.switchMode !== 'none') {
    initCurrentDisplayYear()
  }
  scrollIntoView()
})

function initCurrentDisplayYear() {
  let activeDate: number | null = null

  if (isArray(props.value)) {
    activeDate = props.value![0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  currentDisplayYear.value = new Date(activeDate).getFullYear()
}

async function scrollIntoView() {
  await pause()
  let activeDate: number | null = null
  if (isArray(props.value)) {
    activeDate = props.value![0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  let top: number = 0
  for (let index = 0; index < years.value.length; index++) {
    if (compareYear(years.value[index].date, activeDate) === 0) {
      break
    }
    top += years.value[index] ? Number(years.value[index].height) : 0
  }
  scrollTop.value = 0
  if (top > 0) {
    await pause()
    scrollTop.value = top + 40
  }
}

const yearScroll = (event: { detail: { scrollTop: number } }) => {
  if (years.value.length <= 1) {
    return
  }
  const scrollTop = Math.max(0, event.detail.scrollTop)
  doSetSubtitle(scrollTop)
}

function doSetSubtitle(scrollTop: number) {
  let height: number = 0
  for (let index = 0; index < years.value.length; index++) {
    height = height + years.value[index].height
    if (scrollTop < height) {
      scrollIndex.value = index
      return
    }
  }
}

function handleDateChange({ value }: { value: number[] }) {
  emit('change', {
    value
  })
}

defineExpose<YearPanelExpose>({
  scrollIntoView
})
</script>

<style lang="scss">
@use './index.scss';
</style>
