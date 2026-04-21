import MDemoBlock from './src/index.vue'

MDemoBlock.install = function (app) {
  app.component('demo-block', MDemoBlock)
}

export default MDemoBlock