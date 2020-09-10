<template>
    <div class="displayPath">
      <span class="pathStep" v-for="(item, index) in historyPath" :key="index" @click="historyPathChange(item)" >
        {{ item }}
      </span>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'DisplayPath',
    props: ['treeOriginal','historyPath'],
    methods: {
        ...mapMutations(['updateNode']),
        historyPathChange(nodeName){
            this.updateNode(nodeName)
            var index = this.historyPath.findIndex(item => item === nodeName)
            
            var historyPathNew = this.historyPath.slice(0, index+1)
            this.$emit('update-history-path', historyPathNew)
            this.historyPathUpdateTree(historyPathNew)
        },
        historyPathUpdateTree(historyPathNew){
            if(historyPathNew.length > 1){
                var currentNode = this.treeOriginal
                var n = 1

                while(historyPathNew.length > n){
                    var index = currentNode.nodes.findIndex(item => item.name === historyPathNew[n])
                    currentNode = currentNode.nodes[index]
                    n++
                }

                this.$emit('update-tree', currentNode)
            }
            else{
                this.$emit('restore-tree')
            }
        },
    }
}
</script>

<style scoped>
/* CSS for displayPath */

.displayPath {
  position: absolute;
  left: 0%;
  top: 10%;
}

.displayPath .pathStep {
  display: inline-block;
  border-left: 35px solid black;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  margin-right: 10px;
  padding: 0 5px;
  cursor: pointer;
  transition: 0.5s;
  box-shadow: 0px 0px 7px 3px rgba(0,0,0,0.48);
}

.displayPath .pathStep:hover {
  background-color: rgba(238, 217, 54, 0.5);
}
</style>