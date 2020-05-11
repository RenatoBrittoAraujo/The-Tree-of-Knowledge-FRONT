<template>
  <div class="p-2">
<!-- FORMS -->
<!-- FORM FOR REFERENCE -->
    <div>
      <div class="modal fade" id="referenceForm" tabindex="-1" role="dialog" aria-labelledby="referenceFormLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="referenceFormLabel">Add a new reference</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="text-center text-muted bg-light p-1">
                Make sure to read the
                <span data-dismiss="modal"
                  class="link-text"
                  @click="$emit('sidePageChange', { page: 'Rules' } )">rules</span>
                before
              </div>
              <div class="form-group">
                <label>Reference title</label>
                <input type="text" class="form-control" v-model="refForm.title">
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" v-model="refForm.isLink">
                <label class="form-check-label unselectable">Can you provide a link for it?</label>
              </div>
              <div class="form-group mt-1" v-if="refForm.isLink">
                <input type="text" class="form-control" placeholder="https://www.reference.com" v-model="refForm.link">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success"
                @click="addRef" data-dismiss="modal">Add Reference</button>
            </div>
          </div>
        </div>
      </div>
    </div>
<!-- FORM FOR NEW NODE -->
  <div class="modal fade" id="nodeEdgeForm" tabindex="-1" role="dialog"
    aria-labelledby="nodeEdgeFormLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="nodeEdgeFormLabel">Add a new node</h5>
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
            @click="addNodeWithEdge" data-dismiss="modal">Add Node</button>
        </div>
      </div>
    </div>
  </div>
<!-- FORM FOR REFERENCE EDIT -->
    <div>
      <div class="modal fade" id="refEditForm" tabindex="-1" role="dialog" aria-labelledby="refEditFormLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="refEditFormLabel">Edit reference</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="text-center text-muted bg-light p-1">
                Make sure to read the
                <span data-dismiss="modal"
                  class="link-text"
                  @click="$emit('sidePageChange', { page: 'Rules' } )">rules</span>
                before
              </div>
              <div class="form-group">
                <label>Reference title</label>
                <input type="text" class="form-control" v-model="refEditForm.title">
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" v-model="refEditForm.isLink">
                <label class="form-check-label unselectable">Can you provide a link for it?</label>
              </div>
              <div class="form-group mt-1" v-if="refEditForm.isLink">
                <input type="text" class="form-control" placeholder="https://www.reference.com" v-model="refEditForm.link">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary"
                @click="refEdit" data-dismiss="modal">Edit Reference</button>
            </div>
          </div>
        </div>
      </div>
    </div>
<!-- FORM FOR NODE EDIT -->
  <div class="modal fade" id="nodeEditForm" tabindex="-1" role="dialog"
    aria-labelledby="nodeEditFormLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="nodeEditFormLabel">Edit a node</h5>
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
            <label>Node body</label>
            <textarea type="text" rows="5" class="form-control" v-model="nodeEditForm.body">
            </textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"
            @click="editNode" data-dismiss="modal">Edit Node</button>
        </div>
      </div>
    </div>
  </div>
<!-- DELETE CONFIMATION MODAL -->
  <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
    aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Are you sure you want to delete?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger"
            @click="deleteObj" data-dismiss="modal">Delete</button>
          <button type="button" class="btn btn-primary"
            data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
<!-- PAGE CONTENT -->
    <h3 class="text-center mt-1">{{ title }}</h3>
    <h6 class="text-center">Author: <p
      @click="$emit('sidePageChange', { page: 'AccountShow', username: author })"
      class="link-text">
      {{ author }}</p></h6>
    <hr/>
    <p v-if="body.length">
      {{ body }}
    </p>
    <p class="text-muted text-center" v-else>
      No body text
    </p>
    <hr v-if="parent"/>
    <div class="row pl-3 pr-3 text-secondary" v-if="parent">
      <a class="col-12 text-center">
        Votes on edge <i> {{ parent.name }} </i> -> <i> {{ title }}</i>
      </a>
      <font-awesome-icon
        :class="'col-4 mt-2 text-' + (thumb === 1 ? 'success' : 'secondary')"
        size="1x"
        icon="thumbs-up"
        @click="voteNode(1)"/>
      <div class="col-4 text-center mt-1 unselectable">
        {{ getNodeVotes() >= 0 ? '+' + getNodeVotes() : getNodeVotes() }}
      </div>
      <font-awesome-icon
        :class="'col-4 mt-2 text-' + (thumb === -1 ? 'danger' : 'secondary')"
        size="1x"
        icon="thumbs-down"
        @click="voteNode(-1)"/>
    </div>
    <hr/>
    <div class="text-center mt-1">
      <div class="row">
        <h6 class="text-muted text-left col-10">References for {{ title }}</h6>
        <div class="col-2 text-right">
          <font-awesome-icon
            size="1x"
            icon="plus"
            class="text-muted text-right"
            data-toggle="modal" data-target="#referenceForm"/>
        </div>
      </div>
      <ul class="text-left list-group">
        <li v-if="references.length === 0" class="list-group-item text-muted text-center">
            No references found
        </li>
        <li v-for="(reference, index) in references" :key="index" class="list-group-item">
          <a v-if="reference.link" :href="reference.link" target="_blank">
            {{ reference.title }}
          </a>
          <p v-else style="display: inline"> {{ reference.title }} </p>
          <div>
            <font-awesome-icon
              :class="'mt-1 text-' + (reference.thumb === 1 ? 'success' : 'secondary')"
              size="sm"
              icon="thumbs-up"
              @click="voteRef(index, 1)"/>
            <p class="unselectable text-muted mx-2" style="display: inline">
              {{ getRefVotes(index) >= 0 ?
                '+' + getRefVotes(index) : getRefVotes(index) }}
            </p>
            <font-awesome-icon
              :class="'mt-1 text-' + (reference.thumb === -1 ? 'danger' : 'secondary')"
              size="sm"
              icon="thumbs-down"
              @click="voteRef(index, -1)"/>
            · by <p class="link-text"
             @click="$emit('sidePageChange', { page: 'AccountShow', username: reference.author })">
             {{ reference.author }}</p>
            <a v-if="reference.author == getUser()" class="text-muted">
              · <a @click="fillRefEdit(index)"
                data-toggle="modal" data-target="#refEditForm">Edit</a>
              · <a @click="toDelete = { ref: true, id: reference.id }"
                data-toggle="modal" data-target="#deleteModal">Delete</a>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <hr/>
    <div class="col p-0">
      <div class="row mt-1">
        <div class="col-3">
          <button class="col btn btn-primary"
            data-toggle="modal"
            data-target="#nodeEditForm">Edit</button>
        </div>
        <div class="col-9 mt-2">
          Edit the information of this node
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-3">
          <button class="col btn mr-1 btn-primary"
            data-toggle="modal"
            data-target="#nodeEdgeForm">
              Add Node
          </button>
        </div>
        <div class="col-9 mt-2">
          Add a child node to this node
        </div>
      </div>
      <div class="row mt-1" v-if="getUser() == author">
        <div class="col-3">
          <button class="col btn mr-1 btn-danger"
            data-toggle="modal"
            data-target="#deleteModal"
            @click="toDelete = { node: true, id: id }">
              Delete</button>
        </div>
        <div class="col-9 mt-2">
          Deletes this node
        </div>
      </div>
    </div>
    <hr>
    <div class="row px-3 mt-1 mb-3">
      <button class="col btn btn-danger"
        @click="report">Report</button>
    </div>
  </div>
</template>

<script>
import HTTP from '@/http'

export default {
  data () {
    return {
      id: -1,
      thumb: 0,
      votes: 0,
      title: 'EMPTY NODE',
      parent: null,
      body: '',
      author: '',
      references: [],
      refForm: { title: '', isLink: false, link: '' },
      nodeForm: { title: '', body: '' },
      nodeEditForm: { body: '' },
      toDelete: null,
      refEditForm: { id: '', title: '', isLink: false, link: '', index: 0 }
    }
  },
  methods: {
    fillRefEdit (index) {
      this.refEditForm = this.references[index]
      this.refEditForm.index = index
    },
    async refEdit () {
      const data = {
        title: this.refEditForm.title,
        link: this.refEditForm.link
      }
      const edited = await HTTP.editRef(this.refEditForm.id, data)
      if (edited) {
        const ref = this.references[this.refEditForm.index]
        ref.title = this.refEditForm.title
        ref.link = this.refEditForm.link
        ref.isLink = this.refEditForm.isLink
        this.$snack.success('Reference edited')
      } else {
        this.$snack.success('Something went wrong, try again')
      }
    },
    async deleteObj () {
      if (this.toDelete == null) {
        return
      }
      if (this.toDelete.ref) {
        const deleted = await HTTP.deleteRef(this.toDelete.id)
        if (deleted) {
          const newRefs = []
          for (const ref in this.references) {
            if (this.references[ref].id !== this.toDelete.id) {
              newRefs.push(this.references[ref])
            }
          }
          this.references = newRefs
          this.$snack.success('Reference deleted')
        } else {
          this.$snack.success('Something went wrong, try again')
        }
      } else if (this.toDelete.node) {
        const deleted = await HTTP.deleteNode(this.toDelete.id)
        if (deleted) {
          this.$emit('deleteNode', { name: this.title, id: this.id })
          this.$emit('popSidePage')
          this.$snack.success('Node deleted')
        } else {
          this.$snack.success('Something went wrong, try again')
        }
      }
    },
    select (node) {
      this.title = node.name
      this.id = node.id
      this.parent = node.parent === undefined ? null : node.parent
      this.queryNode()
    },
    getUser () {
      return HTTP.getUser()
    },
    async queryNode () {
      const node = await HTTP.getNode(this.id, this.parent ? this.parent.data.id : null)
      if (node) {
        this.body = this.nodeEditForm.body = node.body
        this.votes = node.votes
        this.references = node.refs
        this.author = node.author
        this.thumb = node.thumb
        this.votes -= node.thumb
        for (const ref of this.references) {
          ref.votes -= ref.thumb
        }
      } else {
        this.$snack.success('Node does not exist')
      }
    },
    async report () {
      if (!(await HTTP.isLoggedIn())) {
        this.$snack.success('You must be logged in to report')
        return
      }
      const reported = await HTTP.reportNode(this.id)
      if (reported) {
        this.$snack.success('Node reported')
      } else {
        this.$snack.success('You have already reported this node')
      }
    },
    async voteNode (voteparam) {
      if (!(await HTTP.isLoggedIn())) {
        this.$snack.success('You must be logged in to vote')
        return
      }
      if (voteparam === this.thumb) {
        voteparam = 0
      }
      const voted = await HTTP.voteNode(this.id, this.parent.data.id, voteparam)
      if (voted) {
        this.thumb = voteparam
      } else {
        this.$snack.success('Something went wrong, try again')
      }
    },
    getNodeVotes () {
      return this.thumb + this.votes
    },
    getRefVotes (index) {
      return this.references[index].thumb +
             this.references[index].votes
    },
    async voteRef (index, voteparam) {
      if (!(await HTTP.isLoggedIn())) {
        this.$snack.success('You must be logged in to vote')
        return
      }
      if (voteparam === this.references[index].thumb) {
        voteparam = 0
      }
      const voted = await HTTP.voteRef(this.references[index].id, voteparam)
      if (voted) {
        this.references[index].thumb = voteparam
      } else {
        this.$snack.success('Something went wrong, try again')
      }
    },
    async addRef () {
      if (!(await HTTP.isLoggedIn())) {
        this.$snack.success('You must be logged in to add a reference')
        return
      }
      const data = {
        title: this.refForm.title,
        node: this.id,
        link: this.refForm.isLink ? this.refForm.link : ''
      }
      const added = await HTTP.addRef(data)
      if (added) {
        this.$snack.success('Reference added')
        this.references.push({
          link: this.refForm.isLink ? this.refForm.link : '',
          title: this.refForm.title,
          votes: 0,
          thumb: 0,
          id: added.id,
          author: HTTP.getUser()
        })
        this.refForm.title = ''
        this.refForm.isLink = false
        this.refForm.link = ''
      } else {
        this.$snack.success('Something went wrong, try again')
      }
    },
    async addNodeWithEdge () {
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
        const edgeAdded = await HTTP.addEdge(this.id, created.id)
        if (typeof (edgeAdded) !== 'string') {
          this.$emit('newNode', { from: this.title, node: created })
          this.$snack.success('Node created')
        } else {
          this.$snack.success(edgeAdded)
        }
      } else {
        this.$snack.success('Node ' + data.name + ' already exists')
      }
    },
    async editNode () {
      if (!(await HTTP.isLoggedIn())) {
        this.$snack.success('You must be logged in to edit a node')
        return
      }
      const data = {
        body: this.nodeEditForm.body
      }
      const edited = await HTTP.editNode(this.id, data)
      if (edited) {
        this.$snack.success('Node edited')
        this.body = this.nodeEditForm.body
      } else {
        this.$snack.success('Something went wrong, try again')
      }
    }
  }
}
</script>

<style>
.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
