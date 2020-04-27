<template>
  <div class="text-center mt-3">
    <h5>{{ username }}</h5>
    <p class="text-muted">{{ bio }}</p>
    <div v-if="targetuserIsCurrentUser()">
      <button class="w-100 mt-1 btn btn-primary">Edit profile</button>
      <button class="w-100 mt-2 btn btn-primary"
        @click="logout">Log out</button>
    </div>
    <div v-else>
      <button class="w-100 mt-2 btn btn-danger">Report</button>
    </div>
    <div class="text-center mt-3">
      <p class="">Contribution points: {{ points }}</p>
      <p>Contributions:</p>
      <ul class="text-left list-group">
        <li v-for="contribution in contributions" :key="contribution" class="list-group-item">
          {{ contribution }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      bio: 'Software engineer at Google, 10 years programming experience',
      points: 32,
      contributions: [
        'Create node "fuck balls"',
        'Add reference "suck my balls" to "math"',
        'Create node "math"'
      ]
    }
  },
  methods: {
    queryUser () {
      console.log('queryUsername', this.username)
    },
    setUser (username) {
      this.username = username
      this.queryUser()
    },
    targetuserIsCurrentUser () {
      return this.username === 'cleber'
    }
  }
}
</script>
