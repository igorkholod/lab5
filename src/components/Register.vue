<template>
    <div class="form-container">
        <h1>Register</h1>
        <input v-model="email" type="text" placeholder="Email">
        <input v-model="username" type="text" placeholder="Username">
        <input v-model="password" type="password" placeholder="Password">
        <div>
            <button id="register" v-on:click="submit()">Register</button>
            <router-link :to="{name: 'Home'}">
                <button>Cancel</button>
            </router-link>
        </div>
        <p v-if="error && error.length">Please, fix following errors:</p>
        <p v-for="e in error" :key="e">{{e}}</p>
    </div>
</template>

<script>
import qs from 'qs';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      error: [],
    };
  },
  methods: {
    validate() {
      this.error = [];
      let is_valid = true;
      const username_validator = new RegExp('^[\\w]+$');
      const email_validator = new RegExp('.+@.+\\..+');
      if (this.username.length < 3 || !this.username.match(username_validator) || this.username.length > 20) {
        this.error.push('Username must be from 3 to 20 characters long and contain only letters,'
                        + ' digits and _');
        is_valid = false;
      }
      if (!this.email.match(email_validator)) {
        this.error.push('Please, enter valid email');
        is_valid = false;
      }
      if (this.password.length < 8 || this.password.length > 20) {
        this.error.push('Password must be 8 to 20 characters long');
        is_valid = false;
      }
      return is_valid;
    },
    submit() {
      if (!this.validate()) {
        return;
      }
      this.$api.post('auth/register/', qs.stringify({
        username: this.username,
        password: this.password,
        email: this.email,
      }), {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (response.data.response === 'EMAIL_TAKEN') {
          this.error = ['Email is already taken'];
        } else if (response.data.response === 'USERNAME_TAKEN') {
          this.error = ['Username is already taken'];
        } else if (response.data.response === 'OK') {
          this.$router.push({ name: 'Home' });
        } else {
          this.error = ['Unexpected error happened. Please contact us or try again later'];
        }
      }).catch((e) => {
        console.log(e);
        this.error = ['Unexpected error happened. Please contact us or try again later'];
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
        /*border-radius: 20px;*/
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
        margin-bottom: 0;
    }
</style>
