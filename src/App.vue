<template>
  <div id="app" class="container-app">
    <Header class="row"
      v-on:sidePageChange="sidePageChange"
      v-on:randomNode="randomNode"/>
    <div :class="(stacked ? '' : 'row') + ' section'">
      <Graph :class="'col-12 col-sm-7 ' + (stacked ? 'graph-shrunk' : 'graph')" id="graph" ref="graph"
        v-on:select="select"
        v-on:sidePageChange="sidePageChange"/>
      <div :class="(stacked ? '' : 'wrapper') + ' col-12 col-sm-5 bg-light border'">
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
          v-on:newNode="newNode"
          v-on:popSidePage="popSidePage"
          v-on:deleteNode="deleteNode"
          v-on:deleteEdge="deleteEdge"/>
        <About v-else-if="topPage() == 'About'"/>
        <Rules v-else-if="topPage() == 'Rules'"/>
        <HelpDigest v-else-if="topPage() == 'HelpDigest'"
          v-on:sidePageChange="sidePageChange"/>
        <UserDigest v-else-if="topPage() == 'UserDigest'"
          v-on:sidePageChange="sidePageChange"
          v-on:popSidePage="popSidePage"/>
        <AccountShow v-else-if="topPage() == 'AccountShow'" ref="accountshow"
          v-on:popSidePage="popSidePage"
          v-on:sidePageChange="sidePageChange"/>
        <Register v-else-if="topPage() == 'Register'"
          v-on:sidePageChange="sidePageChange"
          v-on:popSidePage="popSidePage"/>
        <Login v-else-if="topPage() == 'Login'"
          v-on:popSidePage="popSidePage"/>
        <SearchList v-else-if="topPage() == 'SearchList'" ref="searchList"
          v-on:sidePageChange="sidePageChange"
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
import SearchList from '@/components/SearchList'

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
    Register,
    SearchList
  },
  data () {
    return {
      sideBarQueue: [{ page: 'HelpDigest' }],
      stacked: false
    }
  },
  mounted () {
    this.stacked = window.innerWidth < 576
    window.addEventListener('resize', (e) => {
      this.stacked = window.innerWidth < 576
    })
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
      if (this.topPage() === 'SearchList') {
        this.$refs.searchList.setGraph(this.$refs.graph)
      }
    },
    async popSidePage () {
      this.Gunselect()
    },
    topPage () {
      return this.sideBarQueue[this.sideBarQueue.length - 1].page
    },
    getTopPage () {
      return this.sideBarQueue[this.sideBarQueue.length - 1]
    },
    async Gunselect () {
      await this.sideBarQueue.pop()
      if (this.topPage() === 'AccountShow') {
        this.$refs.accountshow.setUser(this.getTopPage().username)
      }
      if (this.topPage() !== 'NodeDigest') {
        this.$refs.graph.unselect()
      }
      if (this.topPage() === 'NodeDigest') {
        const node = this.sideBarQueue[this.sideBarQueue.length - 1].obj
        this.$refs.nd.select(node)
        this.$refs.graph.select(node)
      }
    },
    async select (obj) {
      await this.sideBarQueue.push({ page: 'NodeDigest', obj: obj })
      this.$refs.nd.select(obj)
    },
    newNode (obj) {
      this.$refs.graph.newNode(obj)
    },
    randomNode () {
      this.$refs.graph.resetGraph()
    },
    deleteNode (node) {
      this.$refs.graph.deleteNode(node)
    },
    deleteEdge (edge) {
      this.$refs.graph.deleteEdge(edge)
    }
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
.graph-shrunk {
  flex-grow: 1;
  overflow: hidden;
  max-height: 80%;
}
.link-text {
  color: #2358eb;
  display: inline;
}
</style>
