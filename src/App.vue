<template>
  <div class="app">
    <div class='mainContainer' :style="zoomScale">
      <TableTree :data='tree' :depth=1 :show=true :userList='userList' />
    </div>
    <DisplayPath 
      :historyPath='historyPath' 
      :treeOriginal='treeOriginal' 
      @restore-tree="restoreTree" 
      @update-tree="tree = $event"
      @update-history-path="historyPath = $event" />
    <ZoomPanel 
      :scaleVal='scaleVal' 
      @new-scale-value="scaleVal = $event" />
    <SearchBar
      :treeOriginal='treeOriginal' />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tree from './tree'
import userList from './userList'
import TableTree from './components/TableTree'
import SearchBar from './components/SearchBar'
import DisplayPath from './components/DisplayPath'
import ZoomPanel from './components/ZoomPanel'

export default {
  name: 'App',
  components: { TableTree, DisplayPath, ZoomPanel, SearchBar },
  data: function() {
    return{
      treeOriginal: tree,
      tree: tree,
      userList: userList,
      path: [],
      historyPath: [],
      scaleVal: 0.5,
    }
  },
  computed: {
    ...mapGetters(['nodeSelected']),
    displayPath: function(){ return this.historyPath.join(" > ")},
    zoomScale(){ return `transform: translate(-50%, -50%) scale(${this.scaleVal});`}
  },
  watch:{ 
    nodeSelected: function(val){ this.findTarget(this.tree, val) },
    path: function(){
      this.updateTree()
      this.recordPath()
    },
  },
  methods: {
    recordPath(){
      if(this.historyPath === []){ this.historyPath = this.path }
      else{
        for(let i=0; i<this.path.length; i++){ 
          if(this.historyPath.indexOf(this.path[i]) === -1){this.historyPath.push(this.path[i])}
        }
      }
    },
    updateTree(){
      var currentNode = this.tree
      var n = 1

      while(this.path.length > n){ 
        var index = currentNode.nodes.findIndex(item => item.name === this.path[n])
        currentNode = currentNode.nodes[index]
        n++
      }

      this.tree = currentNode
    },
    restoreTree(){
        this.tree = tree
        this.historyPath = []
        this.path = []
    },
    findTarget(data, value){
      var arr = []
      arr.push(data.name)
      if(data.name === value){
        this.path = arr
      }
      else if(data.nodes){
        var n = 0
        while(data.nodes.length > n){
          this.recursiveFind(data.nodes[n], [...arr], value)
          n++
        }
      }
    },
    recursiveFind(data, arr, value){
      arr.push(data.name)
      if(data.name === value){
        this.path = arr
      }
      else if(data.nodes){
        var n = 0
        while(data.nodes.length > n){
          this.recursiveFind(data.nodes[n], [...arr], value)
          n++
        }
      }
    },
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.app {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); 
  width: 1000px;
  height: 800px;
}
.mainContainer{
  position: absolute;
  left: 50%;
  top: 50%;
}

</style>
