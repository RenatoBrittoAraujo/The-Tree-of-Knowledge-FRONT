<template>
  <div class="text-center px-2">
    <h3 class="mt-3">Welcome to The Tree of Knowledge</h3>
    <hr/>
    <div class="text-left px-1">
      <p>Let me show you around!</p>
      <p>As you can see, there is a random node to your left.</p>
      <p>By clicking it once, you select it, and such you may read a brief description of it, vote and see references for that study topic.</p>
      <p>By double clicking it, new nodes will open connected to it. These are knowledge topics connected to that initial node.</p>
      <p>By clicking and dragging, you may move a node around to fit your eyes better.</p>
      <p>In here, you may browse the knowledge tree and even contribute to it if you want to.</p>
      <p>This is a democratic process, where people vote and a consus in achieved on the connections and contents of nodes, that way, nobody is the owner of truth.</p>
      <p>Read the <span class="link-text" @click="$emit('sidePageChange', { page: 'About' })">about</span> of you want to know more.</p>
      <p>Make sure to read the <span class="link-text" @click="$emit('sidePageChange', { page: 'Rules' })">rules</span> if you want to contribute.</p>
      <div v-if="!loggedIn">
        <p>You are not logged in</p>
        <button class="w-100 btn btn-primary mb-2"
          @click="$emit('sidePageChange', { page: 'Register' })">Register</button>
        <button class="w-100 btn btn-primary mb-5"
          @click="$emit('sidePageChange', { page: 'Login' })">Log in</button>
      </div>
      <div v-else>
        <p>You are logged in as <a class="text-dark font-weight-bold">{{ getUser() }}</a></p>
        <button class="w-100 btn btn-primary mb-2"
          @click="logout">Logout</button>
        <button class="w-100 btn btn-primary mb-5"
          @click="$emit('sidePageChange', { page: 'AccountShow', username: getUser() })">Go to profile</button>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '@/http'

export default {
  data () {
    return {
      loggedIn: false
    }
  },
  mounted () {
    this.isLoggedIn()
  },
  methods: {
    async isLoggedIn () {
      this.loggedIn = await HTTP.isLoggedIn()
    },
    logout () {
      HTTP.logout()
      this.isLoggedIn()
    },
    getUser () {
      return HTTP.getUser()
    }
  }
}
</script>

<style>
</style>
