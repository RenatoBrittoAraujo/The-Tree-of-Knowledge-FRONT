<template>
  <div class="home">
    <div class="row">
      <Graph class="col-7"/>
      <div class="col-5 bg-light pr-4 p-2">
        <h3 class="text-center">Title of node</h3>
        <hr/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <hr/>
        <div class="row pl-3 pr-3">
          <button class="col-4 btn btn-success">Upvote</button>
          <div class="col-4 text-center mt-1">
            +23
          </div>
          <button class="col-4 btn btn-warning">Downvote</button>
        </div>
        <div class="row pl-3 pr-3 mt-1">
          <button class="col btn btn-danger">Report</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Graph from '@/views/Graph'

export default {
  name: 'Home',
  components: {
    Graph
  },
  mounted () {
  }
}
</script>

<style>
</style>
