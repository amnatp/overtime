import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Datetime from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Settings} from 'luxon';
import VueMoment from 'vue-moment';
import Axios from 'axios';
import moment from 'moment-timezone';
//Settings.defaultLocale = 'th';

Vue.use(BootstrapVue);
Vue.use(Datetime);
Vue.use(VueFlatPickr);
moment.tz.setDefault('utc');
Vue.use(VueMoment, {moment});

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
const token = localStorage.getItem('overtime-token');
console.log(token);
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
