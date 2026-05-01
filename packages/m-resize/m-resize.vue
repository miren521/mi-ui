<template>
  <view :class="`m-resize ${customClass}`" :style="rootStyle">
    <view :id="resizeId" :class="`m-resize__container ${customContainerClass}`">
      <slot />
      <scroll-view
        class="m-resize__wrapper"
        :scroll-y="true"
        :scroll-top="expandScrollTop"
        :scroll-x="true"
        :scroll-left="expandScrollLeft"
        @scroll="onScrollHandler"
      >
        <view class="m-resize__wrapper--placeholder" style="height: 100000px; width: 100000px"></view>
      </scroll-view>
      <scroll-view
        class="m-resize__wrapper"
        :scroll-y="true"
        :scroll-top="shrinkScrollTop"
        :scroll-x="true"
        :scroll-left="shrinkScrollLeft"
        @scroll="onScrollHandler"
      >
        <view class="m-resize__wrapper--placeholder" style="height: 250%; width: 250%"></view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-resize',
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { addUnit, objToStyle, uuid } from '../common/util'
import { resizeProps } from './types'

const props = defineProps(resizeProps)
const emit = defineEmits(['resize'])

const expandScrollTop = ref<number>(0)
const shrinkScrollTop = ref<number>(0)
const expandScrollLeft = ref<number>(0)
const shrinkScrollLeft = ref<number>(0)
const height = ref<number>(0)
const width = ref<number>(0)
const scrollEventCount = ref<number>(0)

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (width.value > 0) {
    style['width'] = addUnit(width.value)
  }
  if (height.value > 0) {
    style['height'] = addUnit(height.value)
  }
  return `${objToStyle(style)}${props.customStyle}`
})

let onScrollHandler = () => {}
const { proxy } = getCurrentInstance() as any
const resizeId = ref<string>(`resize${uuid()}`)

onMounted(() => {
  const query = uni.createSelectorQuery().in(proxy).select(`#${resizeId.value}`).boundingClientRect()
  query.exec(([res]) => {
    let lastHeight = res.height
    let lastWidth = res.width
    height.value = lastHeight
    width.value = lastWidth

    onScrollHandler = () => {
      const query = uni.createSelectorQuery().in(proxy).select(`#${resizeId.value}`).boundingClientRect()
      query.exec(([res]) => {
        if (scrollEventCount.value++ === 0) {
          const result: Record<string, string | number> = {}
          ;['bottom', 'top', 'left', 'right', 'height', 'width'].forEach((propName) => {
            result[propName] = res[propName]
          })
          emit('resize', result)
        }
        if (scrollEventCount.value < 3) return

        const newHeight = res.height
        const newWidth = res.width
        height.value = newHeight
        width.value = newWidth

        const emitStack: number[] = []
        if (newHeight !== lastHeight) {
          lastHeight = newHeight
          emitStack.push(1)
        }
        if (newWidth !== lastWidth) {
          lastWidth = newWidth
          emitStack.push(1)
        }
        if (emitStack.length !== 0) {
          const result: Record<string, any> = {}
          ;['bottom', 'top', 'left', 'right', 'height', 'width'].forEach((propName) => {
            result[propName] = res[propName]
          })
          emit('resize', result)
        }

        scrollToBottom({
          lastWidth: lastWidth,
          lastHeight: lastHeight
        })
      })
    }

    scrollToBottom({
      lastWidth: lastWidth,
      lastHeight: lastHeight
    })
  })
})

function scrollToBottom({ lastWidth, lastHeight }: { lastWidth: number; lastHeight: number }) {
  expandScrollTop.value = 100000 + lastHeight
  shrinkScrollTop.value = 3 * height.value + lastHeight
  expandScrollLeft.value = 100000 + lastWidth
  shrinkScrollLeft.value = 3 * width.value + lastWidth
}
</script>

<style lang="scss">
@use './index.scss';
</style>
