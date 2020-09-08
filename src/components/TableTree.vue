<template>
    <table v-bind:class="{ orgChart: true, hide: !show }" v-if="depth < 6">
        <tr>
            <td v-if="data.name !== 'empty'" :colspan="data.nodes && data.nodes.length? data.nodes.length*2 : null">
                <div class='node' @click="updateNode(data.name)">
                    <div class="title">
                        <img src="@/assets/diamond_gfc.svg" >
                        <span>昇格まで A 14人 B 25人</span>
                    </div>
                    <div class="topLevel" >
                        <div class="name">名{{data.name}}</div>
                        <div class="number">番号{{data.number}}</div>
                    </div>
                    <div class="midLevel">
                        <div class="leftSide">
                            <div class="category">A</div>
                            <div class="people">101人</div>
                            <div class="amount">総仕入額</div>
                            <div class="totalAmount">10,000</div>
                        </div>
                        <div class="rightSide">
                            <div class="category">B</div>
                            <div class="people">65人</div>
                            <div class="amount">総仕入額</div>
                            <div class="totalAmount">10,000</div>
                        </div>
                    </div>
                    <div class="bottomLevel">
                        <div class="snsSale"><span>SNS小売り</span><span> 10,000</span></div>
                        <div class="reward"><span>報酬</span><span> 10,000</span></div>
                        <div class="dividend"><span>分配金</span><span> 10,000</span></div>
                    </div>
                </div>
                <div v-if="data.nodes && data.nodes.length && depth < 5">
                    <button type="button" class="btn btn-primary btn-sm" @click='changeShow'>{{buttonDisplay}}</button>
                </div>
            </td>
            <td v-else :colspan="data.nodes && data.nodes.length? data.nodes.length*2 : null">
                <div class="node">
                    <div class="emptyUser"><span>空いてます</span></div>
                    <div class="emptyUserSelect">
                        <b-dropdown id="dropdown-1" text="ユーザー選択" class="m-md-2">
                            <b-dropdown-item v-for="(user, index) in userList" :key="index">{{user}}</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <div class="emptyUserAdd"><button type="button" class="btn btn-primary">メンバー追加</button></div>
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
                    <td class="leftLine topLine"  :key='node.name'></td>
                    <td class="rightLine topLine" :key='node.name'></td>
                </template>
                <td class="leftLine"></td>
            </tr>
            <tr>
                <td colspan="2" v-for='node in data.nodes' :key='node.name'>
                    <TableTree  :data='node' :depth='countDepth' :show='showChildren' :userList='userList' />
                </td>
            </tr>
        </template>
    </table>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'TableTree',
    props: [ 'data', 'depth', 'show', 'userList' ],
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

/* start code for general chart layout */

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

.orgChart .node {
    padding: 5px 5px;
    text-align: center;
    display: inline-block;
    width: 200px;
    height: 230px;
    border: 1px solid black;
}

.orgChart .node:hover {
    background-color: rgba(238, 217, 54, 0.5);
    transition: 0.5s;
    cursor: pointer;
    z-index: 20;
}

/* end code for general chart layout */

/* start code for node internal layout */

/* topLevel layout */
.orgChart .node .title {
    margin-bottom: 3px;
}

.orgChart .node .title img {
    width: 30%;
}

.orgChart .node .title span {
    display: inline-block;
    width: 70%;
    font-size: 12px;
    text-align: right;
}

.orgChart .node .topLevel {
    border: 1px solid black;
}

.orgChart .node .topLevel .name {
    display: inline-block;
    margin-right: 5px;

}

.orgChart .node .topLevel .number {
    display: inline-block;
    margin-left: 5px;
}

/* midLevel layout */
.orgChart .node .midLevel {
    border-bottom: 1px solid black;
}

.orgChart .node .midLevel .leftSide {
    display: inline-block;
    border-right: 1px solid black;
    padding-right: 10px;
    width: 50%;
}

.orgChart .node .midLevel .rightSide {
    display: inline-block;
    padding-left: 10px;
    width: 50%;
}

.orgChart .node .midLevel .leftSide .category, .leftSide .amount {
    text-align: left;
}

.orgChart .node .midLevel .rightSide .category, .rightSide .amount {
    text-align: right;
}

/* bottomLevel layout */

.orgChart .node .bottomLevel span:nth-child(1){
    display: inline-block;
    width: 50%;
    text-align: right;
    padding-right: 2px;
}

.orgChart .node .bottomLevel span:nth-child(2){
    display: inline-block;
    width: 50%;
    text-align: left;
    padding-left: 2px;
}

/* empty node layout */
.orgChart .node .emptyUser {
    height: 50%;
    position: relative;
}

.orgChart .node .emptyUser span {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.orgChart .node .emptyUserSelect, .emptyUserAdd {
    height: 25%;
    position: relative;
}

.orgChart .node .emptyUserAdd button {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

/* end code for node internal layout */

/* star code for drawing connecting lines */

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