<template>
  <div class="mt-4">
    <div class="form-group text-left">
      <label>Email:</label>
      <input type="text" class="form-control" v-model="email">
    </div>
    <div class="form-group text-left">
      <label>Password:</label>
      <input type="password" class="form-control" v-model="password">
    </div>
    <div class="text-center">
      <button class="btn btn-success"
        @click="login">Log in</button>
    </div>
  </div>
</template>

<script>
import HTTP from '@/http'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      if (!this.validate()) {
        return
      }
      const loggedIn =
        await HTTP.login({ email: this.email, password: this.password })
      if (loggedIn) {
        this.$snack.success('Logged in')
        this.$emit('popSidePage')
      } else {
        this.$snack.success('Email or password is wrong, try again')
      }
    },
    validate () {
      if (!this.email || this.email.length === 0) {
        this.$snack.success('Email must not be empty')
        return false
      }
      if (!this.password || this.password.length < 8) {
        this.$snack.success('Password must have 8 characters or more')
        return false
      }
      return true
    }
  }
}
</script>
