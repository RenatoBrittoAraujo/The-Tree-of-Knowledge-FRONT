<template>
  <div id="app" class="container-app">
    <Header v-on:sidePageChange="sidePageChange"
      class="row"/>
    <div class="row section">
      <Graph class="col-7 graph" id="graph" ref="graph"
        v-on:select="select"/>
      <div class="wrapper col-5 bg-light border">
        <div
            @click="Gunselect"
            v-if="sideBarQueue.length > 1">
          <font-awesome-icon
            class="mt-3 ml-2" icon="arrow-left" size="1x"/>
        </div>
        <NodeDigest v-if="topPage() == 'NodeDigest'"
          ref="nd"
          v-on:createNewNode="createNewNode"
          v-on:sidePageChange="sidePageChange"
          v-on:newNode="newNode"/>
        <About v-else-if="topPage() == 'About'"/>
        <Rules v-else-if="topPage() == 'Rules'"/>
        <HelpDigest v-else-if="topPage() == 'HelpDigest'"
          v-on:sidePageChange="sidePageChange"/>
        <UserDigest v-else-if="topPage() == 'UserDigest'"
          v-on:sidePageChange="sidePageChange"
          v-on:popSidePage="popSidePage"/>
        <AccountShow v-else-if="topPage() == 'AccountShow'" ref="accountshow"
          v-on:popSidePage="popSidePage"/>
        <Register v-else-if="topPage() == 'Register'"
          v-on:sidePageChange="sidePageChange"/>
        <Login v-else-if="topPage() == 'Login'"
          v-on:popSidePage="popSidePage"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Graph from '@/components/Graph'
import NodeDigest from '@/components/NodeDigest'
import About from '@/components/staticPages/About'
import Rules from '@/components/staticPages/Rules'
import HelpDigest from '@/components/staticPages/HelpDigest'
import UserDigest from '@/components/users/UserDigest'
import AccountShow from '@/components/users/AccountShow'
import Register from '@/components/users/Register'
import Login from '@/components/users/Login'

import HTTP from '@/http'

export default {
  components: {
    Header,
    Graph,
    NodeDigest,
    About,
    Rules,
    HelpDigest,
    UserDigest,
    AccountShow,
    Login,
    Register
  },
  methods: {
    createNewNode () {
      this.$refs.graph.selectRandomNode()
    },
    async sidePageChange (pageObj) {
      if (this.topPage() === 'NodeDigest' &&
          pageObj.page !== 'NodeDigest') {
        this.$refs.graph.unselect()
      }
      await this.sideBarQueue.push(pageObj)
      if (this.topPage() === 'AccountShow') {
        this.$refs.accountshow.setUser(this.getTopPage().username)
      }
    },
    async popSidePage () {
      await this.sideBarQueue.pop()
    },
    topPage () {
      return this.sideBarQueue[this.sideBarQueue.length - 1].page
    },
    getTopPage () {
      return this.sideBarQueue[this.sideBarQueue.length - 1]
    },
    async Gunselect () {
      await this.sideBarQueue.pop()
      if (this.topPage() !== 'NodeDigest') {
        this.$refs.graph.unselect()
      }
      if (this.topPage() === 'NodeDigest') {
        const name = this.sideBarQueue[this.sideBarQueue.length - 1].name
        this.$refs.nd.select(name)
        this.$refs.graph.select(name)
      }
    },
    async select (name) {
      await this.sideBarQueue.push({ page: 'NodeDigest', name: name })
      this.$refs.nd.select(name)
    },
    newNode (obj) {
      this.$refs.graph.newNode(obj)
    }
  },
  data () {
    return {
      sideBarQueue: [{ page: 'HelpDigest' }]
    }
  },
  async mounted () {
    console.log(await HTTP.testAcessToken())
    console.log('is logged in?', await HTTP.isLoggedIn())
  }
}
</script>

<style>
html, body {
  overflow-x: hidden;
  margin: 0px;
  padding: 0px;
  height: 100%;
}
.container-app {
  width:  100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.wrapper {
  flex-grow: 1;
  overflow: scroll;
  overflow-x: hidden;
  min-height: 100%;
}
.graph {
  flex-grow: 1;
  overflow: hidden;
  min-height: 100%;
}
</style>
