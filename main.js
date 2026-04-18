import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import MDemoBlock from '@/components/m-demo-block/index.js'
Vue.config.productionTip = false
Vue.component('m-demo-block', MDemoBlock)
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import MDemoBlock from '@/components/m-demo-block/index.js'
export function createApp() {
  const app = createSSRApp(App)
  app.component('m-demo-block', MDemoBlock)
  return {
    app
  }
}
// #endif