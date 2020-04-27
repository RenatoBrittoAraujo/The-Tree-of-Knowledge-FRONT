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
<!-- PAGE CONTENT -->
    <h3 class="text-center mt-1">{{ title }}</h3>
    <h6 class="text-center">Author: <a href="#"
      @click="$emit('sidePageChange', { page: 'UserDigest', username: author })">
      {{ author }}</a></h6>
    <hr/>
    <p>{{ body }}</p>
    <hr/>
    <div class="row pl-3 pr-3 text-secondary">
      <font-awesome-icon
        :class="'col-4 mt-2 text-' + (thumb === 1 ? 'success' : 'secondary')"
        size="1x"
        icon="thumbs-up"
        @click="thumbsUp"/>
      <div class="col-4 text-center mt-1 unselectable">
        {{ votes >= 0 ? '+' + votes : votes }}
      </div>
      <font-awesome-icon
        :class="'col-4 mt-2 text-' + (thumb === -1 ? 'danger' : 'secondary')"
        size="1x"
        icon="thumbs-down"
        @click="thumbsDown"/>
    </div>
    <hr/>
    <div class="text-center mt-1">
      <div class="row">
        <h6 class="text-muted text-left col-10">References for {{ title }}</h6>
        <div class="col-2">
          <font-awesome-icon
            size="1x"
            icon="plus"
            class="text-muted text-right"
            data-toggle="modal" data-target="#referenceForm"/>
        </div>
      </div>
      <ul class="text-left list-group">
        <li v-for="(reference, index) in references" :key="index" class="list-group-item">
          <a v-if="reference.link" :href="reference.link">
            {{ reference.title }}
          </a>
          <p v-else style="display: inline"> {{ reference.title }} </p>
          <div>
            <font-awesome-icon
              :class="'mt-1 text-' + (reference.thumb === 1 ? 'success' : 'secondary')"
              size="sm"
              icon="thumbs-up"
              @click="refThumbsUp(index)"/>
            <p class="unselectable text-muted mx-2" style="display: inline">
              {{ reference.votes >= 0 ? '+' + reference.votes : reference.votes }}
            </p>
            <font-awesome-icon
              :class="'mt-1 text-' + (reference.thumb === -1 ? 'danger' : 'secondary')"
              size="sm"
              icon="thumbs-down"
              @click="refThumbsDown(index)"/>
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
          <button class="col btn btn-primary">Edit</button>
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
    <div class="row px-5 mt-1 mb-3">
      <button class="col btn btn-danger">Report</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      thumb: 0,
      votes: 23,
      title: 'Discrete Mathematics',
      body: 'random body text',
      author: 'cleber',
      references: [
        { link: '/', title: 'Link', votes: 35, thumb: 0, author: 'cleber' },
        { link: false, title: 'Book', votes: 7, thumb: 0, author: 'vitin' },
        { link: false, title: 'Scientific paper', votes: -13, thumb: 0, author: '69pedrao' }
      ],
      refForm: { title: 'adawaad', isLink: false, link: '' },
      nodeForm: { title: '', body: '' }
    }
  },
  methods: {
    select (name) {
      this.title = name
      this.query(name)
    },
    query (name) {},
    report () {},
    thumbsUp () {
      if (this.thumb === 1) {
        this.votes--
        this.thumb = 0
      } else {
        this.votes += 1 - this.thumb
        this.thumb = 1
      }
    },
    thumbsDown () {
      if (this.thumb === -1) {
        this.thumb = 0
        this.votes++
      } else {
        this.votes -= 1 + this.thumb
        this.thumb = -1
      }
    },
    refThumbsUp (index) {
      if (this.references[index].thumb === 1) {
        this.references[index].votes--
        this.references[index].thumb = 0
      } else {
        this.references[index].votes += 1 - this.references[index].thumb
        this.references[index].thumb = 1
      }
    },
    refThumbsDown (index) {
      if (this.references[index].thumb === -1) {
        this.references[index].thumb = 0
        this.references[index].votes++
      } else {
        this.references[index].votes -= 1 + this.references[index].thumb
        this.references[index].thumb = -1
      }
    },
    addRef () {
      console.log('new ref. title:', this.refForm.title, 'is link?:', this.refForm.isLink, 'link:', this.refForm.link)
      this.references.push({ link: this.refForm.isLink ? this.refForm.link : '', title: this.refForm.title, votes: 0, thumb: 0 })
    },
    addNode () {
      console.log('new node. title:', this.nodeForm.title, 'body:', this.nodeForm.body)
      this.$emit('newNode', { from: this.title, name: this.nodeForm.title })
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
