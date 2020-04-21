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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSearch, faUserCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// bootstrap config
Vue.use(BootstrapVue)

// font awesome icons config
library.add(faUser, faSearch, faUserCircle, faThumbsUp, faThumbsDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
