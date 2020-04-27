<template>
  <div>
    <div v-if="authenticated">
      <AccountShow ref="accountshow"/>
    </div>
    <div v-else class="text-center p-3">
      <div v-if="page === 'Login'">
        <Login
          v-on:sidePageChange="sidePageChange"/>
      </div>
      <div v-else-if="page === 'Register'">
        <Register
          v-on:sidePageChange="sidePageChange"/>
      </div>
      <div v-else>
        <h5 class="">You are not logged in</h5>
        <button class="w-100 mt-4 btn btn-primary"
          @click="page = 'Register'">Register</button>
        <br>
        <button class="w-100 mt-4 btn btn-primary"
          @click="page = 'Login'">Log in</button>
      </div>
    </div>
  </div>
</template>

<script>
import AccountShow from '@/components/users/AccountShow'
import Login from '@/components/users/Login'
import Register from '@/components/users/Register'

export default {
  components: {
    AccountShow,
    Login,
    Register
  },
  data () {
    return {
      authenticated: true,
      page: ''
    }
  },
  mounted () {
    this.testUser()
  },
  methods: {
    sidePageChange (obj) {
      this.$emit('sidePageChange', obj)
    },
    testUser () {
      const currentUser = this.getCurrentUser()
      if (!currentUser) {
        this.authenticated = false
      } else {
        this.authenticated = true
        this.$refs.accountshow.setUser(currentUser)
      }
    },
    getCurrentUser () {
      return null
    }
  }
}
</script>
