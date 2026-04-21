import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import DemoBlock from '@/components/demo-block/src/index.vue'
Vue.config.productionTip = false
Vue.component('demo-block', DemoBlock)
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import DemoBlock from '@/components/demo-block/src/index.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('demo-block', DemoBlock)
  return {
    app
  }
}
// #endif