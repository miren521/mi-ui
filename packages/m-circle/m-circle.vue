<template>
  <view :class="`m-circle ${customClass}`" :style="rootStyle">
    <!-- #ifdef MP-WEIXIN -->
    <canvas :style="canvasStyle" :id="canvasId" :canvas-id="canvasId" type="2d"></canvas>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <canvas :width="canvasSize" :height="canvasSize" :style="canvasStyle" :id="canvasId" :canvas-id="canvasId"></canvas>
    <!-- #endif -->

    <view v-if="text" class="m-circle__text">
      <text>{{ text }}</text>
    </view>
    <view v-else class="m-circle__text">
      <slot>
        <text>{{ displayPercent }}%</text>
      </slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { addUnit, isObj, objToStyle, uuid, getSystemInfo } from '../common/util'
import { circleProps } from './types'

function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100)
}

const PERIMETER = 2 * Math.PI
const BEGIN_ANGLE = -Math.PI / 2
const STEP = 1

const props = defineProps(circleProps)
const { proxy } = getCurrentInstance() as any

const progressColor = ref<string | CanvasGradient>('')
const currentValue = ref<number>(0)
const interval = ref<any>(null)
const pixelRatio = ref<number>(1)
const canvasId = ref<string>(`m-circle${uuid()}`)
let ctx: UniApp.CanvasContext | null = null

const displayPercent = computed(() => {
  return Math.round(format(currentValue.value))
})

const rootStyle = computed(() => {
  const style: CSSProperties = {
    color: isObj(props.color) ? '#646a73' : props.color
  }

  return `${objToStyle(style)};${props.customStyle}`
})

const canvasSize = computed(() => {
  let size = props.size
  return size
})

const sWidth = computed(() => {
  let sWidth = props.strokeWidth
  return sWidth
})

const canvasStyle = computed(() => {
  const style = {
    width: addUnit(props.size),
    height: addUnit(props.size)
  }
  return `${objToStyle(style)}`
})

watch(
  () => props.modelValue,
  () => {
    reRender()
  },
  { immediate: true }
)

watch(
  () => props.size,
  () => {
    let timer = setTimeout(() => {
      drawCircle(currentValue.value)
      clearTimeout(timer)
    }, 50)
  },
  { immediate: false }
)

watch(
  () => props.color,
  () => {
    drawCircle(currentValue.value)
  },
  { immediate: false, deep: true }
)

onBeforeMount(() => {
  pixelRatio.value = getSystemInfo().pixelRatio
})

onMounted(() => {
  currentValue.value = props.modelValue
  drawCircle(currentValue.value)
})

onUnmounted(() => {
  clearTimeInterval()
})

function getContext() {
  return new Promise<UniApp.CanvasContext>((resolve) => {
    if (ctx) {
      return resolve(ctx)
    }
    ctx = uni.createCanvasContext(canvasId.value, proxy)
    resolve(ctx)
  })
}

function presetCanvas(context: any, strokeStyle: string | CanvasGradient, beginAngle: number, endAngle: number, fill?: string) {
  let width = sWidth.value
  const position = canvasSize.value / 2
  if (!fill) {
    width = width / 2
  }
  const radius = position - width / 2
  context.strokeStyle = strokeStyle
  context.setStrokeStyle(strokeStyle)
  context.setLineWidth(width)
  context.setLineCap(props.strokeLinecap)

  context.beginPath()
  context.arc(position, position, radius, beginAngle, endAngle, !props.clockwise)
  context.stroke()
  if (fill) {
    context.setLineWidth(width)
    context.setFillStyle(fill)
    context.fill()
  }
}

function renderLayerCircle(context: UniApp.CanvasContext) {
  presetCanvas(context, props.layerColor, 0, PERIMETER, props.fill)
}

function renderHoverCircle(context: UniApp.CanvasContext, formatValue: number) {
  const progress = PERIMETER * (formatValue / 100)
  const endAngle = props.clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress)

  if (isObj(props.color)) {
    const LinearColor = context.createLinearGradient(canvasSize.value, 0, 0, 0)
    Object.keys(props.color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, (props.color as Record<string, any>)[key]))
    progressColor.value = LinearColor
  } else {
    progressColor.value = props.color
  }
  presetCanvas(context, progressColor.value, BEGIN_ANGLE, endAngle)
}

function renderDot(context: UniApp.CanvasContext) {
  const strokeWidth = sWidth.value
  const position = canvasSize.value / 2
  if (isObj(props.color)) {
    const LinearColor = context.createLinearGradient(canvasSize.value, 0, 0, 0)
    Object.keys(props.color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, (props.color as Record<string, any>)[key]))
    progressColor.value = LinearColor
  } else {
    progressColor.value = props.color
  }
  context.beginPath()
  context.arc(position, strokeWidth / 4, strokeWidth / 4, 0, PERIMETER)
  context.setFillStyle(progressColor.value)
  context.fill()
}

function drawCircle(currentValue: number) {
  getContext().then((context) => {
    context.clearRect(0, 0, canvasSize.value, canvasSize.value)
    renderLayerCircle(context)

    const formatValue = format(currentValue)
    if (formatValue !== 0) {
      renderHoverCircle(context, formatValue)
    } else {
      renderDot(context)
    }
    context.draw()
  })
}

function reRender() {
  if (props.speed <= 0 || props.speed > 1000) {
    drawCircle(props.modelValue)
    return
  }
  clearTimeInterval()
  currentValue.value = currentValue.value || 0
  const run = () => {
    interval.value = setTimeout(() => {
      if (currentValue.value !== props.modelValue) {
        if (Math.abs(currentValue.value - props.modelValue) < STEP) {
          currentValue.value = props.modelValue
        } else if (currentValue.value < props.modelValue) {
          currentValue.value += STEP
        } else {
          currentValue.value -= STEP
        }
        drawCircle(currentValue.value)
        run()
      } else {
        clearTimeInterval()
      }
    }, 1000 / props.speed)
  }
  run()
}

function clearTimeInterval() {
  interval.value && clearTimeout(interval.value)
}
</script>

<style lang="scss">
@use './index.scss';
</style>