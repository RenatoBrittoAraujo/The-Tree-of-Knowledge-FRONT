<template>
  <div>
    <canvas id="viewport" class="border"></canvas>
  </div>
</template>

<script>
import HTTP from '@/http'
import main from '../../public/scripts/main'
import JQuery from 'jquery'
window.$ = JQuery

export default {
  data () {
    return {
      canvasID: 'viewport',
      canvas: null
    }
  },
  mounted () {
    this.runGraph()
  },
  methods: {
    async runGraph () {
      this.canvas = main(window.$, this.canvasID, this)
      const randomNode = await HTTP.getRandomNode()
      this.canvas.init(randomNode)
    },
    // Calls from canvas
    async queryNode (qnode) {
      const query = await HTTP.queryNode(qnode.getData('id'))
      for (const node of query) {
        this.canvas.addNode(node, qnode.name)
      }
    },
    deleteNode (node) {
      this.canvas.deleteNode(node)
    },
    NDunselect () {
      // this.$emit('unselect', name)
    },
    NDselect (obj) {
      this.$emit('select', obj)
    },
    unselect () {
      this.canvas.unselect()
    },
    select (name) {
      this.canvas.select(name)
    },
    newNode (obj) {
      this.canvas.addNode(obj.node, obj.from)
    },
    async resetGraph (node = null) {
      if (!node) {
        node = await HTTP.getRandomNode()
      }
      this.canvas.init(node)
    }
  }
}
</script>

<style>
</style>
