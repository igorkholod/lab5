<template>
        <div class="form-container">
            <h1>Login</h1>
            <input v-model="username" type="text" placeholder="Username">
            <input v-model="password" type="password" placeholder="Password">
            <div>
                <button id="login" v-on:click="login">Login</button>
                <router-link :to="{name: 'Home'}">
                    <button>Cancel</button>
                </router-link>
            </div>
            <p v-if="error_message">{{error_message}}</p>
        </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error_message: '',
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.error_message = 'Please, fill both fields!';
        return;
      }
      this.$store.dispatch('obtainToken', { username: this.username, password: this.password })
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch((e) => {
          this.error_message = 'Please, check your credentials and try again!';
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
    .form-container {
        font-family: "Comic Sans MS", serif;
        color: white;
        min-height: 93vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .form-container input {
        height: 40px;
        width: 20vw;
        padding-left: 10px;
        border: 3px solid mediumspringgreen;
        margin-bottom: 10px;
        background-color: darkgray;
        transition: border-color;
        transition-duration: 0.5s;
    }
    .form-container input:focus {
        border-color: gold;
        transition: border-color;
        transition-duration: 0.5s;
    }
    .form-container button {
        font-family: "Comic Sans MS", serif;
        background-color: mediumspringgreen;
        /*border-radius:15px;*/
        border: none;
        display:inline-block;
        cursor:pointer;
        color: #404040;
        font-size:20px;
        font-weight:bold;
        padding:13px 40px;
        text-decoration:none;
        margin: 0 10px 0 10px
    }
    .form-container button:hover {
        background-color:#5cbf2a;
    }
    .form-container p {
        color: tomato;
    }
</style>
