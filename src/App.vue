<template>
  <div class="container-fulid col-md-12">
    <b-navbar toggleable="md" type="dark" variant="primary" class="col-md-12">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Over time</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">my overtime</b-nav-item>
          <b-nav-item to="/approve">my approval</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-collapse is-nav id="nav_collapse" align="end">
        <b-navbar-nav align="end">
          <b-nav-item to="/" v-if="me !== ' '">{{ me }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav align="end">
          <b-nav-item @click="logout" v-if="me != ' '">Sign out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myuser: '',
    };
  },
  components: {},
  methods: {
    logout: function() {
      this.$store.dispatch('logout');
      this.$router.push('login');
    },
  },
  computed: {
    me: function() {
      return `${
        this.$store.state.firstName
      } ${this.$store.state.firstName.substring(0, 1)}`;
    },
    name: function() {
      return `${this.$store.state.firstName}`;
    },
  },
  mounted() {
    // this.$moment.tz.setDefault('Asia/Bangkok');
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  },
};
</script>

<style></style>
