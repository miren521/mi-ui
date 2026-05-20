<template>
  <view :class="`m-tab ${customClass}`" :style="customStyle">
    <view :class="['m-tab__body', { 'm-tab__body--inactive': !active }]" v-if="shouldBeRender" :style="tabBodyStyle">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, watch, computed, type CSSProperties } from 'vue'
import { isDef, isNumber, isString, objToStyle } from '../common/util'
import { useParent } from '../composables/useParent'
import { TABS_KEY } from '../m-tabs/types'
import { tabProps } from './types'

const props = defineProps(tabProps)

const { proxy } = getCurrentInstance() as any
const { parent: tabs, index } = useParent(TABS_KEY)

/**
 * 激活项下标
 */
const active = computed(() => {
  return isDef(tabs.value) ? tabs.value.state.activeIndex === index.value : false
})

/** 初始状态tab不会渲染，必须通过tabs来设置painted使tab渲染 */
const painted = ref<boolean>(active.value)

/**
 * tab body 样式
 */
const tabBodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (!active.value && (!isDef(tabs.value) || !tabs.value.props.animated)) {
    style.display = 'none'
  }
  return objToStyle(style)
})

/**
 * 是否应该渲染
 */
const shouldBeRender = computed(() => !props.lazy || painted.value || active.value)

watch(active, (val) => {
  if (val) painted.value = true
})

watch(
  () => props.name,
  (newValue) => {
    if (isDef(newValue) && !isNumber(newValue) && !isString(newValue)) {
      console.error('[m-ui] error(m-tab): the type of name should be number or string')
      return
    }
    if (tabs.value) {
      checkName(proxy)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 检测 tab 绑定的 name 是否和其它 tab 的 name 冲突
 * @param self 自身
 */
function checkName(self: any) {
  const { name: myName } = props
  if (myName === undefined || myName === null || myName === '') {
    return
  }
  tabs.value &&
    tabs.value.children.forEach((child: any) => {
      if (child.$.uid !== self.$.uid && child.name === myName) {
        console.error(`The tab's bound value: ${myName} has been used`)
      }
    })
}
</script>

<style lang="scss">
@use './index.scss';
</style>