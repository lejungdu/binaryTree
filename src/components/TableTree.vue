<template>
    <table v-bind:class="{ orgChart: true, hide: !show }" v-if="depth < 6">
        <tr>
            <td v-if="data.name !== 'empty'" :colspan="data.nodes && data.nodes.length? data.nodes.length*2 : null">
                <Node :data='data'/>
                <BranchButton :data='data' :depth='depth' :showChildren='showChildren' @children-display='changeShow' />
            </td>
            <td v-else :colspan="data.nodes && data.nodes.length? data.nodes.length*2 : null">
                <NodeEmpty :userList='userList' />
            </td>
        </tr>
        <template v-if="data.nodes && data.nodes.length && depth < 5">
            <tr>
                <td :colspan="data.nodes.length*2">
                    <div class="downLine"></div>
                </td>
            </tr>
            <tr>
                <td class="rightLine"></td>
                <template v-for="(node, index) in (data.nodes.length-1)">
                    <td class="leftLine topLine"  :key='index+10'></td>
                    <td class="rightLine topLine" :key='index+11'></td>
                </template>
                <td class="leftLine"></td>
            </tr>
            <tr>
                <td colspan="2" v-for='(node, index) in data.nodes' :key='index+12'>
                    <TableTree  :data='node' :depth='countDepth' :show='showChildren' :userList='userList' />
                </td>
            </tr>
        </template>
    </table>
</template>

<script>
import Node from './TreeParts/Node'
import BranchButton from './TreeParts/BranchButton'
import NodeEmpty from './TreeParts/NodeEmpty'

export default {
    name: 'TableTree',
    components: { Node, BranchButton, NodeEmpty },
    props: [ 'data', 'depth', 'show', 'userList' ],
    data(){
        return {
            showChildren: this.show,
        }
    },
    computed: {
        countDepth: function(){ return this.depth+1 },
    },
    methods: {
        changeShow(){
            this.showChildren = !this.showChildren
        },
    }
}
</script>

<style scoped>

/* CSS for general chart layout */

.orgChart {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border-spacing: 0;
    transition: 0.5s;
}

.hide {
    display: none;
}

.orgChart td {
    text-align: center;
    vertical-align: top;
}

/* CSS drawing connecting lines between nodes */

.orgChart tr:nth-child(3) td {
  box-sizing: border-box;
  height: 20px;
}

.downLine {
    background-color: black;
    margin: 0 auto;
    height: 20px;
    width: 2px;
}

.topLine {
    border-top: 2px solid black;
}

.rightLine {
    border-right: 2px solid black;
    float: none;
    border-radius: 0;
}

.leftLine {
    border-left: 2px solid black;
    float: none;
    border-radius: 0;
}
</style>