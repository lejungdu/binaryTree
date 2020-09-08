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
      <span class="pathStep" v-for="(item, index) in historyPath" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="zoomTool">
      <div class="title">ZOOM Control</div>
      <div class="control"><span @click="zoomIn">-</span><span @click="zoomOut">+</span></div>
    </div>
  </div>
</template>

<script>
import tree from './tree'
import userList from './userList'
import TableTree from './components/TableTree'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    TableTree
  },
  data: function() {
    return{
      tree: tree,
      userList: userList,
      path: [],
      historyPath: [],
      scaleVal: 0.6,
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

      console.log(currentNode)
      this.tree = currentNode
    },
    findTarget(data, value){
      var arr = []
      arr.push(data.name)
      if(data.name === value){
        console.log(arr)
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
        console.log(arr)
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
  border: 1px solid pink;
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
  border: 1px solid black;
  border-radius: 5px;
  margin-left: 5px;
  padding: 0 5px;
  cursor: pointer;
  transition: 0.5s;
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
  border: 1px solid black;
  width: 150px;
  height: 100px;
  text-align: center;
  padding: 10px 3px;
}

.zoomTool .title, .control {
  height: 50%;
}

.zoomTool .control span {
  display: inline-block;
  width: 30px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 20px;
  transition: 0.5s;
}

.zoomTool .control span:hover{
  background-color: rgba(238, 217, 54, 0.5);
}

</style>
