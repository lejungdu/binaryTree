<template>
    <div v-if="data.nodes && data.nodes.length && depth < 5">
        <button type="button" class="btn btn-dark btn-sm" @click="$emit('children-display')">{{buttonDisplay}}</button>
    </div>
</template>

<script>
export default {
    name: 'BranchButton',
    props: ['data', 'depth', 'showChildren'],
    computed: {
        buttonDisplay: function(){ return this.showChildren ? 'CLOSE' : 'OPEN' },
    },
}
</script>