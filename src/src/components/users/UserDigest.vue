<template>
  <div>
    <div v-if="authenticated.length === 0" class="text-center p-3">
      <h5 class="">You are not logged in</h5>
      <button class="w-100 mt-4 btn btn-primary"
        @click="$emit('popSidePage');$emit('sidePageChange', { page: 'Register' })">Register</button>
      <br>
      <button class="w-100 mt-4 btn btn-primary"
        @click="$emit('popSidePage');$emit('sidePageChange', { page: 'Login' })">Log in</button>
    </div>
  </div>
</template>

<script>
import HTTP from '@/http'

export default {
  data () {
    return {
      authenticated: ''
    }
  },
  mounted () {
    this.testUser()
  },
  methods: {
    async testUser () {
      if (await HTTP.isLoggedIn()) {
        this.authenticated = HTTP.getUser()
        if (!this.authenticated || this.authenticated.length === 0) {
          return
        }
        this.$emit('popSidePage')
        this.$emit('sidePageChange',
          { page: 'AccountShow', username: this.authenticated })
      }
    },
    getCurrentUser () {
      return ''
    }
  }
}
</script>
