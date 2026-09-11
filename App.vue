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
/* uni-app H5 实际根节点是 uni-page-wrapper */
uni-page-wrapper,
uni-page-body,
html,
body {
  margin: 0 !important;
  padding: 0 !important;
}

/* 隐藏滚动条但保留滚动 - 所有可能的滚动容器 */
uni-page-wrapper::-webkit-scrollbar,
uni-page-body::-webkit-scrollbar,
html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none !important;
}

uni-page-wrapper,
uni-page-body,
html,
body,
* {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
</style>
