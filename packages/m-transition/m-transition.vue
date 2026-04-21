<template>
  <view
    :class="rootClass"
    :style="style"
    @transitionend="onTransitionEnd"
    @click="handleClick"
    @touchmove.stop.prevent="disableTouchMove ? noop : null"
    v-show="isShow"
  >
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-transition',
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch, nextTick } from 'vue'
import { isObj, isPromise } from '../common/util'
import { transitionProps, type TransitionName } from './types'
import { AbortablePromise } from '../common/AbortablePromise'

const getClassNames = (name?: TransitionName | TransitionName[]) => {
  let enter = `m-${name}-enter`
  let enterActive = `m-${name}-enter-active`
  let enterTo = `m-${name}-enter-to`
  let leave = `m-${name}-leave`
  let leaveActive = `m-${name}-leave-active`
  let leaveTo = `m-${name}-leave-to`

  if (Array.isArray(name)) {
    enter = name.map(n => `m-${n}-enter`).join(' ')
    enterActive = name.map(n => `m-${n}-enter-active`).join(' ')
    enterTo = name.map(n => `m-${n}-enter-to`).join(' ')
    leave = name.map(n => `m-${n}-leave`).join(' ')
    leaveActive = name.map(n => `m-${n}-leave-active`).join(' ')
    leaveTo = name.map(n => `m-${n}-leave-to`).join(' ')
  } else if (name) {
    enter = `m-${name}-enter`
    enterActive = `m-${name}-enter-active`
    enterTo = `m-${name}-enter-to`
    leave = `m-${name}-leave`
    leaveActive = `m-${name}-leave-active`
    leaveTo = `m-${name}-leave-to`
  }

  return {
    enter: `${enter} ${enterActive}`,
    enterTo: `${enterTo} ${enterActive}`,
    leave: `${leave} ${leaveActive}`,
    leaveTo: `${leaveTo} ${leaveActive}`
  }
}

const props = defineProps(transitionProps)
const emit = defineEmits(['click', 'before-enter', 'enter', 'before-leave', 'leave', 'after-leave', 'after-enter'])

const inited = ref(false)
const display = ref(false)
const status = ref('')
const transitionEnded = ref(false)
const currentDuration = ref(300)
const classes = ref('')
const enterPromise = ref(null)
const enterLifeCyclePromises = ref(null)
const leaveLifeCyclePromises = ref(null)

const style = computed(() => {
  const styles = []
  styles.push(`transition-duration: ${currentDuration.value}ms;`)
  styles.push(`-webkit-transition-duration: ${currentDuration.value}ms;`)
  if (!display.value && props.destroy) styles.push('display: none;')
  if (props.customStyle) styles.push(props.customStyle)
  return styles.join('')
})

const rootClass = computed(() => {
  return `m-transition ${props.customClass || ''} ${classes.value || ''}`.trim()
})

const isShow = computed(() => {
  return !props.lazyRender || inited.value
})

onBeforeMount(() => {
  if (props.show) {
    enter()
  }
})

watch(
  () => props.show,
  (val) => {
    val ? enter() : leave()
  },
  { immediate: true }
)

function handleClick() {
  emit('click')
}

function pause(ms = 0) {
  return new AbortablePromise(resolve => setTimeout(resolve, ms))
}

async function enter() {
  if (display.value) return
  status.value = 'enter'
  transitionEnded.value = false
  inited.value = true

  emit('before-enter')
  await nextTick()

  const classNames = getClassNames(props.name)
  const dur = isObj(props.duration) ? props.duration.enter : props.duration
  currentDuration.value = Number(dur) || 300

  classes.value = classNames.enter
  display.value = true

  await nextTick()
  emit('enter')

  await pause(20)
  classes.value = classNames.enterTo
}

async function leave() {
  if (!display.value) return
  status.value = 'leave'
  transitionEnded.value = false

  emit('before-leave')
  await nextTick()

  const classNames = getClassNames(props.name)
  const dur = isObj(props.duration) ? props.duration.leave : props.duration
  currentDuration.value = Number(dur) || 300

  classes.value = classNames.leave
  await nextTick()
  emit('leave')

  await pause(20)
  classes.value = classNames.leaveTo
}

function onTransitionEnd() {
  if (transitionEnded.value) return
  transitionEnded.value = true

  if (status.value === 'enter') {
    emit('after-enter')
    classes.value = ''
  }

  if (status.value === 'leave') {
    emit('after-leave')
    display.value = false
    classes.value = ''
  }
}

function noop() {}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>