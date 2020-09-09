<template>
    <table v-bind:class="{ orgChart: true, hide: !show }" v-if="depth < 6">
        <tr>
            <td v-if="data.name !== 'empty'" :colspan="data.nodes && data.nodes.length? data.nodes.length*2 : null">
                <div class="node" :style="bgColor" @click="updateNode(data.name)">
                    <div class="title">
                        <img v-if="data.title" :src="data.title" >
                        <span>昇格まで A 14人 B 25人</span>
                    </div>
                    <div class="topLevel" >
                        <div class="name">名<span>{{data.name}}</span></div>
                        <div class="number">番号<span>{{data.number}}</span></div>
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
                    <div class="emptyUser">
                        <span v-if="!newUser">空いてます</span>
                        <span v-else>{{ newUser }}</span>
                    </div>
                    <div class="emptyUserSelect">
                        <b-dropdown id="dropdown-1" text="ユーザー選択" class="m-md-2">
                            <b-dropdown-item 
                                v-for="(user, index) in userList" 
                                :key="index"
                                @click="selectNewUser(user)"
                            >
                                {{user}}
                            </b-dropdown-item>
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
import { mapMutations } from 'vuex'

export default {
    name: 'TableTree',
    props: [ 'data', 'depth', 'show', 'userList' ],
    data(){
        return {
            showChildren: this.show,
            newUser: ""
        }
    },
    computed: {
        buttonDisplay: function(){ return this.showChildren ? 'CLOSE' : 'OPEN' },
        countDepth: function(){ return this.depth+1 },
        bgColor: function(){ return `background-color: ${this.data.bgcolor};` }
    },
    methods: {
        changeShow(){
            this.showChildren = !this.showChildren
        },
        selectNewUser(user){
            this.newUser = user
        },
         ...mapMutations(['updateNode']),
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

.orgChart .node {
    padding: 5px 5px;
    text-align: center;
    display: inline-block;
    width: 300px;
    height: 250px;
    border: 1px solid black;
    cursor: pointer;
    transition: 0.5s;
    margin: 0 10px;
}

.orgChart .node:hover {
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.42);
}

/* CSS for node internal layout */

/* topLevel layout */
.orgChart .node .title {
    margin-bottom: 3px;
}

.orgChart .node .title img {
    width: 40%;
}

.orgChart .node .title span {
    display: inline-block;
    width: 60%;
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

.orgChart .node .topLevel span {
    color: blue;
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

.orgChart .node .midLevel .leftSide .people, .rightSide .people {
    color: blue;
}

.orgChart .node .midLevel .leftSide .category, .leftSide .amount {
    text-align: left;
}

.orgChart .node .midLevel .rightSide .category, .rightSide .amount {
    text-align: right;
}

.orgChart .node .midLevel .leftSide div:nth-child(4), .rightSide div:nth-child(4){
    color: blue;
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
    color: blue;
}

/* empty node layout */
.orgChart .node .emptyUser {
    height: 50%;
    position: relative;
    font-size: 18px;
}

.orgChart .node .emptyUser span {
    display: inline-block;
    width: 100%;
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