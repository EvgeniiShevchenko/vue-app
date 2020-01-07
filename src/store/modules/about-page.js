import api from "../../services/api";

const getDefaultState = () => {
  return {
    data: [],
    pending: false
  }
};

export default {
namespaced: true,

state: getDefaultState(),

getters: {
    pending(state){
        return state.pending;
      },
      author(state){
        return state.data;
      },
},

mutations: {
      togglePending(state, payload) {
        state.pending = payload;
      },
      getAuthor(state, payload) {
        state.data = [...payload];
      },
      resetState (state) {
        Object.assign(state, getDefaultState())
      }
},

actions: {
    async fetchAuthor({state, commit}){
        try{
          commit('togglePending', true);
  
          const result = await api.getAuthor();
          
          commit('getAuthor', result);
  
          commit('togglePending', false);
        }catch(e){
          console.error(e);
        }
      },
      resetState ({ commit }) {
        commit('resetState')
      }
},

};