import MPopup from './src/index.vue'

MPopup.install = (app) => {
  app.component(MPopup.name, MPopup)
}

export default MPopup