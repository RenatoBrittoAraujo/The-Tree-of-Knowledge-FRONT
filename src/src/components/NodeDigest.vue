<template>
  <div class="p-2">
    <h3 class="text-center mt-1">{{ title }}</h3>
    <hr/>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <hr/>
    <div class="row pl-3 pr-3 text-secondary">
      <font-awesome-icon
        :class="'col-4 mt-2 text-' + (thumb === 1 ? 'success' : 'secondary')"
        size="md"
        icon="thumbs-up"
        @click="thumbsUp"/>
      <div class="col-4 text-center mt-1 unselectable">
        {{ votes >= 0 ? '+' + votes : votes }}
      </div>
      <font-awesome-icon
        :class="'col-4 mt-2 text-' + (thumb === -1 ? 'danger' : 'secondary')"
        size="md"
        icon="thumbs-down"
        @click="thumbsDown"/>
    </div>
    <hr/>
    <div class="text-center mt-1">
      <h6 class="text-muted">References for {{ title }}</h6>
      <ul class="text-left list-group">
        <li v-for="font in fonts" :key="font.title" class="list-group-item">
          <a v-if="font.link" :href="font.link">
            {{ font.title }}
          </a>
          <p v-else style="display: inline"> {{ font.title }} </p>
          <div>
            <font-awesome-icon
              :class="'mt-1 text-' + (thumb === 1 ? 'success' : 'secondary')"
              size="sm"
              icon="thumbs-up"
              @click="thumbsUp"/>
            <p class="unselectable text-muted mx-2" style="display: inline">
              {{ font.votes >= 0 ? '+' + font.votes : font.votes }}
            </p>
            <font-awesome-icon
              :class="'mt-1 text-' + (thumb === -1 ? 'danger' : 'secondary')"
              size="sm"
              icon="thumbs-down"
              @click="thumbsDown"/>
          </div>
        </li>
      </ul>
    </div>
    <hr/>
    <div class="col">
      <div class="row mt-1">
        <div class="col-3">
          <button class="col mr-1 btn btn-primary">Open</button>
        </div>
        <div class="col-9 mt-2">
          Open the children of this node
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-3">
          <button class="col mr-1 btn btn-primary">Connect</button>
        </div>
        <div class="col-9 mt-2">
          Connect this node with another node
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-3">
          <button class="col btn btn-primary">Edit</button>
        </div>
        <div class="col-9 mt-2">
          Edit the information inside this node
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-3">
          <button class="col btn mr-1 btn-primary">Add Topic</button>
        </div>
        <div class="col-9 mt-2">
          Add a child node to this node
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-3">
          <button class="col btn btn-primary" @click="$emit('createNewNode')">
           Add random
          </button>
        </div>
        <div class="col-9 mt-2">
          Adds a random node to this
        </div>
      </div>
    </div>
    <hr>
    <div class="row px-5 mt-1">
      <button class="col btn btn-danger">Report this node</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
      thumb: 0,
      votes: 23,
      title: 'Discrete Mathematics',
      body: '',
      fonts: [
        { link: '/', title: 'Link', votes: 35 },
        { link: false, title: 'Book', votes: 7 },
        { link: false, title: 'Scientific paper', votes: -13 }
      ]
    }
  },
  methods: {
    select (name) {
      this.title = name
    },
    query (id) {},
    report () {},
    popPage () {},
    addPage (obj) {},
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
