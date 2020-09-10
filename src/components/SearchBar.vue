<template>
    <form class="searchBar">
      <div class="form-row">
        <div class="col-auto">
          <input type="number" class="form-control" placeholder="会員番号" v-model="memberNumber">
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-dark" @click.prevent="updateTreeByNumber">検索</button>
        </div>
      </div>
    </form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: "SearchBar",
    props: ['treeOriginal'],
    data: function() {
        return{
            memberNumber: '',
        }
    },
    methods: {
        ...mapMutations(['updateNode']),
        updateTreeByNumber(){
            var currentNode = this.treeOriginal
            var number = Number(this.memberNumber)
            if(currentNode.number === number){
                console.log(currentNode)
                this.updateNode(currentNode.name)
                return
            }
            else{
                this.recursiveFind(currentNode, number)
            }
        },
        recursiveFind(data, number){
            if(data.nodes){
                var n = 0
                while(data.nodes.length > n){
                    if(data.nodes[n].number === number){
                        console.log(data.nodes[n])
                        this.updateNode(data.nodes[n].name)
                        break
                    }
                    this.recursiveFind(data.nodes[n], number)
                    n++
                }
            }
        }
    }
}
</script>

<style scoped>
/* CSS for searchbar */

.searchBar{
  position: absolute;
  top: 0%;
  left: 0%;
}

/* Disable number arrow display on Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Disable number arrow display on Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>