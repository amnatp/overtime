import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    overtimes: [],
    approveList: [],
    status: '',
    token: localStorage.getItem('overtime-token') || '',
    // token: '',
    user: localStorage.getItem('overtime-id') || '',
    employeeId: localStorage.getItem('overtime-employee-id') || '',
    firstName: localStorage.getItem('overtime-first-name') || '',
    lastName: localStorage.getItem('overtime-last-name') || '',
  },
  mutations: {
    loadOvertimes(state, ots) {
      state.overtimes = ots;
    },
    loadApproveList(state, ots) {
      state.approveList = ots;
    },
    addOvertime(state, ot) {
      //state.overthimes.push(ot);
      state.overtimes.unshift(ot);
    },
    loginRequest(state) {
      state.loading = true;
      state.status = 'loading';
    },
    loginSuccess(state, {token, user}) {
      state.status = 'success';
      state.token = token.access_token;
      state.loading = false;
      state.user = user;
      state.employeeId = token.employeeId;
      state.firstName = token.firstName;
      state.lastName = token.lastName;
    },
    loginError(state) {
      state.loading = false;
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.user = '';
      state.overtimes = [];
      state.employeeId = '';
      state.firstName = '';
      state.lastName = '';
    },
    registerRequest: state => {
      state.loading = true;
    },

    registerSuccess: state => {
      state.loading = false;
    },

    registerError: state => {
      state.loading = false;
    },
  },
  actions: {
    loadOTs({commit}, ots) {
      commit('loadOvertimes', ots);
    },
    addOT({commit}, ot) {
      commit('addOvertime', ot);
    },
    loadApproveList({commit}, ots) {
      commit('loadApproveList', ots);
    },
    login({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('loginRequest');
        axios
          .post('https://overtime-service.azurewebsites.net/api/token', payload)
          .then(response => {
            //console.log("pooooooooosssssttttt");
            const auth = response.data;
            console.log(auth);
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${auth.access_token}`;
            //  axios.defaults.headers.common["Authorization"] = auth.access_token;
            localStorage.setItem(
              'overtime-token',
              `Bearer ${auth.access_token}`,
            );
            localStorage.setItem('overtime-id', auth.id);
            localStorage.setItem('overtime-employee-id', auth.employeeId);
            localStorage.setItem('overtime-first-name', auth.firstName);
            localStorage.setItem('overtime-last-name', auth.lastName);

            commit('loginSuccess', {token: auth, user: auth.id});

            //console.log("payload: " + payload.email);
            resolve(response);
          })
          .catch(error => {
            commit('loginError');
            delete axios.defaults.headers.common['Authorization'];
            reject(error.response);
          });
      });
    },
    register({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('registerRequest');
        axios
          .post(
            'https://overtime-service.azurewebsites.net/api/account',
            payload,
          )
          .then(response => {
            commit('registerSuccess');
            resolve(response);
          })
          .catch(error => {
            commit('registerError');
            reject(error.response);
          });
      });
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('overtime-token');
        localStorage.removeItem('overtime-id');
        localStorage.removeItem('overtime-first-name');
        localStorage.removeItem('overtime-last-name');

        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: state => state.token,
    authStatus: state => state.status,
  },
});
