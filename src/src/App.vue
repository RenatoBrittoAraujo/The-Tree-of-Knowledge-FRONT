<template>
  <div id="app" class="container-app">
    <Header v-on:sidePageChange="sidePageChange"
      class="row"/>
    <div class="row section">
      <Graph class="col-7 graph" id="graph" ref="graph" />
      <NodeDigest v-if="sidePage == 'NodeDigest'"
        class="col-5 bg-light wrapper"
        v-on:createNewNode="createNewNode"/>
      <About v-else-if="sidePage == 'About'"
        class="col-5 bg-light wrapper"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Graph from '@/components/Graph'
import NodeDigest from '@/components/NodeDigest'
import About from '@/components/About'

export default {
  components: {
    Header,
    Graph,
    NodeDigest,
    About
  },
  methods: {
    createNewNode () {
      this.$refs.graph.selectRandomNode()
    },
    sidePageChange (page) {
      this.sidePage = page
    }
  },
  data () {
    return {
      sidePage: 'NodeDigest'
    }
  }
}
</script>

<style>
html, body {
  overflow-x: hidden;
  margin: 0px;
  padding: 0px;
  height: 100%;
}
.container-app {
  width:  100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.wrapper {
  flex-grow: 1;
  overflow: scroll;
  overflow-x: hidden;
  min-height: 100%;
}
.graph {
  background-color: red;
  flex-grow: 1;
  overflow: hidden;
  min-height: 100%;
}
</style>
