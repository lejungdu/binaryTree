<template>
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
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'Node',
    props: ['data'],
    computed: {
        bgColor: function(){ return `background-color: ${this.data.bgcolor};` }
    },
    methods: {
        ...mapMutations(['updateNode']),
    }
}
</script>

<style scoped>

.node {
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

.node:hover {
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.42);
}

/* CSS for node internal layout */

/* title layout */
.node .title {
    margin-bottom: 3px;
}

.node .title img {
    width: 40%;
}

.node .title span {
    display: inline-block;
    width: 60%;
    text-align: right;
}

/* topLevel layout */
.node .topLevel {
    border: 1px solid black;
}

.node .topLevel .name {
    display: inline-block;
    margin-right: 5px;
}

.node .topLevel .number {
    display: inline-block;
    margin-left: 5px;
}

.node .topLevel span {
    color: blue;
}

/* midLevel layout */
.node .midLevel {
    border-bottom: 1px solid black;
}

.node .midLevel .leftSide {
    display: inline-block;
    border-right: 1px solid black;
    padding-right: 10px;
    width: 50%;
}

.node .midLevel .rightSide {
    display: inline-block;
    padding-left: 10px;
    width: 50%;
}

.node .midLevel .leftSide .people, .rightSide .people {
    color: blue;
}

.node .midLevel .leftSide .category, .leftSide .amount {
    text-align: left;
}

.node .midLevel .rightSide .category, .rightSide .amount {
    text-align: right;
}

.node .midLevel .leftSide div:nth-child(4), .rightSide div:nth-child(4){
    color: blue;
}

/* bottomLevel layout */

.node .bottomLevel span:nth-child(1){
    display: inline-block;
    width: 50%;
    text-align: right;
    padding-right: 2px;
}

.node .bottomLevel span:nth-child(2){
    display: inline-block;
    width: 50%;
    text-align: left;
    padding-left: 2px;
    color: blue;
}

/* empty node layout */
.node .emptyUser {
    height: 50%;
    position: relative;
    font-size: 18px;
}

.node .emptyUser span {
    display: inline-block;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.node .emptyUserSelect, .emptyUserAdd {
    height: 25%;
    position: relative;
}

.node .emptyUserAdd button {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}


</style>