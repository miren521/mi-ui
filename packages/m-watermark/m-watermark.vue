<template>
  <view :class="rootClass" :style="rootStyle">
    <canvas
      v-if="!canvasOffScreenable && showCanvas"
      type="2d"
      :style="{ height: canvasHeight + 'px', width: canvasWidth + 'px', visibility: 'hidden' }"
      :canvas-id="canvasId"
      :id="canvasId"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-watermark',
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
import { computed, onMounted, ref, watch, nextTick, type CSSProperties } from 'vue'
import { addUnit, buildUrlWithParams, getSystemInfo, isBase64Image, isDef, objToStyle, uuid } from '../common/util'
import { watermarkProps, type WatermarkFontStyle, type WatermarkLayout } from './types'

const props = defineProps(watermarkProps)

watch(
  () => props,
  () => {
    doReset()
  },
  { deep: true }
)

const canvasId = ref<string>(`water${uuid()}`)
const waterMarkUrl = ref<string>('')
const canvasOffScreenable = ref<boolean>(uni.canIUse('createOffscreenCanvas') && Boolean(uni.createOffscreenCanvas))
const pixelRatio = ref<number>(getSystemInfo().pixelRatio)
const canvasHeight = ref<number>((props.height + props.gutterY) * pixelRatio.value)
const canvasWidth = ref<number>((props.width + props.gutterX) * pixelRatio.value)
const showCanvas = ref<boolean>(true)

const rootClass = computed(() => {
  let classess: string = 'm-watermark'
  if (props.fullScreen) {
    classess = `${classess} is-fullscreen`
  }
  return `${classess} ${props.customClass}`
})

const rootStyle = computed(() => {
  let width = props.width + props.gutterX
  if (props.layout === 'staggered') {
    width *= 2
  }
  const style: CSSProperties = {
    backgroundSize: addUnit(width),
    zIndex: props.zIndex
  }
  if (isDef(props.opacity)) {
    style['opacity'] = props.opacity
  }
  if (waterMarkUrl.value) {
    style['backgroundImage'] = `url('${waterMarkUrl.value}')`
  }
  return `${objToStyle(style)}${props.customStyle}`
})

onMounted(() => {
  doInit()
})

function doReset() {
  showCanvas.value = true
  const cols = props.layout === 'staggered' ? 2 : 1
  const rows = props.layout === 'staggered' ? 2 : 1
  canvasHeight.value = (props.height + props.gutterY) * pixelRatio.value * rows
  canvasWidth.value = (props.width + props.gutterX) * pixelRatio.value * cols
  nextTick(() => {
    doInit()
  })
}

function doInit() {
  // #ifdef H5
  showCanvas.value = false
  // #endif
  const { width, height, color, size, fontStyle, fontWeight, fontFamily, content, rotate, gutterX, gutterY, image, imageHeight, imageWidth, layout } =
    props

  createWaterMark(
    width,
    height,
    color,
    size,
    fontStyle,
    fontWeight,
    fontFamily,
    content,
    rotate,
    gutterX,
    gutterY,
    image,
    imageHeight,
    imageWidth,
    layout
  )
}

async function createWaterMark(
  width: number,
  height: number,
  color: string,
  size: number,
  fontStyle: WatermarkFontStyle,
  fontWeight: number | string,
  fontFamily: string,
  content: string,
  rotate: number,
  gutterX: number,
  gutterY: number,
  image: string,
  imageHeight: number,
  imageWidth: number,
  layout: WatermarkLayout
) {
  const cols = layout === 'staggered' ? 2 : 1
  const rows = layout === 'staggered' ? 2 : 1
  const canvasHeight = (height + gutterY) * pixelRatio.value * rows
  const canvasWidth = (width + gutterX) * pixelRatio.value * cols
  const contentWidth = width * pixelRatio.value
  const contentHeight = height * pixelRatio.value
  const fontSize = size * pixelRatio.value

  // #ifndef H5
  if (canvasOffScreenable.value) {
    await createOffscreenCanvas(
      canvasHeight,
      canvasWidth,
      contentWidth,
      contentHeight,
      rotate,
      fontSize,
      fontFamily,
      fontStyle,
      fontWeight,
      color,
      content,
      image,
      imageHeight,
      imageWidth,
      layout
    )
  } else {
    await createCanvas(
      canvasHeight,
      canvasWidth,
      contentWidth,
      contentHeight,
      rotate,
      fontSize,
      color,
      content,
      image,
      imageHeight,
      imageWidth,
      layout
    )
  }
  // #endif
  // #ifdef H5
  await createH5Canvas(
    canvasHeight,
    canvasWidth,
    contentWidth,
    contentHeight,
    rotate,
    fontSize,
    fontFamily,
    fontStyle,
    fontWeight,
    color,
    content,
    image,
    imageHeight,
    imageWidth,
    layout
  )
  // #endif
}

async function createOffscreenCanvas(
  canvasHeight: number,
  canvasWidth: number,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string | number,
  color: string,
  content: string,
  image: string,
  imageHeight: number,
  imageWidth: number,
  layout: string
) {
  const canvas: any = uni.createOffscreenCanvas({ height: canvasHeight, width: canvasWidth, type: '2d' })
  const ctx: any = canvas.getContext('2d')
  if (ctx) {
    if (image) {
      const img = canvas.createImage() as HTMLImageElement
      drawImageOffScreen(ctx, img, image, imageHeight, imageWidth, rotate, contentWidth, contentHeight, canvas, layout)
    } else {
      await drawTextOffScreen(ctx, content, contentWidth, contentHeight, rotate, fontSize, fontFamily, fontStyle, fontWeight, color, canvas, layout)
    }
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}

async function createCanvas(
  canvasHeight: number,
  canvasWidth: number,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  color: string,
  content: string,
  image: string,
  imageHeight: number,
  imageWidth: number,
  layout: string
) {
  const ctx = uni.createCanvasContext(canvasId.value)

  if (ctx) {
    if (image) {
      drawImageOnScreen(ctx, image, imageHeight, imageWidth, rotate, contentWidth, contentHeight, layout, canvasWidth, canvasHeight)
    } else {
      await drawTextOnScreen(ctx, content, contentWidth, contentHeight, rotate, fontSize, color, layout, canvasWidth, canvasHeight)
    }
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}

async function createH5Canvas(
  canvasHeight: number,
  canvasWidth: number,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string | number,
  color: string,
  content: string,
  image: string,
  imageHeight: number,
  imageWidth: number,
  layout: string
) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.setAttribute('width', `${canvasWidth}px`)
  canvas.setAttribute('height', `${canvasHeight}px`)
  if (ctx) {
    if (image) {
      const img = new Image()
      drawImageOffScreen(ctx, img, image, imageHeight, imageWidth, rotate, contentWidth, contentHeight, canvas, layout)
    } else {
      await drawTextOffScreen(ctx, content, contentWidth, contentHeight, rotate, fontSize, fontFamily, fontStyle, fontWeight, color, canvas, layout)
    }
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}

function getTextWidth(ctx: any, text: string): Promise<number> {
  return new Promise((resolve) => {
    // #ifdef MP-DINGTALK
    resolve(0)
    // #endif

    // #ifndef MP-DINGTALK
    const metrics = ctx.measureText(text)
    if (metrics && typeof metrics.width === 'number') {
      resolve(metrics.width)
    } else {
      resolve(0)
    }
    // #endif
  })
}

async function getWrappedLines(ctx: any, text: string, maxWidth: number): Promise<string[]> {
  const lines: string[] = []

  // #ifdef MP-DINGTALK
  lines.push(text)
  // #endif

  // #ifndef MP-DINGTALK
  let currentLine = ''

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const testLine = currentLine + char
    const width = await getTextWidth(ctx, testLine)

    if (width > maxWidth && i > 0) {
      lines.push(currentLine)
      currentLine = char
    } else {
      currentLine = testLine
    }
  }
  lines.push(currentLine)
  // #endif

  return lines
}

async function drawTextOffScreen(
  ctx: CanvasRenderingContext2D,
  content: string,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string | number,
  color: string,
  canvas: HTMLCanvasElement,
  layout: string
) {
  ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${contentHeight}px ${fontFamily}`
  const lines = await getWrappedLines(ctx, content, contentWidth)
  const lineHeight = fontSize * 1.2
  const totalHeight = lines.length * lineHeight
  const startY = -totalHeight / 2 + lineHeight / 2

  const draws = layout === 'staggered' ? 2 : 1
  const cols = layout === 'staggered' ? 2 : 1
  const rows = layout === 'staggered' ? 2 : 1
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  const itemWidth = canvasWidth / cols
  const itemHeight = canvasHeight / rows

  for (let i = 0; i < draws; i++) {
    const offsetX = i === 1 ? itemWidth : 0
    const offsetY = i === 1 ? itemHeight : 0
    ctx.save()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.translate(offsetX + contentWidth / 2, offsetY + contentHeight / 2)
    ctx.rotate((Math.PI / 180) * rotate)
    ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${contentHeight}px ${fontFamily}`
    ctx.fillStyle = color

    lines.forEach((line, index) => {
      ctx.fillText(line, 0, startY + index * lineHeight)
    })
    ctx.restore()
  }

  waterMarkUrl.value = canvas.toDataURL()
}

async function drawTextOnScreen(
  ctx: UniApp.CanvasContext,
  content: string,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  color: string,
  layout: string,
  canvasWidth: number,
  canvasHeight: number
) {
  ctx.setFontSize(fontSize)
  const lines = await getWrappedLines(ctx, content, contentWidth)
  const lineHeight = fontSize * 1.2
  const totalHeight = lines.length * lineHeight
  const startY = -totalHeight / 2 + lineHeight / 2

  const draws = layout === 'staggered' ? 2 : 1
  const cols = layout === 'staggered' ? 2 : 1
  const rows = layout === 'staggered' ? 2 : 1
  const itemWidth = canvasWidth / cols
  const itemHeight = canvasHeight / rows

  for (let i = 0; i < draws; i++) {
    const offsetX = i === 1 ? itemWidth : 0
    const offsetY = i === 1 ? itemHeight : 0

    ctx.save()
    ctx.setTextBaseline('middle')
    ctx.setTextAlign('center')
    ctx.translate(offsetX + contentWidth / 2, offsetY + contentHeight / 2)
    ctx.rotate((Math.PI / 180) * rotate)
    ctx.setFillStyle(color)
    ctx.setFontSize(fontSize)

    lines.forEach((line, index) => {
      ctx.fillText(line, 0, startY + index * lineHeight)
    })
    ctx.restore()
  }

  ctx.draw()

  // #ifdef MP-DINGTALK
  ;(ctx as any).toTempFilePath({
    success(res: any) {
      showCanvas.value = false
      waterMarkUrl.value = res.filePath
    }
  })
  // #endif
  // #ifndef MP-DINGTALK
  uni.canvasToTempFilePath({
    canvasId: canvasId.value,
    success: (res) => {
      showCanvas.value = false
      waterMarkUrl.value = res.tempFilePath
    }
  })
  // #endif
}

function drawImageOffScreen(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  image: string,
  imageHeight: number,
  imageWidth: number,
  rotate: number,
  contentWidth: number,
  contentHeight: number,
  canvas: HTMLCanvasElement,
  layout: string
) {
  img.crossOrigin = 'anonymous'
  img.referrerPolicy = 'no-referrer'

  if (isBase64Image(image)) {
    img.src = image
  } else {
    img.src = buildUrlWithParams(image, {
      timestamp: `${new Date().getTime()}`
    })
  }
  img.onload = () => {
    const draws = layout === 'staggered' ? 2 : 1
    const cols = layout === 'staggered' ? 2 : 1
    const rows = layout === 'staggered' ? 2 : 1
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const itemWidth = canvasWidth / cols
    const itemHeight = canvasHeight / rows

    for (let i = 0; i < draws; i++) {
      const offsetX = i === 1 ? itemWidth : 0
      const offsetY = i === 1 ? itemHeight : 0
      ctx.save()
      ctx.translate(offsetX + contentWidth / 2, offsetY + contentHeight / 2)
      ctx.rotate((Math.PI / 180) * Number(rotate))
      ctx.drawImage(
        img,
        (-imageWidth * pixelRatio.value) / 2,
        (-imageHeight * pixelRatio.value) / 2,
        imageWidth * pixelRatio.value,
        imageHeight * pixelRatio.value
      )
      ctx.restore()
    }
    waterMarkUrl.value = canvas.toDataURL()
  }
}

function drawImageOnScreen(
  ctx: UniApp.CanvasContext,
  image: string,
  imageHeight: number,
  imageWidth: number,
  rotate: number,
  contentWidth: number,
  contentHeight: number,
  layout: string,
  canvasWidth: number,
  canvasHeight: number
) {
  const draws = layout === 'staggered' ? 2 : 1
  const cols = layout === 'staggered' ? 2 : 1
  const rows = layout === 'staggered' ? 2 : 1
  const itemWidth = canvasWidth / cols
  const itemHeight = canvasHeight / rows

  for (let i = 0; i < draws; i++) {
    const offsetX = i === 1 ? itemWidth : 0
    const offsetY = i === 1 ? itemHeight : 0
    ctx.save()
    ctx.translate(offsetX + contentWidth / 2, offsetY + contentHeight / 2)
    ctx.rotate((Math.PI / 180) * Number(rotate))

    ctx.drawImage(
      image,
      (-imageWidth * pixelRatio.value) / 2,
      (-imageHeight * pixelRatio.value) / 2,
      imageWidth * pixelRatio.value,
      imageHeight * pixelRatio.value
    )
    ctx.restore()
  }

  ctx.draw(false, () => {
    // #ifdef MP-DINGTALK
    ;(ctx as any).toTempFilePath({
      success(res: any) {
        showCanvas.value = false
        waterMarkUrl.value = res.filePath
      }
    })
    // #endif
    // #ifndef MP-DINGTALK
    uni.canvasToTempFilePath({
      canvasId: canvasId.value,
      success: (res) => {
        showCanvas.value = false
        waterMarkUrl.value = res.tempFilePath
      }
    })
    // #endif
  })
}
</script>

<style lang="scss">
@import './index.scss';
</style>