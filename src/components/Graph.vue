<template>
  <div class="graph-area">
<!-- FORM FOR NEW NODE -->
    <div class="modal fade" id="nodeForm" tabindex="-1" role="dialog"
      aria-labelledby="nodeFormLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="nodeFormLabel">Add a new node</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-center text-muted bg-light p-1">
              Make sure to read the
              <span data-dismiss="modal"
                class="link-text"
                @click="$emit('sidePageChange', { page: 'Rules' } )"> rules </span>
              before
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Node title</label>
              <input type="email" class="form-control" v-model="nodeForm.title">
            </div>
            <div class="form-group">
              <label>Node body</label>
              <textarea type="text" rows="5" class="form-control" v-model="nodeForm.body">
              </textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success"
              @click="addNode" data-dismiss="modal">Add Node</button>
          </div>
        </div>
      </div>
    </div>
<!-- PAGE CONTENT -->
    <div class="spinner-positioning spinner-border" v-if="$store.state.loading"/>
    <div class="float-bar col">
      <div class="row">
        <button class="btn btn-primary"
          @click="cleanEdgeCreate(!edgeCreate)">Link two nodes</button>
        <button class="btn btn-primary ml-1"
          data-toggle="modal"
          data-target="#nodeForm">
          Add node
        </button>
      </div>
      <div class="row mt-2 p-2 float-bar w-100 border rounded" v-if="edgeCreate">
        <p class="col unselectable">
          {{ edgeCreateInstruction }}
        </p>
        <div class="col" v-if="edgeCreateChild && edgeCreateParent">
          <button class="btn btn-primary ml-2"
            @click="createEdge()">Create</button>
          <button class="btn btn-primary ml-2"
            @click="cleanEdgeCreate(false)">Cancel</button>
        </div>
      </div>
    </div>
    <canvas id="viewport"></canvas>
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
      canvas: null,
      edgeCreate: false,
      edgeCreateInstruction: 'Select parent node',
      edgeCreateParent: null,
      edgeCreateChild: null,
      nodeForm: { title: '', body: '' }
    }
  },
  mounted () {
    this.runGraph()
    // setInterval(() => { this.$store.state.loading = true }, 1000)
  },
  methods: {
    async addNode () {
      if (!(await HTTP.isLoggedIn())) {
        this.$snack.success('You must be logged in to add a node')
        return
      }
      const data = {
        name: this.nodeForm.title,
        body: this.nodeForm.body
      }
      if (data.name < 4) {
        this.$snack.success('Node name is too short')
        return
      }
      const created = await HTTP.addNode(data)
      if (created) {
        this.canvas.addNode(created)
        this.$snack.success('Node created')
        this.nodeForm.title = ''
        this.nodeForm.body = ''
      } else {
        this.$snack.success('Node ' + data.name + ' already exists')
      }
    },
    async edgeCreator (obj) {
      if (!this.edgeCreate) {
        return
      }
      if (this.edgeCreateParent === null) {
        this.edgeCreateParent = obj
        this.edgeCreateInstruction = 'Parent node: ' + obj.name + ' | Select child node:'
      } else if (this.edgeCreateChild === null && obj.name !== this.edgeCreateParent.name) {
        this.edgeCreateChild = obj
        this.edgeCreateInstruction = 'Create edge ' + this.edgeCreateParent.name + ' -> ' + this.edgeCreateChild.name + '?'
      }
    },
    cleanEdgeCreate (arg) {
      this.edgeCreateParent = null
      this.edgeCreateChild = null
      this.edgeCreate = arg
      this.edgeCreateInstruction = 'Select parent node (from the graph or the search bar)'
    },
    async createEdge () {
      if (!(await HTTP.isLoggedIn())) {
        this.$snack.success('You must be logged in to create edge')
        return
      }
      const result = await HTTP.addEdge(
        this.edgeCreateParent.id,
        this.edgeCreateChild.id
      )
      if (!result.data) {
        this.$snack.success('Edge created')
        this.canvas.addNode(this.edgeCreateChild, this.edgeCreateParent)
      } else {
        this.$snack.success(result.data)
      }
      this.cleanEdgeCreate(false)
    },
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
    NDselect (obj) {
      this.$emit('select', obj)
      this.edgeCreator(obj)
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
      if (this.edgeCreate) {
        this.edgeCreator(node)
        return
      }
      if (node === null) {
        node = await HTTP.getRandomNode()
      }
      this.canvas.init(node)
    },
    setLoading (arg) {
      console.log('setLoading', arg)
      this.loading = arg
    }
  }
}
</script>

<style>
.float-bar {
  display: absolute;
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
}
.spinner-positioning {
  display: absolute;
  position: absolute;
  right: 7px;
  top: 13px;
}
.graph-area {
  display: relative;
}
</style>
