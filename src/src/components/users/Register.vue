<template>
  <div class="mt-4">
    <div class="text-center text-muted bg-light p-1">
      Make sure to read the
      <a href="#rules"
        @click="$emit('sidePageChange', { page: 'Rules' } )">rules</a>.
    </div>
    <div class="form-group text-left">
      <label>Username:</label>
      <input type="text" class="form-control" v-model="email">
    </div>
    <div class="form-group text-left">
      <label>Email:</label>
      <input type="text" class="form-control" v-model="password">
    </div>
    <div class="form-group text-left">
      <label>Password:</label>
      <input type="text" class="form-control" v-model="password">
    </div>
    <div class="form-group text-left">
      <label>Password confimation:</label>
      <input type="text" class="form-control" v-model="password">
    </div>
    <div class="text-center">
      <button class="btn btn-success">Resgister</button>
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
    register () {
      console.log('registerUser', this.email, this.password)
    }
  }
}
</script>
