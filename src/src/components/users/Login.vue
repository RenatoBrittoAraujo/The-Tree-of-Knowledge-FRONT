<template>
  <div class="mt-4">
    <div class="form-group text-left">
      <label>Email:</label>
      <input type="text" class="form-control" v-model="email">
    </div>
    <div class="form-group text-left">
      <label>Password:</label>
      <input type="text" class="form-control" v-model="password">
    </div>
    <div class="text-center">
      <button class="btn btn-success">Log in</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log('loginUser', this.email, this.password)
    }
  }
}
</script>
