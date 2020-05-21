<template>
  <div>
    <form @submit.prevent="login" class="p-2">
      <b-alert
        variant="danger"
        :show="error !== null"
        dismissible
        @dismissed="error = null"
      >
        {{ error }}
      </b-alert>
      <b-alert variant="success" :show="registered && error === null">
        Registration successful. Please login to continue.
      </b-alert>
      <p>
        Login with your e-mail address and password.
        <router-link to="/register">signup</router-link>
      </p>
      <b-form-group label="E-mail">
        <b-form-input v-model.trim="email" />
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input v-model.trim="password" type="password" />
      </b-form-group>
      <b-form-group>
        <b-button variant="primary" type="submit" :disabled="loading"
          >Login</b-button
        >
        <b-button variant="warning" @click="close" :disabled="loading"
          >Cancel</b-button
        >
      </b-form-group>
    </form>
    <a
      href="https://overtime-service.azurewebsites.net/AccountHelper/forgotpassword"
      >forgot password</a
    >
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    registered: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", payload)
        .then(response => {
          this.error = null;
          this.email = "";
          this.password = "";
          if (this.$route.query.redirect) {
            this.$router.push({ name: "overtime" });
          } else {
            this.$router.push({ name: "overtime" });
          }
        })
        .catch(error => {
          this.error = error.data;
        });
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
