<template>
    <table v-bind:class="{ orgChart: true, hide: !show }" v-if="depth < 6">
        <tr>
            <td :colspan="data.nodes && data.nodes.length? data.nodes.length*2 : null">
                <div class='node' @click="updateNode(data.label)">
                    <div class="label" >Label: {{data.label}}</div>
                    <div v-if="data.job" class="job">Job: {{data.job}}</div>
                    <div v-else class="job">no title</div>
                    <div class="depth">Level: {{depth}}</div>
                </div>
                <div v-if="data.nodes && data.nodes.length && depth < 5">
                    <button type="button" class="btn btn-primary" @click='changeShow'>{{buttonDisplay}}</button>
                </div>
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
                <template v-for="node in (data.nodes.length-1)">
                    <td class="leftLine topLine"  :key='node.label'></td>
                    <td class="rightLine topLine" :key='node.label'></td>
                </template>
                <td class="leftLine"></td>
            </tr>
            <tr>
                <td colspan="2" v-for='node in data.nodes' :key='node.label'>
                    <TableTree  :data='node' :depth='countDepth' :show='showChildren'/>
                </td>
            </tr>
        </template>
    </table>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'TableTree',
    props: [ 'data', 'depth', 'show' ],
    data(){
        return {
            showChildren: this.show,
        }
    },
    computed: {
        buttonDisplay: function(){ return this.showChildren ? 'CLOSE' : 'OPEN' },
        countDepth: function(){ return this.depth+1 },
    },
    methods: {
        changeShow(){
            this.showChildren = !this.showChildren
        },
         ...mapMutations(['updateNode', 'nodeDisplay']),
        }

}
</script>

<style scoped>
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

.orgChart tr:nth-child(3) td {
  box-sizing: border-box;
  height: 20px;
}

.orgChart .node {
    padding: 0 5px;
    text-align: center;
    display: inline-block;
    width: 100px;
    border: 1px solid pink;
}

.orgChart .node:hover {
  background-color: rgba(238, 217, 54, 0.5);
  transition: 0.5s;
  cursor: pointer;
  z-index: 20;
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