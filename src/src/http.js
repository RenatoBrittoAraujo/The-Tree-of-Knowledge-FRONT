/* eslint-disable */

import axios from 'axios'
import store from '@/store/index'
import cookies from 'vue-cookies'

var determineIPandPORT = function () {
  return 'http://0.0.0.0:8002/'
}

const ip = determineIPandPORT()

/* AUTH HELPERS */

var setData = function(key, data) {
  cookies.set(key, data)
}

var getData = function (key) {
  return cookies.get(key)
}

var authHeader = function () {
  return {
    headers: { Authorization: 'Bearer ' + getData('access') }
  }
}

var testAcessToken = async function () {
  return await axios.post(ip + 'token/verify/', { token: getData('access') })
    .then(() => { return true })
    .catch(() => { return false })
}

var refreshAccessToken = async function () {
  return await axios.post(ip + 'token/refresh/', 
                  { refresh: getData('refresh') })
    .then((res) => { setData('access', res.data['access']); return true })
    .catch(() => { return false })
}

var header = async function () {
  if (!(await testAcessToken())) {
    if (!(await refreshAccessToken())) {
      return false
    }
  }
  return authHeader()
}

var logout = function () {
  setData('username', null)
  setData('access', null)
  setData('refresh', null)
}

var isLoggedIn = async function () {
  if (!(await header())) {
    return false
  } else {
    return true
  }
}

/* API CALLS */

var queryNode = async function (nodeID) {
  return axios.get(ip + 'querynode/' + nodeID)
}

var getNode = async function (nodeID) {
  return axios.get(ip + 'getnode/' + nodeID)
}

var voteNode = async function (nodeID, voteparam, parent) {
  const header = await header()
  if (!header) return false
  return axios.post('votenode/' + nodeID, 
    { voteparam: voteparam, parent: parent },
    header)
}

var getRandomNode = async function () {
  return axios.get(ip + 'randomnode/')
}

var reportNode = async function () {

}

var addNode = async function () {

}

var addEdge = async function () {

}

var addRef = async function () {

}

var editNode = async function () {

}

var editRef = async function () {

}

var getUsername = function () {
  return new Promise((resolve, reject) => {
    axios.get(ip + 'getusername/', header())
      .then((res) => {
        setData('username', res.data['username'])
        resolve()
      })
      .catch((err) => reject(err))
  })
}

var login = async function (data) {
  return await axios.post(ip + 'token/', data)
      .then(async (res) => {
        setData('access', res.data['access'])
        setData('refresh', res.data['refresh'])
        return await getUsername()
          .then(() => { return true })
          .catch((err) => { return false })
      })
      .catch((err) => { return false })
}

var register = async function (data) {
  console.log(data)
  return await axios.post(ip + 'register/', data)
      .then(async (res) => {
        console.log(res.data)
        setData('username', res.data['username'])
        return await login(data)
      })
      .catch((err) => { console.log(err); return false })
}

export default {
// Nodes API
  queryNode,
  getNode,
  voteNode,
  getRandomNode,
  reportNode,
  addNode,
  addEdge,
  addRef,
  editNode,
  editRef,
// Users API
  login,
  register,
  logout,
  isLoggedIn,
// Misc
  testAcessToken
}
