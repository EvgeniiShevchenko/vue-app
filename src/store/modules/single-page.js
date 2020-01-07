import api from "../../services/api";

const getDefaultState = () => {
  return {
    pending: false,
    data: {}
  }
};

export default {
namespaced: true,

state: getDefaultState(),

getters: {
    pending(state){
        return state.pending;
    },
    project(state){
        return state.data;
    },
},

mutations: {
      togglePending(state, payload) {
        state.pending = payload;
      },
      getProject(state, payload) {
        state.data = {...payload[0]};
      },
      addComment(state, payload){
        const modifyProject = {...state.data, Comments: [...state.data.Comments, payload.newComment]};

      state.data = {...modifyProject};
      },
      resetState (state) {
        Object.assign(state, getDefaultState())
      },
},

actions: {
    async fetchProject({state, commit}, projectId){
        try{
          commit('togglePending', true);
  
          const result = await api.getProject(projectId);

          commit('getProject', result);
  
          commit('togglePending', false);
        }catch(e){
          console.error(e);
        }
      },
      async addComment({state, commit}, payload){
          console.log(payload);
          try{
            commit('togglePending', true);

            commit('addComment', payload);

            await api.setComment(payload);

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
