const state = {
    nodeSelected: ''
};

const getters = {
    nodeSelected: state => state.nodeSelected
};

const actions = {

};

const mutations = {
    updateNode: (state, data) => state.nodeSelected = data,
};

export default {
    state,
    getters,
    actions,
    mutations
}