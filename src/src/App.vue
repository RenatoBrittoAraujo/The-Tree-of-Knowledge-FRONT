<template>
  <div id="app" class="container-app">
    <Header v-on:sidePageChange="sidePageChange"
      class="row"/>
    <div class="row section">
      <Graph class="col-7 graph" id="graph" ref="graph" />
      <div class="wrapper col-5 bg-light border">
        <NodeDigest v-if="sidePage == 'NodeDigest'"
          v-on:createNewNode="createNewNode"/>
        <About v-else-if="sidePage == 'About'"/>
        <Rules v-else-if="sidePage == 'Rules'"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Graph from '@/components/Graph'
import NodeDigest from '@/components/NodeDigest'
import About from '@/components/About'
import Rules from '@/components/Rules'

export default {
  components: {
    Header,
    Graph,
    NodeDigest,
    About,
    Rules
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
  flex-grow: 1;
  overflow: hidden;
  min-height: 100%;
}
</style>
