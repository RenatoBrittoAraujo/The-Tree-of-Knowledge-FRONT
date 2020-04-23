<template>
  <div>
    <canvas id="viewport" class="border"></canvas>
  </div>
</template>

<script>
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
    selectRandomNode () {
      this.canvas.addNode()
    },
    runGraph () {
      this.canvas = main(window.$, this.canvasID, this)
      this.canvas.init()
    }
  }
}
</script>

<style>
</style>
