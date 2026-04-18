import MButton from './src/index.vue'

MButton.install = function (app) {
  app.component('m-button', MButton)
}

export default MButton