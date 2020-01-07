import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { store } from "./store/store";
import VueCarousel from 'vue-carousel';
import {VueMasonryPlugin} from 'vue-masonry';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhoneAlt, faEnvelope, faHome, faComment, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPhoneAlt, faEnvelope, faHome, faComment, faCalendarAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Vue.use(VueMasonryPlugin);
Vue.use(VueCarousel);


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");