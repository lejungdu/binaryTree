<template>
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
        <div class="emptyUserAdd"><button type="button" class="btn btn-outline-dark">メンバー追加</button></div>
    </div>
</template>

<script>
export default {
    name: 'NodeEmpty',
    props: [ 'userList' ],
    data(){
        return {
            newUser: ""
        }
    },
    methods: {
        selectNewUser(user){
            this.newUser = user
        },
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