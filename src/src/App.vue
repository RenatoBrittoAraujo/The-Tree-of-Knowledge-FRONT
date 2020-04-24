<template>
  <div id="app" class="container-app">
    <Header v-on:sidePageChange="sidePageChange"
      class="row"/>
    <div class="row section">
      <Graph class="col-7 graph" id="graph" ref="graph"
        v-on:select="select"/>
      <div class="wrapper col-5 bg-light border">
        <div
            @click="Gunselect"
            v-if="sideBarQueue.length > 1">
          <font-awesome-icon
            class="mt-3 ml-2" icon="arrow-left" size="md"/>
        </div>
        <NodeDigest v-if="topPage() == 'NodeDigest'"
          ref="nd"
          v-on:createNewNode="createNewNode"/>
        <About v-else-if="topPage() == 'About'"/>
        <Rules v-else-if="topPage() == 'Rules'"/>
        <HelpDigest v-else-if="topPage() == 'HelpDigest'"/>
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
import HelpDigest from '@/components/HelpDigest'

export default {
  components: {
    Header,
    Graph,
    NodeDigest,
    About,
    Rules,
    HelpDigest
  },
  methods: {
    createNewNode () {
      this.$refs.graph.selectRandomNode()
    },
    async sidePageChange (pageObj) {
      if (this.topPage() === 'NodeDigest' &&
          pageObj.page !== 'NodeDigest') {
        this.$refs.graph.unselect()
      }
      await this.sideBarQueue.push(pageObj)
    },
    topPage () {
      return this.sideBarQueue[this.sideBarQueue.length - 1].page
    },
    async Gunselect () {
      await this.sideBarQueue.pop()
      if (this.topPage() !== 'NodeDigest') {
        this.$refs.graph.unselect()
      }
      if (this.topPage() === 'NodeDigest') {
        const name = this.sideBarQueue[this.sideBarQueue.length - 1].name
        this.$refs.nd.select(name)
        this.$refs.graph.select(name)
      }
    },
    async select (name) {
      await this.sideBarQueue.push({ page: 'NodeDigest', name: name })
      this.$refs.nd.select(name)
    }
  },
  data () {
    return {
      sideBarQueue: [{ page: 'HelpDigest' }]
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
