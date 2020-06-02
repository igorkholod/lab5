import Vue from 'vue';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

const base = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

Vue.use(Vuex);
Vue.use({
  install(Vue) {
    Vue.prototype.$api = base;
  },
});

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    jwt: localStorage.getItem('token') || null,
    user: localStorage.getItem('user'),
    endpoints: {
      obtainJWT: 'auth/obtain_token/',
      refreshJWT: 'auth/refresh_token/',
    },
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token');
      state.jwt = null;
    },
    updateUser(state, token) {
      localStorage.setItem('user', jwt_decode(token));
      state.user = jwt_decode(token);
    },
    removeUser(state) {
      localStorage.removeItem('user');
      state.user = null;
    },

  },
  actions: {
    obtainToken(context, credentials) {
      const { username } = credentials;
      const { password } = credentials;
      const payload = {
        username,
        password,
      };

      return new Promise((resolve, reject) => {
        base.post(this.state.endpoints.obtainJWT, payload)
          .then((response) => {
            this.commit('updateToken', response.data.token);
            this.commit('updateUser', response.data.token);
            resolve();
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      });
    },
    logoutUser() {
      this.commit('removeToken');
      this.commit('removeUser');
    },
  },
});


new Vue({
  render: (h) => h(App),
  router,
  store,
  $api: base,
}).$mount('#app');
