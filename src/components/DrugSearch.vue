<template>
    <div class="content-wrap">
        <h1 v-if="!is_found">Sorry, we couldn't find anything with this term</h1>
        <h1 v-else>Results with term: {{search_term}}</h1>
        <div v-if="is_found" id="main_div" class="drug-pharmacy-main-info search-results-block">
            <ul id="list">
                <li v-for="item in info" :key="item.id">
                    <img class="drug-pharmacy-info-img" :src="'http://127.0.0.1:8000' + item.image" :alt="item.name">
                    <p><span>Name: </span>{{item.name}}</p>
                    <p><span>Weight: </span>{{item.description.weight}}</p>
                    <p><router-link :to="{name: 'DrugInfo', params: {id: item.id}}">Information</router-link></p>
                    <p><router-link :to="{name: 'PharmacySearch', params: {id: item.id}}">Find pharmacies</router-link></p>
                    <hr>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'

export default {
  name: 'DrugSearch',
  props: {
    search_term: String,
  },
  watch: {
    search_term() {
      this.api_call();
    },
  },
  data() {
    return {
      info: null,
      is_found: false,
    };
  },
  created() {
    this.api_call();
  },
  methods: {
    api_call() {
      this.$api.get(`search/${this.search_term}/`).then(async (response) => {
        this.info = response.data;
        this.is_found = !this.info.Error;
      })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
