<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<template>
  <view style="min-height: 100vh;">
    <slot />
  </view>
</template>

<style>
/*每个页面公共css */
</style>
