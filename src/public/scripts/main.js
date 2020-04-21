/* eslint-disable */

(function ($) {
  // Params for graph rendering
  var Globals = {
    // Globals params
    backgroundColor: "white",

    // Edge params
    edgeThickness: 1,
    edgeColor: "rgba(0,0,0, .200)",

    // Node params
    textSize: 15,
    textFont: "Verdana",
    horizontalPadding: 10,
    verticalPadding: 10,

    activeColor: "orange",
    inactiveColor: "#444444",
    textColor: "white"
  }

  var Renderer = function (canvas) {
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    var particleSystem

    var that = {
      init: function (system) {
        //
        // the particle system will call the init function once, right before the
        // first frame is to be drawn. it's a good place to set up the canvas and
        // to pass the canvas size to the particle system
        //
        // save a reference to the particle system for use in the .redraw() loop
        particleSystem = system

        // inform the system of the screen dimensions so it can map coords for us.
        // if the canvas is ever resized, screenSize should be called again with
        // the new dimensions
        particleSystem.screenSize(canvas.width, canvas.height)
        // particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side

        // set up some event handlers to allow for node-dragging
        that.initMouseHandling()
      },

      redraw: function () {
        // 
        // redraw will be called repeatedly during the run whenever the node positions
        // change. the new positions for the nodes can be accessed by looking at the
        // .p attribute of a given node. however the p.x & p.y values are in the coordinates
        // of the particle system rather than the screen. you can either map them to
        // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
        // which allow you to step through the actual node objects but also pass an
        // x,y point in the screen's coordinate system
        // 
        ctx.fillStyle = Globals.backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        particleSystem.eachEdge(function (edge, pt1, pt2) {
          // edge: {source:Node, target:Node, length:#, data:{}}
          // pt1:  {x:#, y:#}  source position in screen coords
          // pt2:  {x:#, y:#}  target position in screen coords

          // Edge rendering
          ctx.strokeStyle = Globals.edgeColor
          ctx.lineWidth = Globals.edgeThickness
          ctx.beginPath()
          ctx.moveTo(pt1.x, pt1.y)
          ctx.lineTo(pt2.x, pt2.y)
          ctx.stroke()
        })

        particleSystem.eachNode(function (node, pt) {
          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt:   {x:#, y:#}  node position in screen coords

          // Node text
          let text = "node " + node.name
          let textParams = Globals.textSize + "px " + Globals.textFont
          
          // Node rendering
          let textWidth = ctx.measureText(text).width
          let shape = {
            x: pt.x - textWidth / 2.0 - Globals.horizontalPadding,
            y: pt.y - Globals.textSize / 2.0 - Globals.verticalPadding,
            w: textWidth + 2.0 * Globals.horizontalPadding,
            h: Globals.textSize + 2.0 * Globals.verticalPadding
          }
          ctx.fillStyle = (node.data.alone) ? 
            Globals.activeColor : Globals.inactiveColor
          let radius = Globals.verticalPadding + Globals.textSize / 2.0
          let cy = shape.y + Globals.verticalPadding + Globals.textSize / 2.0
          let firstCX = shape.x + radius
          let secondCX = shape.x + shape.w - radius
          ctx.beginPath()
          // Left circle
          ctx.arc(firstCX, cy, radius, 0, 2.0 * Math.PI);
          ctx.fill()
          // Right circle
          ctx.arc(secondCX, cy, radius, 0, 2.0 * Math.PI);
          ctx.fill()
          // Middle rect
          ctx.fillRect(shape.x + radius, shape.y, shape.w - 2.0 * radius, shape.h)


          // Font rendering
          ctx.font = textParams
          ctx.fillStyle = Globals.textColor
          ctx.fillText(text, 
            shape.x + Globals.horizontalPadding, 
            shape.y + Globals.textSize + Globals.verticalPadding - 2.0 /* I have no ideia why, but this 2 makes everything ok*/)
        })
      },

      initMouseHandling: function () {
        // no-nonsense drag and drop (thanks springy.js)
        var dragged = null;

        // set up a handler object that will initially listen for mousedowns then
        // for moves and mouseups while dragging
        var handler = {
          clicked: function (e) {
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
            dragged = particleSystem.nearest(_mouseP);
            
            // if (!mouseP)

            if (dragged && dragged.node !== null) {
              // while we're dragging, don't let physics move the node
              dragged.node.fixed = true
            }

            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged: function (e) {
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)

            if (dragged && dragged.node !== null) {
              var p = particleSystem.fromScreen(s)
              dragged.node.p = p
            }

            return false
          },

          dropped: function (e) {
            if (dragged === null || dragged.node === undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            dragged = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            _mouseP = null
            return false
          }
        }

        // start listening
        $(canvas).mousedown(handler.clicked);

      },

    }
    return that
  }

  $(document).ready(function () {
    var sys = arbor.ParticleSystem(0, 0, 0) // create the system with sensible repulsion/stiffness/friction
    sys.parameters({ gravity: false }) // use center-gravity to make the graph settle nicely (ymmv)
    sys.renderer = Renderer("#viewport") // our newly created renderer will have its .init() method called shortly by sys...

    // add some nodes to the graph and watch it go...
    sys.addEdge('a', 'b')
    sys.addEdge('a', 'c')
    sys.addEdge('a', 'd')
    sys.addEdge('a', 'e')
    sys.addNode('f', { alone: true, mass: 12.25 })
    sys.addEdge('wtf', 'balls')
  })

})(this.jQuery)