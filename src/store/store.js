import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";
import workPage from "./modules/work-page";
import aboutPage from "./modules/about-page";
import singlePage from "./modules/single-page";
import servicesPage from "./modules/services-page";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    showSidebar: true,
    photosGallery: []
  },
  getters: {
    sidebar(state){
      return state.showSidebar;
    },
    photos(state){
      return state.photosGallery;
    }
  },
  mutations: {
    toggleSidebar(state, payload) {
      state.showSidebar = payload;
    },
    setUnsplashPhotos(state, payload){
      state.photosGallery = payload;
    }
  },
  actions: {
    toggleSidebar({commit}, payload){
      commit('toggleSidebar', payload);
    },
    async getUnsplashPhotos({commit}, count){
      const result = await api.getRandomPhotos(count);
      
      commit('setUnsplashPhotos', result);
    }
  },
  modules: {
    workPage,
    aboutPage,
    singlePage,
    servicesPage
  }
});

