<template>
    <nav>
        <router-link class="left" :to="{name: 'Home'}">MAIN</router-link>
        <router-link v-if="!(user && user.username)" class="right" :to="{name: 'Login'}">LOGIN</router-link>
        <router-link v-if="!(user && user.username)" class="right" :to="{name: 'Register'}">REGISTER</router-link>
        <router-link v-if="user && user.username" :to="{}" class="right">{{user.username}}</router-link>
        <router-link v-if="user && user.username" class="right" :to="{name: 'Logout'}">LOGOUT</router-link>
        <router-link class="right" :to="{name: 'About'}">ABOUT</router-link>
        <router-link id="search_mobile" class="left" :to="{name: 'DrugSearch'}">SEARCH</router-link>
        <div class="search-container">
            <form name = "search_form" action="#" method="post">
                <input id="search_field" type="text" name="search_term" v-model="search_term" placeholder="Search...">
                <router-link :to="{name: 'DrugSearch', params: {search_term: this.search_term}}">
                    <button v-on:click="validate_form"><i class="fa fa-search"></i></button>
                </router-link>
            </form>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavigationBar',
  data() {
    return {
      search_term: null,
    };
  },
  methods: {
    validate_form() {
      if (this.search_term === null || this.search_term === '') {
        const field = document.getElementById('search_field');
        const color = field.style.backgroundColor;
        field.style.backgroundColor = 'indianred';
        setTimeout(() => {
          field.style.backgroundColor = color;
        }, 1000);
      }
    },
  },
  mounted() {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://kit.fontawesome.com/0aa1058b8e.js');
    document.head.appendChild(script);
  },
  computed: mapState(['user']),
};
</script>

<style scoped>

</style>
