<template>
  <div class="mt-4">
    <div class="text-center text-muted bg-white border p-1">
      Make sure to read the
      <a href="#rules"
        @click="$emit('sidePageChange', { page: 'Rules' } )">rules</a>.
    </div>
    <div class="form-group text-lef mt-3">
      <label>Username:</label>
      <input type="text" class="form-control" v-model="username">
    </div>
    <div class="form-group text-left">
      <label>Email:</label>
      <input type="text" class="form-control" v-model="email">
    </div>
    <div class="form-group text-left">
      <label>Password:</label>
      <input type="password" class="form-control" v-model="password">
    </div>
    <div class="form-group text-left">
      <label>Password confimation:</label>
      <input type="password" class="form-control" v-model="password_confimation">
    </div>
    <div class="text-center">
      <button class="btn btn-success"
        @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import HTTP from '@/http'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const data = {
        username: this.username,
        password: this.password,
        email: this.email
      }
      const registered =
        await HTTP.register(data)
      if (registered) {
        this.$snack.success('You are registered')
        this.$emit('popSidePage')
      } else {
        this.$snack.success('Something went wrong, try again!')
      }
    }
  }
}
</script>
