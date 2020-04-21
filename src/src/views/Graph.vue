<template>
  <div>
    <canvas id="viewport" width="500" height="600" class="border"></canvas>
  </div>
</template>

<script>
// import main from '../../public/scripts/main'

export default {
  mounted () {
    // JQuery
    this.addScript('https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js')
    // Arbor
    this.addScript('/scripts/arbor.js')
    // Graph
    this.addScript('/scripts/main.js')
    // this.graph()
    // main()
  },
  methods: {
    addScript (link) {
      const script = document.createElement('script')
      script.async = true
      script.src = link
      document.head.appendChild(script)
    },
    selectRandomNode () {
      console.log('worked')
    }
  }
}
</script>

<style>
</style>
