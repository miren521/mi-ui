<template>
  <view class="m-transition-demo">
    <view class="m-transition-demo__container">
      <demo-block title="fade 动画">
        <view class="demo-transition-row">
          <m-button @click="fade">fade</m-button>
          <m-button @click="fadeUp">fade-up</m-button>
          <m-button @click="fadeDown">fade-down</m-button>
          <m-button @click="fadeLeft">fade-left</m-button>
          <m-button @click="fadeRight">fade-right</m-button>
        </view>
      </demo-block>
      
      <demo-block title="slide 动画">
        <view class="demo-transition-row">
          <m-button @click="slideUp">slide-up</m-button>
          <m-button @click="slideDown">slide-down</m-button>
          <m-button @click="slideLeft">slide-left</m-button>
          <m-button @click="slideRight">slide-right</m-button>
        </view>
      </demo-block>
      
      <demo-block title="zoom 动画">
        <view class="demo-transition-row">
          <m-button @click="zoomIn">zoom-in</m-button>
          <m-button @click="zoomOut">zoom-out</m-button>
        </view>
      </demo-block>
      
      <demo-block title="自定义动画">
        <view class="demo-transition-row">
          <m-button @click="custom">custom</m-button>
        </view>
      </demo-block>

      <m-transition :show="show" :name="name" customClass="block" />

      <m-transition
        :show="customShow"
        :duration="{ enter: 700, leave: 1000 }"
        enterClass="custom-enter"
        enterActiveClass="custom-enter-active"
        enterToClass="custom-enter-to"
        leaveClass="custom-leave"
        leaveActiveClass="custom-leave-active"
        leaveToClass="custom-leave-to"
        customClass="block"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref<boolean>(false)
const name = ref<string>()
const customShow = ref<boolean>(false)

function fade() {
  transition('fade')
}
function fadeUp() {
  transition('fade-up')
}
function fadeDown() {
  transition('fade-down')
}
function fadeLeft() {
  transition('fade-left')
}
function fadeRight() {
  transition('fade-right')
}
function slideUp() {
  transition('slide-up')
}
function slideDown() {
  transition('slide-down')
}
function slideLeft() {
  transition('slide-left')
}
function slideRight() {
  transition('slide-right')
}
function zoomIn() {
  transition('zoom-in')
}
function zoomOut() {
  transition('zoom-out')
}
function custom() {
  customShow.value = true
  setTimeout(() => {
    customShow.value = false
  }, 1200)
}
function transition(transitionName: string) {
  name.value = transitionName
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 500)
}
</script>

<style lang="scss" scoped>
.m-transition-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-transition-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

:deep(.block) {
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
  width: 100px;
  height: 100px;
  background: #0083ff;
}

:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition-property: background, transform;
}
:deep(.custom-enter) {
  transform: translate3d(-100px, -100px, 0) rotate(-180deg);
  background: #ff0000;
}
:deep(.custom-leave-to) {
  transform: translate3d(100px, 100px, 0) rotate(180deg);
  background: #ff0000;
}
</style>