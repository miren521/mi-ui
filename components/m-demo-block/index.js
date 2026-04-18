import MDemoBlock from './src/index.vue'

MDemoBlock.install = function (app) {
  app.component('m-demo-block', MDemoBlock)
}

export default MDemoBlock