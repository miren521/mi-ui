<template>
  <view
    :class="`m-progress ${percentPosition.type === 'inner' ? 'm-progress--inner' : ''} ${status ? 'm-progress--' + status : ''} ${
      percentage === 0 ? 'is-zero' : ''
    } ${customClass}`"
    :style="customStyle"
  >
    <view class="m-progress__outer">
      <view class="m-progress__inner" :style="rootStyle">
        <!-- inner 渲染到 progress__inner 内部 -->
        <template v-if="percentPosition.type === 'inner'">
          <view v-if="!hideText" :class="['m-progress__label', percentPosition.align ? `is-align-${percentPosition.align}` : '']">
            {{ percentage }}%
          </view>
          <m-icon
            v-else-if="status"
            :custom-class="`m-progress__label m-progress__icon ${hideText ? 'is-hide-text' : ''} ${
              percentPosition.align ? `is-align-${percentPosition.align}` : ''
            }`"
            :name="iconName"
            :color="isString(color) ? color : ''"
          ></m-icon>
        </template>
      </view>
    </view>
    <!-- outer 渲染到外侧 -->
    <template v-if="percentPosition.type === 'outer'">
      <view v-if="!hideText" class="m-progress__label">{{ percentage }}%</view>
      <m-icon
        v-else-if="status"
        :custom-class="`m-progress__label m-progress__icon ${hideText ? 'is-hide-text' : ''}`"
        :name="iconName"
        :color="isString(color) ? color : ''"
      ></m-icon>
    </template>
  </view>
</template>

<script lang="ts" setup>
import mIcon from '../m-icon/m-icon.vue'
import { computed, ref, watch } from 'vue'
import { isArray, isDef, isObj, isString, objToStyle, pause } from '../common/util'
import { progressProps, type ProgressColor } from './types'

const props = defineProps(progressProps)

const displayColor = ref<string>('')
const displayPercentage = ref<number>(0)
const percentageDiff = ref<number>(0)
let animationTimer: ReturnType<typeof setTimeout> | null = null

const rootStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${displayPercentage.value}%`,
    'transition-duration': `${percentageDiff.value * props.duration * 0.001}s`
  }
  
  if (gradientBackground.value) {
    style.background = gradientBackground.value
  } else {
    style.background = displayColor.value
  }
  
  return objToStyle(style)
})

const gradientBackground = ref<string>('')

const iconName = computed(() => {
  let icon: string = ''
  switch (props.status) {
    case 'danger':
      icon = 'close-circle-fill'
      break
    case 'success':
      icon = 'check-circle-fill'
      break
    case 'warning':
      icon = 'exclamation-circle-fill'
      break
    default:
      break
  }
  return icon
})

watch(
  () => [props.percentage, props.color, props.duration],
  () => {
    validatePercentage(props.percentage)
    updateProgress()
  },
  { immediate: true }
)

function validatePercentage(value: number) {
  if (Number.isNaN(value) || value < 0 || value > 100) {
    console.error('The value of percentage must be between 0 and 100')
  }
}

function updateProgressForward(partList: ProgressColor[], percentage: number) {
  return partList.some((part, index) => {
    if (displayPercentage.value < part.percentage && part.percentage <= percentage) {
      renderProgressStep(part.percentage, part.color)
      return true
    } else if (index === partList.length - 1) {
      renderProgressStep(percentage, part.color)
    }
  })
}

function updateProgressBackward(partList: ProgressColor[], percentage: number) {
  return partList.some((part) => {
    if (percentage <= part.percentage) {
      renderProgressStep(percentage, part.color)
      return true
    }
  })
}

async function updateProgress() {
  const { percentage, color } = props
  
  // 检查是否是纯字符串数组（渐变模式）
  if (isArray(color) && color.length > 1 && color.every((c) => typeof c === 'string')) {
    gradientBackground.value = `linear-gradient(to right, ${(color as string[]).join(', ')})`
    percentageDiff.value = Math.abs(percentage - displayPercentage.value)
    await pause()
    displayPercentage.value = percentage
    return
  }
  
  // 重置渐变背景
  gradientBackground.value = ''
  
  if (!isDef(color) || (isArray(color) && color.length === 0)) {
    percentageDiff.value = Math.abs(percentage - displayPercentage.value)
    await pause()
    displayPercentage.value = percentage
    return
  }
  if (displayPercentage.value === percentage) return

  const colorArray = isArray(color) ? color : [color]
  validateColorArray(colorArray)
  const partList = createPartList(colorArray)
  displayPercentage.value > percentage ? updateProgressBackward(partList, percentage) : updateProgressForward(partList, percentage)
}

function isProgressColorArray(array: string[] | ProgressColor[]): array is ProgressColor[] {
  return array.every(
    (color) => isObj(color) && Object.prototype.hasOwnProperty.call(color, 'color') && Object.prototype.hasOwnProperty.call(color, 'percentage')
  )
}

function isStringArray(array: string[] | ProgressColor[]): array is string[] {
  return array.every((item) => typeof item === 'string')
}

function validateColorArray(colorArray: string[] | ProgressColor[]) {
  const isStrArray = isStringArray(colorArray)
  const isObjArray = isProgressColorArray(colorArray)
  if (!isStrArray && !isObjArray) {
    throw Error('Color must be String or Object with color and percentage')
  }
  if (isObjArray && colorArray.some(({ percentage }) => Number.isNaN(percentage))) {
    throw Error('All the percentage must can be formatted to Number')
  }
}

function createPartList(colorArray: string[] | ProgressColor[]) {
  const partNum = 100 / colorArray.length
  return isProgressColorArray(colorArray)
    ? colorArray.sort((a, b) => a.percentage - b.percentage)
    : colorArray.map((item, index) => ({
        color: item,
        percentage: (index + 1) * partNum
      }))
}

function renderProgressStep(targetPercent: number, color: string) {
  if (animationTimer) return
  const { duration } = props
  percentageDiff.value = Math.abs(targetPercent - displayPercentage.value)
  setTimeout(() => {
    displayPercentage.value = targetPercent
    displayColor.value = color
    animationTimer = setTimeout(() => {
      animationTimer && clearTimeout(animationTimer)
      animationTimer = null
      updateProgress()
    }, percentageDiff.value * duration)
  }, 50)
}
</script>

<style lang="scss">
@use './index.scss';
</style>