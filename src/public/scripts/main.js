/* eslint-disable */
export default function ($, canvasID, methods) {

  // Params for graph rendering
  var Globals = {
    // Globals params
    backgroundColor: "white",

    // Edge params
    edgeThickness: 2,
    edgeBeginColor: "rgba(0,0,0, .8)",
    edgeEndColor: "rgba(220,220,220, .8)",

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
        particleSystem = system
        let resizer = this.resize
        resizer()
        $(window)
          .resize(() => {
            resizer()
          })
        particleSystem.screenPadding(80)
        that.initMouseHandling()
      },
      redraw: function () {
        ctx.fillStyle = Globals.backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        let dist = (p1, p2) => {
          return Math.hypot(p1.x - p2.x, p1.y - p2.y)
        }

        particleSystem.eachEdge(function (edge, pt1, pt2) {
          // Edge rendering
          let edgeGradient = 
            ctx.createLinearGradient(pt1.x, pt1.y, pt2.x, pt2.y)
          edgeGradient.addColorStop("0", Globals.edgeBeginColor);
          edgeGradient.addColorStop("1.0", Globals.edgeEndColor);
          ctx.strokeStyle = edgeGradient
          ctx.lineWidth = Globals.edgeThickness
          ctx.beginPath()
          ctx.moveTo(pt1.x, pt1.y)
          ctx.lineTo(pt2.x, pt2.y)
          ctx.stroke()
        })

        particleSystem.eachNode(function (node, pt) {
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
        var _mouseP = null;

        // set up a handler object that will initially listen for mousedowns then
        // for moves and mouseups while dragging
        var handler = {
          clicked: function (e) {
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
            dragged = particleSystem.nearest(_mouseP);
            
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
      resize: () => {
        let width = $('#graph').innerWidth()
        let height = $('#graph').innerHeight()
        canvas.width = width;
        canvas.height = height;
        particleSystem.screenSize(width, height)
      }
    }
    return that
  }

  var sys

  var increaseFontSize = () => { Globals.textSize++ }

  var init = () => {
    sys = arbor.ParticleSystem(30, 0, 0) // create the system with sensible repulsion/stiffness/friction
    sys.parameters({ gravity: true }) // use center-gravity to make the graph settle nicely (ymmv)
    sys.renderer = Renderer("#" + canvasID) // our newly created renderer will have its .init() method called shortly by sys...

    // add some nodes to the graph and watch it go...
    sys.addEdge('a', 'b')
  
  }

  var addNode = () => {
    sys.addEdge('a', Math.random().toFixed(2))
  }

  return {
    init,
    increaseFontSize,
    addNode
  }
}