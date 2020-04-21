<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <a :class="'navbar-brand ' + (currentRoute == 'index' ? 'font-weight-bold' : '')" href="/">The Tree of Knowledge</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li :class="'nav-link ' + (currentRoute == 'about' ? 'active' : '')">
          <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-link">
          <a :class="'nav-link ' + (currentRoute == 'users' ? 'active' : '')" href="/users">
            <font-awesome-icon icon="user-circle" size="lg"/>
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
