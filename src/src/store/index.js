import Vue from 'vue'
import Vuex from 'vuex'
// import HTTP from '@/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    accessToken: '',
    refreshToken: ''
  },
  mutations: {
    setUser (state, data) {
      if (Object.prototype.hasOwnProperty.call(data, 'username')) {
        state.username = data.username
      }
      if (Object.prototype.hasOwnProperty.call(data, 'refresh')) {
        state.refreshToken = data.refresh
      }
      if (Object.prototype.hasOwnProperty.call(data, 'access')) {
        state.accessToken = data.access
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getAccessToken: (state) => {
      return state.accessToken
    },
    getRefreshToken: (state) => {
      return state.refreshToken
    },
    getUsername: (state) => {
      return state.username
    }
  }
})
