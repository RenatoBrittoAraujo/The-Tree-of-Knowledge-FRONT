import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap import
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'

// font awesome icons import
import FontAwesomeIcon from '@/libs/icons'

// vue snackbar import
import VueSnackbar from 'vue-snack'
import 'vue-snack/dist/vue-snack.min.css'

// vue cookies import
import VueCookies from 'vue-cookies'

// bootstrap config
Vue.use(BootstrapVue)

// font awesome icons config
Vue.component('font-awesome-icon', FontAwesomeIcon)

// vue snackbar config
Vue.use(VueSnackbar)

// vue cookies config
Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
