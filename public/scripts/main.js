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
    screenPadding: 20,

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
        return
      }
      if (selected) {
        selected.node.addData('selected', false)
      }
      selected = newSelected
      selected.node.addData('selected', true)
      let nodeData = { 
        name: selected.node.name, 
        id: selected.node.getData('id') 
      }
      if (selected.node.getData('parent')) {
        nodeData.parent = selected.node.getData('parent')
      }
      methods.NDselect(nodeData)
    }
    
    /* Returned as rendering object */
    var that = {
      deleteAll: function () {
        particleSystem.eachNode(function (node, pt) {
          particleSystem.pruneNode(node)
        })
        particleSystem.eachEdge(function (edge, pt1, pt2) {
          particleSystem.pruneEdge(edge)
        })
      },
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
          .resize(() => resizer())
        $(canvas)
          .resize(() => resizer())
        $('.collapse')
          .on('shown.bs.collapse', () => resizer())
        $('.collapse')
          .on('hidden.bs.collapse', () => resizer())
        particleSystem.screenPadding(Globals.screenPadding)
        that.initMouseHandling()
        canvas.width = canvas.width * 2.0;
        canvas.height = canvas.height * 2.0;
      },
      /* Called many times to re-render the entire canvas */
      redraw: function () {
        ctx.fillStyle = Globals.backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

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
              
            // If child, render the close button in it's side
            let isChild = particleSystem.getEdgesFrom(node).length == 0
            if (isChild) {
              let closeBtn = {
                x: secondCX + 18, 
                y: cy - 13,
                radius: 7
              }
              ctx.fillStyle = 'rgb(200,0,0)'
              ctx.beginPath()
              ctx.arc(closeBtn.x, closeBtn.y, closeBtn.radius, 0, 2.0 * Math.PI);
              ctx.fill()
              node.addData('closeNode', closeBtn)
            } else {
              node.addData('closeNode', null)
            }
          }
        })
      },
      /* Initializes mouse handling funcionalities */
      initMouseHandling: function () {
        var dragged = null;
        var _mouseP = null;
        var moved = false;
        var tapStart = false;
        var doubleTapTime = 1000; // milliseconds
        var lastClickedNode = null;

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
          clicked: async function (e) {
            var pos = $(canvas).offset();
            if (e.type === 'touchstart') {
              _mouseP = arbor.Point(e.targetTouches[0].pageX - pos.left, e.targetTouches[0].pageY - pos.top)
            } else {
              _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
            }
            // Check for closing a node
            let foundNode = await particleSystem.closeButton(_mouseP)
            if (foundNode) {
              childMurder(foundNode)
              particleSystem.pruneNode(foundNode)
              return false
            }
            // Check for selected or dragging of a node
            dragged = particleSystem.nearest(_mouseP);
            if (tapStart && e.type == 'touchstart' &&
                dragged.node !== null && lastClickedNode == dragged.node) {
              handler.doubleclick(e)
              tapStart = false
              return
            }
            if (dragged && dragged.node !== null) {              
              lastClickedNode = dragged.node
            }
            if (dragged && dragged.node !== null) {
              if (dragged.node.name == hiddenNode) {
                return
              }
              dragged.node.fixed = true
            }
            moved = false
            if (e.type === 'touchstart') {
              $(canvas).bind('touchmove', handler.dragged)
              $(window).bind('touchend', handler.dropped)
              tapStart = true
              setTimeout(() => { tapStart = false; }, doubleTapTime)
            } else {
              $(canvas).bind('mousemove', handler.dragged)
              $(window).bind('mouseup', handler.dropped)
            }
            return false
          },
          doubleclick: function (e) {
            if (e.type == 'touchstart') {
              $(canvas).unbind('dblclick', handler.doubleclick)
            }
            var pos = $(canvas).offset();
            if (e.type === 'touchstart') {
              _mouseP = arbor.Point(e.targetTouches[0].pageX - pos.left, e.targetTouches[0].pageY - pos.top)
            } else {
              _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
            }
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
            var s
            if (e.type === 'touchmove') {
              s = arbor.Point(e.targetTouches[0].pageX - pos.left, e.targetTouches[0].pageY - pos.top)
            } else {
              s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
            }
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
            if (e.type == 'touchend') {
              $(canvas).unbind('touchmove', handler.dragged)
              $(window).unbind('touchend', handler.dropped)
            } else {
              $(canvas).unbind('mousemove', handler.dragged)
              $(window).unbind('mouseup', handler.dropped)
            }
            _mouseP = null
            return false
          }
        }

        $(canvas).bind('touchstart', handler.clicked)
        $(canvas).bind('mousedown', handler.clicked)
        $(canvas).bind('dblclick', handler.doubleclick)
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
      sys.renderer.deleteAll()
      delete sys.renderer
    }
    sys = arbor.ParticleSystem(1, 100, 300)
    sys.parameters({ gravity: true })
    sys.renderer = Renderer("#" + canvasID)

    sys.addNode(node.name || 'emptyNode', { x: 0, y: 0, mass: 1 } )
    sys.getNode(node.name || 'emptyNode').addData('id', node.id)
    sys.addNode(hiddenNode, { hidden: true, x: 0, y: 0, mass: 1})
    sys.addNode(hiddenNode, { hidden: true, x: 0, y: 0, mass: 1 })
    /* WARNING: for some reason, arbor crashed when you try
       to add a new node later if in this init function you
       only declare one single node. I have no ideia why,
       I tried fixing this and gave up after 2 whole days
       on this issue. The best solution is to just create 
       a hidden node and set the renderer to not even
       consider it when redering. As long as nobody uses
       that ridiculous name, rendering is safe */
  }

  var createNode = (obj) => {
    sys.addNode(obj.name)
    sys.getNode(obj.name).addData('id', obj.id)
  }

  var addNode = (node, from = null) => {
    createNode(node)
    if (from != null && from != undefined) {
      if (sys.getNode(from) === undefined) {
        createNode(from)
        from = from.name
      }
      sys.addEdge(from, node.name)
      sys.getNode(node.name)
        .addData('parent', sys.getNode(from))
    }
  }

  var unselect = () => {
    sys.renderer.unselect()
  }

  var select = (name) => {
    sys.renderer.select(name)
  }

  var deleteNodeRecursion = (node) => {
    let edges = sys.getEdgesFrom(node)
    for (let edge of edges) {
      let targetNode = edge.target
      deleteNodeRecursion(targetNode)
    }
    sys.pruneNode(node)
  }
  
  var deleteNode = function (node) {
    const name = node.name
    deleteNodeRecursion(name)
  }

  var deleteEdge = function (edge) {
    sys.pruneEdge(sys.getEdges(edge.parent, edge.child)[0])
  }

  /* These are functions accessible from the vue component Graph,
     they are used to communicate with the canvas */
  return {
    init,
    addNode,
    unselect,
    select,
    deleteNode,
    deleteEdge
  }
}