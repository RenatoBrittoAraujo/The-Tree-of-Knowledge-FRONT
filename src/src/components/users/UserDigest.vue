<template>
  <div>
    <div v-if="authenticated.length === 0" class="text-center p-3">
      <h5 class="">You are not logged in</h5>
      <button class="w-100 mt-4 btn btn-primary"
        @click="$emit('sidePageChange', { page: 'Register' })">Register</button>
      <br>
      <button class="w-100 mt-4 btn btn-primary"
        @click="$emit('sidePageChange', { page: 'Login' })">Log in</button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      authenticated: ''
    }
  },
  mounted () {
    this.testUser()
    if (this.authenticated.length > 0) {
      this.$emit('popSidePage')
      this.$emit('sidePageChange',
        { page: 'AccountShow', username: this.authenticated })
    }
  },
  methods: {
    testUser () {
      this.authenticated = this.getCurrentUser()
    },
    getCurrentUser () {
      return ''
    }
  }
}
</script>
