import Vue from 'vue';
import VueRouter from 'vue-router';

import DrugSearch from '../components/DrugSearch.vue';
import Home from '../components/Home.vue';
import DrugInfo from '../components/DrugInfo.vue';
import PharmacySearch from '../components/PharmacySearch.vue';
import About from '../components/About.vue';
import Login from '../components/Login.vue';
import Logout from '../components/Logout.vue';
import Register from '../components/Register.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search/:search_term',
      name: 'DrugSearch',
      component: DrugSearch,
      props: true,
    },
    {
      path: '/drug/:id',
      name: 'DrugInfo',
      component: DrugInfo,
    },
    {
      path: '/pharmacy_search/:id',
      name: 'PharmacySearch',
      component: PharmacySearch,
    },
    {
      path: '/about/',
      name: 'About',
      component: About,
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/logout/',
      name: 'Logout',
      component: Logout,
    },
    {
      path: '/register/',
      name: 'Register',
      component: Register,
    },
  ],
});
