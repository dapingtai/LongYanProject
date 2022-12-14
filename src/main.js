import Vue from 'vue';
import router from './router';
import App from './App.vue';

import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '../public/stylesheets/custom.css'

Vue.config.productionTip = false;
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  render: h => [
    h(App),
  ],
  router
}).$mount('#app')
