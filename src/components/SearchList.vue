<template>
  <div class="text-left mt-3 p=0">
    <input class="form-control w-100" type="text" placeholder="Search" v-model="searchTerm" aria-label="Search">
    <div class="col mt-3 p-0">
      <div v-if="searchTerm !== '' && nodes.length === 0">
        No results found
      </div>
      <div v-else class="list-group">
        <div class="list-group-item list-group-hover"
          v-for="node in nodes" v-bind:key="node.id"
          @click="initNode(node)">
          {{ node.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '@/http'

export default {
  data () {
    return {
      searchTerm: '',
      oldSearchTerm: '',
      nodes: [],
      graph: null
    }
  },
  mounted () {
    setInterval(() => this.autoSearch(), 100)
  },
  methods: {
    autoSearch () {
      if (this.searchTerm === '') {
        this.nodes = []
      }
      if (this.oldSearchTerm !== this.searchTerm) {
        this.getNodes()
        this.oldSearchTerm = this.searchTerm
      }
    },
    async getNodes () {
      const results = await HTTP.nodeSearch(this.searchTerm)
      if (results) {
        this.nodes = results
      }
    },
    setGraph (graph) {
      this.graph = graph
    },
    initNode (node) {
      this.graph.resetGraph(node)
      this.$emit('popSidePage')
      this.$emit('sidePageChange', { page: 'NodeDigest', obj: node })
    }
  }
}
</script>

<style>
.list-group-item:hover {
    background-color: #fafafa;
}
</style>
