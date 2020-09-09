<template>
  <div class="app">
    <div class='mainContainer' :style="zoomScale">
      <TableTree 
        :data='tree'
        :depth=1
        :show=true
        :userList='userList'
      />
    </div>
    <div class="displayPath">
      <span class="pathStep" v-for="(item, index) in historyPath" :key="index" @click="historyPathChange(item)" >
        {{ item }}
      </span>
    </div>
    <div class="zoomTool">
      <div class="title">ZOOM</div>
      <div class="control">
        <span @click="zoomIn"><font-awesome-icon icon="minus" /></span>
        <span @click="zoomOut"><font-awesome-icon icon="plus" /></span>
      </div>
      
    </div>
  </div>
</template>

<script>
import tree from './tree'
import userList from './userList'
import TableTree from './components/TableTree'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: { TableTree },
  data: function() {
    return{
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
    ...mapMutations(['updateNode']),
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
    historyPathChange(nodeName){
      this.updateNode(nodeName)
      var index = this.historyPath.findIndex(item => item === nodeName)
      
      this.historyPath = this.historyPath.slice(0, index+1)
      this.historyPathUpdateTree()
    },
    historyPathUpdateTree(){
      if(this.historyPath.length > 1){
        var currentNode = tree
        var n = 1

        while(this.historyPath.length > n){
          var index = currentNode.nodes.findIndex(item => item.name === this.historyPath[n])
          currentNode = currentNode.nodes[index]
          n++
        }

        this.tree = currentNode
      }
      else{
        this.tree = tree
        this.historyPath = []
        this.path = []
      }
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
    zoomIn(){
      this.scaleVal = this.scaleVal - 0.1

    },
    zoomOut(){
      this.scaleVal = this.scaleVal + 0.1
    }
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

/* CSS for displayPath */

.displayPath {
  position: absolute;
  left: 0%;
  top: 0%;
}

.displayPath .pathStep {
  display: inline-block;
  background-color: pink;
  border-left: 35px solid #569cbd;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  margin-left: 10px;
  padding: 0 5px;
  cursor: pointer;
  transition: 0.5s;
  box-shadow: 0px 0px 7px 3px rgba(0,0,0,0.48);
}

.displayPath .pathStep:hover {
  background-color: rgba(238, 217, 54, 0.5);
}

/* CSS for zoom tool */

.zoomTool {
  box-sizing: border-box;
  position: fixed;
  top: 0%;
  right: 0%;
  background-color: white;
  border: 3px solid black;
  width: 160px;
  height: 100px;
  text-align: center;
  padding: 10px 3px;
  transition: 0.5s;
}

.zoomTool:hover {
  box-shadow: 0px 0px 7px 3px rgba(0,0,0,0.48);
}

.zoomTool .title, .control {
  height: 50%;
  font-weight: bold;
}

.zoomTool .control span {
  display: inline-block;
  width: 30px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 20px;
  transition: 0.5s;
}

.zoomTool .control span:hover{
  background-color: rgba(238, 217, 54, 0.5);
}

</style>
