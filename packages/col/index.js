import MCol from './src/index.vue'

MCol.install = (app) => {
  app.component(MCol.name, MCol)
}

export default MCol