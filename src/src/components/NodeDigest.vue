<template>
  <div class="p-2">
<!-- FORMS -->
    <div>
<!-- FORM FOR REFERENCE -->
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
                <a href="#rules" data-dismiss="modal"
                  @click="$emit('sidePageChange', { page: 'Rules' } )">rules</a>
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
            <a href="#rules" data-dismiss="modal"
              @click="$emit('sidePageChange', { page: 'Rules' } )"> rules </a>
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
            <a href="#rules" data-dismiss="modal"
              @click="$emit('sidePageChange', { page: 'Rules' } )"> rules </a>
            before
          </div>
          <div class="form-group">
            <label>Node body</label>
            <textarea type="text" rows="5" class="form-control" v-model="nodeEditForm.body">
            </textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success"
            @click="editNode" data-dismiss="modal">Edit Node</button>
        </div>
      </div>
    </div>
  </div>
<!-- PAGE CONTENT -->
    <h3 class="text-center mt-1">{{ title }}</h3>
    <h6 class="text-center">Author: <a href="#"
      @click="$emit('sidePageChange', { page: 'AccountShow', username: author })">
      {{ author }}</a></h6>
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
            · by <a :href="'#'+reference.author"
             @click="$emit('sidePageChange', { page: 'AccountShow', username: reference.author })">
             {{ reference.author }} </a>
          </div>
        </li>
      </ul>
    </div>
    <hr/>
    <div class="col">
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
            data-target="#nodeForm">
              Add Node
          </button>
        </div>
        <div class="col-9 mt-2">
          Add a child node to this node
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
      votes: 69420,
      title: 'EMPTY NODE',
      parent: null,
      body: 'THIS NODE SHOULD NOT EXIST!',
      author: 'cleber',
      references: [
        { link: '', title: 'TAKE CARE OF THIS!', votes: 35, thumb: 0, author: 'satan' }
      ],
      refForm: { title: 'adawaad', isLink: false, link: '' },
      nodeForm: { title: '', body: '' },
      nodeEditForm: { body: '' }
    }
  },
  methods: {
    select (node) {
      this.title = node.name
      this.id = node.id
      this.parent = node.parent === undefined ? null : node.parent
      this.queryNode()
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
        const addedEdge = await HTTP.addEdge(this.id, created.id)
        if (addedEdge) {
          this.$emit('newNode', { from: this.title, node: created })
          this.$snack.success('Node created')
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
        this.$snack.success('Node edited!')
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
