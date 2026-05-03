import type { App } from 'vue'

const MOverlay = {
  install(app: App) {
    app.component('m-overlay', MOverlay)
  }
}

export default MOverlay