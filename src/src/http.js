/* eslint-disable */

import axios from 'axios'
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
    .then(() => true)
    .catch(() => false)
}

var refreshAccessToken = async function () {
  return await axios.post(ip + 'token/refresh/', 
                  { refresh: getData('refresh') })
    .then(res => { setData('access', res.data['access']); return true })
    .catch(() => false)
}

var header = async function () {
  if (!(await testAcessToken())) {
    if (!(await refreshAccessToken())) {
      return false
    }
  }
  return authHeader()
}

/* HELPERS */

var isLoggedIn = async function () {
  if (!(await header())) {
    return false
  } else {
    return true
  }
}

var getUser = function () {
  return getData('username')
}

/* API CALLS */

/* === USERS API === */

var logout = function () {
  setData('username', null)
  setData('access', null)
  setData('refresh', null)
}

var getUsername = async function () {
  return await axios.get(ip + 'getusername/', authHeader())
    .then(res => {
      setData('username', res.data)
      return true
    })
    .catch(() => false)
}

var login = async function (data) {
  return await axios.post(ip + 'token/', data)
    .then(async res => {
      setData('access', res.data['access'])
      setData('refresh', res.data['refresh'])
      return await getUsername()
    })
    .catch(() => false)
}

var register = async function (data) {
  return await axios.post(ip + 'register/', data)
    .then(async res => {
      setData('username', res.data['username'])
      return await login(data)
    })
    .catch((err) => {
      err = err.response.data
      let ret =
        err.username ? err['username'][0] :
          err.password ? err['password'][0] :
            err['email'][0]
      return ret
    })
}

var queryUser = async function (username) {
  return axios.get(ip + 'profile/' + username)
    .then(res => { return res.data })
    .catch(() => false)
}

var editUser = async function (data) {
  return await axios.put(ip + 'profileupdate/' + getData('username'), data, await header())
    .then(res => true)
    .catch(() => false)
}

var reportUser = async function (user) {
  return await axios.get(ip + 'reportuser/' + user, await header())
    .then(res => true)
    .catch(() => false)
}

/* === NODES API === */

var queryNode = async function (nodeID) {
  return axios.get(ip + 'querynode/' + nodeID)
    .then(res => res.data)
    .catch(() => false)
}

var getNode = async function (nodeID, parent=null) {
  const parentReq = parent != undefined && parent != null ?
    '?parent=' + parent : ''
  if (isLoggedIn())
    return axios.get(ip + 'getnode/' + nodeID + parentReq, await header())
      .then(res => res.data)
      .catch(() => false)
  else return axios.get(ip + 'getnode/' + nodeID + parentReq)
    .then(res => res.data)
    .catch(() => false)
}

var voteNode = async function (nodeID, parent, voteparam) {
  return axios.post(ip + 'votenode/' + nodeID, 
      { voteparam: '' + voteparam, parent: parent },
      await header()
    )
    .then(res => res.data)
    .catch((err) => false )
}

var voteRef = async function (refID, voteparam) {
  return axios.post(ip + 'voteref/' + refID,
    { voteparam: '' + voteparam },
    await header()
  )
    .then(res => res.data)
    .catch((err) => false)
}

var getRandomNode = async function () {
  return axios.get(ip + 'randomnode/')
    .then(res => res.data)
    .catch(() => false)
}

var reportNode = async function (id) {
  return axios.get(ip + 'report/' + id, await header())
    .then(res => res.data)
    .catch(() => false)
}

var addNode = async function (data) {
  return await axios.post(ip + 'addnode/', data, await header())
    .then(res => res.data)
    .catch(() => false)
}

var addEdge = async function (from, to) {
  return await axios.post(ip + 'addedge/', { source: from, target: to }, await header())
    .then(res => res.data)
    .catch(() => false)
}

var addRef = async function (data) {
  return await axios.post(ip + 'addref/', data, await header())
    .then(res => res.data)
    .catch(() => false)
}

var editNode = async function (nodeID, data) {
  return await axios.put(ip + 'editnode/' + nodeID, data, await header())
    .then(res => true)
    .catch(() => false)
}

var editRef = async function () {

}

export default {
  /* HELPERS */
  getUser,        // input: none                            output: current username
  isLoggedIn,     // input: none                            output: true/false  is logged in
  
  /* API */
  /* Users API */
  login,          // input: {email, password}               output: true/false  logged successfully
  register,       // input: {username, email, password}     output: true/false  registred succcessfully
  logout,         // input: none                            output: none       
  queryUser,      // input: username                        output: user profile info
  editUser,       // input: user profile data               output: true/false  edit successfully
  reportUser,     // input: username                        output: true/false  reported successfully

/* Nodes API */
  queryNode,      // input: node id                          output: list of child node ids
  getNode,        // input: node id                          output: node info
  voteNode,       // input: node id, parent, voteparam       output: true/false voted successfully
  voteRef,        // input: ref id, voteparam                output: true/false voted successfully  
  getRandomNode,  // input: none                             output: random node info
  reportNode,     // NOT IMPLEMENTED
  addNode,        // input: node id                          output: list of child node ids
  addEdge,        // input: node id                          output: list of child node ids
  addRef,         // input: node id                          output: list of child node ids
  editNode,       // input: node id                          output: list of child node ids
  editRef,        // input: node id                          output: list of child node ids
}
