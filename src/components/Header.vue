<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark px-4">
    <a class="navbar-brand">The Tree of Knowledge</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav mr-auto">
        <li class="nav-link">
          <a class="nav-link"
            @click="$emit('sidePageChange', { page: 'About' })">
            About
          </a>
        </li>
        <li class="nav-link">
          <a class="nav-link"
            @click="$emit('randomNode')">
            Random
          </a>
        </li>
        <li class="nav-link">
          <a class="nav-link"
            @click="$emit('sidePageChange', { page: 'Rules' } )">
            Rules
          </a>
        </li>
        <li class="nav-link">
          <a class="nav-link"
            @click="$emit('sidePageChange', { page: 'UserDigest' })">
            <font-awesome-icon icon="user-circle" size="1x"/>
          </a>
        </li>
      </ul>
      <button @click="$emit('sidePageChange', { page: 'SearchList' })"
        class="btn btn-outline-success my-2 my-sm-0">
        <font-awesome-icon icon="search"/>
      </button>
    </div>
  </nav>
</template>

<script>

export default {
  computed: {
    currentRoute () {
      return this.$route.name
    }
  }
}
</script>

<style>
.header {
  background-color: red;
}
</style>
