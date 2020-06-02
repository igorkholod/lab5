<template>
    <div>
        <div id="header" v-if="!is_found">Drug does not exist</div>
        <div v-else class="content-wrap">
            <h1 id="drug_name">{{info.name}}</h1>
            <h5 id="manufacturer">{{info.manufacturer.name}}</h5>
            <div class="drug-pharmacy-main-info">
                <img id="image" class="drug-pharmacy-info-img" :src="'http://127.0.0.1:8000' + info.image"
                     :alt="info.name">
                <p id="form"><span>Dosage form: </span>{{info.description.dosage_form}}</p>
                <p id="weight"><span>Weight: </span>{{info.description.weight}}</p>
                <p id="license"><span>License: </span>{{info.license}}</p>
                <p><router-link :to="{name: 'PharmacySearch', params: {id: $route.params.id}}">Find pharmacies</router-link></p>
            </div>
            <div class="drug-detailed-info">
                <h3>Composition:</h3>
                <p id="active_component"><span>Main component: </span>{{composition[0]}}</p>
                <p v-if="composition.length >= 2" id="help_components"><span>Helper component: </span>
                    {{composition.slice(1).join('\n')}}</p>
                <h3>Pharmacotherapeutic group:</h3>
                <p id="farma_group">{{info.description.farma_group}}</p>
                <h3>Indications:</h3>
                <ul id="indications" v-for="(indication, index) in info.description.indication.split('\n')" :key="index">
                    <li>{{indication}}</li>
                </ul>
                <h3>Anti indications:</h3>
                <ul id="anti_indications"
                    v-for="(antiindication, index) in info.description.anti_indication.split('\n')" :key="index">
                    <li>{{antiindication}}</li>
                </ul>
                <h3>Appliance:</h3>
                <p id="appliance">{{info.description.appliance}}</p>
                <h3>Expiration date:</h3>
                <p id ="exp_date">{{info.description.expiration_date}}</p>
                <h3>Conditions:</h3>
                <p id="conditions">{{info.description.conditions}}</p>
                <h3>Package:</h3>
                <p id="package">{{info.description.package}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DrugInfo',
  data() {
    return {
      info: null,
      is_found: false,
    };
  },
  created() {
    this.$api.get(`drug/${this.$route.params.id}/`).then((response) => {
      this.info = response.data;
      if (!this.info.Error) {
        this.is_found = true;
      }
    })
      .catch((e) => {
        console.log(e);
      });
  },
  computed: {
    composition() {
      return this.info.description.composition.split('\n');
    },
  },
};
</script>
