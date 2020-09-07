<template>
  <div class="app">
    <div class='mainContainer'>
      <TableTree 
        :data='tree'
        :depth=1
        :show=true
      />
    </div>
    <div class="displayPath">{{displayPath}}</div>
  </div>
</template>

<script>
import tree from './tree'
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
      path: []
    }
  },
  computed: {
    ...mapGetters(['nodeSelected']),
    displayPath: function(){ return this.path.join(" > ")},
  },
  watch:{ 
    nodeSelected: function(val){ this.findTarget(this.tree, val) },
    path: function(){this.updateTree()},
  },
  updated(){

  },
  methods: {
    updateTree(){
      var currentNode = this.tree
      var n = 1

      while(this.path.length > n){ 
        var index = currentNode.nodes.findIndex(item => item.label === this.path[n])
        currentNode = currentNode.nodes[index]
        n++
      }

      console.log(currentNode)
      this.tree = currentNode
    },
    findTarget(data, value){
      var arr = []
      arr.push(data.label)
      if(data.label === value){
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
      arr.push(data.label)
      if(data.label === value){
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
  border: 1px solid pink
}
.mainContainer{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.displayPath {
  position: absolute;
  left: 0%;
  top: 0%
}
</style>
