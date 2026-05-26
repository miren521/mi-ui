import mNavbar from './m-navbar.vue'

mNavbar.install = function (Vue) {
  Vue.component(mNavbar.name, mNavbar)
}

export default mNavbar