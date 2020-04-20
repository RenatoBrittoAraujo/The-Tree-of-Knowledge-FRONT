<template>
  <div class="home">
    <div class="row">
      <div class="col-9 occupy-height">
        Graph
      </div>
      <div class="col-3 bg-light occupy-height">
        Sidebar
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style>
.occupy-height {
  flex: 1 1 auto;
}
.home {
  display: flex;
  flex-flow: column;
  height: 100%;
}
</style>
