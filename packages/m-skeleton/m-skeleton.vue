<template>
  <view :class="`m-skeleton ${customClass}`" :style="customStyle">
    <view class="m-skeleton__content" v-if="show">
      <view class="m-skeleton__row" v-for="(row, index) of parsedRowCols" :key="`row-${index}`">
        <view v-for="(col, idx) of row" :key="`col-${idx}`" :class="col.class" :style="col.style" />
      </view>
    </view>
    <view v-else>
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-skeleton',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { ref, computed, watch } from 'vue'
import { skeletonProps } from './types'
import type { SkeletonRowCol, SkeletonRowColObj } from './types'
import { addUnit, isNumber } from '../common/util'

const themeMap: Record<string, SkeletonRowCol[]> = {
  avatar: [{ type: 'circle', height: '64px', width: '64px' }],
  image: [{ type: 'rect', height: '64px', width: '64px' }],
  text: [
    1,
    [
      { width: '24%', height: '16px', marginRight: '16px' },
      { width: '76%', height: '16px' }
    ]
  ],
  paragraph: [1, 1, 1, { width: '55%' }]
}

const props = defineProps(skeletonProps)
const rowCols = ref<SkeletonRowCol[]>([])

const parsedRowCols = computed(() => {
  return rowCols.value.map((item) => {
    if (isNumber(item)) {
      return [
        {
          class: getColItemClass({ type: 'text' }),
          style: {} as CSSProperties
        }
      ]
    }
    if (Array.isArray(item)) {
      return item.map((col) => {
        return {
          ...col,
          class: getColItemClass(col),
          style: getColItemStyle(col)
        }
      })
    }
    const nItem = item as SkeletonRowColObj

    return [
      {
        ...nItem,
        class: getColItemClass(nItem),
        style: getColItemStyle(nItem)
      }
    ]
  })
})

function getColItemClass(rowCol: SkeletonRowColObj) {
  return [
    'm-skeleton__col',
    `m-skeleton--type-${rowCol.type || 'text'}`,
    { [`m-skeleton--animation-${props.animation}`]: props.animation }
  ]
}

function getColItemStyle(rowCol: SkeletonRowColObj) {
  const style: CSSProperties = {}
  const styleName = ['size', 'width', 'height', 'margin', 'background', 'marginLeft', 'marginRight', 'borderRadius', 'backgroundColor']

  for (const name of styleName) {
    if (Object.prototype.hasOwnProperty.call(rowCol, name)) {
      const px = addUnit(rowCol[name] as string | number)

      if (name === 'size') {
        style.width = px
        style.height = px
      } else {
        ;(style as Record<string, any>)[name] = px
      }
    }
  }
  return style
}

watch(
  () => props.rowCol,
  (rowCol) => {
    rowCols.value = [...(Array.isArray(rowCol) && rowCol.length ? props.rowCol : themeMap[props.theme])]
  },
  { immediate: true }
)

const show = computed(() => props.loading == undefined || props.loading === true)
</script>

<style lang="scss">
@import './index.scss';
</style>