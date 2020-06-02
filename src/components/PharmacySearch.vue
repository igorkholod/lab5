<template>
    <div class="content-wrap">
        <h1 id>This drug you can find here:</h1>

        <div v-if="is_found" id="main_div" class="drug-pharmacy-main-info search-results-block">
            <ul v-for="item in info" :key="item.pharmacy.id" id="pharmacy_list">
                <li>
                    <img class="drug-pharmacy-info-img" :src="'http://127.0.0.1:8000' + item.pharmacy.image"
                         :alt="item.pharmacy.name">
                    <p>{{item.pharmacy.name}}</p>
                    <p>Address: {{item.pharmacy.adress}}</p>
                    <p>Price: {{item.price}}</p>
                    <p>Stock: {{item.amount}}</p>
                </li>
                <hr>
            </ul>
        </div>
        <div v-else>Sorry, we couldn't find any pharmacy with this drug in stock</div>
    </div>
</template>

<script>
export default {
  name: 'PharmacySearch',
  data() {
    return {
      is_found: false,
      info: null,
    };
  },
  created() {
    this.$api.get(`search_pharmacy/${this.$route.params.id}/`).then((response) => {
      this.info = response.data;
      if (!this.info.Error) {
        this.is_found = true;
      }
    })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
