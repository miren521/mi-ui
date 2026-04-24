import mBadge from './m-badge.vue'

mBadge.install = function (app) {
  app.component(mBadge.name, mBadge)
}

export default mBadge