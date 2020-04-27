<template>
  <div>
    <canvas id="viewport" class="border"></canvas>
  </div>
</template>

<script>
import main from '../../public/scripts/main'
import JQuery from 'jquery'
window.$ = JQuery

let natincounter = 1

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
    runGraph () {
      this.canvas = main(window.$, this.canvasID, this)
      this.canvas.init()
    },
    // Calls into canvas
    selectRandomNode () {
      this.canvas.addNode('a', 'natin ' + natincounter)
      natincounter++
    },
    // Calls from canvas
    queryNode (name) {
      console.log('queryNode', name)
      this.canvas.addNode(name, 'natin ' + natincounter)
      natincounter++
      this.canvas.addNode(name, 'natin ' + natincounter)
      natincounter++
    },
    NDunselect () {
      // this.$emit('unselect', name)
    },
    NDselect (name) {
      this.$emit('select', name)
    },
    unselect () {
      this.canvas.unselect()
    },
    select (name) {
      this.canvas.select(name)
    },
    newNode (obj) {
      this.canvas.addNode(obj.from, obj.name)
    }
  }
}
</script>

<style>
</style>
