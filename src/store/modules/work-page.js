import api from "../../services/api";

const getDefaultState = () => {
  return {
    pending: false,
    data: []
  }
};

export default {
namespaced: true,

state: getDefaultState(),

getters: {
    pending(state){
        return state.pending;
      },
      projects(state){
        return state.data;
      },
},

mutations: {
  togglePending(state, payload) {
    state.pending = payload;
  },
  getAllProjects(state, payload) {
    state.data = [...payload];
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  }
},

actions: {
    async fetchAllProject({state, commit}){
        try{
          commit('togglePending', true);
  
          const result = await api.getAllProject();
          
          commit('getAllProjects', result);
  
          commit('togglePending', false);
        }catch(e){
          console.error(e);
        }
      },
      resetState ({ commit }) {
        commit('resetState')
      },
  }
};
