import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import OverTime from "./views/overtime.vue";
import Login from "./views/login.vue";
import Register from "./views/register.vue";
import Approve from "./views/approve.vue";
import RegisterDone from "./views/registerdone.vue";
import store from './store';
Vue.use(Router);

var router = new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "overtime",
      component: OverTime,
      meta: { requiresAuth: true },
    },
    {
      path: "/approve",
      name: "approve",
      component: Approve,
      meta: { requiresAuth: true },
    },
    {
      path: "/registerdone",
      name: "registerdone",
      component: RegisterDone,

    },

    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
  //  console.log("token" + store.state.token)
    if (store.state.token) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;
