import data from '../../tree'

const state = {
    data: data,
    nodeSelected: ''
};

const getters = {
    data:         state => state.data,
    nodeSelected: state => state.nodeSelected
};

const actions = {

};

const mutations = {
    updateNode: (state, data) => state.nodeSelected = data,
    nodeDisplay: () => {
        console.log('hello')
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}