<template>
  <div id="app">
    <Header/>
    <div class="page-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style>
#app {
  padding: 0;
  margin: 0;
}
.page-content {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
