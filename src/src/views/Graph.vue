<template>
  <div>
    <canvas id="viewport" width="500" height="600" class="border"></canvas>
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
      // this.canvas.increaseFontSize()
      this.canvas.addNode()
    },
    fuckYou () {
      console.log('Fuck you indeed')
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
