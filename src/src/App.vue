<template>
  <div id="app" class="p-0 m-0">
    <Header v-on:sidePageChange="sidePageChange"/>
    <div class="row p-0 m-0">
      <Graph class="col-7" ref="graph" />
      <div class="col-5 p-0 bg-light overflow-scroll">
        <NodeDigest v-if="sidePage == 'NodeDigest'"
          class=""
          v-on:createNewNode="createNewNode"/>
        <About v-else-if="sidePage == 'About'"
          class=""/>
      </div>
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
.content {
  overflow: hidden;
}
.overflow-scroll {
  /* overflow-y: scroll; */
  overflow-x: hidden;
}
</style>
