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
    login () {
      HTTP.login({ email: this.email, password: this.password })
        .then((res) => {
          this.$snack.success('You are logged in')
        })
        .catch(() => {
          this.$snack.success('Login failed, try again!')
        })
    }
  }
}
</script>
