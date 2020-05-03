/* eslint-disable */

/* When imported, this functions handles the graph visualization 
  in a given window canvas, parameters are:
  $: widown jquery reference
  canvasID: the literal id of the html canvas element
  methods: reference to the methods of the vue component holding the canvas */
export default function ($, canvasID, methods) {
  // Params for graph rendering
  var Globals = {
    // Globals canvas params
    backgroundColor: "white",
    screenPadding: 80,

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
    expandedColor: "#FF4500",
    notexpandedColor: "#992300",
    textColor: "white"
  }

  var hiddenNode = 'hiddenNode69420pleasedontcrash'
/* WARNING: for some reason, arbor crashed when you try
     to add a new node later if in this init function you
     only declare one single node. I have no ideia why,
     I tried fixing this and gave up after 2 whole days
     on this issue. The best solution is to just create
     a hidden node and set the renderer to node even
     consider it when redering. As long as nobody uses
     that ridiculous name, rendering is safe */

  var Renderer = function (canvas) {
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    var particleSystem
    
    var selected = null
    var selectNode = function (newSelected) {
      if (selected && selected.node.name == newSelected.node.name) {
        selected.node.addData('selected', false)
        selected = null
        methods.NDunselect()
        return
      }
      if (selected) {
        selected.node.addData('selected', false)
      }
      selected = newSelected
      selected.node.addData('selected', true)
      methods.NDselect({ name: selected.node.name, id: selected.node.getData('id') })
    }
    
    /* Returned as rendering object */
    
    var that = {
      select: function (newSelected) {
        that.unselect()
        if (particleSystem.getNode(newSelected)) {
          particleSystem.getNode(newSelected)
              .addData('selected', true)
          selected = { node: particleSystem.getNode(newSelected) }
        }
        that.redraw()
      },
      unselect: function () {
        if (selected) {
          selected.node.addData('selected', false)
          selected = null
        }
        that.redraw()
      },
      /* Initializer rendering */
      init: function (system) {
        particleSystem = system
        let resizer = this.resize
        resizer()
        $(window)
          .resize(() => {
            resizer()
          })
        particleSystem.screenPadding(Globals.screenPadding)
        that.initMouseHandling()
      },
      /* Called many times to re-render the entire canvas */
      redraw: function () {
        ctx.fillStyle = Globals.backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        let dist = (p1, p2) => {
          return Math.hypot(p1.x - p2.x, p1.y - p2.y)
        }

        particleSystem.eachEdge(function (edge, pt1, pt2) {
          if (edge.source.name != hiddenNode || edge.target.name != hiddenNode) {
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
          }
        })

        particleSystem.eachNode(function (node, pt) {
          if (!node.data.hidden) {
            // Node text
            let text = '   ' + node.name
            let textParams = Globals.textSize + "px " + Globals.textFont
            
            // Node rendering
            let textWidth = ctx.measureText(text).width
            let shape = {
              x: pt.x - textWidth / 2.0 - Globals.horizontalPadding,
              y: pt.y - Globals.textSize / 2.0 - Globals.verticalPadding,
              w: textWidth + 2.0 * Globals.horizontalPadding,
              h: Globals.textSize + 2.0 * Globals.verticalPadding
            }

            let radius = Globals.verticalPadding + Globals.textSize / 2.0
            let cy = shape.y + Globals.verticalPadding + Globals.textSize / 2.0
            let firstCX = shape.x + radius
            let secondCX = shape.x + shape.w - radius

            ctx.beginPath()
            ctx.fillStyle = (node.getData('expanded')) ?
              Globals.expandedColor : Globals.notexpandedColor
            // Left circle
            ctx.arc(firstCX, cy, radius, 0, 2.0 * Math.PI);
            ctx.fill()
            
            ctx.beginPath()
            ctx.fillStyle = (node.getData('selected')) ? 
              Globals.activeColor : Globals.inactiveColor
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
          }
        })
      },
      /* Initializes mouse handling funcionalities */
      initMouseHandling: function () {
        var dragged = null;
        var _mouseP = null;
        var moved = false;

        /* This function kills all node's children, grandchildren and so on */
        var childMurder = function (node) {
          let edges = particleSystem.getEdgesFrom(node)
          for (let edge of edges) {
            let targetNode = edge.target
            childMurder(targetNode)
            particleSystem.pruneNode(targetNode)
          } 
        } 

        var handler = {
          clicked: function (e) {
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
            dragged = particleSystem.nearest(_mouseP);
            if (dragged && dragged.node !== null) {
              if (dragged.node.name == hiddenNode) {
                return
              }
              dragged.node.fixed = true
            }
            moved = false
            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)
            return false
          },
          doubleclick: function (e) {
            var pos = $(canvas).offset();
            var _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
            var particle = particleSystem.nearest(_mouseP);
            if (particle && particle.node !== null) {
              if (particle.node.name == hiddenNode) {
                return
              }
              if (particleSystem.getNode(particle.node.name)
                .getData('expanded')) {
                childMurder(particleSystem.getNode(particle.node.name))
                particleSystem.getNode(particle.node.name)
                  .addData('expanded', null)
              } else {
                methods.queryNode(particle.node)
                particleSystem.getNode(particle.node.name)
                  .addData('expanded', true)
              }
            }
            return false
          },
          dragged: function (e) {
            moved = true
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
            if (!moved) {
              selectNode(dragged)
            } else {
              moved = false
            }
            dragged.node.tempMass = 1000
            dragged = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            _mouseP = null
            return false
          }
        }

        $(canvas).mousedown(handler.clicked)
        $(canvas).dblclick(handler.doubleclick)
      },
      /* Resizes renderer to canvas size */
      resize: () => {
        let width = $('#graph').innerWidth()
        let height = $('#graph').innerHeight()
        canvas.width = width;
        canvas.height = height;
        particleSystem.screenSize(width, height)
        that.redraw()
      }
    }
    return that
  }

  var sys

  var init = (node) => {
    if (sys) {
      delete sys.renderer
    }
    sys = arbor.ParticleSystem(1, 0, 0)
    sys.parameters({ gravity: true })
    sys.renderer = Renderer("#" + canvasID)

    // node.name = 'node name'
    // node.id = 1
    sys.addNode(node.name || 'emptyNode')
    sys.getNode(node.name || 'emptyNode').addData('id', node.id)
    sys.addNode(hiddenNode, { hidden: true })
    /* WARNING: for some reason, arbor crashed when you try
       to add a new node later if in this init function you
       only declare one single node. I have no ideia why,
       I tried fixing this and gave up after 2 whole days
       on this issue. The best solution is to just create 
       a hidden node and set the renderer to node even
       consider it when redering. As long as nobody uses
       that ridiculous name, rendering is safe */
  }

  var addNode = (node, from) => {
    sys.addNode(node.name)
    sys.getNode(node.name).addData('id', node.id)
    if (from) {
      sys.addEdge(from, node.name)
    }
  }

  var unselect = () => {
    sys.renderer.unselect()
  }

  var select = (name) => {
    sys.renderer.select(name)
  }

  /* These are functions accessible from the vue component Graph,
     they are used to communicate with the canvas */
  return {
    init,
    addNode,
    unselect,
    select
  }
}