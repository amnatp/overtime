<template>
  <form @submit.prevent="submit" class="p-2">
    <b-alert
      variant="danger"
      :show="errors !== null"
      dismissible
      @dismissed="errors = null"
    >
      <div v-for="(error, index) in errors" :key="index">
        {{ error[0] }}
      </div>
    </b-alert>
    <b-form-group label="EmployeeId">
      <b-form-input v-model.trim="EmployeeId" />
    </b-form-group>

    <b-form-group label="E-mail">
      <b-form-input v-model.trim="email" />
    </b-form-group>
    <b-form-group label="Password">
      <b-form-input v-model.trim="password" type="password" />
    </b-form-group>
    <b-form-group label="Confirm Password">
      <b-form-input v-model.trim="confirmPassword" type="password" />
    </b-form-group>
    <b-form-group>
      <b-button variant="primary" type="submit" :disabled="loading">Register</b-button
      >
      <b-button variant="default" @click="close" :disabled="loading"
        >Cancel</b-button
      >
    </b-form-group>
  </form>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      EmployeeId: '',
      errors: null
    };
  },
  methods: {
    submit: function() {
      const payload = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        EmployeeId: this.EmployeeId
      };

      this.$store
        .dispatch("register", payload)
        .then(response => {
          console.log('register: ' );
          this.errors = null;
          this.email = "";
          this.password = "";
          this.confirmPassword = "";
          this.EmployeeId = "";


          this.$emit("success");
          this.$router.push({ name: "overtime" });
        })
        .catch(error => {
          if (typeof error.data === "string" || error.data instanceof String) {
            this.errors = { error: [error.data] };
          } else {
            this.errors = error.data;
          }
        });
    },
    close() {
      this.errors = null;
      this.$emit("close");
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>
