import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store'

Vue.config.productionTip = false;

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
Vue.use(VueMoment, {
  moment,
})

import VueToastify from "vue-toastify";
Vue.use(VueToastify);

new Vue({
  router,
  store,
	render: (h) => h(App),
}).$mount('#app');
