<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark px-4">
    <a class="navbar-brand" href="#">The Tree of Knowledge</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-link">
          <a class="nav-link"
            href="#about"
            @click="$emit('sidePageChange', { page: 'About' })">
            About
          </a>
        </li>
        <li class="nav-link">
          <a class="nav-link"
            href="#about"
            @click="$emit('randomNode')">
            Random
          </a>
        </li>
        <li class="nav-link">
          <a class="nav-link"
            href="#rules"
            @click="$emit('sidePageChange', { page: 'Rules' } )">
            Rules
          </a>
        </li>
        <li class="nav-link">
          <a class="nav-link" href="#users">
            <font-awesome-icon icon="user-circle" size="md"/>
          </a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search a topic" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          <font-awesome-icon icon="search"/>
        </button>
      </form>
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
