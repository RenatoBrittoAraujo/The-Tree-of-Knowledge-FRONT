import axios from 'axios'
import store from '@/store/index'

var determineIPandPORT = function () {
  return 'http://0.0.0.0:8002/'
}

var authHeader = function () {
  return {
    headers: { Authorization: 'Bearer ' + store.getters.getAccessToken() }
  }
}

const ip = determineIPandPORT()

// var getAccessToken = function () {
// }

var authGET = function () {
}

var authPOST = function () {
}

var authPUT = function () {
}

var noauthGET = function () {
}

var getUsername = function () {
  return new Promise((resolve, reject) => {
    axios.get(ip + 'users/getusername/', authHeader())
      .then((res) => {
        store.commit('setUser', res.data)
        resolve()
      })
      .catch((err) => reject(err))
  })
}

var login = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(ip + 'api/token/', data)
      .then((res) => {
        store.commit('setUser', res.data)
        getUsername()
          .then(() => resolve())
          .catch((err) => reject(err))
      })
      .catch((err) => reject(err))
  })
}

var register = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(ip + 'users/register', data)
      .then((res) => {
        store.commit('setUser', res.data)
        login(data)
          .then((res) => {
            resolve()
          })
          .catch((err) => reject(err))
      })
      .catch((err) => reject(err))
  })
}

var HTTP = {
  authGET,
  authPOST,
  authPUT,
  noauthGET,
  login,
  register
}

export default HTTP
