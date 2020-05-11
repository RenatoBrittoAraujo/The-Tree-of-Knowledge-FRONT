<template>
  <div class="mt-4">
    <div class="text-center text-muted bg-white border p-1">
      Make sure to read the
      <span
        class="link-text"
        @click="$emit('sidePageChange', { page: 'Rules' } )">rules</span>.
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
      <input type="password" class="form-control" v-model="password_confirmation">
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
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    async register () {
      if (!this.validate()) {
        return
      }
      const data = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      const registered =
        await HTTP.register(data)
      if (registered === true) {
        this.$snack.success('You are registered')
        this.$emit('popSidePage')
      } else {
        this.$snack.success(registered)
      }
    },
    validate () {
      if (this.username.indexOf(' ') !== -1) {
        this.$snack.success('Username must not contain spaces')
        return false
      }
      if (!this.email || this.email.length === 0) {
        this.$snack.success('Email must not be empty')
        return false
      }
      if (!this.password || this.password.length < 8) {
        this.$snack.success('Password must have 8 characters or more')
        return false
      }
      if (this.password !== this.password_confirmation) {
        this.$snack.success('Password and Password Confirmation must me equal')
        return false
      }
      if (!this.username || this.username.length === 0) {
        this.$snack.success('Username must not be empty')
        return false
      }
      return true
    }
  }
}
</script>
