<template>
  <div class="text-center mt-3">
<!-- FORM FOR USER EDIT -->
    <div class="modal fade" id="editForm" tabindex="-1" role="dialog"
      aria-labelledby="editFormLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editFormLabel">Edit your profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Bio</label>
              <input type="email" class="form-control" v-model="editForm.bio">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success"
              @click="editUser" data-dismiss="modal">Change Profile</button>
          </div>
        </div>
      </div>
    </div>
<!-- PAGE CONTENT -->
    <h5>{{ username }}</h5>
    <p class="text-muted">{{ bio }}</p>
    <div v-if="targetuserIsCurrentUser()">
      <button class="w-100 mt-1 btn btn-primary"
        data-toggle="modal"
        data-target="#editForm">Edit profile</button>
      <button class="w-100 mt-2 btn btn-primary"
        @click="logout">Log out</button>
    </div>
    <div v-else>
      <button class="w-100 mt-2 btn btn-danger" @click="report">Report</button>
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
import HTTP from '@/http'

export default {
  data () {
    return {
      username: '',
      bio: '',
      points: 0,
      contributions: [],
      editForm: {
        bio: ''
      }
    }
  },
  methods: {
    async queryUser () {
      const result = await HTTP.queryUser(this.username)
      if (result === false) {
        this.$snack.success('User was not found')
        this.$emit('popSidePage')
      } else {
        this.editForm.bio = this.bio = result.bio
        this.contributions = result.contributions
        this.points = result.contributionpoints
        if (!this.contributions.length) {
          this.contributions.push('No contributions found')
        }
      }
    },
    setUser (username) {
      this.username = username
      this.queryUser()
    },
    targetuserIsCurrentUser () {
      return this.username === HTTP.getUser()
    },
    logout () {
      HTTP.logout()
      this.$emit('popSidePage')
      this.$emit('sidePageChange', { page: 'UserDigest' })
    },
    async editUser () {
      const data = {
        bio: this.editForm.bio
      }
      const edited = await HTTP.editUser(data)
      if (edited) {
        this.$snack.success('Profile updated!')
        this.bio = data.bio
      } else {
        this.$snack.success('Something went wrong, try again')
      }
    },
    async report () {
      if (!(await HTTP.isLoggedIn())) {
        this.$snack.success('You must be logged in to report someone')
        return
      }
      const reported = await HTTP.reportUser(this.username)
      if (reported) {
        this.$snack.success('User reported')
      } else {
        this.$snack.success('You have already reported this user')
      }
    }
  }
}
</script>
